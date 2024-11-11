"use client";

import useZodForm from "@/hooks/use-zod-form";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import FormGenerator from "@/components/global/form-generator";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginSchema } from "./login.schema";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useZodForm(LoginSchema);
  const onSubmit = handleSubmit(async (data: z.infer<typeof LoginSchema>) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData.token);
      localStorage.setItem("token", responseData.token);
      return router.push("/");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Registration failed");
    }
  });
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 min-w-[350px] mx-auto p-4 bg-white rounded-xl shadow-md"
    >
      <div className="font-bold text-2xl">Login</div>
      <div className="flex flex-col gap-4">
        <FormGenerator
          name="email"
          register={register}
          placeholder="Enter your email"
          inputType="input"
          errors={errors}
        />
        <FormGenerator
          name="password"
          register={register}
          placeholder="Enter your password"
          inputType="input"
          errors={errors}
        />
      </div>
      <Button type="submit">Submit</Button>
      <Link href="/register" className="hover:text-blue-500 hover:underline">Register</Link>
    </form>
  );
}
