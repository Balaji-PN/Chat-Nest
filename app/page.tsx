"use server";

import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserBar from "./_components/UserBar";
import ChatList from "./chat/ChatList";
import GroupList from "./chat/group/GroupList";
import Msg from "./chat/msg/Msg";
import GroupMsg from "./chat/group/msg/GroupMsg";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  const chatId = searchParams?.id ? String(searchParams?.id) : "";
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
          <GroupList />
          <ChatList />
        </div>
        <div
          className={`min-h-svh w-[100%] md:w-9/12 gap-6 px-2 rounded-sm ${
            chatId ? "flex" : "hidden"
          }  md:flex flex-col`}
        >
          {mode === "chat" && (
            <Msg chatId={chatId} user={session?.user?.email!} />
          )}
          {mode === "group" && (
            <GroupMsg groupId={chatId!} user={session.user?.email!} />
          )}
        </div>
      </Flex>
    );
  }
}
