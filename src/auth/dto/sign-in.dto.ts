import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'name must be shorter than 20 characters' })
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'password must be shorter than 20 characters' })
  password: string;
}
