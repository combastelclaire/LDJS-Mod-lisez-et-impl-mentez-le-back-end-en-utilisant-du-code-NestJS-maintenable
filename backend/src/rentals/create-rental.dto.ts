import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'Appartement Poitiers' })
  @IsString()
  name: string;

  @ApiProperty({ example: 70 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  surface: number;

  @ApiProperty({ example: 800 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Appartement traversant au coeur de Poitiers' })
  @IsString()
  description: string;
}
