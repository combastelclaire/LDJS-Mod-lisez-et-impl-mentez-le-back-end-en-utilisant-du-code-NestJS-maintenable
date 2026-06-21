import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMessageDto } from './create-message.dto.js';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto, userId: number) {
    await this.prisma.message.create({
      data: {
        rental_id: dto.rental_id,
        user_id: userId,
        message: dto.message,
      },
    });
    return { message: 'Message envoyé avec succès' };
  }
}
