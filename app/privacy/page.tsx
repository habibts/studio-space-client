import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StudioSpace",
  description: "Privacy Policy for StudioSpace.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mb-4 text-muted-foreground">
        Last updated: 2025. This Privacy Policy describes how StudioSpace collects, uses, and protects your information.
      </p>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">1. Information Collected</h2>
        <p className="text-muted-foreground">
          We collect account details, profile information, studio listings, booking details, and usage data necessary to operate the platform.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">2. Account and Authentication</h2>
        <p className="text-muted-foreground">
          Authentication may use email and password or third-party providers. Session data is managed securely using HTTPOnly cookies.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">3. Booking and Listing Information</h2>
        <p className="text-muted-foreground">
          Booking and listing information is stored to facilitate reservations, communicate between hosts and customers, and maintain platform records.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">4. How Information Is Used</h2>
        <p className="text-muted-foreground">
          Information is used to provide, maintain, and improve the service, process bookings, prevent fraud, and communicate important updates.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">5. Data Sharing and Security</h2>
        <p className="text-muted-foreground">
          We do not sell personal data. Data may be shared with service providers necessary to operate the platform. We apply reasonable security measures to protect your data.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">6. Cookies and Sessions</h2>
        <p className="text-muted-foreground">
          StudioSpace uses cookies to manage authentication sessions and improve user experience. You can control cookies through your browser settings.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">7. Your Rights and Contact</h2>
        <p className="text-muted-foreground">
          You may request access, correction, or deletion of your personal data where applicable. For privacy questions, contact the StudioSpace team through the platform.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        This policy is a draft and may be updated as the platform evolves.
      </p>
    </main>
  );
}