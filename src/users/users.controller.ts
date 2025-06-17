import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }
}
