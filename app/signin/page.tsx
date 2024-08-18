import { Callout, Heading, Separator, Tabs } from "@radix-ui/themes";
import { BiInfoCircle } from "react-icons/bi";
import SigninBtn from "./SigninBtn";
import SigninComp from "./SigninComp";
import SignupComp from "./SignupComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

const Signin = async () => {
  const session = await getServerSession();

  if (session) redirect("/");

  return (
    <div className="flex flex-col gap-2 py-8">
      <Heading align="center" size="8" weight="bold">
        Chat Nest
      </Heading>
      <Heading align="center" weight="light" size="4">
        Chat from anywhere to anyone
      </Heading>

      <div className="mx-5 lg:mx-80 min-h-[40rem] md:min-h-[34rem] flex flex-col justify-center">
        <Callout.Root className="mb-4">
          <Callout.Icon>
            <BiInfoCircle />
          </Callout.Icon>
          <Callout.Text>Login to start Chating</Callout.Text>
        </Callout.Root>

        <Tabs.Root defaultValue="signin">
          <Tabs.List justify="center" highContrast>
            <Tabs.Trigger value="signin">Signin</Tabs.Trigger>
            <Tabs.Trigger value="signup">Signup</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="signin">
            <SigninComp />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignupComp />
          </Tabs.Content>
        </Tabs.Root>
        <Separator orientation="horizontal" size="4" className="my-2 mb-4" />
        <SigninBtn />
      </div>
    </div>
  );
};

export default Signin;
