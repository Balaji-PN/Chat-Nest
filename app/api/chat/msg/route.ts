import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing chat ID" }, { status: 400 });
  }

  const session = await getServerSession();

  const chat = await prisma.chat.findUnique({ where: { id } });
  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  const mail = chat.user1 === session?.user?.email ? chat.user2 : chat.user1;

  const msg = await prisma.message.findMany({ where: { chatid: id } });

  return NextResponse.json({ mail, msg }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();

  const msg = prisma.message
    .create({
      data: {
        content: body.content,
        sender: session?.user?.email!,
        receiver: body.receiver,
        time: new Date(),
        chatid: body.chatId,
      },
    })
    .then(() => "Message created")
    .catch(() => "Message sending failed");

  return NextResponse.json(msg, { status: 200 });
}
