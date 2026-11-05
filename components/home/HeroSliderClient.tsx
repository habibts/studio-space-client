"use client";
import dynamic from "next/dynamic";
const HeroSlider = dynamic(() => import("@/components/home/HeroSlider"), { ssr: false });
export default HeroSlider;
