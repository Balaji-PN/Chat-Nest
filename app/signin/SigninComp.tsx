import { Button, Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { FaKey } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "server-only";

const SigninComp = () => {
  return (
    <Flex direction="column" gap="2" className="my-8">
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
          <FaKey size={18} />
        </TextField.Slot>
      </TextField.Root>
      <Button variant="soft">
        Signin <GoSignIn />
      </Button>
    </Flex>
  );
};

export default SigninComp;
