"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/images/logos/variant-01";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          repeatPassword: data.confirmPassword,
          acceptTerms: data.terms ? 'yes' : 'no',
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setResponseMessage("✅ " + responseData.message);
        reset();
      } else {
        setResponseMessage("❌ " + responseData.error);
      }
    } catch (error) {
      setResponseMessage("❌ Error al enviar el formulario: " + error.message);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const password = watch("password");

  return (
    <main className="bg-gradient-light-section dark:bg-gradient-dark-section flex-grow flex justify-center items-center max-md:px-4 max-md:pb-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-background p-4 rounded-lg w-full max-w-[500px] h-fit max-md:my-8"
      >
        <BrandLogo className="w-14 h-auto mx-auto" />

        <h1 className="text-center text-md uppercase font-black font-sans mt-4">
          Crear una cuenta
        </h1>
        <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mb-2">
          Crea una cuenta en Nexa AI para comenzar a operar.
        </p>

        <div className="flex flex-col gap-2 [&>label]:w-full">
          <div className="flex gap-2 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:bg-transparent [&>label>input]:border [&>label>input]:dark:border-light-gray [&>label>input]:mt-1">
            <label htmlFor="firstName">
              Nombres
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
              Apellidos
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
            Email
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
            htmlFor="password"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Contraseña
            <input
              type="password"
              id="password"
              autoComplete="off"
              {...register("password", {
                required: "Tu contraseña es obligatoria.",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres.",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: "La contraseña debe incluir minúsculas, mayúsculas y números.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </label>

          <label
            htmlFor="confirmPassword"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Confirmar Contraseña
            <input
              type="password"
              id="confirmPassword"
              autoComplete="off"
              {...register("confirmPassword", {
                required: "Debes confirmar tu constraseña.",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden.",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
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

        <button
          type="submit"
          className="bg-secondary-color hover:bg-secondary-color/80 dark:bg-primary-color hover:dark:bg-primary-color/60 w-full p-2 rounded-md mt-4 mb-2 text-white transition-all"
        >
          Registrarse
        </button>

        <span className="w-full inline-block text-sm text-center mt-2 dark:text-difuminate-text-dark text-difuminate-text-light [&>a]:dark:text-white [&>a]:text-black transition-all">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="hover:underline hover:dark:text-primary-color hover:text-secondary-color"
          >
            Iniciar Sesión
          </Link>
        </span>

        {showMessage && responseMessage && (
          <div className="text-center my-4 p-2 bg-gray-100 dark:bg-gray-700 text-sm relative">
            {responseMessage}
            <button onClick={handleCloseMessage} className="absolute top-0 right-0 p-2">
              ✖
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
