"use client";
import { getAllSkillProgrammes } from "@/api/skillProgrammes";
import NoDataFound from "@/components/NoDataFound";
import SectionHeading from "@/components/Reusable/SectionHeading/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CourseCard from "./CourseCard";
import { ICONS } from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Container from "@/components/Container";
import Link from "next/link";
import Button from "@/components/Button";

const SkillProgrammes = () => {
  const { data } = useQuery({
    queryKey: ["skillprogrammes"],
    queryFn: getAllSkillProgrammes,
  });

  return (
    <Container>
      <div
        id="skill-programme"
        className="py-section flex flex-col items-center justify-center gap-14"
      >
        <SectionHeading
          highlightedText="Skill"
          normalText="Programmes⚡"
          align="left"
        />
        {data?.skills?.length < 1 ? (
          <NoDataFound message="No Skill Programmes Available" />
        ) : (
          <div className="w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: "#prevSkillProgrammeButton",
                nextEl: "#nextSkillProgrammeButton",
              }}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                360: { slidesPerView: 1 },
                425: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1366: { slidesPerView: 4 },
              }}
              className="w-full mt-10"
            >
              {data?.skills?.map((skillProgramme: any) => (
                <SwiperSlide key={skillProgramme?._id} className="mb-10 w-full">
                  <CourseCard
                    courseName={skillProgramme?.skillProgrammeName}
                    thumbnail={skillProgramme?.thumbnail?.url}
                    courseOverview={skillProgramme?.programmeOverview}
                    pricingType={skillProgramme?.pricingType}
                    fee={skillProgramme?.fee}
                    href={`/skill-programmes/${skillProgramme?._id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                id="prevSkillProgrammeButton"
                className="p-2 rounded-lg bg-white border border-neutral-60 hover:bg-gray-100 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
              >
                <Image
                  src={ICONS.rightArrowDark}
                  alt=""
                  className="size-6 rotate-180"
                />
              </button>
              <button
                id="nextSkillProgrammeButton"
                className="p-2 rounded-lg bg-primary-500 border border-primary-10 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
              >
                <Image src={ICONS.rightArrow2} alt="" className="size-6" />
              </button>
            </div>
          </div>
        )}
        {data?.skills?.length > 0 && (
          <Link href="/skill-programmes">
            <Button variant="normal" className="px-9 py-4">
              View all openings
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default SkillProgrammes;
