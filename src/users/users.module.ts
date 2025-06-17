import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users/user.schema';
import { CommonModule } from 'src/common/common.module';
import { RolesGuard } from './guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommonModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [UsersService],
})
export class UsersModule {}
