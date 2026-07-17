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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlanResponseDto = exports.TravelPlanAgentRequestDto = exports.TravelPlanRequestDto = exports.TravelDatesDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TravelDatesDto {
    start = '';
    end = '';
}
exports.TravelDatesDto = TravelDatesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelDatesDto.prototype, "start", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelDatesDto.prototype, "end", void 0);
class TravelPlanRequestDto {
    name = '';
    destination = '';
    starting_location = '';
    travel_dates = new TravelDatesDto();
    date_input_type = 'picker';
    duration = 0;
    traveling_with = '';
    adults = 1;
    children = 0;
    age_groups = [];
    budget = 75000;
    budget_currency = 'INR';
    travel_style = '';
    budget_flexible = false;
    vibes = [];
    priorities = [];
    interests = '';
    rooms = 1;
    pace = [3];
    been_there_before = '';
    loved_places = '';
    additional_info = '';
}
exports.TravelPlanRequestDto = TravelPlanRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "starting_location", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TravelDatesDto),
    __metadata("design:type", TravelDatesDto)
], TravelPlanRequestDto.prototype, "travel_dates", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "date_input_type", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TravelPlanRequestDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "traveling_with", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TravelPlanRequestDto.prototype, "adults", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TravelPlanRequestDto.prototype, "children", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TravelPlanRequestDto.prototype, "age_groups", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TravelPlanRequestDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "budget_currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "travel_style", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TravelPlanRequestDto.prototype, "budget_flexible", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TravelPlanRequestDto.prototype, "vibes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TravelPlanRequestDto.prototype, "priorities", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "interests", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TravelPlanRequestDto.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TravelPlanRequestDto.prototype, "pace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "been_there_before", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "loved_places", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TravelPlanRequestDto.prototype, "additional_info", void 0);
class TravelPlanAgentRequestDto {
    trip_plan_id;
    travel_plan;
}
exports.TravelPlanAgentRequestDto = TravelPlanAgentRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TravelPlanAgentRequestDto.prototype, "trip_plan_id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TravelPlanRequestDto),
    __metadata("design:type", TravelPlanRequestDto)
], TravelPlanAgentRequestDto.prototype, "travel_plan", void 0);
class TravelPlanResponseDto {
    success;
    message;
    trip_plan_id;
}
exports.TravelPlanResponseDto = TravelPlanResponseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TravelPlanResponseDto.prototype, "success", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TravelPlanResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TravelPlanResponseDto.prototype, "trip_plan_id", void 0);
//# sourceMappingURL=travel-plan.dto.js.map