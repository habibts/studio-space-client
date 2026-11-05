import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">This studio page could not be found.</p>
      <Link href="/" className="rounded-md bg-amber-500 px-4 py-2 text-white">Return to Home</Link>
    </main>
  );
}