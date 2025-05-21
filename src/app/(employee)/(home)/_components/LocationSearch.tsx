import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ICONS } from "@/assets";
import { canadianProvincesAndTerritories, germanStates, indianStates } from "../../getting-started/_components/Address/locationData";

const LocationSearch = ({
  selectedCountry,
  selectedLocation,
  setSelectedLocation,
}: {
  selectedCountry: string | null;
  selectedLocation: string | null;
  setSelectedLocation: (location: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropDownRef = useRef<HTMLDivElement>(null);

  const locationsByCountry: Record<string, string[]> = {
    India: indianStates,
    Canada: canadianProvincesAndTerritories,
    Germany: germanStates
  };

  const locationOptions = selectedCountry ? locationsByCountry[selectedCountry] || [] : [];

  const filteredItems = search.trim()
    ? locationOptions.filter((state) =>
        state.toLowerCase().startsWith(search.toLowerCase())
      )
    : locationOptions;

  const handleSelect = (item: string) => {
    setSelectedLocation(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropDownRef} className="relative mx-auto w-fit text-white">
      <form
        onClick={() => {
          if (selectedCountry !== null) {
            setOpen((prev) => !prev);
          }
        }}
        
        className="px-6 py-5 bg-white shadow-secondary-button flex items-center justify-between text-neutral-700 text-xl leading-6 rounded-2xl w-[300px] lg:w-[277px] cursor-pointer 
        transition-all duration-300 ease-in-out transform active:scale-95"
      >
        {open ? (
          <input
            type="text"
            className="focus:outline-none w-full "
            placeholder="Enter location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        ) : (
          <h1>{selectedLocation || "Select State"}</h1>
        )}
        <Image src={ICONS.location} alt="location-icon" className="size-6" />
      </form>

      <div
        className={`${
          open ? "visible bg-white shadow-secondary-button" : "invisible"
        } absolute top-12 z-50 w-full flex flex-col gap-2 p-3 rounded-b-2xl h-64 overflow-y-auto`}
      >
        {
          filteredItems?.length < 1 ?
          <p className="text-neutral-700 text-sm">No state found</p>
            :
        filteredItems.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium cursor-pointer text-nowrap"
          >
            <input
              type="radio"
              name="location"
              checked={selectedLocation === item}
              onChange={() => handleSelect(item)}
              className="form-radio h-4 w-4 text-primary-500"
              disabled={!selectedCountry}
            />
            {item}
          </label>
        ))
        }
      </div>
    </div>
  );
};

export default LocationSearch;
