"use client";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import SelectDropdown from "@/components/Reusable/SelectDropdown/SelectDropdown";
import Image from "next/image";
import { useEffect, useState } from "react";
import CandidatesTable from "./_components/CandidatesTable";
import { handleGetAllCandidatesService } from "@/api/employer";
import MultiSelectDropdown from "@/components/Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { useQuery } from "@tanstack/react-query";
import ISO6391 from "iso-639-1";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json"; // load English names

countries.registerLocale(enLocale);

const countryList = Object.values(
  countries.getNames("en", { select: "official" })
).sort((a, b) => a.localeCompare(b));

const FindCandidates = () => {
  const [languageList, setLanguageList] = useState<string[]>([]);
  useEffect(() => {
    const sortedLanguages = ISO6391.getAllNames().sort((a, b) =>
      a.localeCompare(b)
    );
    setLanguageList(sortedLanguages);
  }, []);

  const [filters, setFilters] = useState<
    Record<string, string | string[] | null>
  >({});

  const handleSelect = (key: string, value: string) => {
    setFilters((prev) => {
      const existing = prev[key];
      if (
        key === "skills" ||
        key === "language" ||
        key === "currentlyLookingFor" ||
        key === "designationType" ||
        key === "courseName"
      ) {
        const updatedArray = Array.isArray(existing) ? [...existing] : [];
        return {
          ...prev,
          [key]: updatedArray.includes(value)
            ? updatedArray.filter((item) => item !== value)
            : [...updatedArray, value],
        };
      }
      return { ...prev, [key]: value };
    });
  };

  const {
    data: candidates = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["candidates", filters],
    queryFn: () =>
      handleGetAllCandidatesService(filters as Record<string, string | null>),
    enabled: false,
  });

  const handleClearFilter = () => {
    setFilters({});
  };

  const filtersConfig = [
    // {
    //   label: "Gender",
    //   items: ["Male", "Female", "Other"],
    //   icon: ICONS.downArrow,
    //   key: "gender",
    // },
    {
      label: "Type of Organization",
      items: ["Medical", "Paramedical", "Paramedical Diploma", "Other"],
      icon: ICONS.downArrow,
      key: "designationType",
    },
    {
      label: "Type of Department",
      items: [
        // Medical Courses
        "Ayurvedic Medicine and Surgery",
        "Dental Surgery",
        "Medicine and Bachelor of Surgery",
        "Naturopathy and Yoga Sciences",
        "Siddha Medicine and Surgery",
        "Unani Medicine and Surgery",
        // Paramedical Courses
        "Audiology and Speech Therapy",
        "Biomedical Engineering",
        "Biotechnology",
        "Cardiac or Cardiovascular Technology",
        "Healthcare Management",
        "Medical Record Technology",
        "Microbiology",
        "Nursing and Midwifery",
        "Nutrition and Dietetics",
        "Occupational Therapy",
        "Operation Theater Technology",
        "Ophthalmic Technology",
        "Optometry",
        "Physiotherapy",
        "Psychology",
        "Radiography and Medical Imaging",
        "Respiratory Therapy",
        "X-Ray Technology",
        // Paramedical Diploma Courses
        "Anaesthesia Technology",
        "Dialysis Technology",
        "ECG Technology",
        "Hearing Language and Speech",
        "Medical Laboratory Technology",
        "Nursing Care Assistance",
        "Sanitary Inspection",
      ],

      icon: ICONS.downArrow,
      key: "courseName",
    },
    {
      label: "Interested In",
      items: [
        "Shadow Internship",
        "Practice Internship",
        "Offline Programs",
        "Online Programs",
        "Fellowship",
        "Scholarships",
        "Events",
        "Certification Course",
        "Diploma Course",
        "Bachelor Degree",
        "Master Degree",
        "Part Time",
        "Full Time",
        "Contract",
      ],
      icon: ICONS.downArrow,
      key: "currentlyLookingFor",
    },
    {
      label: "Country",
      items: countryList,
      icon: ICONS.downArrow,
      key: "country",
    },
    {
      label: "City",
      items: ["New York", "San Francisco", "Chicago", "Remote"],
      icon: ICONS.downArrow,
      key: "city",
    },
    {
      label: "Qualification/Skills",
      items: [
        "Under Graduation",
        "Medical Bachelor Degree",
        "Paramedical Degree",
        "Paramedical Diploma",
        "Nursing",
        "Lab Technologist",
      ],
      icon: ICONS.downArrow,
      key: "skills",
    },
    {
      label: "Language",
      items: languageList,
      icon: ICONS.downArrow,
      key: "language",
    },
    {
      label: "Experience (Years)",
      items: ["1", "2", "3", "4", "5", "6", "7", "8"],
      icon: ICONS.downArrow,
      key: "experience",
    },
    {
      label: "Designation",
      items: ["Student", "Working Professional"],
      icon: ICONS.downArrow,
      key: "designation",
    },
  ];

  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-5 bg-white border border-neutral-550 rounded-xl p-6">
        {/* Search Input */}
        <div className="relative max-w-[633px] w-full">
          <input
            type="text"
            value={filters.keyword ?? ""}
            onChange={(e) => handleSelect("keyword", e.target.value)}
            placeholder="Search by aspirants name"
            className="pl-12 pr-4 py-[14px] border border-[#CAD5E2] rounded-lg focus:outline-none focus:border-primary-500 transition duration-300 w-full"
          />
          <Image
            src={ICONS.searchGray}
            alt="search-icon"
            className="size-6 absolute top-[14px] left-4"
          />
        </div>

        {/* Filter Dropdowns */}
        {filtersConfig.map(({ label, items, icon, key }) =>
          key === "skills" ||
          key === "language" ||
          key === "currentlyLookingFor" ||
          key === "designationType" ||
          key === "courseName" ? (
            <MultiSelectDropdown
              key={key}
              label={label}
              items={items}
              icon={icon}
              selectedData={Array.isArray(filters[key]) ? filters[key]! : []}
              onSelect={(item: string) => handleSelect(key, item)}
            />
          ) : (
            <SelectDropdown
              key={key}
              label={label}
              items={items}
              icon={icon}
              onSelect={(value: string) => handleSelect(key, value)}
              selectedData={filters[key] as string | null}
            />
          )
        )}

        {/* Buttons */}
        <Button
          variant="muted"
          className="px-5 py-[14px] rounded-xl w-fit max-w-[182px] flex items-center gap-3"
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
        <Button
          variant="normal"
          className="px-5 py-[14px] rounded-xl w-fit max-w-[182px] flex items-center gap-3"
          onClick={refetch}
        >
          <Image src={ICONS.search} alt="search-icon" className="size-6" />
          Show Results
        </Button>
      </div>

      <CandidatesTable
        className="w-full"
        candidates={candidates}
        isLoading={isFetching}
      />
    </div>
  );
};

export default FindCandidates;
