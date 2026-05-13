export const metadata = {
  title: 'Política de Cookies — InnerScore',
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Política de Cookies
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Última actualización: 12 de mayo de 2026
      </p>

      <Section title="1. Qué cubre esta política">
        <p>
          Esta Política de Cookies explica cómo InnerScore utiliza cookies y
          tecnologías similares de almacenamiento local en{' '}
          <strong>innerscore.es</strong>. Complementa nuestra Política de
          Privacidad.
        </p>
      </Section>

      <Section title="2. Qué utilizamos y por qué">
        <p>
          InnerScore funciona deliberadamente sin cookies de analítica,
          publicidad o seguimiento. El único almacenamiento que guardamos en
          tu dispositivo es el estrictamente necesario para prestar el
          servicio que has solicitado:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>innerscore_session</strong> (localStorage del navegador)
            — guarda las respuestas que has dado hasta el momento y el
            correo que has introducido, para poder mostrarte la pantalla
            gratuita de resultados y trasladar los datos al checkout si
            decides adquirir el informe completo. Permanece únicamente en
            tu dispositivo.
          </li>
          <li>
            <strong>innerscore_cookies</strong> (localStorage del navegador)
            — registra tu respuesta al banner de cookies para no volver a
            preguntarte.
          </li>
        </ul>
        <p className="mt-3">
          Estos elementos se almacenan localmente en tu navegador. No son
          cookies en sentido estricto HTTP y no se envían a nuestros
          servidores en cada solicitud, pero cumplen una función similar y
          están sujetos a las normas de consentimiento de cookies.
        </p>
      </Section>

      <Section title="3. Servicios de terceros">
        <p>
          Cuando avanzas al checkout interactúas con <strong>Stripe</strong>,
          que coloca sus propias cookies en su dominio para gestionar la
          sesión de pago y detectar fraudes. Esas cookies están controladas
          por Stripe y se rigen por sus propias políticas de privacidad y
          cookies.
        </p>
        <p className="mt-3">
          Nuestro proveedor de alojamiento e infraestructura
          (<strong>Vercel</strong>) puede colocar cookies estrictamente
          funcionales necesarias para servir el sitio (por ejemplo, para
          enrutar el tráfico). No te identifican.
        </p>
      </Section>

      <Section title="4. Tus opciones">
        <p>
          El banner de cookies que ves en la primera visita te permite
          aceptar o rechazar. Como no usamos cookies no esenciales,
          rechazar no desactiva ninguna funcionalidad — lo único que cambia
          es que se registra tu decisión.
        </p>
        <p className="mt-3">
          Puedes borrar los valores almacenados en cualquier momento desde
          la configuración de tu navegador (Datos del sitio / Almacenamiento
          local). Una vez borrados, el banner volverá a aparecer en tu
          próxima visita.
        </p>
      </Section>

      <Section title="5. Actualizaciones">
        <p>
          Si en algún momento introducimos cookies adicionales (por
          ejemplo, analítica opcional), actualizaremos esta política y te
          volveremos a solicitar el consentimiento antes de activarlas.
        </p>
      </Section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold text-[#0f172a]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] text-[#0f172a]">
        {children}
      </div>
    </section>
  );
}
