"use client";
import { getAllPayments } from "@/api/admin";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { useQuery } from "@tanstack/react-query";

const Payments = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });

  const headers = [
    { header: "Order Id", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile Number", accessor: "mobilenumber" },
    { header: "Amount", accessor: "amount" },
    { header: "Payment Status", accessor: "paymentStatus" },
    { header: "Paid Date", accessor: "postedDate" },
  ];
  return (
    <div className="bg-neutral-450 p-6 flex flex-col gap-[51px]">
      <div className="bg-white flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-end px-4">
          {isLoading ? (
            <Loading className="h-40" />
          ) : (
            <Table
              className="w-full max-w-full pb-32"
              headers={headers}
              data={
                data?.payments?.map((payment: any) => ({
                  _id: payment._id,
                  name: payment?.paidBy?.full_name,
                  email: payment?.paidBy?.email,
                  mobilenumber: payment?.paidBy?.mobilenumber,
                  amount: payment.amount,
                  paymentStatus: (
                    <span className="text-green-500 bg-green-50 px-2 py-1 rounded-3xl">
                      {payment.paymentStatus}
                    </span>
                  ),
                  postedDate: new Date(payment.createdAt).toDateString(),
                })) as any[]
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
