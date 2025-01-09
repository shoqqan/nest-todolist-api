import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodolistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'title must be shorter than 10 characters' })
  title: string;
}

export interface ICreateTodolist {
  title: string;
  userId: string;
}
