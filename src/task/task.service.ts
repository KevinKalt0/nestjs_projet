import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addTask(name: string, userId: number, priority: number): Promise<Task> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const task = this.taskRepository.create({ name, user, priority });
        return this.taskRepository.save(task);
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.taskRepository.find({
            where: { user },
            relations: ['user'],
        });
    }

    async getTaskById(taskId: number): Promise<Task> {
        return this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['user'],
        });
    }

    async getTaskByName(name: string): Promise<Task | undefined> {
        return this.taskRepository.findOne({ where: { name }, relations: ['user'] });
    }

    async resetData(): Promise<void> {
        await this.taskRepository.query('DELETE FROM task');
        await this.userRepository.query('DELETE FROM user');
    }
}
