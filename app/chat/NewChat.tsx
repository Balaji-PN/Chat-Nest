"use client";

import { Button, Flex, IconButton, Popover, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { IoAdd, IoPersonAddOutline } from "react-icons/io5";

const NewChat = () => {
  const [email, setEmail] = useState("");

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost" color="gray">
          <IoAdd size={20} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column" gap="2">
          <TextField.Root
            placeholder="Reciver Mail"
            value={email}
            onChange={(val) => setEmail(val.target.value)}
          >
            <TextField.Slot>
              <CiMail size={20} />
            </TextField.Slot>
          </TextField.Root>
          <Popover.Close>
            <Button
              onClick={() => {
                axios
                  .post("/api/chat", { email: email })
                  .then((res) => toast.success("Chat created"))
                  .catch((err) => toast.error(err.response.data));
              }}
            >
              Add Friend <IoPersonAddOutline size={18} />
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default NewChat;
