import { Controller, Get } from '@nestjs/common';
import { Public } from '../modules/auth/decorators/public.decorator';
import { RedisService } from './redis.service';
import { SwaggerRedisController, SwaggerRedisTest } from './redis.swagger';

@SwaggerRedisController()
@Controller('redis')
export class RedisController {
  constructor(private readonly redis: RedisService) {}

  @Public()
  @Get()
  @SwaggerRedisTest()
  async redisTest() {
    await this.redis.set('hello', 'world');
    return this.redis.get('hello');
  }
}
