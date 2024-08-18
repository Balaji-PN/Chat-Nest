"use client";

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SigninBtn = () => {
  return (
    <Button variant="outline" color="gray" onClick={() => signIn()}>
      Signin with Google
      <FcGoogle />
    </Button>
  );
};

export default SigninBtn;
