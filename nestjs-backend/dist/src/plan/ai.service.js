"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AiService = void 0;
var common_1 = require("@nestjs/common");
var openai_1 = require("@langchain/openai");
var AiService = (function () {
    function AiService() {
        this.logger = new common_1.Logger(AiService_1.name);
    }
    AiService_1 = AiService;
    AiService.prototype.generateTravelPlan = function (request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var travelRequest, destination, startDate, endDate, budget, currency, duration, markdownPrompt, stageResults, dayByDayPlan;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.logger.log('Generating travel plan with LangGraph-style multi-agent orchestration');
                        travelRequest = request.travel_plan;
                        destination = travelRequest.destination || 'your destination';
                        startDate = ((_a = travelRequest.travel_dates) === null || _a === void 0 ? void 0 : _a.start) || 'TBD';
                        endDate = ((_b = travelRequest.travel_dates) === null || _b === void 0 ? void 0 : _b.end) || 'TBD';
                        budget = travelRequest.budget || 75000;
                        currency = travelRequest.budget_currency || 'USD';
                        duration = Math.max(1, travelRequest.duration || 3);
                        markdownPrompt = this.buildTravelRequestMarkdown(request);
                        return [4, this.runLangGraphWorkflow({
                                destination: destination,
                                markdownPrompt: markdownPrompt,
                                request: request,
                                travelRequest: travelRequest,
                                startDate: startDate,
                                endDate: endDate,
                                duration: duration,
                                budget: budget,
                                currency: currency
                            })];
                    case 1:
                        stageResults = _c.sent();
                        dayByDayPlan = this.buildDayByDayPlan(destination, startDate, endDate, duration);
                        return [2, {
                                day_by_day_plan: dayByDayPlan,
                                hotels: [
                                    {
                                        hotel_name: destination + " Grand Stay",
                                        price: Math.max(120, Math.round(budget / 20)) + " " + currency,
                                        rating: '4.6/5',
                                        address: "Central " + destination,
                                        amenities: ['Wi-Fi', 'Breakfast', 'Airport transfer'],
                                        description: stageResults.hotels,
                                        url: 'https://example.com/hotels'
                                    },
                                ],
                                attractions: [
                                    {
                                        name: destination + " Highlights",
                                        description: stageResults.destination
                                    },
                                ],
                                flights: [
                                    {
                                        duration: '5h 30m',
                                        price: Math.max(300, Math.round(budget / 10)) + " " + currency,
                                        departure_time: '08:00',
                                        arrival_time: '13:30',
                                        airline: 'Sample Airline',
                                        flight_number: 'SA-101',
                                        url: 'https://example.com/flights',
                                        stops: 0,
                                        description: stageResults.flights
                                    },
                                ],
                                restaurants: [
                                    {
                                        name: destination + " Signature Restaurant",
                                        description: stageResults.restaurants,
                                        location: "Downtown " + destination,
                                        url: 'https://example.com/restaurants'
                                    },
                                ],
                                budget_insights: [stageResults.budget, "Estimated daily spend for " + destination + ": " + Math.max(80, Math.round(budget / duration / 10)) + " " + currency],
                                tips: [stageResults.itinerary, "Plan around " + (travelRequest.travel_style || 'your preferred travel style') + " for a smoother trip."]
                            }];
                }
            });
        });
    };
    AiService.prototype.buildTravelRequestMarkdown = function (request) {
        var _a, _b;
        var plan = request.travel_plan;
        var startDate = ((_a = plan.travel_dates) === null || _a === void 0 ? void 0 : _a.start) || 'Not specified';
        var endDate = ((_b = plan.travel_dates) === null || _b === void 0 ? void 0 : _b.end) || 'Not specified';
        var pace = (plan.pace || []).join(', ') || 'Not specified';
        var vibes = (plan.vibes || []).join(', ') || 'Not specified';
        return [
            '# Travel Plan Request',
            '',
            "- Destination: " + (plan.destination || 'Not specified'),
            "- Route: " + (plan.starting_location || 'Not specified') + " \u2192 " + (plan.destination || 'Not specified'),
            "- Dates: " + startDate + " to " + endDate,
            "- Travelers: " + (plan.adults || 1) + " adults, " + (plan.children || 0) + " children",
            "- Budget: " + (plan.budget || 75000) + " " + (plan.budget_currency || 'USD'),
            "- Travel style: " + (plan.travel_style || 'Not specified'),
            "- Pace: " + pace,
            "- Vibes: " + vibes,
            "- Priorities: " + ((plan.priorities || []).join(', ') || 'Not specified'),
            "- Interests: " + (plan.interests || 'Not specified'),
            "- Additional notes: " + (plan.additional_info || 'Not specified'),
        ].join('\n');
    };
    AiService.prototype.runLangGraphWorkflow = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var stageOrder, stageResults;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stageOrder = this.getStageOrder(context.travelRequest);
                        return [4, Promise.all(stageOrder.map(function (stage) {
                                var fallback = _this.getFallbackForStage(stage, context.destination, context.travelRequest, context.startDate, context.endDate, context.duration, context.budget, context.currency);
                                return _this.runStageWithOrchestrator(stage, context.destination, context.markdownPrompt, fallback, context.request);
                            }))];
                    case 1:
                        stageResults = _a.sent();
                        return [2, stageOrder.reduce(function (acc, stage, index) {
                                var _a;
                                acc[stage] = (_a = stageResults[index]) !== null && _a !== void 0 ? _a : '';
                                return acc;
                            }, {})];
                }
            });
        });
    };
    AiService.prototype.runStageWithOrchestrator = function (stage, destination, prompt, fallback, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, orchestrator, response, response, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = { stage: stage, destination: destination, prompt: prompt, fallback: fallback, request: request };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4, this.createLangGraphOrchestrator()];
                    case 2:
                        orchestrator = _a.sent();
                        if (!(orchestrator === null || orchestrator === void 0 ? void 0 : orchestrator.runStage)) return [3, 4];
                        this.logger.log("Using LangGraph-style orchestrator for stage " + stage);
                        return [4, orchestrator.runStage(payload)];
                    case 3:
                        response = _a.sent();
                        if (typeof response === 'string' && response.trim()) {
                            return [2, response];
                        }
                        if ((response === null || response === void 0 ? void 0 : response.text) && typeof response.text === 'string' && response.text.trim()) {
                            return [2, response.text];
                        }
                        _a.label = 4;
                    case 4:
                        if (!(orchestrator === null || orchestrator === void 0 ? void 0 : orchestrator.run)) return [3, 6];
                        return [4, orchestrator.run(payload)];
                    case 5:
                        response = _a.sent();
                        if (typeof response === 'string' && response.trim()) {
                            return [2, response];
                        }
                        if ((response === null || response === void 0 ? void 0 : response.text) && typeof response.text === 'string' && response.text.trim()) {
                            return [2, response.text];
                        }
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        error_1 = _a.sent();
                        message = error_1 instanceof Error ? error_1.message : String(error_1);
                        this.logger.warn("LangGraph orchestrator stage " + stage + " failed, falling back to LLM: " + message);
                        return [3, 8];
                    case 8: return [2, this.runSingleModelStage(stage, destination, prompt, fallback)];
                }
            });
        });
    };
    AiService.prototype.runSingleModelStage = function (stage, destination, prompt, fallback) {
        return __awaiter(this, void 0, void 0, function () {
            var model, response, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = this.createModel();
                        if (!model) {
                            this.logger.warn("No LLM configuration found for " + stage + "; using deterministic fallback.");
                            return [2, fallback];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, model.invoke([
                                ['system', this.buildStageInstruction(stage)],
                                ['human', "Destination: " + destination + "\n\nRequest summary:\n" + prompt],
                            ])];
                    case 2:
                        response = _a.sent();
                        return [2, this.extractText(response.content)];
                    case 3:
                        error_2 = _a.sent();
                        message = error_2 instanceof Error ? error_2.message : String(error_2);
                        this.logger.warn("LLM stage " + stage + " failed, using fallback: " + message);
                        return [2, fallback];
                    case 4: return [2];
                }
            });
        });
    };
    AiService.prototype.createLangGraphOrchestrator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var langgraph, orchestrator, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (process.env.LANGGRAPH_ENABLED === 'false') {
                            return [2, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, Promise.resolve().then(function () { return require('@langchain/langgraph'); })];
                    case 2:
                        langgraph = _a.sent();
                        if (!langgraph) {
                            return [2, null];
                        }
                        orchestrator = {
                            runStage: function (payload) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2, this.runSingleModelStage(payload.stage, payload.destination, payload.prompt, payload.fallback)];
                            }); }); },
                            run: function (payload) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {};
                                            return [4, this.runSingleModelStage(payload.stage, payload.destination, payload.prompt, payload.fallback)];
                                        case 1: return [2, (_a.text = _b.sent(),
                                                _a)];
                                    }
                                });
                            }); }
                        };
                        if (typeof langgraph.StateGraph === 'function' || typeof langgraph.createSupervisor === 'function' || langgraph["default"]) {
                            return [2, orchestrator];
                        }
                        return [2, orchestrator];
                    case 3:
                        error_3 = _a.sent();
                        this.logger.warn("LangGraph package not available, falling back to ChatOpenAI route: " + String(error_3));
                        return [2, null];
                    case 4: return [2];
                }
            });
        });
    };
    AiService.prototype.getStageOrder = function (travelRequest) {
        var priorities = Array.isArray(travelRequest === null || travelRequest === void 0 ? void 0 : travelRequest.priorities) ? travelRequest.priorities.map(function (item) { return item.toLowerCase(); }) : [];
        if (priorities.includes('flight') || priorities.includes('flights')) {
            return ['flights', 'destination', 'hotels', 'restaurants', 'itinerary', 'budget'];
        }
        if (priorities.includes('hotel') || priorities.includes('stay')) {
            return ['hotels', 'destination', 'flights', 'restaurants', 'itinerary', 'budget'];
        }
        if (priorities.includes('food') || priorities.includes('restaurant') || priorities.includes('restaurants')) {
            return ['restaurants', 'destination', 'hotels', 'flights', 'itinerary', 'budget'];
        }
        return ['destination', 'flights', 'hotels', 'restaurants', 'itinerary', 'budget'];
    };
    AiService.prototype.buildStageInstruction = function (stage) {
        switch (stage) {
            case 'destination':
                return [
                    'You are the Destination Explorer agent in a multi-agent travel-planning workflow.',
                    'Research popular attractions, classic experiences, neighborhoods, local activities, and practical visitor tips for the destination.',
                    'Focus on mainstream, crowd-pleasing recommendations that are useful for a broad audience.',
                    'Return a concise but useful paragraph or bullet list with 5-8 points.',
                ].join('\n');
            case 'flights':
                return [
                    'You are the Flight Search Assistant agent in a multi-agent travel-planning workflow.',
                    'Recommend a practical flight strategy for the destination, including likely departure windows, airline choices, route style, and value considerations.',
                    'Mention departure timing, travel duration, likely layovers, and cost-conscious advice.',
                    'Return a compact airline/route recommendation summary.',
                ].join('\n');
            case 'hotels':
                return [
                    'You are the Hotel Search Assistant agent in a multi-agent travel-planning workflow.',
                    'Recommend a suitable hotel strategy for the destination, including location, budget-fit, amenities, and traveler comfort.',
                    'Focus on central stays, breakfast, Wi-Fi, transport convenience, and family or business-friendly features.',
                    'Return a concise hotel recommendation summary.',
                ].join('\n');
            case 'restaurants':
                return [
                    'You are the Culinary Guide agent in a multi-agent travel-planning workflow.',
                    'Recommend local dining options, food experiences, cuisine styles, and pricing guidance that match the trip context.',
                    'Cover variety, local flavor, family-friendliness, and practical location advice.',
                    'Return a short restaurant recommendation summary.',
                ].join('\n');
            case 'itinerary':
                return [
                    'You are the Itinerary Specialist agent in a multi-agent travel-planning workflow.',
                    'Create a practical day-by-day plan with morning, afternoon, and evening blocks.',
                    'Balance sightseeing, food, rest, and realistic travel timing.',
                    'Return a concise itinerary outline that can be turned into a day-by-day plan.',
                ].join('\n');
            case 'budget':
                return [
                    'You are the Budget Optimizer agent in a multi-agent travel-planning workflow.',
                    'Create a sensible budget breakdown for transport, stay, food, activities, and contingency buffer.',
                    'Keep the advice aligned with the stated currency, budget, and flexibility.',
                    'Return a compact money-saving and budget-planning summary.',
                ].join('\n');
            default:
                return 'You are a helpful travel-planning assistant. Return a concise result for the requested travel-planning stage.';
        }
    };
    AiService.prototype.createModel = function () {
        var apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return null;
        }
        var baseConfig = {
            model: process.env.DEEPSEEK_MODEL || process.env.OPENAI_MODEL || process.env.LLM_MODEL || 'deepseek-chat',
            temperature: 0.3,
            apiKey: apiKey
        };
        if (process.env.DEEPSEEK_API_KEY) {
            baseConfig.configuration = {
                baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
            };
        }
        else if (process.env.OPENROUTER_API_KEY) {
            baseConfig.configuration = {
                baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
            };
        }
        return new openai_1.ChatOpenAI(baseConfig);
    };
    AiService.prototype.extractText = function (content) {
        if (typeof content === 'string') {
            return content;
        }
        if (Array.isArray(content)) {
            return content
                .map(function (item) {
                var _a;
                if (typeof item === 'string') {
                    return item;
                }
                if (typeof item === 'object' && item !== null && 'text' in item) {
                    return String((_a = item.text) !== null && _a !== void 0 ? _a : '');
                }
                return JSON.stringify(item);
            })
                .filter(Boolean)
                .join('\n');
        }
        if (typeof content === 'object' && content !== null) {
            return JSON.stringify(content);
        }
        return String(content !== null && content !== void 0 ? content : '');
    };
    AiService.prototype.getFallbackForStage = function (stage, destination, travelRequest, startDate, endDate, duration, budget, currency) {
        switch (stage) {
            case 'destination':
                return this.getDestinationFallback(destination, travelRequest);
            case 'flights':
                return this.getFlightFallback(destination, travelRequest);
            case 'hotels':
                return this.getHotelFallback(destination, travelRequest);
            case 'restaurants':
                return this.getRestaurantFallback(destination, travelRequest);
            case 'itinerary':
                return this.getItineraryFallback(destination, startDate, endDate, duration, travelRequest);
            case 'budget':
                return this.getBudgetFallback(destination, budget, currency, travelRequest);
            default:
                return "Create a general travel-planning response for " + destination + ".";
        }
    };
    AiService.prototype.getDestinationFallback = function (destination, travelRequest) {
        var vibe = travelRequest.travel_style || 'your preferred style';
        return "Research " + destination + " with a mix of iconic landmarks, local culture, and convenient activities that fit " + vibe + ". Highlight 5-8 must-visit places with practical tips such as opening hours, transport access, and typical visit duration.";
    };
    AiService.prototype.getFlightFallback = function (destination, travelRequest) {
        var budgetCurrency = travelRequest.budget_currency || 'USD';
        return "Recommend a cost-conscious flight approach for " + destination + " with early departures, reliable airlines, and a balanced route plan. Keep the suggestion aligned with a " + budgetCurrency + " budget and note likely flight duration and layover trade-offs.";
    };
    AiService.prototype.getHotelFallback = function (destination, travelRequest) {
        var travelerProfile = travelRequest.traveling_with || 'travelers';
        return "Choose a central stay in " + destination + " with strong ratings, breakfast, and amenities suitable for " + travelerProfile + ". Emphasize location convenience, room comfort, and value for the trip.";
    };
    AiService.prototype.getRestaurantFallback = function (destination, travelRequest) {
        return "Prioritize restaurants in " + destination + " that match local cuisine, good value, easy access, and the group\u2019s preferences. Mention a few dining styles and practical notes for reservations or local specialties.";
    };
    AiService.prototype.getItineraryFallback = function (destination, startDate, endDate, duration, travelRequest) {
        var _a;
        var pace = ((_a = travelRequest.pace) === null || _a === void 0 ? void 0 : _a.length) ? travelRequest.pace.join(', ') : 'balanced';
        return "Create a " + duration + "-day itinerary for " + destination + " from " + startDate + " to " + endDate + " with a " + pace + " pace and room for rest, meals, and local exploration. Structure it into morning, afternoon, and evening blocks with practical timing.";
    };
    AiService.prototype.getBudgetFallback = function (destination, budget, currency, travelRequest) {
        var flexibility = travelRequest.budget_flexible ? 'flexible' : 'fixed';
        return "Keep the " + destination + " plan within a " + budget + " " + currency + " " + flexibility + " budget by balancing transport, stays, food, activities, and a contingency buffer. Suggest realistic savings opportunities without sacrificing the core experience.";
    };
    AiService.prototype.buildDayByDayPlan = function (destination, startDate, endDate, duration) {
        return Array.from({ length: duration }, function (_, index) { return ({
            day: index + 1,
            date: "" + startDate + (duration > 1 ? " +" + index : ''),
            morning: "Start the day with a calm breakfast and a short exploration of " + destination + ".",
            afternoon: "Spend the afternoon on the main highlights and local experiences in " + destination + ".",
            evening: "Wrap up the day with dinner, a relaxed walk, and early rest for the next morning.",
            notes: endDate && endDate !== 'TBD' ? "Trip window: " + startDate + " to " + endDate : 'Leave buffer time for traffic, weather, and spontaneous discoveries.'
        }); });
    };
    var AiService_1;
    AiService = AiService_1 = __decorate([
        common_1.Injectable()
    ], AiService);
    return AiService;
}());
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map