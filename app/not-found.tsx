import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F3FBF4] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#05893E]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-[#26352B]">Studio Not Found!</h2>
      <p className="mt-2 max-w-md text-[#26352B]/70">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-md bg-[#05893E] px-4 py-2 text-sm font-medium text-white hover:bg-[#047a36]">
          Back to Home
        </Link>
        <Link href="/studios" className="rounded-md border border-[#05893E] px-4 py-2 text-sm font-medium text-[#05893E] hover:bg-[#05893E]/10">
          Explore Studios
        </Link>
      </div>
    </main>
  );
}