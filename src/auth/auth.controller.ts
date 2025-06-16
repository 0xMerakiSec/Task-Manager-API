import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @Public()
  register(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
  @Post('login')
  @Public()
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signIn(userLoginDto);
  }
}
