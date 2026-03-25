import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrUnauthorized } from '../../../common/swagger/standard-error-responses.decorator';

export function SwaggerAdminEventsController() {
  return applyDecorators(ApiTags('Admin'));
}

export function SwaggerAdminEventsSse() {
  return applyDecorators(
    ApiOperation({
      summary: 'Admin event stream',
      description: `
Server-Sent Events (\`text/event-stream\`) of domain events from the application bus.

**Clients:** use \`EventSource\`, \`fetch\` with streaming, or any SSE-capable HTTP client.

**Swagger UI:** does not support long-lived streams — call this endpoint from a real client, not "Try it out".
`.trim(),
    }),
    ApiProduces('text/event-stream'),
    ApiResponse({
      status: 200,
      description: 'Open-ended stream of `message` events',
      schema: {
        type: 'string',
        example:
          'event: message\ndata: {"type":"file.processed","data":{}}\n\n',
      },
    }),
    ApiErrUnauthorized(),
  );
}
