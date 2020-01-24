import { ObjectId } from 'mongoose';

interface TodoItem {
    id?: string;
    text: string;
    done: boolean;
}

export interface Todo {
    name: string;
    owner: ObjectId;
    items: TodoItem[];
    updated?: Date;
    created?: Date;
}