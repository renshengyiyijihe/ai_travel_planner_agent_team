"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  Heart,
  Home,
  Clock,
  Globe,
  Plane,
  Camera,
  Utensils,
  Mountain,
  Waves,
  Building,
  TreePine,
  Star,
  ChevronRight,
  ChevronLeft,
  Luggage,
  Sparkles,
  Edit3,
  Lightbulb,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const travelVibes = [
  { id: "relaxing", label: "放松轻松", icon: Waves },
  { id: "adventure", label: "冒险刺激", icon: Mountain },
  { id: "romantic", label: "浪漫之旅", icon: Heart },
  { id: "cultural", label: "文化探索", icon: Building },
  { id: "food-focused", label: "美食主题", icon: Utensils },
  { id: "nature", label: "亲近自然", icon: TreePine },
  { id: "photography", label: "摄影打卡", icon: Camera },
];

const travelStyles = [
  {
    value: "backpacker",
    label: "背包客",
    description: "经济实惠，体验当地生活",
  },
  {
    value: "comfort",
    label: "舒适型",
    description: "舒适与性价比兼顾",
  },
  {
    value: "luxury",
    label: "奢华型",
    description: "高端体验与优质住宿",
  },
  {
    value: "eco-conscious",
    label: "环保型",
    description: "可持续、低碳旅行",
  },
];

const travelingWithOptions = [
  "独自出行",
  "伴侣",
  "朋友",
  "带孩子的家庭",
  "亲友团",
  "同事",
];

const ageGroupOptions = [
  "18岁以下",
  "18-25岁",
  "26-35岁",
  "36-50岁",
  "51-65岁",
  "65岁以上",
];

// Custom NumberInput component with +/- buttons
const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 99,
  className = "",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className={`flex items-center border rounded-md ${className}`}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-12 px-3 rounded-r-none border-r"
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <div className="flex-1 h-12 flex items-center justify-center bg-background text-center font-medium text-base min-w-[60px]">
        {value}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-12 px-3 rounded-l-none border-l"
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

// Helper function to get default budget for currency
const getDefaultBudgetForCurrency = (currency: string) => {
  switch (currency) {
    case "USD":
      return 1000;
    case "EUR":
      return 900;
    case "GBP":
      return 800;
    case "INR":
      return 75000;
    case "JPY":
      return 120000;
    default:
      return 1000;
  }
};

interface TripFormData {
  name: string;
  destination: string;
  startingLocation: string;
  travelDates: { start: string; end: string };
  dateInputType: "picker" | "text";
  duration: number;
  travelingWith: string;
  adults: number;
  children: number;
  ageGroups: string[];
  budget: number;
  budgetCurrency: string;
  travelStyle: string;
  budgetFlexible: boolean;
  vibes: string[];
  priorities: string[];
  interests?: string;
  rooms: number;
  pace: number[];
  beenThereBefore?: string;
  lovedPlaces?: string;
  additionalInfo?: string;
}

