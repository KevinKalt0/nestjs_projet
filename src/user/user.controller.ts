import { Controller, Post, Body, HttpStatus, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() payload: { email: string }) {
    try {
      await this.userService.addUser(payload.email);
      return { message: 'User created successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      } else {
        throw new BadRequestException('Invalid user data');
      }
    }
  }
}
