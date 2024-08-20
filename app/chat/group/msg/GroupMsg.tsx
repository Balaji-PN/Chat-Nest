"use client";

import { Group, GroupMessage } from "@prisma/client";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import NewMsgForm from "./NewMsgForm";
import { useSession } from "next-auth/react";

const fetchMessages = async (id: string) => {
  const res = await axios.get(`/api/group/msg?id=${id}`);
  return res.data;
};

const GroupMsg = () => {
  const search = useSearchParams();
  const router = useRouter();
  const id = search.get("id");
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchMessages(id!),
    enabled: !!id, // Only run the query if `id` is not null
  });

  if (!id) return <div className="hidden md:flex">Select the Chat</div>;
  if (isLoading) return <Text>Loading messages...</Text>;
  if (error) return <Text>Error loading messages</Text>;

  const messages: GroupMessage[] = data?.msg || [];
  const group: Group = data?.group || {};

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
        <Flex direction={"column"}>
          <Heading>{group.name}</Heading>
          <Text>{group.description}</Text>
        </Flex>
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
                m.sender === session?.user?.email
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  m.sender === session?.user?.email
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-700"
                    : "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg dark:bg-gradient-to-r dark:from-green-600 dark:to-teal-700"
                }`}
              >
                <Text size="2">{m.content}</Text>
                {m.sender !== session?.user?.email && (
                  <Text size="1" className="text-gray-400 mt-1">
                    {m.sender}
                  </Text>
                )}
              </div>
            </div>
          ))
        ) : (
          <Text>No messages found.</Text>
        )}
      </Flex>
      <NewMsgForm
        updateChats={() => queryClient.invalidateQueries()}
        groupId={id}
      />
    </Flex>
  );
};

export default GroupMsg;
