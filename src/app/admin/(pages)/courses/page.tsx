"use client";
import { getAllCourses } from "@/api/admin";
import CoursesPageDashboard from "@/commonPages/CoursesPageDashboard";
import { useQuery } from "@tanstack/react-query";

const CoursesPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });
  return (
    <CoursesPageDashboard courses={data?.courses} isLoading={isLoading} navigatePath="/admin" />
  );
};

export default CoursesPage;