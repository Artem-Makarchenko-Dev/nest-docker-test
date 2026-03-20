import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { DomainEventMap } from '../domain-event.types';

@Injectable()
export class PaymentListener {
  private readonly logger = new Logger(PaymentListener.name);

  @OnEvent('payment.completed')
  handlePaymentCompleted(payload: DomainEventMap['payment.completed']): void {
    this.logger.log(
      `Payment completed: paymentId=${payload.paymentId}, userId=${payload.userId}, amount=${payload.amount}`,
    );
  }

  @OnEvent('payment.failed')
  handlePaymentFailed(payload: DomainEventMap['payment.failed']): void {
    this.logger.warn(
      `Payment failed: paymentId=${payload.paymentId}, reason=${payload.reason}`,
    );
  }
}
