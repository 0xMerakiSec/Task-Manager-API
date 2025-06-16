import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
