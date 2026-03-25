import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export function SwaggerStripeWebhookController() {
  return applyDecorators(ApiTags('Stripe'));
}

export function SwaggerStripeWebhook() {
  return applyDecorators(
    ApiOperation({
      summary: 'Stripe webhook',
      description: `
Receives Stripe events with a **raw JSON** body. Signature verification uses the \`Stripe-Signature\` header.

**Handled event types (today):**
- \`checkout.session.completed\` — upgrades user to PRO when checkout completes
- \`customer.subscription.deleted\` — downgrades user to FREE

Other event types are accepted by Stripe's SDK but currently no-op in application logic.
`.trim(),
    }),
    ApiHeader({
      name: 'Stripe-Signature',
      required: true,
      description: 'HMAC of the raw request body (set by Stripe)',
    }),
    ApiBody({
      description:
        'Raw Stripe Event JSON. Must not be re-serialized — signature is over raw bytes.',
      schema: {
        type: 'object',
        additionalProperties: true,
        example: {
          id: 'evt_123',
          type: 'checkout.session.completed',
          data: { object: {} },
        },
      },
    }),
    ApiOkResponse({
      description: 'Empty 200 on success',
      schema: { type: 'string', example: '' },
    }),
    ApiResponse({
      status: 401,
      description:
        'Invalid signature or payload (plain text body, not the global JSON error envelope)',
      schema: { type: 'string', example: 'Webhook Error' },
    }),
  );
}
