import { Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

export const routes: Routes = [
    {
        path: '',
        module: UserModule,
    },
    {
        path: '',
        module: TaskModule,
    },
];
