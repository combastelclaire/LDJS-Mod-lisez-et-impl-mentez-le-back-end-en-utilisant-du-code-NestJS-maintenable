import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  rental_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'Bonjour, est-ce disponible ce weekend ?' })
  @IsString()
  message: string;
}
