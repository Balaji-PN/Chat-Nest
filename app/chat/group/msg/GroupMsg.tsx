import { Flex, Heading, IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { IoIosArrowBack } from "react-icons/io";
import NewMsgForm from "./NewMsgForm";
import TopBar from "./TopBar";

const GroupMsg = async ({
  groupId,
  user,
}: {
  groupId: string;
  user: string;
}) => {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  const messages = await prisma.groupMessage.findMany({
    where: { groupId },
  });
  return (
    <Flex
      direction="column"
      className="h-screen max-h-screen py-4 mx-2 max-w-[100vw] md:w-full"
    >
      <TopBar name={group?.name!} description={group?.description!} />
      <Flex direction="column" className="overflow-hidden max-h-[86vh]">
        <ScrollArea className="flex-grow min-h-[80vh] px-4 mb-4">
          <Flex direction="column" gap="2" className="py-4 min-h-full">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === user ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      m.sender !== user
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                        : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    }`}
                  >
                    <Text size="2">{m.content}</Text>
                    {m.sender !== user && (
                      <Text size="1" className="text-gray-400 mt-1">
                        {m.sender}
                      </Text>
                    )}
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
      <NewMsgForm groupId={groupId} />
    </Flex>
  );
};

export default GroupMsg;
