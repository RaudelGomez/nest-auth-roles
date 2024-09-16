import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashPasswordService } from 'src/hash-password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HashPasswordService],
})
export class UsersModule {}
