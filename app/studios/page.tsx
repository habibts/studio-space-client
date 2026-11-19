"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import StudioCard, { Studio } from "@/components/studios/StudioCard";
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface StudiosResponse {
  success: boolean;
  count: number;
  studios: Studio[];
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "title", label: "Title: A to Z" },
];

const getCreatedAt = (studio: Studio) => {
  const time = studio.createdAt ? new Date(studio.createdAt).getTime() : NaN;
  return Number.isNaN(time) ? 0 : time;
};

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
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const category = searchParams.get("category");

  const fetchStudios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(api("/studios"));
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = studios.filter((s) => {
      const matchesCategory = category ? s.category === category : true;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        s.title,
        s.category,
        s.location,
        s.description,
        s.hostName,
        ...(s.amenities ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    const sorted = [...list];
    switch (sort) {
      case "oldest":
        sorted.sort((a, b) => getCreatedAt(a) - getCreatedAt(b));
        break;
      case "price-asc":
        sorted.sort((a, b) => (a.hourlyRate ?? 0) - (b.hourlyRate ?? 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.hourlyRate ?? 0) - (a.hourlyRate ?? 0));
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // newest
        sorted.sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
    }
    return sorted;
  }, [studios, category, query, sort]);

  const hasActiveFilters = Boolean(category || query.trim());

  const clearFilters = () => {
    setQuery("");
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

        {/* Search + Sort toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, location, category or amenity..."
              className="pl-9 pr-9"
              aria-label="Search studios"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select value={sort} onValueChange={(value) => setSort(value ?? "newest")}>
            <SelectTrigger className="w-full sm:w-56" aria-label="Sort studios">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(category || (!loading && !error)) && (
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {category && (
              <span className="flex items-center gap-2">
                Filtering by:{" "}
                <span className="font-medium text-foreground">{category}</span>
                <button
                  onClick={clearFilters}
                  className="text-amber-500 transition hover:text-amber-600"
                >
                  Clear
                </button>
              </span>
            )}
            {!loading && !error && (
              <span>
                Showing <span className="font-medium text-foreground">{filtered.length}</span>{" "}
                of <span className="font-medium text-foreground">{studios.length}</span> studios
              </span>
            )}
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
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
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
