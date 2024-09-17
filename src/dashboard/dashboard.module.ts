import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('dashboard');
  }
}
