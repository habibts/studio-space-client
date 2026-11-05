import Link from "next/link";
import Image from "next/image";
import { Camera, Film, Mic, Music, Palette } from "lucide-react";

const categories = [
  { title: "Photo Studios", value: "Photo Studio", icon: Camera, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
  { title: "Sound Stages", value: "Sound Stage", icon: Film, image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" },
  { title: "Podcast Rooms", value: "Podcast Room", icon: Mic, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80" },
  { title: "Music Suites", value: "Music Suite", icon: Music, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80" },
  { title: "Art Workshops", value: "Art Workshop", icon: Palette, image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80" },
];

export default function StudioCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#17213B] md:text-4xl">
          Browse by <span className="text-[#F59E0B]">Studio Categories</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Find the perfect space for your creative needs
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.value}
              href={`/studios?category=${encodeURIComponent(c.value)}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B]/90">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}