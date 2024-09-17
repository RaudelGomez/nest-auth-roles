import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { HashPasswordService } from './hash-password.service';
import { JwtServices } from './jwt/jwt.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { PermisionGuard } from './guards/permision/permision.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, DashboardModule],
  controllers: [],
  providers: [PrismaService, HashPasswordService, JwtServices, 
    // {
    // provide: APP_GUARD,
    // useClass: PermisionGuard,
    // },
  ],
})
export class AppModule  {}
