"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditStudioForm from "@/components/studios/EditStudioForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EditStudioPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [studio, setStudio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchStudio = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/studios/${id}`);
        if (!res.ok) throw new Error("Failed to fetch studio");
        const data = await res.json();
        setStudio(data.studio || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load studio");
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
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </main>
    );
  }

  if (error || !studio) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="flex min-h-[300px] flex-col items-center justify-center space-y-3 text-center">
              <p className="text-lg font-semibold">Studio not found</p>
              <p className="text-muted-foreground">{error || "The studio could not be loaded."}</p>
              <Button onClick={() => router.push("/my-listings")}>Back to Listings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Edit Studio</h1>
          <p className="text-muted-foreground">Update your studio listing details.</p>
        </div>
        <EditStudioForm studio={studio} />
      </div>
    </main>
  );
}