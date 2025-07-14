"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const SigninBtn = () => {
  return (
    <Button variant="outline" onClick={() => signIn("google")} className="w-full">
      Signin with Google
      <FcGoogle className="ml-2" />
    </Button>
  );
};

export default SigninBtn;
