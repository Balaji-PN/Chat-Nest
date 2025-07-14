import { BiInfoCircle } from "react-icons/bi";
import SigninBtn from "./SigninBtn";
import SigninComp from "./SigninComp";
import SignupComp from "./SignupComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signin = async () => {
  const session = await getServerSession();

  if (session) redirect("/");

  return (
    <div className="flex flex-col gap-2 py-8">
      <h1 className="text-5xl font-extrabold text-center">Chat Nest</h1>
      <h2 className="text-lg font-light text-center">Chat from anywhere to anyone</h2>

      <div className="mx-5 lg:mx-80 min-h-[40rem] md:min-h-[34rem] flex flex-col justify-center">
        <div className="mb-4 p-4 rounded-md border border-blue-400 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-start gap-2">
          <BiInfoCircle className="mt-1 text-xl" />
          <p>Login to start Chatting</p>
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Signin</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SigninComp />
          </TabsContent>
          <TabsContent value="signup">
            <SignupComp />
          </TabsContent>
        </Tabs>
        <div className="my-2 mb-4 h-px bg-gray-200 dark:bg-gray-700 w-full" />
        <SigninBtn />
      </div>
    </div>
  );
};

export default Signin;
