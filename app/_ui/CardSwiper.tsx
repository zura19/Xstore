import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
// import Link from "next/link";
import SwiperBtn from "./SwiperBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CardSwiper({
  isHovered,
  mainImage,
  images,
}: {
  isHovered: boolean;
  mainImage: string;
  images?: [];
}) {
  const imagesArr: string[] = images ? [mainImage, ...images] : [mainImage];

  return (
    <Swiper
      style={{
        // @ts-expect-error sdf
        "--swiper-navigation-size": "24px",
        "--swiper-navigation-color": "black",
        "--swiper-pagination-size": "23px",
      }}
      spaceBetween={10}
      grabCursor={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // thumbs={{ swiper: thumbsSwiper }}
      modules={[Pagination]}
      // allowTouchMove={false}
      className="myswiper rounded-md  w-full h-52 "
    >
      {imagesArr.map((image) => (
        <SwiperSlide key={image} className="relative   cursor-pointer ">
          {/* <div className="flex  w-full  items-cente object-contain justify-center"> */}
          <Image
            fill
            quality={100}
            className="transition-all object-contain p-1.5  duration-700 "
            src={image}
            alt="fd"
          />
          {/* </div> */}
        </SwiperSlide>
      ))}
      {imagesArr.length <= 1 ? null : (
        <>
          <SwiperBtn type="next" isHovered={isHovered}>
            <IoIosArrowForward size={24} />
          </SwiperBtn>
          <SwiperBtn isHovered={isHovered} type="prev">
            <IoIosArrowBack size={24} />
          </SwiperBtn>
        </>
      )}
    </Swiper>
  );
}
