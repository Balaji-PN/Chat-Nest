"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiGroup } from "react-icons/bi";
import { CgRename } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewGroup = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IoAdd size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 flex flex-col gap-2">
        <div className="relative">
          <Input
            type="text"
            value={name}
            placeholder="Group Name"
            onChange={(e) => setName(e.target.value)}
            className="pl-8"
          />
          <CgRename size={20} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <Input
            type="text"
            value={desc}
            placeholder="Group Description"
            onChange={(e) => setDesc(e.target.value)}
            className="pl-8"
          />
          <BiGroup size={20} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          onClick={async () => {
            await axios
              .post("/api/group", { name, desc })
              .then(() => toast.success("Group Created"))
              .catch((err) => toast.error(err.response.data));
          }}
          className="w-full"
        >
          Create Group <BiGroup size={20} className="ml-2" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NewGroup;
