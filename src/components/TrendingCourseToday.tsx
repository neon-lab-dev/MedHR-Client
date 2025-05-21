"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { COURSE_DETAILS } from "@/mockData/course";
import CourseCard from "./CourseCard";
import NoDataFound from "./NoDataFound";
import SectionHeading from "./Reusable/SectionHeading/SectionHeading";
import Image from "next/image";
import { IMAGES } from "@/assets";

const TrendingCourseToday = () => {
  return (
    <div id="trending-today" className="">
      <div className="max-lg:px-4 max-w-full 2xl:max-w-[1300px] mx-auto">
      
      <div className="py-section flex flex-col items-center justify-center gap-14">
      <SectionHeading
        highlightedText="Trending"
        normalText="Today⚡"
        align="left"
      />
      {
        COURSE_DETAILS?.length < 0 ?
        <NoDataFound message="No Course Available" /> :
        <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000, // 3 seconds
            disableOnInteraction: false, // keeps autoplay even after manual swipe
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            375: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 1
            },
            1024: {
              slidesPerView: 1.6
            },
            1280: {
              slidesPerView: 2
            },
          }}>
          {COURSE_DETAILS.map((details, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center w-full mb-16">
              <CourseCard
                courseDetails={details}
                variant={index % 2 === 0 ? "A" : "B"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      }
    </div>
    </div>
    </div>
  );
};

export default TrendingCourseToday;
