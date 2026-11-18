"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Users,
  DollarSign,
  Shield,
  Calendar,
  Mail,
  User,
  ArrowLeft,
  Star,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Studio } from "@/components/studios/StudioCard";
import BookingCard from "@/components/studios/BookingCard";

interface StudioResponse {
  success: boolean;
  studio: Studio;
}

import { Suspense } from "react";
import { api } from "@/lib/api";

export default function StudioDetailsPage() {
  return (
    <Suspense fallback={null}>
      <StudioDetailsContent />
    </Suspense>
  );
}

function StudioDetailsContent() {
  const params = useParams();
  const id = params?.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudio = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(api(`/studios/${id}`));
      if (response.status === 404) {
        throw new Error("Studio not found");
      }
      if (!response.ok) {
        throw new Error("Failed to fetch studio details");
      }
      const data: StudioResponse = await response.json();
      if (data.success && data.studio) {
        setStudio(data.studio);
      } else {
        throw new Error("Studio not found");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching studio details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudio();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="mb-6 h-8 w-32" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Skeleton className="aspect-[16/9] w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href="/studios" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to Studios
          </Link>
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              {error === "Studio not found" ? "Studio Not Found" : "Unable to Load Studio"}
            </p>
            <p className="text-muted-foreground">
              {error === "Studio not found"
                ? "The studio you're looking for doesn't exist or has been removed."
                : "Something went wrong while loading studio details."}
            </p>
            {error === "Studio not found" ? (
              <Link href="/studios" className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Back to Studios
              </Link>
            ) : (
              <button onClick={fetchStudio} className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Try Again
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (!studio) {
    return null;
  }

  const reviews = Array.isArray(studio.reviews) ? studio.reviews : [];
  const reviewCount = reviews.length;
  const computedAverage = reviewCount
    ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviewCount
    : 0;
  const displayRating =
    typeof studio.rating === "number" && studio.rating > 0 ? studio.rating : computedAverage;

  const formatDate = (value?: string) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/studios" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to Studios
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={studio.imageUrl}
                alt={studio.title}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-[#17213B] md:text-4xl">
                      {studio.title}
                    </h1>
                    <Badge className="bg-[#FFFBEB] text-[#17213B] border border-[#F3E8D0]">{studio.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <MapPin className="size-4 text-[#F59E0B]" />
                    <span className="text-[#17213B]">{studio.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 border-t border-[#F3E8D0] pt-6">
                <h2 className="text-xl font-semibold text-[#17213B]">About this space</h2>
                <p className="leading-relaxed text-[#64748B]">
                  {studio.description || "No description available."}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-[#17213B]">Amenities</h2>
                {studio.amenities && studio.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {studio.amenities.map((amenity, index) => (
                      <Badge key={index} className="border border-[#F3E8D0] bg-[#FFFBEB] text-[#17213B]">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No amenities listed.
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Host Information</h2>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>{studio.hostName || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <span>{studio.hostEmail || "Not specified"}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-[#17213B] dark:text-white">
                    Reviews
                  </h2>
                  {reviewCount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-[#64748B] dark:text-slate-400">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-[#17213B] dark:text-white">
                        {displayRating.toFixed(1)}
                      </span>
                      <span>/ 5</span>
                      <span className="text-muted-foreground">
                        · {reviewCount} review{reviewCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  )}
                </div>

                {reviewCount === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#F3E8D0] bg-[#FFFBEB] px-4 py-8 text-center dark:border-gray-700 dark:bg-gray-800/60">
                    <p className="font-medium text-[#17213B] dark:text-white">No reviews yet</p>
                    <p className="mt-1 text-sm text-[#64748B] dark:text-slate-400">
                      Be the first to share your experience with this studio.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {reviews.map((review, index) => (
                      <li
                        key={index}
                        className="rounded-xl border border-[#F3E8D0] bg-card p-4 dark:border-gray-700"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                              {(review.name || "A").charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-[#17213B] dark:text-white">
                                {review.name || "Anonymous"}
                              </p>
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`size-3.5 ${
                                      star <= Math.round(Number(review.rating) || 0)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground/40"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          {review.date && (
                            <span className="text-xs text-muted-foreground">
                              {formatDate(review.date)}
                            </span>
                          )}
                        </div>
                        {review.comment && (
                          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#64748B] dark:text-slate-300">
                            {review.comment}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <BookingCard studio={studio} />
          </div>
        </div>
      </div>
    </main>
  );
}

