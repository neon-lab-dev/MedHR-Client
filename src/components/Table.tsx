import { Header } from "@/app/admin/tableTypes";
import React from "react";
import { twMerge } from "tailwind-merge";

type TableProps<T> = {
  headers: Header<T>[];
  data: T[];
  renderCustomCell?: (column: Header<T>, item: T) => React.ReactNode;
  className?: string;
};

const Table = <T,>({
  headers,
  data,
  renderCustomCell,
  className,
}: TableProps<T>) => {
  return (
    <div
      className={twMerge(
        `w-full overflow-x-auto overflow-y-visible max-w-[1153px] mx-auto px-4 ${className}`
      )}
    >
      <div className="rounded-[14px] w-full bg-rose-500">
        <table className="table w-full">
          <thead className="bg-secondary-100 w-full text-secondary-800 font-plus-jakarta-sans font-medium">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={
                    index === 0
                      ? "rounded-tl-[14px]"
                      : index === headers.length - 1
                      ? "rounded-tr-[14px]"
                      : ""
                  }
                >
                  {header.header}
                </th>
              ))}
            </tr>
          </thead>
          {!data || data?.length === 0 ? null : (
            <tbody className="bg-white w-full">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="w-full text-neutral-600 font-medium font-plus-jakarta-sans border-t-secondary-100"
                >
                  {headers.map((header, cellIndex) => (
                    <td key={cellIndex}>
                      {renderCustomCell
                        ? renderCustomCell(header, row)
                        : (row[header.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!data ||
          (data?.length === 0 && (
            <div className="text-center text-neutral-600 font-medium font-plus-jakarta-sans h-40 flex items-center justify-center bg-white">
              <span> No data available</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Table;
