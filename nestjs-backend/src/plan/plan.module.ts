import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PlanController } from './plan.controller';
import { PlanQueueProcessor } from './plan.processor';
import { PlanService } from './plan.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'plan',
    }),
    PrismaModule,
  ],
  controllers: [PlanController],
  providers: [PlanService, PlanQueueProcessor, AiService],
})
export class PlanModule {}
