'use client';

import { useState } from 'react';
import Header from '../components/Header';

const SUBJECT_OPTIONS = [
  'Pregunta general',
  'Problema con el acceso',
  'Cancelar suscripción',
  'Solicitar reembolso',
  'Error en el test',
  'Otro',
];

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#fdf6f0]">
      <Header />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-6 text-center md:pt-20 md:pb-10">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(29,78,216,0.08)',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
            }}
          >
            Soporte
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl">
            Contacto
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748b] md:text-lg">
            Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      <section className="bg-[#fdf6f0] py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <InfoCard
        title="Email"
        emphasized
      >
        <a
          href="mailto:support@innerscore.es"
          className="font-display text-lg font-bold text-[#1d4ed8] hover:underline md:text-xl"
        >
          support@innerscore.es
        </a>
        <p className="mt-2 text-sm text-[#64748b]">
          Respondemos en menos de 24 horas en días laborables.
        </p>
      </InfoCard>

      <InfoCard title="Cancelar suscripción">
        <p className="text-sm leading-relaxed text-[#0f172a] md:text-base">
          Si quieres cancelar tu suscripción escríbenos a{' '}
          <a
            href="mailto:support@innerscore.es?subject=Cancelar%20suscripci%C3%B3n"
            className="text-[#1d4ed8] hover:underline"
          >
            support@innerscore.es
          </a>{' '}
          con el asunto <strong>Cancelar suscripción</strong> y lo
          gestionamos de inmediato.
        </p>
      </InfoCard>

      <InfoCard title="Solicitar reembolso">
        <p className="text-sm leading-relaxed text-[#0f172a] md:text-base">
          Si no estás satisfecho durante los 7 días de prueba, escríbenos
          y tramitamos el reembolso sin preguntas.
        </p>
      </InfoCard>
    </div>
  );
}

function InfoCard({
  title,
  emphasized = false,
  children,
}: {
  title: string;
  emphasized?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl bg-white p-6"
      style={{
        border: emphasized ? '1px solid #bfdbfe' : '1px solid #e8d5c8',
        boxShadow: emphasized
          ? '0 12px 28px rgba(29,78,216,0.10)'
          : '0 10px 24px rgba(15,23,42,0.04)',
      }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const messageTooShort = message.trim().length > 0 && message.trim().length < 20;
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length >= 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center md:p-10"
        style={{
          border: '1px solid #e8d5c8',
          boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
        }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full text-white"
          style={{
            backgroundColor: '#22c55e',
            boxShadow: '0 10px 25px rgba(34,197,94,0.35)',
          }}
          aria-hidden
        >
          <CheckIcon />
        </span>
        <h2 className="font-display mt-5 text-2xl font-bold text-[#0f172a] md:text-3xl">
          Mensaje enviado
        </h2>
        <p className="mt-3 text-sm text-[#64748b] md:text-base">
          Te responderemos en menos de 24 horas.
        </p>
        <button
          type="button"
          onClick={() => {
            setName('');
            setEmail('');
            setSubject(SUBJECT_OPTIONS[0]);
            setMessage('');
            setSubmitted(false);
          }}
          className="mt-6 text-sm font-medium text-[#1d4ed8] hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 md:p-8"
      style={{
        border: '1px solid #e8d5c8',
        boxShadow: '0 10px 24px rgba(15,23,42,0.04)',
      }}
    >
      <Field label="Nombre">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        />
      </Field>

      <Field label="Email">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@ejemplo.com"
          className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        />
      </Field>

      <Field label="Asunto">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mensaje">
        <textarea
          required
          rows={6}
          minLength={20}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntanos en qué podemos ayudarte (mínimo 20 caracteres)..."
          className="w-full resize-y rounded-lg bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30"
          style={{ border: '1px solid #e8d5c8' }}
        />
        {messageTooShort ? (
          <p className="mt-1.5 text-xs text-[#c2410c]">
            Tu mensaje debe tener al menos 20 caracteres.
          </p>
        ) : null}
      </Field>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 w-full rounded-xl px-6 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: '#1d4ed8',
          boxShadow: '0 8px 24px rgba(29,78,216,0.35)',
        }}
      >
        Enviar mensaje
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[#0f172a]">{label}</span>
      {children}
    </label>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
