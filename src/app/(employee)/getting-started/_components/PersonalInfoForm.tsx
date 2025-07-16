/* eslint-disable react/no-unescaped-entities */
"use client";
import SelectDropdownInput from "@/components/Reusable/SelectDropdownInput/SelectDropdownInput";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

type TGuardianErrors = {
  guardianName?: FieldError;
  phoneNumber?: FieldError;
  occupation?: FieldError;
  countryCode?: FieldError;
};

type TPersonalInfoFormProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors & {
    guardian?: TGuardianErrors;
  };
};

const countryCodes = [
  { label: "India (+91)", value: "+91" },
  { label: "Canada (+1)", value: "+1" },
  { label: "Germany (+49)", value: "+49" },
];

const PersonalInfoForm: React.FC<TPersonalInfoFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Let's get started</h1>

      <TextInput
        label="Full Name"
        placeholder="John Smith"
        error={errors.full_name}
        {...register("full_name", { required: "Full name is required" })}
        isRequired={false}
      />

      <TextInput
        label="Date of Birth"
        type="date"
        error={errors.dob}
        {...register("dob", { required: "Date of birth is required" })}
        isRequired={false}
      />

      <SelectDropdownInput
        label="Designation"
        {...register("designation", { required: "Designation is required" })}
        error={errors?.designation}
        options={["Student", "Working Professional"]}
      />

      <div className="flex flex-col items-center gap-5">
        <TextInput
          label="Guardian Name"
          placeholder="Smith John"
          error={errors.guardian?.guardianName}
          {...register("guardian.guardianName", {
            required: "Guardian name is required",
          })}
          isRequired={false}
        />

        <div className="w-full">
          <label className="mb-1 block font-plus-jakarta-sans font-medium text-gray-700">
            Guardian Phone Number
          </label>
          <div className="flex gap-2">
            <select
              className="w-[40%] sm:w-fit text-[10px] sm:text-base px-4 py-3 rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-primary-500 transition duration-300 cursor-pointer"
              {...register("guardian.countryCode", {
                required: "Country code is required",
              })}
              defaultValue="+91"
            >
              {countryCodes.map((code) => (
                <option key={code.value} value={code.value} className="cursor-pointer">
                  {code.label}
                </option>
              ))}
            </select>

            <div className="w-[60%] sm:w-full">
              <TextInput
              placeholder="Enter your guardian phone number"
              type="number"
              error={errors.guardian?.phoneNumber}
              {...register("guardian.phoneNumber", {
                required: "Guardian phone number is required",
              })}
              isRequired={false}
            />
            </div>
          </div>
        </div>
      </div>

      <TextInput
        label="Guardian Occupation"
        placeholder="Ex: Teacher, Engineer, Doctor, Farmer"
        error={errors.guardian?.occupation}
        {...register("guardian.occupation", {
          required: "Occupation is required",
        })}
        isRequired={false}
      />
    </div>
  );
};

export default PersonalInfoForm;
