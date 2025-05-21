"use client";

import { handleAdminLoginService } from "@/api/authentication";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { mutate, isPending } = useMutation({
    mutationFn: handleAdminLoginService,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["admin-profile"],
        })
        .finally(() => {
          router.push("/admin/");
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate(data);
  };
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <div className="bg-white shadow-md p-12 rounded-md flex flex-col gap-6">
        <div>
          <h1 className=" text-secondary-800 text-[28px] font-bold text-center">
            <span className="highlight">Login</span>
            <span className="ml-2">to MeDHr</span>
          </h1>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-[6px]">
                <label
                  htmlFor="email"
                  className="text-neutral-700 text-base font-medium text-start"
                >
                  Email*
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  name="email"
                  placeholder="john@doe.com"
                  type="email"
                  className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
                />
                {errors.email && (
                  <span className="text-primary-500 text-start">
                    {errors.email.message as string}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[6px]">
                <label
                  htmlFor="password"
                  className="text-neutral-700 text-base font-medium text-start"
                >
                  Password*
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  name="password"
                  placeholder="Must be at least 6 Characters"
                  type="password"
                  className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
                />
                {errors.password && (
                  <span className="text-primary-500 text-start">
                    {errors.password.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* <div className="flex justify-end mt-[6px]">
    <p
      className="text-primary-500 text-sm font-medium cursor-pointer"
    >
      Forgot Password?
    </p>
  </div> */}

            <Button className="w-full mt-5" variant="primary">
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
