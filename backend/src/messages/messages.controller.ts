import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateMessageDto } from './create-message.dto.js';
import { MessagesService } from './messages.service.js';

@ApiBearerAuth()
@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
@Controller('api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }
}
