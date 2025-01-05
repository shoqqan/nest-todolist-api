import { Injectable } from '@nestjs/common';
import { ICreateTodolist } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodolistsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTodolistDto: ICreateTodolist) {
    return this.prismaService.todolist.create({ data: createTodolistDto });
  }

  findAll() {
    return this.prismaService.todolist.findMany();
  }

  findOne(id: string) {
    return this.prismaService.todolist.findUnique({ where: { id } });
  }

  update(id: string, updateTodolistDto: UpdateTodolistDto) {
    return this.prismaService.todolist.update({
      where: { id },
      data: updateTodolistDto,
    });
  }

  remove(id: string) {
    return this.prismaService.todolist.delete({ where: { id } });
  }
}
