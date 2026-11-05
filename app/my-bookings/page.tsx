"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
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
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { api } from "@/lib/api";

interface Booking {
  _id: string;
  studioTitle: string;
  category?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  hourlyRate: number;
  securityDeposit?: number;
  totalPrice: number;
  status: string;
  imageUrl?: string;
  location?: string;
}

export default function MyBookingsPage() {
  const { user, isPending } = useCurrentUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (id: string) => {
    if (confirmingId) return;
    setConfirmingId(id);
    try {
      const res = await fetch(api(`/bookings/${id}/confirm`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Confirmation failed");
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b)));
      toast.success("Booking confirmed successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setConfirmingId(null);
    }
  };
  const handleComplete = async (id: string) => {
    if (completingId) return;
    setCompletingId(id);
    try {
      const res = await fetch(api(`/bookings/${id}/complete`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Completion failed");
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Completed" } : b)));
    } catch (err) {
    } finally {
      setCompletingId(null);
    }
  };
  const handleCancel = async (id: string) => {
    if (cancellingId) return;
    setCancellingId(id);
    try {
      const res = await fetch(api(`/bookings/${id}/cancel`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Cancellation failed");
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b)));
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCancellingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      const res = await fetch(api(`/bookings/${id}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Deletion failed");
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking deleted successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(api(`/my-bookings?email=${encodeURIComponent(user.email)}`));
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data.bookings || data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      setLoading(false);
      return;
    }
    fetchBookings();
  }, [user, isPending]);

  const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  const filtered = useMemo(
    () => (filter === "All" ? bookings : bookings.filter((b) => b.status === filter)),
    [filter, bookings]
  );

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">My <span className="text-[#F59E0B]">Bookings</span></h1>
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
                filter === f ? "bg-[#F59E0B] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading || isPending ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold">Unable to Load Bookings</p>
            <p className="text-muted-foreground">Something went wrong while loading your bookings.</p>
            <Button onClick={fetchBookings} className="mt-2">Try Again</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold">No Bookings Yet</p>
            <p className="text-muted-foreground">You haven't booked any studio yet. Explore studios and book your workspace.</p>
            <a href="/studios" className="mt-4 inline-flex items-center justify-center rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white hover:bg-[#D97706]">Explore Studios</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <Card key={b._id} className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {b.imageUrl ? (
                    <Image src={b.imageUrl} alt={b.studioTitle} fill unoptimized className="object-cover" sizes="(max-width:768px)100vw,33vw" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
                  )}
                  <Badge className="absolute left-3 top-3">{b.category || "Studio"}</Badge>
                  <Badge
                    className={`absolute right-3 top-3 ${
                      b.status === "Pending" ? "bg-yellow-500" : b.status === "Confirmed" ? "bg-green-500" : b.status === "Completed" ? "bg-blue-500" : "bg-red-500"
                    } text-white`}
                  >
                    {b.status}
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-lg font-semibold">{b.studioTitle}</h3>
                  {b.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {b.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {isNaN(Date.parse(b.bookingDate)) ? b.bookingDate : new Date(b.bookingDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {b.startTime} – {b.endTime} ({Number(b.totalHours).toFixed(2).replace(/\.00$/, "")}h)
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Hourly Rate</span><span>${b.hourlyRate}/hr</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Security Deposit</span><span>${b.securityDeposit || 0}</span></div>
                    <div className="flex justify-between font-semibold"><span>Total</span><span className="text-amber-500">${b.totalPrice}</span></div>
                  </div>
                  {b.status === "Pending" && (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="default" className="w-full sm:flex-1" disabled={confirmingId === b._id} onClick={() => handleConfirm(b._id)}>
                        {confirmingId === b._id ? "Confirming..." : "Confirm Booking"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger className="inline-flex w-full sm:flex-1 items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
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
                            <AlertDialogAction onClick={() => handleCancel(b._id)} disabled={cancellingId === b._id}>
                              {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  {b.status === "Confirmed" && (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="default" className="w-full sm:flex-1" disabled={completingId === b._id} onClick={() => handleComplete(b._id)}>
                        {completingId === b._id ? "Completing..." : "Complete Booking"}
                      </Button>
                      <Button variant="secondary" className="w-full sm:flex-1" disabled>
                        Already Confirmed
                      </Button>
                    </div>
                  )}
                  {b.status === "Cancelled" && (
                    <AlertDialog>
                      <AlertDialogTrigger className="inline-flex w-full items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                        Delete Booking
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete booking?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete this cancelled booking?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(b._id)} disabled={deletingId === b._id}>
                            {deletingId === b._id ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
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