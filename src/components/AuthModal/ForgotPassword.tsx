import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleSendResetPasswordEmailService } from "@/api/authentication";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import ConfirmationEmail from "./ConfirmationEmail";
import { setAuthModalType } from "@/store/slices/authSlice";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authModalType } = useAppSelector((state) => state.auth);
  const [confirmationEmail, setConfirmationEmail] = useState<string>(
    "" as string
  );
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { email: string }) => {
      return handleSendResetPasswordEmailService(data);
    },
    onSuccess: () => {
      dispatch(setAuthModalType("CONFIRMATION_EMAIL"));
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
    onSettled: () => {},
  });

  const onSubmit = async (data: any) => {
    setConfirmationEmail(data.email);
    mutate(data);
  };

  if (authModalType === "CONFIRMATION_EMAIL") {
    return <ConfirmationEmail mail={confirmationEmail} />;
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[6px]"
      >
        <label
          htmlFor="email"
          className="text-neutral-700 text-base font-medium text-start"
        >
          Enter Registered Email ID
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

        <Button className="w-full mt-5" variant="primary">
          {isPending ? "Sending Email..." : "Send Confirmation Email"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
