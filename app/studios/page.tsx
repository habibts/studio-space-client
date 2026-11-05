"use client";

import { useEffect, useState } from "react";
import StudioCard, { Studio } from "@/components/studios/StudioCard";
import { Skeleton } from "@/components/ui/skeleton";

interface StudiosResponse {
  success: boolean;
  count: number;
  studios: Studio[];
}

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function StudiosPage() {
  return (
    <Suspense fallback={null}>
      <StudiosContent />
    </Suspense>
  );
}

function StudiosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = searchParams.get("category");

  const fetchStudios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3001/studios");
      if (!response.ok) throw new Error("Failed to fetch studios");
      const data: StudiosResponse = await response.json();
      if (data.success) setStudios(data.studios || []);
      else throw new Error("Failed to fetch studios");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching studios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const filtered = category
    ? studios.filter((s) => s.category === category)
    : studios;

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.replace(`/studios${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Explore <span className="text-[#F59E0B]">Studios</span>
          </h1>
          <p className="text-[#64748B]">
            Discover creative spaces for your next project
          </p>
        </div>

        {category && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Filtering by: <span className="font-medium text-foreground">{category}</span>
            </span>
            <button
              onClick={clearCategory}
              className="text-sm font-medium text-amber-500 hover:text-amber-600"
            >
              Clear
            </button>
          </div>
        )}
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
              Unable to Load Studios
            </p>
            <p className="text-muted-foreground">
              Something went wrong while loading studios.
            </p>
            <button onClick={fetchStudios} className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              No Studios Found
            </p>
            <p className="text-muted-foreground">
              No studios match your search or filters.
            </p>
            {category && (
              <button onClick={() => router.replace("/studios")} className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
                Clear Filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
