import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { TodolistsModule } from './todolists/todolists.module';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Todolists')
    .setDescription('The MLG Todolists API description')
    .setVersion('1.0')
    .addTag('todolists')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [AuthModule, TodolistsModule, TasksModule],
    });
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(8080);
}
bootstrap();
