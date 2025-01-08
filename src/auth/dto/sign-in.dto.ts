import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, { message: 'Password must be shorter than 10 characters' })
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, { message: 'Password must be shorter than 10 characters' })
  password: string;
}
