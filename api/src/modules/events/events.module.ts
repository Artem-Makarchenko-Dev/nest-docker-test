import { Module } from '@nestjs/common';
import { DomainEventsService } from './domain-events.service';
import { PaymentListener } from './listeners/payment.listener';

@Module({
  providers: [DomainEventsService, PaymentListener],
  exports: [DomainEventsService],
})
export class EventsModule {}
