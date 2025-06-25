"use client";
import { useState } from "react";
import { ICONS } from "@/assets";
import Chip from "@/components/Chip";
import Image from "next/image";

type TAreaOfInterestsProps = {
  onChange: (interests: string[]) => void;
};

const AreaOfInterests: React.FC<TAreaOfInterestsProps> = ({ onChange }) => {
  // Interests
  const interests = [
    "Allopathy",
    "Ayurveda",
    "Homeopathy",
    "Diagnostic Centers",
    "Imaging Centers",
    "Educational Institution",
  ];

  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddInterest = (interest: string) => {
    if (!selectedInterest.includes(interest)) {
      const updated = [...selectedInterest, interest];
      setSelectedInterest(updated);
      onChange(updated);
      setSearchTerm("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    const updated = selectedInterest.filter((i) => i !== interest);
    setSelectedInterest(updated);
    onChange(updated);
  };

  const filteredInterests = interests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-9 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading">
        Types of <strong>Organization</strong> you are interested in?
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
        !selectedInterest
          .map((i) => i.toLowerCase())
          .includes(searchTerm.toLowerCase()) && (
          <div>
            <Chip
              variant="add"
              onClick={() => handleAddInterest(searchTerm.trim())}
            >
              {`Add "${searchTerm}"`}
            </Chip>
          </div>
        )}

      {/* Selected Interests */}
      <div className="flex flex-wrap gap-2">
        {selectedInterest.length > 0 ? (
          selectedInterest.map((interest) => (
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
    </div>
  );
};

export default AreaOfInterests;
