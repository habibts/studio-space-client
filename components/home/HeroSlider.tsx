"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80",
    subtitle: "DISCOVER YOUR NEXT ADVENTURE",
    title: "Find Your Perfect Creative Space",
    description:
      "Discover professional studios designed for photography, video production, and creative projects.",
    primaryButton: "Explore Studios",
    secondaryButton: "Host Your Space",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80",
    subtitle: "FIND YOUR PERFECT GETAWAY",
    title: "Bring Your Creative Vision to Life",
    description:
      "From podcast rooms to music suites, find everything you need to create something amazing.",
    primaryButton: "Explore Studios",
    secondaryButton: "Host Your Space",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1920&q=80",
    subtitle: "SHARE YOUR SPACE WITH THE WORLD",
    title: "Your Space. Your Creativity. Your Story.",
    description:
      "Book inspiring creative spaces and turn your ideas into reality.",
    primaryButton: "Explore Studios",
    secondaryButton: "Host Your Space",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        className="hero-swiper h-[600px] w-full md:h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex h-full w-full items-center">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
                <div className="max-w-3xl text-white">
                  <p className="mb-5 text-sm font-semibold tracking-[0.25em] text-white/80">
                    {slide.subtitle}
                  </p>

                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mb-9 max-w-xl text-base leading-7 text-white/85 md:text-lg">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-full bg-[#16A1BF] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#12849D]"
                    >
                      {slide.primaryButton}
                      <ArrowRight className="size-4" />
                    </Link>

                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-full border border-white px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
                    >
                      {slide.secondaryButton}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          className="hero-prev absolute left-5 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:left-10"
        >
          <ChevronLeft className="size-6" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="hero-next absolute right-5 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:right-10"
        >
          <ChevronRight className="size-6" />
        </button>
      </Swiper>

      {/* Pagination Styling */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 10px;
          background: #16a1bf;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}