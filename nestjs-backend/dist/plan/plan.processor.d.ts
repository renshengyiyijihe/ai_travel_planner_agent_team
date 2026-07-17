import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from './ai.service';
export declare class PlanQueueProcessor extends WorkerHost {
    private readonly prisma;
    private readonly aiService;
    private readonly logger;
    constructor(prisma: PrismaService, aiService: AiService);
    process(job: Job<any>): Promise<void>;
    onActive(job: Job): void;
    onComplete(job: Job): void;
    onFailed(job: Job, error: Error): void;
}
