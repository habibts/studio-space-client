"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, Pencil, Search, Trash2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/components/ui/toast";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  maxCapacity?: number;
  imageUrl: string;
}

export default function MyListingsPage() {
  const { user, isPending } = useCurrentUser();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      await fetch("/api/auth/jwt", { credentials: "include" });
      const res = await fetch(`http://localhost:3001/studios/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setStudios((prev) => prev.filter((s) => s._id !== id));
      toast.add({ title: "Deleted", description: "Studio deleted successfully.", type: "success" });
    } catch (err) {
      toast.add({ title: "Delete failed", description: err instanceof Error ? err.message : "Something went wrong", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };
  const [category, setCategory] = useState("All");

  const fetchStudios = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:3001/my-studios?email=${encodeURIComponent(user.email)}`);
      if (!res.ok) throw new Error("Failed to fetch studios");
      const data = await res.json();
      setStudios(data.studios || data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load studios");
      toast.add({ title: "Error", description: err instanceof Error ? err.message : "Failed to load studios", type: "error" });
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
    fetchStudios();
  }, [user, isPending]);

  const categories = ["All", ...Array.from(new Set(studios.map((s) => s.category)))];
  const filtered = useMemo(
    () => studios.filter((s) => (category === "All" || s.category === category) && s.title.toLowerCase().includes(search.toLowerCase())),
    [studios, search, category]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Studio Listings</h1>
          <p className="text-muted-foreground">Manage your creative spaces and keep your listings updated.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Studios</p><p className="text-3xl font-bold">{studios.length}</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Active Listings</p><p className="text-3xl font-bold">{studios.length}</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Categories</p><p className="text-3xl font-bold">{new Set(studios.map((s) => s.category)).size}</p></CardContent></Card>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your listings..." className="pl-9" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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
            <p className="text-lg font-semibold">Unable to Load Studios</p>
            <p className="text-muted-foreground">Something went wrong while loading your studios.</p>
            <Button onClick={fetchStudios} className="mt-2">Try Again</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
            <p className="text-lg font-semibold">No listings found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            <a href="/studios/add-studio" className="mt-4 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
              Add New Studio
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((studio) => (
              <Card key={studio._id} className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={studio.imageUrl} alt={studio.title} fill unoptimized className="object-cover" sizes="(max-width:768px)100vw,33vw" />
                  <Badge className="absolute left-3 top-3">{studio.category}</Badge>
                </div>
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-lg font-semibold">{studio.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {studio.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" /> {studio.maxCapacity} max
                  </div>
                  <p className="text-sm font-semibold text-amber-500">${studio.hourlyRate}/hr</p>
                  <div className="flex gap-2 pt-2">
                    <a href={`/studios/edit/${studio._id}`} className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent">
                      Update
                    </a>
                    <AlertDialog>
                      <AlertDialogTrigger className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove the studio listing.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(studio._id)} disabled={deletingId === studio._id}>
                        {deletingId === studio._id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}