"use client";
// import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Auth({ closeModal }: { closeModal: () => void }) {
  // const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    // <div>
    <Swiper allowTouchMove={false}>
      <SwiperSlide>
        <LoginForm closeModal={closeModal} />
      </SwiperSlide>
      <SwiperSlide>
        <SignUpForm closeModal={closeModal} />
      </SwiperSlide>
    </Swiper>
    // </div>
  );
}

// return (
//   <div>
//     {isLogin ? (
//       <LoginForm setIsLogin={setIsLogin} />
//     ) : (
//       <SignUpForm setIsLogin={setIsLogin} />
//     )}
//   </div>
// );
