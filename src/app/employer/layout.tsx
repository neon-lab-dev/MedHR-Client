"use client"
import React, { useState, useEffect } from 'react';
import "../globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import ScreenWarning from '@/components/ScreenWarning';
import home from "@/assets/icons/home.svg";
import { useQuery } from '@tanstack/react-query';
import { handleEmployeeLoginService } from '@/api/authentication';
import { ICONS } from '@/assets';

export default function EmployeeRootLayout({ children }: any) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 999);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navlinks = [
    {
      label: "Home",
      path: "/employer",
      icon: home
    },
    {
      label: "Jobs",
      path: "/employer/jobs",
      icon: ICONS.jobs
    },
    {
      label: "Internships",
      path: "/employer/internships",
      icon: ICONS.internship
    },
    {
      label: "Find Candidates",
      path: "/employer/find-candidates",
      icon: ICONS.findCandidates
    },
    {
      label: "Courses",
      path: "/employer/courses",
      icon: ICONS.course
    },
    {
      label: "Skill Programmes",
      path: "/employer/skill-programmes",
      icon: ICONS.skillProgramme
    },
  ];



  return (
    <div className="flex">
      {isSmallScreen ? (
        <div className='flex justify-center w-full h-screen'>
          <ScreenWarning />
        </div>
      ) : (
        <>
          <Sidebar navlinks={navlinks} />
          <div className="w-full h-full">
            <Header />
            {children}
          </div>
        </>
      )}
    </div>
  );
}
