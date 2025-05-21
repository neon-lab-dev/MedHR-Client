import React from 'react';
import Image from 'next/image';
import applicationIcon from '@/assets/icons/applications.svg';
import hourglass from '@/assets/icons/hourglass.svg';
import checkCircle from '@/assets/icons/check-circle.svg';
import closeCircle from '@/assets/icons/close-circle.svg';


type TStatusCardProps ={
    icon?: any
    title: string | number
    label: string
    variant: 'Applications' | 'Review' | 'Selected' | 'Rejected';
}

const StatusCard: React.FC<TStatusCardProps> = ({variant, icon, title, label}) => {
    let iconSrc = icon;
    if (!icon) {
        switch (variant) {
            case 'Applications':
                iconSrc = applicationIcon;
                break;
            case 'Review':
                iconSrc = hourglass;
                break;
            case 'Selected':
                iconSrc = checkCircle;
                break;
            case 'Rejected':
                iconSrc = closeCircle;
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className='w-[281px] h-[87px] bg-white p-4 rounded-[14px] flex items-center gap-[14px] font-plus-jakarta-sans'>
                <div className='w-12 h-12 p-3 rounded-full border border-primary-100 bg-primary-50 flex justify-center items-center'>
                    <Image src={iconSrc} alt={`${variant}-icon`} className='w-6 h-6'/>
                </div>
                <div className='flex flex-col'>
                    <h1 className="text-secondary-900 text-2xl font-bold -tracking-[0.48px]">{title}</h1>
                    <p className='text-secondary-400 text-lg font-medium -tracking-[0.36px]'>{label}</p>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;