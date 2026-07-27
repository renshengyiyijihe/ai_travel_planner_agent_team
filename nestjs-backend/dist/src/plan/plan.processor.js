"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PlanQueueProcessor = void 0;
var bullmq_1 = require("@nestjs/bullmq");
var bullmq_2 = require("bullmq");
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var ai_service_1 = require("./ai.service");
var PlanQueueProcessor = (function (_super) {
    __extends(PlanQueueProcessor, _super);
    function PlanQueueProcessor(prisma, aiService) {
        var _this = _super.call(this) || this;
        _this.prisma = prisma;
        _this.aiService = aiService;
        _this.logger = new common_1.Logger(PlanQueueProcessor_1.name);
        return _this;
    }
    PlanQueueProcessor_1 = PlanQueueProcessor;
    PlanQueueProcessor.prototype.process = function (job) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var taskId, tripPlanId, result, outputPayload, error_1, message;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        taskId = job.data.taskId;
                        tripPlanId = (_a = job.data.request) === null || _a === void 0 ? void 0 : _a.trip_plan_id;
                        this.logger.log("Processing job " + job.id + " for task " + taskId);
                        return [4, this.prisma.planTask.update({
                                where: { id: taskId },
                                data: { status: 'in_progress' }
                            })];
                    case 1:
                        _f.sent();
                        return [4, this.prisma.tripPlanStatus.upsert({
                                where: { tripPlanId: tripPlanId },
                                create: {
                                    tripPlanId: tripPlanId,
                                    status: 'in_progress',
                                    currentStep: '正在生成行程',
                                    startedAt: new Date()
                                },
                                update: {
                                    status: 'in_progress',
                                    currentStep: '正在生成行程',
                                    startedAt: new Date(),
                                    error: null,
                                    completedAt: null
                                }
                            })];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 8, , 11]);
                        return [4, this.aiService.generateTravelPlan(job.data.request)];
                    case 4:
                        result = _f.sent();
                        outputPayload = JSON.stringify(result, null, 2);
                        return [4, this.prisma.planTask.update({
                                where: { id: taskId },
                                data: {
                                    status: 'success',
                                    output_data: result
                                }
                            })];
                    case 5:
                        _f.sent();
                        return [4, this.prisma.tripPlanOutput.upsert({
                                where: { tripPlanId: tripPlanId },
                                create: {
                                    tripPlanId: tripPlanId,
                                    itinerary: outputPayload,
                                    summary: "\u5DF2\u4E3A " + (((_c = (_b = job.data.request) === null || _b === void 0 ? void 0 : _b.travel_plan) === null || _c === void 0 ? void 0 : _c.destination) || '您的目的地') + " \u751F\u6210\u884C\u7A0B"
                                },
                                update: {
                                    itinerary: outputPayload,
                                    summary: "\u5DF2\u4E3A " + (((_e = (_d = job.data.request) === null || _d === void 0 ? void 0 : _d.travel_plan) === null || _e === void 0 ? void 0 : _e.destination) || '您的目的地') + " \u751F\u6210\u884C\u7A0B"
                                }
                            })];
                    case 6:
                        _f.sent();
                        return [4, this.prisma.tripPlanStatus.update({
                                where: { tripPlanId: tripPlanId },
                                data: {
                                    status: 'completed',
                                    currentStep: '行程已生成',
                                    completedAt: new Date(),
                                    error: null
                                }
                            })];
                    case 7:
                        _f.sent();
                        return [3, 11];
                    case 8:
                        error_1 = _f.sent();
                        message = error_1 instanceof Error ? error_1.message : String(error_1);
                        this.logger.error("Job failed: " + message);
                        return [4, this.prisma.planTask.update({
                                where: { id: taskId },
                                data: {
                                    status: 'error',
                                    error_message: message
                                }
                            })];
                    case 9:
                        _f.sent();
                        return [4, this.prisma.tripPlanStatus.update({
                                where: { tripPlanId: tripPlanId },
                                data: {
                                    status: 'failed',
                                    currentStep: '行程生成失败',
                                    error: message,
                                    completedAt: new Date()
                                }
                            })];
                    case 10:
                        _f.sent();
                        throw error_1;
                    case 11: return [2];
                }
            });
        });
    };
    PlanQueueProcessor.prototype.onActive = function (job) {
        this.logger.log("Job " + job.id + " is active");
    };
    PlanQueueProcessor.prototype.onComplete = function (job) {
        this.logger.log("Job " + job.id + " completed");
    };
    PlanQueueProcessor.prototype.onFailed = function (job, error) {
        this.logger.error("Job " + job.id + " failed: " + error.message);
    };
    var PlanQueueProcessor_1, _a, _b, _c;
    __decorate([
        bullmq_1.OnWorkerEvent('active'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Job !== "undefined" && bullmq_2.Job) === "function" ? _a : Object]),
        __metadata("design:returntype", void 0)
    ], PlanQueueProcessor.prototype, "onActive");
    __decorate([
        bullmq_1.OnWorkerEvent('completed'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof bullmq_2.Job !== "undefined" && bullmq_2.Job) === "function" ? _b : Object]),
        __metadata("design:returntype", void 0)
    ], PlanQueueProcessor.prototype, "onComplete");
    __decorate([
        bullmq_1.OnWorkerEvent('failed'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof bullmq_2.Job !== "undefined" && bullmq_2.Job) === "function" ? _c : Object, Error]),
        __metadata("design:returntype", void 0)
    ], PlanQueueProcessor.prototype, "onFailed");
    PlanQueueProcessor = PlanQueueProcessor_1 = __decorate([
        common_1.Injectable(),
        bullmq_1.Processor('plan'),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            ai_service_1.AiService])
    ], PlanQueueProcessor);
    return PlanQueueProcessor;
}(bullmq_1.WorkerHost));
exports.PlanQueueProcessor = PlanQueueProcessor;
//# sourceMappingURL=plan.processor.js.map