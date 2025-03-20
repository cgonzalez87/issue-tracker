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
  const isPaginationEnabled = searchParams.get("pagination") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    ...(isPaginationEnabled
      ? { skip: (page - 1) * pageSize, take: pageSize } // ✅ Apply pagination if enabled
      : {}), // ✅ Fetch all issues if disabled
  });

  return NextResponse.json(issues);
}