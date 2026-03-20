import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { HealthService } from './health.service';
import { Public } from '../auth/decorators/public.decorator';
import {
  SwaggerHealthLive,
  SwaggerHealthReady,
} from './swagger/health.swagger';

@ApiTags('Health')
@ApiBearerAuth('access-token')
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @Public()
  @SwaggerHealthLive()
  live() {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  @Public()
  @SwaggerHealthReady()
  async ready() {
    const result = await this.healthService.getReadiness();

    if (result.status !== 'ok') {
      throw new HttpException(result, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return result;
  }
}
