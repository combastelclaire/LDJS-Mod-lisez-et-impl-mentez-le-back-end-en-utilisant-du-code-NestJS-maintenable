import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMessageDto } from './create-message.dto.js';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    await this.prisma.message.create({
      data: {
        rental_id: dto.rental_id,
        user_id: dto.user_id,
        message: dto.message,
      },
    });
    return { message: 'Message send with success' };
  }
}
