"use client";

import Loader from "@/components/ui/Loader";
import {
  CalendarIcon,
  ClockIcon,
  CloudUploadIcon,
  TrashIcon,
} from "@/components/icons/index";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import avatars from "@/utils/avatars";
import Image from "next/image";
import DefaultAvatar from "@/images/avatars/default-avatar.png";
import { useRouter } from "next/navigation";
import apiService from "@/services/apiService";

export default function UserProfile() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");

      try {
        if (token && id) {
          const response = await apiService.get(`/get_user/${id}`, {
            Authorization: `Bearer ${token}`,
          });
          setUser(response);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (!token || !id) {
      router.push("/");
      return;
    }

    // Filtrar valores null/undefined/empty y validar campos requeridos
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) =>
          value && typeof value === "string" && value.trim() !== ""
      )
    );

    if (Object.keys(filteredData).length === 0) {
      setError("Por favor llena al menos un campo del formulario.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Validar formato de email si está presente
    if (
      filteredData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(filteredData.email)
    ) {
      setError("Por favor ingresa un correo electrónico válido");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post(
        `/update_user/${id}`,
        filteredData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // Actualizar estado sólo si la petición fue exitosa
      setUser((prevUser) => ({
        ...prevUser,
        ...filteredData,
        updated_at: new Date().toISOString(),
      }));

      setSuccess(response.message);
      reset();

      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error al actualizar el perfil"
      );
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirmAvatar = async () => {
    if (selectedAvatar) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");

      try {
        setLoading(true);
        const response = await apiService.post(
          `/update_user/${id}`,
          { avatar: selectedAvatar },
          {
            Authorization: `Bearer ${token}`,
          }
        );

        setUser((prev) => ({
          ...prev,
          avatar: selectedAvatar,
        }));

        setSuccess(response.message || "Avatar actualizado correctamente");
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error al actualizar el avatar"
        );
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    }
  };

  const handleRemoveAvatar = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    try {
      setLoading(true);
      const response = await apiService.post(
        `/update_user/${id}`,
        { avatar: null },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setUser((prev) => ({
        ...prev,
        avatar: null,
      }));

      setSuccess(response.message || "Avatar eliminado correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error al eliminar el avatar");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAvatar = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="w-full min-h-[calc(100dvh-14dvh)] p-5 max-md:pb-28 relative">
        <h1 className="text-lg font-sans font-bold">Perfil de Usuario</h1>

        <div className="border border-dark-gray dark:border-dark-gray w-full p-4 rounded-lg mt-5">
          <h2 className="text-md font-bold mb-2 max-md:text-center">
            Información Personal
          </h2>
          <p className="text-sm max-md:text-center text-difuminate-text-light dark:text-difuminate-text-dark">
            Actualiza tu información de perfil y personaliza tu cuenta.
          </p>

          <div className="mt-5 flex max-md:flex-col md:items-center gap-5">
            <Image
              src={user?.avatar || DefaultAvatar}
              alt={user?.avatar ? "Avatar selected" : "Default Avatar"}
              width={250}
              height={250}
              className="size-32 object-cover aspect-square rounded-full max-md:mx-auto"
            />

            <div className="md:space-y-4 max-md:flex max-md:items-center max-md:justify-evenly">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="dark:hover:bg-white/80 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md transition-all"
              >
                Cambiar foto
              </button>
              <button
                onClick={handleRemoveAvatar}
                type="button"
                className="flex items-center border hover:border-red-700/80 hover:text-red-700/80 border-red-500 text-red-500 rounded-md p-2 transition-all"
              >
                <TrashIcon /> Eliminar
              </button>
            </div>
          </div>

          <div className="mt-5 p-5 rounded-lg border border-dark-gray dark:border-dark-gray">
            <div className="flex max-md:flex-col-reverse max-md:gap-4 justify-between items-start">
              <div className="flex flex-col gap-1 w-full md:max-w-[45%]">
                {loading ? (
                  <div className="w-full h-[30px] overflow-hidden rounded-lg">
                    <Loader />
                  </div>
                ) : (
                  <h2 className="text-md font-bold font-sans">
                    {user.name} {user.last_name}
                  </h2>
                )}
                {loading ? (
                  <div className="w-full h-[30px] overflow-hidden rounded-lg">
                    <Loader />
                  </div>
                ) : (
                  <span className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    @{user.username}
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
                  <div className="w-full max-w-[80%] h-[30px] overflow-hidden rounded-lg mt-1">
                    <Loader />
                  </div>
                ) : (
                  <span className="text-sm">{user.email}</span>
                )}
              </div>

              {/* TODO: Agregar el país como columna en la bd */}
              <div>
                <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                  País
                </h3>
                <span className="text-sm">Bolivia</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5 text-difuminate-text-light dark:text-difuminate-text-dark" />
                <div>
                  <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    Cuenta creada
                  </h3>
                  {loading ? (
                    <div className="w-full max-w-[80%] h-[30px] overflow-hidden rounded-lg mt-1">
                      <Loader />
                    </div>
                  ) : (
                    <span className="text-sm">
                      {user.created_at
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
                <div>
                  <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                    Última modificación
                  </h3>
                  {loading ? (
                    <div className="w-full max-w-[80%] h-[30px] overflow-hidden rounded-lg mt-1">
                      <Loader />
                    </div>
                  ) : (
                    <span className="text-sm">
                      {user.updated_at
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

            <div className="w-full flex max-md:flex-col gap-4 mt-5 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:dark:bg-dark-background [&>label>input]:bg-white [&>label>input]:border [&>label>input]:border-dark-gray [&>label>input]:dark:border-light-gray [&>label>input]:mt-1">
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

            <button
              type="submit"
              disabled={loading}
              className={`dark:hover:bg-white/80 bg-black text-white dark:bg-white dark:text-black p-2 mt-5 rounded-md transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      </section>

      {/* MODAL DE SUBIDA DE IMAGEN */}
      <div
        onClick={handleBackdropClick}
        className={`w-full min-h-dvh bg-black/50 z-30 fixed top-0 left-0 flex justify-center items-center transition-opacity duration-100 ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <article
          className={`bg-white dark:bg-dark-background border-dark-gray border rounded-lg p-6 w-[90%] h-fit max-w-2xl transform transition-all duration-300 ${
            isModalOpen ? "scale-100" : "scale-0"
          }`}
        >
          <h1 className="text-md font-black font-sans mb-4">
            Seleccionar Avatar
          </h1>

          <div>
            <h2 className="text-sm mb-2">Avatares disponibles</h2>
            <div>
              <div className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fit,_minmax(40px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(56px,1fr))] md:grid-cols-[repeat(auto-fit,_minmax(80px,1fr))]">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-full cursor-pointer transition-all border-2 ${
                      selectedAvatar === avatar
                        ? "border-black/30 dark:border-white/80"
                        : "hover:border-dark-gray border-black/30 hover:dark:border-white/80"
                    }`}
                    tabIndex={0}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <Image
                      src={avatar}
                      alt="Default avatar"
                      width={250}
                      height={250}
                      className="size-10 sm:size-14 md:size-20 object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm mt-6 mb-4">Subir imagen personalizada</h2>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-dark-gray hover:bg-light-gray/20 p-4"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUploadIcon className="size-12 text-difuminate-text-light dark:text-difuminate-text-dark" />
                  <p className="mb-2 text-sm text-difuminate-text-light dark:text-difuminate-text-dark text-center">
                    <span className="font-semibold">Click para subir</span> o
                    arrastra y suelta tu imagen
                  </p>
                  <p className="text-xs text-difuminate-text-light dark:text-difuminate-text-dark text-center">
                    SVG, PNG, JPG or GIF (MAX. 512x512px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <div className="mt-5 flex justify-between gap-4 [&>button]:py-2 [&>button]:rounded-md">
              <button
                onClick={handleCancelAvatar}
                className="border dark:border-dark-gray hover:border-black dark:text-difuminate-text-dark hover:dark:text-white hover:dark:border-white/50 transition-all w-full"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAvatar}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black hover:dark:bg-white/80 transition-all w-full"
              >
                Confirmar
              </button>
            </div>
          </div>
        </article>
      </div>

      {error && (
        <p className="absolute bottom-8 right-8 text-white bg-red-600 dark:bg-red-800 px-4 py-2 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="absolute bottom-8 right-8 text-white bg-green-600 dark:bg-green-800 px-4 py-2 rounded-md">
          {success}
        </p>
      )}
    </>
  );
}
