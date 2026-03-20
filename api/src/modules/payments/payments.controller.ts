import {
  Controller,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @HttpCode(201)
  async createCheckoutSession(@Req() req: Request) {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return this.paymentsService.createCheckoutSession(userId);
  }
}
