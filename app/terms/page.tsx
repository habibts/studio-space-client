import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | StudioSpace",
  description: "Terms and Conditions for using StudioSpace.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Terms and Conditions</h1>
      <p className="mb-4 text-muted-foreground">
        Last updated: 2025. These Terms and Conditions govern your use of StudioSpace, a peer-to-peer platform for discovering, listing, and booking creative workspaces.
      </p>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">1. Platform Usage and Accounts</h2>
        <p className="text-muted-foreground">
          You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">2. Studio Listings</h2>
        <p className="text-muted-foreground">
          Hosts must provide accurate details about their spaces, including availability, pricing, capacity, and amenities. Misleading or fraudulent listings are prohibited.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">3. Bookings, Payments, Cancellations, and Refunds</h2>
        <p className="text-muted-foreground">
          Bookings are subject to host availability and platform rules. Cancellation and refund policies may vary by listing and are displayed before confirmation. Overlapping bookings for the same studio and time slot are not permitted.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">4. Host and Customer Responsibilities</h2>
        <p className="text-muted-foreground">
          Hosts are responsible for the condition and safety of their spaces. Customers are responsible for using spaces respectfully and following house rules. Both parties must comply with applicable laws.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">5. Prohibited Activities</h2>
        <p className="text-muted-foreground">
          Users may not engage in fraud, harassment, illegal activity, or misuse of the platform. StudioSpace reserves the right to suspend or terminate accounts that violate these terms.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-foreground">6. Liability and Disputes</h2>
        <p className="text-muted-foreground">
          StudioSpace acts as a marketplace platform and is not a party to agreements between hosts and customers. To the maximum extent permitted by law, StudioSpace is not liable for indirect or consequential damages. Disputes should first be resolved between the parties.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        These terms are a draft and may be updated. Continued use of the platform constitutes acceptance of the latest version.
      </p>
    </main>
  );
}