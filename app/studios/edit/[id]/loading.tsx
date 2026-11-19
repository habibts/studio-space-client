import { Skeleton } from "@/components/ui/skeleton";

export default function EditStudioLoading() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <Skeleton className="mb-3 h-4 w-40" />
          <Skeleton className="mb-3 h-9 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="space-y-6 rounded-xl border p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-28 w-full" />
          </div>
          <div className="rounded-lg border p-4">
            <Skeleton className="mb-3 h-4 w-32" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-11 w-44 rounded-full" />
        </div>
      </div>
    </main>
  );
}
