import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }from 'mongoose';
import * as crypto from 'crypto';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id });
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async createUser(user: User): Promise<User> {
        user.password = this.hashPassword(user.password);
        const newUser = await this.userModel(user);
        return await newUser.save();
    }

    hashPassword(key: string): string {
        return crypto.createHash('sha256').update(key).digest('base64').toString();  
    }
    
    comparePassword(plain: string, hash: string): boolean {
        return this.hashPassword(plain) === hash;
    }

}