import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/tasks/task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/users/user.schema';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
})
export class TasksModule {}
