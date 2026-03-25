import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';
import { SwaggerAppController, SwaggerConnection } from './app.swagger';

@SwaggerAppController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('connection')
  @SwaggerConnection()
  getConnectionStatus() {
    return { message: this.appService.getConnectionStatus() };
  }
}
