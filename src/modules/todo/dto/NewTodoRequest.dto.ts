import { ApiProperty } from "@nestjs/swagger";

export class NewTodoRequest {

    @ApiProperty()
    name: string;

    @ApiProperty()
    owner: string;
}