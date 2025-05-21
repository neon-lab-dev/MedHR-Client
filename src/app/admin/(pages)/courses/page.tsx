"use client";
import React, { useState } from "react";
import KPICard from "@/components/KPICard";
import trash from "@/assets/icons/Trash Bin Trash.svg";
import eye from "@/assets/icons/eye.svg";
import search from "@/assets/icons/Search.svg";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import Table from "@/components/Table";
import { Header } from "../../tableTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import Loading from "@/components/Loading";
import { deleteCourseById, getAllCourses } from "@/api/admin";
import { ICourse, IDataItem } from "@/app/employer/(home)/courses/page";


const Courses = () => {
  const [jobThatIsBeingDeleted, setJobThatIsBeingDeleted] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  // Delete course
 const { mutate: deleteCourse } = useMutation({
  mutationFn: (id: string) => deleteCourseById(id),
  onMutate: () => {
    toast.loading("Deleting course...", { id: "delete-course" });
  },
  onSuccess: () => {
    toast.success("Course deleted successfully", { id: "delete-course" });
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  },
  onError: (error: string) => {
    toast.error(`Failed to delete course: ${error}`, { id: "delete-course" });
  },
});

  // Delete course
  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
  };


  // Table headers
  const headers: Header<IDataItem>[] = [
      { header: "Name", accessor: "name" },
      { header: "Course Type", accessor: "courseType" },
      { header: "Department", accessor: "department" },
      { header: "Duration", accessor: "duration" },
      { header: "Pricing Type", accessor: "pricingType" },
      { header: "Fee (₹)", accessor: "fee" },
      { header: "Posted Date", accessor: "postedDate" },
      { header: "Actions", accessor: "actions" },
    ];

  const renderCustomCell = (column: Header<IDataItem>, item: IDataItem) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              {jobThatIsBeingDeleted === item.actions ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Image src={menuDots} alt="menu-dots-icon" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
            >
              <li>
                <a
                  href={`/admin/courses/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={eye} alt="eye-icon" />
                  <span>Edit Course</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleDeleteCourse(item.actions);
                  }}
                  className="flex gap-2 text-red-500"
                >
                  <Image src={trash} alt="eye-icon" />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return item[column.accessor];
  };

  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">

      <div className="bg-white flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-end px-4">
          {/* Search field */}
          {/* <SearchInput
            placeholder="Search user"
            icon={search}
            onChange={(e) => {
              debouncedSetKeyword(e.target.value);
            }}
          /> */}

          {/* Download CSV button */}
          <Link href={"/admin/create-course"}
        className="bg-neutral-450 border border-neutral-550 rounded-[10px] font-plus-jakarta-sans text-base font-medium text-secondary-925 px-4 pt-3 pb-[14px]"
      >
        Create Course
      </Link>
        </div>

        {isLoading ? (
          <Loading className="h-40" />
        ) : (
          <Table
            className="w-full max-w-full pb-32"
            headers={headers}
            data={
              data?.courses?.map((course: ICourse) => ({
                name: course.courseName,
                courseType: course.courseType,
                department: course.department,
                duration: course.duration,
                pricingType: course.pricingType,
                fee: course.fee,
                postedDate: new Date(course.createdAt).toDateString(),
                actions: course._id,
              })) as IDataItem[]
            }
            renderCustomCell={renderCustomCell}
          />
        )}
      </div>
    </div>
  );
};

export default Courses;
