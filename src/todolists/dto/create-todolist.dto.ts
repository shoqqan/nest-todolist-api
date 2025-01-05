import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodolistDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export interface ICreateTodolist {
  title: string;
  userId: string;
}
