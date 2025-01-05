import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  todolistId: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;
}
