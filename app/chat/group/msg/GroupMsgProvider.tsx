"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import GroupMsg from "./GroupMsg";

const GroupMsgProvider = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GroupMsg />
    </QueryClientProvider>
  );
};

export default GroupMsgProvider;
