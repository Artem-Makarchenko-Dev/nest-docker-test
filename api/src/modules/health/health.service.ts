import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LivenessStatus } from './types/liveness-status.type';
import { ReadinessStatus } from './types/readiness-status.type';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getLiveness(): LivenessStatus {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness(): Promise<ReadinessStatus> {
    const postgres = await this.checkPostgres();

    return {
      status: postgres.status === 'up' ? 'ok' : 'error',
      checks: { postgres },
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  private async checkPostgres(): Promise<{
    status: 'up' | 'down';
    latencyMs?: number;
  }> {
    const startedAt = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'up', latencyMs: Date.now() - startedAt };
    } catch {
      return { status: 'down' };
    }
  }
}
