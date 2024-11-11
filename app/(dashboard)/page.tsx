"use client";

import AddCandidateForm from "@/components/forms/add-new-candidate";
import Modal from "@/components/global/modal";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CandidateListClient = dynamic(
  () => import('@/components/global/tracking-dashboard'),
  { ssr: false }
)

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6 md:px-8 lg:px-20">
      <header className="">
        <h1 className="text-3xl font-bold">Assessment Tracking Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and track candidate assessments
        </p>
      </header>
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>
          <Modal
            trigger={<Button>Add Candidate</Button>}
            title="Add New Candidate"
            description="Add a new candidate to the list"
          >
            <AddCandidateForm />
          </Modal>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Candidate List</h2>
          {/* <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <CandidateList />
          </Suspense> */}
          <CandidateListClient />
        </div>
      </div>
    </div>
  );
}
