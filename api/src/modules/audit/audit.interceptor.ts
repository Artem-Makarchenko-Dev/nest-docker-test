import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';
import type { Request, Response } from 'express';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();

    let request: Request | undefined;
    let response: Response | undefined;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest<Request>();
      response = context.switchToHttp().getResponse<Response>();
    }

    if (context.getType<'graphql'>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const ctx = gqlContext.getContext<{ req: Request; res: Response }>();
      request = ctx.req;
      response = ctx.res;
    }

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;

        void this.auditService.log({
          userId: request?.user?.id ?? undefined,
          type: 'HTTP_REQUEST',
          route: request?.originalUrl,
          method: request?.method,
          status: response?.statusCode,
          ip: request?.ip,
          userAgent: request?.headers?.['user-agent'],
          duration,
        });
      }),
    );
  }
}
