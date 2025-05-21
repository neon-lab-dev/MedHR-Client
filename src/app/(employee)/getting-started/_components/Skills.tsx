"use client";
import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import Chip from "@/components/Chip";

type TSkillsProps = {
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
};

const Skills: React.FC<TSkillsProps> = ({
  selectedSkills,
  setSelectedSkills,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(inputValue.trim())) {
        setSelectedSkills((prev) => [...prev, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Skills</h1>
      <div>
        <TextInput
          name="skills"
          label="Enter your skills"
          placeholder="eg., Design, Adobe, Figma, etc."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          isRequired={false}
        />
        <p className="text-neutral-700 font-medium text-[15px] mt-[6px]">
          Press Enter to add new skill*
        </p>

        {/* Show skills */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedSkills?.map((skill: string) => (
              <Chip
                key={skill}
                onClick={() => handleRemoveSkill(skill)}
                variant="close"
              >
                {skill}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
