import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConnectionResponseDto } from './common/dto/connection-response.dto';

export function SwaggerAppController() {
  return applyDecorators(ApiTags('Core'));
}

export function SwaggerConnection() {
  return applyDecorators(
    ApiOperation({
      summary: 'Connectivity check',
      description: 'Lightweight endpoint to verify the API is reachable.',
    }),
    ApiOkResponse({
      description: 'Status message',
      type: ConnectionResponseDto,
    }),
  );
}
