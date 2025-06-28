import React from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { ICONS } from "@/assets";

// const navLinks = [
//   {
//     label: "Dashboard",
//     path: "/admin",
//   },
//   {
//     label: "Employees",
//     path: "/admin/employees",
//   },
//   {
//     label: "Employers",
//     path: "/admin/employers",
//   },
//   {
//     label: "Jobs Posted",
//     path: "/admin/jobs-posted",
//   },
//   {
//     label: "Skill Programmes",
//     path: "/admin/skill-programmes",
//   },
//   {
//     label: "Courses",
//     path: "/admin/courses",
//   },
//   {
//     label: "Events",
//     path: "/admin/events",
//   },
// ];


const navLinks = [
    {
      label: "Dashboard",
    path: "/admin",
      icon: ICONS.home
    },
    {
      label: "Aspirants",
    path: "/admin/employees",
      icon: ICONS.employee
    },
    {
      label: "Employers",
    path: "/admin/employers",
      icon: ICONS.employer
    },
    {
       label: "Jobs Posted",
    path: "/admin/jobs-posted",
      icon: ICONS.jobs
    },
    {
       label: "Jobs",
    path: "/admin/jobs",
      icon: ICONS.jobs
    },
    {
       label: "Internships",
    path: "/admin/internships",
      icon: ICONS.internship
    },
    {
      label: "Courses",
    path: "/admin/courses",
      icon: ICONS.course
    },
    {
       label: "Skill Programmes",
    path: "/admin/skill-programmes",
      icon: ICONS.skillProgramme
    },
    {
      label: "Events",
    path: "/admin/events",
      icon: ICONS.events
    },
  ];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar navLinks={navLinks} />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header />
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
