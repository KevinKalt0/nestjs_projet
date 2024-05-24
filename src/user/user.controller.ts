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
            // Vérifier si l'email est vide ou non défini
            if (!createUserDto || !createUserDto.email || createUserDto.email.trim() === '') {
                throw new BadRequestException('L\'email ne peut pas être vide');
            }

            // Vérifier si l'email est valide
            if (!this.isValidEmail(createUserDto.email)) {
                throw new BadRequestException('L\'email fourni n\'est pas valide');
            }

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await this.userService.getUser(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('L\'utilisateur existe déjà');
            }
            
            // Créer l'utilisateur
            const newUser = await this.userService.addUser(createUserDto.email);
            return newUser;
        } catch (error) {
            // Capturer les exceptions et renvoyer une réponse avec le code d'état approprié
            throw error;
        }
    }

    // Fonction pour valider un email
    private isValidEmail(email: string): boolean {
        // Ajoutez votre logique de validation d'email ici
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
