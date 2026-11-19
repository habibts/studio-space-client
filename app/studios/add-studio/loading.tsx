import { Skeleton } from "@/components/ui/skeleton";

export default function AddStudioLoading() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <Skeleton className="mb-3 h-4 w-40" />
          <Skeleton className="mb-3 h-9 w-72" />
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
          <div className="space-y-3">
            <Skeleton className="h-4 w-28" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className="h-11 w-44 rounded-full" />
        </div>
      </div>
    </main>
  );
}
