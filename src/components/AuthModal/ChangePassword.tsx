"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleResetPasswordService } from "@/api/authentication";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ChangePassword = ({ token }: { token: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResetPasswordService,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["student-profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["employer-profile"],
      });

      router.push("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const handleChangePassword = async (data: any) => {
    mutate({
      ...data,
      token,
    });
  };

  const password = watch("password");

  return (
    <div className="mt-32">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <div className="flex flex-col gap-5">
          {/* New Password */}

          {/* New Password* */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="password"
              className="text-neutral-700 text-base font-medium text-start"
            >
              New Password*
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be greater than 8 characters",
                },
              })}
              placeholder="Password must be greater than 8 characters"
              type="password"
              className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
            />
            {errors.password && (
              <span className="text-primary-500 text-start">
                {errors.password.message as string}
              </span>
            )}
          </div>

          {/* Confirm New Password* */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="confirmPassword"
              className="text-neutral-700 text-base font-medium text-start"
            >
              Confirm New Password*
            </label>
            <input
              {...register("confirmPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password Password must be greater than 8 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Password must be greater than 8 characters"
              type="password"
              className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
            />
            {errors.confirmPassword && (
              <span className="text-primary-500 text-start">
                {errors.confirmPassword.message as string}
              </span>
            )}
          </div>
        </div>

        <Button className="w-full mt-5" variant="primary">
          {isPending ? "Changing Password..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
