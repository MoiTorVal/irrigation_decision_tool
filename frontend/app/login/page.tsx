"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { login } from "../lib/api";
import { LoginFormSchema, type LoginFormValues } from "../lib/validators";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
  });

  async function onValid(values: LoginFormValues) {
    setServerError(null);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 rounded-2xl border border-white/10 px-10 py-10">
          <form
            onSubmit={handleSubmit(onValid)}
            noValidate
            className="flex flex-col gap-5"
          >
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-btn-secondary hover:bg-white disabled:opacity-50 text-btn-text font-semibold py-3 rounded-lg"
            >
              {isSubmitting ? <Spinner /> : "Log In"}
            </button>
            {serverError && (
              <p role="alert" className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
