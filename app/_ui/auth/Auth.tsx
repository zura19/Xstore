"use client";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Auth({ closeModal }: { closeModal: () => void }) {
  return (
    <Swiper allowTouchMove={false}>
      <SwiperSlide>
        <LoginForm closeModal={closeModal} />
      </SwiperSlide>
      <SwiperSlide>
        <SignUpForm closeModal={closeModal} />
      </SwiperSlide>
    </Swiper>
  );
}
