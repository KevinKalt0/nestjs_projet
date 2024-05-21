import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, User])],
    providers: [TaskService, UserService],
    controllers: [TaskController],
})
export class TaskModule {}
