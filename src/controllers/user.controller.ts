import { Controller, Post, Body, HttpCode, HttpException } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { ResponseService } from '../utils';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly responseService: ResponseService
    ) { }

    @Post('/create')
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto);

            return this.responseService.generateSuccessResponse(user, 'User created successfully', 201);

        } catch (error) {
            const message = error.message || 'Error creating user'; 

            throw new HttpException(message, error?.code || 400);
        }
    }

    @Post('/login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        try {
            const user = await this.userService.loginUser(loginUserDto);

            return this.responseService.generateSuccessResponse(user, 'User authenticated successfully');

        } catch (error) {
            const message = error.message || 'Error authenticating user'; 

            throw new HttpException(message, error?.code || 400);
        } 
    }
}
