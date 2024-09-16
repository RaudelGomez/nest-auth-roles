import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashPasswordService } from 'src/hash-password.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './users.constants';
import { JwtServices } from 'src/jwt/jwt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HashPasswordService, JwtServices],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class UsersModule {}
