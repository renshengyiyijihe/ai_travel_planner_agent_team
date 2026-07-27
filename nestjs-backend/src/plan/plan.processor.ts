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
        currentStep: '正在生成行程',
        startedAt: new Date(),
      },
      update: {
        status: 'in_progress',
        currentStep: '正在生成行程',
        startedAt: new Date(),
        error: null,
        completedAt: null,
      },
    });

    try {
      const stageOutputs: Array<{ stage: string; content: string; agentName: string }> = [];
      const result = await this.aiService.generateTravelPlan(job.data.request, async (payload) => {
        stageOutputs.push({
          stage: payload.stage,
          content: payload.content,
          agentName: payload.agentName,
        });
      });
      const outputPayload = JSON.stringify(result, null, 2);
      const persistedPayload = {
        ...result,
        workflow_trace: stageOutputs,
      };

      await this.prisma.planTask.update({
        where: { id: taskId },
        data: {
          status: 'success',
          output_data: persistedPayload as any,
        },
      });

      await this.prisma.tripPlanOutput.upsert({
        where: { tripPlanId },
        create: {
          tripPlanId,
          itinerary: outputPayload,
          summary: `已为 ${job.data.request?.travel_plan?.destination || '您的目的地'} 生成行程`,
        },
        update: {
          itinerary: outputPayload,
          summary: `已为 ${job.data.request?.travel_plan?.destination || '您的目的地'} 生成行程`,
        },
      });

      await this.prisma.tripPlanStatus.update({
        where: { tripPlanId },
        data: {
          status: 'completed',
          currentStep: '行程已生成',
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
          currentStep: '行程生成失败',
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
