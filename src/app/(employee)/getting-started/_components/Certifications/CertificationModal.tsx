"use client"
import Button from "@/components/Button";
import Modal from "@/components/Reusable/Modal/Modal";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { TCertificateDetails } from "../../page";
import { useEffect, useState } from "react";

type TCertificationModalProps = {
   isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (data: TCertificateDetails) => void;
    defaultValues?: TCertificateDetails;
};
const CertificationModal:React.FC<TCertificationModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  defaultValues,
}) => {
  const [formValues, setFormValues] = useState<TCertificateDetails>({
    name: "",
    issuingOrganization: "",
    issueDate: "",
    credentialID: "",
    credentialURL: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (field: keyof TCertificateDetails, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAdd = () => {
    onSubmit({ ...formValues });
    setFormValues({
      name: "",
      issuingOrganization: "",
      issueDate: "",
      credentialID: "",
      credentialURL: "",
    });
  };
    return (
        <Modal
      heading="Add Certificate Details"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        noValidate> 
      <div className="flex flex-col gap-5 mt-5">
      <TextInput
          label="Certificate Name"
          placeholder="eg.,  UI UX Design Certificate"
          value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
        />
      <TextInput
          label="Organization/Institute Name"
          placeholder="eg.,  UI UX Design Certificate"
          value={formValues.issuingOrganization}
            onChange={(e) => handleChange("issuingOrganization", e.target.value)}
        />
        <TextInput
          label="Certificate Link"
          placeholder="Add link here"
          value={formValues.credentialURL}
            onChange={(e) => handleChange("credentialURL", e.target.value)}
        />
        <div className="flex items-center gap-5">
        <TextInput
          label="Certificate ID"
          placeholder="Add link here"
          value={formValues.credentialID}
            onChange={(e) => handleChange("credentialID", e.target.value)}
        />
        
          <TextInput
          label="Issued Date"
          type="date"
          value={formValues.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
        />
        </div>
        
      
      </div>
      <div className="flex items-center gap-3 mt-6">
        <Button onClick={() => setIsModalOpen(false)} type="button" variant="natural" className="px-6 py-3">
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

export default CertificationModal;