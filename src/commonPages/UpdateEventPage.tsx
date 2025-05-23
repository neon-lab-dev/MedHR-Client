/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/api/events";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";
import api from "@/api";

type EventFormValues = {
  eventName: string;
  date: string;
  time: string;
  companyName: string;
  companyLocation: string;
  eventUrl: string;
  skillCovered: string[];
  image: FileList;
};

const UpdateEventPage = ({ id, navigateRoute }: { id: string, navigateRoute: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>();

  const { isLoading, data: event } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
  });

  const [isEditExpanded, setIsEditExpanded] = useState<boolean>(false);
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    event?.data?.skillCovered
  );

  useEffect(() => {
    if (event?.data) {
      setValue("eventName", event?.data?.eventName);
      setValue("date", event?.data?.date);
      setValue("time", event?.data?.time);
      setValue("eventUrl", event?.data?.eventUrl);
      setValue("companyName", event?.data?.company?.companyName);
      setValue("companyLocation", event?.data?.company?.companyLocation);
      setSelectedSkills(event?.data?.skillCovered);
    }
  }, [event, setValue, setSelectedSkills]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(skillInput.trim())) {
        const updatedSkills = [...selectedSkills, skillInput.trim()];
        setSelectedSkills(updatedSkills);
        setValue("skillCovered", updatedSkills);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
    setValue("skillCovered", updatedSkills);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmitEvent = async (data: EventFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("eventUrl", data.eventUrl);
    formData.append("companyName", data.companyName);
    formData.append("companyLocation", data.companyLocation);
    formData.append("skillCovered", JSON.stringify(selectedSkills));
    if (data.image?.[0]) {
      formData.append("file", data.image[0]);
    }

    try {
      await axios.put(
        `${api.updateEvent}/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Event updated successfully!");
      router.push(navigateRoute);
    } catch (error) {
      console.error("Failed to update event:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading className="h-[60vh] w-full" />;
  if (!event?.data) return <NotFound />;

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 max-w-[800px] w-full mx-auto"
      onSubmit={handleSubmit(onSubmitEvent)}
    >
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
        label="Company Name"
        placeholder="Enter company name"
        error={errors.companyName}
        {...register("companyName", { required: "Company name is required" })}
      />

      <TextInput
        label="Company Location"
        placeholder="Enter company location"
        error={errors.companyLocation}
        {...register("companyLocation", {
          required: "Company location is required",
        })}
      />

      <TextInput
          label="Event Link/URL"
          placeholder="Enter your event link"
          error={errors.eventUrl}
          {...register("eventUrl", {
            required: "Event link is required",
          })}
        />

      <div className="w-full">
        <label className="font-semibold text-sm mb-1 block">
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
          {selectedSkills?.map((skill, index) => (
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
        <input type="hidden" {...register("skillCovered")} />
      </div>

      {isEditExpanded ? (
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">
            Upload New Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="mt-1"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
      ) : (
        <div>
          {event?.data?.image?.url ? (
            <div className="relative w-[400px] h-[384px]">
              <img
                src={event?.data?.image?.url}
                className="object-cover h-full w-full"
                alt={event?.data?.image?.name}
              />
              <div
                onClick={() => setIsEditExpanded(!isEditExpanded)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg absolute top-2 right-2 cursor-pointer"
              >
                Edit
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <button
        type="submit"
        className="bg-primary-600 text-white px-4 py-3 rounded-md flex items-center justify-center cursor-pointer"
      >
        {isSubmitting ? (
          <Oval height="25" width="25" color="white" strokeWidth="5" />
        ) : (
          "Update Event"
        )}
      </button>
    </form>
  );
};

export default UpdateEventPage;
