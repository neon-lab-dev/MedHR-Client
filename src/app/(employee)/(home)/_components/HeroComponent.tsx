"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ICONS, IMAGES } from "@/assets";
import FilterDropdown from "@/components/Reusable/FilterDropdown/FilterDropdown";
import Button from "@/components/Button";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import EmploymentTypeFilter from "./EmploymentTypeFilter";

const HeroComponent = () => {
  const router = useRouter();
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<
    string | null
  >(null);
  const [selectedEmploymentTypeCategory, setSelectedEmploymentTypeCategory] =
    useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState< string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  // Handle when Employment Type (Job, Internship, etc.) is selected
  const handleCategorySelect = (category: string) => {
    setSelectedEmploymentType(category);
    setSelectedEmploymentTypeCategory(null);

    if (category === "Job") {
      setCategoryOptions(["Full-Time", "Part-Time", "Contract"]);
    } else if (category === "Internship") {
      setCategoryOptions(["Shadow Internship", "Practice Internship"]);
    } else if (category === "Course") {
      setCategoryOptions(["Certificate", "Diploma", "Bachelor", "Master"]);
    } else if (category === "Skill Programmes") {
      setCategoryOptions([
        "Offline",
        "Online",
        "Fellowship",
        "Scholarships",
        "Events",
      ]);
    } else {
      setCategoryOptions([]);
    }
  };

  const handleEmploymentTypeCategorySelect = (category: string) => {
    setSelectedEmploymentTypeCategory(category);

    // 👇 NEW Scroll behavior based on selected category
    const skillProgrammesCategories = [
      "Offline",
      "Online",
      "Fellowship",
      "Scholarships",
    ];
    const courseCategories = ["Certificate", "Diploma", "Bachelor", "Master"];

    let scrollTargetId = "";

    if (skillProgrammesCategories.includes(category)) {
      router.push("/skill-programmes");
    } else if (courseCategories.includes(category)) {
      router.push("/courses");
    } else if (category === "Events") {
      scrollTargetId = "events";
    }

    if (scrollTargetId) {
      const element = document.getElementById(scrollTargetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle Location Type select
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  // Handle Search button click
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedEmploymentTypeCategory)
      params.set("employmentTypeCategory", selectedEmploymentTypeCategory);
    // if (selectedLocationType) params.set("locationType", selectedLocationType);
    if (selectedLocation) params.set("location", selectedLocation);

    const path =
      selectedEmploymentType?.toLowerCase() === "internship"
        ? "/internship"
        : "/jobs";

    router.push(`${path}?${params.toString()}`);
  };

  // For text animation
  const [text, setText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const fullText = "Health Care";

  useEffect(() => {
    if (inView && !hasAnimated) {
      let index = 0;
      let currentText = "";

      const interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setText(currentText);
          index++;
        } else {
          clearInterval(interval);
          setHasAnimated(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [inView, hasAnimated]);

  const employmentTypeOptions = [
    {
      label: "Job",
      children: ["Full-Time", "Part-Time", "Contract"],
    },
    {
      label: "Internship",
      children: ["Shadow Internship", "Practice Internship"],
    },
    // {
    //   label: "Course",
    //   children: ["Certificate", "Diploma", "Bachelor", "Master"],
    // },
    {
      label: "Skill Programmes",
      children: ["Offline", "Online", "Fellowship", "Scholarships", "Events"],
    },
  ];

  return (
    <div className="pt-[136px] xl:pt-44 pb-28 bg-secondary-50">
      <div className="flex flex-col gap-[40px] xl:gap-28 max-w-7xl mx-auto px-6 2xl:px-0">
        <div className="flex flex-col sm:items-center gap-5 justify-center sm:text-center ">
          {/* Title */}
          <h1
            ref={ref}
            className="text-secondary-950 text-3xl sm:text-4xl lg:text-5xl xl:text-[50px] font-bold leading-10 xl:leading-[70px] tracking-[-1.28px] relative max-w-sm xl:max-w-none sm:max-w-lg md:max-w-3xl text-center"
          >
            <span>Start your career in</span>{" "}
            <span className="highlight text-white">{text}</span>{" "}
            <br className="hidden xl:block" />
            sector with us…
            <Image
              src={IMAGES.hero1}
              alt="hero1"
              width={106}
              height={106}
              quality={100}
              className="absolute h-[48px] w-[48px] xl:h-[106px] xl:w-[106px] -top-16 left-9 xl:-left-48"
            />
            <Image
              src={IMAGES.hero2}
              alt="hero1"
              width={106}
              height={106}
              quality={100}
              className="absolute h-[58px] w-[58px] xl:h-[106px] xl:w-[106px] -top-24 xl:-top-16 right-9 xl:-right-44 rotate-12 xl:rotate-0"
            />
          </h1>
          <p className="text-secondary-600 xl:max-w-3xl text-base sm:text-lg xl:text-xl leading-[126%] max-w-sm md:max-w-3xl font-Poppins text-center">
            Grab the best opportunities from leading healthcare providers, such as internships, jobs, skill programs, courses, and events.
          </p>

          <div className="xl:flex gap-3 items-center justify-center mt-7 hidden z-10">
            <EmploymentTypeFilter
              selectedEmploymentTypeCategory={selectedEmploymentTypeCategory}
              selectedEmploymentType={selectedEmploymentType}
              setSelectedEmploymentType={setSelectedEmploymentType}
              categoryOptions={categoryOptions}
              employmentTypeOptions={employmentTypeOptions}
              handleEmploymentTypeCategorySelect={
                handleEmploymentTypeCategorySelect
              }
              handleCategorySelect={handleCategorySelect}
            />

            <FilterDropdown
              label="Select Country"
              items={["Canada", "Germany", "India"]}
              icon={ICONS.downArrow}
              onSelect={handleCountrySelect}
              selectedData={selectedCountry}
            />

            <LocationSearch
            selectedCountry={selectedCountry}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <Button
              variant="normal"
              className="size-[60px] p-5 rounded-2xl hidden xl:block w-fit"
              onClick={handleSearch}
            >
              <Image src={ICONS.search} alt="search-icon" className="size-6" />
            </Button>
            <Button
              variant="normal"
              className="size-0 w-[300px] xl:w-0 xl:size-[60px] px-5 py-4 rounded-2xl flex xl:hidden items-center justify-center gap-2 mx-auto xl:mx-0"
              onClick={handleSearch}
            >
              <span className="text-white text-base font-medium xl:text-xl block xl:hidden">
                Search
              </span>

              <Image
                src={ICONS.search}
                alt="search-icon"
                className="size-4 xl:size-6"
              />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-center justify-center max-w-[620px] xl:max-w-[1300px] mx-auto mt-7 xl:hidden">
            <EmploymentTypeFilter
              selectedEmploymentTypeCategory={selectedEmploymentTypeCategory}
              selectedEmploymentType={selectedEmploymentType}
              setSelectedEmploymentType={setSelectedEmploymentType}
              categoryOptions={categoryOptions}
              employmentTypeOptions={employmentTypeOptions}
              handleEmploymentTypeCategorySelect={
                handleEmploymentTypeCategorySelect
              }
              handleCategorySelect={handleCategorySelect}
            />

              <FilterDropdown
              label="Select Country"
              items={["Canada", "Germany", "India"]}
              icon={ICONS.downArrow}
              onSelect={handleCountrySelect}
              selectedData={selectedCountry}
            />

            <LocationSearch
            selectedCountry={selectedCountry}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <Button
              variant="normal"
              className="size-[60px] p-5 rounded-2xl hidden xl:block w-fit"
              onClick={handleSearch}
            >
              <Image src={ICONS.search} alt="search-icon" className="size-6" />
            </Button>
            <Button
              variant="normal"
              className="size-0 w-[300px] lg:w-[277px] px-5 py-7 rounded-2xl flex xl:hidden items-center justify-center gap-2 mx-auto"
              onClick={handleSearch}
            >
              <span className="text-white text-base font-medium xl:text-xl block xl:hidden">
                Search
              </span>

              <Image src={ICONS.search} alt="search-icon" className="size-4" />
            </Button>
          </div>

          {/* <SearchField /> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl px-6 py-6 xl:py-8 xl:px-12 gap-3 xl:gap-28 items-center relative">
          {[
            {
              value: "10k+",
              label: "Organizations",
            },
            {
              value: "100k+",
              label: "Aspirants",
            },
            {
              value: "1000+",
              label: "Openings",
            },
            {
              value: "600k+",
              label: "Events",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-2 xl:min-w-[250px]"
            >
              <h4 className="text-[28px] xl:text-4xl font-extrabold bg-landing-stats-heading">
                {item.value}
              </h4>
              <span className="text-woodsmoke-800 text-base font-medium xl:text-xl">
                {item.label}
              </span>
            </div>
          ))}
          <Image
            src={IMAGES.hero3}
            alt="hero1"
            width={84}
            height={84}
            quality={100}
            className="absolute -bottom-20 xl:-top-40 left-6 xl:left-0 h-[61px] w-[61px] xl:h-[84px] xl:w-[84px] -rotate-12"
          />
          <Image
            src={IMAGES.hero4}
            alt="hero1"
            width={84}
            height={84}
            quality={100}
            className="absolute -bottom-24 xl:-top-40 xl:right-0 right-6 h-[61px] w-[61px] xl:h-[84px] xl:w-[84px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
