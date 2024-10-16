"use client";

import {
  Button,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { CgRename } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";

const TopBar = ({
  name,
  description,
  gId,
}: {
  name: string;
  description: string;
  gId: string;
}) => {
  const [mail, setMail] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("/api/group/members", { groupId: gId, userId: mail })
      .then((res) => toast.success("Member was added"))
      .catch((err) => toast.error("Error while adding the member"));
  };
  return (
    <Flex align="center" className="mb-2" justify="between">
      <Flex align="center">
        <IconButton variant="ghost" onClick={() => router.push("/")}>
          <IoIosArrowBack size={20} className="mx-2" />
        </IconButton>
        <Flex direction="column">
          <Heading>{name}</Heading>
          <Text>{description}</Text>
        </Flex>
      </Flex>
      <Flex align="center">
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline">
              <TiUserAdd size={24} />
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Flex direction="column" align="center" gap="3">
                <TextField.Root
                  placeholder="enter member mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                >
                  <TextField.Slot>
                    <CgRename />
                  </TextField.Slot>
                </TextField.Root>
                <Button>Add Member</Button>
              </Flex>
            </form>
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Flex>
  );
};

export default TopBar;
