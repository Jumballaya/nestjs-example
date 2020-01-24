import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './dto/SignupRequest.dto';


@Injectable()
export class AuthenticationService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) return null;
        if (this.userService.comparePassword(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            updated: user.updated,
        }

        return {
            token: this.jwtService.sign(payload),
        };
    }

    async signup(user: SignupRequest) {
        return await this.userService.createUser(user as User);
    }
}
