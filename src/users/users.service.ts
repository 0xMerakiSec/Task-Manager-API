import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users/user.schema';
import { CreateUserDto, UserLoginDto } from './dto';

// import * as mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //get the user from the database
  async findOne(userData: UserLoginDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        email: userData.email.trim(),
      });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User Not Found!',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unknwon Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  async findAll(): Promise<
    | {
        data: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }
    | undefined
  > {
    return;
  }
  async create(userData: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ email: userData.email });
      if (user) {
        throw new HttpException(
          { status: HttpStatus.CONFLICT, message: 'User already exists' },
          HttpStatus.CONFLICT,
        );
      }
      if (!userData) {
        throw new BadRequestException('User data required');
      }

      return await this.userModel.create(userData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create the user because of unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
