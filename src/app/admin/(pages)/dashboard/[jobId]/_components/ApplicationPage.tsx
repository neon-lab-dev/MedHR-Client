/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React from "react";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import addCircle from "@/assets/icons/Add Circle.svg";
import { ICONS } from "@/assets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveApplicant,
  fetchProfileData,
  rejectApplicant,
} from "@/api/employer";
import { useRouter } from "next/navigation";
import PersonalDetails from "@/app/employer/(home)/find-candidates/_components/PersonalDetails";
import GuardianDetails from "@/app/employer/(home)/find-candidates/_components/GuardianDetails";
import AddressDetails from "@/app/employer/(home)/find-candidates/_components/AddressDetails";
import EducationDetails from "@/app/employer/(home)/find-candidates/_components/EducationDetails";
import ProjectDetails from "@/app/employer/(home)/find-candidates/_components/ProjectDetails";
import WorkExperience from "@/app/employer/(home)/find-candidates/_components/WorkExperience";
import Certification from "@/app/employer/(home)/find-candidates/_components/Certification";
import Skills from "@/app/employer/(home)/find-candidates/_components/Skills";
import OrganizationInterestedIn from "@/app/employer/(home)/find-candidates/_components/OrganizationInterestedIn";
import CurrentlyLookingForDetails from "@/app/employer/(home)/find-candidates/_components/CurrentlyLookingForDetails";
import InterestedCountriesDetails from "@/app/employer/(home)/find-candidates/_components/InterestedCountriesDetails";
import InterestedDepartmentDetails from "@/app/employer/(home)/find-candidates/_components/InterestedDepartmentDetails";

const ApplicationPage = ({
  applicantId,
  jobId,
}: {
  applicantId: string;
  jobId: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profileData", applicantId],
    queryFn: () => fetchProfileData(applicantId),
  });

  const approveMutation = useMutation({
    mutationFn: () => approveApplicant({ jobId, applicantId, status: "HIRED" }),
    onSuccess: () => {
      toast.success("Applicant approved successfully."),
        router.push("/employer/jobs"),
        queryClient.invalidateQueries({ queryKey: ["jobDetails", jobId] });
    },
    onError: (error: any) => toast.error(`Error: ${error.message}`),
  });

  const rejectMutation = useMutation({
    mutationFn: () =>
      rejectApplicant({ jobId, applicantId, status: "REJECTED" }),
    onSuccess: () => {
      toast.success("Applicant rejected successfully."),
        router.push("/employer/jobs"),
        queryClient.invalidateQueries({ queryKey: ["jobDetails", jobId] });
    },
    onError: (error: any) => toast.error(`Error: ${error.message}`),
  });

  const personalDetails = {
    email: profileData?.email,
    mobilenumber: profileData?.mobilenumber,
    dob: profileData?.dob,
    designation: profileData?.designation,
  };

  const guardianDetails = {
    guardianName: profileData?.guardian?.guardianName,
    occupation: profileData?.guardian?.occupation,
    phoneNumber: profileData?.guardian?.phoneNumber,
  };

  const addressDetails = {
    street: profileData?.address?.street,
    city: profileData?.address?.city,
    postalCode: profileData?.address?.postalCode,
    state: profileData?.address?.state,
    country: profileData?.address?.country,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={40}
          width={40}
          color="#F9533A"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f4f4f4"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error fetching profile data: {error.message}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-2 bg-secondary-50">
      <div className="bg-white p-10 m-10">
        <div className="flex justify-between my-10 ml-10 items-center">
          <div className="flex gap-6 items-center">
            <Link href={`/employer/dashboard/${jobId}`}>
              <Image src={ICONS.leftArrow} alt={"left-arrow"} />
            </Link>
            <h1 className="text-neutral-950 text-[28px] font-bold">
              Application
            </h1>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => approveMutation.mutate()}
              className="flex items-center gap-[6px] max-w-[150px] justify-center bg-green-500 shadow-green-800/80"
              variant="normal"
            >
              Approve
            </Button>
            <Button
              onClick={() => rejectMutation.mutate()}
              className="flex items-center gap-[6px] max-w-[200px] justify-center"
              variant="normal"
            >
              <Image src={addCircle} alt="addCircle" className="rotate-45" />
              Reject
            </Button>
          </div>
        </div>

        {/* Img and name */}
        <div className="bg-[#EAECF4] border border-[#EEEEF0] rounded-3xl p-8 flex items-center justify-between mt-12 mb-6">
          <div className="flex items-center gap-[10px]">
            <div className="size-[59px] rounded-full border-2 border-[#F7F7F8] flex items-center justify-center text-xl font-semibold">
              {profileData?.full_name
                ? profileData?.full_name
                    .split(" ")
                    .map((letter: string) => letter.charAt(0))
                    .join("")
                : "?"}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#25252C]">
                {profileData?.full_name}
              </h1>
              <p className="text-[#5B5C6E] mt-[6px]">CCN Polytechnic</p>
            </div>
          </div>
          {profileData?.resumes?.url ? (
            <Link
              href={profileData?.resumes?.url ? profileData?.resumes?.url : ""}
              className="flex items-center gap-2 px-6 py-4 bg-[#D0D7E7] border border-[#778DB9] text-[#303D5C] font-medium rounded-[14px] cursor-pointer"
            >
              Download Resume
              <Image
                src={ICONS.download2}
                alt="download-icon"
                className="size-4"
              />
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-6 py-4 bg-[#D0D7E7] border border-[#778DB9] text-[#303D5C] font-medium rounded-[14px]">
              No resume added
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <PersonalDetails personalDetails={personalDetails as any} />
          <GuardianDetails guardianDetails={guardianDetails} />
          <AddressDetails addressDetails={addressDetails} />
          <EducationDetails
            education={profileData?.education ? profileData?.education : []}
          />
          <ProjectDetails
            projects={
              profileData?.projects ? profileData?.projects : ([] as any)
            }
          />
          <WorkExperience
            experiences={
              profileData?.experience ? profileData?.experience : ([] as any)
            }
          />
          <Certification
            certifications={
              profileData?.certifications ? profileData?.certifications : []
            }
          />
          <Skills skills={profileData?.skills} />
          <OrganizationInterestedIn
            interestedOrganizations={profileData?.areasOfInterests}
          />
          <CurrentlyLookingForDetails
            currentlyLookingFor={profileData?.currentlyLookingFor}
          />
          <InterestedCountriesDetails
            interestedCountries={profileData?.interestedCountries}
          />
          <InterestedDepartmentDetails
            interestedDepartments={profileData?.interestedDepartments}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
