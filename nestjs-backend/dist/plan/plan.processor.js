"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlanQueueProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanQueueProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ai_service_1 = require("./ai.service");
let PlanQueueProcessor = PlanQueueProcessor_1 = class PlanQueueProcessor extends bullmq_1.WorkerHost {
    prisma;
    aiService;
    logger = new common_1.Logger(PlanQueueProcessor_1.name);
    constructor(prisma, aiService) {
        super();
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async process(job) {
        const taskId = job.data.taskId;
        const tripPlanId = job.data.request?.trip_plan_id;
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
                    output_data: result,
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
        }
        catch (error) {
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
    onActive(job) {
        this.logger.log(`Job ${job.id} is active`);
    }
    onComplete(job) {
        this.logger.log(`Job ${job.id} completed`);
    }
    onFailed(job, error) {
        this.logger.error(`Job ${job.id} failed: ${error.message}`);
    }
};
exports.PlanQueueProcessor = PlanQueueProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], PlanQueueProcessor.prototype, "onActive", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], PlanQueueProcessor.prototype, "onComplete", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Error]),
    __metadata("design:returntype", void 0)
], PlanQueueProcessor.prototype, "onFailed", null);
exports.PlanQueueProcessor = PlanQueueProcessor = PlanQueueProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('plan'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AiService])
], PlanQueueProcessor);
//# sourceMappingURL=plan.processor.js.map