"use client";

import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UploadComp = () => {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const handleUpload = () => {
    supabase.storage
      .from("test")
      .upload(file?.name!, file!)
      .catch(() => toast.error("Error while uploading the image"))
      .then((res) => {
        if (res?.error) toast.error(res.error.message);
        else toast.success("Image Uploaded");
      });
  };
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0)
            setFile(e.target.files[0]);
        }}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
};

export default UploadComp;
