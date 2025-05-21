import { ICONS } from "@/assets";
import Image from "next/image";

interface GetStartedLayoutProps {
  children: React.ReactNode;
  progress: number;
  goToPreviousStep: () => void;
}
const GetStartedLayout: React.FC<GetStartedLayoutProps> = ({ children, progress, goToPreviousStep }) => {
  return (
    <div className="bg-[#F5F6FA] w-full p-6 max-lg:py-6 max-lg:px-2">
      <div className="bg-white pt-10 mb-10 rounded-2xl mx-32 max-lg:mx-16 max-xl:mx-10 max-md:mx-8 max-sm:mx-2 h-[700px] max-lg:h-full">
        <div className="flex justify-center items-center gap-4 max-lg:gap-1 max-md:gap-1 max-lg:mx-6 max-md:mx-4">
          <Image src={ICONS.leftArrow} alt="" onClick={goToPreviousStep} className='cursor-pointer max-md:w-6 max-lg:w-6' />
          <progress className="progress progress-error w-[700px]  h-[15px] transition-transform duration-300 " value={progress} max="100"></progress>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GetStartedLayout;
