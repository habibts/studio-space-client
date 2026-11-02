import { Calendar, CheckCircle, Search, Sparkles } from "lucide-react";

const steps = [
  { number: "01", title: "Discover Spaces", description: "Find the perfect creative space for your project.", icon: Search },
  { number: "02", title: "Select Shoot Hours", description: "Choose your preferred studio and booking hours.", icon: Calendar },
  { number: "03", title: "Book Instantly", description: "Submit your booking request easily and quickly.", icon: CheckCircle },
  { number: "04", title: "Create & Produce", description: "Visit your booked studio and bring your creative ideas to life.", icon: Sparkles },
];

export default function HowBookingWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How Booking Works</h2>
        <p className="mt-3 text-muted-foreground">Four simple steps to your perfect creative space</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-amber-500/30">{step.number}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
                  <Icon size={22} />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}