import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckoutSessionResponseDto } from '../dto/checkout-response.dto';
import {
  ApiErrNotFound,
  ApiErrUnauthorized,
} from '../../../common/swagger/standard-error-responses.decorator';

export function SwaggerPaymentsController() {
  return applyDecorators(ApiTags('Payments'));
}

export function SwaggerCreateCheckout() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Stripe Checkout session',
      description:
        'Starts subscription checkout for the Premium plan. Creates or reuses a Stripe customer for the current user; returns a hosted Checkout URL.',
    }),
    ApiCreatedResponse({
      description: 'Hosted Checkout URL',
      type: CheckoutSessionResponseDto,
    }),
    ApiErrUnauthorized(),
    ApiErrNotFound('User record missing'),
  );
}
