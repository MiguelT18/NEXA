import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main>
      <form>
        <h1>Iniciar Sesión</h1>
        <p>Ingresa a tu cuenta para comenzar a comerciar.</p>

        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" />

        <button type="submit">Iniciar Sesión</button>

        <p>
          ¿No tienes una cuenta? <span>Regístrate</span>
        </p>
        <Link href="/">Volver al inicio</Link>
      </form>
    </main>
  );
}
