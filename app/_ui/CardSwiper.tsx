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
  // images?.length === 0 ? [mainImage] : [mainImage, ...images];

  return (
    // <figure className="relative w-full indicator  h-52">
    // < className=" h-full">
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

{
  /* <div
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
</div>; */
}
