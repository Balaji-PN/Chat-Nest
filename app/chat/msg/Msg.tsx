"use client";

import { Message } from "@prisma/client";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import NewMsgForm from "./NewMsgForm";

const fetchMessages = async (id: string) => {
  const res = await axios.get(`/api/chat/msg?id=${id}`);
  return res.data;
};

const Msg = () => {
  const search = useSearchParams();
  const router = useRouter();
  const id = search.get("id");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchMessages(id!),
    enabled: !!id, // Only run the query if `id` is not null
  });

  if (!id) return <div className="hidden md:flex">Select the Chat</div>;

  if (isLoading) return <Text>Loading messages...</Text>;
  if (error) return <Text>Error loading messages</Text>;

  const messages: Message[] = data?.msg || [];
  const mail: string = data?.mail || "";

  return (
    <Flex
      direction={"column"}
      className="h-[100%] my-4 mx-2 max-w-[100vw] md:w-full"
      justify={"between"}
    >
      <Flex align={"center"}>
        <IconButton variant="ghost" onClick={() => router.push("/")}>
          <IoIosArrowBack size={20} className="mx-2" />
        </IconButton>
        <Heading>{mail}</Heading>
      </Flex>
      <Flex
        direction={"column"}
        className="flex-1 mt-3 max-h-[80vh] overflow-y-auto px-4"
        gap={"2"}
      >
        {messages.length > 0 ? (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === mail ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  m.sender === mail
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-lg max-w-xs dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-700 dark:text-white"
                    : "bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-lg shadow-lg max-w-xs dark:bg-gradient-to-r dark:from-green-600 dark:to-teal-700 dark:text-white"
                }`}
              >
                <Text size="2">{m.content}</Text>
              </div>
            </div>
          ))
        ) : (
          <Text>No messages found.</Text>
        )}
      </Flex>
      <NewMsgForm
        updateChats={() => queryClient.invalidateQueries()}
        chatId={id}
        receiver={mail}
      />
    </Flex>
  );
};

export default Msg;
