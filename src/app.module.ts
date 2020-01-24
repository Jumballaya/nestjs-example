import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TodoModule } from './modules/todo/todo.module';


// Create instance of config service to inject MongoDB address into the app module
const configService = new ConfigService();

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(configService.get('DATABASE_URL')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
