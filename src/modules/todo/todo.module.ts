import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoSchema } from './todo.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Todo',
      schema: TodoSchema,
    }]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
