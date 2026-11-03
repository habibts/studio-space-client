import Link from "next/link";
import { Search, CalendarCheck, Camera, Star, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover Your Space", description: "Explore unique photography studios, podcast rooms, music suites, and other creative spaces." },
  { icon: CalendarCheck, title: "Book Your Studio", description: "Choose your preferred studio, select your date and time, and submit your booking." },
  { icon: Camera, title: "Create Something Amazing", description: "Bring your creative vision to life in a professional workspace." },
  { icon: Star, title: "Share Your Experience", description: "Enjoy your experience and share your feedback with the creative community." },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#F3FBF4]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#26352B]">How StudioSpace Works</h1>
          <p className="mt-3 text-[#26352B]/70">Discover and book creative spaces in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-2xl border border-[#26352B]/10 bg-[#FAFCFA] p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#05893E]/10 text-[#05893E]">
                  <Icon size={26} />
                </div>
                <span className="text-2xl font-bold text-[#05893E]/20">0{i + 1}</span>
                <h3 className="mb-2 text-lg font-semibold text-[#26352B]">{s.title}</h3>
                <p className="text-sm text-[#26352B]/70">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-[#26352B]">Host Your Space</h2>
        <p className="mb-6 text-[#26352B]/70">List your studio and reach creative professionals.</p>
        <div className="flex gap-4">
          <Link href="/studios" className="inline-flex items-center gap-2 rounded-md bg-[#05893E] px-4 py-2 text-sm font-medium text-white hover:bg-[#047a36]">
            Explore Studios <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/studios/add-studio" className="inline-flex items-center gap-2 rounded-md border border-[#05893E] px-4 py-2 text-sm font-medium text-[#05893E] hover:bg-[#05893E]/10">
            Host Your Space
          </Link>
        </div>
      </section>
    </main>
  );
}