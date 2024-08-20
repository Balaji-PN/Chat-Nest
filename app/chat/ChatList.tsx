"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import ChatComp from "./Chat";
import NewChat from "./NewChat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Chat } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";

const fetchChats = async () => {
  const response = await axios.get("/api/chat");
  return response.data;
};

const ChatList = () => {
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery<Chat[]>({ queryKey: ["chats"], queryFn: fetchChats });
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>Error loading Chats</Text>;

  return (
    <Flex direction="column" className="shadow-2xl rounded-md">
      <Flex
        className="w-full dark:bg-zinc-800 bg-zinc-200 rounded-t-md py-1 px-2"
        justify="between"
        align="center"
      >
        <Heading>Chats</Heading>
        <NewChat updateChat={() => queryClient.invalidateQueries()} />
      </Flex>
      <Flex
        gap="3"
        direction="column"
        className="dark:bg-zinc-900 bg-zinc-100 p-3 rounded-b-md"
      >
        {chats && chats.length == 0 ? (
          <Text>Error</Text>
        ) : (
          chats?.map((c) => (
            <ChatComp
              key={c.id}
              chatId={c.id}
              receiver={c.user1 == session?.user?.email! ? c.user2 : c.user1}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default ChatList;
