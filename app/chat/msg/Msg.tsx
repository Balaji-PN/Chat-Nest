"use client";

import { Message } from "@prisma/client";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import NewMsgForm from "./NewMsgForm";

const Msg = () => {
  const search = useSearchParams();
  const router = useRouter();
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

  if (!id) return <div className="hidden md:flex">Select the Chat</div>;

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
        <Text className="text-sm md:text-xl">{mail}</Text>
      </Flex>
      <Flex
        direction={"column"}
        className="flex-1 mt-3 max-h-[80vh] overflow-y-auto "
        gap={"2"}
      >
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
