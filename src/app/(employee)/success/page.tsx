"use client";
import { ICONS } from "@/assets";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 font-plus-jakarta-sans">
      <Image
        src={ICONS.success2}
        alt="success-icon"
        className="size-32 md:size-60"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2 mt-2">
        Please check your email
      </h1>
      <p className="text-neutral-600 mb-6 max-w-md">
        Course details have been sent to your email. Everything you need to know
        about how to join is written there.
      </p>

      <Link href="http://gmail.com/" target="_blank">
        <Button variant="normal" className="px-6 py-[10px] w-full">
          Go to email
        </Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
