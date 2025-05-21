import { ICONS } from "@/assets";
import Image from "next/image";

const NoDataFound = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Image
        src={ICONS.noData}
        alt="no-data-ico"
        className="w-[220px] h-[182px]"
      />
      <h1 className="text-neutral-300 text-2xl xl:text-[28px] font-semibold font-plus-jakarta-sans text-center">
        {message}
      </h1>
    </div>
  );
};

export default NoDataFound;
