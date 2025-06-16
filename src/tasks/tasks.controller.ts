import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,

  // UseGuards,
} from '@nestjs/common';
import { CreateTaskDto, PaginationDto } from './dto';
import { TasksService } from './tasks.service';
import { Task } from 'src/schemas/tasks/task.schema';
import { UserReq } from 'src/decorators';
// import { User } from 'src/schemas/users/user.schema';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
// @UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  //Todo: Make all the routes private so it can only be accessed by the author
  @Get()
  findAll(
    @UserReq() user: { sub: string; username: string },
    @Query() paginationDto: PaginationDto,
  ) {
    return this.tasksService.findAll(user, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post('create')
  create(
    @Body() taskDto: CreateTaskDto,
    @UserReq() user: { sub: string; username: string },
  ) {
    return this.tasksService.create(taskDto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.update(task, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
