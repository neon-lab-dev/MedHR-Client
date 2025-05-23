"use client";
import { getAllEmployerCourses } from "@/api/employer";
import CoursesPageDashboard from "@/commonPages/CoursesPageDashboard";
import { useQuery } from "@tanstack/react-query";

const EmployerCoursesPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllEmployerCourses,
  });
  console.log(data);
  
  return (
    <CoursesPageDashboard courses={data?.courses} isLoading={isLoading} navigatePath="/employer" />
  );
};

export default EmployerCoursesPage;
