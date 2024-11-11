"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useZodForm from "@/hooks/use-zod-form";
import { userSchema } from "./user.schema";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/global/form-generator";
import { useRouter } from "next/navigation";
import { useMutationData } from "@/hooks/use-mutation-data";
import { useAuthContextHook } from "@/context/useAuthContext";

export default function AddCandidateForm() {
  const { register, errors, handleSubmit, reset } = useZodForm(userSchema);
  const router = useRouter();
  const { setToken } = useAuthContextHook();
  const { mutate, isPending } = useMutationData(
    ["post-job"],
    (data: { name: string; email: string; token: string }) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      }),
    ["get-jobs"]
  );

  const onSubmit = async (value: z.infer<typeof userSchema>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/sign-in");

      setToken(token);
      mutate({ name: value.name, email: value.email, token });
      reset();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="">
        <FormGenerator
          inputType="input"
          label="Name"
          placeholder="Enter your name"
          register={register}
          name="name"
          errors={errors}
        />
      </div>
      <div>
        <FormGenerator
          inputType="input"
          label="Email"
          placeholder="Enter your email"
          register={register}
          name="email"
          errors={errors}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Candidate"}
      </Button>
    </form>
  );
}