export default function Plan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [dateInputType, setDateInputType] = useState<"picker" | "text">(
    "picker"
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<TripFormData>({
    defaultValues: {
      name: "",
      adults: 1,
      children: 0,
      rooms: 1,
      pace: [3],
      budgetFlexible: false,
      budget: getDefaultBudgetForCurrency("USD"),
      travelingWith: "",
      ageGroups: [],
      vibes: [],
      priorities: [],
      budgetCurrency: "USD",
      dateInputType: "picker",
      travelDates: {
        start: "",
        end: "",
      },
    },
  });

  const onSubmit = async (data: TripFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Debug: Log the data being submitted
    console.log("Form data being submitted:", data);
    console.log("Personal touch data:", {
      beenThereBefore: data.beenThereBefore,
      lovedPlaces: data.lovedPlaces,
      additionalInfo: data.additionalInfo,
    });

    try {
      const submitData = {
        ...data,
      };

      const response = await fetch("/api/plan/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("🎉 Your trip plan has been submitted successfully!");
        console.log("Trip submitted with ID:", result.tripPlanId);

        // Show success message briefly, then redirect to the plan details page
        setTimeout(() => {
          router.push(`/plan/${result.tripPlanId}`);
        }, 1500);
      } else {
        setSubmitMessage("❌ Failed to submit trip plan. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      id: "basics",
      title: "行程基础",
      icon: Plane,
      description: "您要去哪里，何时出发？",
    },
    {
      id: "group",
      title: "出行成员",
      icon: Users,
      description: "谁将与您同行？",
    },
    {
      id: "budget",
      title: "预算与风格",
      icon: DollarSign,
      description: "您的旅行预算和风格是什么？",
    },
    {
      id: "vibe",
      title: "出行氛围",
      icon: Heart,
      description: "您想要什么样的体验？",
    },
    {
      id: "accommodation",
      title: "住宿偏好",
      icon: Home,
      description: "哪里最适合您休息？",
    },
    {
      id: "pace",
      title: "节奏与风格",
      icon: Clock,
      description: "您喜欢怎样的旅行节奏？",
    },
    {
      id: "personal",
      title: "个性定制",
      icon: Globe,
      description: "告诉我们更多您的偏好",
    },
  ];

  const handleVibeToggle = (vibeId: string) => {
    const newVibes = selectedVibes.includes(vibeId)
      ? selectedVibes.filter((v) => v !== vibeId)
      : [...selectedVibes, vibeId];
    setSelectedVibes(newVibes);
    form.setValue("vibes", newVibes);
    setValidationError(null);
  };

  const handlePriorityToggle = (priority: string) => {
    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(newPriorities);
    form.setValue("priorities", newPriorities);
  };

  const nextStep = async (e?: React.MouseEvent) => {
    e?.preventDefault(); // Prevent any form submission
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setValidationError(null);
      setCurrentStep(currentStep + 1);
    }
  };

  const validateCurrentStep = async () => {
    const currentValues = form.getValues();

    try {
      switch (currentStep) {
        case 0: // 行程基础
          if (
            !currentValues.name ||
            !currentValues.destination ||
            !currentValues.startingLocation ||
            !currentValues.travelDates?.start ||
            !currentValues.duration
          ) {
            setValidationError(
              "请填写所有必填项以继续"
            );
            form.trigger([
              "name",
              "destination",
              "startingLocation",
              "travelDates.start",
              "duration",
            ]);
            return false;
          }
          break;
        case 1: // 出行成员
          if (
            !currentValues.travelingWith ||
            !currentValues.adults ||
            !currentValues.ageGroups?.length
          ) {
            setValidationError(
              "请选择出行人员、成人数量和年龄段"
            );
            form.trigger(["travelingWith", "adults", "ageGroups"]);
            return false;
          }
          break;
        case 2: // 预算与风格
          if (!currentValues.budget || !currentValues.travelStyle) {
            setValidationError(
              "请输入预算并选择旅行风格"
            );
            form.trigger(["budget", "travelStyle"]);
            return false;
          }
          break;
        case 3: // 出行氛围
          if (!currentValues.vibes?.length) {
            setValidationError("请选择至少一个出行氛围");
            return false;
          }
          break;
        case 4: // 住宿偏好
          if (!currentValues.rooms) {
            setValidationError("请填写所需房间数量");
            form.trigger(["rooms"]);
            return false;
          }
          break;
        case 5: // 节奏与风格
          if (!currentValues.pace?.length) {
            setValidationError("请设置您偏好的活动节奏");
            form.trigger(["pace"]);
            return false;
          }
          break;
        case 6: // Personal Touch - all fields are optional
          // No validation needed as all fields are optional
          return true;
        default:
          return true;
      }
      return true;
    } catch {
      return false;
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Luggage className="w-8 h-8 text-primary" />
            规划完美旅程
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            告诉我们你的理想目的地，我们将为你打造专属行程。
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      index <= currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <span className="text-destructive font-medium">
              {validationError}
            </span>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="shadow-lg border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  {React.createElement(steps[currentStep].icon, {
                    className: "w-6 h-6 text-primary",
                  })}
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription className="text-base">
                  {steps[currentStep].description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 0: Trip Basics */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            您的姓名是什么？
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="请输入您的姓名"
                              {...field}
                              className="h-12 text-base"
                            />
                          </FormControl>
                          <FormDescription>
                            我们会根据您的名字为行程增添个性化建议。
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              您要去哪里？
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="例如：巴黎、巴厘岛、东京"
                                {...field}
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startingLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <Plane className="w-4 h-4" />
                              您从哪里出发？
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="例如：纽约、德里"
                                {...field}
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Travel Dates Section */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-primary" />
                          您的旅行时间是？
                        </FormLabel>
                        <div className="inline-flex items-center bg-muted rounded-lg p-1 w-fit">
                          <button
                            type="button"
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                              dateInputType === "picker"
                                ? "bg-background text-primary shadow-sm border border-border"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => {
                              setDateInputType("picker");
                              form.setValue("dateInputType", "picker");
                              if (dateInputType === "text") {
                                form.setValue("travelDates.start", "");
                                form.setValue("travelDates.end", "");
                              }
                            }}
                          >
                            <CalendarIcon className="w-3 h-3 mr-1.5" />
                            日期选择器
                          </button>
                          <button
                            type="button"
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                              dateInputType === "text"
                                ? "bg-background text-primary shadow-sm border border-border"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => {
                              setDateInputType("text");
                              form.setValue("dateInputType", "text");
                              if (dateInputType === "picker") {
                                form.setValue("travelDates.start", "");
                                form.setValue("travelDates.end", "");
                              }
                            }}
                          >
                            <Edit3 className="w-3 h-3 mr-1.5" />
                            灵活输入
                          </button>
                        </div>
                      </div>

                      {dateInputType === "picker" ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="travelDates.start"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  出发日期
                                </FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full justify-start text-left font-normal h-12",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(new Date(field.value), "PPP")
                                        ) : (
                                          <span>选择出发日期</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
                                        }
                                        onSelect={(date) => {
                                          if (date) {
                                            field.onChange(date.toISOString());
                                          } else {
                                            field.onChange("");
                                          }
                                        }}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="travelDates.end"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  结束日期
                                </FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full justify-start text-left font-normal h-12",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(new Date(field.value), "PPP")
                                        ) : (
                                          <span>选择结束日期</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
                                        }
                                        onSelect={(date) => {
                                          if (date) {
                                            field.onChange(date.toISOString());
                                          } else {
                                            field.onChange("");
                                          }
                                        }}
                                        disabled={(date) => {
                                          const startDate =
                                            form.getValues("travelDates.start");
                                          return startDate
                                            ? date < new Date(startDate)
                                            : false;
                                        }}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="travelDates.start"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  旅行日期
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="例如：7月10日–7月17日、2025年8月（灵活）、2025年夏季"
                                    {...field}
                                    className="h-12 text-base"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-muted-foreground">
                                  <Sparkles className="w-3 h-3 inline mr-1" />
                                  您可以输入灵活日期，如“2025年8月”、“2025年夏季（灵活）”或“12月上旬”。
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="travelDates.end"
                            render={({ field }) => (
                              <FormItem className="hidden">
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value || ""}
                                    className="hidden"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            旅行天数
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="例如：5"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="h-12 text-base"
                            />
                          </FormControl>
                          <FormDescription className="text-sm text-muted-foreground">
                            <Lightbulb className="w-3 h-3 inline mr-1" />
                            预计出行天数（如时间灵活可留空）
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 1: Group Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="travelingWith"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            您与谁同行？
                          </FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2"
                          >
                            {travelingWithOptions.map((option) => (
                              <div
                                key={option}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem value={option} id={option} />
                                <Label
                                  htmlFor={option}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              成人数量
                            </FormLabel>
                            <FormControl>
                              <NumberInput
                                value={field.value}
                                onChange={field.onChange}
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              儿童数量
                            </FormLabel>
                            <FormControl>
                              <NumberInput
                                value={field.value}
                                onChange={field.onChange}
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="ageGroups"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            旅客年龄段
                          </FormLabel>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {ageGroupOptions.map((ageGroup) => (
                              <Badge
                                key={ageGroup}
                                variant={
                                  field.value?.includes(ageGroup)
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer px-4 py-2 hover:bg-primary/10"
                                onClick={() => {
                                  const value = field.value || [];
                                  if (value.includes(ageGroup)) {
                                    field.onChange(
                                      value.filter(
                                        (v: string) => v !== ageGroup
                                      )
                                    );
                                  } else {
                                    field.onChange([...value, ageGroup]);
                                  }
                                }}
                              >
                                {ageGroup}
                              </Badge>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Budget & Style */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">
                                每人预算
                              </FormLabel>
                              <FormControl>
                                <div className="px-4 py-6">
                                  <div className="mb-4 text-center">
                                    <span className="text-2xl font-bold text-primary">
                                      {form.watch("budgetCurrency") === "USD" &&
                                        "$"}
                                      {form.watch("budgetCurrency") === "EUR" &&
                                        "€"}
                                      {form.watch("budgetCurrency") === "GBP" &&
                                        "£"}
                                      {form.watch("budgetCurrency") === "INR" &&
                                        "₹"}
                                      {form.watch("budgetCurrency") === "JPY" &&
                                        "¥"}
                                      {field.value.toLocaleString()}
                                    </span>
                                  </div>
                                  <Slider
                                    min={
                                      form.watch("budgetCurrency") === "USD"
                                        ? 100
                                        : form.watch("budgetCurrency") === "EUR"
                                        ? 100
                                        : form.watch("budgetCurrency") === "GBP"
                                        ? 100
                                        : form.watch("budgetCurrency") === "INR"
                                        ? 5000
                                        : form.watch("budgetCurrency") === "JPY"
                                        ? 10000
                                        : 100
                                    }
                                    max={
                                      form.watch("budgetCurrency") === "USD"
                                        ? 10000
                                        : form.watch("budgetCurrency") === "EUR"
                                        ? 9000
                                        : form.watch("budgetCurrency") === "GBP"
                                        ? 8000
                                        : form.watch("budgetCurrency") === "INR"
                                        ? 500000
                                        : form.watch("budgetCurrency") === "JPY"
                                        ? 1000000
                                        : 10000
                                    }
                                    step={
                                      form.watch("budgetCurrency") === "USD"
                                        ? 100
                                        : form.watch("budgetCurrency") === "EUR"
                                        ? 100
                                        : form.watch("budgetCurrency") === "GBP"
                                        ? 100
                                        : form.watch("budgetCurrency") === "INR"
                                        ? 5000
                                        : form.watch("budgetCurrency") === "JPY"
                                        ? 10000
                                        : 100
                                    }
                                    value={[field.value]}
                                    onValueChange={(values) =>
                                      field.onChange(values[0])
                                    }
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                    {form.watch("budgetCurrency") === "USD" && (
                                      <>
                                        <span>$100</span>
                                        <span>$5,000</span>
                                        <span>$10,000+</span>
                                      </>
                                    )}
                                    {form.watch("budgetCurrency") === "EUR" && (
                                      <>
                                        <span>€100</span>
                                        <span>€4,500</span>
                                        <span>€9,000+</span>
                                      </>
                                    )}
                                    {form.watch("budgetCurrency") === "GBP" && (
                                      <>
                                        <span>£100</span>
                                        <span>£4,000</span>
                                        <span>£8,000+</span>
                                      </>
                                    )}
                                    {form.watch("budgetCurrency") === "INR" && (
                                      <>
                                        <span>₹5,000</span>
                                        <span>₹250,000</span>
                                        <span>₹500,000+</span>
                                      </>
                                    )}
                                    {form.watch("budgetCurrency") === "JPY" && (
                                      <>
                                        <span>¥10,000</span>
                                        <span>¥500,000</span>
                                        <span>¥1,000,000+</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="budgetCurrency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              货币
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Update budget to appropriate default for new currency
                                form.setValue(
                                  "budget",
                                  getDefaultBudgetForCurrency(value)
                                );
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="USD" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USD">USD ($)</SelectItem>
                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                <SelectItem value="INR">INR (₹)</SelectItem>
                                <SelectItem value="JPY">JPY (¥)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="travelStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            首选旅行风格
                          </FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid md:grid-cols-2 gap-4 mt-2"
                          >
                            {travelStyles.map((style) => (
                              <div
                                key={style.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={style.value}
                                  id={style.value}
                                />
                                <div className="grid gap-1">
                                  <Label
                                    htmlFor={style.value}
                                    className="font-medium"
                                  >
                                    {style.label}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {style.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetFlexible"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base font-semibold">
                              预算灵活性
                            </FormLabel>
                            <FormDescription>
                              您是否愿意为美好体验适度超出预算？
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Trip Vibe */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="vibes"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            您希望这次旅行有什么样的氛围？
                          </FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {travelVibes.map((vibe) => {
                              const VibeIcon = vibe.icon;
                              const isSelected = selectedVibes.includes(
                                vibe.id
                              );
                              return (
                                <div
                                  key={vibe.id}
                                  onClick={() => handleVibeToggle(vibe.id)}
                                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                    isSelected
                                      ? "border-primary bg-primary/5 shadow-md"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <div className="text-center">
                                    <VibeIcon
                                      className={`w-8 h-8 mx-auto mb-2 ${
                                        isSelected
                                          ? "text-primary"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                    <span
                                      className={`font-medium ${
                                        isSelected
                                          ? "text-primary"
                                          : "text-foreground"
                                      }`}
                                    >
                                      {vibe.label}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priorities"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            旅行优先选择（可选）
                          </FormLabel>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              "Comfort",
                              "Budget-friendly",
                              "Unique stays",
                              "Local experiences",
                              "Instagram-worthy spots",
                              "Safety",
                            ].map((priority) => (
                              <Badge
                                key={priority}
                                variant={
                                  selectedPriorities.includes(priority)
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer px-4 py-2 hover:bg-primary/10"
                                onClick={() => handlePriorityToggle(priority)}
                              >
                                {priority}
                              </Badge>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Any specific interests or things to avoid?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Love street food, avoid crowded places, interested in local art..."
                              {...field}
                              className="min-h-[100px] text-base"
                            />
                          </FormControl>
                          <FormDescription>
                            帮助我们更精准地定制您的专属行程。
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 4: Accommodation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            您需要几间房？
                          </FormLabel>
                          <FormControl>
                            <NumberInput
                              value={field.value}
                              onChange={field.onChange}
                              min={1}
                            />
                          </FormControl>
                          <FormDescription>
                            这将帮助我们推荐最适合的住宿方案。
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 5: Pace & Style */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="pace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            How packed should your days be?
                          </FormLabel>
                          <FormControl>
                            <div className="px-4 py-6">
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>非常轻松</span>
                                <span>节奏适中</span>
                                <span>充实紧凑</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Current setting:{" "}
                            {field.value?.[0] === 1
                              ? "Very relaxed"
                              : field.value?.[0] === 2
                              ? "Mostly relaxed"
                              : field.value?.[0] === 3
                              ? "Balanced"
                              : field.value?.[0] === 4
                              ? "Quite busy"
                              : "Action-packed"}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 6: Personal Touch */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="beenThereBefore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            您之前去过这个目的地吗？
                          </FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">没有，第一次去</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">是的，以前去过</Label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lovedPlaces"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            过去有哪些你特别喜欢的地方？
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="例如：喜欢京都的寺庙，喜欢果阿的海滩..."
                              {...field}
                              className="min-h-[80px] text-base"
                            />
                          </FormControl>
                          <FormDescription>
                            这有助于我们更好地把握您的旅行品味。
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            还有什么想让我们知道的吗？
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="例如：这是蜜月旅行、我是素食者、喜欢小众景点..."
                              {...field}
                              className="min-h-[100px] text-base"
                            />
                          </FormControl>
                          <FormDescription>
                            请填写任何特殊需求或偏好。
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submission Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg border text-center font-medium ${
                  submitMessage.includes("🎉")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="h-12 px-6"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>

              <span className="text-sm text-muted-foreground">
                第 {currentStep + 1} 步 / 共 {steps.length} 步
              </span>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      正在创建行程...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      创建我的行程
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep(e);
                  }}
                  disabled={isSubmitting}
                  className="h-12 px-6"
                >
                  下一步
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
