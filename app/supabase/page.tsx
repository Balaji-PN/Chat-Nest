import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import UploadComp from "./UploadComp";

const page = () => {
  const supabase = createClientComponentClient();

  const test = supabase.storage.from("test").getPublicUrl("test123.jpg");
  return (
    <div>
      <Image src={test.data.publicUrl} alt="A" width={200} height={200} />
      <UploadComp />
    </div>
  );
};

export default page;
