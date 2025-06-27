"use client";

import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/assets";
import UpdateAddressForm from "@/app/(employee)/resume/_components/UpdateAddressForm";

const AddressDetails = ({ addressDetails }: { addressDetails: any }) => {
  const [showAccordion, setShowAccordion] = useState(false);

  const data = [
    { title: "Street", data: addressDetails?.street },
    { title: "City", data: addressDetails?.city },
    { title: "Post Code", data: addressDetails?.postalCode },
    { title: "State", data: addressDetails?.state },
    { title: "Country", data: addressDetails?.country },
  ];

  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">Address Details</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5">
        {data.length === 0 ? (
          <p className="text-gray-400">No data added</p>
        ) : (
          <div className="flex justify-between gap-3 items-start md:items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
              {data.map((item, index) => (
                <div key={index}>
                  <h1 className="text-lg font-medium text-[#383842]">{item.title}</h1>
                  <p className="text-[#717386] mt-2 capitalize">{item.data || "Not Set"}</p>
                </div>
              ))}
            </div>
            <button
              className="text-primary-500 font-medium flex items-center gap-[6px] cursor-pointer"
              onClick={() => setShowAccordion((prev) => !prev)}
            >
              Edit
              <Image src={ICONS.penEdit} alt="edit" className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Accordion Edit Form */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showAccordion ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <UpdateAddressForm
      defaultValues={addressDetails}
      onClose={() => setShowAccordion(false)}
    />
      </div>
    </div>
  );
};

export default AddressDetails;
