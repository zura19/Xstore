"use client";
import { ReactNode } from "react";
import { useSwiper } from "swiper/react";

export default function SwiperBtn({
  children,
  type,
  isHovered,
  size,
}: {
  children: ReactNode;
  type: string;
  isHovered: boolean;
  size?: string;
}) {
  const swiper = useSwiper();

  function handleSize() {
    if (size === "small") return " p-1.5 ";
    return " p-2 ";
  }

  return (
    <button
      onClick={() =>
        type === "next" ? swiper.slideNext() : swiper.slidePrev()
      }
      // disabled={type === "next" ? swiper.isEnd : swiper.isBeginning}
      className={`flex items-center justify-center  border-none bg-white rounded-full ${handleSize()}  hover:bg-gray-200 transition-all duration-500 text-brand  aspect-square z-10 `}
      style={
        type === "next"
          ? {
              boxShadow: "0px 0px 20px #00000032",
              opacity: isHovered ? "100%" : "0%",
              position: "absolute",
              top: "50%",
              right: isHovered ? "10px" : "-50px",
              transform: "translateY(-50%)",
            }
          : {
              boxShadow: "0px 0px 20px #00000032",
              opacity: isHovered ? "100%" : "0%",
              position: "absolute",
              top: "50%",
              left: isHovered ? "10px" : "-50px",
              transform: "translateY(-50%)",
            }
      }
    >
      {children}
    </button>
  );
}
