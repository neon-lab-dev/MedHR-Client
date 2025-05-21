import Image from "next/image";

const HiringPartnerLogo = ({ logo }: { logo: string }) => {
  return (
    <div className="flex items-center justify-center bg-white p-5 rounded-3xl w-[170px] h-[88px] xl:w-[257px] xl:h-[133px] ml-9">
      <Image
        src={logo}
        alt="application"
        width={60}
        height={60}
        className="aspect-square h-10 w-10 xl:h-14 xl:w-14"
      />
    </div>
  );
};

export default HiringPartnerLogo;
