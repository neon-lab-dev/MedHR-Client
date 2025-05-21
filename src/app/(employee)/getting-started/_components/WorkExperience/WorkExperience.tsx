"use client"
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import WorkExperienceModal from "./WorkExperienceModal";
import { TWorkExperience } from "../../page";

type TWorkExperienceProps = {
  onChange: Dispatch<SetStateAction<TWorkExperience[]>>;
};
const WorkExperience:React.FC<TWorkExperienceProps> = ({
  onChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workExperience, setWorkExperience] = useState<TWorkExperience[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = (data: TWorkExperience) => {
    const updatedList =
      editingIndex !== null
        ? workExperience.map((item, i) => (i === editingIndex ? data : item))
        : [...workExperience, data];

    setWorkExperience(updatedList);
    onChange(updatedList);
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedList = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedList);
    onChange(updatedList);
  };
  
    return (
        <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Work Experience</h1>
      {/* Work experience card */}
      <div className="flex flex-col gap-5">
      {
        workExperience?.length > 0 ?
        workExperience?.map((experience, index:number) => 
          <div key={index} className="p-5 rounded-2xl bg-white border focus:outline-none focus:border-primary-500 transition duration-300 border-neutral-300 flex flex-col">
              <div className="flex items-center justify-between">
                <h1 className="text-secondary-930 text-lg font-extrabold">{experience?.designation} @{experience?.companyName}, {experience?.companyLocation}</h1>
                <div className="flex items-center gap-5">
                  <Image
                    src={ICONS.penResume}
                    alt="pen-icon"
                    className="size-5 cursor-pointer"
                    onClick={() => handleEdit(index)}
                  />
                  <Image
                    src={IMAGES.bin}
                    alt="trash-bin-icon"
                    className="size-5 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-1">
                <p className="text-neutral-500">
                  <strong>From</strong> {experience?.startDate} -  <strong>To</strong> {experience?.endDate} | {experience?.workType}
                </p>
                <p className="text-neutral-500">
                {experience?.description}
                </p>
              </div>
            </div>
        )
        :
        <div className="p-5 rounded-2xl bg-white border border-neutral-300 text-neutral-500">
            No experience added yet.
          </div>
      }
      </div>

      <button onClick={() => setIsModalOpen(!isModalOpen)} type="button" className="flex items-center gap-[6px] text-primary-500 font-semibold cursor-pointer">
        Add Details
        <Image
            src={ICONS.addCircle}
            alt="pen-icon"
            className="size-5 cursor-pointer"
          />
      </button>

      <WorkExperienceModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onSubmit={handleAddOrUpdate}
      defaultValues={
        editingIndex !== null ? workExperience[editingIndex] : undefined
      }
      />
    </div>
    );
};

export default WorkExperience;