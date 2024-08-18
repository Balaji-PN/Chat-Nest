import { Button, Flex, TextField } from "@radix-ui/themes";
import { FaKey, FaRegUser } from "react-icons/fa";
import {
  MdDriveFileRenameOutline,
  MdOutlineAlternateEmail,
} from "react-icons/md";
import "server-only";

const SignupComp = () => {
  return (
    <Flex direction="column" gap="2" className="my-8">
      <TextField.Root radius="medium" placeholder="John Doe" type="text">
        <TextField.Slot>
          <MdDriveFileRenameOutline size={18} />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        radius="medium"
        placeholder="sample@gmail.com"
        type="email"
      >
        <TextField.Slot>
          <MdOutlineAlternateEmail size={18} />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root radius="large" placeholder="*******" type="password">
        <TextField.Slot>
          <FaKey size={16} />
        </TextField.Slot>
      </TextField.Root>
      <Button variant="soft">
        Signup <FaRegUser />
      </Button>
    </Flex>
  );
};

export default SignupComp;
