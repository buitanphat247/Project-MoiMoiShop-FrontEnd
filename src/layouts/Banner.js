import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { DataPictureBanner } from "../data/ConfigData";

const Banner = () => {
  return (
    <div className="flex gap-x-2 mt-5">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper flex-1"
      >
        {DataPictureBanner.map((item, index) => {
          return (
            <SwiperSlide key={index} className="">
              <img
                className="w-full h-full object-contain cursor-pointer"
                src={process.env.PUBLIC_URL + `/img/${item.name}`}
                alt="Notfound"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col w-[30%] gap-y-2">
        <div className="h-full">
          <img
            className="w-full h-full object-fill cursor-pointer"
            src={process.env.PUBLIC_URL + `/img/side_banner.jpg`}
            alt="Notfound"
          />
        </div>
        <div className=" h-full">
          <img
            className="w-full h-full object-fill cursor-pointer"
            src={process.env.PUBLIC_URL + `/img/side_banner2.jpg`}
            alt="Notfound"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
