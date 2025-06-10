

"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Link from "next/link";
import downArrow from "../../assets/icons/down-arrow.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setAuthModalType } from "@/store/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import {
  handleEmployeeSignupService,
  handleEmployerSignupService,
} from "@/api/authentication";
import OTP from "./OTP";

const Signup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { activeTab, authModalType } = useAppSelector((state) => state.auth);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const countryCodes: string[] = [
    "+91", // India
    "+93", // Afghanistan
    "+355", // Albania
    "+213", // Algeria
    "+1-684", // American Samoa
    "+376", // Andorra
    "+244", // Angola
    "+1-264", // Anguilla
    "+1-268", // Antigua and Barbuda
    "+54", // Argentina
    "+374", // Armenia
    "+297", // Aruba
    "+61", // Australia
    "+43", // Austria
    "+994", // Azerbaijan
    "+1-242", // Bahamas
    "+973", // Bahrain
    "+880", // Bangladesh
    "+1-246", // Barbados
    "+375", // Belarus
    "+32", // Belgium
    "+501", // Belize
    "+229", // Benin
    "+1-441", // Bermuda
    "+975", // Bhutan
    "+591", // Bolivia
    "+387", // Bosnia and Herzegovina
    "+267", // Botswana
    "+55", // Brazil
    "+1-284", // British Virgin Islands
    "+673", // Brunei
    "+359", // Bulgaria
    "+226", // Burkina Faso
    "+257", // Burundi
    "+855", // Cambodia
    "+237", // Cameroon
    "+1", // Canada
    "+238", // Cape Verde
    "+1-345", // Cayman Islands
    "+236", // Central African Republic
    "+235", // Chad
    "+56", // Chile
    "+86", // China
    "+61", // Christmas Island
    "+61", // Cocos (Keeling) Islands
    "+57", // Colombia
    "+269", // Comoros
    "+682", // Cook Islands
    "+506", // Costa Rica
    "+385", // Croatia
    "+53", // Cuba
    "+599", // Curaçao
    "+357", // Cyprus
    "+420", // Czech Republic
    "+243", // Democratic Republic of the Congo
    "+45", // Denmark
    "+253", // Djibouti
    "+1-767", // Dominica
    "+1-809 and 1-829", // Dominican Republic
    "+593", // Ecuador
    "+20", // Egypt
    "+503", // El Salvador
    "+240", // Equatorial Guinea
    "+291", // Eritrea
    "+372", // Estonia
    "+251", // Ethiopia
    "+500", // Falkland Islands
    "+298", // Faroe Islands
    "+679", // Fiji
    "+358", // Finland
    "+33", // France
    "+594", // French Guiana
    "+689", // French Polynesia
    "+241", // Gabon
    "+220", // Gambia
    "+995", // Georgia
    "+49", // Germany
    "+233", // Ghana
    "+350", // Gibraltar
    "+30", // Greece
    "+299", // Greenland
    "+1-473", // Grenada
    "+590", // Guadeloupe
    "+1-671", // Guam
    "+502", // Guatemala
    "+224", // Guinea
    "+245", // Guinea-Bissau
    "+592", // Guyana
    "+509", // Haiti
    "+504", // Honduras
    "+852", // Hong Kong
    "+36", // Hungary
    "+354", // Iceland
    "+62", // Indonesia
    "+98", // Iran
    "+964", // Iraq
    "+353", // Ireland
    "+972", // Israel
    "+39", // Italy
    "+1-876", // Jamaica
    "+81", // Japan
    "+962", // Jordan
    "+7", // Kazakhstan
    "+254", // Kenya
    "+686", // Kiribati
    "+850", // North Korea
    "+82", // South Korea
    "+965", // Kuwait
    "+996", // Kyrgyzstan
    "+856", // Laos
    "+371", // Latvia
    "+961", // Lebanon
    "+266", // Lesotho
    "+231", // Liberia
    "+218", // Libya
    "+423", // Liechtenstein
    "+370", // Lithuania
    "+352", // Luxembourg
    "+853", // Macau
    "+389", // Macedonia
    "+261", // Madagascar
    "+265", // Malawi
    "+60", // Malaysia
    "+960", // Maldives
    "+223", // Mali
    "+356", // Malta
    "+692", // Marshall Islands
    "+596", // Martinique
    "+222", // Mauritania
    "+230", // Mauritius
    "+262", // Mayotte
    "+52", // Mexico
    "+691", // Micronesia
    "+373", // Moldova
    "+377", // Monaco
    "+976", // Mongolia
    "+382", // Montenegro
    "+1-664", // Montserrat
    "+212", // Morocco
    "+258", // Mozambique
    "+95", // Myanmar (Burma)
    "+264", // Namibia
    "+674", // Nauru
    "+977", // Nepal
    "+31", // Netherlands
    "+599", // Netherlands Antilles
    "+687", // New Caledonia
    "+64", // New Zealand
    "+505", // Nicaragua
    "+227", // Niger
    "+234", // Nigeria
    "+683", // Niue
    "+672", // Norfolk Island
    "+1-670", // Northern Mariana Islands
    "+47", // Norway
    "+968", // Oman
    "+92", // Pakistan
    "+680", // Palau
    "+970", // Palestine
    "+507", // Panama
    "+675", // Papua New Guinea
    "+595", // Paraguay
    "+51", // Peru
    "+63", // Philippines
    "+48", // Poland
    "+351", // Portugal
    "+974", // Qatar
    "+242", // Republic of the Congo
    "+40", // Romania
    "+7", // Russia
    "+250", // Rwanda
    "+590", // Réunion
    "+685", // Samoa
    "+378", // San Marino
    "+239", // São Tomé and Príncipe
    "+966", // Saudi Arabia
    "+221", // Senegal
    "+381", // Serbia
    "+248", // Seychelles
    "+232", // Sierra Leone
    "+65", // Singapore
    "+421", // Slovakia
    "+386", // Slovenia
    "+677", // Solomon Islands
    "+252", // Somalia
    "+27", // South Africa
    "+211", // South Sudan
    "+34", // Spain
    "+94", // Sri Lanka
    "+249", // Sudan
    "+597", // Suriname
    "+268", // Swaziland
    "+46", // Sweden
    "+41", // Switzerland
    "+963", // Syria
    "+886", // Taiwan
    "+992", // Tajikistan
    "+255", // Tanzania
    "+66", // Thailand
    "+690", // Tokelau
    "+676", // Tonga
    "+1-868", // Trinidad and Tobago
    "+216", // Tunisia
    "+90", // Turkey
    "+993", // Turkmenistan
    "+1-649", // Turks and Caicos Islands
    "+688", // Tuvalu
    "+256", // Uganda
    "+380", // Ukraine
    "+971", // United Arab Emirates
    "+44", // United Kingdom
    "+1", // United States
    "+598", // Uruguay
    "+998", // Uzbekistan
    "+678", // Vanuatu
    "+379", // Vatican City
    "+58", // Venezuela
    "+84", // Vietnam
    "+681", // Wallis and Futuna
    "+967", // Yemen
    "+260", // Zambia
    "+263", // Zimbabwe
  ];
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const [countryCode, setCountryCode] = useState("+91");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const employee = useMutation({
    mutationFn: handleEmployeeSignupService,
    onSuccess: (msg) => {
      toast.success(msg);
      dispatch(setAuthModalType("OTP"));
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const employer = useMutation({
    mutationFn: handleEmployerSignupService,
    onSuccess: (msg) => {
      toast.success(msg);
      dispatch(setAuthModalType("OTP"));
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit = async (data: any) => {
    setData(data);
    if (activeTab === "Aspirants") {
      employee.mutate(data);
    } else {
      employer.mutate(data);
    }
  };

  if (authModalType === "OTP") {
    return (
      <OTP
        mail={data.email}
        handleResendOTP={() => {
          onSubmit(data);
        }}
        isResendLoading={employee.isPending || employer.isPending}
      />
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-plus-jakarta-sans"
      >
        <div className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="full_name"
              className="text-neutral-700 text-base font-medium text-start"
            >
              Full Name*
            </label>
            <input
              {...register("full_name", { required: "Name is required" })}
              placeholder="John Doe"
              type="text"
              className="p-4 rounded-xl border-[1px] border-neutral-300 focus:outline-none"
            />
            {errors.full_name && (
              <span className="text-primary-500 text-start">
                {errors.full_name.message as string}
              </span>
            )}
          </div>

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

          {/* Mobile Number */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="mobilenumber"
              className="text-neutral-700 text-base font-medium text-start"
            >
              Mobile Number*
            </label>
            <div className="p-4 rounded-xl border-[1px]  border-neutral-300 focus:outline-none flex gap-[10px]">
              <div ref={dropDownRef} className="relative">
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex cursor-pointer"
                >
                  {countryCode}
                  <Image src={downArrow} alt="down-arrow" />
                </div>
                <ul
                  className={`cursor-pointer bg-white flex flex-col gap-4 w-20! h-56 overflow-scroll ml-2 rounded ${
                    open ? "visible shadow-2xl" : "invisible"
                  } absolute -left-6 top-10 z-50 w-full space-y-1 py-2`}
                >
                  {countryCodes.map((code, index) => (
                    <li
                      onClick={() => {
                        setCountryCode(code);
                        setOpen(false);
                      }}
                      key={index}
                    >
                      {code}
                    </li>
                  ))}
                </ul>
              </div>
              <input
                {...register("mobilenumber", {
                  required: "Phone number is required",
                })}
                placeholder="Enter Mobile Number"
                type="text"
                className="focus:outline-none w-full"
              />
            </div>
            {errors.mobilenumber && (
              <span className="text-primary-500 text-start">
                {errors.mobilenumber.message as string}
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="confirmPassword"
              className="text-neutral-700 text-base font-medium text-start"
            >
              Confirm Password*
            </label>
            <input
              {...register("confirm_password", {
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
            {errors.confirm_password && (
              <span className="text-primary-500 text-start">
                {errors.confirm_password.message as string}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs  text-neutral-700 text-start mt-5">
          By signing up, you agree to our{" "}
          <Link href={""} className="text-primary-500">
            Terms and Conditions.
          </Link>
        </p>

        <Button className="w-full mt-5" variant="primary">
          {employee.isPending || employer.isPending ? "Loading..." : "Get OTP"}
        </Button>

        <p className="text-neutral-700 text-sm  text-center mt-8">
          Already registered?{" "}
          <button
            onClick={() => {
              dispatch(setAuthModalType("LOGIN"));
            }}
            className="text-primary-500 cursor-pointer"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
