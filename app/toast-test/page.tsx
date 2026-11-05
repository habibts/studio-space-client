"use client";

import { toast } from "sonner";

export default function ToastTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <button onClick={() => toast.success("Sonner is working!")} className="rounded bg-green-600 px-4 py-2 text-white">
        Test Success Toast
      </button>
      <button onClick={() => toast.error("Sonner error test")} className="rounded bg-red-600 px-4 py-2 text-white">
        Test Error Toast
      </button>
    </main>
  );
}