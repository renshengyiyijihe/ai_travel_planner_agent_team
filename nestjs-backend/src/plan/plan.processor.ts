import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from './ai.service';

@Injectable()
@Processor('plan')
export class PlanQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(PlanQueueProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {
    super();
  }

  async process(job: Job<any>) {
    const taskId = job.data.taskId as number;
    const tripPlanId = job.data.request?.trip_plan_id as string;

    this.logger.log(`Processing job ${job.id} for task ${taskId}`);

    await this.prisma.planTask.update({
      where: { id: taskId },
      data: { status: 'in_progress' },
    });

    await this.prisma.tripPlanStatus.upsert({
      where: { tripPlanId },
      create: {
        tripPlanId,
        status: 'in_progress',
        currentStep: 'Generating travel plan',
        startedAt: new Date(),
      },
      update: {
        status: 'in_progress',
        currentStep: 'Generating travel plan',
        startedAt: new Date(),
        error: null,
        completedAt: null,
      },
    });

    try {
      const result = await this.aiService.generateTravelPlan(job.data.request);
      const outputPayload = JSON.stringify(result, null, 2);

      await this.prisma.planTask.update({
        where: { id: taskId },
        data: {
          status: 'success',
          output_data: result as any,
        },
      });

      await this.prisma.tripPlanOutput.upsert({
        where: { tripPlanId },
        create: {
          tripPlanId,
          itinerary: outputPayload,
          summary: `Travel plan generated for ${job.data.request?.travel_plan?.destination || 'your destination'}`,
        },
        update: {
          itinerary: outputPayload,
          summary: `Travel plan generated for ${job.data.request?.travel_plan?.destination || 'your destination'}`,
        },
      });

      await this.prisma.tripPlanStatus.update({
        where: { tripPlanId },
        data: {
          status: 'completed',
          currentStep: 'Travel plan generated',
          completedAt: new Date(),
          error: null,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Job failed: ${message}`);
      await this.prisma.planTask.update({
        where: { id: taskId },
        data: {
          status: 'error',
          error_message: message,
        },
      });

      await this.prisma.tripPlanStatus.update({
        where: { tripPlanId },
        data: {
          status: 'failed',
          currentStep: 'Travel plan generation failed',
          error: message,
          completedAt: new Date(),
        },
      });
      throw error;
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Job ${job.id} is active`);
  }

  @OnWorkerEvent('completed')
  onComplete(job: Job) {
    this.logger.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
  }
}
