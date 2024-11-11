"use client";

import { useState, useEffect } from "react";

import { useQueryData } from "@/hooks/use-qery-data";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "../data-table";

type Candidate = {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
};

export default function CandidateList() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const token = localStorage.getItem("token");
  const router = useRouter();

  const { data } = useQueryData(["get-jobs"], async () => {
    if (!token) return [];
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  });
  console.log(data);
  useEffect(() => {
    // Move localStorage access to useEffect
    const storedToken = localStorage.getItem("token");
    if (!storedToken) router.push("/sign-in");
  }, [router]);
  useEffect(() => {
    if (data) {
      setCandidates(data as Candidate[]);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={candidates} />
    </div>
  );
}
