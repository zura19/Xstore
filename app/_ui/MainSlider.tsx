"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import SwiperBtn from "./SwiperBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const images = [
  {
    imageLink:
      "https://www.apple.com/v/iphone-16/c/images/overview/product-viewer/iphone/all_colors__flhn5cmb1t26_xlarge.jpg",
    to: "/iphones",
  },

  {
    imageLink:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1730787627/Croma%20Assets/Computers%20Peripherals/Laptop/Images/310946_0_oulrfg.png?tr=w-600",
    to: "/macbooks",
  },

  {
    imageLink:
      // "https://www.apple.com/v/iphone-16/c/images/overview/product-viewer/iphone/all_colors__flhn5cmb1t26_xlarge.jpg",

      "https://www.apple.com/v/airpods-4/b/images/overview/stories/design_airpods_pair__c4zc76vxva82_large.jpg",
    to: "/iphones",
  },
];

export default function MainSlider() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=""
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper   rounded-md  bg-white"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="pt-[40%] cursor-pointer relative">
            <Link href={image.to}>
              <Image
                src={image.imageLink}
                fill
                alt="'sds"
                className={`hover:scale-105 transition-all duration-500 w-full object-contain`}
              ></Image>
            </Link>
          </SwiperSlide>
        ))}
        <SwiperBtn type="next" isHovered={isHovered}>
          <IoIosArrowForward size={24} />
        </SwiperBtn>
        <SwiperBtn isHovered={isHovered} type="prev">
          <IoIosArrowBack size={24} />
        </SwiperBtn>
      </Swiper>
    </div>
  );
}
