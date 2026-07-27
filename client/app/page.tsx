import {
  MapPin,
  Zap,
  Heart,
  Star,
  Plane,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">
            <span className="text-accent">TripCraft AI</span>
          </h1>
          <h2 className="text-2xl font-semibold sm:text-3xl mt-4 text-muted-foreground">
            您的旅程，由智能为您精心打造
          </h2>
          <p className="mt-6 text-lg leading-8 text-secondary-foreground max-w-3xl mx-auto">
            不再为繁杂的旅行信息疲于奔命。我们的 AI 平台只需一次对话，
            即可帮你规划机票、酒店、活动和预算，打造理想旅行。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/plan">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plane className="w-4 h-4 mr-2" />
                立即规划行程
              </Button>
            </Link>
            <Button variant="ghost" size="lg">
              查看流程 <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">使用方式</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                填写一次，梦想成行
              </h4>
              <p className="text-muted-foreground">
                告诉我们你的理想行程：目的地、日期、风格、预算和偏好，
                几分钟即可完成。
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6 mx-auto border-2 border-secondary/40">
                <span className="text-2xl font-bold text-foreground">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                AI 代理为你规划
              </h4>
              <p className="text-muted-foreground">
                专业 AI 代理协同工作，负责航班、住宿、活动和预算，
                自动完成整个行程规划。
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 mx-auto border-2 border-accent/20">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                行程即刻生成
              </h4>
              <p className="text-muted-foreground">
                获取完整逐日行程，包括航班、住宿、活动、费用和预订链接，
                清晰呈现。
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            为什么选择 TripCraft AI
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow border-primary/20 hover:border-primary/40">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">
                  AI 智能推荐
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  多智能体系统理解你的出行偏好，打造专属私人行程。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-accent/20 hover:border-accent/40">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">深度攻略发现</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  不只是热门景点，还为你发现独特体验、本地活动和小众打卡地。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-secondary/30 hover:border-secondary/50">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-4">
                  <Zap className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-lg">一键极速生成</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  不再花费数小时搜索比价。瞬间得到完整旅行方案，满足你的需求。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/20 hover:border-primary/40">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">智能记忆</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  随着使用次数增加，AI 会记住你的偏好，行程越来越贴合你的口味。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-accent/20 hover:border-accent/40">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">全程无缝衔接</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  航班、酒店、活动和预算无缝协调。无需纠结，轻松出发。
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-secondary/30 hover:border-secondary/50">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-4">
                  <Heart className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-lg">用心打造</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  每个细节都经过用心考量，让你的旅程不仅是行程，更是难忘体验。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-primary/5 rounded-2xl py-16 px-8 border border-primary/10">
          <h3 className="text-3xl font-bold mb-6">
            准备让旅行规划变成魔法了吗？
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            不要再花费时间规划，开始去体验旅行吧。让 AI 帮你创造完美旅程。
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Plane className="w-4 h-4 mr-2" />
            立即开始规划
          </Button>
        </div>
      </main>
    </div>
  );
}
