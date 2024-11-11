"use client";

import { AuthContextProvider } from "@/context/useAuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (!token) return router.push("/sign-in");

  return <div>{children}</div>;
}
