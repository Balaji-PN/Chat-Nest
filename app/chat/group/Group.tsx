"use client";

import supabase from "@/app/_components/supabase";
import { Group as G } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Group = ({ g, user }: { g: G[]; user: string }) => {
  const router = useRouter();
  const [groups, setGroups] = useState<G[]>(g);

  useEffect(() => {
    const channel = supabase
      .channel(user)
      .on(
        "broadcast",
        {
          event: "grp-add",
        },
        ({ payload }) => {
          setGroups((grp) => [...grp, payload]);
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <>
      {groups && groups.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400"> No Groups </p>
      ) : (
        <div className="flex gap-3">
          {groups.map((g) => (
            <div
              className="flex flex-col items-center w-16 gap-1 hover:cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
              key={g.id}
              onClick={() => router.push(`/?mode=group&id=${g.id}`)}
            >
              <Avatar className="w-12 h-12 border-2 border-gray-300 dark:border-gray-600">
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{g.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Badge className="overflow-hidden text-ellipsis whitespace-nowrap max-w-14 text-center bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100">
                {g.name}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Group;
