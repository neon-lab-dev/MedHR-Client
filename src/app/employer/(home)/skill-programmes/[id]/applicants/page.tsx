/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSingleSkill } from "@/api/admin";
import { handleGEtEmployerByIdForEmployer } from "@/api/employer";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const AllApplicantsPage = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const { isLoading, data } = useQuery({
    queryKey: ["skillprogramme", id],
    queryFn: () => getSingleSkill(id as string),
  });

  const applicants = data?.skill?.applicants;

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!applicants || applicants.length === 0) return;

      setLoadingEmployees(true);
      try {
        const employees = await Promise.all(
          applicants.map((applicant: any) =>
            handleGEtEmployerByIdForEmployer(applicant.employee) // Fetch by ID
          )
        );
        console.log(employees);
        setEmployeeData(employees);
      } catch (err) {
        console.error("Error fetching employees", err);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, [applicants]);

  console.log(employeeData);

   if (loadingEmployees || isLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <Oval
            height={40}
            width={40}
            color="#F9533A"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#f4f4f4"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      );
    }

  return (
    <div className="p-6 font-plus-jakarta-sans">
      <h1 className="text-2xl font-bold mb-4 text-neutral-700">Applicants</h1>

      <div
      className="w-full overflow-x-auto h-[700px] font-Poppins mx-auto px-0"
    >
      <div className="rounded-[124px]">
        <table className="table w-full">
          <thead className="bg-secondary-100 w-full text-secondary-800 font-plus-jakarta-sans font-medium text-base">
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <span>Name</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Email</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Phone Number</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Area of Interests</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Location</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span>Download Resume</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className="bg-white w-full text-base">
            {employeeData?.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center font-Poppins">
                  No candidate found
                </td>
              </tr>
            ) : (
              employeeData?.map((candidate) => (
                <tr key={candidate._id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{candidate?.full_name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{candidate?.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{candidate?.mobilenumber}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>
                        {candidate?.areasOfInterests?.length > 0
                          ? candidate?.areasOfInterests?.join(", ")
                          : "Not available"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {candidate?.address?.street ? (
                        <span>
                          {candidate?.address?.street}{" "}
                          {candidate?.address?.city}{" "}
                          {candidate?.address?.postalCode}{" "}
                          {candidate?.address?.state}{" "}
                          {candidate?.address?.country}
                        </span>
                      ) : (
                     "Not available"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {candidate?.resumes?.url ? (
                        <Link
                          href={candidate?.resumes?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary-500"
                        >
                          Download Resume
                        </Link>
                      ) : (
                        <span>Not available</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AllApplicantsPage;
