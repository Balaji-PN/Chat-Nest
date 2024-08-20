"use client";

import { useSearchParams } from "next/navigation";

const chatId = () => {
  const search = useSearchParams();
  const chatId = search.get("id");
  return chatId;
};

export default chatId;
