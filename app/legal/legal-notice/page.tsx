export const metadata = {
  title: 'Aviso Legal — InnerScore',
};

export default function LegalNoticePage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Aviso Legal
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Última actualización: 12 de mayo de 2026
      </p>

      <Section title="1. Titular del sitio">
        <p>
          El sitio web <strong>innerscore.es</strong> (en adelante, el
          &ldquo;Sitio Web&rdquo;) es propiedad y está operado por{' '}
          <strong>FastwaySolutions</strong> (en adelante, el &ldquo;Titular&rdquo;
          o &ldquo;nosotros&rdquo;).
        </p>
        <p className="mt-3">
          NIF / Identificación fiscal: [pendiente de completar]<br />
          Domicilio social: [pendiente de completar]<br />
          Correo de contacto:{' '}
          <a
            href="mailto:legal@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            legal@innerscore.es
          </a>
        </p>
      </Section>

      <Section title="2. Objeto">
        <p>
          El Sitio Web ofrece una evaluación de inteligencia emocional (IE)
          online. Las personas usuarias completan un cuestionario de 14
          preguntas y, opcionalmente, pueden adquirir un informe en PDF
          personalizado de 15 páginas que se envía a su correo electrónico. No
          se envía ningún producto físico.
        </p>
      </Section>

      <Section title="3. Uso del Sitio Web">
        <p>
          El acceso al Sitio Web te otorga la condición de persona usuaria e
          implica la aceptación del presente Aviso Legal, así como de
          nuestras Condiciones del Servicio, Política de Privacidad y
          Política de Cookies. Te comprometes a utilizar el Sitio Web de
          buena fe, conforme a la normativa aplicable, y a no interferir en
          su funcionamiento normal.
        </p>
      </Section>

      <Section title="4. Propiedad intelectual">
        <p>
          Todo el contenido mostrado en el Sitio Web —textos, evaluaciones,
          metodología de puntuación, marco de arquetipos, gráficos,
          logotipos, código fuente y el informe en PDF— es propiedad del
          Titular o de sus licenciantes y está protegido por la legislación
          aplicable en materia de propiedad intelectual. Ninguna parte del
          Sitio Web ni de sus resultados puede ser reproducida, distribuida,
          modificada ni transmitida sin autorización previa por escrito,
          salvo para el uso personal y no comercial de tu propio informe
          adquirido.
        </p>
      </Section>

      <Section title="5. Responsabilidad">
        <p>
          El Titular realiza esfuerzos razonables para que la información
          facilitada en el Sitio Web sea exacta y esté actualizada. La
          evaluación de IE tiene fines exclusivamente de autorreflexión y
          educativos, y no constituye asesoramiento médico, psicológico ni
          terapéutico. El Titular no será responsable de las decisiones
          adoptadas sobre la base del informe.
        </p>
        <p className="mt-3">
          En la máxima medida permitida por la ley, el Titular declina toda
          responsabilidad por los daños derivados del uso del Sitio Web, las
          interrupciones del servicio o los contenidos de terceros enlazados
          desde el Sitio Web.
        </p>
      </Section>

      <Section title="6. Enlaces externos">
        <p>
          El Sitio Web puede contener enlaces a servicios de terceros que
          utilizamos para prestar el producto (pago, infraestructura,
          correo). El Titular no es responsable del contenido ni de las
          prácticas de esos terceros; su uso se rige por sus propias
          condiciones.
        </p>
      </Section>

      <Section title="7. Modificaciones">
        <p>
          El Titular se reserva el derecho a actualizar este Aviso Legal en
          cualquier momento. Resultará de aplicación la versión vigente en el
          momento del acceso.
        </p>
      </Section>

      <Section title="8. Ley aplicable y jurisdicción">
        <p>
          Este Aviso Legal se rige por la ley española. Cualquier
          controversia derivada del uso del Sitio Web se someterá a los
          juzgados y tribunales competentes del domicilio social del
          Titular, sin perjuicio de los derechos que correspondan a las
          personas consumidoras conforme a la legislación imperativa
          aplicable.
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
      <div className="mt-3 space-y-1 text-[15px] text-[#0f172a]">
        {children}
      </div>
    </section>
  );
}
