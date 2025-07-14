"use client";

import { Chat } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  }, [user]);

  return (
    <>
      {chats &&
        chats?.map((c) => (
          <div
            className="flex items-center gap-2 hover:cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            key={c.id}
            onClick={() => router.push("/?mode=chat&id=" + c.id)}
          >
            <Avatar className="w-12 h-12 border-2 border-gray-300 dark:border-gray-600">
              <AvatarImage
                src={c.user1 == user ? c.user2Profile! : c.user1Profile!}
                alt={c.user1 == user ? c.user2 : c.user1}
              />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {(c.user1 == user ? c.user2.charAt(0) : c.user1.charAt(0))}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
                {c.user1 == user ? c.user2Name : c.user1Name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.user1 == user ? c.user2 : c.user1}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ChatComp;
