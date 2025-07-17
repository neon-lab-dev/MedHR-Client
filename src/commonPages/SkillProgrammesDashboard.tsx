 
"use client";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import Loading from "@/components/Loading";
import { deleteSkillProgramme } from "@/api/admin";
import Table from "@/components/Table";
import { IMAGES } from "@/assets";
import { Header } from "./CoursesPageDashboard";

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

const SkillProgrammesDashboard = ({skillProgrammes, isLoading, navigatePath} : {skillProgrammes: any[], isLoading: boolean, navigatePath: string}) => {
  const queryClient = useQueryClient();

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
    { header: "Stream", accessor: "department" },
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
              <Image src={menuDots} alt="menu-dots-icon cursor-pointer" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-neutral-50 border border-neutral-400/10 rounded-box z-[1] w-44 p-2 shadow"
            >
              <li>
                <a
                  href={`${navigatePath}/skill-programmes/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={IMAGES.pen} alt="pen-icon" className="size-4" />
                  <span>Edit</span>
                </a>
              </li>
              <li>
                <a
                  href={`${navigatePath}/skill-programmes/${item.actions}/applicants`}
                  className="flex gap-2"
                >
                  <Image src={IMAGES.view} alt="eye-icon" />
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
                  <Image src={IMAGES.bin} alt="eye-icon" />
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
            href={`${navigatePath}/create-skill-programme`}
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
              skillProgrammes?.map((skill: any) => ({
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

export default SkillProgrammesDashboard;
