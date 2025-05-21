"use client"
import { IMAGES } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";

type TCandidatesTableProps = {
  candidates: any[];
  isLoading: boolean;
  className? : string;
}

const CandidatesTable:React.FC<TCandidatesTableProps> = ({className, candidates, isLoading}) => {
    const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);

  const handleMenuClick = (id: string) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  if (isLoading) {
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
        <div className={twMerge(`w-full overflow-x-auto h-[700px] font-Poppins mx-auto px-0 ${className}`)}>
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
              <td>
                <div className="flex items-center gap-2">
                  <span>Action</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className="bg-white w-full text-base">
            {candidates?.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center font-Poppins">
                  No candidate found
                </td>
              </tr>
            ) : (
              candidates?.map((candidate) => (
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
                    <span>{candidate?.areasOfInterests?.length > 0 ? candidate?.areasOfInterests?.join(", ") : "Not available"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {
                        candidate?.address ?
                        <span>{candidate?.address?.street} {candidate?.address?.city} {candidate?.address?.postalCode} {candidate?.address?.state} {candidate?.address?.country}</span>
                        :
                        <span>Not available</span>
                      }
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {
                        candidate?.resumes?.url ?
                        <Link href={candidate?.resumes?.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-500">
                 Download Resume
            </Link>
                        :
                        <span>Not available</span>
                      }
                    </div>
                  </td>
                  <td>
                    <div className="relative flex items-center gap-2">
                      <div onClick={() => handleMenuClick(candidate._id)} className="cursor-pointer">
                        <Image src={IMAGES.menudots} alt="Menu Icon" />
                      </div>
                      {dropdownOpenId === candidate._id && (
                        <div className="absolute right-0 mt-28 w-48 p-4 rounded-xl bg-white border shadow-lg z-10">
                          {/* <Link href={`/employer/dashboard/${candidate._id}`}>
                            <div className="flex items-center gap-2 text-sm p-2">
                              <Image src={IMAGES.doc} alt="Role Icon" />
                              <span>Send Email</span>
                            </div>
                          </Link> */}
                          <Link href={`/employer/find-candidates/${candidate?._id}`}>
                            <div className="flex items-center gap-2 text-sm p-2">
                              <Image src={IMAGES.view} alt="Role Icon" />
                              <span>View Profile</span>
                            </div>
                          </Link>
                        </div>
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
    );
};

export default CandidatesTable;