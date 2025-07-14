import { FaKey, FaRegUser } from "react-icons/fa";
import {
  MdDriveFileRenameOutline,
  MdOutlineAlternateEmail,
} from "react-icons/md";
import "server-only";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignupComp = () => {
  return (
    <div className="flex flex-col gap-4 my-8">
      <div className="relative">
        <Input type="text" placeholder="John Doe" className="pl-8" />
        <MdDriveFileRenameOutline size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="relative">
        <Input type="email" placeholder="sample@gmail.com" className="pl-8" />
        <MdOutlineAlternateEmail size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="relative">
        <Input type="password" placeholder="*******" className="pl-8" />
        <FaKey size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <Button className="w-full">
        Signup <FaRegUser className="ml-2" />
      </Button>
    </div>
  );
};

export default SignupComp;
