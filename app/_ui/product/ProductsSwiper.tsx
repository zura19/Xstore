"use client";
import React, { useState } from "react";
import SwiperBtn from "../SwiperBtn";
import Card from "../Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
// import { Iproduct } from "@/models/productModel";

export default function ProductSwiper({
  randomProducts,
}: {
  randomProducts: {
    _id: string;
    title: string;
    price: number;
    stock: number;
    new: boolean;
    discount: number;
    brand: string;
    series: string;
    mainImage: string;
    images: [];
    category: string;
    specification: {
      brand: string;
      colors?: string;
      videoCard?: string;
      system: string;
      storage: string;
      ram: string;
    };
  }[];
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // const data = [1, 2, 3, 4, 6];
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=""
    >
      <Swiper
        slidesPerView={4}
        loop={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Thumbs]}
        className="mySwiper"
      >
        {randomProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Card
              id={product._id}
              title={product.title}
              category={product.category}
              stock={product.stock}
              price={product.price}
              isNew={product.new}
              discount={product.discount}
              images={product.images}
              specifications={product.specification}
              mainImage={product.mainImage}
              series={product.series}
            />
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
