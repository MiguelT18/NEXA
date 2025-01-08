import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <main>
      <h1>Regístrate</h1>

      <span>¿deseas volver al inicio?</span>
      <Link href="/" className="inline-block p-4 rounded-lg border">
        Inicio
      </Link>
    </main>
  );
}
