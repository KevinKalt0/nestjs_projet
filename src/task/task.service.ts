import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks: any[] = []; // We will use an array to store tasks temporarily

    async resetData() {
        // Implement logic to reset task data, if needed
    }
    async getTasksByUserId(userId: number): Promise<any[]> {
        return this.tasks.filter(task => task.userId === userId);
    }
    
    async createTask(createTaskDto: CreateTaskDto): Promise<any> {
        const newTask = { ...createTaskDto, id: this.tasks.length + 1 }; // Example: Generate ID
        this.tasks.push(newTask);
        return newTask;
    }

    async addTask(name: string, userId: string, priority: number) {
        // Implement logic to add a task
        const newTask = { name, userId, priority, id: Math.random().toString() }; // Temporary ID generation
        this.tasks.push(newTask);
        return newTask;
    }

    async getTaskByName(name: string) {
        // Implement logic to get a task by name
        return this.tasks.find(task => task.name === name);
    }

    async getUserTasks(userId: string) {
        // Implement logic to get tasks for a user
        return this.tasks.filter(task => task.userId === userId);
    }
}


