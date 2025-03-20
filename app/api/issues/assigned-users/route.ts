import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: { name: "asc" }, // Sort alphabetically for better UX
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}