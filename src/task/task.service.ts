import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async addTask(name: string, userId: number, priority: number): Promise<Task> {
        const task = this.taskRepository.create({ name, user: { id: userId }, priority });
        return this.taskRepository.save(task);
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { user: { id: userId } } });
    }

    async resetData(): Promise<void> {
        await this.taskRepository.clear();
    }

    async getTaskByName(name: string): Promise<Task> {
        return this.taskRepository.findOne({ where: { name } });
    }
}


