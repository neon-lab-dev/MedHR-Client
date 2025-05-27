"use client";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import SelectDropdownInput from "@/components/Reusable/SelectDropdownInput/SelectDropdownInput";
import { departments } from "@/mockData/departments";

type TCreateEventFormValues = {
  eventName: string;
  date: string;
  time: string;
  companyName: string;
  companyLocation: string;
  skillCovered: string;
  eventUrl: string;
  department: string;
  organizationType: string;
  organizerName: string;
  image: FileList;
};

const CreateEvent = ({ navigateRoute }: { navigateRoute: string }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TCreateEventFormValues>();

  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;

    const normalizedSkill = skill.trim().toLowerCase();
    if (selectedSkills.includes(normalizedSkill)) return;

    const updated = [...selectedSkills, normalizedSkill];
    setSelectedSkills(updated);
    setValue("skillCovered", updated.join(","));
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updated);
    setValue("skillCovered", updated.join(","));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(skillInput);
    }
  };

  // Function to create event
  const createEventMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(api.createEvent, data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      reset();
      setSelectedSkills([]);
    },
    onError: () => {
      toast.error("Failed to create event.");
    },
  });

  const onSubmitEvent = (data: TCreateEventFormValues) => {
    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("eventUrl", data.eventUrl);
    formData.append("organizerName", data.organizerName);
    formData.append("organizationType", data.organizationType);
    formData.append("department", data.department);

    const company = {
      companyName: data.companyName,
      companyLocation: data.companyLocation,
    };
    formData.append("company", JSON.stringify(company));
    formData.append("skillCovered", JSON.stringify(selectedSkills));
    formData.append("file", data.image[0]);

    toast
      .promise(createEventMutation.mutateAsync(formData), {
        loading: "Creating event...",
        success: "Event created successfully!",
        error: "Failed to create event.",
      })
      .unwrap()
      .then(() => {
        router.push(navigateRoute);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  const typeOfOrganizations = [
    "Allopathy Hospital",
    "Allopathy Clinic",
    "Ayurveda Hospital",
    "Ayurveda Clinic",
    "Homeopathy Hospital",
    "Homeopathy Clinic",
    "Nursing Home",
    "Diagnostic Centers",
    "Imaging Centers",
    "Educational Institution",
  ];

  return (
    <div className="bg-neutral-450 p-6 flex flex-col gap-[51px]">
      <form
        className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
        onSubmit={handleSubmit(onSubmitEvent)}
      >
        <h3 className="text-xl font-semibold">Create Event</h3>
        <TextInput
          label="Event Name"
          placeholder="Enter event name"
          error={errors.eventName}
          {...register("eventName", { required: "Event name is required" })}
        />

        <TextInput
          label="Date"
          type="date"
          error={errors.date}
          {...register("date", { required: "Date is required" })}
        />

        <TextInput
          label="Time"
          type="text"
          placeholder="Ex: 10:00 AM"
          error={errors.time}
          {...register("time", { required: "Time is required" })}
        />

        <TextInput
          label="Name of Organization"
          placeholder="Enter organization name"
          error={errors.companyName}
          {...register("companyName", {
            required: "Organization name is required",
          })}
        />

        <TextInput
          label="Organization Location"
          placeholder="Enter organization location"
          error={errors.companyLocation}
          {...register("companyLocation", {
            required: "Organization location is required",
          })}
        />

        <TextInput
          label="Name of Organizer"
          placeholder="Enter company name"
          error={errors.organizerName}
          {...register("organizerName", {
            required: "Organizer name is required",
          })}
        />

        <SelectDropdownInput
          label="Type of Organization"
          {...register("organizationType")}
          error={errors?.organizationType}
          options={typeOfOrganizations}
          // onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          //   handleBankInfoChange(e, "accType")
          // }
          isRequired={false}
        />

        <SelectDropdownInput
          label="Department"
          {...register("department")}
          error={errors?.department}
          options={departments}
          // onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          //   handleBankInfoChange(e, "accType")
          // }
          isRequired={false}
        />

        <TextInput
          label="Event Link/URL"
          placeholder="Enter your event link"
          error={errors.eventUrl}
          {...register("eventUrl", {
            required: "Event link is required",
          })}
        />

        {/* ✅ Skill Input Section */}
        <div className="w-full">
          <label className="text-neutral-700 font-medium font-plus-jakarta-sans">
            Skills Covered
          </label>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="pl-4 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition duration-300 w-full"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedSkills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm capitalize"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {/* Hidden input for React Hook Form */}
          <input type="hidden" {...register("skillCovered")} />
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-1">
          <label className="text-neutral-700 font-medium font-plus-jakarta-sans">
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Event image is required" })}
            className="pl-4 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition duration-300 w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-3 rounded-md cursor-pointer"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
