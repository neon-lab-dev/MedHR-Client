"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import JobDetailCard from "@/components/JobDetailCard";

const JobCarousel = ({jobs} : {jobs:any[]}) => {
    return (
        <div className="w-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            360: { slidesPerView: 1 },
            375: { slidesPerView: 1 },
            425: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 1.4 },
            1024: { slidesPerView: 2 },
            1366: { slidesPerView: 2.8 },
          }}
          className="w-full mt-10"
        >
          {jobs?.map((details, index) => (
            <SwiperSlide key={index} className="mb-10 w-full">
              <JobDetailCard
                  wrapperClassName="min-w-full md:min-w-[400px] xl:min-w-[500px]"
                  job={details}
                />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default JobCarousel;