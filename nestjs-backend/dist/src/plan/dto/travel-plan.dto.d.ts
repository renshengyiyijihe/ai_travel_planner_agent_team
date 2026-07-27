export declare class TravelDatesDto {
    start?: string;
    end?: string;
}
export declare class TravelPlanRequestDto {
    name?: string;
    destination?: string;
    starting_location?: string;
    travel_dates: TravelDatesDto;
    date_input_type?: string;
    duration?: number;
    traveling_with?: string;
    adults?: number;
    children?: number;
    age_groups?: string[];
    budget?: number;
    budget_currency?: string;
    travel_style?: string;
    budget_flexible?: boolean;
    vibes?: string[];
    priorities?: string[];
    interests?: string;
    rooms?: number;
    pace?: number[];
    been_there_before?: string;
    loved_places?: string;
    additional_info?: string;
}
export declare class TravelPlanAgentRequestDto {
    trip_plan_id: string;
    travel_plan: TravelPlanRequestDto;
}
export declare class TravelPlanResponseDto {
    success: boolean;
    message: string;
    trip_plan_id: string;
}
