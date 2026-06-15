import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: new URL(process.env.DATABASE_URL!).hostname,
      port: Number(new URL(process.env.DATABASE_URL!).port) || 3306,
      user: new URL(process.env.DATABASE_URL!).username,
      password: new URL(process.env.DATABASE_URL!).password,
      database: new URL(process.env.DATABASE_URL!).pathname.slice(1),
    });
    super({ adapter });
  }
}
