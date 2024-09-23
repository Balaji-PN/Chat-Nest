"use client";

import supabase from "@/app/_components/supabase";
import { Message } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const MsgComp = ({
  message,
  chatId,
  receiver,
}: {
  message: Message[];
  chatId: string;
  receiver: string;
}) => {
  const [messages, setMessages] = useState<Message[]>(message);
  useEffect(() => {
    const channel = supabase
      .channel(chatId)
      .on("broadcast", { event: "real-msg" }, ({ payload }) => {
        setMessages((m) => [...m, payload.msg]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
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
  );
};

export default MsgComp;
