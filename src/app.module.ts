import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'test_nestjs-final-test-db_TASKS',
            entities: [User, Task],
            synchronize: true,
        }),
        TaskModule,
        UserModule,
    ],
})
export class AppModule {}
