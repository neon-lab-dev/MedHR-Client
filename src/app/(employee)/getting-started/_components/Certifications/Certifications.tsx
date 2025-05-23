"use client";
import { ICONS, IMAGES } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import CertificationModal from "./CertificationModal";
import { TCertificateDetails } from "../../page";

type TCertificationsProps = {
  onChange: (project: TCertificateDetails[]) => void;
};
const Certifications: React.FC<TCertificationsProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<TCertificateDetails[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = (data: TCertificateDetails) => {
    const updatedList =
      editingIndex !== null
        ? certificates.map((item, i) => (i === editingIndex ? data : item))
        : [...certificates, data];

    setCertificates(updatedList);
    onChange(updatedList);
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedList = certificates.filter((_, i) => i !== index);
    setCertificates(updatedList);
    onChange(updatedList);
  };
  
  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Certifications</h1>
      {/* Certificate card */}
      <div className="flex flex-col gap-5">
        {certificates?.length > 0 ? (
          certificates?.map((certificate, index: number) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border focus:outline-none focus:border-primary-500 transition duration-300 border-neutral-300 flex flex-col capitalize"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={certificate?.credentialURL}
                    target="_blank"
                    className="text-secondary-930 text-lg font-extrabold underline hover:text-primary-500 transition duration-300"
                  >
                    {certificate?.name}
                  </a>
                  <p className="text-neutral-500">
                    from - {certificate?.issuingOrganization}
                  </p>
                </div>

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
              <p className="text-neutral-500 mt-2">
                <span className="font-semibold">Issued Date</span> -{" "}
                {certificate?.issueDate} |{" "}
                <span className="font-semibold">Credential ID</span> -{" "}
                {certificate?.credentialID}
              </p>
            </div>
          ))
        ) : (
          <div className="p-5 rounded-2xl bg-white border border-neutral-300 text-neutral-500">
            No certificate added yet.
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

      <CertificationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleAddOrUpdate}
        defaultValues={
          editingIndex !== null ? certificates[editingIndex] : undefined
        }
      />
    </div>
  );
};

export default Certifications;
