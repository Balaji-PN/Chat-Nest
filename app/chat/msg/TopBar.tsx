"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

const TopBar = ({ receiver }: { receiver: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center mb-2">
      <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
        <IoIosArrowBack size={20} className="mx-2" />
      </Button>
      <h2 className="text-2xl font-bold">{receiver}</h2>
    </div>
  );
};

export default TopBar;
