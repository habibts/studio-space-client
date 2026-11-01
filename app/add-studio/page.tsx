import AddStudioForm from "@/components/studios/AddStudioForm";

export default function AddStudioPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <p className="mb-2 text-sm font-semibold text-cyan-600">
            STUDIO MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Add New Studio
          </h1>

          <p className="mt-2 text-muted-foreground">
            Share your creative space with creators around the world.
          </p>
        </div>

        <AddStudioForm />
      </div>
    </main>
  );
}