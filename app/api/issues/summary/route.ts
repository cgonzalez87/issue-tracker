// app/api/issues/summary/route.ts
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // Group issues by status and count them
  const counts = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  // Extract counts for each status; default to 0 if not found
  const open = counts.find((c) => c.status === "OPEN")?._count.status || 0;
  const inProgress = counts.find((c) => c.status === "IN_PROGRESS")?._count.status || 0;
  const closed = counts.find((c) => c.status === "CLOSED")?._count.status || 0;

  // Return the aggregated data as JSON
  return NextResponse.json({ open, inProgress, closed });
}