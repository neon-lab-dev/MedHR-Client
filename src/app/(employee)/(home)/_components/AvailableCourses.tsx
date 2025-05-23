"use client";
import { getAllCourses } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CourseCard from "./CourseCard";
import NoDataFound from "@/components/NoDataFound";
import SectionHeading from "@/components/Reusable/SectionHeading/SectionHeading";
import { ICONS } from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Container from "@/components/Container";

const AvailableCourses = () => {
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });
  console.log(data);

  return (
    <Container>
      <div
        id="courses"
        className="py-section flex flex-col items-center justify-center gap-14 w-full"
      >
        <SectionHeading
          highlightedText="Courses"
          normalText="For You"
          align="left"
        />
        {data?.courses?.length < 1 ? (
          <NoDataFound message="No Course Available" />
        ) : (
          <div className="w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: "#prevCourseButton",
                nextEl: "#nextCourseButton",
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
              {data?.courses?.map((course: any) => (
                <SwiperSlide key={course?._id} className="mb-16 w-full">
                  <CourseCard
                    courseName={course?.courseName}
                    thumbnail={course?.thumbnail?.url}
                    courseOverview={course?.courseOverview}
                    pricingType={course?.pricingType}
                    fee={course?.fee}
                    href={`/courses/${course?._id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                id="prevCourseButton"
                className="p-2 rounded-lg bg-white border border-neutral-60 hover:bg-gray-100 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
              >
                <Image
                  src={ICONS.rightArrowDark}
                  alt=""
                  className="size-6 rotate-180"
                />
              </button>
              <button
                id="nextCourseButton"
                className="p-2 rounded-lg bg-primary-500 border border-primary-10 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
              >
                <Image src={ICONS.rightArrow2} alt="" className="size-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AvailableCourses;
