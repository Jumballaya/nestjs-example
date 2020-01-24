import { Controller, Get, Param, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../../interfaces/user.interface';
import { UserDto } from './dto/User.dto';
import { NewUserRequest } from './dto/NewUserRequest.dto';
import { validateNewUserBody } from './user.validation';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('/:email')
    @ApiOperation({ summary: 'Get a single user by email', description: 'This endpoint fetches a single user based on email, if no user is found then a blank object is returned' })
    @ApiResponse({ status: 200, description: 'User from database', type: UserDto })
    async getUserByEmail(@Param('email') email: string) {
        return await this.userService.getUserByEmail(email);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users', description: 'This endpoint fetches an array of all users in the database' })
    @ApiResponse({ status: 200, description: 'Users from database', type: [UserDto] })
    async getAllUsers() {
        return await this.userService.findAll();
    }
    
    @Post()
    @ApiOperation({ summary: 'Create a new user', description: 'This endpoint creates a new user' })
    @ApiBody({ description: 'New user payload', type: NewUserRequest })
    @ApiResponse({ status: 200, description: 'Users from database', type: UserDto })
    @UsePipes(new JoiValidationPipe(validateNewUserBody))
    async createUser(@Body() user: User) {
        return await this.userService.createUser(user);
    }
}
