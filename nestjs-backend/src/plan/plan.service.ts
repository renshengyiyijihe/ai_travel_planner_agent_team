import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { TravelPlanAgentRequestDto } from './dto/travel-plan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectQueue('plan') private readonly planQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async triggerPlanGeneration(request: TravelPlanAgentRequestDto): Promise<string> {
    await this.prisma.tripPlanStatus.upsert({
      where: { tripPlanId: request.trip_plan_id },
      create: {
        tripPlanId: request.trip_plan_id,
        status: 'pending',
        currentStep: 'Queued for travel plan generation',
      },
      update: {
        status: 'pending',
        currentStep: 'Queued for travel plan generation',
        error: null,
        completedAt: null,
      },
    });

    const task = await this.prisma.planTask.create({
      data: {
        trip_plan_id: request.trip_plan_id,
        task_type: 'travel_plan_generation',
        status: 'queued',
        input_data: request.travel_plan as any,
      },
    });

    await this.planQueue.add('generate-travel-plan', {
      taskId: task.id,
      request,
    });

    return request.trip_plan_id;
  }
}
