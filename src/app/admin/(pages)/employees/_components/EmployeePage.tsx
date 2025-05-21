"use client"
import { handleGetSingleEmployeeByAdminService } from '@/api/employee';
import { ICONS, IMAGES } from '@/assets';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EmployeePage = ({id} : {id:string}) => {
    const { isLoading, data } = useQuery({
        queryKey: ["admin", "employee", id],
        queryFn: () => handleGetSingleEmployeeByAdminService(id),
      });
      if (isLoading) return <Loading className="h-[60vh] w-full" />;
      if (!data) return <NotFound />;
    return (
        <div className="w-full p-6">
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-4 max-w-[1167px]">
        <Link
          href="/admin/employees"
          className="text-neutral-950 font-bold text-xl flex gap-2 items-center"
        >
          <Image src={ICONS.leftArrow} className="h-6 w-6" alt="" />
          <span>Student Profile</span>
        </Link>
        <div className="flex w-full">
          <div className="flex max-lg:flex-col w-full bg-secondary-200 border border-neutral-100 px-4 py-4 justify-between rounded-2xl items-center gap-5 text-center">
            <div className="flex gap-4 items-center">
              <div>
                <div className=" bg-neutral-100 border-[3px] border-white rounded-full w-[50px] h-[50px] shadow-inner font-medium flex items-center justify-center text-2xl">
                  <span className="opacity-60">{data?.full_name[0]}</span>
                </div>
              </div>
              <div className=" font-plus-jakarta-sans">
                <div className="flex gap-2">
                  <span className=" text-neutral-950 text-lg max-md:text-lg font-semibold">
                    {data?.full_name}
                  </span>
                </div>
                <span className=" text-neutral-600 text-base max-md:text-xs">
                  {data?.education && data?.education?.length > 0
                    ? data?.education[0].institutionName
                    : "No Education"}
                </span>
              </div>
            </div>
            {data?.resumes && (
              <Link href={data?.resumes?.url} download={true} target="_blank">
                <Button variant="normal" className="p-1">
                  <div className="flex gap-2 p-2">
                    <span className=" text-base">Download Resume</span>
                    <Image src={IMAGES.download} alt="pen" className="h-5 " />
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>
        {data?.education && data?.education.length > 0 && (
          <div className=" w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 text-center">
            <div className="flex justify-between  px-2 py-3  rounded-xl">
              <div className="flex gap-4 max-md:gap-1 items-center ">
                <span className=" text-xl text-secondary-700 font-semibold">
                  Education Details
                </span>
              </div>
            </div>
            <hr className="mb-4 mx-2" />
            <div className="flex flex-col gap-3">
              {data?.education?.map((education, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center border-2 border-neutral-100 px-4 py-2 rounded-xl "
                >
                  <div className="flex-col flex justify-start items-start font-plus-jakarta-sans">
                    <div className="flex gap-2">
                      <span className=" text-neutral-950 text-base font-semibold">
                        {education?.institutionName}
                      </span>
                    </div>
                    <span className=" text-neutral-600 text-base max-md:text-xs">
                      {education?.fieldOfStudy} | {education?.degree}
                    </span>
                    <span className="text-neutral-600 text-xs">
                      {new Date(education?.startDate).getFullYear()} -{" "}
                      {new Date(education?.endDate).getFullYear()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.projects && data?.projects.length > 0 && (
          <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 text-center">
            <div className="flex justify-between px-2 py-3 rounded-xl">
              <div className="flex gap-4 items-center">
                <span className="text-xl text-secondary-700 font-semibold max-md:text-base">
                  Project Details
                </span>
              </div>
            </div>
            <hr className="mb-4 mx-4" />
            <div className="flex flex-col gap-4">
              {data?.projects?.map((project, i) => (
                <div key={i} className="flex max-md:flex-col max-md:justify-end justify-between items-start border-2 border-neutral-100 p-2 px-4 rounded-xl">
                  <div className="flex gap-4 items-center">
                    <div className="font-plus-jakarta-sans">
                      <div className="flex gap-2">
                        <span className="text-neutral-950 text-base font-semibold">
                          {project?.title}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1 justify-start text-start list-disc text-sm px-1 py-1 ml-4">
                        {project?.description
                          ?.split("\n")
                          .map((point, index) => (
                            <li key={index} className="text-neutral-600 ">
                              {point}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.experience && data?.experience.length > 0 && (
          <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 text-center">
            <div className="flex justify-between px-2 py-3 rounded-xl">
              <div className="flex gap-4 items-center">
                <span className="text-xl text-secondary-700 font-semibold max-md:text-lg">
                  Work Experience
                </span>
              </div>
            </div>
            <hr className="my-4 mx-4" />
            <div className="flex flex-col gap-4">
              {data?.experience?.map((experience, i) => (
                <div
                  key={i}
                  className="flex justify-between max-md:flex-col items-start border-2 border-neutral-100 px-4 py-2 rounded-xl"
                >
                  <div className="flex gap-4 items-center">
                    <div className="font-plus-jakarta-sans">
                      <div className="flex gap-2">
                        <div className="flex flex-col items-start">
                          <span className="text-neutral-950 text-base font-semibold max-md:text-sm">
                            {experience.title} @{experience.company},
                            {experience.location}
                          </span>
                          <span className="text-xs text-neutral-500 max-md:text-xs">
                            {new Date(experience.startDate).toLocaleString(
                              "default",
                              { month: "short" }
                            )}{" "}
                            {new Date(experience.startDate).getFullYear()} -{" "}
                            {new Date(experience.endDate).toLocaleString(
                              "default",
                              { month: "short" }
                            )}{" "}
                            {new Date(experience.endDate).getFullYear()}
                          </span>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-1 justify-start text-start list-disc text-md max-md:text-sm px-4 py-2">
                        {experience.description
                          .split("\n")
                          .map((point, index) => (
                            <li key={index} className="text-neutral-600 ">
                              {point}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.certifications && data?.certifications.length > 0 && (
          <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 ext-center">
            <div className="flex justify-between px-2 py-3  rounded-xl">
              <div className="flex gap-4 items-center">
                <span className="text-xl text-secondary-700 font-semibold max-md:text-lg">
                  Certifications
                </span>
              </div>
            </div>
            <hr className="my-4 mx-4" />
            <div className="flex flex-col gap-4">
              {data?.certifications?.map((certification, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start max-md:items-center border-2 border-neutral-100 px-4 py-3 max-md:p-3 rounded-xl"
                >
                  <div className="flex gap-4 items-center">
                    <div className="font-plus-jakarta-sans">
                      <div className="flex gap-2">
                        <div className="flex  items-center gap-3 max-md:gap-1">
                          <span className="text-neutral-950 text-base font-semibold max-md:text-xs">
                            Certificate From {certification.issuingOrganization}
                          </span>
                          <span className=" text-xs text-neutral-500 max-md:text-xs">
                            {new Date(certification.issueDate).toLocaleString(
                              "default",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.skills && data?.skills.length > 0 && (
          <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 text-center">
            <div className="flex justify-between px-2 py-3  rounded-xl">
              <div className="flex gap-4 items-center">
                <span className="text-xl text-secondary-700 font-semibold">
                  Skills
                </span>
              </div>
            </div>
            <hr className="my-4 mx-4" />
            <div className="flex flex-wrap gap-4">
              {data?.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center min-w-20 justify-center flex-col bg-[#37466D] px-4 py-2 rounded-md text-white"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
};

export default EmployeePage;