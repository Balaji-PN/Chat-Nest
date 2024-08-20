"use server";

import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";
import UserBar from "./_components/UserBar";
import ChatProvider from "./chat/ChatProvider";
import GroupProvider from "./chat/group/GroupProvider";
import MsgProvider from "./chat/msg/MsgProvider";
import GroupMsgProvider from "./chat/group/msg/GroupMsgProvider";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  const chatId = searchParams?.id ? true : false;
  const mode = searchParams?.mode;

  if (!session) redirect("/signin");
  else {
    return (
      <Flex>
        <div
          className={`py-4 w-[100%] min-h-svh md:w-3/12 gap-6 dark:bg-zinc-900 px-2 rounded-sm ${
            chatId ? "hidden" : "flex"
          } md:flex flex-col`}
        >
          <UserBar />
          <GroupProvider />
          <ChatProvider />
        </div>
        <div
          className={`min-h-svh w-[100%] md:w-9/12 gap-6 px-2 rounded-sm ${
            chatId ? "flex" : "hidden"
          }  md:flex flex-col`}
        >
          {mode === "chat" && <MsgProvider />}
          {mode === "group" && <GroupMsgProvider />}
        </div>
      </Flex>
    );
  }
}
