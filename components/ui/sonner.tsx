"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return <SonnerToaster position="top-right" richColors closeButton duration={3500} offset={80} mobileOffset={80} />;
}