import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { NewTodoRequest} from './dto/NewTodoRequest.dto';
import { UpdateTodoRequest } from './dto/UpdateTodoRequest.dto';
import { Todo } from '../../interfaces/todo.interface';
import { TodoItemDto, TodoDto } from './dto/Todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    // Get all todos
    @Get()
    @ApiOperation({ summary: 'Get all todos', description: 'Get a list of all the todos' })
    @ApiResponse({ status: 200, type: [TodoDto] })
    async allTodos() {
        return await this.todoService.getAllTodos();
    }

    // Create a new, empty, todo
    @Post()
    @ApiOperation({ summary: 'Create a new Todo', description: 'Create a new todo without todo items' })
    @ApiResponse({ status: 200, type: TodoDto })
    @ApiBody({ type: NewTodoRequest })
    async newTodo(@Body() body: NewTodoRequest) {
        return await this.todoService.createTodo(body.name, body.owner);
    }

    // Get a todo by ID
    @Get('/:todoId')
    @ApiOperation({ summary: 'Get a single Todo', description: 'Get a single todo by its ID' })
    @ApiResponse({ status: 200, type: TodoDto })
    async todoById(@Param('todoId') todoId: string) {
        return await this.todoService.getTodoById(todoId);
    }

    // Delete a Todo by id
    @Delete('/:todoId')
    @ApiOperation({ summary: 'Delete a Todo', description: 'Delete a todo by its ID' })
    @ApiResponse({ status: 200, type: TodoDto })
    async deleteTodo(@Param('todoId') todoId: string): Promise<Todo> {
        return await this.todoService.deleteTodo(todoId);
    }

    // Add an item to the list
    @Post('/:todoId')
    @ApiOperation({ summary: 'Add item to Todo', description: 'Push an item on the list of Todo Items' })
    @ApiResponse({ status: 200, type: TodoDto })
    @ApiBody({ type: UpdateTodoRequest})
    async pushTodoItems(@Param('todoId') todoId: string, @Body() body: UpdateTodoRequest) {
        return await this.todoService.pushTodoItems(todoId, body.updates);
    }

    // Update an item on a list
    @Post('/:todoId/:itemId')
    @ApiOperation({ summary: 'Update item on Todo', description: 'Update an item on the list of Todo Items' })
    @ApiResponse({ status: 200, type: TodoDto })
    async updateTodoItem(
        @Param('todoId') todoId: string,
        @Param('itemId') itemId: string,
        @Body() update: TodoItemDto
    ) {
        return await this.todoService.updateTodoItem(todoId, itemId, update);
    }

    // Delete an item on a list
    @Delete('/:todoId/:itemId')
    @ApiOperation({ summary: 'Delete item to Todo', description: 'Delete an item on the list of Todo Items' })
    @ApiResponse({ status: 200, type: TodoDto })
    async removeTodoItem(@Param('todoId') todoId: string, @Param('itemId') itemId: string) {
        return await this.todoService.deleteTodoItem(todoId, itemId);
    }

    // Get a user's todos
    @Get('/user/:userId')
    @ApiOperation({ summary: 'Get User\'s todos', description: 'Get a list of user\'s todo lists' })
    @ApiResponse({ status: 200, type: [TodoDto] })
    async getTodosByUser(@Param('userId') userId: string) {
        return await this.todoService.getUsersTodos(userId);
    }
}
