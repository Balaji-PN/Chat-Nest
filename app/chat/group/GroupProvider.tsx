"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import GroupList from "./GroupList";

const queryClient = new QueryClient();

const GroupProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GroupList />
    </QueryClientProvider>
  );
};

export default GroupProvider;
