import React from 'react';

interface Certification {
  name: string;
  issueDate: string;
  expirationDate: string;
  credentialID: string;
  credentialURL: string;
  issuingOrganization: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <div className="pt-2 pb-10 bg-secondary-50 font-plus-jakarta-sans">
      <div className="max-width flex">
        <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 max-md:mx-4 max-lg:mx-10 mx-[120px] text-center">
          <div className="flex justify-between px-2 py-3 rounded-xl">
            <div className="flex gap-4 items-center">
              <span className="text-4xl text-secondary-700 font-semibold max-md:text-lg">Certifications</span>
            </div>
            {/* <ResumeCertificationModel/> */}
          </div>
          <hr className='pb-10 mx-4' />
          {certifications?.length > 0 ? (
            certifications?.map((certification, index) => (
              <div key={index} className="flex justify-between items-start max-md:items-center border-2 border-neutral-100 p-6 max-md:p-3 rounded-xl mb-4">
                <div className="flex gap-4 items-center">
                  <div className="font-plus-jakarta-sans">
                    <div className="flex gap-2">
                      <div className='flex items-center gap-3 max-md:gap-1'>
                        <span className="text-neutral-950 text-xl font-semibold max-md:text-xs">{certification?.name} from {certification?.issuingOrganization}</span>
                        <span className='text-sm text-neutral-500 max-md:text-xs'>{new Date(certification.issueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-600">No certifications available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Certifications;
