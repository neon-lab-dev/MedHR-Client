"use client";
import React, { useCallback, useState } from "react";
import trash from "@/assets/icons/Trash Bin Trash.svg";
import eye from "@/assets/icons/eye.svg";
import search from "@/assets/icons/Search.svg";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleDeleteJobService } from "@/api/jobs";
import { toast } from "sonner";
import Link from "next/link";
import Loading from "@/components/Loading";
import debounce from "@/helpers/debounce";
import { getAllSkillProgrammes, deleteSkillProgramme } from "@/api/admin";
import { Header } from "../courses/page";
import SearchInput from "@/app/admin/_components/SearchInput";
import Table from "@/components/Table";
import { getAllEmployerSkillProgrammes } from "@/api/employer";

export interface ISkillDataItem {
  name: string;
  programmeType: string;
  applications: string;
  department: string;
  duration: string;
  pricingType: string;
  fee: number;
  postedDate: string;
  actions: string;
}

export interface ISkill {
  _id: string;
  skillProgrammeName: string;
  programmeType: string;
  department: string;
  duration: string;
  pricingType: string;
  fee: number;
  thumbnail: {
    _id: string;
    fileId: string;
    name: string;
    url: string;
  };
  applicants: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SkillProgramme = () => {
  const [jobThatIsBeingDeleted, setJobThatIsBeingDeleted] = useState("");
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["skillprogrammes"],
    queryFn: getAllEmployerSkillProgrammes,
  });

  console.log(data);

  const debouncedSetKeyword = useCallback(
    debounce((queryParams) => {
      setKeyword(queryParams);
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  // Delete skill
  const { mutate: deleteSkill } = useMutation({
    mutationFn: (skillId: string) => deleteSkillProgramme(skillId),
    onMutate: () => {
      toast.loading("Deleting skill...", { id: "delete-skill" });
    },
    onSuccess: () => {
      toast.success("Skill deleted successfully", { id: "delete-skill" });
      queryClient.invalidateQueries({ queryKey: ["skillprogrammes"] });
    },
    onError: (error: string) => {
      toast.error(`Failed to delete skill: ${error}`, { id: "delete-skill" });
    },
  });

  // Delete skill
  const handleDeleteSkill = (skillId: string) => {
    deleteSkill(skillId);
  };

  // Table data
  const headers: Header<ISkillDataItem>[] = [
    { header: "Name", accessor: "name" },
    { header: "Total Applications", accessor: "applications" },
    { header: "Programme Type", accessor: "programmeType" },
    { header: "Department", accessor: "department" },
    { header: "Duration", accessor: "duration" },
    { header: "Pricing Type", accessor: "pricingType" },
    { header: "Fee", accessor: "fee" },
    { header: "Posted Date", accessor: "postedDate" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderCustomCell = (column: Header<ISkillDataItem>, item: ISkillDataItem) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer">
              {jobThatIsBeingDeleted === item.actions ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Image src={menuDots} alt="menu-dots-icon cursor-pointer" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
            >
              <li>
                <a
                  href={`/employer/skill-programmes/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={eye} alt="eye-icon" />
                  <span>Edit</span>
                </a>
              </li>
              <li>
                <a
                  href={`/employer/skill-programmes/${item.actions}/applicants`}
                  className="flex gap-2"
                >
                  <Image src={eye} alt="eye-icon" />
                  <span>View Applications</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleDeleteSkill(item.actions);
                  }}
                  className="flex gap-2 text-red-500"
                >
                  <Image src={trash} alt="eye-icon" />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return item[column.accessor];
  };

  return (
    <div className="bg-neutral-450 p-6 flex flex-col gap-[51px]">
      <div className="bg-white flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-end px-4">
          {/* Download CSV button */}
          <Link
            href={"/employer/create-skill-programme"}
            className="bg-neutral-450 border border-neutral-550 rounded-[10px] font-plus-jakarta-sans text-base font-medium text-secondary-925 px-4 pt-3 pb-[14px]"
          >
            Create Programme
          </Link>
        </div>

        {isLoading ? (
          <Loading className="h-40" />
        ) : (
          <Table
            className="w-full max-w-full pb-32"
            headers={headers}
            data={
              data?.skills?.map((skill: ISkill) => ({
                name: skill.skillProgrammeName,
                programmeType: skill.programmeType,
                applications: skill.applicants?.length,
                department: skill.department,
                duration: skill.duration,
                pricingType: skill.pricingType,
                fee: skill.fee,
                postedDate: new Date(skill.createdAt).toDateString(),
                actions: skill._id,
              })) as ISkillDataItem[]
            }
            renderCustomCell={renderCustomCell}
          />
        )}
      </div>
    </div>
  );
};

export default SkillProgramme;
