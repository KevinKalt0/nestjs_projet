import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks: any[] = []; 

    async resetData() {
    }
    async getTasksByUserId(userId: number): Promise<any[]> {
        return this.tasks.filter(task => task.userId === userId);
    }
    
    async createTask(createTaskDto: CreateTaskDto): Promise<any> {
        const newTask = { ...createTaskDto, id: this.tasks.length + 1 }; 
        this.tasks.push(newTask);
        return newTask;
    }

    async addTask(name: string, userId: string, priority: number) {
        const newTask = { name, userId, priority, id: Math.random().toString() }; 
        this.tasks.push(newTask);
        return newTask;
    }

    async getTaskByName(name: string) {
        return this.tasks.find(task => task.name === name);
    }

    async getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }
}


