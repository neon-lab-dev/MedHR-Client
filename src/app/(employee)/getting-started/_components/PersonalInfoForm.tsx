/* eslint-disable react/no-unescaped-entities */
"use client";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

type TGuardianErrors = {
  guardianName?: FieldError;
  phoneNumber?: FieldError;
  occupation?: FieldError;
};

type TPersonalInfoFormProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors & {
    guardian?: TGuardianErrors;
  };
};
const PersonalInfoForm:React.FC<TPersonalInfoFormProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">
        Let's get started
      </h1>
      <TextInput
        label="Full Name"
        placeholder="John Smith"
        error={errors.full_name}
        {...register("full_name", {required : "Full name is required"})}
        isRequired={false}
      />
      <TextInput
        label="Date of Birth"
        type="date"
        error={errors.dob}
        {...register("dob" , {required : "Datre of birth is required"})}
        isRequired={false}
      />
      <div className="flex flex-col md:flex-row items-center gap-5">
        <TextInput
          label="Guardian Name"
          placeholder="Smith John"
          error={errors.guardian?.guardianName}
          {...register("guardian.guardianName", {required : "Guardian name is required"})}
          isRequired={false}
        />
        <TextInput
          label="Guardian Phone Number"
          placeholder="+91 9737328323"
          type="number"
          error={errors.guardian?.phoneNumber}
          {...register("guardian.phoneNumber", {required : "Guardian phone number is required"})}
          isRequired={false}
        />
      </div>
      {/* <DropdownInput
        label="Occupation"
        {...register("guardian.occupation" ,{required : "Occupation is required"})}
        error={errors.guardian?.occupation}
        options={["Teacher", "Engineer", "Other"]}
        isRequired={false}
      /> */}
       <TextInput
          label="Guardian Occupation"
          placeholder="Ex: Teacher, Engineer, Doctor, Farmer"
          error={errors.guardian?.occupation}
          {...register("guardian.occupation" ,{required : "Occupation is required"})}
          isRequired={false}
        />
    </div>
  );
};

export default PersonalInfoForm;
