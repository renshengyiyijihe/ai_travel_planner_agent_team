import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const tripPlan = await prisma.tripPlan.findUnique({
      where: { id },
      include: {
        status: true,
        output: true,
      },
    });

    if (!tripPlan) {
      return NextResponse.json(
        {
          success: false,
          message: '未找到行程'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        tripPlan
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching trip plan:', error);
    return NextResponse.json(
      {
        success: false,
        message: '获取行程详情失败'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First check if the plan exists
    const tripPlan = await prisma.tripPlan.findUnique({
      where: { id },
    });

    if (!tripPlan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Trip plan not found'
        },
        { status: 404 }
      );
    }

    // Delete related records first (status and output)
    await prisma.tripPlanStatus.deleteMany({
      where: { tripPlanId: id },
    });

    await prisma.tripPlanOutput.deleteMany({
      where: { tripPlanId: id },
    });

    // Delete the trip plan
    await prisma.tripPlan.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: '行程已成功删除'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting trip plan:', error);
    return NextResponse.json(
      {
        success: false,
        message: '删除行程失败'
      },
      { status: 500 }
    );
  }
}