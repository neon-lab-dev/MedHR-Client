"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import Loading from "@/components/Loading";
import Container from "@/components/Container";
import Link from "next/link";
import Button from "@/components/Button";

export type TCourse = {
  _id?: string;
  courseName: string;
  courseOverview: string;
  courseDescription?: string;
  courseType: "Certificate" | "Diploma" | "Bachelor" | "Master";
  department: string;
  duration: string;
  desiredQualificationOrExperience?: string;
  courseLink?: string;
  pricingType?: string; // default: "Free"
  fee?: number; // default: 0
  numberOfSeats?: number; // default: 0
  isIncludedCertificate?: boolean; // default: false
  thumbnail?: {
    fileId: string;
    name: string;
    url: string;
    _id: string;
  };
  postedBy?: string; // employer ObjectId
  createdAt?: string;
  updatedAt?: string;
};

const fetchCourseById = async (id: string) => {
  const { data } = await axios.get(
    `https://carrerhub-backend.vercel.app/api/v1/courses/${id}`
  );
  return data;
};

const CourseDetails = () => {
  const { id } = useParams();

  const courseId = Array.isArray(id) ? id[0] : id;

  const { isLoading, data } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) throw new Error("Course ID is undefined");
      return fetchCourseById(courseId);
    },
    enabled: !!courseId,
  });

  console.log(data);

  const course: TCourse = data?.course;

  const courseData = [
    {
      label: "Course Type",
      value: course?.courseType,
    },
    {
      label: "Department",
      value: course?.department,
    },
    {
      label: "Duration",
      value: course?.duration,
    },
    {
      label: "Price Type",
      value: course?.pricingType,
    },
    {
      label: "Fee",
      value: `₹${course?.fee}`,
    },
    {
      label: "Number of Seats",
      value: course?.numberOfSeats,
    },
    {
      label: "Certificate Provided",
      value: course?.isIncludedCertificate ? "Yes" : "No",
    },
  ];
  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="py-section">
        <h3 className="section-heading text-3xl font-bold">
          {course?.courseName}
        </h3>
        <div className="flex flex-col lg:flex-row gap-10 font-plus-jakarta-sans mt-7">
          <div className="w-full lg:w-[70%]">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <Image
                src={course?.thumbnail?.url as string}
                alt={course?.thumbnail?.name as string}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-full lg:h-[600px]"
              />
              <div>
                <p className="text-neutral-600 font-semibold">Course Overview</p>
                <p className="text-neutral-600 text-[15px] mt-2">
                  {course?.courseOverview}
                </p>
              </div>

              <div>
                <p className="text-neutral-600 font-semibold">Course Details</p>
                <div
                  className="text-neutral-600 text-[15px] mt-2"
                  dangerouslySetInnerHTML={{
                    __html: course?.courseDescription as string,
                  }}
                />
              </div>

              <div>
                <p className="text-neutral-600 font-semibold">
                  Necessary Qualification Or Experience
                </p>
                <p className="text-neutral-600 text-[15px] mt-2">
                  {course?.desiredQualificationOrExperience}
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-[30%] rounded-2xl p-4 lg:p-6 bg-white border border-neutral-300 shadow-job-card-shadow h-fit flex flex-col gap-5">
            {courseData?.map((data) => (
              <div
                key={data?.label}
                className="flex items-center justify-between"
              >
                <p className="text-neutral-600 font-semibold">{data?.label}</p>
                <p
                  className={`${
                    data?.label === "Price Type"
                      ? "text-green-600"
                      : "text-neutral-600"
                  }`}
                >
                  {data?.value}
                </p>
              </div>
            ))}

            <Link
              href={course?.courseLink ? course?.courseLink : ""}
              target="_blank"
            >
              <Button variant="normal" className="px-6 py-[10px] w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CourseDetails;
