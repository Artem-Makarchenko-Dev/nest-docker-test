import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import {
  SwaggerUsersController,
  SwaggerFindAllUsers,
  SwaggerFindOneUser,
  SwaggerDeleteUser,
} from './swagger/users.swagger';

@SwaggerUsersController()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions('users.read')
  @SwaggerFindAllUsers()
  findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @Permissions('users.read')
  @SwaggerFindOneUser()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @Permissions('users.delete')
  @SwaggerDeleteUser()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
