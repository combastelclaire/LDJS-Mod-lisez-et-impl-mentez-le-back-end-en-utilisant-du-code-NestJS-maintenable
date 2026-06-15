import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UserService } from './user.service.js';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }
}
