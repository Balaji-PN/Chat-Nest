"use client";

import supabase from "@/app/_components/supabase";
import { Group as G } from "@prisma/client";
import { Flex, Avatar, Badge, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  }, [supabase]);

  return (
    <>
      {groups && groups.length === 0 ? (
        <Text> No Groups </Text>
      ) : (
        <Flex gap="3">
          {groups.map((g) => (
            <Flex
              direction="column"
              align={"center"}
              className="w-16"
              gap={"1"}
              key={g.id}
              onClick={() => router.push(`/?mode=group&id=${g.id}`)}
            >
              <Avatar fallback={g.name.charAt(0)} size="5" radius="full" />
              <Badge className="overflow-clip max-w-14 text-wrap text-center">
                {g.name}
              </Badge>
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Group;
