"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ChatList from "./ChatList";

const queryClient = new QueryClient();
const ChatProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatList />
    </QueryClientProvider>
  );
};

export default ChatProvider;
