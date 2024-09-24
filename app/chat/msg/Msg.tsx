"use server";

import { Flex, ScrollArea } from "@radix-ui/themes";
import MsgComp from "./MsgComp";
import NewMsgForm from "./NewMsgForm";
import TopBar from "./TopBar";
import prisma from "@/prisma/client";

const Msg = async ({ chatId, user }: { chatId: string; user: string }) => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
  });

  const receiver = chat?.user1 == user ? chat.user2 : chat?.user1;

  const messages = await prisma.message.findMany({
    where: { chatid: chatId },
  });

  return (
    <Flex
      direction="column"
      className="h-screen max-h-screen py-4 mx-2 max-w-[100vw] md:w-full"
    >
      <TopBar receiver={receiver!} />
      <Flex direction="column" className="overflow-hidden max-h-[86vh]">
        <ScrollArea className="flex-grow min-h-[80vh] px-4 mb-4">
          <MsgComp message={messages} chatId={chatId} receiver={receiver!} />
        </ScrollArea>
      </Flex>
      <NewMsgForm chatId={chatId} receiver={receiver!} />
    </Flex>
  );
};

export default Msg;
