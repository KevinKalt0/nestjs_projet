import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks: { name: string; userId: string; priority: number }[] = [];

  async addTask(name: string, userId: string, priority: number) {
    if (!name || !userId || priority === undefined || priority === null || priority <= 0) {
      throw new Error('Invalid task data');
    }

    this.tasks.push({ name, userId, priority });
  }

  async getTaskByName(name: string) {
    return this.tasks.find(task => task.name === name);
  }

  async resetData() {
    this.tasks = [];
  }

  async getUserTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId);
  }
}
