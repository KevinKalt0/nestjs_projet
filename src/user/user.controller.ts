import {
    Controller,
    Post,
    Body,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        if (!this.isValidEmail(email)) {
            throw new BadRequestException('Invalid email');
        }

        const existingUser = await this.userService.getUser(email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const user = await this.userService.addUser(email);
        return user;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
