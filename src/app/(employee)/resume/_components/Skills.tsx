import React from 'react';
import Chip from '@/components/Chip';

const Skills = ({ skills = [] }) => {
    return (
        <div className="pt-2 pb-10 bg-secondary-50 font-plus-jakarta-sans">
            <div className="max-width flex">
                <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 mx-[120px] max-md:mx-4 text-center">
                    <div className="flex justify-between px-2 py-3 rounded-xl">
                        <div className="flex gap-4 items-center">
                            <span className="text-4xl text-secondary-700 font-semibold">Skills</span>
                        </div>
                        {/* <Chip variant="add" className="w-[140px] items-center">
                            <span>Add New</span>
                        </Chip> */}
                    </div>
                    <hr className='pb-10 mx-4' />
                    <div className="flex justify-start gap-3 flex-wrap items-start border-2 border-neutral-100 p-6 max-md:p-1 rounded-xl">
                        {skills.length > 0 ? (
                            skills.map((skill,id) => (
                                <div key={id} className='flex items-center gap-3'>
                                    <Chip variant="close" className="items-center">
                                        <span>{skill}</span>
                                    </Chip>
                                </div>
                            ))
                        ) : (
                            <div>No skills available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Skills;
