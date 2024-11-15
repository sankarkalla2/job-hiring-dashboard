"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContextHook } from "@/context/useAuthContext";
import { useMutationData } from "@/hooks/use-mutation-data";
import { useQueryData } from "@/hooks/use-qery-data";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const router = useRouter();
      const status = row.original.status;
      const [token, setToken] = useState<string | null>(null);

      useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          router.push("/sign-in");
        } else {
          setToken(storedToken);
        }
      }, [router]);

      const { mutate } = useMutationData(
        ["update-job"],
        async (value: string) => {
          if (!token) return;
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/jobs/${row.original.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: value }),
            }
          );
        },
        ["get-jobs"]
      );

      if (!token) return null;

      return (
        <Select
          value={status}
          onValueChange={(value) => {
            mutate(value);
          }}
        >
          <SelectTrigger className="w-[140px]" defaultValue={status}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">In Progress</SelectItem>
            <SelectItem value="REJECTED">Completed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDistanceToNow(row.original.createdAt)}</div>;
    },
  },
];
