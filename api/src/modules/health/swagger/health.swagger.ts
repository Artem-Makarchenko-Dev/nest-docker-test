import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerHealthLive() {
  return applyDecorators(
    ApiOperation({ summary: 'Liveness probe' }),
    ApiResponse({
      status: 200,
      description: 'Application is alive',
      schema: { example: { status: 'ok' } },
    }),
  );
}

export function SwaggerHealthReady() {
  return applyDecorators(
    ApiOperation({ summary: 'Readiness probe' }),
    ApiResponse({
      status: 200,
      description: 'Application is ready',
      schema: {
        example: {
          status: 'ok',
          checks: { postgres: { status: 'up', latencyMs: 3 } },
          uptime: 120.5,
          timestamp: '2026-01-01T00:00:00.000Z',
        },
      },
    }),
    ApiResponse({ status: 503, description: 'Service unavailable' }),
  );
}
