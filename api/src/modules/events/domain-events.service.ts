import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { DomainEventMap, DomainEventName } from './domain-event.types';

@Injectable()
export class DomainEventsService {
  constructor(private readonly emitter: EventEmitter2) {}

  emit<K extends DomainEventName>(event: K, payload: DomainEventMap[K]): void {
    this.emitter.emit(event, {
      type: event,
      ...payload,
    });
  }
}
