"use client";

import BrandLogo from "@/images/logos/variant-01";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CloseEyeIcon, OpenEyeIcon } from "@/components/icons";
import { useNotification } from "@/hooks/useNotification";
import { ColorizedButton } from "@/components/ui/pure/Buttons";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showNotification } = useNotification();
  const { login, user } = useAuth();
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    const { success, message } = await login(
      data.email_or_username,
      data.password
    );
    if (!success) showNotification(message, "error");
    else router.push("/");
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  return (
    <main className="bg-light-gray/15 dark:bg-dark-gray flex-grow flex justify-center items-center max-md:px-4 max-md:pb-16 relative">
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-background p-4 rounded-lg w-full max-w-[500px] h-fit max-md:my-8"
      >
        <BrandLogo className="w-14 h-auto mx-auto" />

        <h1 className="text-center text-md uppercase font-black font-sans mt-2">
          Iniciar Sesión
        </h1>
        <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mb-5">
          Inicia sesión en Nexa AI para comenzar a operar.
        </p>

        <div className="flex flex-col gap-2 [&>label]:w-full mb-2">
          <label
            htmlFor="email_or_username"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray"
          >
            Correo o nombre de usuario:
            <input
              type="email_or_username"
              id="email_or_username"
              autoComplete="off"
              {...register("email_or_username", {
                required: "El email es obligatorio.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9._-]{3,}$/,
                  message: "El formato del email es inválido.",
                },
              })}
            />
            {errors.email_or_username && (
              <p className="text-red-500 text-xs">
                {errors.email_or_username.message}
              </p>
            )}
          </label>

          <label htmlFor="password" className="flex flex-col">
            Contraseña:
            <div className="flex items-center gap-2 w-full [&>input]:w-full [&>input]:rounded-md [&>input]:p-2 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                autoComplete="off"
                {...register("password", {
                  required: "La contraseña es obligatoria.",
                })}
              />
              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="h-full w-fit block p-2.5 rounded-md dark:border-light-gray border cursor-pointer transition-all hover:border-black"
              >
                {isPasswordVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
              </span>
            </div>
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

        <ColorizedButton width="full" type="submit">
          Iniciar Sesión
        </ColorizedButton>

        <span className="w-full inline-block text-sm text-center mt-4 [&>a]:dark:text-difuminate-text-dark [&>a]:text-difuminate-text-light dark:text-white text-black transition-all">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="hover:underline hover:dark:text-primary-color hover:text-secondary-color"
          >
            Crea una cuenta
          </Link>
        </span>

        <span className="w-full inline-block text-sm text-center mt-2 [&>a]:dark:text-difuminate-text-dark [&>a]:text-difuminate-text-light dark:text-white text-black transition-all">
          ¿Olvidaste tu contraseña?{" "}
          <Link
            onClick={() =>
              showNotification(
                "No se puede restablecer la contraseña en este momento.",
                "error"
              )
            }
            href="#"
            className="hover:underline hover:dark:text-primary-color hover:text-secondary-color"
          >
            Restablecer contraseña
          </Link>
        </span>
      </form>
    </main>
  );
}
