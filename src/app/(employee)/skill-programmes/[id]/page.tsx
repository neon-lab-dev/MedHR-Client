"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import Loading from "@/components/Loading";
import Container from "@/components/Container";
import Link from "next/link";
import Button from "@/components/Button";


interface ISkillProgramme {
   _id?: string;
  skillProgrammeName: string;
  programmeOverview: string;
  programmeDescription?: string;
  programmeType?: "Offline" | "Online" | "Fellowship" | "Scholarships" | "Events";
  department: string;
  duration: string;
  desiredQualificationOrExperience?: string;
  programmeLink?: string;
  pricingType?: string;
  fee?: number;
  numberOfSeats?: number;
  isIncludedCertificate?: boolean;
  postedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnail: {
    _id: string;
    fileId: string;
    name: string;
    url: string;
  };
}

const fetchCourseById = async (id: string) => {
  const { data } = await axios.get(
    `https://carrerhub-backend.vercel.app/api/v1/skills/${id}`
  );
  return data;
};

const CourseDetails = () => {
  const { id } = useParams();

  const skillId = Array.isArray(id) ? id[0] : id;

  const { isLoading, data } = useQuery({
    queryKey: ["skillProgramme", skillId],
    queryFn: async () => {
      if (!skillId) throw new Error("Skill ID is undefined");
      return fetchCourseById(skillId);
    },
    enabled: !!skillId,
  });

  const skill: ISkillProgramme = data?.skill;

  const courseData = [
    {
      label: "Programme Type",
      value: skill?.programmeType,
    },
    {
      label: "Department",
      value: skill?.department,
    },
    {
      label: "Duration",
      value: skill?.duration,
    },
    {
      label: "Price Type",
      value: skill?.pricingType,
    },
    {
      label: "Fee",
      value: `₹${skill?.fee}`,
    },
    {
      label: "Number of Seats",
      value: skill?.numberOfSeats,
    },
    {
      label: "Certificate Provided",
      value: skill?.isIncludedCertificate ? "Yes" : "No",
    },
  ];

  if (isLoading) return <Loading />;


  return (
    <Container>
      <div className="py-section">
        <h3 className="section-heading text-3xl font-bold">
          {skill?.skillProgrammeName}
        </h3>
        <div className="flex flex-col lg:flex-row gap-10 font-plus-jakarta-sans mt-7">
          <div className="w-full lg:w-[70%]">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <Image
                src={skill?.thumbnail?.url as string}
                alt={skill?.thumbnail?.name as string}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-full lg:h-[600px]"
              />
              <div>
                <p className="text-neutral-600 font-semibold">Programme Overview</p>
                <p className="text-neutral-600 text-[15px] mt-2">
                  {skill?.programmeOverview}
                </p>
              </div>

              <div>
                <p className="text-neutral-600 font-semibold">Programme Details</p>
                <div
                  className="text-neutral-600 text-[15px] mt-2"
                  dangerouslySetInnerHTML={{
                    __html: skill?.programmeDescription as string,
                  }}
                />
              </div>

              <div>
                <p className="text-neutral-600 font-semibold">
                  Necessary Qualification Or Experience
                </p>
                <p className="text-neutral-600 text-[15px] mt-2">
                  {skill?.desiredQualificationOrExperience}
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
              href={skill?.programmeLink ? skill?.programmeLink : ""}
              target="_blank">
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
