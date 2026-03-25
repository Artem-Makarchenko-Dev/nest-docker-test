import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  LivenessResponseDto,
  ReadinessResponseDto,
} from '../dto/health-responses.dto';
import { ApiErrServiceUnavailable } from '../../../common/swagger/standard-error-responses.decorator';

export function SwaggerHealthLive() {
  return applyDecorators(
    ApiOperation({
      summary: 'Liveness probe',
      description: 'Process is up; does not check downstream dependencies.',
    }),
    ApiOkResponse({
      description: 'Alive',
      type: LivenessResponseDto,
    }),
  );
}

export function SwaggerHealthReady() {
  return applyDecorators(
    ApiOperation({
      summary: 'Readiness probe',
      description:
        'Checks PostgreSQL connectivity. Returns **503** when not ready.',
    }),
    ApiOkResponse({
      description: 'All checks passed',
      type: ReadinessResponseDto,
    }),
    ApiErrServiceUnavailable('Postgres down or unreachable'),
  );
}
