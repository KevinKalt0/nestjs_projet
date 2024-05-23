import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { name, userId, priority } = createTaskDto;

        if (!name || userId === undefined || priority === undefined) {
            throw new BadRequestException('Invalid task data');
        }

        const userIdNumber = parseInt(userId.toString(), 10);
        if (isNaN(userIdNumber)) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            const task = await this.taskService.addTask(name, userIdNumber, priority);
            return task;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            const tasks = await this.taskService.getUserTasks(userIdNumber);
            return tasks;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
