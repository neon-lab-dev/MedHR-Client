import { IMAGES } from "@/assets";
import Image from "next/image";
import { ReactNode } from "react";

type TModal = {
heading : string;
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal: React.FC<TModal> = ({ heading, children, isModalOpen, setIsModalOpen }) => {
  return (
    <div
      className={`${
        isModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-plus-jakarta-sans`}
    >
      <div
        className={`${
          isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } max-w-[673px] max-h-[550px] w-full h-fit overflow-y-auto bg-white rounded-[28px] p-8 transition-all duration-300`}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="text-neutral-700 font-medium capitalize">{heading}</h1>
          <Image
            src={IMAGES.close}
            alt="cross-icon"
            className="p-2 size-10 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        <div className="w-full flex justify-center flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
