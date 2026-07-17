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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanService = class PlanService {
    planQueue;
    prisma;
    constructor(planQueue, prisma) {
        this.planQueue = planQueue;
        this.prisma = prisma;
    }
    async triggerPlanGeneration(request) {
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
                input_data: request.travel_plan,
            },
        });
        await this.planQueue.add('generate-travel-plan', {
            taskId: task.id,
            request,
        });
        return request.trip_plan_id;
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('plan')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map