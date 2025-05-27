"use client";
import React from "react";
import EventCard from "./EventCard";
import NoDataFound from "@/components/NoDataFound";
import SectionHeading from "@/components/Reusable/SectionHeading/SectionHeading";
import Image from "next/image";
import { ICONS } from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/api/events";

export type TEvents = {
  _id: string;
  eventName: string;
  eventUrl: string;
  date: string;
  time: string;
  company: {
    companyName: string;
    companyLocation: string;
    _id: string;
  };
  skillCovered: string[];
  department: string;
  organizationType: string;
  organizerName: string;
  image: {
    fileId: string;
    name: string;
    url: string;
  };
  createdBy: {
    _id: string;
    full_name: string;
    email: string;
  };
  __v: number;
};

const Events = () => {
  const { isLoading, data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  return (
    <div id="events" className="bg-gradient-to-r from-slate-50/30 to-blue-50/50 py-10 relative">
      {/* <Image
        src={IMAGES.linnerBg}
        alt=""
        className="absolute top-0 bottom-0 right-0 left-0 z-0 h-full w-full opacity-10"
      /> */}
      <Container>
        <div className="py-section flex flex-col items-center justify-center gap-14">
          <SectionHeading
            highlightedText="Events"
            normalText="Happening for you!"
            align="left"
          />

          {events?.data?.length < 1 ? (
            <NoDataFound message="No Events Available" />
          ) : (
            <div className="w-full">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  prevEl: "#prevEventButton",
                  nextEl: "#nextEventButton",
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
                  1366: { slidesPerView: 3.8 },
                }}
                className="w-full mt-10 custom-swiper"
              >
                {events?.data?.map((event: TEvents, index: number) => (
                  <SwiperSlide key={index} className="mb-10 w-full">
                    <EventCard isLoading={isLoading} {...event} />
                  </SwiperSlide>
                ))}
              </Swiper>
                {/* Changing the dots color */}
              <style jsx global>{`
                .swiper-pagination-bullet {
                  background-color: #2c364e !important;
                }

                .swiper-pagination-bullet-active {
                  background-color: #f9533a !important;
                }
              `}</style>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  id="prevEventButton"
                  className="p-2 rounded-lg bg-white border border-neutral-60 hover:bg-gray-100 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
                >
                  <Image
                    src={ICONS.rightArrowDark}
                    alt=""
                    className="size-6 rotate-180"
                  />
                </button>
                <button
                  id="nextEventButton"
                  className="p-2 rounded-lg bg-primary-500 border border-primary-10 transition-all duration-300 ease-in-out transform active:scale-95 cursor-pointer"
                >
                  <Image src={ICONS.rightArrow2} alt="" className="size-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Events;
