import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeAuthModal, setAuthModalType } from "@/store/slices/authSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleEmployeeLoginService,
  handleEmployerLoginService,
} from "@/api/authentication";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { activeTab } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: employeeMutate, isPending: isEmployeePending } = useMutation({
    mutationFn: handleEmployeeLoginService,
    onSuccess: (data) => {
      console.log(data);

      // ✅ Set token in cookies
      if (data?.accessToken) {
        Cookies.set("employee_auth_token", data.accessToken, {
          expires: 7, // Days until expiration
          secure: true,
          sameSite: "Strict", // Or "Lax" / "None" if cross-site
        });
      }

      toast.success(data?.message ?? "Login successful");
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
      dispatch(closeAuthModal());
      window.location.reload();
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const { mutate: employerMutate, isPending: isEmployerPending } = useMutation({
    mutationFn: handleEmployerLoginService,
    onSuccess: (data) => {
      // ✅ Set employer token in cookie
      if (data?.accessToken) {
        Cookies.set("employeer_auth_token", data.accessToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }

      toast.success(data?.message ?? "Login successful");

      // ✅ Invalidate and then force reload navigation
      queryClient
        .invalidateQueries({ queryKey: ["employer-profile"] })
        .then(() => {
          dispatch(closeAuthModal());
          window.location.href = "/employer/";
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit = async (data: any) => {
    if (activeTab === "Aspirants") {
      employeeMutate(data);
    } else {
      employerMutate(data);
    }
  };

  return (
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

        <div className="flex justify-end mt-[6px]">
          <p
            onClick={() => {
              dispatch(setAuthModalType("FORGOT_PASSWORD"));
            }}
            className="text-primary-500 text-sm font-medium cursor-pointer"
          >
            Forgot Password?
          </p>
        </div>

        <Button
          disabled={isEmployeePending || isEmployerPending}
          className="w-full mt-5"
          variant="primary"
        >
          {isEmployeePending || isEmployerPending ? "Loading..." : "Login"}
        </Button>

        <p className="text-neutral-700 text-sm  text-center mt-8">
          New to MeDHr?{" "}
          <button
            onClick={() => {
              dispatch(setAuthModalType("SIGNUP"));
            }}
            className="text-primary-500 cursor-pointer"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
