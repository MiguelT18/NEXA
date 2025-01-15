import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React from "react";

export default function PricingPage() {
  return (
    <ProtectedRoute>
      <main>
        <section>
          <h1>Planes</h1>
        </section>
      </main>
    </ProtectedRoute>
  );
}
