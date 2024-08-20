"use server";

import "server-only";
import { Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Chat from "./Chat";
import NewChat from "./NewChat";
import prisma from "@/prisma/client";

const ChatList = async () => {
  const session = await getServerSession();
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ user1: session?.user?.email! }, { user2: session?.user?.email! }],
    },
  });
  return (
    <Flex direction="column" className="shadow-2xl rounded-md">
      <Flex
        className="w-full dark:bg-zinc-800 bg-zinc-200 rounded-t-md py-1 px-2"
        justify="between"
      >
        <Text weight={"bold"}>Chats</Text>
        <NewChat />
      </Flex>
      <Flex
        gap="3"
        direction="column"
        className="dark:bg-zinc-900 bg-zinc-100 p-3 rounded-b-md"
      >
        {chats.map((c) => (
          <Chat
            key={c.id}
            chatId={c.id}
            receiver={c.user1 == session?.user?.email ? c.user2 : c.user1}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ChatList;
