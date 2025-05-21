import React from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";

const navLinks = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "Employees",
    path: "/admin/employees",
  },
  {
    label: "Employers",
    path: "/admin/employers",
  },
  {
    label: "Jobs Posted",
    path: "/admin/jobs-posted",
  },
  {
    label: "Skill Programmes",
    path: "/admin/skill-programmes",
  },
  {
    label: "Courses",
    path: "/admin/courses",
  },
  {
    label: "Events",
    path: "/admin/events",
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
