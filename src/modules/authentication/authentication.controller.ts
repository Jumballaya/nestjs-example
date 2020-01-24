import { Controller, UseGuards, Post, Get, Request, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SignupRequest } from './dto/SignupRequest.dto';
import { UserDto } from '../user/dto/User.dto';
import { LoginRequest } from './dto/LoginRequest.dto';
import { LoginResponse } from './dto/LoginResponse.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authService: AuthenticationService
    ) {}
    
    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: LoginRequest })
    @ApiResponse({ status: 200, type: LoginResponse })
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    @ApiBody({ type: SignupRequest })
    @ApiResponse({ status: 200, type: UserDto })
    async signup(@Body() req: SignupRequest) {
        return await this.authService.signup(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('check')
    async checkToken(@Request() req) {
        return req.user;
    }
}
