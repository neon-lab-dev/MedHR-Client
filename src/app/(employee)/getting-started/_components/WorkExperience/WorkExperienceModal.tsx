import Button from "@/components/Button";
import Chip from "@/components/Chip";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";
import Modal from "@/components/Reusable/Modal/Modal";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { useState, KeyboardEvent, useEffect } from "react";
import { TWorkExperience } from "../../page";

type TWorkExperienceModalProps = {
  isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (data: TWorkExperience) => void;
    defaultValues?: TWorkExperience;
};
const WorkExperienceModal: React.FC<TWorkExperienceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  defaultValues,
}) => {
  const workTypes = ["Full Time", "Part Time", "Internship"];
  const [inputValue, setInputValue] = useState("");
  const [projectLinks, setProjectLinks] = useState<string[]>([]);

  const [formValues, setFormValues] = useState<TWorkExperience>({
    designation: "",
    companyName: "",
    workType: "",
    startDate: "",
    endDate: "",
    description: "",
    companyLocation: "",
    projectLinks: [],
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, projectLinks }));
  }, [projectLinks]);

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
      setProjectLinks(defaultValues.projectLinks || []);
    }
  }, [defaultValues]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!projectLinks.includes(inputValue.trim())) {
        setProjectLinks((prev) => [...prev, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveLink = (link: string) => {
    setProjectLinks((prev) => prev.filter((l) => l !== link));
  };

  const handleChange = (field: keyof TWorkExperience, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    const finalData = { ...formValues, projectLinks };
    onSubmit(finalData);

    // Reseting after submission
    setFormValues({
      designation: "",
      companyName: "",
      workType: "",
      startDate: "",
      endDate: "",
      description: "",
      companyLocation: "",
      projectLinks: [],
    });
    setProjectLinks([]);
    setInputValue("");
    setIsModalOpen(false);
  };
  return (
    <Modal
      heading="Add Your Work Experience"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        noValidate
      >
      <div className="flex flex-col gap-5 mt-5">
      <TextInput
            label="Designation"
            placeholder="eg.,  Senior Surgen"
            value={formValues.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <TextInput
            label="Company Name"
            placeholder="eg.,  MITRA Consultancy"
            value={formValues.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
          <DropdownInput
            label="Work Type"
            options={workTypes}
            isRequired={false}
            value={formValues.workType}
            onChange={(e) => handleChange("workType", e.target.value)}
          />
          <TextInput
            label="From"
            type="date"
            value={formValues.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            isRequired={false}
          />
          <TextInput
            label="To"
            type="date"
            value={formValues.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
        <TextInput
          label="Company Location"
          placeholder="ex: New York, America"
          value={formValues.companyLocation}
          onChange={(e) => handleChange("companyLocation", e.target.value)}
        />
        <TextArea
          label="Work Description"
          placeholder="What was the project assigned? What was your contribution to the project? What are the some important features of the project."
          cols={2}
          rows={4}
          value={formValues.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div>
          <TextInput
            label="Project Links"
            placeholder="Add link here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            isRequired={false}
          />
          <p className="text-neutral-700 font-medium text-[15px] mt-[6px]">
            Press Enter to add new link*
          </p>
        </div>

        {/* Show projectLinks */}
        {projectLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {projectLinks.map((link) => (
              <Chip
                key={link}
                onClick={() => handleRemoveLink(link)}
                variant="close"
              >
                {link}
              </Chip>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-6">
        <Button type="button" onClick={() => setIsModalOpen(false)} variant="natural" className="px-6 py-3">
          Cancel
        </Button>
        <Button onClick={handleAdd} type="button" variant="normal" className="px-6 py-3">
          Add
        </Button>
      </div>
      </form>
    </Modal>
  );
};

export default WorkExperienceModal;
