"use client";

import supabase from "@/app/_components/supabase";
import axios from "axios";
import { useRef, useState } from "react";
import { CiCircleRemove, CiFileOn } from "react-icons/ci";
import { IoIosAttach, IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    const uploadedFilePaths: string[] = [];

    for (const fileObj of selectedFiles) {
      const { data, error } = await supabase.storage
        .from("test")
        .upload(`${chatId}/${fileObj.file.name}`, fileObj.file);

      if (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
        return;
      }
      if (data) {
        uploadedFilePaths.push(data.path);
      }
    }

    // Send message along with uploaded file paths to the server
    await axios.post("/api/chat/msg", {
      content,
      receiver,
      chatId,
      files: uploadedFilePaths, // Send file paths with message content
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
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3">
      {selectedFiles.length > 0 && (
        <ScrollArea className="w-full rounded-lg border p-3 mb-2">
          <div className="flex w-max space-x-2">
            {selectedFiles.map((fileObj) => (
              <div
                key={fileObj.id}
                className="relative flex items-center bg-secondary text-secondary-foreground rounded-md pl-2 pr-1 py-1 text-sm shadow-sm border border-gray-200 dark:border-gray-600"
              >
                {isImageFile(fileObj.file.name) && fileObj.preview ? (
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="h-7 w-7 object-cover rounded-sm mr-2"
                  />
                ) : (
                  <CiFileOn className="w-5 h-5 mr-2 text-muted-foreground" />
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-5 w-5 rounded-full bg-background text-red-500 hover:bg-red-100 dark:hover:bg-red-800 absolute -top-2 -right-2"
                  onClick={() => removeFile(fileObj.id)}
                >
                  <CiCircleRemove className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      <div className="flex items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="relative flex-1 rounded-lg border border-input bg-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary p-2">
          <Textarea
            placeholder="Type your message..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="min-h-[2.5rem] max-h-[10rem] resize-y pl-10 pr-2 pt-2 pb-2 border-none shadow-none focus-visible:ring-0 text-base leading-tight"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={triggerFileInput}
            className="absolute left-2 bottom-2 text-gray-500 dark:text-gray-400 hover:bg-transparent h-8 w-8"
          >
            <IoIosAttach size={20} />
          </Button>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isUploading || (content.trim() === '' && selectedFiles.length === 0)}
          className="h-10 w-10 shrink-0"
        >
          {isUploading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <IoIosSend size={20} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewMsgForm;
