export const metadata = {
  title: 'Política de Privacidad — InnerScore',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Última actualización: 12 de mayo de 2026
      </p>

      <Section title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de tus datos personales es{' '}
          <strong>FastwaySolutions</strong>, titular de{' '}
          <strong>innerscore.es</strong>.
        </p>
        <p className="mt-3">
          Contacto:{' '}
          <a
            href="mailto:privacy@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            privacy@innerscore.es
          </a>
        </p>
      </Section>

      <Section title="2. Datos que recogemos">
        <List
          items={[
            <>
              <strong>Dirección de correo electrónico</strong> — la facilitas
              tú para recibir tu informe.
            </>,
            <>
              <strong>Respuestas del test</strong> — las 30 respuestas
              numéricas (1–5) que envías durante la evaluación.
            </>,
            <>
              <strong>Resultado calculado</strong> — puntuación global de IE,
              puntuaciones por dimensión y arquetipo emocional derivados de
              tus respuestas.
            </>,
            <>
              <strong>Información de pago</strong> — la gestiona
              directamente nuestro proveedor de pagos (Stripe). No
              almacenamos los datos completos de la tarjeta en nuestros
              servidores; recibimos únicamente un identificador de la
              transacción y el correo asociado a la compra.
            </>,
            <>
              <strong>Datos técnicos</strong> — información mínima de
              registro como dirección IP y agente de usuario generada por
              nuestro proveedor de alojamiento por motivos de seguridad y
              operativos.
            </>,
          ]}
        />
      </Section>

      <Section title="3. Finalidades y bases jurídicas">
        <List
          items={[
            <>
              <strong>Prestar la evaluación de IE gratuita y la vista
              previa gratuita de resultados</strong> — base jurídica:
              ejecución de un contrato / aplicación de medidas
              precontractuales a tu solicitud (art. 6.1.b RGPD).
            </>,
            <>
              <strong>Generar y enviar por correo el informe de 15
              páginas de pago</strong> — base jurídica: ejecución de un
              contrato (art. 6.1.b RGPD).
            </>,
            <>
              <strong>Procesar el pago</strong> — base jurídica: ejecución
              de un contrato y cumplimiento de obligaciones legales (art.
              6.1.b y c RGPD).
            </>,
            <>
              <strong>Atender solicitudes de soporte y ejercicio de
              derechos</strong> — base jurídica: interés legítimo en
              prestar soporte a las personas usuarias (art. 6.1.f RGPD) y
              cumplimiento de obligaciones legales conforme al RGPD.
            </>,
          ]}
        />
      </Section>

      <Section title="4. Destinatarios (encargados del tratamiento)">
        <p>
          Para operar el servicio nos apoyamos en los siguientes encargados.
          Cada uno actúa bajo un contrato de tratamiento de datos y solo
          trata los datos siguiendo nuestras instrucciones:
        </p>
        <List
          items={[
            <>
              <strong>Stripe</strong> — procesamiento de pagos.
            </>,
            <>
              <strong>Supabase</strong> — alojamiento de la base de datos
              de compras.
            </>,
            <>
              <strong>Anthropic</strong> — generación mediante IA del
              contenido del informe personalizado a partir de tus
              respuestas y tu puntuación.
            </>,
            <>
              <strong>Resend</strong> — envío por correo electrónico del
              informe en PDF.
            </>,
            <>
              <strong>Vercel</strong> — alojamiento del sitio web y de las
              funciones serverless.
            </>,
          ]}
        />
      </Section>

      <Section title="5. Transferencias internacionales">
        <p>
          Algunos de nuestros encargados están ubicados fuera del Espacio
          Económico Europeo (principalmente en Estados Unidos). Cuando
          procede, las transferencias se realizan con las garantías
          adecuadas, como las Cláusulas Contractuales Tipo de la Comisión
          Europea, complementadas, cuando es necesario, con medidas
          técnicas y organizativas adicionales.
        </p>
      </Section>

      <Section title="6. Conservación">
        <p>
          Conservamos tu dirección de correo electrónico y el registro de
          compra (incluidas las respuestas del test y el resultado
          calculado) durante el tiempo necesario para prestar el servicio y
          cumplir con nuestras obligaciones legales (habitualmente registros
          contables y fiscales: hasta 6 años). Pasado ese plazo, los datos
          se eliminan o anonimizan. Puedes solicitar su eliminación
          anticipada, sujeta a esas obligaciones legales (véase el apartado
          8).
        </p>
      </Section>

      <Section title="7. Tratamientos automatizados">
        <p>
          Tu puntuación global de IE, las puntuaciones por dimensión y tu
          arquetipo se calculan automáticamente a partir de tus respuestas.
          El contenido del informe personalizado se genera mediante un
          modelo de lenguaje a partir de esas puntuaciones y tus
          respuestas. Este tratamiento no produce efectos jurídicos sobre
          ti y se realiza a petición tuya como parte del servicio que has
          adquirido; no constituye una decisión automatizada en el sentido
          del art. 22 del RGPD.
        </p>
      </Section>

      <Section title="8. Tus derechos">
        <p>
          De conformidad con el RGPD, tienes derecho a: acceder a tus datos
          personales; rectificar los datos inexactos; solicitar la
          supresión de tus datos; limitar u oponerte al tratamiento;
          recibir tus datos en un formato portátil; y retirar cualquier
          consentimiento en cualquier momento (sin que ello afecte a la
          licitud del tratamiento previo a la retirada).
        </p>
        <p className="mt-3">
          Para ejercer cualquiera de estos derechos, escríbenos a{' '}
          <a
            href="mailto:privacy@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            privacy@innerscore.es
          </a>
          . Responderemos en los plazos previstos por la ley.
        </p>
        <p className="mt-3">
          También tienes derecho a presentar una reclamación ante la
          autoridad de control competente — en España, la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1d4ed8] hover:underline"
          >
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </Section>

      <Section title="9. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para
          proteger los datos personales frente a accesos, alteraciones,
          divulgaciones o destrucciones no autorizadas. Las conexiones al
          Sitio Web se cifran mediante TLS y el acceso a los sistemas de
          backend está restringido a cuentas autorizadas.
        </p>
      </Section>

      <Section title="10. Cambios en esta política">
        <p>
          Podemos actualizar esta Política de Privacidad cuando cambien
          nuestros tratamientos o cuando la ley lo exija. Indicaremos la
          fecha de la última revisión en la parte superior de esta página.
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

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 list-disc space-y-2 pl-6 text-[15px] text-[#0f172a]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
