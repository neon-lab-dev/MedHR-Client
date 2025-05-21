import React from 'react';
import { ICONS, IMAGES } from '@/assets';
import Image from 'next/image';
import ResumeEducationModel from './ResumeEducationModel';
import { convertDate } from '@/helpers/convertDate';

interface Education {
  institutionName: string;
  courseName: string;
  designationType: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface EducationComponentProps {
  education: Education[];
}

const EducationComponent: React.FC<EducationComponentProps> = ({ education }) => {
  return (
    <div className="pt-2 pb-10 bg-secondary-50 font-plus-jakarta-sans">
      <div className="max-width flex">
        <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 mx-[120px] max-lg:mx-10 max-md:mx-4 text-center">
          <div className='flex justify-between px-2 py-3 rounded-xl'>
            <div className='flex gap-4 max-md:gap-1 items-center '>
              <span className='text-4xl text-secondary-700 font-semibold max-md:text-lg'>Education Details</span>
            </div>
            {/* <ResumeEducationModel /> */}
          </div>
          <hr className='pb-10 mx-2' />
          {education?.length > 0 ? (
            education?.map((edu, index) => (
              <div key={index} className='flex max-md:flex-col justify-between border-2 border-neutral-100 p-6 rounded-xl mb-4'>
                <div className='flex gap-4 items-center'>
                  <div className='flex-col flex justify-start items-start font-plus-jakarta-sans mb-6 gap-1'>
                    <h1 className='text-neutral-950 text-sm md:text-xl font-semibold'><span className="">{edu?.courseName}</span> in <span className="">{edu?.designationType}</span> | with Grade {edu?.grade}</h1>
                    <div className='flex gap-2'>
                      <span className='text-neutral-950 md:text-lg text-sm font-semibold'><span className="font-medium text-neutral-600">from</span> {edu?.institutionName}</span>
                    </div>
                    <span className='text-neutral-600 md:text-lg text-xs'>{convertDate(edu?.startDate)} - {convertDate(edu?.endDate)}</span>
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No education details available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EducationComponent;
