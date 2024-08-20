"use server";

import {
  Avatar,
  Badge,
  Flex,
  Popover,
  Text,
  TextField,
} from "@radix-ui/themes";
import { GoSignOut } from "react-icons/go";
import ThemeSwitch from "../_components/ThemeSwitch";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { CgRename } from "react-icons/cg";

const UserBar = async () => {
  const session = await getServerSession();
  return (
    <Flex justify="between" className="w-full">
      <Flex>
        <Popover.Root>
          <Popover.Trigger>
            <Flex gap="3">
              <Avatar
                fallback={session?.user?.name!.charAt(0)!}
                src={session?.user?.image!}
                radius="full"
                size="4"
              />
              <Flex direction="column" align="baseline">
                <Text weight={"bold"}>{session?.user?.name!}</Text>
                <Badge>Online</Badge>
              </Flex>
            </Flex>
          </Popover.Trigger>
          <Popover.Content>
            <Flex direction="column" align="center" gap="3">
              <TextField.Root placeholder={session?.user?.name!}>
                <TextField.Slot>
                  <CgRename size={20} />
                </TextField.Slot>
              </TextField.Root>
              <Avatar
                fallback={session?.user?.name!}
                src={session?.user?.image!}
                radius="full"
                size="7"
              />
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>
      <Flex align="center" gap="3">
        <ThemeSwitch />
        <Link
          href={"/api/auth/signout"}
          className="dark:hover:bg-red-900 hover:bg-red-300 px-2 py-1 rounded-md"
        >
          <GoSignOut size={20} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default UserBar;
