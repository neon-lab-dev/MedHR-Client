"use client";
import { IMAGES } from "@/assets";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const SuccessTab = () => {
  return (
    <div className="flex flex-col items-center gap-9 mt-12 font-plus-jakarta-sans">
      <div>
        <h1 className="text-neutral-950 font-bold text-3xl mb-4 text-center">
        You’re <span className="text-primary-500">One Step</span> Away!
      </h1>
      <p className="text-neutral-700 text-center">Just complete the payment to finalize your profile setup. After a successful payment, you’ll gain full access to your account and dashboard.</p>
      </div>
      <Image src={IMAGES.success} alt="success vector" className="" />
      <Link href="/payment">
        <Button type="button" variant="normal" className="px-6 py-[14px]">
          Proceed to Payment
        </Button>
      </Link>
    </div>
  );
};

export default SuccessTab;
