import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    BadRequestException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get('/user/:userId')
    async getTasksByUserId(@Param('userId') userId: string) {
        if (!this.isValidUserId(userId)) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }

        const tasks = await this.taskService.getTasksByUserId(+userId);
        return { tasks }; // Return the tasks with a proper HTTP status code
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { name, userId, priority } = createTaskDto;

        if (
            !name ||
            !this.isValidUserId(userId) ||
            !this.isValidPriority(priority)
        ) {
            throw new BadRequestException('Invalid task data');
        }

        const task = await this.taskService.addTask(name, userId, priority);
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
