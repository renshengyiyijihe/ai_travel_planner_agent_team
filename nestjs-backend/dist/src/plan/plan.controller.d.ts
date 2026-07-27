import { TravelPlanAgentRequestDto, TravelPlanResponseDto } from './dto/travel-plan.dto';
import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    triggerTripCraftAgent(request: TravelPlanAgentRequestDto): Promise<TravelPlanResponseDto>;
}
