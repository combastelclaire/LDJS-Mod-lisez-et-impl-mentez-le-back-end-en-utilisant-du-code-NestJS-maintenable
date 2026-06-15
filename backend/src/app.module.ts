import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { RentalsModule } from './rentals/rentals.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [AuthModule, RentalsModule, UserModule, MessagesModule],
})
export class AppModule {}
