"use server";

import MsgComp from "./MsgComp";
import NewMsgForm from "./NewMsgForm";
import TopBar from "./TopBar";
import prisma from "@/prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

const Msg = async ({ chatId, user }: { chatId: string; user: string }) => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
  });

  const receiver = chat?.user1 == user ? chat.user2 : chat?.user1;

  const messages = await prisma.message.findMany({
    where: { chatid: chatId },
  });

  return (
    <div className="flex flex-col h-screen py-4 mx-2 max-w-[100vw] md:w-full">
      <TopBar receiver={receiver!} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ScrollArea className="flex-1 px-4 mb-4">
          <MsgComp message={messages} chatId={chatId} receiver={receiver!} />
        </ScrollArea>
      </div>
      <NewMsgForm chatId={chatId} receiver={receiver!} />
    </div>
  );
};

export default Msg;
