"use client";
import StatusCard from "@/components/StatusCard";
import React, { useState, useEffect } from "react";
import Table from "@/components/Table";
import StatusLabel from "@/components/StatusLabel";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleGetAppliedJobsByEmployeeService } from "@/api/employee";
import { useAppSelector } from "@/hooks/store";
import Link from "next/link";
import { handleWithdrawApplicationService } from "@/api/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type Header = {
  header: string;
  accessor: keyof DataItem; // Ensure accessor is a key of DataItem
};

export type DataItem = {
  companyName: string;
  position: string;
  appliedOn: string;
  status: "applied" | "rejected" | "hired" | "interview";
  actions: string;
};

const Applications = () => {
  const { studentProfile, isAuthenticating } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const [jobThatIsBeingWithdrawn, setJobThatIsBeingWithdrawn] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: handleGetAppliedJobsByEmployeeService,
    queryKey: ["applications"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleWithdrawApplicationService,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
    onSettled: () => {
      setJobThatIsBeingWithdrawn("");
    },
  });

  const headers: Header[] = [
    { header: "Company Name", accessor: "companyName" },
    { header: "Position", accessor: "position" },
    { header: "Applied on", accessor: "appliedOn" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderCustomCell = (column: Header, item: DataItem) => {
    if (column.accessor === "status") {
      return (
        // @ts-ignore
        <StatusLabel key="status" variant={item.status.toLocaleLowerCase()}>
          {item.status}
        </StatusLabel>
      );
    }
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown relative">
            {isPending && jobThatIsBeingWithdrawn === item.actions ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <Image
                  tabIndex={0}
                  role="button"
                  src={menuDots}
                  alt="menu-dots-icon"
                  className="cursor-pointer"
                />
                <ul
                  tabIndex={0}
                  className="menu dropdown-content right-0 flex flex-col gap-3 bg-white z-[1] w-[220px] absolute shadow rounded-xl p-4"
                >
                  <li>
                    <Link href={`/jobs/${item.actions}`}>View Job</Link>
                  </li>
                  {item?.status?.toLowerCase() === "applied" && (
                    <li>
                      <button
                        onClick={() => {
                          setJobThatIsBeingWithdrawn(item.actions);
                          mutate(item.actions);
                        }}
                      >
                        Withdraw Application
                      </button>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      );
    }
    return item[column.accessor];
  };

  useEffect(() => {
    if (isAuthenticating) return;
    if (!studentProfile) {
      router.push("/");
    }
  }, [studentProfile, isAuthenticating]);

  return (
    <div className="bg-neutral-100 py-16 flex flex-col gap-[51px]">
      <div>
        <h1 className=" text-secondary-800 text-[28px] font-bold text-center">
          Your
          <span className="bg-primary-500 px-2 text-white ml-3">
            Applications
          </span>
        </h1>
      </div>

      <div className="flex items-center justify-start lg:justify-center gap-5 overflow-x-scroll w-full px-4 md:px-0">
        <StatusCard
          // icon={menuDots}
          variant="Applications"
          title={isLoading ? "..." : data?.length ?? 0}
          label="Total Applications"
        />
        <StatusCard variant="Review" title="0" label="Resume Viewed" />
        <StatusCard variant="Selected" title="0 " label="Selected" />
        <StatusCard variant="Rejected" title="0 " label="Rejected" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <Table
          headers={headers}
          // @ts-ignore
          data={
            data?.map((item) => {
              return {
                companyName: item.companyDetails.companyName,
                position: item.title,
                appliedOn: new Date(
                  item.applicants.find(
                    (app) => app.employee === studentProfile?._id
                  )?.appliedDate ?? ""
                ).toDateString(),
                status: item.applicants.find(
                  (app) => app.employee === studentProfile?._id
                )?.status,
                actions: item._id,
              };
            }) ?? []
          }
          renderCustomCell={renderCustomCell}
          className="pb-32"
        />
      )}
    </div>
  );
};

export default Applications;
