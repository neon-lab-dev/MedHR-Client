import React, { ReactNode } from 'react';
import Image from 'next/image';
import AddIcon from "@/assets/images/Add Circle.svg";
import CloseIcon from "@/assets/images/Close Circle.svg";

interface ChipProps {
    variant: 'add' | 'close';
    children: ReactNode;
    className?: string;
    onClick? : () => void;
}

const Chip: React.FC<ChipProps> = ({ variant, children , className, onClick}) => {
    const baseStyles = ' pb-[10px] pt-2 rounded-[10px] px-4 font-semibold max-md:px-2';
    
    const variantStyles = {
        add: `bg-secondary-50 text-secondary-600 border border-secondary-200 ${baseStyles}`,
        close: `bg-secondary-700 text-white ${baseStyles}`,
    };

    // Concatenate classes
    const buttonClass = `${variantStyles[variant]} ${className || ''}`.trim();

    // Define the image source based on variant
    const getImageSource = () => {
        switch (variant) {
            case 'add':
                return AddIcon;
            case 'close':
                return CloseIcon;
            default:
                return '';
        }
    };

    return (
            <button onClick={onClick} type="button" className={`flex items-center justify-center gap-2 px-5 py-[10px] text-sm font-medium font-plus-jakarta-sans cursor-pointer ${buttonClass}`}>
                {children}
                <Image src={getImageSource()} alt="Button Icon" className='size-4' />
            </button>
    );
};

export default Chip;
