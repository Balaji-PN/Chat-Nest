import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();

  const receiver = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!receiver)
    return NextResponse.json("Receiver not exist", { status: 400 });

  const chatExist = await prisma.chat.findFirst({
    where: {
      OR: [
        { user1: receiver.email!, user2: session?.user?.email! },
        { user1: session?.user?.email!, user2: receiver.email! },
      ],
    },
  });

  if (chatExist)
    return NextResponse.json("Chat Already Exists", { status: 400 });

  await prisma.chat.create({
    data: { user1: session?.user?.email!, user2: receiver.email! },
  });

  return NextResponse.json({ status: 201 });
}
