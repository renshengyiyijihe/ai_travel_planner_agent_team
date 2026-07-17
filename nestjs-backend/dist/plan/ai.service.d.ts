import { TravelPlanAgentRequestDto } from './dto/travel-plan.dto';
interface DayPlanItem {
    day: number;
    date: string;
    morning: string;
    afternoon: string;
    evening: string;
    notes: string;
}
interface HotelItem {
    hotel_name: string;
    price: string;
    rating: string;
    address: string;
    amenities: string[];
    description: string;
    url: string;
}
interface AttractionItem {
    name: string;
    description: string;
}
interface FlightItem {
    duration: string;
    price: string;
    departure_time: string;
    arrival_time: string;
    airline: string;
    flight_number: string;
    url: string;
    stops: number;
}
interface RestaurantItem {
    name: string;
    description: string;
    location: string;
    url: string;
}
interface TravelPlanOutput {
    day_by_day_plan: DayPlanItem[];
    hotels: HotelItem[];
    attractions: AttractionItem[];
    flights: FlightItem[];
    restaurants: RestaurantItem[];
    budget_insights: string[];
    tips: string[];
}
export declare class AiService {
    private readonly logger;
    generateTravelPlan(request: TravelPlanAgentRequestDto): Promise<TravelPlanOutput>;
    private buildTravelRequestMarkdown;
    private runStage;
    private buildStageInstruction;
    private createModel;
    private extractText;
    private getDestinationFallback;
    private getFlightFallback;
    private getHotelFallback;
    private getRestaurantFallback;
    private getItineraryFallback;
    private getBudgetFallback;
    private buildDayByDayPlan;
}
export {};
