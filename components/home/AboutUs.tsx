import Image from "next/image";
import { Sparkles, DollarSign, CalendarCheck, Users } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Unique Spaces", description: "Discover diverse creative environments." },
  { icon: DollarSign, title: "Flexible Pricing", description: "Find spaces that match your budget." },
  { icon: CalendarCheck, title: "Easy Booking", description: "Book your preferred studio with ease." },
  { icon: Users, title: "Creative Community", description: "Connect studio hosts with creative professionals." },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#26352B] md:text-4xl">About StudioSpace</h2>
          <p className="text-lg font-medium text-[#05893E]">A Space for Every Creative Vision.</p>
          <p className="text-[#26352B]/70">
            StudioSpace is a peer-to-peer marketplace that connects creative professionals with unique studios and production spaces. Whether you're a photographer, filmmaker, podcaster, or musician, we make it easier to discover and book the perfect space for your creative projects.
          </p>
          <p className="font-medium text-[#26352B]">
            Mission: To make professional creative spaces more accessible, affordable, and convenient for everyone.
          </p>
          <h3 className="text-xl font-semibold text-[#26352B]">Why Choose StudioSpace?</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-[#26352B]/10 bg-[#FAFCFA] p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E]/10 text-[#05893E]">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-semibold text-[#26352B]">{f.title}</h4>
                  <p className="text-sm text-[#26352B]/70">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="Creative studio" fill unoptimized className="object-cover" />
        </div>
      </div>
    </section>
  );
}