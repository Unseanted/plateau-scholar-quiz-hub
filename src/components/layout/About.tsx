
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

import "swiper/css";
import "swiper/css/pagination";

const About = () => {
  return (
    <MainLayout withGradient={true}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto py-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
            Plateau Scholarship Program
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            The Plateau Scholarship Program is more than just financial aid—it is
            a lifeline for students striving to achieve their dreams of higher
            education. Designed with deep concern for the future of Plateau
            State's youth, this program aims to ease the burden of tuition fees,
            accommodation, and academic expenses, ensuring that no deserving
            student is left behind due to financial constraints. Through this
            initiative, the Plateau State Government and educational foundations
            stand in unwavering support of students, empowering them to focus on
            their studies, build their futures, and create a lasting impact on
            their communities.
          </p>
          
          <Link to="/">
            <button className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md mb-8 hover:bg-primary/90 transition-colors">
              Return home
            </button>
          </Link>
        </div>

        {/* Swiper Image Slider */}
        <div className="mt-8">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="w-full max-w-4xl mx-auto"
          >
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/7092350/pexels-photo-7092350.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student 1"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/8423014/pexels-photo-8423014.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student 2"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/6936079/pexels-photo-6936079.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student 3"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
