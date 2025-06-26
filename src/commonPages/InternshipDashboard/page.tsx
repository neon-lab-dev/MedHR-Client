"use client";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import InternshipTable from "./_components/InternshipTable";

const InternshipDashboard = ({path} :{path: string}) => {
  return (
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-6">
      <div className="flex justify-end">
        <Link href={`${path}/add-new-hiring/internship`}>
          <Button
            className="flex items-center gap-[6px] max-w-[200px] justify-center"
            variant="primary"
          >
            Add New Hiring
            <Image src={ICONS.addCircle} alt="addCircle" />
          </Button>
        </Link>
      </div>

      {/* Display open jobs in a table */}
      <InternshipTable className="w-full max-w-full" path={path} />
    </div>
  );
};

export default InternshipDashboard;
