"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateEmployeeProfile } from "@/api/employee";
import Button from "@/components/Button";
import Image from "next/image";
import { ICONS } from "@/assets";

const allInterests = [
  "Allopathy",
  "Ayurveda",
  "Homeopathy",
  "Diagnostic Centers",
  "Imaging Centers",
  "Educational Institution",
];

const OrganizationInterestedIn = ({
  interestedOrganizations,
  isEditable = false,
}: {
  interestedOrganizations: string[];
  isEditable?: boolean;
}) => {
  const [selected, setSelected] = useState<string[]>(
    interestedOrganizations || []
  );
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleToggleSelect = async (value: string) => {
    if (selected.includes(value)) return;

    const updated = [...selected, value];
    setLoading(true);
    try {
      await updateEmployeeProfile({ interestedOrganizations: updated });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setSelected(updated);
      setShowSelector(false);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (value: string) => {
    const updated = selected.filter((item) => item !== value);
    setDeleting(value);
    try {
      await updateEmployeeProfile({ interestedOrganizations: updated });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setSelected(updated);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#37466D] capitalize">
          Interested Organization
        </h1>
        {isEditable && (
          <Button
            variant="natural"
            className="text-base bg-neutral-100 rounded-lg px-6 font-semibold py-2"
            onClick={() => setShowSelector((prev) => !prev)}
          >
            Add More
          </Button>
        )}
      </div>

      <hr className="border border-[#F7F7F8] w-full" />

      {/* Interest Selector */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showSelector ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        {showSelector && (
          <div className="flex flex-wrap gap-2">
            {allInterests.map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded-full text-sm border ${
                  selected.includes(item)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary-100 text-primary-600 hover:bg-primary-200 cursor-pointer"
                }`}
                disabled={selected.includes(item) || loading}
                onClick={() => handleToggleSelect(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected List */}
      <div className="flex flex-wrap gap-3 mt-2">
        {selected.length > 0 ? (
          selected.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-[#37466D] rounded-[10px] px-5 py-[10px] text-[#F5F6FA] text-sm font-medium capitalize"
            >
              {item}
              {isEditable && (
                <button
                  className="ml-1 cursor-pointer"
                  onClick={() => handleDelete(item)}
                  disabled={deleting !== null}
                >
                  {deleting === item ? (
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
          <p className="text-[#717386]">No data added</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationInterestedIn;
