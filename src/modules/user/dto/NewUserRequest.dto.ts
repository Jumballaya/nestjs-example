import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NewUserRequest {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    firstName?: string;
    
    @ApiPropertyOptional()
    lastName?: string;
}