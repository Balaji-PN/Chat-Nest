"use client";

import { Group } from "@prisma/client";
import { Avatar, Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import NewGroup from "./NewGroup";

const fetchGroups = async () => {
  const response = await axios.get("/api/group");
  return response.data;
};

const GroupList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery<Group[]>({ queryKey: ["groups"], queryFn: fetchGroups });

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>Error loading groups</Text>;

  return (
    <Flex direction="column" className="shadow-lg rounded-md">
      <Flex
        className="w-full dark:bg-zinc-800 bg-zinc-200 rounded-t-md py-1 px-2"
        justify="between"
        align={"center"}
      >
        <Heading>Groups</Heading>
        <NewGroup updateGrp={() => queryClient.invalidateQueries()} />
      </Flex>
      <Flex
        gap="3"
        className="dark:bg-zinc-900 bg-zinc-100 p-3 rounded-b-md overflow-x-scroll"
      >
        {groups && groups.length === 0 ? (
          <Text>No Groups</Text>
        ) : (
          groups?.map((g) => (
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
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default GroupList;
