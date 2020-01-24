import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../../interfaces/todo.interface';
import { UserService } from '../user/user.service';
import { TodoItemDto } from './dto/Todo.dto';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<Todo>,
        private readonly userService: UserService
    ) {}

    async getTodoById(id: string): Promise<Todo> {
        return await this.todoModel.findOne({ _id: id });
    }

    async getAllTodos(): Promise<Todo[]> {
        return await this.todoModel.find().exec();
    }

    async createTodo(name: string, ownerId: string): Promise<Todo> {
        const owner = this.userService.getUserById(ownerId);
        if (!owner) throw new Error(`User does not exist: ${ownerId}`);
        const todo = await this.todoModel({ name, owner: ownerId, items: [] });
        return await todo.save();
    }

    async deleteTodo(id: string): Promise<Todo> {
        const todo = await this.todoModel.findOne({ _id: id });
        await this.todoModel.deleteOne({ _id: id });
        return todo;
    }
    
    async pushTodoItems(id: string, updates: TodoItemDto[]): Promise<Todo> {
        const todo = await this.getTodoById(id);
        if (!todo) throw new Error(`Todo ${id} does not exist`);
        updates.forEach(u => {
            todo.items.push(u);
        })

        return await this.todoModel.findOneAndUpdate({ _id: id }, todo);
    }

    async updateTodoItem(todoId: string, itemId: string, update: TodoItemDto): Promise<Todo> {
        const todo = await this.getTodoById(todoId);
        if (!todo) throw new Error(`Todo ${todoId} doesn't exist`)

        const item = todo.items.filter(i => i.id === itemId);
        if (!item.length) throw new Error(`Todo item ${itemId} does not exist`)

        todo.items = todo.items.map(i => {
            if (i.id === itemId) {
                i.done = update.done;
                i.text = update.text;
            }
            return i;
        });
        return await this.todoModel.findOneAndUpdate({ _id: todoId }, todo);
    }

    async deleteTodoItem(todoId: string, itemId: string): Promise<Todo> {
        const todo = await this.getTodoById(todoId);
        if (!todo) throw new Error(`Todo ${todoId} doesn't exist`)

        const item = todo.items.filter(i => i.id === itemId);
        if (!item.length) throw new Error(`Todo item ${itemId} does not exist`)

        todo.items = todo.items.filter(i => i.id !== itemId);
        return await this.todoModel.findOneAndUpdate({ _id: todoId }, todo);
    }

    async getUsersTodos(userId: string): Promise<Todo[]> {
        return await this.todoModel.find({ owner: userId });
    }
}
