import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { HashPasswordService } from './hash-password.service';
import { JwtServices } from './jwt/jwt.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [UsersModule, DashboardModule],
  controllers: [],
  providers: [PrismaService, HashPasswordService, JwtServices],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('dashboard');
  }
}
