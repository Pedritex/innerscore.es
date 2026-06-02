import Link from 'next/link';
import Header from '../components/Header';

export const metadata = {
  title: 'Quiénes somos — InnerScore',
  description:
    'InnerScore es una plataforma de evaluación de inteligencia emocional basada en el modelo de las 5 dimensiones de Daniel Goleman.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-6 text-center md:pt-20 md:pb-10">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(234,88,12,0.08)',
              border: '1px solid #fed7aa',
              color: '#ea580c',
            }}
          >
            Sobre nosotros
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl">
            Quiénes somos
          </h1>
        </div>
      </section>

      <section className="bg-[#fdf6f0] py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div
            className="rounded-3xl bg-white p-7 md:p-10"
            style={{
              border: '1px solid #e8d5c8',
              boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
            }}
          >
            <p className="text-base leading-relaxed text-[#0f172a] md:text-lg">
              InnerScore es una plataforma de autoevaluación de inteligencia
              emocional basada en el modelo de las 5 dimensiones de{' '}
              <strong>Daniel Goleman</strong>: Autoconciencia,
              Autorregulación, Motivación, Empatía y Habilidades Sociales.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] md:text-lg">
              Nuestro objetivo es darte un retrato honesto de cómo gestionas
              tus emociones hoy y un plan concreto para crecer. Combinamos un
              cuestionario validado con un análisis personalizado para que
              cualquier persona —sin formación previa en psicología— pueda
              entender su perfil emocional y empezar a evolucionarlo.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] md:text-lg">
              InnerScore es una herramienta educativa y de autorreflexión. No
              sustituye el asesoramiento profesional ni constituye un
              diagnóstico clínico.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02] md:text-lg"
              style={{
                backgroundColor: '#ea580c',
                boxShadow: '0 8px 24px rgba(234,88,12,0.35)',
              }}
            >
              Hacer el test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
