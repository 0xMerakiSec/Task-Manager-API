import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users/user.schema';
import { UserLoginDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userData: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(userData);
    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'User does not exist' },
        HttpStatus.NOT_FOUND,
      );
    }
    const validatePass = await user.comparePassword(userData.password);
    if (!validatePass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.username };
    //todo: implement password hash verification
    //todo: generate the access token and send to the user
    const access_token = await this.jwtService.signAsync(payload);
    if (access_token) {
      await this.userModel.findOneAndUpdate(
        { email: user.email },
        { $set: { access_token: access_token } },
        { new: true },
      );
    }
    return { access_token: access_token };
  }
}
