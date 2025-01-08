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
  HttpStatus,
} from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @ApiOperation({ summary: 'Create a new todolist' })
  @ApiBody({ type: CreateTodolistDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodolist: CreateTodolistDto, @Req() request: Request) {
    return this.todolistsService.create({
      title: createTodolist.title,
      userId: request['user']['sub'],
    });
  }

  @ApiOperation({ summary: 'Get all todolists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.todolistsService.findAll();
  }

  @ApiOperation({ summary: 'Get todolist' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a todolist' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTodolistDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return this.todolistsService.update(id, updateTodolistDto);
  }

  @ApiOperation({ summary: 'Delete a todolist' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistsService.remove(id);
  }
}
