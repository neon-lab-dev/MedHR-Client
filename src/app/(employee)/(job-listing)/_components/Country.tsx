import React from "react";
import { IMAGES } from "@/assets";
import Image from "next/image";
import { countries } from "../../getting-started/_components/Address/locationData";

type TCountryProps = {
  country: string;
  setCountry: (level: string) => void;
  setSelectedCountry: (level: string) => void;
};

const Country: React.FC<TCountryProps> = ({
  country,
  setCountry,
  setSelectedCountry,
}) => {
  // Experience level
  const handleSelectCountry = (level: string) => {
    setCountry(level);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor="" className="text-neutral-960 text-base font-medium">
        Country
      </label>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between"
        >
          {country ? country : "Select Country"}

          <Image src={IMAGES.arrowDown} alt="arrow-down" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-4 shadow flex flex-col gap-4 h-fit"
        >
          {countries?.map((country, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelectCountry(country);
                setSelectedCountry(country);
              }}
              className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg"
            >
              {country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Country;
