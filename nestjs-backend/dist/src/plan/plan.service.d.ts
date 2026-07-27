import { Queue } from 'bullmq';
import { TravelPlanAgentRequestDto } from './dto/travel-plan.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PlanService {
    private readonly planQueue;
    private readonly prisma;
    constructor(planQueue: Queue, prisma: PrismaService);
    triggerPlanGeneration(request: TravelPlanAgentRequestDto): Promise<string>;
}
