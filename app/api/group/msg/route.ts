import supabase from "@/app/_components/supabase";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();

  const msg = await prisma.groupMessage.create({
    data: {
      content: body.content,
      sender: session?.user?.email!,
      groupId: body.groupId,
    },
  });

  supabase.channel(body.groupId).send({
    type: "broadcast",
    event: "grp-msg",
    payload: msg,
  });

  return NextResponse.json(msg, { status: 200 });
}
