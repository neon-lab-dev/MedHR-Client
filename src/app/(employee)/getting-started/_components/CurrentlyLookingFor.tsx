"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { ICONS } from "@/assets";
import Chip from "@/components/Chip";
import Image from "next/image";

type TCurrentlyLookingForProps = {
  onChange: (interests: string[]) => void;
  interestedDepartments: string[];
  setInterestedDepartments: Dispatch<SetStateAction<string[]>>;
  setInterestedCountries: Dispatch<SetStateAction<string[]>>;
  interestedCountries: string[];
};

const CurrentlyLookingFor: React.FC<TCurrentlyLookingForProps> = ({
  onChange,
  interestedDepartments,
  setInterestedDepartments,
  setInterestedCountries,
  interestedCountries,
}) => {
  const interests = ["Internship", "Skill Programs", "Courses", "Jobs"];
  const countries = ["India", "Canada", "Germany"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleAddInterest = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      const updated = [...selectedInterests, interest];
      setSelectedInterests(updated);
      onChange(updated);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    const updated = selectedInterests.filter((i) => i !== interest);
    setSelectedInterests(updated);
    onChange(updated);
  };

  const handleMultiSelect = (
    selected: string[],
    setSelected: (val: string[]) => void,
    value: string
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const filteredInterests = interests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const streams = [
    "For MBBS",
    "For BDS",
    "For BAMS",
    "BHMS",
    "Pharmacy",
    "Nursing",
    "BPT",
    "Medical technologies",
    "BOT",
    "Hospital Administration",
  ];

  return (
    <div className="flex flex-col gap-9 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading">
        What are you currently looking for?
      </h1>

      {/* Search Input */}
      <div className="relative max-w-[633px] w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Select an interest or enter keyword"
          className="pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition duration-300 w-full"
        />
        <Image
          src={ICONS.searchGray}
          alt="search-icon"
          className="size-6 absolute top-4 left-4"
        />
      </div>

      {/* Add Custom Interest */}
      {searchTerm &&
        !interests
          .map((i) => i.toLowerCase())
          .includes(searchTerm.toLowerCase()) &&
        !selectedInterests
          .map((i) => i.toLowerCase())
          .includes(searchTerm.toLowerCase()) && (
          <div>
            <Chip
              variant="add"
              onClick={() => {
                handleAddInterest(searchTerm.trim());
                setSearchTerm("");
              }}
            >
              {`Add "${searchTerm}"`}
            </Chip>
          </div>
        )}

      {/* Selected Interests */}
      <div className="flex flex-wrap gap-2">
        {selectedInterests.length > 0 ? (
          selectedInterests.map((interest) => (
            <Chip
              key={interest}
              onClick={() => handleRemoveInterest(interest)}
              variant="close"
            >
              {interest}
            </Chip>
          ))
        ) : (
          <Chip variant="close">No interest selected</Chip>
        )}
      </div>

      {/* All Interests */}
      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
        {filteredInterests.map((interest) => (
          <Chip
            key={interest}
            onClick={() => handleAddInterest(interest)}
            variant="add"
          >
            {interest}
          </Chip>
        ))}
      </div>

      {/* Multi-select Dropdowns */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Department Dropdown */}
        <div className="w-full">
          <label className="text-sm font-medium mb-1 block">Streams</label>
          <select
            onChange={(e) =>
              handleMultiSelect(
                interestedDepartments,
                setInterestedDepartments,
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-xl py-3 px-4"
            value=""
          >
            <option value="" disabled hidden>
              Select Stream
            </option>
            {streams.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {/* Selected */}
          <div className="mt-2 flex flex-wrap gap-2">
            {interestedDepartments.map((dept: string) => (
              <Chip
                key={dept}
                onClick={() =>
                  setInterestedDepartments(
                    interestedDepartments.filter((d: string) => d !== dept)
                  )
                }
                variant="close"
              >
                {dept}
              </Chip>
            ))}
          </div>
        </div>

        {/* Country Dropdown */}
        <div className="w-full">
          <label className="text-sm font-medium mb-1 block">At Country</label>
          <select
            onChange={(e) =>
              handleMultiSelect(
                interestedCountries,
                setInterestedCountries,
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-xl py-3 px-4"
            value=""
          >
            <option value="" disabled hidden>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {/* Selected */}
          <div className="mt-2 flex flex-wrap gap-2">
            {interestedCountries.map((country: string) => (
              <Chip
                key={country}
                onClick={() =>
                  setInterestedCountries(
                    interestedCountries.filter((c: string) => c !== country)
                  )
                }
                variant="close"
              >
                {country}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyLookingFor;
