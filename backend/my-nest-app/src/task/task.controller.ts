import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('stats')
  getStats() {
    return this.tasksService.getStats();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.getTasks();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id);
  }
}
