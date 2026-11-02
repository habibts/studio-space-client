"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const mockBookings = [
  { id: "1", title: "Sunset Photo Studio", category: "Photo Studio", date: "2026-11-10", startTime: "09:00", endTime: "12:00", hours: 3, hourlyRate: 45, deposit: 50, total: 185, status: "Pending", imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80", location: "Los Angeles, CA" },
  { id: "2", title: "Echo Podcast Room", category: "Podcast Room", date: "2026-11-12", startTime: "14:00", endTime: "16:00", hours: 2, hourlyRate: 30, deposit: 20, total: 80, status: "Confirmed", imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80", location: "Austin, TX" },
  { id: "3", title: "Harmony Music Suite", category: "Music Suite", date: "2026-10-20", startTime: "10:00", endTime: "13:00", hours: 3, hourlyRate: 60, deposit: 60, total: 240, status: "Completed", imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80", location: "Nashville, TN" },
];

export default function MyBookingsPage() {
  const [filter, setFilter] = useState("All");
  const [loading] = useState(false);

  const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  const filtered = useMemo(
    () => (filter === "All" ? mockBookings : mockBookings.filter((b) => b.status === filter)),
    [filter]
  );

  const counts = {
    total: mockBookings.length,
    pending: mockBookings.filter((b) => b.status === "Pending").length,
    confirmed: mockBookings.filter((b) => b.status === "Confirmed").length,
    completed: mockBookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Bookings</h1>
          <p className="text-muted-foreground">Track and manage all your studio reservations.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Bookings</p><p className="text-3xl font-bold">{counts.total}</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Pending</p><p className="text-3xl font-bold">{counts.pending}</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Confirmed</p><p className="text-3xl font-bold">{counts.confirmed}</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Completed</p><p className="text-3xl font-bold">{counts.completed}</p></CardContent></Card>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? "bg-amber-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold">No bookings found</p>
            <p className="text-muted-foreground">You have no bookings in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <Card key={b.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={b.imageUrl} alt={b.title} fill className="object-cover" sizes="(max-width:768px)100vw,33vw" />
                  <Badge className="absolute left-3 top-3">{b.category}</Badge>
                  <Badge
                    className={`absolute right-3 top-3 ${
                      b.status === "Pending"
                        ? "bg-yellow-500"
                        : b.status === "Confirmed"
                        ? "bg-green-500"
                        : b.status === "Completed"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    } text-white`}
                  >
                    {b.status}
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {b.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {b.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {b.startTime} – {b.endTime} ({b.hours}h)
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Hourly Rate</span><span>${b.hourlyRate}/hr</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Security Deposit</span><span>${b.deposit}</span></div>
                    <div className="flex justify-between font-semibold"><span>Total</span><span className="text-amber-500">${b.total}</span></div>
                  </div>
                  {b.status === "Pending" && (
                    <AlertDialog>
                      <AlertDialogTrigger className="inline-flex w-full items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                        Cancel Booking
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel booking?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel your pending booking. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                          <AlertDialogAction>Cancel Booking</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}