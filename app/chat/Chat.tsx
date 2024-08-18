"use client";

import { Flex, Avatar, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Msg = ({ receiver, chatId }: { receiver: string; chatId: string }) => {
  const router = useRouter();

  return (
    <Flex
      align={"center"}
      gap="2"
      id={chatId}
      onClick={() => router.push("/?mode=chat&id=" + chatId)}
      className="hover:cursor-pointer"
    >
      <Avatar fallback={receiver.charAt(0)} size="4" radius="full" />
      <Flex direction="column">
        <Text size="2" weight={"medium"} className="mb-2">
          {receiver}
        </Text>
        <Text size="1">Last Message</Text>
      </Flex>
    </Flex>
  );
};

export default Msg;
