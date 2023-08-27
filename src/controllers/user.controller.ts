import { Controller, Inject, Post, Body, HttpCode, HttpException, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { ResponseService } from '../utils';
import { AuthGuard } from '../middleware';

@Controller('users')
export class UserController {
    constructor(
        // @Inject('winston')
        private readonly userService: UserService,
        private readonly responseService: ResponseService,
        // private readonly logger: Logger,
    ) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async createUser(
        @Body() createUserDto: CreateUserDto,
        @Req() request: any
    ) {
        try {            
            createUserDto.is_admin = request.user.is_admin;

            const user = await this.userService.createUser(createUserDto);

            return this.responseService.generateSuccessResponse(user, 'User created successfully', 201);

        } catch (error) {
            const message = error.message || 'Error creating user';

            throw new HttpException(message, error?.code || 400);
        }
    }
}
