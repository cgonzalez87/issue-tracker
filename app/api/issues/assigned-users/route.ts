import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: {
                assignedIssues: {
                    some: {} // Fetch users who have assigned issues
                }
            },
            select: {
                id: true,
                name: true,
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch assigned users" },
            { status: 500 }
        );
    }
}