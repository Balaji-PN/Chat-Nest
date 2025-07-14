"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const UploadComp = () => {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const handleUpload = () => {
    supabase.storage
      .from("test")
      .upload(file?.name!, file!)
      .catch(() => toast.error("Error while uploading the image"))
      .then((res) => {
        toast.success("Image Uploaded");
      });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0)
            setFile(e.target.files[0]);
        }}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default UploadComp;
