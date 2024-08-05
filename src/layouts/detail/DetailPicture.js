import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const DetailPicture = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-[50%]">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 rounded-md overflow-hidden"
      >
        {images.map((item, index) => {
          if (!item || !item.name) {
            console.error("Item or item.name is undefined or null", item);
            return null;
          }
          return (
            <SwiperSlide key={index} className="rounded-md overflow-hidden">
              <div className="h-[350px] flex items-center rounded-md overflow-hidden group">
                <img
                  className="w-full h-full object-fill cursor-pointer transition-all"
                  src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${item.name}`}
                  alt={`Product ${index}`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        {images.map((item, index) => {
          if (!item || !item.name) {
            console.error("Item or item.name is undefined or null", item);
            return null;
          }
          return (
            <SwiperSlide key={index} className="rounded-md overflow-hidden">
              <img
                className="w-full h-full object-fill cursor-pointer transition-all"
                src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${item.name}`}
                alt={`Product thumbnail ${index}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DetailPicture;
