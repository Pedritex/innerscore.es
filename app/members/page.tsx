import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase-server';
import MembersNav from './_components/MembersNav';

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const greetingName = user?.email
    ? user.email.split('@')[0]
    : 'miembro';

  return (
    <main className="min-h-dvh bg-[#fdf6f0]">
      <MembersNav email={user?.email ?? null} />

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div
          className="rounded-3xl bg-white p-8 md:p-12"
          style={{
            border: '1px solid #e8d5c8',
            boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
          }}
        >
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: 'rgba(34,197,94,0.12)',
              color: '#15803d',
            }}
          >
            Acceso activo
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold text-[#0f172a] md:text-4xl">
            ¡Bienvenido, {greetingName}!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#64748b] md:text-lg">
            Tu área de miembros de InnerScore está en construcción. Pronto
            tendrás acceso completo a todo tu contenido de inteligencia
            emocional: cursos, ejercicios y nuevas evaluaciones.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <PlaceholderCard
              title="Tu informe de IE"
              body="Revisa, descarga y comparte tu informe completo de 5 dimensiones."
              cta="Próximamente"
            />
            <PlaceholderCard
              title="Plan de 90 días"
              body="Tu hoja de ruta personalizada para desarrollar tu inteligencia emocional."
              cta="Próximamente"
            />
            <PlaceholderCard
              title="Tests adicionales"
              body="Profundiza en arquetipos, autoestima y crecimiento profesional."
              cta="Próximamente"
            />
            <PlaceholderCard
              title="Cursos y guías"
              body="Material exclusivo basado en el modelo de Goleman."
              cta="Próximamente"
            />
          </div>

          <p className="mt-10 text-center text-xs text-[#94a3b8]">
            ¿Necesitas ayuda?{' '}
            <Link
              href="/legal/legal-notice"
              className="font-medium text-[#0f172a] hover:underline"
            >
              Contáctanos
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function PlaceholderCard({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl p-5"
      style={{
        backgroundColor: '#fdf6f0',
        border: '1px solid #e8d5c8',
      }}
    >
      <p className="font-display text-lg font-bold text-[#0f172a]">{title}</p>
      <p className="mt-2 flex-1 text-sm text-[#64748b]">{body}</p>
      <span
        className="mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e8d5c8',
          color: '#64748b',
        }}
      >
        {cta}
      </span>
    </div>
  );
}
