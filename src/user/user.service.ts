import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users: { email: string }[] = [];

    async addUser(email: string): Promise<{ email: string }> {
        const newUser = { email };
        this.users.push(newUser);
        return newUser;
    }   

    async getUser(email: string): Promise<{ email: string } | undefined> {
        return this.users.find(user => user.email === email);
    }

    async resetData(): Promise<void> {
        this.users = [];
    }
}


