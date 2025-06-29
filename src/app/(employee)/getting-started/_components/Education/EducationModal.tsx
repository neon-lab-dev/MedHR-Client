import { ICONS } from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextInput from "../../../../../components/Reusable/TextInput/TextInput";
import DropdownInput from "../../../../../components/Reusable/DopdownInput/DropdownInput";
import Button from "@/components/Button";
import Modal from "../../../../../components/Reusable/Modal/Modal";
import { TEducationDetails } from "../../page";

type TEducationModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: TEducationDetails) => void;
  defaultValues?: TEducationDetails;
};

const EducationModal: React.FC<TEducationModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  defaultValues,
}) => {
  const [selectedDesignation, setSelectedDesignation] = useState("11/12th");

  const [formValues, setFormValues] = useState<TEducationDetails>({
    institutionName: "",
    city: "",
    courseName: "",
    grade: "",
    startDate: "",
    endDate: "",
    designationType: "11/12th",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
      setSelectedDesignation(defaultValues.designationType);
    }
  }, [defaultValues]);

  const handleChange = (field: keyof TEducationDetails, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAdd = () => {
    onSubmit({ ...formValues, designationType: selectedDesignation });
    setFormValues({
      institutionName: "",
      city: "",
      courseName: "",
      grade: "",
      startDate: "",
      endDate: "",
      designationType: "11/12th",
    });
    setSelectedDesignation("11/12th");
  };

  const designationTypes = [
    "11/12th",
    "Medical",
    "Paramedical Bachelor's",
    "Paramedical Diploma",
    "Other",
  ];

  const medicalCourses = [
    "Ayurvedic Medicine and Surgery",
    "Dental Surgery",
    "Medicine and Bachelor of Surgery",
    "Naturopathy and Yoga Sciences",
    "Siddha Medicine and Surgery",
    "Unani Medicine and Surgery",
  ];

  const paramedicalBachelorsCourses = [
    "Anaesthesia Technology",
    "Audiology and Speech Therapy",
    "Biomedical Engineering",
    "Biotechnology",
    "Cardiac or Cardiovascular Technology",
    "Dialysis Technology",
    "Healthcare Management",
    "Medical Laboratory Technology",
    "Medical Record Technology",
    "Microbiology",
    "Nursing and Midwifery",
    "Nutrition and Dietetics",
    "Occupational Therapy",
    "Operation Theater Technology",
    "Ophthalmic Technology",
    "Optometry",
    "Physiotherapy",
    "Psychology",
    "Radiography and Medical Imaging",
    "Respiratory Therapy",
    "X-Ray Technology",
  ];

  const paramedicalDiplomaCourses = [
    "Anaesthesia Technology",
    "Dialysis Technology",
    "ECG Technology",
    "Hearing Language and Speech",
    "Medical Laboratory Technology",
    "Medical Record Technology",
    "Nursing Care Assistance",
    "Operation Theatre Technology",
    "Ophthalmic Technology",
    "Physiotherapy",
    "Radiography and Medical Imaging",
    "Sanitary Inspection",
    "X-Ray Technology",
  ];

  const options =
    selectedDesignation === "Medical"
      ? medicalCourses
      : selectedDesignation === "Paramedical Bachelor's"
      ? paramedicalBachelorsCourses
      : selectedDesignation === "Paramedical Diploma"
      ? paramedicalDiplomaCourses
      : [];

  return (
    <Modal
      heading="Designation (Completed/Ongoing)"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <div className="flex items-center gap-6 flex-wrap mt-3">
        {designationTypes.map((designation) => (
          <button
            key={designation}
            type="button"
            onClick={() => setSelectedDesignation(designation)}
            className="flex items-center gap-1 cursor-pointer text-nowrap"
          >
            <Image
              src={
                selectedDesignation === designation
                  ? ICONS.radioButtonChecked
                  : ICONS.radioButtonUnchecked
              }
              alt="radio-icon"
              className="size-5"
            />
            <h1
              className={`${
                selectedDesignation === designation
                  ? "text-neutral-900"
                  : "text-neutral-500"
              } font-medium`}
            >
              {designation}
            </h1>
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <TextInput
            name="institutionName"
            label="Institute Name"
            placeholder="eg., Meenakshi college of engineering"
            value={formValues.institutionName}
            onChange={(e) => handleChange("institutionName", e.target.value)}
          />
          <TextInput
            name="city"
            label="City & State"
            placeholder="eg., Mumbai"
            value={formValues.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {selectedDesignation !== "Other" &&
          selectedDesignation !== "11/12th" ? (
            <DropdownInput
              label="Course"
              options={options}
              value={formValues.courseName}
              onChange={(e: any) => handleChange("courseName", e.target.value)}
            />
          ) : (
            <TextInput
              name="courseName"
              label={selectedDesignation === "11/12th" ? "Stream" : "Course"}
              placeholder={
                selectedDesignation === "11/12th"
                  ? "eg., Science"
                  : "eg., Computer Science"
              }
              value={formValues.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
            />
          )}
          <TextInput
            name="grade"
            label="Grade / Percentage"
            placeholder="eg., 3.85/4"
            value={formValues.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            isRequired={false}
          />
          <TextInput
            name="startDate"
            label="From"
            type="number"
            placeholder="e.g. 2020"
            value={formValues.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />

          <TextInput
            name="endDate"
            label="To"
            type="number"
            placeholder="e.g. 2024"
            value={formValues.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
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
            type="button"
            variant="normal"
            className="px-6 py-3"
            onClick={handleAdd}
          >
            {defaultValues ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EducationModal;
