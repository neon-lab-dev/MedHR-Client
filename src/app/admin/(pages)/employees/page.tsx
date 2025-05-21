"use client";
import employeesIcon from "@/assets/icons/Employees.svg";
import React, { useCallback, useState } from "react";
import KPICard from "@/components/KPICard";
import EmployeesHired from "@/assets/icons/Employees Hired.svg";
import search from "@/assets/icons/Search.svg";
import Image from "next/image";
import menuDots from "@/assets/icons/menu-dots.svg";
import download from "@/assets/icons/download.svg";
import Table from "@/components/Table";
import { Header } from "../../tableTypes";
import SearchInput from "../../_components/SearchInput";
import DownloadCSVBtn from "../../_components/DownloadCSVBtn";
import eye from "@/assets/icons/eye.svg";
import trash from "@/assets/icons/Trash Bin Trash.svg";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleDeleteEmployeeService,
  handleGetAllEmployeesForAdminService,
} from "@/api/employee";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import debounce from "@/helpers/debounce";

export type DataItem = {
  userName: string;
  email: string;
  phone: string;
  actions: string;
  _id: string;
};

const Employees = () => {
  const [keyword, setKeyword] = useState("");
  const [employeesThatIsDeleting, setEmployeesThatIsDeleting] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, data: employees } = useQuery({
    queryKey: ["admin", "employees", { keyword }],
    queryFn: () => handleGetAllEmployeesForAdminService({ keyword }),
  });

  const debouncedSetKeyword = useCallback(
    debounce((queryParams) => {
      setKeyword(queryParams);
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => {
      setEmployeesThatIsDeleting(id);
      return handleDeleteEmployeeService(id);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["admin", "employees"],
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
    onSettled: () => {
      setEmployeesThatIsDeleting("");
    },
  });

  // Table data
  const headers: Header<DataItem>[] = [
    { header: "Name", accessor: "userName" },
    { header: "Email ID", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderCustomCell = (column: Header<DataItem>, item: DataItem) => {
    if (column.accessor === "actions") {
      return (
        <div key="actions">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              {employeesThatIsDeleting === item.actions && isPending ? (
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
                  href={`/admin/employees/${item.actions}`}
                  className="flex gap-2"
                >
                  <Image src={eye} alt="eye-icon" />
                  <span>View</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    mutate(item.actions);
                  }}
                  disabled={isPending}
                  className="flex gap-2 text-red-500"
                >
                  <>
                    <Image src={trash} alt="eye-icon" />
                    <span>Delete</span>
                  </>
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
    <div className="p-6 flex flex-col gap-[51px]">
      <div className="flex items-center gap-5">
        <KPICard
          image={employeesIcon}
          title="Active Employees"
          value={isLoading ? "..." : employees?.length || 0}
          alt="employees-icon"
        />
      </div>

      <div className="bg-white flex flex-col gap-3 pt-3 rounded-lg">
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
            name="employees"
          />
        </div>

        {isLoading ? (
          <Loading className="h-40" />
        ) : (
          <Table
            className="w-full max-w-full pb-32 !text-base"
            headers={headers}
            data={
              // @ts-ignore
              employees?.map((employee) => ({
                userName: employee.full_name,
                email: employee.email,
                phone: employee.mobilenumber,
                actions: employee._id,
              }))! as DataItem[]
            }
            renderCustomCell={renderCustomCell}
          />
        )}
      </div>
    </div>
  );
};

export default Employees;
