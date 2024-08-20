import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing chat ID" }, { status: 400 });
  }

  const group = await prisma.group.findUnique({ where: { id } });
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const msg = await prisma.groupMessage.findMany({ where: { groupId: id } });

  return NextResponse.json({ group, msg }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();

  const msg = prisma.groupMessage
    .create({
      data: {
        content: body.content,
        sender: session?.user?.email!,
        groupId: body.groupId,
      },
    })
    .then(() => "Message created")
    .catch(() => "Message sending failed");

  return NextResponse.json(msg, { status: 200 });
}
