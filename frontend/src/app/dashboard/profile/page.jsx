"use client";

import Loader from "@/components/ui/pure/Loader";
import { CalendarIcon, ClockIcon, TrashIcon } from "@/components/icons/index";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import avatars from "@/utils/avatars";
import Image from "next/image";
import DefaultAvatar from "@/images/avatars/default-avatar.png";
import apiService from "@/services/apiService";
import { useNotification } from "@/hooks/useNotification";
import { DestructiveButton, PrimaryButton } from "@/components/ui/pure/Buttons";

export default function UserProfile() {
  const { showNotification } = useNotification();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");

      try {
        if (token && id) {
          const response = await apiService.get("/get_user");

          setUser(response.user); // Set user data after successful fetch

          setLoading(false); // End loading when data is received
        } else {
          showNotification(
            "No se encontró ningún usuario autenticado",
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // End loading if there's an error
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      showNotification("Por favor, llena al menos un campo.", "error");
      return;
    }

    showNotification(
      "En este momento no se puede actualizar el perfil.",
      "error"
    );

    console.log(token, id);
  };

  return (
    <>
      <>
        <h1 className="text-lg font-sans font-bold">Perfil del Usuario</h1>

        <div className="border border-dark-gray dark:border-dark-gray w-full p-4 rounded-lg mt-5">
          <h2 className="text-md font-bold mb-2 max-md:text-center">
            Información personal
          </h2>
          <p className="text-sm max-md:text-center text-difuminate-text-light dark:text-difuminate-text-dark">
            Actualiza tu información personal y personaliza tu cuenta.
          </p>

          <div className="mt-5 flex max-md:flex-col md:items-center gap-5">
            {loading ? (
              <div className="size-32 rounded-full flex justify-center items-center">
                <Loader className="rounded-[inherit]" />
              </div>
            ) : (
              <Image
                src={DefaultAvatar}
                alt="Avatar"
                width={250}
                height={250}
                className="size-32 object-cover aspect-square rounded-full max-md:mx-auto"
              />
            )}

            <div className="md:space-y-4 max-md:flex max-md:items-center max-md:justify-evenly">
              <PrimaryButton type="button">Cambiar foto</PrimaryButton>
              <DestructiveButton type="button">
                <TrashIcon /> Eliminar
              </DestructiveButton>
            </div>
          </div>

          <div className="mt-5 p-5 rounded-lg border border-dark-gray dark:border-dark-gray">
            <div className="flex max-md:flex-col-reverse max-md:gap-4 justify-between items-start">
              <div className="flex flex-col gap-2 w-full md:max-w-[45%]">
                {loading ? (
                  <div className="w-full h-[30px] overflow-hidden rounded-lg">
                    <Loader />
                  </div>
                ) : (
                  <h2 className="text-md font-bold font-sans">
                    {user ? `${user.name} ${user.last_name}` : "-"}
                  </h2>
                )}
                {loading ? (
                  <div className="w-full h-[30px] overflow-hidden rounded-lg">
                    <Loader />
                  </div>
                ) : (
                  <span className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    {user ? `@${user.username}` : "-"}
                  </span>
                )}
              </div>

              <div className="rounded-full px-4 py-1 w-fit bg-gradient-pro text-white text-xs font-bold font-sans">
                Pro
              </div>
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 mt-5">
              <div>
                <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                  Correo electrónico
                </h3>
                {loading ? (
                  <div className="w-full max-w-[90%] h-[30px] overflow-hidden rounded-lg mt-1">
                    <Loader />
                  </div>
                ) : (
                  <span className="text-sm">{user?.email}</span>
                )}
              </div>

              <div>
                <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                  País
                </h3>
                <span className="text-sm">Bolivia</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5 text-difuminate-text-light dark:text-difuminate-text-dark" />
                <div className="w-full">
                  <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    Cuenta creada
                  </h3>
                  {loading ? (
                    <div className="w-full max-w-[90%] h-[30px] overflow-hidden rounded-lg mt-1">
                      <Loader />
                    </div>
                  ) : (
                    <span className="text-sm">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon className="size-5 text-difuminate-text-light dark:text-difuminate-text-dark" />
                <div className="w-full">
                  <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    Última modificación
                  </h3>
                  {loading ? (
                    <div className="w-full max-w-[90%] h-[30px] overflow-hidden rounded-lg mt-1">
                      <Loader />
                    </div>
                  ) : (
                    <span className="text-sm">
                      {user?.updated_at
                        ? new Date(user.updated_at).toLocaleString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex max-md:flex-col gap-4 mt-5 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:dark:bg-dark-background [&>label>input]:bg-white [&>label>input]:border [&>label>input]:border-dark-gray [&>label>input]:dark:border-light-gray [&>label>input]:mt-1">
              <label htmlFor="name">
                Nombres:
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  autoComplete="off"
                />
              </label>
              <label htmlFor="last_name">
                Apellidos:
                <input
                  id="last_name"
                  type="text"
                  {...register("last_name")}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="w-full flex max-md:flex-col gap-4 mt-5 mb-5 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:dark:bg-dark-background [&>label>input]:bg-white [&>label>input]:border [&>label>input]:border-dark-gray [&>label>input]:dark:border-light-gray [&>label>input]:mt-1">
              <label htmlFor="username">
                Nombre de usuario:
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  autoComplete="off"
                />
              </label>
              <label htmlFor="email">
                Correo electrónico:
                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  autoComplete="off"
                />
              </label>
            </div>

            <PrimaryButton type="submit">Guardar cambios</PrimaryButton>
          </form>
        </div>
      </>

      {/* Avatar Selection Modal */}
      <div
        // onClick={handleBackdropClick}
        className={`w-full min-h-dvh bg-black/50 z-30 fixed top-0 left-0 flex justify-center items-center transition-opacity duration-1000 ${
          !true ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="relative p-5 max-w-[320px] w-full bg-white dark:bg-dark-background rounded-xl">
          <h3 className="text-lg text-center font-sans">
            Selecciona un avatar
          </h3>
          <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
            {avatars.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex justify-center items-center cursor-pointer rounded-xl overflow-hidden transition-all ease-in-out ${
                  !true ? "scale-125" : ""
                }`}
                // onClick={() => handleAvatarSelect(item)}
              >
                <Image
                  src={item}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="object-cover aspect-square"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-evenly gap-4 mt-5">
            <button
              // onClick={handleCancelAvatar}
              type="button"
              className="bg-red-500 text-white w-full p-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              // onClick={handleConfirmAvatar}
              type="button"
              className="bg-green-500 text-white w-full p-2 rounded-md"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
