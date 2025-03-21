import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { issueSchema } from '../../validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // 1) Check if "status" is present
  const statusParam = searchParams.get("status");

  // 2) Build a `where` object for the Prisma query
  let where: any = {};
  if (statusParam && ["OPEN", "IN_PROGRESS", "CLOSED"].includes(statusParam)) {
    where.status = statusParam;
  }

  // 3) Optional: check if pagination is used
  const isPaginationEnabled = searchParams.get("pagination") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  // 4) Now fetch from Prisma, applying the `where` filter
  const issues = await prisma.issue.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      assignedToUser: true, // this line includes the assigned user data for avatar
    },
    ...(isPaginationEnabled
      ? { skip: (page - 1) * pageSize, take: pageSize }
      : {}),
  });

  // 5) Check if counts should be included
  const includeCounts = searchParams.get("includeCounts") === "true";

  if (includeCounts) {
    // Count issues grouped by status
    const issueCounts = await prisma.issue.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const counts = {
      open: issueCounts.find((group) => group.status === 'OPEN')?._count.status || 0,
      inProgress: issueCounts.find((group) => group.status === 'IN_PROGRESS')?._count.status || 0,
      closed: issueCounts.find((group) => group.status === 'CLOSED')?._count.status || 0,
    };

    return NextResponse.json({ issues, counts });
  }

  return NextResponse.json(issues);
}