import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/tasks/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, PaginationDto } from './dto';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/users/user.schema';
import { TasksGateway } from './tasks.gateway';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly taskGateway: TasksGateway,
  ) {}
  async create(
    createTaskDto: CreateTaskDto,
    user: { sub: string; username: string },
  ): Promise<Task> {
    try {
      const currentUser = await this.userModel.find({ email: user.sub });

      const createdtask = await this.taskModel.create({
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        userId: currentUser[0]._id,
      });
      this.taskGateway.server.emit('taskCreated', createdtask);
      return createdtask;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { staus: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unknown Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async findAll(
    user: { sub: string; username: string },
    paginationDto: PaginationDto,
  ): Promise<
    | {
        data: Task[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }
    | undefined
  > {
    try {
      const currentUser = await this.userModel.find({ email: user.sub });
      const { page, limit } = paginationDto;
      const skip = (page - 1) * limit;
      const data = await this.taskModel
        .find({ userId: currentUser[0]._id })
        .skip(skip)
        .limit(limit)
        .exec();
      const allTasks = await this.taskModel.find({
        userId: currentUser[0]._id,
      });
      const total = allTasks.length;
      if (total <= 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'No tasks found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return total
        ? { data, total, limit, page, totalPages: Math.ceil(total / limit) }
        : undefined;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unknown Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async update(task: Task, id: string): Promise<Task> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, message: 'Invalid Id' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedTask = await this.taskModel
        .findOneAndUpdate({ _id: id }, { ...task }, { new: true })
        .exec();
      if (!updatedTask) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      this.taskGateway.server.emit('taskUpdated', updatedTask);
      return updatedTask;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unknown Error',
          error: error?.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async delete(id: string) {
    try {
      this.taskGateway.server.emit('taskDeleted', { id });
      return await this.taskModel.deleteOne({ _id: id });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unknown Error! Failed to delete the task',
          error: error?.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid Id',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const task = await this.taskModel.findById(id);
      if (!task) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return task;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unknown Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
