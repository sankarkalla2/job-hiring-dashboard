"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
