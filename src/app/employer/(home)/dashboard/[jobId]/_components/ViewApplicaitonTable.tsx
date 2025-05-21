import { IMAGES } from '@/assets';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import StatusLabel from "@/components/StatusLabel";
import Link from 'next/link';

const Table = ({ className, formdata, jobId }: { className: string; formdata: { applicants: Array<any> }; jobId: string },) => {
    return (
        <div className={twMerge(`w-full overflow-x-auto h-[700px] max-w-[1300px] mx-auto px-0 ${className}`)}>
            <div className="rounded-[124px]">
                <table className="table w-full">
                    <thead className="bg-secondary-100 w-full text-secondary-800 font-plus-jakarta-sans font-medium">
                        <tr>
                            <th>
                                <div className='flex items-center gap-2 text-lg'>
                                    <Image src={IMAGES.rectangle} alt="Role Icon" />
                                    <span>Role</span>
                                </div>
                            </th>
                            <th>
                                <div className='flex items-center gap-2 text-lg'>
                                    <span>Applied on</span>
                                </div>
                            </th>
                            <th>
                                <div className='flex items-center gap-2 text-lg'>
                                    <span>Status</span>
                                </div>
                            </th>
                            <th>
                                <div className='flex items-center gap-2 text-lg'>
                                    <span>Action</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white w-full">
                        {formdata.applicants.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">No applicants found.</td>
                            </tr>
                        ) : (
                            formdata.applicants.map((applicant: {
                                [x: string]: any; _id: React.Key | null | undefined; status: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; appliedDate: string | number | Date; employer: any;
                            }) => (
                                <tr key={applicant._id}>
                                    <td>
                                        <div className='flex items-center gap-2 text-lg'>
                                            <Image src={IMAGES.rectangle} alt="Role Icon" />
                                            <span>{applicant.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center gap-2 text-lg'>
                                            <span>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex items-center gap-2 text-lg'>
                                            <StatusLabel key={`${applicant._id}-status`} variant='applied'>{applicant.status}</StatusLabel>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='relative flex items-center gap-2 text-lg'>
                                            <Link href={`/employer/dashboard/${jobId}/application/${applicant.employee}`}>
                                                <div className='cursor-pointer'>
                                                    <Image src={IMAGES.view} alt="View Icon" className='w-6' />
                                                </div>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
