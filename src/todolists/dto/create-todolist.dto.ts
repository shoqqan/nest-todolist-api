import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodolistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export interface ICreateTodolist {
  title: string;
  userId: string;
}
