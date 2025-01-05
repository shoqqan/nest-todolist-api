import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }
  async findOne(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }
  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }
}
