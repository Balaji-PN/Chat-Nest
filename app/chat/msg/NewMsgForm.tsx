"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { LuMessageSquareDashed } from "react-icons/lu";

const NewMsgForm = ({
  receiver,
  chatId,
}: {
  receiver: String;
  chatId: string;
}) => {
  const [content, setContent] = useState("");

  return (
    <Flex justify="between" gap="3">
      <TextField.Root
        placeholder="Type the Message...."
        className="flex-1"
        onChange={(c) => setContent(c.target.value)}
        size={"3"}
        value={content}
      >
        <TextField.Slot>
          <LuMessageSquareDashed size={16} />
        </TextField.Slot>
      </TextField.Root>
      <Button
        size={"3"}
        onClick={() => {
          axios.post("/api/chat/msg", { content, receiver, chatId });
          setContent("");
        }}
        variant="outline"
      >
        <IoIosSend size={18} />
      </Button>
    </Flex>
  );
};

export default NewMsgForm;
