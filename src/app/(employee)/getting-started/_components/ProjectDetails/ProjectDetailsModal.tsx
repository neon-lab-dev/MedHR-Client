"use client";
import Button from "@/components/Button";
import Modal from "@/components/Reusable/Modal/Modal";
import TextArea from "@/components/Reusable/TextArea/TextArea";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { TProjectDetails } from "../../page";
import { useEffect, useState } from "react";

type TProjectDetailsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: TProjectDetails) => void;
  defaultValues?: TProjectDetails;
};

const ProjectDetailsModal: React.FC<TProjectDetailsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  defaultValues,
}) => {
  const [formValues, setFormValues] = useState<TProjectDetails>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    link: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (field: keyof TProjectDetails, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAdd = () => {
    onSubmit({ ...formValues });
    setFormValues({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    });
  };
  return (
    <Modal
      heading="Add project details"
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
            label="Project Title"
            placeholder="eg.,  Online Gaming App"
            value={formValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <TextArea
            label="Project Description"
            placeholder="You can write about what was the goal of this project? How did you develop this project? and What are some important features of the project?"
            cols={4}
            rows={4}
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextInput
            label="Project Link"
            placeholder="eg.,  Link Here"
            value={formValues.link}
            onChange={(e) => handleChange("link", e.target.value)}
          />
          <div className="flex items-center gap-5">
            <TextInput
              label="Start Date"
              type="date"
              value={formValues.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <TextInput
              label="End Date"
              type="date"
              value={formValues.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <Button
            type="button"
            variant="natural"
            className="px-6 py-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleAdd}
            type="button"
            variant="normal"
            className="px-6 py-3"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectDetailsModal;
