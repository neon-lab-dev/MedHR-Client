"use client";
import Container from "@/components/Container";
import NoDataFound from "@/components/NoDataFound";
import CourseCard from "../../(home)/_components/CourseCard";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "@/assets";
import FilterDropdown from "@/components/Reusable/FilterDropdown/FilterDropdown";
import { departments } from "@/mockData/departments";
import Button from "@/components/Button";
import axiosInstance from "@/api/axiosInstance";

const AllSkillProgrammes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skillProgrammes, setSkillProgrammes] = useState<any>([]);
  // For search bard
  const [keyword, setKeyword] = useState("");
  const [selectedProgrammeType, setSelectedProgrammeType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPricingType, setSelectedPricingType] = useState("");

  const handleSelectProgrammeType = (courseType: string) => {
    setSelectedProgrammeType(courseType);
  };
  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
  };
  const handleSelectPricingType = (pricingType: string) => {
    setSelectedPricingType(pricingType);
  };

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          "/skills",
          {
            params: {
              keyword: keyword || undefined,
              programmeType: selectedProgrammeType || undefined,
              department: selectedDepartment || undefined,
              pricingType: selectedPricingType || undefined,
            },
            withCredentials: true,
          }
        );
        setSkillProgrammes(response?.data?.skills);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCourses();
  }, [keyword, selectedProgrammeType, selectedDepartment, selectedPricingType]);

  const handleResetFilters = () => {
    setKeyword("");
    setSelectedProgrammeType("");
    setSelectedDepartment("");
    setSelectedPricingType("");
  };
  return (
    <Container>
      <div className="flex flex-col xl:flex-row gap-5 items-center justify-between w-full">
        <div className="px-4 py-3 text-base rounded-md bg-white shadow-secondary-button text-neutral-700 leading-6 cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 text-nowrap flex gap-2 justify-between items-center w-full xl:w-fit">
          <input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            type="text"
            placeholder={`Search course...`}
            className="bg-white focus:outline-none"
          />
          <Image src={ICONS.magnifer} alt="search-icon" className="w-[18px]" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-5 w-full 2xl:w-fit">
          <FilterDropdown
            label="Select Programme Type"
            items={["Offline", "Online", "Fellowship", "Scholarships", "Events"]}
            icon={ICONS.downArrow}
            onSelect={handleSelectProgrammeType}
            selectedData={selectedProgrammeType}
            classNames="px-4 py-3 text-base rounded-md w-full 2xl:w-[250px] gap-3"
            containerWidth="w-full"
          />
          <FilterDropdown
            label="Select Department"
            items={departments}
            icon={ICONS.downArrow}
            onSelect={handleSelectDepartment}
            selectedData={selectedDepartment}
            classNames="px-4 py-3 text-base rounded-md w-full 2xl:w-[200px] gap-3"
            containerWidth="w-full"
          />
          <FilterDropdown
            label="Select Pricing Type"
            items={["Free", "Paid"]}
            icon={ICONS.downArrow}
            onSelect={handleSelectPricingType}
            selectedData={selectedPricingType}
            classNames="px-4 py-3 text-base rounded-md w-full 2xl:w-[200px] gap-3"
            containerWidth="w-full"
          />
          <Button
            variant="normal"
            className="px-6 py-[10px] w-full xl:w-fit text-nowrap"
            onClick={handleResetFilters}
          >
            Reset Filter
          </Button>
        </div>
      </div>



      <div className="my-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
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
        ) : skillProgrammes?.length < 1 ? (
          <NoDataFound message="No Course Available" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {skillProgrammes?.map((skillProgramme: any) => (
              <CourseCard
                key={skillProgramme?._id}
                courseName={skillProgramme?.skillProgrammeName}
                thumbnail={skillProgramme?.thumbnail?.url}
                courseOverview={skillProgramme?.programmeOverview}
                pricingType={skillProgramme?.pricingType}
                fee={skillProgramme?.fee}
                href={`/skill-programmes/${skillProgramme?._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllSkillProgrammes;
