"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Hero from "./_components/Hero";
import Profile from "./_components/Profile";
import { fetchUserData } from "@/api/employee";
import EducationDetails from "@/app/employer/(home)/find-candidates/_components/EducationDetails";
import ProjectDetails from "@/app/employer/(home)/find-candidates/_components/ProjectDetails";
import WorkExperience from "@/app/employer/(home)/find-candidates/_components/WorkExperience";
import Certification from "@/app/employer/(home)/find-candidates/_components/Certification";
import Container from "@/components/Container";
import Skills from "@/app/employer/(home)/find-candidates/_components/Skills";
import PersonalDetails from "@/app/employer/(home)/find-candidates/_components/PersonalDetails";
import GuardianDetails from "@/app/employer/(home)/find-candidates/_components/GuardianDetails";
import AddressDetails from "@/app/employer/(home)/find-candidates/_components/AddressDetails";
import OrganizationInterestedIn from "@/app/employer/(home)/find-candidates/_components/OrganizationInterestedIn";
import CurrentlyLookingForDetails from "@/app/employer/(home)/find-candidates/_components/CurrentlyLookingForDetails";
import InterestedCountriesDetails from "@/app/employer/(home)/find-candidates/_components/InterestedCountriesDetails";
import InterestedDepartmentDetails from "@/app/employer/(home)/find-candidates/_components/InterestedDepartmentDetails";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
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

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  if (!data || !data.user) {
    return <div>No data available</div>;
  }

  const {
    avatar,
    full_name,
    education,
    resumes,
    projects,
    experience,
    certifications,
    skills,
    areasOfInterests,
    currentlyLookingFor,
    interestedCountries,
    interestedDepartments
  } = data.user;

  const avatarUrl = avatar?.url || "/path/to/default-avatar.png";
  const resumeUrl = resumes?.url;

  const personalDetails = {
    email: data.user.email,
    mobilenumber: data.user.mobilenumber,
    dob : data.user.dob,
    designation : data.user.designation
  };

  const guardianDetails = {
    guardianName: data.user.guardian.guardianName,
    occupation: data.user.guardian.occupation,
    phoneNumber : data.user.guardian.phoneNumber,
  };

  const addressDetails = {
    street: data.user.address.street,
    city: data.user.address.city,
    postalCode : data.user.address.postalCode,
    state : data.user.address.state,
    country : data.user.address.country,
  };

  return (
      <div className="bg-[#f5f6fa]">
      <Hero />
      <Profile
        avatarUrl={avatarUrl}
        fullName={full_name}
        institutionName={
          education.length > 0
            ? education[0].institutionName
            : "No education info"
        }
        resumeUrl={resumeUrl}
      />
      <Container>
        <div className="flex flex-col gap-6 mt-5">
          <PersonalDetails personalDetails={personalDetails} isEditable={true} />
          <GuardianDetails guardianDetails={guardianDetails} isEditable={true} />
          <AddressDetails addressDetails={addressDetails} isEditable={true} />
          <EducationDetails education={education ? education : []} isEditable={true} />
          <ProjectDetails projects={projects ? projects : []} isEditable={true} />
          <WorkExperience experiences={experience ? experience : []} isEditable={true} />
          <Certification
            certifications={certifications ? certifications : []}
            isEditable={true}
          />
          <Skills skills={skills} isEditable={true} />
          <OrganizationInterestedIn interestedOrganizations={areasOfInterests} isEditable={true} />
          <CurrentlyLookingForDetails currentlyLookingFor={currentlyLookingFor} isEditable={true} />
          <InterestedCountriesDetails interestedCountries={interestedCountries} isEditable={true} />
          <InterestedDepartmentDetails interestedDepartments={interestedDepartments} isEditable={true} />
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
