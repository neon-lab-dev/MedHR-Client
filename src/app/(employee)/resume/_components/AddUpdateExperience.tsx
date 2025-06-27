"use client";

import { useState, useEffect } from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import Button from "@/components/Button";
import { TWorkExperience } from "@/app/(employee)/getting-started/page";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";

interface AddUpdateExperienceProps {
  initialData?: TWorkExperience;
  onSubmit: (data: TWorkExperience) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddUpdateExperience = ({
  initialData,
  onSubmit,
}: AddUpdateExperienceProps) => {
  const [formData, setFormData] = useState<TWorkExperience>({
    designation: "",
    companyName: "",
    companyLocation: "",
    description: "",
    projectLinks: [],
    workType: "",
    startDate: "",
    endDate: "",
    ...initialData,
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialData?.projectLinks) {
      setFormData((prev) => ({
        ...prev,
        projectLinks: initialData.projectLinks || [],
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!formData.projectLinks?.includes(inputValue.trim())) {
        setFormData((prev) => ({
          ...prev,
          projectLinks: [...(prev.projectLinks || []), inputValue.trim()],
        }));
      }
      setInputValue("");
    }
  };

  const handleRemoveLink = (link: string) => {
    setFormData((prev) => ({
      ...prev,
      projectLinks: prev.projectLinks?.filter((l) => l !== link) || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const workTypes = ["Full Time", "Part Time", "Internship"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextInput
        label="Designation"
        name="designation"
        value={formData.designation || ""}
        onChange={handleChange}
        isRequired
      />
      <TextInput
        label="Company Name"
        name="companyName"
        value={formData.companyName || ""}
        onChange={handleChange}
        isRequired
      />
      <TextInput
        label="Company Location"
        name="companyLocation"
        value={formData.companyLocation || ""}
        onChange={handleChange}
      />
      <DropdownInput
        label="Work Type"
        options={workTypes}
        isRequired={false}
        value={formData.workType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFormData((prev) => ({ ...prev, workType: e.target.value }))
        }
      />
      <TextInput
        label="Start Date"
        name="startDate"
        type="month"
        value={formData.startDate || ""}
        onChange={handleChange}
      />
      <TextInput
        label="End Date"
        name="endDate"
        type="month"
        value={formData.endDate || ""}
        onChange={handleChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        rows={4}
        cols={50}
      />

      <div>
        <TextInput
          label="Project Links"
          placeholder="Add link and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          isRequired={false}
        />
        {formData.projectLinks && formData.projectLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.projectLinks.map((link) => (
              <div
                key={link}
                className="bg-neutral-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
              >
                {link}
                <button
                  type="button"
                  onClick={() => handleRemoveLink(link)}
                  className="text-red-500 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" variant="normal" className="w-auto px-5 py-3 rounded-lg md:w-[190px]">
          {initialData ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
};

export default AddUpdateExperience;
