import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest, 
  { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  // If request only contains `assignedToUserId`, skip validation schema for other fields
  if ("assignedToUserId" in body) {
    const userExists = body.assignedToUserId
      ? await prisma.user.findUnique({ where: { id: body.assignedToUserId } })
      : true; // `null` is allowed for unassigning

    if (!userExists)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: { assignedToUserId: body.assignedToUserId },
    });

    return NextResponse.json(updatedIssue);
  }

  // Regular issue update (title, description, etc.)
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string }}) {
    
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) } 
    });

    if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    await prisma.issue.delete({
      where: { id: issue.id }
    });

    return NextResponse.json({ message: 'Issue deleted' });
}