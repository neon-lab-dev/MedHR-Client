"use client";

import { useForm, UseFormRegister } from "react-hook-form";
import Button from "@/components/Button";
import React from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";

type EditableAccordionFormProps = {
  defaultValues: Record<string, any>;
  editableFields: string[];
  onSubmit: any;
  fieldLabels?: Record<string, string>;
  isLoading?: boolean;
  customFieldRenderers?: {
    [key: string]: (
      register: UseFormRegister<any>,
      errors: any
    ) => React.ReactNode;
  };
};

const EditableAccordionForm: React.FC<EditableAccordionFormProps> = ({
  defaultValues,
  editableFields,
  onSubmit,
  isLoading,
  fieldLabels = {},
  customFieldRenderers = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const submitHandler = (data: Record<string, any>) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4"
    >
      {editableFields.map((field) =>
        customFieldRenderers[field] ? (
          <React.Fragment key={field}>
            {/* This is where your SelectDropdownInput or any custom input renders */}
            {customFieldRenderers[field](register, errors)}
          </React.Fragment>
        ) : (
          <TextInput
            key={field}
            label={fieldLabels[field] || field}
            placeholder={`Enter ${field}`}
            error={errors[field]}
            {...register(field)}
          />
        )
      )}

      <div className="flex justify-end">
        <Button variant="normal" className="w-auto px-5 py-3 rounded-lg md:w-[150px]">
          {
            isLoading ? "Saving..." : "Save Changes"
          }
        </Button>
      </div>
    </form>
  );
};

export default EditableAccordionForm;
