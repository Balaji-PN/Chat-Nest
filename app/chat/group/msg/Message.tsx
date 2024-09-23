"use client";

import supabase from "@/app/_components/supabase";
import { GroupMessage as M } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const Message = ({ M, user, gId }: { M: M[]; user: string; gId: string }) => {
  const [messages, setMessages] = useState(M);
  useEffect(() => {
    const channel = supabase
      .channel(gId)
      .on("broadcast", { event: "grp-msg" }, ({ payload }) => {
        console.log("Received payload:", payload);
        setMessages((msg) => [...msg, payload]);
      })
      .subscribe();

    console.log("Channel subscribed:", channel);

    return () => {
      supabase.removeChannel(channel);
      console.log("Channel unsubscribed");
    };
  }, [gId]);

  return (
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
  );
};

export default Message;
