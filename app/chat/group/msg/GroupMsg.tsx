import { Flex, ScrollArea, Text } from "@radix-ui/themes";
import NewMsgForm from "./NewMsgForm";
import TopBar from "./TopBar";
import Message from "./Message";
import prisma from "@/prisma/client";

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
      <TopBar
        name={group?.name!}
        description={group?.description!}
        gId={groupId}
      />
      <Flex direction="column" className="overflow-hidden max-h-[86vh]">
        <ScrollArea className="flex-grow min-h-[80vh] px-4 mb-4">
          <Message M={messages} user={user} gId={groupId} />
        </ScrollArea>
      </Flex>
      <NewMsgForm groupId={groupId} />
    </Flex>
  );
};

export default GroupMsg;
