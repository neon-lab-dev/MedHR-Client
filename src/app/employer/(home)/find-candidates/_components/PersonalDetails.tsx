const PersonalDetails = ({ personalDetails }: { personalDetails: any }) => {
  const data = [
    {
      title: "Email",
      data: personalDetails?.email,
    },
    {
      title: "Mobile Number",
      data: personalDetails?.mobilenumber,
    },
    {
      title: "Date of Birth",
      data: personalDetails?.dob,
    },
    {
      title: "Designation",
      data: personalDetails?.designation,
    },
  ];
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">
        Personal Details
      </h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* Project card list or fallback */}
      {data.length === 0 ? (
        <p className="text-gray-400">No data added</p>
      ) : (
        <div className="flex justify-between gap-3">
          {data.map((data, index) => (
            <div key={index} className="">
              <h1 className="text-lg font-medium text-[#383842]">
                {data.title}
              </h1>
              <p className="text-[#717386] mt-2">{data.data}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
