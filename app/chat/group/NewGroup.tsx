"use client";

import { Button, Flex, IconButton, Popover, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiGroup } from "react-icons/bi";
import { CgRename } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";

const NewGroup = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

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
            value={name}
            placeholder="Group Name"
            onChange={(m) => setName(m.target.value)}
          >
            <TextField.Slot>
              <CgRename size={20} />
            </TextField.Slot>
          </TextField.Root>
          <TextField.Root
            value={desc}
            placeholder="Group Description"
            onChange={(m) => setDesc(m.target.value)}
          ></TextField.Root>
          <Popover.Close>
            <Button
              onClick={async () => {
                const grp = await axios
                  .post("/api/group", { name, desc })
                  .then(() => toast.success("Group Created"))
                  .catch((err) => toast.error(err.response.data));
              }}
            >
              Create Group <BiGroup size={20} />
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default NewGroup;
