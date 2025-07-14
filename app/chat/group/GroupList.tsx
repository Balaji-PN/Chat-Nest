import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import Group from "./Group";
import NewGroup from "./NewGroup";

const GroupList = async () => {
  const session = await getServerSession();
  const groups = await prisma.group.findMany({
    where: { member: { some: { userId: session?.user?.email! } } },
    include: { member: true },
  });
  return (
    <div className="flex flex-col shadow-lg rounded-md">
      <div
        className="w-full dark:bg-gray-900 bg-zinc-200 rounded-t-md py-1 px-2 flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold">Groups</h2>
        <NewGroup />
      </div>
      <div
        className="flex gap-3 dark:bg-gray-950 bg-zinc-100 p-3 rounded-b-md overflow-x-scroll no-scrollbar"
      >
        <Group g={groups} user={session?.user?.email!} />
      </div>
    </div>
  );
};

export default GroupList;
