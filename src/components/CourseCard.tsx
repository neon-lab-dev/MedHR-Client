import techLogo from "@/assets/images/tech-logo.png";
import tickBlue from "@/assets/icons/tick-blue.svg";
import tickWhite from "@/assets/icons/tick-mark-white.svg";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

type CourseProps = {
  courseDetails: {
    logo: StaticImageData;
    title: string;
    features: string[];
    image: StaticImageData;
  };
  variant: "A" | "B";
};

const CourseCard: React.FC<CourseProps> = ({ courseDetails, variant }) => {
  return (
    <div className="">
      <div
        className={twMerge(`
          ${
            variant === "A"
              ? "bg-gradient-courseCard-blue"
              : "bg-gradient-courseCard-white"
          } 
          w-[329.978px] sm:w-[590.55px] mx-auto h-[187.02px] sm:h-[324px] rounded-[19.583px] sm:rounded-[33.089px] card-border flex relative p-[13.71px] sm:p-[22px]
        `)}
      >
        <div className={`flex flex-col ${variant === "A" ? "gap-[8.81px]" : "gap-[5.87px]"}  sm:gap-[10px]`}>
          <Image
            src={courseDetails.logo}
            alt="search-icon"
            className="w-[62.042px]"
          />

          {variant === "A" ? (
            <h1
              className={twMerge(`
              font-Poppins font-semibold text-[19.583px] sm:text-[33.089px] leading-[20.562px] sm:leading-[34.743px] -tracking-wide 
              ${variant === "A" ? "text-white" : "text-secondary-575"} 
              capitalize
            `)}
            >
              Pay After{" "}
              <span
                className={twMerge(`
                  ${variant === "A" ? "text-warning-50" : "text-secondary-575"}
                `)}
              >
                Placement
              </span>{" "}
              <br />
              Program!
            </h1>
          ) : (
            <h1 className="font-Poppins font-semibold text-[19.583px] sm:text-[33.089px] leading-[20.562px] sm:leading-[34.743px] -tracking-wide   text-secondary-575 capitalize">
              {/* Full Stack Development */}
              {courseDetails.title.length >= 22 ? (
                <span className="w-[324px]">{courseDetails.title}</span>
              ) : (
                <span>{courseDetails.title}</span>
              )}
            </h1>
          )}

          <Image
            src={techLogo}
            alt="search-icon"
            className={`${variant === "A" ? "hidden" : "block w-[70.989px] sm:w-[119.95px]"}`}
          />
          <hr
            style={{
              borderColor:
                variant === "A"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(89, 90, 97, 0.15)",
            }}
            className="h-[1.654px] p-0 m-0"
          />

          <div className="flex flex-col gap-[5.07px] sm:gap-[9px]">
            {courseDetails?.features?.map((feature, index: any) => (
              <div key={index} className="flex items-center gap-[5px]">
                <div
                  className={twMerge(`
                    ${variant === "A" ? "bg-warning-50" : "bg-secondary-575"}
                    size-[11.75px] sm:size-[19.853px] rounded-full flex justify-center items-center
                  `)}
                >
                  <Image
                    src={variant === "A" ? tickBlue : tickWhite}
                    alt="tick-mark"
                    className="size-[5.875px] sm:size-[9.927px]"
                  />
                </div>
                <p
                  className={twMerge(`
                    font-Poppins font-normal text-[7.833px] md:text-[13.236px]
                    ${variant === "A" ? "text-white" : "text-neutral-925"}
                    leading-[13.897px] tracking-tight
                  `)}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <button
            className={twMerge(`
              ${
                variant === "A"
                  ? "bg-white text-secondary-550"
                  : "bg-secondary-525 text-white"
              }
              font-Poppins text-[6.854px] sm:text-[11.581px] font-medium px-[13px] sm:px-[23.162px] py-[6.85px] sm:py-[11.581px] rounded-[5.875px] sm:rounded-[9.927px] w-[68.4px] sm:w-[120px]
            `)}
          >
            View Details
          </button>
        </div>

        {/* <div className='w-full '> */}
        <Image
          src={courseDetails?.image}
          alt="student1"
          className="absolute right-0 bottom-0 w-[125px] sm:w-[244.03px] h-full rounded-[19.583px]"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CourseCard;
