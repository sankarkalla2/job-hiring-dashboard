"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<keyof Candidate>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const token = localStorage.getItem("token");
  const router = useRouter();

  const { data } = useQueryData(
    ["get-jobs"],
    async () =>
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
  );
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
      {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>
                  <Select
                    value={candidate.status}
                    onValueChange={(value) =>
                      handleStatusChange(
                        candidate.id,
                        value as Candidate["status"]
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(candidate.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      <DataTable columns={columns} data={candidates} />
    </div>
  );
}
