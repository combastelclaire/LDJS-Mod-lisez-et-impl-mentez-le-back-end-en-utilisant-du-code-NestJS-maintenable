import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@chatop.fr' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pierre Durand' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'password345', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}