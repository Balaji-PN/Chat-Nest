"use server";

import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";
import UserBar from "./_components/UserBar";
import ChatList from "./chat/ChatList";
import Msg from "./chat/msg/Msg";
import toast from "react-hot-toast";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  const chatId = searchParams?.id ? true : false;

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
          <ChatList />
        </div>
        <div
          className={`min-h-svh md:w-9/12 gap-6 px-2 rounded-sm ${
            chatId ? "flex" : "hidden"
          }  md:flex flex-col`}
        >
          <Msg />
        </div>
      </Flex>
    );
  }
}
