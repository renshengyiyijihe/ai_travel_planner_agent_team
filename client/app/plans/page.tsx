"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Luggage,
  Plus,
  RefreshCw,
  AlertCircle,
  Trash2,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

interface TripPlan {
  id: string;
  name: string;
  destination: string;
  startingLocation: string;
  travelDatesStart: string;
  travelDatesEnd?: string;
  dateInputType: string;
  duration?: number;
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
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

const formatCurrency = (amount: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
  };
  return `${symbols[currency] || "$"}${amount.toLocaleString()}`;
};

const formatDate = (dateString: string, inputType: string) => {
  if (inputType === "text" || !dateString) {
    return dateString || "日期灵活";
  }
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch {
    return dateString;
  }
};

const getPaceDescription = (pace: number[]) => {
  const paceValue = pace[0] || 3;
  const descriptions = {
    1: "非常轻松",
    2: "较为轻松",
    3: "节奏平衡",
    4: "较为紧凑",
    5: "紧凑丰富",
  };
  return descriptions[paceValue as keyof typeof descriptions] || "节奏平衡";
};

export default function Plans() {
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);

  const fetchTripPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/plans");
      const data = await response.json();

      if (data.success) {
        setTripPlans(data.tripPlans);
      } else {
        setError(data.message || "获取行程列表失败");
      }
    } catch (err) {
      console.error("获取行程列表错误：", err);
      setError("获取行程列表失败");
    } finally {
      setLoading(false);
    }
  };

  const deleteTripPlan = async (planId: string) => {
    try {
      setDeletingPlanId(planId);
      const response = await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        // Remove the plan from the local state
        setTripPlans(tripPlans.filter((plan) => plan.id !== planId));
        toast.success("行程已成功删除");
      } else {
        toast.error(data.message || "删除行程失败");
      }
    } catch (err) {
      console.error("删除行程错误：", err);
      toast.error("删除行程失败");
    } finally {
      setDeletingPlanId(null);
    }
  };

  const handleDeletePlan = (planId: string) => {
    if (
      window.confirm(
        "您确定要删除此行程吗？此操作无法撤销。"
      )
    ) {
      deleteTripPlan(planId);
    }
  };

  useEffect(() => {
    fetchTripPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">正在加载您的行程...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">加载行程失败</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchTripPlans} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              重新加载
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Luggage className="w-8 h-8 text-primary" />
            我的旅行计划
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            管理并查看所有已规划的行程
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-muted-foreground">
            共找到 {tripPlans.length} 个行程
          </div>
          <div className="flex gap-3">
            <Button onClick={fetchTripPlans} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Link href="/plan">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                创建新行程
              </Button>
            </Link>
          </div>
        </div>

        {/* Trip Plans Grid */}
        {tripPlans.length === 0 ? (
          <div className="text-center py-16">
            <Globe className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">当前暂无行程</h3>
            <p className="text-muted-foreground mb-6">
              开始规划您的下一次旅行吧！
            </p>
            <Link href="/plan">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                创建首个行程
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripPlans.map((plan) => (
              <Card
                key={plan.id}
                className="shadow-lg border hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-5 h-5 text-primary" />
                    {plan.destination}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {plan.name}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Travel Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Plane className="w-4 h-4 text-muted-foreground" />
                      <span>出发地：{plan.startingLocation}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {formatDate(plan.travelDatesStart, plan.dateInputType)}
                        {plan.travelDatesEnd &&
                          plan.dateInputType === "picker" && (
                            <>
                              {" - "}
                              {formatDate(
                                plan.travelDatesEnd,
                                plan.dateInputType
                              )}
                            </>
                          )}
                      </span>
                    </div>

                    {plan.duration && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{plan.duration} 天</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {plan.adults} 位成人
                        {plan.children > 0 &&
                          `，${plan.children} 位儿童`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {formatCurrency(plan.budget, plan.budgetCurrency)} 每人
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {plan.rooms} room{plan.rooms > 1 ? "s" : ""},{" "}
                        {plan.travelStyle}
                      </span>
                    </div>
                  </div>

                  {/* Vibes */}
                  {plan.vibes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Trip Vibes
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.vibes.slice(0, 3).map((vibe) => (
                          <Badge
                            key={vibe}
                            variant="secondary"
                            className="text-xs"
                          >
                            {vibe}
                          </Badge>
                        ))}
                        {plan.vibes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.vibes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pace */}
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">节奏：</span>{" "}
                    {getPaceDescription(plan.pace)}
                  </div>

                  {/* Created Date */}
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    创建于 {" "}
                    {format(
                      new Date(plan.createdAt),
                      "MMM dd, yyyy 'at' h:mm a"
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/plan/${plan.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        查看详情
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDeletePlan(plan.id)}
                      disabled={deletingPlanId === plan.id}
                    >
                      {deletingPlanId === plan.id ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      删除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
