"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { LuMessageSquareDashed } from "react-icons/lu";
import axios from "axios";

const NewMsgForm = ({
  receiver,
  chatId,
}: {
  receiver: String;
  chatId: string;
}) => {
  const [content, setContent] = useState("");

  return (
    <Flex>
      <TextField.Root
        placeholder="Type the Message...."
        className="flex-1"
        onChange={(c) => setContent(c.target.value)}
      >
        <TextField.Slot>
          <LuMessageSquareDashed size={16} />
        </TextField.Slot>
      </TextField.Root>
      <Button
        size={"2"}
        onClick={() =>
          axios.post("/api/chat/msg", { content, receiver, chatId })
        }
      >
        <IoIosSend size={18} />
      </Button>
    </Flex>
  );
};

export default NewMsgForm;
