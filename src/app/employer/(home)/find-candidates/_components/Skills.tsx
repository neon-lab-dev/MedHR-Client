"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateEmployeeProfile } from "@/api/employee";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import Button from "@/components/Button";
import { ICONS } from "@/assets";
import Image from "next/image";

const Skills = ({
  skills,
  isEditable = false,
}: {
  skills: string[];
  isEditable?: boolean;
}) => {
  const [skillList, setSkillList] = useState<string[]>(skills || []);
  const [inputValue, setInputValue] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleAddSkill = async () => {
    const newSkill = inputValue.trim();
    if (!newSkill || skillList.includes(newSkill)) return;

    const updatedSkills = [...skillList, newSkill];
    setIsAdding(true);
    try {
      await updateEmployeeProfile({ skills: updatedSkills });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setSkillList(updatedSkills);
      setInputValue("");
      setShowInput(false);
    } catch (error) {
      console.error("Failed to add skill", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteSkill = async (skill: string) => {
    const updatedSkills = skillList.filter((s) => s !== skill);
    setDeletingSkill(skill);
    try {
      await updateEmployeeProfile({ skills: updatedSkills });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setSkillList(updatedSkills);
    } catch (error) {
      console.error("Failed to delete skill", error);
    } finally {
      setDeletingSkill(null);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#37466D]">Skills</h1>
        {isEditable && (
          <Button
            variant="natural"
            className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
            onClick={() => setShowInput((prev) => !prev)}
          >
            Add More
          </Button>
        )}
      </div>

      <hr className="border border-[#F7F7F8] w-full" />

      {/* Animated Input Field */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showInput ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {showInput && (
          <div className="flex flex-col md:flex-row items-start md:items-end gap-3">
            <div className="flex-1 w-full">
              <TextInput
                label="New Skill"
                placeholder="Type skill and press Enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                isRequired={false}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleAddSkill}
              disabled={isAdding || !inputValue.trim()}
              className="py-4 text-white flex items-center gap-2"
            >
              {isAdding ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Skill List */}
      <div className="flex flex-wrap gap-3 mt-2">
        {skillList.length > 0 ? (
          skillList.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#37466D] rounded-[10px] px-5 py-[10px] text-[#F5F6FA] text-sm font-medium capitalize"
            >
              {skill}
              
              {isEditable && (
                <button
                  className="ml-1 cursor-pointer"
                  onClick={() => handleDeleteSkill(skill)}
                  disabled={deletingSkill !== null}
                >
                  {deletingSkill === skill ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Image
                      src={ICONS.binWhite}
                      alt="delete"
                      className="w-4 h-4"
                    />
                  )}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-[#717386]">No skills added</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
