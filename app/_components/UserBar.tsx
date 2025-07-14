"use server";

import { GoSignOut } from "react-icons/go";
import ThemeSwitch from "../_components/ThemeSwitch";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { CgRename } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const UserBar = async () => {
  const session = await getServerSession();
  return (
    <div className="flex justify-between w-full">
      <div>
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-3 items-center cursor-pointer">
              <Avatar className="w-12 h-12">
                <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} />
                <AvatarFallback>{session?.user?.name!.charAt(0)!}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-baseline">
                <p className="font-bold">{session?.user?.name!}</p>
                <Badge>Online</Badge>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 flex flex-col items-center gap-3">
            <Input type="text" placeholder={session?.user?.name!} />
            <Avatar className="w-20 h-20">
              <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} />
              <AvatarFallback>{session?.user?.name!}</AvatarFallback>
            </Avatar>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        <Link
          href={"/api/auth/signout"}
          className="dark:hover:bg-red-900 hover:bg-red-300 px-2 py-1 rounded-md"
        >
          <GoSignOut size={20} />
        </Link>
      </div>
    </div>
  );
};

export default UserBar;
