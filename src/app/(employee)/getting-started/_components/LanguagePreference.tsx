"use client";
import { useEffect, useState } from "react";
import ISO6391 from "iso-639-1";
import { ICONS } from "@/assets";
import Chip from "@/components/Chip";
import Image from "next/image";

type TLanguagePreferenceProps = {
  onChange: (languages: string[]) => void;
};

const LanguagePreference: React.FC<TLanguagePreferenceProps> = ({
  onChange,
}) => {
  const [languageList, setLanguageList] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sortedLanguages = ISO6391.getAllNames().sort((a, b) =>
      a.localeCompare(b)
    );
    setLanguageList(sortedLanguages);
  }, []);

  const handleAddLanguage = (language: string) => {
    if (
      language &&
      !selectedLanguages.includes(language) &&
      languageList.includes(language)
    ) {
      const updated = [...selectedLanguages, language];
      setSelectedLanguages(updated);
      onChange(updated);
      setSearchTerm("");
    }
  };

  const handleRemoveLanguage = (language: string) => {
    const updated = selectedLanguages.filter((l) => l !== language);
    setSelectedLanguages(updated);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const matchedLanguage = languageList.find(
        (lang) => lang.toLowerCase() === searchTerm.toLowerCase()
      );
      if (matchedLanguage) {
        handleAddLanguage(matchedLanguage);
      }
    }
  };

  const filteredLanguages = languageList.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-9 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading">
        What Languages do you speak?
      </h1>

      {/* Search Input */}
      <div className="relative max-w-[633px] w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter the languages you speak"
          className="pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition duration-300 w-full"
        />
        <Image
          src={ICONS.searchGray}
          alt="search-icon"
          className="size-6 absolute top-4 left-4"
        />
      </div>

      {/* Selected Languages */}
      <div className="flex flex-wrap gap-2">
        {selectedLanguages.length > 0 ? (
          selectedLanguages.map((lang) => (
            <Chip
              key={lang}
              onClick={() => handleRemoveLanguage(lang)}
              variant="close"
            >
              {lang}
            </Chip>
          ))
        ) : (
          <Chip variant="close">No language selected</Chip>
        )}
      </div>

      {/* All Languages */}
      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
        {filteredLanguages.map((lang) => (
          <Chip
            key={lang}
            onClick={() => handleAddLanguage(lang)}
            variant="add"
          >
            {lang}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default LanguagePreference;
