import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './app.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Setup Logger
    logger: new AppLogger(),
  });

  // Setup Swagger
  const environment = app.get('ConfigService').get('NODE_ENV') || 'development';
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`Todo App API: ${environment}`)
    .setDescription('Create todo lists')
    .setVersion('1.0.0')
    .addTag('Authentication', 'Authenticate user and check JWT')
    .addTag('Todo', 'CRUD operations on Todos')
    .addTag('User', 'Get user information')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, doc);


  // Setup Config
  const port = app.get('ConfigService').get('PORT') || 8080;
  await app.listen(port);
}
bootstrap();
