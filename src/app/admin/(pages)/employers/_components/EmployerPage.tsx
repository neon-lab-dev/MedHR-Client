"use client"
import { handleGEtEmployerByIdForAdminService } from "@/api/employer";
import { ICONS } from "@/assets";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const EmployerPage = ({id} : {id:string}) => {
    const { isLoading, data } = useQuery({
        queryKey: ["admin", "employer", id],
        queryFn: () => handleGEtEmployerByIdForAdminService(id),
      });
      if (isLoading) return <Loading className="h-[60vh] w-full" />;
      if (!data) return <NotFound />;
    return (
        <div className="w-full p-6">
        <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-4 max-w-[1167px]">
          <Link
            href="/admin/employers"
            className="text-neutral-950 font-bold text-xl flex gap-2 items-center"
          >
            <Image src={ICONS.leftArrow} className="h-6 w-6" alt="" />
            <span>Employer Profile</span>
          </Link>
          <div className="p-4 lg:p-6 rounded-[22px] border border-secondary-200 text-xl flex flex-col gap-6">
            <h3 className="capitalize font-semibold text-neutral-800 text-2xl">
              About the Company
            </h3>
            <hr />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg lg:text-xl text-neutral-800">
                  {data.companyDetails?.length > 0 &&
                    data.companyDetails[0].companyName}
                </span>
                <div className="flex gap-3 lg:gap-6 items-center text-sm lg:text-base font-medium text-primary-500">
                  <Link
                    href={
                      data.companyDetails?.length > 0
                        ? data.companyDetails[0].websiteLink
                        : "#"
                    }
                    target="_blank"
                  >
                    Website
                  </Link>
                  <div className="h-2 w-2 rounded-full bg-secondary-100" />
                  {data.address?.length > 0 && (
                    <Link href="#" target="_blank">
                      {data.address[0].country}, {data.address[0].state},{" "}
                      {data.address[0].city} {data.address[0].street}
                    </Link>
                  )}
                </div>
                <div className="flex gap-6 items-center text-base font-medium text-secondary-400">
                  <span>
                    {data.companyDetails?.length > 0 &&
                      data.companyDetails[0].industryType}
                  </span>
                </div>
              </div>
              {/* <Image //todo
                src={data.}
                alt="Company Logo"
                height={56}
                width={56}
                className="h-[56px] w-[56px] rounded-full"
              /> */}
            </div>
            <hr />
            <p className=" text-neutral-700 flex flex-col gap-6">
              {data.companyDetails?.length > 0 &&
                data.companyDetails[0].bio
                  .split("\n")
                  .filter((res) => res)
                  .map((para, index) => <span key={index}>{para}</span>)}
            </p>
          </div>
        </div>
      </div>
    );
};

export default EmployerPage;