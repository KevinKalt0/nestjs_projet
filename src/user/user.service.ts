import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<User> {
        const user = this.userRepository.create({ email });
        return this.userRepository.save(user);
    }

    async getUser(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email },
            relations: ['tasks'],
        });
    }

    async resetData(): Promise<void> {
        await this.userRepository.clear();
    }
}
