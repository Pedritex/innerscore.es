export default function SuccessPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-6 py-16">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-bold text-[#0f172a] md:text-5xl">
          Tu informe ya está en camino.
        </h1>
        <p className="mt-6 text-base text-[#64748b]">
          Revisa tu bandeja de entrada — tu informe personalizado de IE de 15
          páginas llegará en unos minutos.
        </p>
        <p className="mt-6 text-sm text-[#94a3b8]">
          ¿No lo has recibido? Revisa tu carpeta de spam.
        </p>
      </div>
    </main>
  );
}
