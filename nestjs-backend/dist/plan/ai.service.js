"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
let AiService = AiService_1 = class AiService {
    logger = new common_1.Logger(AiService_1.name);
    async generateTravelPlan(request) {
        this.logger.log('Generating travel plan with AI orchestration');
        const travelRequest = request.travel_plan;
        const destination = travelRequest.destination || 'your destination';
        const startDate = travelRequest.travel_dates?.start || 'TBD';
        const endDate = travelRequest.travel_dates?.end || 'TBD';
        const budget = travelRequest.budget || 75000;
        const currency = travelRequest.budget_currency || 'USD';
        const duration = Math.max(1, travelRequest.duration || 3);
        const markdownPrompt = this.buildTravelRequestMarkdown(request);
        const [destinationResearch, flightResearch, hotelResearch, restaurantResearch, itineraryResearch, budgetResearch] = await Promise.all([
            this.runStage('destination', destination, markdownPrompt, this.getDestinationFallback(destination, travelRequest)),
            this.runStage('flights', destination, markdownPrompt, this.getFlightFallback(destination, travelRequest)),
            this.runStage('hotels', destination, markdownPrompt, this.getHotelFallback(destination, travelRequest)),
            this.runStage('restaurants', destination, markdownPrompt, this.getRestaurantFallback(destination, travelRequest)),
            this.runStage('itinerary', destination, markdownPrompt, this.getItineraryFallback(destination, startDate, endDate, duration, travelRequest)),
            this.runStage('budget', destination, markdownPrompt, this.getBudgetFallback(destination, budget, currency, travelRequest)),
        ]);
        const dayByDayPlan = this.buildDayByDayPlan(destination, startDate, endDate, duration);
        return {
            day_by_day_plan: dayByDayPlan,
            hotels: [
                {
                    hotel_name: `${destination} Grand Stay`,
                    price: `${Math.max(120, Math.round(budget / 20))} ${currency}`,
                    rating: '4.6/5',
                    address: `Central ${destination}`,
                    amenities: ['Wi-Fi', 'Breakfast', 'Airport transfer'],
                    description: hotelResearch,
                    url: 'https://example.com/hotels',
                },
            ],
            attractions: [
                {
                    name: `${destination} Highlights`,
                    description: destinationResearch,
                },
            ],
            flights: [
                {
                    duration: '5h 30m',
                    price: `${Math.max(300, Math.round(budget / 10))} ${currency}`,
                    departure_time: '08:00',
                    arrival_time: '13:30',
                    airline: 'Sample Airline',
                    flight_number: 'SA-101',
                    url: 'https://example.com/flights',
                    stops: 0,
                },
            ],
            restaurants: [
                {
                    name: `${destination} Signature Restaurant`,
                    description: restaurantResearch,
                    location: `Downtown ${destination}`,
                    url: 'https://example.com/restaurants',
                },
            ],
            budget_insights: [budgetResearch, `Estimated daily spend for ${destination}: ${Math.max(80, Math.round(budget / duration / 10))} ${currency}`],
            tips: [itineraryResearch, `Plan around ${travelRequest.travel_style || 'your preferred travel style'} for a smoother trip.`],
        };
    }
    buildTravelRequestMarkdown(request) {
        const plan = request.travel_plan;
        const startDate = plan.travel_dates?.start || 'Not specified';
        const endDate = plan.travel_dates?.end || 'Not specified';
        const pace = (plan.pace || []).join(', ') || 'Not specified';
        const vibes = (plan.vibes || []).join(', ') || 'Not specified';
        return [
            '# Travel Plan Request',
            '',
            `- Destination: ${plan.destination || 'Not specified'}`,
            `- Route: ${plan.starting_location || 'Not specified'} → ${plan.destination || 'Not specified'}`,
            `- Dates: ${startDate} to ${endDate}`,
            `- Travelers: ${plan.adults || 1} adults, ${plan.children || 0} children`,
            `- Budget: ${plan.budget || 75000} ${plan.budget_currency || 'USD'}`,
            `- Travel style: ${plan.travel_style || 'Not specified'}`,
            `- Pace: ${pace}`,
            `- Vibes: ${vibes}`,
            `- Priorities: ${(plan.priorities || []).join(', ') || 'Not specified'}`,
            `- Interests: ${plan.interests || 'Not specified'}`,
            `- Additional notes: ${plan.additional_info || 'Not specified'}`,
        ].join('\n');
    }
    async runStage(stage, destination, prompt, fallback) {
        const model = this.createModel();
        if (!model) {
            this.logger.warn(`No LLM configuration found for ${stage}; using deterministic fallback.`);
            return fallback;
        }
        try {
            const response = await model.invoke([
                ['system', this.buildStageInstruction(stage)],
                ['human', `Destination: ${destination}\n\nRequest summary:\n${prompt}`],
            ]);
            return this.extractText(response.content);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.warn(`LLM stage ${stage} failed, using fallback: ${message}`);
            return fallback;
        }
    }
    buildStageInstruction(stage) {
        switch (stage) {
            case 'destination':
                return [
                    'You are the Destination Explorer agent from the Python travel-planning team.',
                    'Research popular attractions, classic experiences, neighborhoods, local activities, and practical visitor tips for the destination.',
                    'Focus on mainstream, crowd-pleasing recommendations that are useful for a broad audience.',
                    'Return a concise but useful paragraph or bullet list with 5-8 points.',
                ].join('\n');
            case 'flights':
                return [
                    'You are the Flight Search Assistant agent from the Python travel-planning team.',
                    'Recommend flight strategy for the destination, including likely departure windows, airline choices, route style, and value considerations.',
                    'Mention departure timing, travel duration, likely layovers, and cost-conscious advice.',
                    'Return a compact airline/route recommendation summary.',
                ].join('\n');
            case 'hotels':
                return [
                    'You are the Hotel Search Assistant agent from the Python travel-planning team.',
                    'Recommend a suitable hotel strategy for the destination, including location, budget-fit, amenities, and traveler comfort.',
                    'Focus on central stays, breakfast, Wi-Fi, transport convenience, and family or business-friendly features.',
                    'Return a concise hotel recommendation summary.',
                ].join('\n');
            case 'restaurants':
                return [
                    'You are the Culinary Guide agent from the Python travel-planning team.',
                    'Recommend local dining options, food experiences, cuisine styles, and pricing guidance that match the trip context.',
                    'Cover variety, local flavor, family-friendliness, and practical location advice.',
                    'Return a short restaurant recommendation summary.',
                ].join('\n');
            case 'itinerary':
                return [
                    'You are the Itinerary Specialist agent from the Python travel-planning team.',
                    'Create a practical day-by-day plan with morning, afternoon, and evening blocks.',
                    'Balance sightseeing, food, rest, and realistic travel timing.',
                    'Return a concise itinerary outline that can be turned into a day-by-day plan.',
                ].join('\n');
            case 'budget':
                return [
                    'You are the Budget Optimizer agent from the Python travel-planning team.',
                    'Create a sensible budget breakdown for transport, stay, food, activities, and contingency buffer.',
                    'Keep the advice aligned with the stated currency, budget, and flexibility.',
                    'Return a compact money-saving and budget-planning summary.',
                ].join('\n');
            default:
                return 'You are a helpful travel-planning assistant. Return a concise result for the requested travel-planning stage.';
        }
    }
    createModel() {
        const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return null;
        }
        const baseConfig = {
            model: process.env.DEEPSEEK_MODEL || process.env.OPENAI_MODEL || process.env.LLM_MODEL || 'deepseek-chat',
            temperature: 0.3,
            apiKey,
        };
        if (process.env.DEEPSEEK_API_KEY) {
            baseConfig.configuration = {
                baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
            };
        }
        else if (process.env.OPENROUTER_API_KEY) {
            baseConfig.configuration = {
                baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
            };
        }
        return new openai_1.ChatOpenAI(baseConfig);
    }
    extractText(content) {
        if (typeof content === 'string') {
            return content;
        }
        if (Array.isArray(content)) {
            return content
                .map((item) => {
                if (typeof item === 'string') {
                    return item;
                }
                if (typeof item === 'object' && item !== null && 'text' in item) {
                    return String(item.text ?? '');
                }
                return JSON.stringify(item);
            })
                .filter(Boolean)
                .join('\n');
        }
        if (typeof content === 'object' && content !== null) {
            return JSON.stringify(content);
        }
        return String(content ?? '');
    }
    getDestinationFallback(destination, travelRequest) {
        const vibe = travelRequest.travel_style || 'your preferred style';
        return `Research ${destination} with a mix of iconic landmarks, local culture, and convenient activities that fit ${vibe}. Highlight 5-8 must-visit places with practical tips such as opening hours, transport access, and typical visit duration.`;
    }
    getFlightFallback(destination, travelRequest) {
        const budgetCurrency = travelRequest.budget_currency || 'USD';
        return `Recommend a cost-conscious flight approach for ${destination} with early departures, reliable airlines, and a balanced route plan. Keep the suggestion aligned with a ${budgetCurrency} budget and note likely flight duration and layover trade-offs.`;
    }
    getHotelFallback(destination, travelRequest) {
        const travelerProfile = travelRequest.traveling_with || 'travelers';
        return `Choose a central stay in ${destination} with strong ratings, breakfast, and amenities suitable for ${travelerProfile}. Emphasize location convenience, room comfort, and value for the trip.`;
    }
    getRestaurantFallback(destination, travelRequest) {
        return `Prioritize restaurants in ${destination} that match local cuisine, good value, easy access, and the group’s preferences. Mention a few dining styles and practical notes for reservations or local specialties.`;
    }
    getItineraryFallback(destination, startDate, endDate, duration, travelRequest) {
        const pace = travelRequest.pace?.length ? travelRequest.pace.join(', ') : 'balanced';
        return `Create a ${duration}-day itinerary for ${destination} from ${startDate} to ${endDate} with a ${pace} pace and room for rest, meals, and local exploration. Structure it into morning, afternoon, and evening blocks with practical timing.`;
    }
    getBudgetFallback(destination, budget, currency, travelRequest) {
        const flexibility = travelRequest.budget_flexible ? 'flexible' : 'fixed';
        return `Keep the ${destination} plan within a ${budget} ${currency} ${flexibility} budget by balancing transport, stays, food, activities, and a contingency buffer. Suggest realistic savings opportunities without sacrificing the core experience.`;
    }
    buildDayByDayPlan(destination, startDate, endDate, duration) {
        return Array.from({ length: duration }, (_, index) => ({
            day: index + 1,
            date: `${startDate}${duration > 1 ? ` +${index}` : ''}`,
            morning: `Start the day with a calm breakfast and a short exploration of ${destination}.`,
            afternoon: `Spend the afternoon on the main highlights and local experiences in ${destination}.`,
            evening: `Wrap up the day with dinner, a relaxed walk, and early rest for the next morning.`,
            notes: endDate && endDate !== 'TBD' ? `Trip window: ${startDate} to ${endDate}` : 'Leave buffer time for traffic, weather, and spontaneous discoveries.',
        }));
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map