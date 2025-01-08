import Image from "next/image";
import HeroImg from "../../public/images/hero-image-01.jpg";
import * as Icons from "@/icons/index";

const iconMap = {
  "robot-wink": Icons.RobotWinkIcon,
  binary: Icons.BinaryIcon,
  stats: Icons.StatsIcon,
  padlock: Icons.PadlockIcon,
  thunder: Icons.ThunderIcon,
  processor: Icons.ProcessorIcon,
};

const benefits = [
  {
    title: "Trading impulsado por IA",
    description:
      "Algoritmos avanzados analizan patrones del mercado las 24 horas, los 7 días de la semana.",
    icon: "robot-wink",
  },
  {
    title: "Mercados sintéticos",
    description: "Comercia activos sintéticos con alta liquidez.",
    icon: "binary",
  },
  {
    title: "Análisis en tiempo real",
    description: "Herramientas avanzadas de gráficos y análisis de técnico.",
    icon: "stats",
  },
  {
    title: "Plataforma de trading segura",
    description: "Seguridad de nivel empresarial para tus activos.",
    icon: "padlock",
  },
  {
    title: "Ultra-rápido",
    description: "Comercia con velocidad y eficiencia.",
    icon: "thunder",
  },
  {
    title: "Automatización inteligente",
    description: "Automatiza tus estrategias de trading",
    icon: "processor",
  },
];

export default function Home() {
  return (
    <main>
      <section className="max-md:hidden">
        <div>
          <header>
            <h1>Comercia globalmente con análisis impulsados por IA</h1>
            <p>
              Experimenta el futuro del comercio en el mercado de sintéticos con
              nuestra avanzada plataforma de bots impulsada por IA.
            </p>
          </header>

          <div>
            <button>¡Comenzar ya!</button>
            <button>Conoce más</button>
          </div>
        </div>

        <Image src={HeroImg} alt="Hero Image" priority={true} />
      </section>

      <section>
        <h1>Revolucionando el comercio en el mercado global de sintéticos</h1>
        <p>
          Nuestra plataforma impulsada por inteligencia artificial ofrece
          capacidades avanzadas de trading con análisis de mercado en tiempo
          const real y estrategias de ejecución automatizadas en todo el mundo.
        </p>

        <div>
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];

            return (
              <article key={index}>
                {Icon && <Icon className="size-12" />}
                <div>
                  <h2>{benefit.title}</h2>
                  <span>{benefit.description}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h1>Conoce las Mentes Detrás de Nuestro Bot de Trading</h1>
        <p>
          Nuestra avanzada plataforma de trading impulsada por IA es el
          resultado de la colaboración entre dos expertos visionarios.
        </p>

        <article>
          {/* TODO: Add image */}
          <h2>Axel Miranda</h2>
          <h3>AI and Machine Learning Specialist</h3>
          <p>
            Axel es la mente maestra detrás de nuestros algoritmos de IA y
            aprendizaje automático. Su experiencia en desarrollo backend y
            ciencia de datos ha sido crucial para crear nuestro sofisticado bot
            de trading.
          </p>
        </article>

        <article>
          {/* TODO: Add image */}
          <h2>Miguel Terán</h2>
          <h3>Project Leader And Full-Stack Developer</h3>
          <p>
            Como líder del proyecto y propietario del negocio, Miguel supervisa
            tanto el desarrollo backend como frontend. Su visión y habilidad
            para forjar alianzas clave han sido fundamentales para dar vida a
            este proyecto.
          </p>
        </article>
      </section>

      <section>
        <h1>¿Listo para comenzar a comerciar globalmente?</h1>
        <p>
          Crea tu cuenta ahora y experimenta el futuro del comercio global en el
          mercado sintético.
        </p>

        <div>
          <button>Crear una cuenta</button>
          <button>Iniciar sesión</button>
        </div>
      </section>
    </main>
  );
}
