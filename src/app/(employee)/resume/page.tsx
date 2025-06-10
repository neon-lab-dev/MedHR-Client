"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Oval } from "react-loader-spinner";
import Hero from "./_components/Hero";
import Profile from "./_components/Profile";
import EducationComponent from "./_components/EducationComponent";
import Project from "./_components/Project";
import WorkExp from "./_components/WorkExp";
import Certifications from "./_components/Certifcation";
import Skills from "./_components/Skills";
import { fetchUserData } from '@/api/employee';

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
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

  const { avatar, full_name, education, resumes, projects, experience, certifications, skills } = data.user;

  const avatarUrl = avatar?.url || '/path/to/default-avatar.png'; // Provide a valid path for default avatar
  const resumeUrl = resumes?.url; // Provide a valid path or URL for default resume

  return (
    <div>
      <Hero />
      <Profile
        avatarUrl={avatarUrl}
        fullName={full_name}
        institutionName={education.length > 0 ? education[0].institutionName : 'No education info'}
        resumeUrl={resumeUrl}
      />
      <EducationComponent education={education} />
      <Project projects={projects} />
      <WorkExp experiences={experience} /> {/* Ensure WorkExp handles the experiences prop correctly */}
      <Certifications certifications={certifications} /> {/* Ensure Certifications handles the certifications prop correctly */}
      <Skills skills={skills} /> {/* Ensure Skills handles the skills prop correctly */}
    </div>
  );
};

export default Dashboard;
