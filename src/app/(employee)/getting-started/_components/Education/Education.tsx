"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import EducationModal from "./EducationModal";
import { TEducationDetails } from "../../page";

type TEducationProps = {
  onChange: (education: TEducationDetails[]) => void;
};
const Education: React.FC<TEducationProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationList, setEducationList] = useState<TEducationDetails[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // For adding new details
  const handleAddOrUpdate = (data: TEducationDetails) => {
    const updatedList =
      editingIndex !== null
        ? educationList.map((item, i) => (i === editingIndex ? data : item))
        : [...educationList, data];

    setEducationList(updatedList);
    onChange(updatedList);
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  // For editing the added education details
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  // For deleting the education details
  const handleDelete = (index: number) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    onChange(updatedList);
  };

  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Education</h1>

      {educationList.length > 0 ? (
        educationList.map((edu, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-white border border-neutral-300 flex items-center justify-between"
          >
            <div>
              <h1 className="text-neutral-900 text-xl font-bold">
                {edu.designationType}
              </h1>
              <h1 className="text-neutral-900 text-lg font-medium">
                {edu.institutionName}
              </h1>
              <p className="text-neutral-500 mt-2">
                {edu.courseName} | {edu.grade}
              </p>
              <p className="text-neutral-500">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Image
                src={ICONS.penResume}
                alt="edit-icon"
                className="size-5 cursor-pointer"
                onClick={() => handleEdit(index)}
              />
              <Image
                src={IMAGES.bin}
                alt="delete-icon"
                className="size-5 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="p-5 rounded-2xl bg-white border border-neutral-300 text-neutral-500">
          No education details added yet.
        </div>
      )}

      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingIndex(null);
        }}
        type="button"
        className="flex items-center gap-[6px] text-primary-500 font-semibold cursor-pointer"
      >
        Add Details
        <Image src={ICONS.addCircle} alt="add-icon" className="size-5" />
      </button>

      <EducationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleAddOrUpdate}
        defaultValues={editingIndex !== null ? educationList[editingIndex] : undefined}
      />
    </div>
  );
};

export default Education;
