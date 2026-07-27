"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanModule = void 0;
var bullmq_1 = require("@nestjs/bullmq");
var common_1 = require("@nestjs/common");
var ai_service_1 = require("./ai.service");
var plan_controller_1 = require("./plan.controller");
var plan_processor_1 = require("./plan.processor");
var plan_service_1 = require("./plan.service");
var prisma_module_1 = require("../prisma/prisma.module");
var PlanModule = (function () {
    function PlanModule() {
    }
    PlanModule = __decorate([
        common_1.Module({
            imports: [
                bullmq_1.BullModule.registerQueue({
                    name: 'plan'
                }),
                prisma_module_1.PrismaModule,
            ],
            controllers: [plan_controller_1.PlanController],
            providers: [plan_service_1.PlanService, plan_processor_1.PlanQueueProcessor, ai_service_1.AiService]
        })
    ], PlanModule);
    return PlanModule;
}());
exports.PlanModule = PlanModule;
//# sourceMappingURL=plan.module.js.map