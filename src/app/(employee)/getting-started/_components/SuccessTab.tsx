import { IMAGES } from "@/assets";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const SuccessTab = () => {
  return (
    <div className="flex flex-col items-center gap-9 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4 text-center">
        Your profile is created successfully
      </h1>
      <Image src={IMAGES.success} alt="success vector" className="" />
      <Link href="/">
        <Button type="button" variant="normal" className="px-6 py-[14px]">
          Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default SuccessTab;
