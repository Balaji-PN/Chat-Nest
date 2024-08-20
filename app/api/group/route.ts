import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();

  if (!body.name || !body.desc)
    return NextResponse.json("Group name and Description is required", {
      status: 400,
    });

  const grp = await prisma.group.create({
    data: {
      name: body.name,
      description: body.desc,
    },
  });

  const link = await prisma.members
    .create({
      data: { userId: session?.user?.email!, isAdmin: true, groupId: grp.id },
    })
    .catch();

  return NextResponse.json({ grp }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const groups = await prisma.group.findMany({
    where: {
      member: {
        some: {
          userId: session?.user?.email!,
        },
      },
    },
    include: {
      member: true,
    },
  });

  return NextResponse.json(groups);
}
