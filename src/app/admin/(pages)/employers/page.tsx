"use client";

import React, { useCallback, useState } from "react";
import KPICard from "@/components/KPICard";
import employeesIcon from "@/assets/icons/Employees.svg";
import search from "@/assets/icons/Search.svg";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import download from "@/assets/icons/download.svg";
import Table from "@/components/Table";
import { Header } from "../../tableTypes";
import SearchInput from "../../_components/SearchInput";
import DownloadCSVBtn from "../../_components/DownloadCSVBtn";
import trash from "@/assets/icons/Trash Bin Trash.svg";
import eye from "@/assets/icons/eye.svg";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleDeleteEmployerService,
  handleGetAllEmployersForAdminService,
} from "@/api/employer";
import Link from "next/link";
import Loading from "@/components/Loading";
import debounce from "@/helpers/debounce";

export type DataItem = {
  userName: string;
  email: string;
  companyName: string;
  listingsPosted: string;
  actions: string;
};

const Employers = () => {
  const [employeeThatIsBeingDeleted, setEmployeeThatIsBeingDeleted] =
    useState("");
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, data: employees } = useQuery({
    queryKey: ["admin", "employers", { keyword }],
    queryFn: () => handleGetAllEmployersForAdminService({ keyword }),
  });

  const debouncedSetKeyword = useCallback(
    debounce((queryParams) => {
      setKeyword(queryParams);
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => {
      return handleDeleteEmployerService(id);
    },
    onSuccess: () => {
      toast.success("Employer deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin", "employers"],
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
    onSettled: () => {
      setEmployeeThatIsBeingDeleted("");
    },
  });
  const headers: Header<DataItem>[] = [
    { header: "Name", accessor: "userName" },
    { header: "Email ID", accessor: "email" },
    { header: "Company Name", accessor: "companyName" },
    { header: "Listings Posted", accessor: "listingsPosted" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderCustomCell = (column: Header<DataItem>, item: DataItem) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              {employeeThatIsBeingDeleted === item.actions && isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Image src={menuDots} alt="menu-dots-icon" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
            >
              <li>
                <Link
                  href={`/admin/employers/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={eye} alt="eye-icon" />
                  <span>View</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setEmployeeThatIsBeingDeleted(item.actions);
                    mutate(item.actions);
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
    <div className="bg-[#f5f6fa] p-6 flex flex-col gap-[51px]">
      <div className="flex items-center gap-5">
        <KPICard
          image={employeesIcon}
          title="Active Employees"
          value={isLoading ? "..." : employees?.length || 0}
          alt="employees-icon"
        />
      </div>

      <div className="bg-white flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-between px-4">
          {/* Search field */}
          <SearchInput
            placeholder="Search user"
            icon={search}
            onChange={(e) => {
              debouncedSetKeyword(e.target.value);
            }}
          />

          {/* Download CSV button */}
          <DownloadCSVBtn
            label="Export CSV"
            icon={download}
            data={employees}
            name="employers"
          />
        </div>
        {isLoading ? (
          <Loading className="h-32" />
        ) : (
          <Table
            className="w-full max-w-full pb-32"
            headers={headers}
            // @ts-ignore
            data={employees?.map((employee) => ({
              userName: employee.full_name,
              email: employee.email,
              companyName:
                (employee.companyDetails &&
                  employee.companyDetails[0]?.companyName) ||
                "-",
              listingsPosted: 0, //todo
              actions: employee._id,
            }))}
            renderCustomCell={renderCustomCell}
          />
        )}
      </div>
    </div>
  );
};

export default Employers;
