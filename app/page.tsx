"use server";

import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";
import UserBar from "./_components/UserBar";
import ChatList from "./chat/ChatList";
import Msg from "./chat/msg/Msg";

export default async function Home() {
  const session = await getServerSession();

  if (!session) redirect("/signin");
  else {
    return (
      <Flex>
        <Flex
          direction={"column"}
          className="py-4 min-h-svh w-3/12 hidden gap-6 dark:bg-zinc-900 px-2 rounded-sm"
        >
          <UserBar />
          <ChatList />
        </Flex>
        <Flex
          direction={"column"}
          className="min-h-svh w-9/12 hidden gap-6 px-2 rounded-sm"
        >
          <Msg />
        </Flex>
      </Flex>
    );
  }
}
