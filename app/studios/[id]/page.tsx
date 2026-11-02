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

interface StudioResponse {
  success: boolean;
  studio: Studio;
}

export default function StudioDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const hours =
    startTime && endTime
      ? Math.max(
          0,
          (new Date(`2000-01-01T${endTime}`).getTime() -
            new Date(`2000-01-01T${startTime}`).getTime()) /
            3600000
        )
      : 0;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudio = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/studios/${id}`);
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
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/studios" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Studios
            </Link>
          </Button>
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground">
              {error === "Studio not found" ? "Studio Not Found" : "Something went wrong"}
            </p>
            <p className="text-muted-foreground">
              {error === "Studio not found"
                ? "The studio you're looking for doesn't exist or has been removed."
                : error}
            </p>
            <Button asChild className="mt-4">
              <Link href="/studios">Browse All Studios</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!studio) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/studios" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to Studios
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={studio.imageUrl}
                alt={studio.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {studio.title}
                    </h1>
                    <Badge>{studio.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{studio.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold">About this space</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {studio.description || "No description available."}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Amenities</h2>
                {studio.amenities && studio.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {studio.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
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
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    ${studio.hourlyRate}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      / hr
                    </span>
                  </p>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="size-4" />
                      <span>Security Deposit</span>
                    </div>
                    <span className="font-medium">
                      ${studio.securityDeposit || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="size-4" />
                      <span>Max Capacity</span>
                    </div>
                    <span className="font-medium">
                      {studio.maxCapacity || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="size-4" />
                      <span>Hourly Rate</span>
                    </div>
                    <span className="font-medium">${studio.hourlyRate}</span>
                  </div>
                </div>

                <Separator />

                <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                  <DialogTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                    <Calendar className="mr-2 size-4" />
                    Book Workspace Now
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Request</DialogTitle>
                      <DialogDescription>
                        Fill in your booking details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Booking Date</label>
                        <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">Start Time</label>
                          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">End Time</label>
                          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Number of Hours</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Hourly Rate</span>
                        <span className="font-medium">${studio?.hourlyRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Security Deposit</span>
                        <span className="font-medium">${studio?.securityDeposit || 0}</span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
                        <span>Total Estimated Price</span>
                        <span className="text-amber-500">
                          ${((studio?.hourlyRate || 0) * hours + (studio?.securityDeposit || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <DialogFooter showCloseButton>
                      <Button
                        onClick={() => {
                          if (!bookingDate || !startTime || !endTime || hours <= 0) {
                            return;
                          }
                          setBookingOpen(false);
                        }}
                        className="bg-amber-500 text-white hover:bg-amber-600"
                      >
                        Confirm Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
