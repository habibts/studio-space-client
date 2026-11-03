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
        <h2 className="text-3xl font-bold tracking-tight text-[#26352B] md:text-4xl">How It Works</h2>
        <p className="mt-3 text-[#26352B]/70">Your creative journey starts with four simple steps.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative rounded-2xl border border-[#26352B]/10 bg-[#FAFCFA] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#05893E]/10 text-[#05893E]">
                <Icon size={26} />
              </div>
              <span className="absolute right-4 top-4 text-2xl font-bold text-[#05893E]/20">0{i + 1}</span>
              <h3 className="mb-2 text-lg font-semibold text-[#26352B]">{step.title}</h3>
              <p className="text-sm text-[#26352B]/70">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}