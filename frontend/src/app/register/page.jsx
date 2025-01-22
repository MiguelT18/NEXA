"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/images/logos/variant-01";
import { useForm } from "react-hook-form";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import { ColorizedButton } from "@/components/ui/pure/Buttons";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { register: registerUser } = useAuth();
  const router = useRouter();

  const { showNotification } = useNotification();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        showNotification(response.message, "success");
        reset();
      } else {
        showNotification(response.message, "error");
      }
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");
  }, [router]);

  return (
    <main className="bg-gradient-light-section dark:bg-gradient-dark-section flex-grow flex justify-center items-center max-md:px-4 max-md:pb-16 relative">
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-background p-4 rounded-lg w-full max-w-[500px] h-fit max-md:my-8"
      >
        <BrandLogo className="w-14 h-auto mx-auto" />

        <h1 className="text-center text-md uppercase font-black font-sans mt-2">
          Crear una cuenta
        </h1>
        <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mb-5">
          Crea una cuenta en Nexa AI para comenzar a operar.
        </p>

        <div className="flex flex-col gap-2 mb-4 [&>label]:w-full">
          <div className="flex gap-2 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:bg-transparent [&>label>input]:border [&>label>input]:dark:border-light-gray [&>label>input]:mt-1">
            <label htmlFor="firstName">
              Nombres:
              <input
                type="text"
                id="firstName"
                autoComplete="off"
                {...register("firstName", {
                  required: "Tus nombres son obligatorios.",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </label>

            <label htmlFor="lastName">
              Apellidos:
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                {...register("lastName", {
                  required: "Tus apellidos son obligatorios.",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </label>
          </div>

          <label
            htmlFor="email"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Correo electrónico:
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", {
                required: "Email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El formato del email es inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </label>

          <label
            htmlFor="terms"
            className="flex items-center gap-2 text-sm cursor-pointer mt-2"
          >
            <input
              type="checkbox"
              id="terms"
              className="size-4"
              {...register("terms", {
                required: "Debes aceptar los términos y condiciones.",
              })}
            />
            Acepto los{" "}
            <Link
              href="/"
              className="hover:underline dark:text-primary-color hover:dark:text-primary-color/80 text-secondary-color hover:text-secondary-color/60"
            >
              términos y condiciones
            </Link>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-xs">{errors.terms.message}</p>
          )}
        </div>

        <ColorizedButton width="full" type="submit">
          Registrarse
        </ColorizedButton>

        <span className="w-full inline-block text-sm text-center mt-4 [&>a]:dark:text-difuminate-text-dark [&>a]:text-difuminate-text-light dark:text-white text-black transition-all">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="hover:underline hover:dark:text-primary-color hover:text-secondary-color"
          >
            Iniciar Sesión
          </Link>
        </span>
      </form>
    </main>
  );
}
