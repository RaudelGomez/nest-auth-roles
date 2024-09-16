import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { HashPasswordService } from './hash-password.service';
import { JwtServices } from './jwt/jwt.service';
@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PrismaService, HashPasswordService, JwtServices],
})
export class AppModule {}
