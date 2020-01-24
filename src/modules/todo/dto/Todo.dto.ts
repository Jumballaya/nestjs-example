import { ApiProperty } from "@nestjs/swagger";

export class TodoItemDto {

    @ApiProperty()
    text: string;

    @ApiProperty()
    done: boolean;
}

export class TodoDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    owner: string;

    @ApiProperty({ type: [TodoItemDto] })
    items: TodoItemDto[];
}