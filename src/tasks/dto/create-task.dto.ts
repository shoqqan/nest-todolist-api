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
  @MaxLength(20, { message: 'title must be shorter than 20 characters' })
  title: string;
}
