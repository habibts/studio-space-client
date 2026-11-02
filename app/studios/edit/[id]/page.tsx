"use client";

import { useRouter } from "next/navigation";
import AddStudioForm from "@/components/studios/AddStudioForm";

export default function EditStudioPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Edit Studio</h1>
          <p className="text-muted-foreground">Update your studio listing details.</p>
        </div>
        <AddStudioForm />
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/my-listings")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}