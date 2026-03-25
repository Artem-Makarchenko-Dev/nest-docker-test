import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InternalUserRecordDto } from '../common/dto/internal-user-record.dto';

export function SwaggerPrismaController() {
  return applyDecorators(ApiTags('Internal'));
}

export function SwaggerPrismaFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'List all users (Prisma smoke test)',
      description:
        '**Internal / development.** Returns every user row. Disable or protect in production.',
    }),
    ApiOkResponse({
      description: 'Array of user records',
      type: InternalUserRecordDto,
      isArray: true,
    }),
  );
}
