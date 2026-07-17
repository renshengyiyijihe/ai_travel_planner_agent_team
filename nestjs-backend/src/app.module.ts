import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { PlanModule } from './plan/plan.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './tasks/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QueueModule,
    PrismaModule,
    PlanModule,
    CommonModule,
  ],
})
export class AppModule {}
