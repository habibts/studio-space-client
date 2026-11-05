"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Calendar, PlusCircle, Search, List } from "lucide-react";

interface Studio { _id: string; title: string; category: string; hourlyRate: number; imageUrl: string; }
interface Booking { _id: string; studioTitle: string; bookingDate: string; startTime: string; endTime: string; totalPrice: number; status: string; }

export default function DashboardPage() {
  const router = useRouter();
  const { user, isPending } = useCurrentUser();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      setError(null);
      const [sRes, bRes] = await Promise.all([
        fetch(`https://studio-space-server-kduo.vercel.app/my-studios?email=${encodeURIComponent(user.email)}`),
        fetch(`https://studio-space-server-kduo.vercel.app/my-bookings?email=${encodeURIComponent(user.email)}`),
      ]);
      if (!sRes.ok || !bRes.ok) throw new Error("Failed to load dashboard");
      const sData = await sRes.json();
      const bData = await bRes.json();
      setStudios(sData.studios || []);
      setBookings(bData.bookings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      router.push("/login");
      return;
    }
    fetchAll();
  }, [user, isPending, router,]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-7xl flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
          <p className="text-lg font-semibold text-foreground">Unable to Load Dashboard</p>
          <p className="text-muted-foreground">Something went wrong while loading dashboard data.</p>
          <Button onClick={fetchAll} className="mt-2 bg-[#F59E0B] text-foreground hover:bg-[#D97706]">Try Again</Button>
        </div>
      </main>
    );
  }

  const pending = bookings.filter((b) => b.status === "Pending").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back, {user?.name}!</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="mt-2 text-sm text-[#64748B]">Here's an overview of your StudioSpace activity.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card"><CardContent className="p-6"><p className="text-sm text-[#64748B]">Total Studios</p><p className="text-3xl font-bold text-[#F59E0B]">{studios.length}</p></CardContent></Card>
          <Card className="bg-card"><CardContent className="p-6"><p className="text-sm text-[#64748B]">Total Bookings</p><p className="text-3xl font-bold text-[#F59E0B]">{bookings.length}</p></CardContent></Card>
          <Card className="bg-card"><CardContent className="p-6"><p className="text-sm text-[#64748B]">Pending Bookings</p><p className="text-3xl font-bold text-[#F59E0B]">{pending}</p></CardContent></Card>
          <Card className="bg-card"><CardContent className="p-6"><p className="text-sm text-[#64748B]">Confirmed Bookings</p><p className="text-3xl font-bold text-[#F59E0B]">{confirmed}</p></CardContent></Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/studios/add-studio"><Button className="w-full bg-[#F59E0B] text-foreground hover:bg-[#D97706]"><PlusCircle className="mr-2 h-4 w-4" />Add New Studio</Button></Link>
          <Link href="/studios"><Button variant="outline" className="w-full"><Search className="mr-2 h-4 w-4" />Explore Studios</Button></Link>
          <Link href="/my-listings"><Button variant="outline" className="w-full"><List className="mr-2 h-4 w-4" />My Studio Listings</Button></Link>
          <Link href="/my-bookings"><Button variant="outline" className="w-full"><Calendar className="mr-2 h-4 w-4" />My Bookings</Button></Link>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Studio Listings</h2>
            <Link href="/my-listings" className="text-sm text-[#F59E0B] hover:underline">View All</Link>
          </div>
          {studios.length === 0 ? (
            <p className="text-sm text-[#64748B]">No studios yet. <Link href="/studios/add-studio" className="text-[#F59E0B] hover:underline">Add your first studio</Link></p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studios.slice(0, 3).map((s) => (
                <Link key={s._id} href={`/studios/${s._id}`}>
                  <Card className="overflow-hidden bg-card">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image src={s.imageUrl} alt={s.title} fill unoptimized className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{s.title}</h3>
                      <p className="text-sm text-[#64748B]">{s.category}</p>
                      <p className="mt-1 text-sm font-semibold text-[#F59E0B]">${s.hourlyRate}/hr</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Bookings</h2>
            <Link href="/my-bookings" className="text-sm text-[#F59E0B] hover:underline">View All</Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-sm text-[#64748B]">No bookings yet. <Link href="/studios" className="text-[#F59E0B] hover:underline">Explore studios</Link></p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <Card key={b._id} className="bg-card">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-semibold text-foreground">{b.studioTitle}</p>
                      <p className="text-sm text-[#64748B]">{b.bookingDate} • {b.startTime}–{b.endTime}</p>
                    </div>
                    <div className="text-right">
                      <Badge>{b.status}</Badge>
                      <p className="mt-1 text-sm font-semibold text-[#F59E0B]">${b.totalPrice}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}