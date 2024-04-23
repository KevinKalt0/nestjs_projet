import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: { email: string }[] = [];

  async addUser(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    this.users.push({ email });
  }

  async getUser(email: string) {
    return this.users.find(user => user.email === email);
  }

  async resetData() {
    this.users = [];
  }

  private isValidEmail(email: string) {
    // Simple email validation, you may use a more comprehensive method
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
