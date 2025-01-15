"use client";

import BrandLogo from "@/images/logos/variant-01";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login_send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("✅ Inicio de sesión exitoso:", result);
        localStorage.setItem("token", result.token);
        window.location.href = "/dashboard";
      } else {
        console.error("❌ Error al iniciar sesión:", result);
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
    }
  };

  return (
    <main className="bg-gradient-light-section dark:bg-gradient-dark-section flex-grow flex justify-center items-center max-md:px-4 max-md:pb-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-background p-4 rounded-lg w-full max-w-[500px] h-fit max-md:my-8"
      >
        <BrandLogo className="w-14 h-auto mx-auto" />

        <h1 className="text-center text-md uppercase font-black font-sans mt-4">
          Iniciar Sesión
        </h1>
        <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mb-2">
          Inicia sesión en Nexa AI para comenzar a operar.
        </p>

        <div className="flex flex-col gap-2 [&>label]:w-full mb-2">
          <label
            htmlFor="email"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Email
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", {
                required: "El email es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El formato del email es inválido.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </label>

          <label
            htmlFor="password"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Contraseña
            <input
              type="password"
              id="password"
              autoComplete="off"
              {...register("password", {
                required: "La contraseña es obligatoria.",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </label>

          <label
            htmlFor="terms"
            className="flex items-center gap-2 text-sm cursor-pointer my-2"
          >
            <input type="checkbox" name="terms" id="terms" className="size-4" />
            Recuérdame
          </label>
        </div>

        <button
          type="submit"
          className="bg-secondary-color hover:bg-secondary-color/80 dark:bg-primary-color hover:dark:bg-primary-color/60 w-full p-2 rounded-md mb-2 text-white transition-all"
        >
          Iniciar Sesión
        </button>

        <span className="w-full inline-block text-sm text-center mt-2 dark:text-difuminate-text-dark text-difuminate-text-light [&>a]:dark:text-white [&>a]:text-black transition-all">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="hover:underline hover:dark:text-primary-color hover:text-secondary-color"
          >
            Crea una cuenta
          </Link>
        </span>
      </form>
    </main>
  );
}
