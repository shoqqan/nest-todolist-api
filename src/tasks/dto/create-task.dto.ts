import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  todolistId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, { message: 'Title must be shorter than 10 characters' })
  title: string;
}
