"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NewMsgForm from "./NewMsgForm";
import { Message } from "@prisma/client";

const Msg = () => {
  const search = useSearchParams();
  const id = search.get("id");
  const [Msg, setMsg] = useState<Message[] | null>(null);
  const [mail, setMail] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`/api/chat/msg?id=${id}`);
        setMsg(res.data.msg);
        setMail(res.data.mail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!id) return <Flex justify={"center"}>Select the Chat</Flex>;

  return (
    <Flex
      direction={"column"}
      className="h-[100%] my-4 mx-2"
      justify={"between"}
    >
      <Heading>{mail}</Heading>
      <Flex direction={"column"} className="flex-1 mt-3" gap={"2"}>
        {Msg ? (
          Msg.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender == mail ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  m.sender == mail
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
      <NewMsgForm chatId={id} receiver={mail!} />
    </Flex>
  );
};

export default Msg;
