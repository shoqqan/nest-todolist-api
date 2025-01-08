import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  todolistId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
