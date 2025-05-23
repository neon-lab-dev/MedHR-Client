/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image, { StaticImageData } from "next/image";
import { json2csv } from "json-2-csv";
import { toast } from "sonner";
interface DownloadCSVBtnProps {
  label: string;
  icon: StaticImageData;
  data: any;
  name: string;
}

const DownloadCSVBtn: React.FC<DownloadCSVBtnProps> = ({
  label,
  icon,
  data,
  name,
}) => {
  const handleDownloadCSV = async () => {
    try {
      const csv = await json2csv(data);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.csv`;
      a.click();
      toast.success("CSV downloaded successfully");
    } catch (error) {
      toast.error("Error downloading CSV");
    }
  };
  return (
    <div>
      <button
        onClick={handleDownloadCSV}
        className="bg-neutral-450 border border-neutral-550 rounded-[10px] font-plus-jakarta-sans text-base font-medium text-secondary-925 flex items-center gap-2 px-4 pt-3 pb-[14px]"
      >
        {label}
        <Image src={icon} alt="button-icon" className="w-[18px]" />
      </button>
    </div>
  );
};

export default DownloadCSVBtn;
