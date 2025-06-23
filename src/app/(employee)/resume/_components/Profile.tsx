/* eslint-disable @next/next/no-img-element */
"use client";
import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { uploadResume } from "@/api/employee";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/api/axiosInstance";

interface ProfileProps {
  avatarUrl?: string;
  fullName: string;
  institutionName: string;
  resumeUrl: string;
}

interface ProfileUpdateData {
  avatarUrl?: string;
  fullName: string;
  institutionName: string;
}

// Update profile function with FormData
const updateProfile = async (data: FormData): Promise<void> => {
  await axiosInstance.put("/me/update", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const Profile: React.FC<ProfileProps> = ({
  avatarUrl,
  fullName,
  institutionName,
  resumeUrl,
}) => {
  const [formData, setFormData] = useState<ProfileUpdateData>({
    avatarUrl: "",
    fullName: "",
    institutionName: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // Track the file separately
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutationOptions: UseMutationOptions<void, Error, FormData> = {
    mutationFn: updateProfile,
    onSuccess: () => {
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  };

  const updateProfileMutation = useMutation(mutationOptions);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatarUrl" && files && files[0]) {
      setAvatarFile(files[0]); // Track file separately
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    if (avatarFile) {
      data.append("file", avatarFile);
    }
    data.append("full_name", formData.fullName);
    data.append("institution_name", formData.institutionName);
    updateProfileMutation.mutate(data);
  };

  const [isUploading, setIsUploading] = useState(false);

  const { mutate: uploadResumeMutation } = useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      toast.success("Resume uploaded successfully");
      setIsUploading(false);
      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(
        `Error uploading file: ${
          error.response?.data?.message || error.message
        }`
      );
      setIsUploading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      uploadResumeMutation(file);
    }
  };
  

  const handleFileClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="pt-10 pb-5 bg-secondary-50 ">
      <div className="flex w-full max-w-full 2xl:max-w-[1440px] mx-auto px-5 md:px-7 2xl:px-0">
        <div className="flex max-lg:flex-col w-full bg-secondary-200 border border-neutral-100 p-6 max-lg:px-2 max-md:py-4 justify-between rounded-2xl items-center gap-5 text-center">
          <div className="flex gap-4 items-center">
            <div>
              <div className="bg-neutral-100 border-[3px] border-white rounded-full w-[60px] h-[60px]">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt=""
                    className="rounded-full size-[60px]"
                    width={60}
                    height={60}
                    unoptimized
                  />
                ) : (
                  <div className="w-[60px] h-[60px] rounded-full bg-gray-300"></div> // Placeholder or empty div
                )}
              </div>
            </div>
            <div className="font-plus-jakarta-sans">
              <div className="flex gap-2 items-center">
                <span className="text-neutral-950 text-2xl max-md:text-lg font-semibold">
                  {fullName}
                </span>
                <Image
                  src={ICONS.penResume}
                  alt="pen"
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-neutral-600 text-lg max-md:text-xs text-start">
                {institutionName}
              </p>
            </div>
          </div>
          {resumeUrl ? (
            <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="normal" className="flex items-center">
                <div className="flex items-start gap-2 p-2">
                  <span className="text-xl">Download Resume</span>
                </div>
                <Image src={IMAGES.download} alt="download" />
              </Button>
            </Link>
          ) : (
            <div>
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />

              <Button
                onClick={handleFileClick}
                variant="normal"
                className="flex items-center gap-2 p-4"
              >
                {isUploading ? (
                  <Oval height="25" width="25" color="white" strokeWidth="5" />
                ) : (
                  <span className="text-xl">Upload Resume</span>
                )}
                <Image
                  src={IMAGES.download}
                  alt="download"
                  className="rotate-[-180deg]"
                />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Profile</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
              <div className="flex flex-col">
                <label htmlFor="avatarUrl" className="text-neutral-600">
                  Avatar
                </label>
                <input
                  type="file"
                  id="avatarUrl"
                  name="avatarUrl"
                  accept="image/*"
                  onChange={handleChange}
                  className="input input-bordered"
                />
                {formData.avatarUrl && (
                  <img
                    src={formData.avatarUrl}
                    alt="avatar"
                    className="w-20 h-20 rounded-full mx-auto mt-2"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-neutral-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="modal-action">
                <Button type="submit" variant="normal">
                  Update Profile
                </Button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
