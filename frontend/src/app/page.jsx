"use client";

import Image from "next/image";
import HeroImg from "@/images/hero-image-01.jpg";
import * as Icons from "@/components/icons/index";
import Faq from "@/components/ui/Faq";
import { useTheme } from "@/hooks/useTheme";
import MarketTicker from "@/components/ui/MarketTicker";
import Loader from "@/components/ui/Loader";
import Link from "next/link";

const iconMap = {
  "robot-wink": Icons.RobotWinkIcon,
  binary: Icons.BinaryIcon,
  stats: Icons.StatsIcon01,
  padlock: Icons.PadlockIcon,
  thunder: Icons.ThunderIcon,
  processor: Icons.ProcessorIcon,
};

const benefits = [
  {
    title: "Trading impulsado por IA",
    description:
      "Algoritmos avanzados analizando los patrones del mercado 24/7.",
    icon: "robot-wink",
  },
  {
    title: "Mercados sintéticos",
    description:
      "Opera con activos sintéticos que ofrecen alta liquidez y flexibilidad.",
    icon: "binary",
  },
  {
    title: "Análisis en tiempo real",
    description: "Herramientas avanzadas de gráficos y análisis técnico.",
    icon: "stats",
  },
  {
    title: "Plataforma segura",
    description:
      "Seguridad avanzada de nivel empresarial para proteger tus activos.",
    icon: "padlock",
  },
  {
    title: "Rendimiento excepcional",
    description:
      "Ejecuta operaciones en cuestión de milisegundos con precisión y rapidez.",
    icon: "thunder",
  },
  {
    title: "Automatización inteligente",
    description:
      "Automatiza tus estrategias de trading de forma eficiente y sin complicaciones.",
    icon: "processor",
  },
];

const mindsBehind = [
  {
    name: "Axel Miranda",
    occupation: "Especialista en IA y Machine Learning",
    about:
      "Axel es el cerebro detrás de nuestros algoritmos de IA y machine learning. Su experiencia en desarrollo backend y ciencia de datos ha sido crucial en la creación de nuestro sofisticado bot de trading.",
  },
  {
    name: "Miguel Terán",
    occupation: "Líder del Proyecto y Desarrollador FullStack",
    about:
      "Como líder del proyecto y desarrollador FullStack, Miguel supervisa el desarrollo tanto del backend como del frontend. Su visión y capacidad para forjar alianzas clave han sido fundamentales para dar vida a este proyecto.",
  },
  {
    name: "Deivy Figueredo",
    occupation: "Inversor Estratégico y Asesor Legal",
    about:
      "Nuestro estimado inversor financiero jugó un papel crucial en dar vida a este proyecto. Su inversión y experiencia en asuntos legales han sido fundamentales para establecer una base sólida para nuestra empresa de bots de trading.",
  },
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="container mx-auto px-4 max-md:pt-4 pt-14 pb-8 max-md:pb-24">
      <section className="flex items-center max-md:flex-col gap-4 lg:gap-10 max-md:mb-8 mb-20">
        <div className="max-md:text-center w-full md:w-1/2">
          <h1
            className={`font-bold font-sans text-lg mb-2 ${
              theme === "light" ? "text-gradient-light" : "text-gradient-dark"
            }`}
          >
            Comercia Globalmente con Análisis Impulsado por IA
          </h1>
          <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm">
            Experimenta el futuro del trading en mercados sintéticos con nuestra
            avanzada plataforma de bots de IA.
          </p>

          <div className="flex max-md:justify-center gap-4 my-4">
            <Link
              href="/market"
              className="primary-button text-white tracking-wide dark:bg-primary-color hover:dark:bg-primary-color/60 bg-secondary-color hover:bg-secondary-color/80 transition-all p-2 rounded-md"
            >
              Comenzar a Operar
            </Link>
            <button className="p-2 rounded-md tracking-wide border-difuminate-text-dark hover:border-difuminate-text-light dark:border-light-gray border hover:dark:text-difuminate-text-dark transition-all">
              Saber más
            </button>
          </div>

          <div className="pt-4">
            <h2 className="text-md font-bold font-sans mb-2">
              Visión General del Mercado Global
            </h2>
            <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm">
              Sigue los movimientos del mercado sintético en tiempo real a
              través del globo y ejecuta operaciones con precisión.
            </p>

            <div className="lg:max-w-[80%] border-difuminate-text-dark dark:border-light-gray border p-2 rounded-md overflow-x-hidden mt-4">
              <MarketTicker />
            </div>
          </div>
        </div>

        <div className="w-full md:1/2">
          <Image
            src={HeroImg}
            alt="Hero Image"
            width={"auto"}
            height={"auto"}
            priority
            className="w-full h-auto object-cover md:object-contain rounded-3xl"
          />
        </div>
      </section>

      <section className="mb-12">
        <h1 className="text-lg text-center font-bold font-sans">
          Revolucionando el Trading en Mercados Sintéticos Globales
        </h1>
        <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mt-2 block md:max-w-[70%] mx-auto">
          Nuestra plataforma impulsada por IA proporciona capacidades avanzadas
          de trading con análisis de mercado en timepo real y estrategias de
          ejecución automatizadas en todo el mundo.
        </p>

        <div className="mt-5 grid justify-items-center gap-8 grid-cols-[repeat(auto-fit,_minmax(290px,1fr))]">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <article
                key={index}
                className="border-difuminate-text-dark dark:border-light-gray border rounded-md p-4 w-full relative overflow-hidden"
              >
                <Icon className="size-12 text-secondary-color dark:text-primary-color" />
                <h3 className="text-md font-semibold font-sans mb-2 mt-4">
                  {benefit.title}
                </h3>
                <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm">
                  {benefit.description}
                </p>

                <div className="size-24 rounded-full dark:bg-primary-color/30 bg-secondary-color/10 absolute -top-5 -right-5" />
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="bg-gradient-light-section dark:bg-gradient-dark-section p-4 rounded-lg">
          <h1 className="text-lg font-bold font-sans text-center">
            Conoce a las Mentes Detrás de Nuestro Bot de Trading
          </h1>
          <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm text-center mt-2 block md:max-w-[60%] mx-auto">
            Nuestra avanzada plataforma de trading impulsada por IA es el
            resultado de la colaboración entre expertos visionarios.
          </p>

          <div className="mt-5 grid justify-items-center gap-8 grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
            {mindsBehind.map((collaborator, index) => (
              <article
                key={index}
                className="bg-white dark:bg-dark-background p-4 rounded-lg space-y-2"
              >
                <Loader
                  uniqueId={index}
                  className="rounded-full size-28 mx-auto"
                />

                <h2 className="font-bold text-md mt-4 pb-2">
                  {collaborator.name}
                </h2>
                <span className="dark:text-difuminate-text-dark text-difuminate-text-light">
                  {collaborator.occupation}
                </span>
                <p className="text-sm">{collaborator.about}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h1 className="text-center text-lg font-bold font-sans mb-6">
          Preguntas Frecuentes
        </h1>
        <Faq />
      </section>
    </main>
  );
}
