import { Controller, Post, Body, HttpCode, HttpStatus, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            if (!createUserDto || !createUserDto.email || createUserDto.email.trim() === '') {
                throw new BadRequestException('L\'email ne peut pas être vide');
            }
            if (!this.isValidEmail(createUserDto.email)) {
                throw new BadRequestException('L\'email fourni n\'est pas valide');
            }

         
            const existingUser = await this.userService.getUser(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('L\'utilisateur existe déjà');
            }
            
            const newUser = await this.userService.addUser(createUserDto.email);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
