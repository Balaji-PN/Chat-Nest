"use client";

import { Flex, IconButton, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const TopBar = ({ receiver }: { receiver: string }) => {
  const router = useRouter();
  return (
    <Flex align="center" className="mb-2">
      <IconButton variant="ghost" onClick={() => router.push("/")}>
        <IoIosArrowBack size={20} className="mx-2" />
      </IconButton>
      <Heading>{receiver}</Heading>
    </Flex>
  );
};

export default TopBar;
