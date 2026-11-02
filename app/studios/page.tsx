"use client";

import { useEffect, useState } from "react";
import StudioCard, { Studio } from "@/components/studios/StudioCard";
import { Skeleton } from "@/components/ui/skeleton";

interface StudiosResponse {
  success: boolean;
  count: number;
  studios: Studio[];
}

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/studios");
        if (!response.ok) {
          throw new Error("Failed to fetch studios");
        }
        const data: StudiosResponse = await response.json();
        if (data.success) {
          setStudios(data.studios || []);
        } else {
          throw new Error("Failed to fetch studios");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching studios"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explore Studios
          </h1>
          <p className="text-muted-foreground">
            Discover creative spaces for your next project
          </p>
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
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              Something went wrong
            </p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && studios.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              No studios available
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
    </main>
  );
}
