import { Members } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const { groupId, userId }: Members = await req.json();
  if (!groupId || !userId)
    return NextResponse.json("All Fields are required", { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: userId } });
  if (!user) return NextResponse.json("User wasn't exist", { status: 401 });
  await prisma.members.create({ data: { groupId, userId } }).catch(() => {
    return NextResponse.json("Error while adding the user", { status: 401 });
  });

  return NextResponse.json("User added successfully");
}
