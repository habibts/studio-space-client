import HeroSlider from "@/components/home/HeroSliderClient";
import StudioCategories from "@/components/home/StudioCategories";

import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function Home() {
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
