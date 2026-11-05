"use client";

import HeroSlider from "@/components/home/HeroSliderClient";
import StudioCategories from "@/components/home/StudioCategories";

import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import HostGuarantee from "@/components/home/HostGuarantee";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    sessionStorage.removeItem("studioSocialLoading");
  }, []);
  return (
    <div>
      <HeroSlider />
      <FeaturedStudios />
      <StudioCategories />
      <HowBookingWorks />
      <HostGuarantee />
    </div>
  );
}
