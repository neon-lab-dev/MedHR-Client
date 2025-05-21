import React, { useState, useEffect } from "react";
import Button from "../Button";
import edit from "../../assets/icons/Edit.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeAuthModal, setAuthModalType } from "@/store/slices/authSlice";
import {
  handleVerifyEmployeeOTPService,
  handleVerifyEmployerOTPService,
} from "@/api/authentication";
import { useRouter } from "next/navigation";

const OTP = ({
  mail,
  handleResendOTP,
  isResendLoading,
}: {
  mail: string;
  handleResendOTP: Function;
  isResendLoading: boolean;
}) => {
  const { activeTab } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [timer, setTimer] = useState(60); // Timer for 60 seconds
  const [isTimerActive, setIsTimerActive] = useState(true); // Track if the timer is active

  // Mutation for verifying the OTP for employee
  const employee = useMutation({
    mutationFn: handleVerifyEmployeeOTPService,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["student-profile"],
        })
        .then(() => {
          router.push("/getting-started");
          dispatch(closeAuthModal());
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  // Mutation for verifying the OTP for employer
  const employer = useMutation({
    mutationFn: handleVerifyEmployerOTPService,
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/employer/getting-started");
      queryClient
        .invalidateQueries({
          queryKey: ["employer-profile"],
        })
        .then(() => {
          
          dispatch(closeAuthModal());
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  // Countdown effect for the timer
  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsTimerActive(false); // Stop the timer when it hits zero
    }
  }, [timer, isTimerActive]);

  // Handle OTP form submission
  const onSubmit = async (data: any) => {
    if (activeTab === "Aspirants") {
      employee.mutate({
        otp: Number(data.otp),
        email: mail,
      });
    } else {
      employer.mutate({
        otp: Number(data.otp),
        email: mail,
      });
    }
  };

  // Handle Resend OTP click and reset the timer
  const handleResendClick = () => {
    handleResendOTP();
    setTimer(60); // Reset timer to 60 seconds
    setIsTimerActive(true); // Start the timer
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="font-plus-jakarta-sans">
        {/* Phone number on which the OTP was sent */}
        <div className="flex gap-1 items-center justify-center">
          <p className="text-neutral-700 font-Poppins text-sm ">
            OTP Has been sent to {mail}
          </p>

          {/* Edit email button */}
          <button
            onClick={() => {
              dispatch(setAuthModalType("SIGNUP"));
            }}
          >
            <Image src={edit} alt="edit-button" />
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-8">
          {/* OTP Input */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="otp"
              className="text-neutral-700 text-base font-medium text-start"
            >
              Enter the OTP to verify
            </label>
            <input
              {...register("otp", {
                required: "Enter the OTP!",
              })}
              name="otp"
              placeholder="Enter OTP"
              type="number"
              className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
            />
            {errors.otp && (
              <span className="text-primary-500 text-start">
                {errors.otp.message as string}
              </span>
            )}
          </div>
        </div>

        <Button className="w-full mt-5" variant="primary">
          {employee.isPending || employer.isPending
            ? "Loading..."
            : "Verify OTP"}
        </Button>

        <button
          type="button"
          className="text-primary-500 mt-5"
          onClick={handleResendClick}
          disabled={timer > 0 || isResendLoading} // Disable button while the timer is active or OTP is loading
        >
          {isResendLoading
            ? "Sending OTP Resquest"
            : timer > 0
            ? `Resend OTP in ${timer}s`
            : "Resend OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTP;
