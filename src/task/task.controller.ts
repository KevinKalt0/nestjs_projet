import { Controller, Get, Param, HttpStatus, HttpException, Body, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('/user/:userId')
    async getTasksByUserId(@Param('userId') userId: string) {
        if (!userId || isNaN(+userId)) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }

        const tasks = await this.taskService.getTasksByUserId(+userId);
        return { tasks }; // Return the tasks with a proper HTTP status code
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const task = await this.taskService.createTask(createTaskDto);
        return { task }; // Return the created task with a proper HTTP status code
    }
}
