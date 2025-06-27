"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { convertDate } from "@/helpers/convertDate";
import { updateEmployeeProfile } from "@/api/employee";
import Button from "@/components/Button";
import Image from "next/image";
import { ICONS, IMAGES } from "@/assets";
import EditableAccordionForm from "@/app/(employee)/resume/_components/EditableAccordionForm";
import TextInput from "@/components/Reusable/TextInput/TextInput";

export type TCertification = {
  _id?: string;
  name?: string;
  issuingOrganization?: string;
  issueDate?: string;
  credentialID?: string;
  credentialURL?: string;
};

const Certification = ({
  certifications,
}: {
  certifications: TCertification[];
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TCertification) => {
    setIsLoading(true);
    try {
      const updated = [...certifications];
      if (addMode) {
        updated.push(formData);
      } else if (editIndex !== null) {
        updated[editIndex] = formData;
      }
      await updateEmployeeProfile({ certifications: updated });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setAddMode(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const filtered = certifications.filter((_, i) => i !== index);
      await updateEmployeeProfile({ certifications: filtered });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      // Close edit form if deleting the one open
      if (editIndex === index) setEditIndex(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#37466D]">
          Certifications
        </h1>
        <Button
          variant="natural"
          className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
          onClick={() => {
            setAddMode(!addMode);
            setEditIndex(null);
          }}
        >
          Add More
        </Button>
      </div>

      <hr className="border border-[#F7F7F8] w-full" />

      {certifications.length === 0 ? (
        <p className="text-gray-400">No certificate added</p>
      ) : (
        certifications.map((certificate, index) => (
          <div
            key={certificate._id || index}
            className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1 capitalize">
                  <h1 className="text-lg font-medium text-[#4A4A5A]">
                    {certificate.name}
                  </h1>
                  <p className="text-[#717386]">
                    by {certificate.issuingOrganization}
                  </p>
                </div>
                <p className="text-[#717386] mt-[3px]">
                  {convertDate(certificate.issueDate || "")}
                </p>
                <a
                  href={certificate.credentialURL}
                  target="_blank"
                  className="text-[#f9533a] mt-2 underline hover:text-primary-500"
                >
                  View Certificate
                </a>
              </div>
              <div className="flex gap-4">
                <button
                  className="cursor-pointer text-primary-500 flex items-center gap-[6px]"
                  onClick={() => {
                    setEditIndex((prev) => (prev === index ? null : index));
                    setAddMode(false);
                  }}
                >
                  <Image src={ICONS.penEdit} alt="edit" className="size-4" />
                </button>
                <button
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  <Image src={IMAGES.bin} alt="delete" className="size-4" />
                </button>
              </div>
            </div>

            {/* Accordion edit form */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                editIndex === index
                  ? "max-h-[1000px] opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              {editIndex === index && (
                <EditableAccordionForm
                  defaultValues={certificate}
                  editableFields={[
                    "name",
                    "issuingOrganization",
                    "issueDate",
                    "credentialID",
                    "credentialURL",
                  ]}
                  fieldLabels={{
                    name: "Certification Name",
                    issuingOrganization: "Issuing Organization",
                    issueDate: "Issue Date",
                    credentialID: "Credential ID",
                    credentialURL: "Certificate URL",
                  }}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  customFieldRenderers={{
                    issueDate: (register, errors) => (
                      <TextInput
                        label="Issue Date"
                        type="month"
                        // Use register to bind the input
                        {...register("issueDate")}
                        isRequired={false}
                        error={errors?.issueDate}
                      />
                    ),
                  }}
                />
              )}
            </div>
          </div>
        ))
      )}

      {/* Add new certification accordion */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          addMode ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {addMode && (
          <EditableAccordionForm
            defaultValues={{
              name: "",
              issuingOrganization: "",
              issueDate: "",
              credentialID: "",
              credentialURL: "",
            }}
            editableFields={[
              "name",
              "issuingOrganization",
              "issueDate",
              "credentialID",
              "credentialURL",
            ]}
            fieldLabels={{
              name: "Certification Name",
              issuingOrganization: "Issuing Organization",
              issueDate: "Issue Date",
              credentialID: "Credential ID",
              credentialURL: "Certificate URL",
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            customFieldRenderers={{
              issueDate: (register, errors) => (
                <TextInput
                  label="Issue Date"
                  type="month"
                  {...register("issueDate")}
                  isRequired={false}
                  error={errors?.issueDate}
                />
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Certification;
