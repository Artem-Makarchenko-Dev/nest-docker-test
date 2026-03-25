import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

export function SwaggerRedisController() {
  return applyDecorators(ApiTags('Internal'));
}

export function SwaggerRedisTest() {
  return applyDecorators(
    ApiOperation({
      summary: 'Redis SET/GET smoke test',
      description:
        '**Internal / development.** Writes `hello` → `world` then reads it back. Disable or protect in production.',
    }),
    ApiOkResponse({
      description: 'Value read from Redis',
      schema: {
        type: 'string',
        example: 'world',
      },
    }),
  );
}
