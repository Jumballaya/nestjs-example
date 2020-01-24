import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty()
    email: string;

    password: string;

    @ApiPropertyOptional()
    firstName?: string;

    @ApiPropertyOptional()
    lastName?: string;

    @ApiProperty()
    created: Date;

    @ApiProperty()
    updated: Date;  
}