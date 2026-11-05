"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import StudioCard, { Studio } from "@/components/studios/StudioCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedStudiosResponse {
  success: boolean;
  count: number;
  studios: Studio[];
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedStudios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://studio-space-server-kduo.vercel.app/featured-studios");
      if (!response.ok) throw new Error("Failed to fetch featured studios");
      const data: FeaturedStudiosResponse = await response.json();
      if (data.success) setStudios((data.studios || []).slice(0, 6));
      else throw new Error("Failed to fetch featured studios");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching featured studios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedStudios();
  }, []);

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Featured <span className="text-[#F59E0B]">Studios</span>
            </h2>
            <p className="text-muted-foreground">
              Discover our handpicked creative spaces for your next project.
            </p>
          </div>
          <Link href="/studios" className="inline-flex items-center gap-2 rounded-md border border-[#F59E0B] bg-[#F59E0B] px-4 py-2 text-sm font-medium text-[#17213B] hover:bg-[#D97706] group">
            Explore All Studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2 p-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              Unable to Load Featured Studios
            </p>
            <p className="text-muted-foreground">
              Something went wrong while loading featured studios.
            </p>
            <button onClick={fetchFeaturedStudios} className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && studios.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              No Featured Studios Yet
            </p>
            <p className="text-muted-foreground">
              There are no featured studios available right now.
            </p>
            <Link href="/studios" className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
              Explore Studios
            </Link>
          </div>
        )}

        {!loading && !error && studios.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
