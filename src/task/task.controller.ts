import { Controller, Post, Body, HttpStatus, BadRequestException, ConflictException } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() payload: { name: string; userId: string; priority: number }) {
    try {
      await this.taskService.addTask(payload.name, payload.userId, payload.priority);
      return { message: 'Task created successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      } else {
        throw new BadRequestException('Invalid task data');
      }
    }
  }
}
