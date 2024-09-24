"use client";

import { Chat } from "@prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "../_components/supabase";

const ChatComp = ({ InitChats, user }: { InitChats: Chat[]; user: string }) => {
  const router = useRouter();
  const [chats, setChats] = useState(InitChats);

  useEffect(() => {
    const channel = supabase
      .channel(user)
      .on("broadcast", { event: "chat-new" }, ({ payload }) => {
        setChats((c) => [...c, payload]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      {chats &&
        chats?.map((c) => (
          <Flex
            align={"center"}
            gap="2"
            key={c.id}
            onClick={() => router.push("/?mode=chat&id=" + c.id)}
            className="hover:cursor-pointer"
          >
            <Avatar
              src={c.user1 == user ? c.user2Profile! : c.user1Profile!}
              fallback={c.user1 == user ? c.user2.charAt(0) : c.user1.charAt(0)}
              size="4"
              radius="full"
            />
            <Flex direction="column">
              <Text size="2" weight={"medium"} className="mb-2">
                {c.user1 == user ? c.user2Name : c.user1Name}
              </Text>
              <Text size="1">{c.user1 == user ? c.user2 : c.user1}</Text>
            </Flex>
          </Flex>
        ))}
    </>
  );
};

export default ChatComp;
