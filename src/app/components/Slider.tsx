"use client";
import Image from "next/image";
import "swiper/css";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  return (
    <Swiper
      modules={[Autoplay, Keyboard]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      keyboard={{ enabled: true }}
      loop={true}
    >
      <SwiperSlide>
        <Image
          src="/images/pexels-mart-production-7679456.jpg"
          width={1920}
          height={1080}
          alt="slider 1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/pexels-mart-production-7679456.jpg"
          width={1920}
          height={1080}
          alt="slider 2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/pexels-mart-production-7679456.jpg"
          width={1920}
          height={1080}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/pexels-mart-production-7679456.jpg"
          width={1920}
          height={1080}
          alt="slider 3"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
