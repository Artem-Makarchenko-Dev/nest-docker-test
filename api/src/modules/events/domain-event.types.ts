export type DomainEventMap = {
  'file.uploaded': {
    fileId: number;
    userId: number;
  };

  'file.processed': {
    fileId: number;
    userId: number;
    size: number;
  };

  'payment.completed': {
    paymentId: number;
    userId: number;
    amount: number;
  };

  'payment.failed': {
    paymentId: number;
    userId: number;
    reason?: string;
  };
};

export type DomainEventName = keyof DomainEventMap;
