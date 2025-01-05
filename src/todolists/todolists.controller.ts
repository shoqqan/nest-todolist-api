import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request } from 'express';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodolist: CreateTodolistDto, @Req() request: Request) {
    return this.todolistsService.create({
      title: createTodolist.title,
      userId: request['user']['sub'],
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.todolistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return this.todolistsService.update(id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistsService.remove(id);
  }
}
