import React, { useEffect, useRef, useState } from "react";
import { locationData } from "../../getting-started/_components/Address/locationData";

type TCityProps = {
  selectedCountry: string;
  city: string;
  setCity: (city: string) => void;
};

const City: React.FC<TCityProps> = ({
  selectedCountry,
  city,
  setCity,
}) => {
  const [selectedState, setSelectedState] = useState("");
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const stateRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setIsStateOpen(false);
      }
      if (
        cityRef.current &&
        !cityRef.current.contains(event.target as Node)
      ) {
        setIsCityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const foundCountry = locationData.find(
    (c) => c.countryName === selectedCountry
  );

  if (foundCountry) {
    setStateOptions(foundCountry.states.map((s) => s.state));
  } else {
    setStateOptions([]);
  }

  if (selectedState !== "") {
    setSelectedState(""); // ✅ Only reset if needed
  }

  if (city !== "") {
    setCity(""); // ✅ Prevents infinite loop
  }
}, [selectedCountry]);

useEffect(() => {
  const foundCountry = locationData.find(
    (c) => c.countryName === selectedCountry
  );
  const foundState = foundCountry?.states.find(
    (s) => s.state === selectedState
  );

  if (foundState) {
    setCityOptions(foundState.cities);
  } else {
    setCityOptions([]);
  }

  if (city !== "") {
    setCity(""); // ✅ Only reset city if it’s not already empty
  }
}, [selectedState, selectedCountry]);


  return (
    <div className="flex flex-col gap-6">
      {/* State Dropdown */}
      <div className="flex flex-col gap-[6px]">
        <label className="text-neutral-960 text-base font-medium">State</label>
        <div className="relative" ref={stateRef}>
          <div
            onClick={() => setIsStateOpen((prev) => !prev)}
            className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between cursor-pointer"
          >
            {selectedState || "Select State"}
          </div>
          {isStateOpen && (
            <ul className="absolute left-0 right-0 mt-2 bg-base-100 rounded-box z-10 w-full p-4 shadow flex flex-col gap-4 h-60 overflow-y-auto">
              {stateOptions.map((state, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedState(state);
                    setIsStateOpen(false);
                  }}
                  className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg"
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* City Dropdown */}
      <div className="flex flex-col gap-[6px]">
        <label className="text-neutral-960 text-base font-medium">City</label>
        <div className="relative" ref={cityRef}>
          <div
            onClick={() => setIsCityOpen((prev) => !prev)}
            className="bg-white rounded-xl border border-neutral-650 p-4 text-sm font-normal flex items-center justify-between cursor-pointer"
          >
            {city || "Select City"}
          </div>
          {isCityOpen && (
            <ul className="absolute left-0 right-0 mt-2 bg-base-100 rounded-box z-10 w-full p-4 shadow flex flex-col gap-4 h-60 overflow-y-auto">
              {cityOptions.map((cityOption, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCity(cityOption);
                    setIsCityOpen(false);
                  }}
                  className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg"
                >
                  {cityOption}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default City;
