const AddressDetails = ({ addressDetails }: { addressDetails: any }) => {
  const data = [
    {
      title: "Street",
      data: addressDetails?.street,
    },
    {
      title: "City",
      data: addressDetails?.city,
    },
    {
      title: "Post Code",
      data: addressDetails?.postalCode,
    },
    {
      title: "State",
      data: addressDetails?.state,
    },
    {
      title: "Country",
      data: addressDetails?.country,
    },
  ];
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">
        Address Details
      </h1>
      <hr className="border border-[#F7F7F8] w-full" />

      <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5">
        {data.length === 0 ? (
          <p className="text-gray-400">No data added</p>
        ) : (
          <div className="flex justify-between gap-3">
            {data.map((data, index) => (
              <div key={index} className="">
                <h1 className="text-lg font-medium text-[#383842]">
                  {data.title}
                </h1>
                <p className="text-[#717386] mt-2 capitalize">
                  {data.data ? data.data : "Not Set"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressDetails;
