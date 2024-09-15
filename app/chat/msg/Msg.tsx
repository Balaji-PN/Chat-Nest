"use server";

import { Flex, Heading, IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import NewMsgForm from "./NewMsgForm";
import TopBar from "./TopBar";

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
          <Flex direction="column" gap="2" className="py-4 min-h-full">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === receiver ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      m.sender === receiver
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                        : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    }`}
                  >
                    <Text size="2">{m.content}</Text>
                  </div>
                </div>
              ))
            ) : (
              <Flex align="center" justify="center" className="h-full">
                <Text>No messages found.</Text>
              </Flex>
            )}
          </Flex>
        </ScrollArea>
      </Flex>
      <NewMsgForm chatId={chatId} receiver={receiver!} />
    </Flex>
  );
};

export default Msg;
