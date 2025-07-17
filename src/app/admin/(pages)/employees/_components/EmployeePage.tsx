"use client";
import { handleGetSingleEmployeeByAdminService } from "@/api/employee";
import AddressDetails from "@/app/employer/(home)/find-candidates/_components/AddressDetails";
import Certification from "@/app/employer/(home)/find-candidates/_components/Certification";
import CurrentlyLookingForDetails from "@/app/employer/(home)/find-candidates/_components/CurrentlyLookingForDetails";
import EducationDetails from "@/app/employer/(home)/find-candidates/_components/EducationDetails";
import GuardianDetails from "@/app/employer/(home)/find-candidates/_components/GuardianDetails";
import InterestedCountriesDetails from "@/app/employer/(home)/find-candidates/_components/InterestedCountriesDetails";
import InterestedDepartmentDetails from "@/app/employer/(home)/find-candidates/_components/InterestedDepartmentDetails";
import OrganizationInterestedIn from "@/app/employer/(home)/find-candidates/_components/OrganizationInterestedIn";
import PersonalDetails from "@/app/employer/(home)/find-candidates/_components/PersonalDetails";
import ProjectDetails from "@/app/employer/(home)/find-candidates/_components/ProjectDetails";
import Skills from "@/app/employer/(home)/find-candidates/_components/Skills";
import WorkExperience from "@/app/employer/(home)/find-candidates/_components/WorkExperience";
import { ICONS } from "@/assets";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmployeePage = ({ id }: { id: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["admin", "employee", id],
    queryFn: () => handleGetSingleEmployeeByAdminService(id),
  });
  console.log(data);

  const personalDetails = {
    email: data?.email,
    mobilenumber: data?.mobilenumber,
    dob: data?.dob,
    designation: data?.designation,
  };

  const guardianDetails = {
    guardianName: data?.guardian?.guardianName,
    occupation: data?.guardian?.occupation,
    phoneNumber: data?.guardian?.phoneNumber,
  };

  const addressDetails = {
    street: data?.address?.street,
    city: data?.address?.city,
    postalCode: data?.address?.postalCode,
    state: data?.address?.state,
    country: data?.address?.country,
  };

  if (isLoading) return <Loading className="h-[60vh] w-full" />;
  if (!data) return <NotFound />;
  return (
    <div className="bg-[#f5f6fa] p-7 font-plus-jakarta-sans">
      {/* {data?.full_name} */}
      <div className="bg-white border border-[#EEEEF0] p-9 rounded-3xl max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href={"/employer/find-candidates"}>
              <Image
                src={ICONS.leftArrow}
                alt="left-arrow"
                className="size-10"
              />
            </Link>
            <h1 className="text-[28px] font-bold text-[#25252C]">Candidate</h1>
          </div>
          {/* <Button
            variant="normal"
            className={` px-4 py-3 flex items-center justify-center gap-1 w-[200px]`}
          >
            Contact
            <Image src={ICONS.sendArrow} alt="send-arrow" className="size-5" />
          </Button> */}
        </div>

        {/* Img and name */}
        <div className="bg-[#EAECF4] border border-[#EEEEF0] rounded-3xl p-8 flex items-center justify-between mt-12 mb-6">
          <div className="flex items-center gap-[10px]">
            <div className="size-[59px] rounded-full border-2 border-[#F7F7F8] flex items-center justify-center text-xl font-semibold">
              {data?.full_name
                ? data?.full_name
                    .split(" ")
                    .map((letter: string) => letter.charAt(0))
                    .join("")
                : "?"}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#25252C]">
                {data?.full_name}
              </h1>
              <p className="text-[#5B5C6E] mt-[6px]">CCN Polytechnic</p>
            </div>
          </div>
          {data?.resumes?.url ? (
            <Link
              href={data?.resumes?.url ? data?.resumes?.url : ""}
              target="_blank"
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

        {/* Rest sections */}
        <div className="flex flex-col gap-6">
          <PersonalDetails personalDetails={personalDetails as any} />
          <GuardianDetails guardianDetails={guardianDetails} />
          <AddressDetails addressDetails={addressDetails} />
          <EducationDetails
            education={data?.education ? data?.education : []}
          />
          <ProjectDetails
            projects={data?.projects ? data?.projects : ([] as any)}
          />
          <WorkExperience
            experiences={data?.experience ? data?.experience : ([] as any)}
          />
          <Certification
            certifications={data?.certifications ? data?.certifications : []}
          />
          <Skills skills={data?.skills} />
          <OrganizationInterestedIn
            interestedOrganizations={data?.areasOfInterests}
          />
          <CurrentlyLookingForDetails
            currentlyLookingFor={data?.currentlyLookingFor}
          />
          <InterestedCountriesDetails
            interestedCountries={data?.interestedCountries}
          />
          <InterestedDepartmentDetails
            interestedDepartments={data?.interestedDepartments}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
