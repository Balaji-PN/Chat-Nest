"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { IoAdd, IoPersonAddOutline } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewChat = () => {
  const [email, setEmail] = useState("");

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
            placeholder="Receiver Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-8"
          />
          <CiMail size={20} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          onClick={() => {
            axios
              .post("/api/chat", { email: email })
              .then((res) => toast.success("Chat created"))
              .catch((err) => toast.error(err.response.data));
          }}
          className="w-full"
        >
          Add Friend <IoPersonAddOutline size={18} className="ml-2" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NewChat;
