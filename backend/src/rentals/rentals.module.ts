import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RentalsController } from './rentals.controller.js';
import { RentalsService } from './rentals.service.js';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService, PrismaService],
})
export class RentalsModule {}
