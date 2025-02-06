"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // router.push("/login");
      console.log("Inicio de sesión");
    }
  }, [router]);

  return <>{children}</>;
}
