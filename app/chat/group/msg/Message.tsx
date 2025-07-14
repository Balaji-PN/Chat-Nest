"use client";

import supabase from "@/app/_components/supabase";
import { GroupMessage as M } from "@prisma/client";
import React, { useEffect, useState } from "react";

const Message = ({ M, user, gId }: { M: M[]; user: string; gId: string }) => {
  const [messages, setMessages] = useState(M);
  
  useEffect(() => {
    setMessages(M);
  }, [M]);

  useEffect(() => {
    const channel = supabase
      .channel(gId)
      .on("broadcast", { event: "grp-msg" }, ({ payload }) => {
        console.log("Received payload:", payload);
        setMessages((msg) => [...msg, payload]);
      })
      .subscribe();

    console.log("Channel subscribed:", channel);

    return () => {
      supabase.removeChannel(channel);
      console.log("Channel unsubscribed");
    };
  }, [gId]);

  return (
    <div className="flex flex-col gap-2 py-4 min-h-full">
      {messages.length > 0 ? (
        messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.sender === user ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                m.sender !== user
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                  : "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
              }`}
            >
              <p className="text-sm">{m.content}</p>
              {m.sender !== user && (
                <p className="text-xs text-gray-400 mt-1">
                  {m.sender}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No messages found.</p>
        </div>
      )}
    </div>
  );
};

export default Message;
