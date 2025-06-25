import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { TProjectDetails } from "../../page";

type TProjectDetailsProps = {
  onChange: (project: TProjectDetails[]) => void;
};

const ProjectDetails: React.FC<TProjectDetailsProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState<TProjectDetails[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

   // For adding new details
  const handleAddOrUpdate = (data: TProjectDetails) => {
    const updatedList =
      editingIndex !== null
        ? projectList.map((item, i) => (i === editingIndex ? data : item))
        : [...projectList, data];

    setProjectList(updatedList);
    onChange(updatedList);
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  // For editing the added project details
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  // For deleting the education details
  const handleDelete = (index: number) => {
    const updatedList = projectList.filter((_, i) => i !== index);
    setProjectList(updatedList);
    onChange(updatedList);
  };
  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      {/* <h1 className="registration-form-heading mb-4">Project Details</h1> */}
      <h1 className="registration-form-heading mb-4">Any other experience details</h1>
      {/* Project details card */}
      <div className="flex flex-col gap-5">
        {projectList?.length > 0 ? (
          projectList?.map((project, index: number) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border focus:outline-none focus:border-primary-500 transition duration-300 border-neutral-300 flex flex-col capitalize"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-secondary-930 text-lg font-extrabold">
                  {project?.title}
                </h1>
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
              <div className="flex flex-col gap-1 mt-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="text-neutral-500 hover:underline"
                >
                  {project?.link}
                </a>
                <p className="text-neutral-500">
                  {project?.startDate} - {project?.endDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 rounded-2xl bg-white border border-neutral-300 text-neutral-500">
            No project details added yet.
          </div>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        type="button"
        className="flex items-center gap-[6px] text-primary-500 font-semibold cursor-pointer"
      >
        Add Details
        <Image
          src={ICONS.addCircle}
          alt="pen-icon"
          className="size-5 cursor-pointer"
        />
      </button>

      <ProjectDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleAddOrUpdate}
        defaultValues={
          editingIndex !== null ? projectList[editingIndex] : undefined
        }
      />
    </div>
  );
};

export default ProjectDetails;
