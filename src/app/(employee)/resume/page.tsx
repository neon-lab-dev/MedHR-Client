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
  } = data.user;

  const avatarUrl = avatar?.url || "/path/to/default-avatar.png";
  const resumeUrl = resumes?.url;

  console.log(data.user);

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

  return (
    <div>
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
          <PersonalDetails personalDetails={personalDetails} />
          <GuardianDetails guardianDetails={guardianDetails} />
          <EducationDetails education={education ? education : []} />
          <ProjectDetails projects={projects ? projects : []} />
          <WorkExperience experiences={experience ? experience : []} />
          <Certification
            certifications={certifications ? certifications : []}
          />
          <Skills skills={skills} />
        </div>
      </Container>
      {/* <EducationComponent education={education} />
      <Project projects={projects} />
      <WorkExp experiences={experience} />
      <Certifications certifications={certifications} />
      <Skills skills={skills} /> */}
    </div>
  );
};

export default Dashboard;
