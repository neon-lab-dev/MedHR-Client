"use client";
import searchIcon from "@/assets/icons/search-icon.svg";
import Image from "next/image";
// import locationIcon from "@/assets/icons/location.svg";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SearchFieldComponent = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/jobs?search=${value}`);
  };
  return (
    <>
      <div className="w-full mt-6 mx-auto flex justify-between border-[1.25px] border-primary-500 rounded-[100px] p-2 xl:p-4 bg-white max-w-xl xl:max-w-3xl">
        <form onSubmit={onSubmit} className="flex items-center gap-4">
          <div className="min-w-[40px] h-[40px] xl:min-w-[55px] xl:h-[55px] bg-primary-500 rounded-full flex justify-center items-center">
            <Image
              src={searchIcon}
              alt="search-icon"
              className="w-[20px] xl:w-[30px]"
            />
          </div>
          <input
            type="text"
            className="focus:outline-none w-full"
            placeholder="Job title or keyword"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        {/* <div className="xl:px-5 xl:py-[15px] w-[40px] h-[40px] xl:w-auto xl:h-auto bg-neutral-100 rounded-[125px] flex items-center gap-1 cursor-pointer">
          <Image
            src={locationIcon}
            alt="location-icon"
            className="w-[20px] xl:w-[30px] h-[20px] xl:h-[30px] m-auto"
          />
          <span className="font-plus-jakarta-sans text-xl text-neutral-700 font-normal hidden xl:inline">
            Any Location
          </span>
        </div> */}
      </div>
    </>
  );
};

export default SearchFieldComponent;
