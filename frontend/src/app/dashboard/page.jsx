import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React from "react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 max-md:pt-4 pt-14 pb-8 max-md:pb-24">
        <section>section</section>
      </main>
    </ProtectedRoute>
  );
}
