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
import { toast } from "@/components/ui/toast";
import { Building2, Calendar, PlusCircle, Search, List, Clock } from "lucide-react";

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
        fetch(`http://localhost:3001/my-studios?email=${encodeURIComponent(user.email)}`),
        fetch(`http://localhost:3001/my-bookings?email=${encodeURIComponent(user.email)}`),
      ]);
      if (!sRes.ok || !bRes.ok) throw new Error("Failed to load dashboard");
      const sData = await sRes.json();
      const bData = await bRes.json();
      setStudios(sData.studios || []);
      setBookings(bData.bookings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
      toast.add({ title: "Error", description: err instanceof Error ? err.message : "Failed to load dashboard", type: "error" });
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
  }, [user, isPending, router]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#F3FBF4] px-4 py-10">
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
      <main className="min-h-screen bg-[#F3FBF4] px-4 py-10">
        <div className="mx-auto max-w-7xl flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
          <p className="text-lg font-semibold text-[#26352B]">Unable to Load Dashboard</p>
          <p className="text-[#26352B]/70">Something went wrong while loading dashboard data.</p>
          <Button onClick={fetchAll} className="mt-2 bg-[#05893E] text-white hover:bg-[#047a36]">Try Again</Button>
        </div>
      </main>
    );
  }

  const pending = bookings.filter((b) => b.status === "Pending").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;

  return (
    <main className="min-h-screen bg-[#F3FBF4] px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#26352B]">Welcome Back, {user?.name}!</h1>
          <p className="text-[#26352B]/70">{user?.email}</p>
          <p className="mt-2 text-sm text-[#26352B]/60">Here's an overview of your StudioSpace activity.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#FAFCFA]"><CardContent className="p-6"><p className="text-sm text-[#26352B]/60">Total Studios</p><p className="text-3xl font-bold text-[#05893E]">{studios.length}</p></CardContent></Card>
          <Card className="bg-[#FAFCFA]"><CardContent className="p-6"><p className="text-sm text-[#26352B]/60">Total Bookings</p><p className="text-3xl font-bold text-[#05893E]">{bookings.length}</p></CardContent></Card>
          <Card className="bg-[#FAFCFA]"><CardContent className="p-6"><p className="text-sm text-[#26352B]/60">Pending Bookings</p><p className="text-3xl font-bold text-[#05893E]">{pending}</p></CardContent></Card>
          <Card className="bg-[#FAFCFA]"><CardContent className="p-6"><p className="text-sm text-[#26352B]/60">Confirmed Bookings</p><p className="text-3xl font-bold text-[#05893E]">{confirmed}</p></CardContent></Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/studios/add-studio"><Button className="w-full bg-[#05893E] text-white hover:bg-[#047a36]"><PlusCircle className="mr-2 h-4 w-4" />Add New Studio</Button></Link>
          <Link href="/studios"><Button variant="outline" className="w-full"><Search className="mr-2 h-4 w-4" />Explore Studios</Button></Link>
          <Link href="/my-listings"><Button variant="outline" className="w-full"><List className="mr-2 h-4 w-4" />My Studio Listings</Button></Link>
          <Link href="/my-bookings"><Button variant="outline" className="w-full"><Calendar className="mr-2 h-4 w-4" />My Bookings</Button></Link>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#26352B]">Recent Studio Listings</h2>
            <Link href="/my-listings" className="text-sm text-[#05893E] hover:underline">View All</Link>
          </div>
          {studios.length === 0 ? (
            <p className="text-sm text-[#26352B]/60">No studios yet. <Link href="/studios/add-studio" className="text-[#05893E] hover:underline">Add your first studio</Link></p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studios.slice(0, 3).map((s) => (
                <Link key={s._id} href={`/studios/${s._id}`}>
                  <Card className="overflow-hidden bg-[#FAFCFA]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image src={s.imageUrl} alt={s.title} fill unoptimized className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#26352B]">{s.title}</h3>
                      <p className="text-sm text-[#26352B]/60">{s.category}</p>
                      <p className="mt-1 text-sm font-semibold text-[#05893E]">${s.hourlyRate}/hr</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#26352B]">Recent Bookings</h2>
            <Link href="/my-bookings" className="text-sm text-[#05893E] hover:underline">View All</Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-sm text-[#26352B]/60">No bookings yet. <Link href="/studios" className="text-[#05893E] hover:underline">Explore studios</Link></p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <Card key={b._id} className="bg-[#FAFCFA]">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-semibold text-[#26352B]">{b.studioTitle}</p>
                      <p className="text-sm text-[#26352B]/60">{b.bookingDate} • {b.startTime}–{b.endTime}</p>
                    </div>
                    <div className="text-right">
                      <Badge>{b.status}</Badge>
                      <p className="mt-1 text-sm font-semibold text-[#05893E]">${b.totalPrice}</p>
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