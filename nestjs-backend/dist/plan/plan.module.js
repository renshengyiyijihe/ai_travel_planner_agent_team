"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const plan_controller_1 = require("./plan.controller");
const plan_processor_1 = require("./plan.processor");
const plan_service_1 = require("./plan.service");
const prisma_module_1 = require("../prisma/prisma.module");
let PlanModule = class PlanModule {
};
exports.PlanModule = PlanModule;
exports.PlanModule = PlanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'plan',
            }),
            prisma_module_1.PrismaModule,
        ],
        controllers: [plan_controller_1.PlanController],
        providers: [plan_service_1.PlanService, plan_processor_1.PlanQueueProcessor, ai_service_1.AiService],
    })
], PlanModule);
//# sourceMappingURL=plan.module.js.map