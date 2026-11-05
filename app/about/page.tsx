import Link from "next/link";
import { Sparkles, DollarSign, CalendarCheck, Users, ArrowRight } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Unique Spaces", description: "Discover diverse creative environments." },
  { icon: DollarSign, title: "Flexible Pricing", description: "Find spaces that match your budget." },
  { icon: CalendarCheck, title: "Easy Booking", description: "Book your preferred studio with ease." },
  { icon: Users, title: "Creative Community", description: "Connect studio hosts with creative professionals." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">About StudioSpace</h1>
        <p className="mt-2 text-lg font-medium text-[#F59E0B]">A Space for Every Creative Vision.</p>
        <p className="mt-4 max-w-3xl text-foreground/70">
          StudioSpace is a peer-to-peer marketplace that connects creative professionals with unique studios and production spaces. Whether you're a photographer, filmmaker, podcaster, or musician, we make it easier to discover and book the perfect space for your creative projects.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold text-foreground">Our Mission</h2>
            <p className="text-foreground/70">To make professional creative spaces more accessible, affordable, and convenient for everyone.</p>
          </div>
          <div className="rounded-2xl bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold text-foreground">Our Vision</h2>
            <p className="text-foreground/70">A world where every creator can find the perfect space to bring their ideas to life.</p>
          </div>
        </div>
        <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">Why Choose StudioSpace?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-foreground/70">{f.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/studios" className="inline-flex items-center gap-2 rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white hover:bg-[#D97706]">
            Explore Studios <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}