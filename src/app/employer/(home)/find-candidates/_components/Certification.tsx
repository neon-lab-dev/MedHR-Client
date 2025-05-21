import { convertDate } from "@/helpers/convertDate";

export type TCertification = {
  _id?: string;
  name?: string;
  issuingOrganization?: string;
  issueDate?: string;
  credentialID?: string;
  credentialURL?: string;
};


const Certification = ({ certifications }: { certifications: TCertification[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">Certifications</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {certifications.length === 0 ? (
        <p className="text-gray-400">No certificate added</p>
      ) : (
        certifications.map((certificate?) => (
          <div
            key={certificate?._id}
            className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex items-center justify-between"
          >
            <div>
            <div className="flex items-center gap-1 capitalize">
              <h1 className="text-lg font-medium text-[#4A4A5A]">{certificate?.name}</h1>
              <p className="text-[#717386]">
                by {certificate?.issuingOrganization}
              </p>
            </div>
              <p className="text-[#717386] mt-[3px]">
              {convertDate(certificate?.issueDate as string)}
              </p>
            </div>
            <a
              href={certificate?.credentialURL}
              target="_blank"
              className="text-[#f9533a] mt-2 underline hover:text-primary-500"
            >
              View Certificate
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default Certification;
