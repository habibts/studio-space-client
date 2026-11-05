import { Headphones, Shield, UserCheck, Wrench } from "lucide-react";

const features = [
  { title: "Liability Protection", description: "Enjoy peace of mind with booking-related protection.", icon: Shield },
  { title: "Verified Profiles", description: "Connect with verified hosts and creators.", icon: UserCheck },
  { title: "Equipment Safety", description: "Book spaces with properly maintained equipment.", icon: Wrench },
  { title: "24/7 Host Support", description: "Get assistance whenever you need it.", icon: Headphones },
];

export default function HostGuarantee() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Host Guarantee & <span className="text-[#F59E0B]">Creator Support</span>
        </h2>
        <p className="mt-3 text-[#64748B]">Your safety and success are our priority</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="group rounded-2xl border border-[#F3E8D0] bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B] transition group-hover:bg-[#F59E0B] group-hover:text-foreground">
                <Icon size={26} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-[#64748B]">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}