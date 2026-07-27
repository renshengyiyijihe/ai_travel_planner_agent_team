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
exports.__esModule = true;
exports.TravelPlanResponseDto = exports.TravelPlanAgentRequestDto = exports.TravelPlanRequestDto = exports.TravelDatesDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var TravelDatesDto = (function () {
    function TravelDatesDto() {
        this.start = '';
        this.end = '';
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelDatesDto.prototype, "start");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelDatesDto.prototype, "end");
    return TravelDatesDto;
}());
exports.TravelDatesDto = TravelDatesDto;
var TravelPlanRequestDto = (function () {
    function TravelPlanRequestDto() {
        this.name = '';
        this.destination = '';
        this.starting_location = '';
        this.travel_dates = new TravelDatesDto();
        this.date_input_type = 'picker';
        this.duration = 0;
        this.traveling_with = '';
        this.adults = 1;
        this.children = 0;
        this.age_groups = [];
        this.budget = 75000;
        this.budget_currency = 'INR';
        this.travel_style = '';
        this.budget_flexible = false;
        this.vibes = [];
        this.priorities = [];
        this.interests = '';
        this.rooms = 1;
        this.pace = [3];
        this.been_there_before = '';
        this.loved_places = '';
        this.additional_info = '';
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "name");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "destination");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "starting_location");
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return TravelDatesDto; }),
        __metadata("design:type", TravelDatesDto)
    ], TravelPlanRequestDto.prototype, "travel_dates");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "date_input_type");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], TravelPlanRequestDto.prototype, "duration");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "traveling_with");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], TravelPlanRequestDto.prototype, "adults");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], TravelPlanRequestDto.prototype, "children");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Array)
    ], TravelPlanRequestDto.prototype, "age_groups");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], TravelPlanRequestDto.prototype, "budget");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "budget_currency");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "travel_style");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Boolean)
    ], TravelPlanRequestDto.prototype, "budget_flexible");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Array)
    ], TravelPlanRequestDto.prototype, "vibes");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Array)
    ], TravelPlanRequestDto.prototype, "priorities");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "interests");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Number)
    ], TravelPlanRequestDto.prototype, "rooms");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Array)
    ], TravelPlanRequestDto.prototype, "pace");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "been_there_before");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "loved_places");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], TravelPlanRequestDto.prototype, "additional_info");
    return TravelPlanRequestDto;
}());
exports.TravelPlanRequestDto = TravelPlanRequestDto;
var TravelPlanAgentRequestDto = (function () {
    function TravelPlanAgentRequestDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], TravelPlanAgentRequestDto.prototype, "trip_plan_id");
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return TravelPlanRequestDto; }),
        __metadata("design:type", TravelPlanRequestDto)
    ], TravelPlanAgentRequestDto.prototype, "travel_plan");
    return TravelPlanAgentRequestDto;
}());
exports.TravelPlanAgentRequestDto = TravelPlanAgentRequestDto;
var TravelPlanResponseDto = (function () {
    function TravelPlanResponseDto() {
    }
    __decorate([
        class_validator_1.IsBoolean(),
        __metadata("design:type", Boolean)
    ], TravelPlanResponseDto.prototype, "success");
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], TravelPlanResponseDto.prototype, "message");
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], TravelPlanResponseDto.prototype, "trip_plan_id");
    return TravelPlanResponseDto;
}());
exports.TravelPlanResponseDto = TravelPlanResponseDto;
//# sourceMappingURL=travel-plan.dto.js.map