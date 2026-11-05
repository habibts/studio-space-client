import { Search, CalendarCheck, Camera, Star } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover Your Space", description: "Explore unique photography studios, podcast rooms, music suites, and other creative spaces." },
  { icon: CalendarCheck, title: "Book Your Studio", description: "Choose your preferred studio, select your date and time, and submit your booking." },
  { icon: Camera, title: "Create Something Amazing", description: "Bring your creative vision to life in a professional workspace." },
  { icon: Star, title: "Share Your Experience", description: "Enjoy your experience and share your feedback with the creative community." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How It <span className="text-[#F59E0B]">Works</span>
        </h2>
        <p className="mt-3 text-[#64748B]">Your creative journey starts with four simple steps.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative rounded-2xl border border-[#F3E8D0] bg-card p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                <Icon size={26} />
              </div>
              <span className="absolute right-4 top-4 text-2xl font-bold text-[#F59E0B]/20">0{i + 1}</span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-[#64748B]">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}