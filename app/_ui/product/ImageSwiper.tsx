"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import SwiperBtn from "../SwiperBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Iproduct } from "@/models/productModel";

export default function ImageSwiper({
  id,
  title,
  price,
  mainImage,
  images,
  isNew,
  stock,
  discount,
}: {
  id: string;
  title: string;
  price: number;
  discount: number;
  stock: number;
  isNew: boolean;
  category?: string;
  mainImage: string;
  images: [];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const imagesArr: string[] = [
    mainImage,
    ...images,
    // "https://swiperjs.com/demos/images/nature-1.jpg",
    // "https://swiperjs.com/demos/images/nature-2.jpg",
    // "https://swiperjs.com/demos/images/nature-3.jpg",
    // "https://swiperjs.com/demos/images/nature-4.jpg",
    // "https://swiperjs.com/demos/images/nature-5.jpg",
    // "https://swiperjs.com/demos/images/nature-6.jpg",
    // "https://swiperjs.com/demos/images/nature-7.jpg",
    // "https://swiperjs.com/demos/images/nature-8.jpg",
  ];

  // console.log(swiper.);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[500px]  transition-all  duration-300"
    >
      <Swiper
        style={{
          // @ts-expect-error sdf
          // "--swiper-navigation-background-color": "black",
          "--swiper-navigation-size": "24px",
          "--swiper-navigation-color": "black",
          "--swiper-pagination-size": "23px",
        }}
        spaceBetween={10}
        grabCursor={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        // allowTouchMove={false}
        className=" rounded-lg  border border-gray-200"
      >
        <FavoriteBtn
          product={{
            id,
            title,
            price,
            discount,
            stock,
            isNew,
            images,
            mainImage,
          }}
          onCard={false}
          isHovered={true}
        />
        {imagesArr.map((image) => (
          <SwiperSlide key={image} className="pt-[80%]  relative">
            <div className="flex  w-full items-cente object-contain justify-center">
              <Image
                fill
                className="transition-all duration-700 object-contain"
                src={image}
                alt="fd"
              />
            </div>
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
      <Swiper
        // onSlideChange={(swipre) => swiper.slides[swiper.activeIndex];}
        // @ts-expect-error idk
        onActiveIndexChange={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="title-images-swiper thumbs mt-1.5 h-32 rounded-md border border-gray-200 shadow-sm "
      >
        {imagesArr.map((image, index) => (
          <SwiperSlide key={index} className="relative rounded-md px-4">
            <button className={``}>
              <Image
                fill
                className="object-contain rounded-md "
                src={image}
                alt="fd"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
