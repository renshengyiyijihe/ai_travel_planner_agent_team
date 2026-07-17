import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TravelPlanAgentRequestDto, TravelPlanResponseDto } from './dto/travel-plan.dto';
import { PlanService } from './plan.service';

@Controller('api/plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('trigger')
  async triggerTripCraftAgent(
    @Body() request: TravelPlanAgentRequestDto,
  ): Promise<TravelPlanResponseDto> {
    try {
      const tripPlanId = await this.planService.triggerPlanGeneration(request);
      return {
        success: true,
        message: 'Travel plan agent triggered successfully',
        trip_plan_id: tripPlanId,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new HttpException(
        `Failed to trigger travel plan agent: ${message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
