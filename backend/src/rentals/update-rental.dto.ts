import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRentalDto {
  @ApiPropertyOptional({ example: 'Appartement Poitiers' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  surface?: number;

  @ApiPropertyOptional({ example: 800 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 'Appartement traversant au coeur de Poitiers.' })
  @IsOptional()
  @IsString()
  description?: string;
}
