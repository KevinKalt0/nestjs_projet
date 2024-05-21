import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
    ) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        if (!this.isValidUserId(userId)) {
            throw new BadRequestException('Invalid userId');
        }

        const tasks = await this.taskService.getUserTasks(Number(userId));
        return tasks;
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { name, userId, priority } = createTaskDto;

        if (!name || !this.isValidUserId(userId) || !this.isValidPriority(priority)) {
            throw new BadRequestException('Invalid task data');
        }

        const task = await this.taskService.addTask(name, Number(userId), Number(priority));
        return task;
    }

    private isValidUserId(userId: string): boolean {
        return /^\d+$/.test(userId);
    }

    private isValidPriority(priority: any): boolean {
        const num = Number(priority);
        return Number.isInteger(num) && num > 0;
    }
}
