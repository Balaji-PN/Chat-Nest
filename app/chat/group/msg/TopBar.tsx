"use client";

import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const TopBar = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const router = useRouter();
  return (
    <Flex align="center" className="mb-2">
      <IconButton variant="ghost" onClick={() => router.push("/")}>
        <IoIosArrowBack size={20} className="mx-2" />
      </IconButton>
      <Flex direction="column">
        <Heading>{name}</Heading>
        <Text>{description}</Text>
      </Flex>
    </Flex>
  );
};

export default TopBar;
