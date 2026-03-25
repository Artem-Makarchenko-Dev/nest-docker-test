import { Controller, Get } from '@nestjs/common';
import { Public } from '../modules/auth/decorators/public.decorator';
import { PrismaService } from './prisma.service';
import {
  SwaggerPrismaController,
  SwaggerPrismaFindAllUsers,
} from './prisma.swagger';

@SwaggerPrismaController()
@Controller('prisma')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  @SwaggerPrismaFindAllUsers()
  getUsers() {
    return this.prisma.user.findMany();
  }
}
