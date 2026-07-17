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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const travel_plan_dto_1 = require("./dto/travel-plan.dto");
const plan_service_1 = require("./plan.service");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    async triggerTripCraftAgent(request) {
        try {
            const tripPlanId = await this.planService.triggerPlanGeneration(request);
            return {
                success: true,
                message: 'Travel plan agent triggered successfully',
                trip_plan_id: tripPlanId,
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.HttpException(`Failed to trigger travel plan agent: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, common_1.Post)('trigger'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [travel_plan_dto_1.TravelPlanAgentRequestDto]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "triggerTripCraftAgent", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.Controller)('api/plan'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map