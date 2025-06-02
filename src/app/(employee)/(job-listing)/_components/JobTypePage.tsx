/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useAppSelector } from "@/hooks/store";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ApplyFilter, {
  DEFAULT_QUERY_PARAMS,
  IDefaultQueryParams,
} from "./ApplyFilter";
import debounce from "@/helpers/debounce";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllJobsByTypeService } from "@/api/jobs";
import Image from "next/image";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import JobCard from "./JobCard";

const JobTypePage = ({ jobType }: { jobType: string }) => {
  console.log(jobType);
  const { studentProfile } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<IDefaultQueryParams>({
    ...DEFAULT_QUERY_PARAMS,
    keyword: searchParams.get("search") || "",
  });

  useEffect(() => {
    const employmentTypeCategory = searchParams.get("employmentTypeCategory");
    const locationType = searchParams.get("locationType");
    const country = searchParams.get("country");
    const city = searchParams.get("city");
    const department = searchParams.get("department");
    const typeOfOrganization = searchParams.get("typeOfOrganization");

    setQueryParams((prev) => ({
      ...prev,
      employmentTypeCategory: employmentTypeCategory || "",
      locationType: locationType || "",
      country: country || "",
      city: city || "",
      department: department || "",
      typeOfOrganization: typeOfOrganization || "",
    }));
  }, [searchParams]);

  const [debouncedQueryParams, setDebouncedQueryParams] =
    useState<IDefaultQueryParams>(DEFAULT_QUERY_PARAMS);

  const debouncedSetParams = useCallback(
    debounce((queryParams) => {
      setDebouncedQueryParams(queryParams);
    }),
    [] // dependencies
  );

  // update debouncedQueryParams whenever queryParams changes
  useEffect(() => {
    debouncedSetParams(queryParams);
  }, [queryParams]);

  const { isLoading, data } = useQuery({
    queryKey: ["jobs", debouncedQueryParams, jobType],
    queryFn: () =>
      handleGetAllJobsByTypeService({
        ...debouncedQueryParams,
        type: jobType,
      }),
  });
  return (
    <div className="bg-[#f5f6fa] h-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 2xl:px-0 py-6">
        <div className="flex justify-between gap-10">
          <ApplyFilter
            setFilterParams={setQueryParams}
            filterParams={queryParams}
          />
          <div className="flex flex-1 flex-col gap-9">
            {/* Search field */}
            <div className="flex gap-4">
              <div className="bg-white rounded-[10px] w-full p-4 flex gap-2 justify-between items-center">
                <input
                  value={queryParams.keyword}
                  onChange={(e) => {
                    setQueryParams({
                      ...queryParams,
                      keyword: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder={`Search ${jobType} here...`}
                  className="bg-white focus:outline-none w-full"
                />
                <Image
                  src={ICONS.magnifer}
                  alt="search-icon"
                  className="w-[18px] cursor-pointer"
                />
              </div>
              <Button
                onClick={() => {
                  const filter = document.getElementById("filter");
                  filter?.classList.remove("left-full");
                  filter?.classList.add("left-8");
                }}
                variant="secondary"
                className="p-2 px-4 lg:hidden"
              >
                <Image
                  src={ICONS.filter}
                  alt="filter-icon"
                  className="w-[18px] cursor-pointer"
                />
              </Button>
            </div>

            {/* Job cards */}
            {isLoading ? (
              <>
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-32 w-full"></div>
              </>
            ) : data?.length === 0 ? (
              <div className="text-center text-neutral-500 flex items-center justify-center h-40">
                <span>No {jobType} found</span>
              </div>
            ) : (
              data?.map((details, index: number) => (
                <JobCard
                  wrapperClassName=""
                  key={index}
                  job={details}
                  showApplyButton
                  isApplied={
                    details?.applicants.findIndex((a) => {
                      a.employee === studentProfile?._id;
                    }) !== -1
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTypePage;
