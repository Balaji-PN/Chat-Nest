"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Msg from "./Msg";

const queryClient = new QueryClient();
const MsgProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Msg />
    </QueryClientProvider>
  );
};

export default MsgProvider;
