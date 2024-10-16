"use client";

import supabase from "@/app/_components/supabase";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface MessageWithFiles {
  content: string;
  id: string;
  sender: string;
  receiver: string;
  docs?: string[]; // Array of file paths
}

const MsgComp = ({
  message,
  chatId,
  receiver,
}: {
  message: MessageWithFiles[];
  chatId: string;
  receiver: string;
}) => {
  const [messages, setMessages] = useState<MessageWithFiles[]>(message);

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

  // Helper function to get the full URL of the file
  const getFileUrl = (filePath: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/test/${filePath}`;
  };

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
              {/* Display text content */}
              {m.content && <Text size="2">{m.content}</Text>}

              {/* Display attached images, if any */}
              {m.docs && m.docs?.length > 0 && (
                <div className="mt-2 space-y-2">
                  {m.docs.map((filePath, index) => (
                    <img
                      key={index}
                      src={getFileUrl(filePath)}
                      alt="Uploaded file"
                      className="max-w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
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

export default MsgComp;
