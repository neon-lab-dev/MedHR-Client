 
"use client";
import { IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCourseById } from "@/api/admin";
import Loading from "@/components/Loading";
import Table from "@/components/Table";

export type Header<T> = {
  header: string;
  accessor: keyof T;
};

export interface IDataItem {
  name: string;
  courseType: string;
  applications: string;
  department: string;
  duration: string;
  pricingType: string;
  fee: number;
  postedDate: string;
  actions: string;
}

export interface ICourse {
  _id: string;
  courseName: string;
  courseOverview: string;
  thumbnail: {
    _id: string;
    fileId: string;
    name: string;
    url: string;
  };
  courseType: string;
  department: string;
  duration: string;
  pricingType: string;
  fee: number;
  applicants : string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CoursesPageDashboard = ({courses, isLoading, navigatePath}: {courses: ICourse[], isLoading: boolean, navigatePath: string}) => {
  const queryClient = useQueryClient();

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
    { header: "Total Applications", accessor: "applications" },
    { header: "Stream", accessor: "department" },
    { header: "Duration", accessor: "duration" },
    { header: "Pricing Type", accessor: "pricingType" },
    { header: "Fee (₹)", accessor: "fee" },
    { header: "Posted Date", accessor: "postedDate" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderCustomCell = (column: Header<IDataItem>, item: IDataItem) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions" className="">
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <Image src={IMAGES.menudots} alt="menu-dots-icon" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-neutral-50 border border-neutral-400/10 rounded-box z-[1] w-44 p-2 shadow"
            >
              <li>
                <a
                  href={`${navigatePath}/courses/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={IMAGES.pen} alt="eye-icon" className="size-4" />
                  <span>Edit Course</span>
                </a>
              </li>
               <li>
                <a
                  href={`${navigatePath}/courses/${item.actions}/applicants`}
                  className="flex gap-2"
                >
                  <Image src={IMAGES.view} alt="eye-icon" />
                  <span>View Applications</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleDeleteCourse(item.actions);
                  }}
                  className="flex gap-2 text-red-500"
                >
                  <Image src={IMAGES.bin} alt="eye-icon" />
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
          <Link
            href={`${navigatePath}/create-course`}
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
              courses?.map((course: any) => ({
                name: course.courseName,
                courseType: course.courseType,
                applications: course.applicants?.length,
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

export default CoursesPageDashboard;
