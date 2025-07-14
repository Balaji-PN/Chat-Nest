"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { CgRename } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

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
    <div className="flex items-center mb-2 justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <IoIosArrowBack size={20} className="mx-2" />
        </Button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <TiUserAdd size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center gap-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter member mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="pl-8"
                />
                <CgRename size={20} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button type="submit" className="w-full">Add Member</Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
