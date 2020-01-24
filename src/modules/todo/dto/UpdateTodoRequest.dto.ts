import { ApiProperty } from '@nestjs/swagger';
import { TodoItemDto, TodoDto } from './Todo.dto';

export class UpdateTodoRequest {
    
    @ApiProperty({ type: [TodoItemDto] })
    updates: TodoItemDto[];
}