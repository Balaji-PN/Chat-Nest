"use client";

import supabase from "@/app/_components/supabase";
import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRef, useState } from "react";
import { CiCircleRemove, CiFileOn } from "react-icons/ci";
import { IoIosAdd, IoIosSend } from "react-icons/io";
import { LuMessageSquareDashed } from "react-icons/lu";

interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

const isImageFile = (fileName: string) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return imageExtensions.includes(extension);
};

const NewMsgForm = ({
  receiver,
  chatId,
}: {
  receiver: string;
  chatId: string;
}) => {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsUploading(true);

    // Upload selected files to Supabase
    const uploadedFileIds = await Promise.all(
      selectedFiles.map(async (fileObj) => {
        const { data: uploadData, error } = await supabase.storage
          .from("test")
          .upload(`${chatId}/${fileObj.file.name}`, fileObj.file);

        if (error) {
          console.error("Error uploading file:", error);
          return null;
        }

        return uploadData?.path || null;
      })
    );

    const validFileIds = uploadedFileIds.filter(
      (id): id is string => id !== null
    );

    console.log("Uploaded file IDs:", validFileIds);

    // Send message along with uploaded file IDs to the server
    await axios.post("/api/chat/msg", {
      content,
      receiver,
      chatId,
      files: validFileIds, // Send file paths with message content
    });

    setContent("");
    setSelectedFiles([]); // Clear the file selection after upload
    setIsUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: isImageFile(file.name) ? URL.createObjectURL(file) : "",
        id: Math.random().toString(36).substr(2, 9),
      }));
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles((files) => {
      const fileToRemove = files.find((f) => f.id === id);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return files.filter((f) => f.id !== id);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Flex justify="between" gap="3">
        {/* Trigger file input for uploading files */}
        <Button size="3" onClick={triggerFileInput} variant="outline">
          <IoIosAdd />
        </Button>
        <TextField.Root
          placeholder="Type the Message...."
          className="flex-1"
          onChange={(c) => setContent(c.target.value)}
          size={"3"}
          value={content}
        >
          <TextField.Slot>
            <LuMessageSquareDashed size={16} />
          </TextField.Slot>
        </TextField.Root>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          size="3"
          onClick={handleSubmit}
          variant="outline"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : <IoIosSend size={18} />}
        </Button>
      </Flex>

      {/* Display selected file previews */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {selectedFiles.map((fileObj) => (
            <div key={fileObj.id} className="relative p-2 rounded">
              <div className="flex items-center justify-center h-24 mb-2">
                {isImageFile(fileObj.file.name) && fileObj.preview ? (
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <CiFileOn className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <p className="text-xs truncate">{fileObj.file.name}</p>
              <Button
                type="button"
                variant="ghost"
                className="absolute top-1 right-1"
                onClick={() => removeFile(fileObj.id)}
              >
                <CiCircleRemove className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NewMsgForm;
