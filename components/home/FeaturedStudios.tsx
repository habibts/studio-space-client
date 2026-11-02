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

  useEffect(() => {
    const fetchFeaturedStudios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/featured-studios");
        if (!response.ok) {
          throw new Error("Failed to fetch featured studios");
        }
        const data: FeaturedStudiosResponse = await response.json();
        if (data.success) {
          setStudios((data.studios || []).slice(0, 6));
        } else {
          throw new Error("Failed to fetch featured studios");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching featured studios"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStudios();
  }, []);

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Featured Studios
            </h2>
            <p className="text-muted-foreground">
              Discover our handpicked creative spaces for your next project.
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/studios" className="flex items-center gap-2">
              Explore All Studios
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
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
              Something went wrong
            </p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && studios.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              No featured studios available
            </p>
            <p className="text-muted-foreground">
              Check back later for new creative spaces
            </p>
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
