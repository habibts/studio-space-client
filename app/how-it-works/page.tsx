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
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground">How StudioSpace Works</h1>
          <p className="mt-3 text-muted-foreground">Discover and book creative spaces in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                  <Icon size={26} />
                </div>
                <span className="text-2xl font-bold text-[#F59E0B]/20">0{i + 1}</span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Host Your Space</h2>
        <p className="mb-6 text-muted-foreground">List your studio and reach creative professionals.</p>
        <div className="flex gap-4">
          <Link href="/studios" className="inline-flex items-center gap-2 rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white hover:bg-[#D97706]">
            Explore Studios <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/studios/add-studio" className="inline-flex items-center gap-2 rounded-md border border-[#F59E0B] px-4 py-2 text-sm font-medium text-[#F59E0B] hover:bg-[#F59E0B]/10">
            Host Your Space
          </Link>
        </div>
      </section>
    </main>
  );
}