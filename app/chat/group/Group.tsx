"use client";

import { Group as G } from "@prisma/client";
import { Flex, Avatar, Badge } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const Group = ({ g }: { g: G }) => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      align={"center"}
      className="w-16"
      gap={"1"}
      onClick={() => router.push(`/?mode=group&id=${g.id}`)}
      key={g.id}
    >
      <Avatar fallback={g.name.charAt(0)} size="5" radius="full" />
      <Badge className="overflow-clip max-w-14 text-wrap text-center">
        {g.name}
      </Badge>
    </Flex>
  );
};

export default Group;
