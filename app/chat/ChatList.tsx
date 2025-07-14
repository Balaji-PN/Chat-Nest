"use server";

import ChatComp from "./Chat";
import NewChat from "./NewChat";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

const ChatList = async () => {
  const session = await getServerSession();
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ user1: session?.user?.email! }, { user2: session?.user?.email! }],
    },
  });
  return (
    <div className="flex flex-col shadow-2xl rounded-md">
      <div
        className="w-full dark:bg-gray-900 bg-zinc-200 rounded-t-md py-1 px-2 flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold">Chats</h2>
        <NewChat />
      </div>
      <div
        className="flex flex-col gap-3 dark:bg-gray-950 bg-zinc-100 p-3 rounded-b-md"
      >
        <ChatComp InitChats={chats} user={session?.user?.email!} />
      </div>
    </div>
  );
};

export default ChatList;
