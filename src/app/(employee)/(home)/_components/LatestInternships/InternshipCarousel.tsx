"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import InternshipCard from "./InternshipCard";

const InternshipCarousel = ({ internships }: { internships: any[] }) => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: "#prevProjectButton",
          nextEl: "#nextProjectButton",
        }}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          360: { slidesPerView: 1 },
          375: { slidesPerView: 1 },
          425: { slidesPerView: 1 },
          640: { slidesPerView: 1.7 },
          768: { slidesPerView: 1.8 },
          1024: { slidesPerView: 2.5 },
          1366: { slidesPerView: 3.7 },
        }}
        className="w-full mt-10"
      >
        {internships?.map((details, index) => (
          <SwiperSlide key={index} className="mb-12 w-full">
            <InternshipCard wrapperClassName="" job={details} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InternshipCarousel;
