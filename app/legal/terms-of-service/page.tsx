export const metadata = {
  title: 'Condiciones del Servicio — InnerScore',
};

export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Condiciones del Servicio
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Última actualización: 12 de mayo de 2026
      </p>

      <Section title="1. Quiénes somos">
        <p>
          InnerScore está operado por <strong>FastwaySolutions</strong>
          (&ldquo;nosotros&rdquo;), a través del sitio web{' '}
          <strong>innerscore.es</strong>. Al utilizar el sitio web aceptas
          estas Condiciones del Servicio, la Política de Privacidad y la
          Política de Cookies. Si no estás de acuerdo, por favor no
          utilices el servicio.
        </p>
      </Section>

      <Section title="2. El servicio">
        <p>
          InnerScore ofrece un cuestionario de autoevaluación sobre
          inteligencia emocional (30 preguntas en 5 dimensiones). Al
          completar el test recibes una vista previa gratuita en pantalla
          de tu puntuación global, tus puntuaciones por dimensión y tu
          arquetipo emocional.
        </p>
        <p className="mt-3">
          Posteriormente puedes adquirir, de forma opcional, el{' '}
          <strong>Informe Completo</strong>: un PDF personalizado de 15
          páginas generado automáticamente a partir de tus respuestas y de
          tu resultado, enviado al correo electrónico que indiques. No se
          envía ningún producto físico.
        </p>
      </Section>

      <Section title="3. Precio y pago">
        <p>
          El Informe Completo tiene un precio único de{' '}
          <strong>9,99 £ (GBP)</strong>, impuestos incluidos cuando proceda.
          El precio se muestra en la página de resultados antes de la
          compra. El pago lo procesa <strong>Stripe</strong>; no
          almacenamos los datos completos de la tarjeta en nuestros
          servidores.
        </p>
        <p className="mt-3">
          La compra es una transacción única. No hay suscripción
          recurrente, ni renovación automática, ni cargos ocultos.
        </p>
      </Section>

      <Section title="4. Entrega">
        <p>
          Una vez confirmado el pago por Stripe, la generación de tu
          Informe Completo se inicia automáticamente. El PDF se entrega
          normalmente por correo electrónico en unos minutos. Por favor,
          revisa la carpeta de spam si no lo ves poco después de la
          compra.
        </p>
      </Section>

      <Section title="5. Derecho de desistimiento — contenido digital">
        <p>
          El Informe Completo es contenido digital que se entrega
          inmediatamente tras el pago y, por tanto, queda sujeto a la
          exención legal del plazo de 14 días de derecho de desistimiento
          que normalmente se aplica a las compras de consumo.
        </p>
        <p className="mt-3">
          Al hacer clic en{' '}
          <em className="italic text-[#ea580c]">
            &ldquo;Quiero mi informe completo&rdquo;
          </em>{' '}
          en la página de resultados:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>consientes expresamente</strong> que el suministro del
            contenido digital comience de forma inmediata, antes de que
            expire el plazo de desistimiento de 14 días; y
          </li>
          <li>
            <strong>reconoces</strong> que, por tanto, pierdes tu derecho
            de desistimiento una vez que el informe ha sido generado y
            enviado a tu correo electrónico.
          </li>
        </ul>
        <p className="mt-3">
          Lo anterior se ajusta al artículo 103.m) del Texto Refundido de
          la Ley General para la Defensa de los Consumidores y Usuarios
          (que transpone el artículo 16.m) de la Directiva 2011/83/UE sobre
          derechos de los consumidores).
        </p>
      </Section>

      <Section title="6. Reembolsos">
        <p>
          Dado que el Informe Completo se genera de forma individual para
          cada persona y se entrega inmediatamente, por regla general no
          ofrecemos reembolsos una vez entregado. Si algo no funciona como
          debería (el informe no se entregó, era ilegible, se duplicó y se
          cobró dos veces, etc.), escríbenos a{' '}
          <a
            href="mailto:support@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            support@innerscore.es
          </a>{' '}
          dentro de los 14 días posteriores a la compra y resolveremos la
          incidencia, lo que puede incluir el reenvío del informe o la
          devolución del importe.
        </p>
      </Section>

      <Section title="7. Uso aceptable">
        <p>
          Te comprometes a utilizar el servicio de buena fe y únicamente
          para tu propia autorreflexión. Te comprometes a no: suplantar la
          identidad de otra persona; revender, redistribuir o sublicenciar
          el informe; intentar acceder, sondear o interrumpir el servicio
          o la infraestructura subyacente; o utilizar el servicio para
          dañarte a ti misma o a otras personas.
        </p>
      </Section>

      <Section title="8. No constituye asesoramiento médico ni psicológico">
        <p>
          InnerScore es una herramienta educativa y de autorreflexión. La
          evaluación y el informe <strong>no</strong> son un diagnóstico
          clínico, una evaluación psicológica, una terapia, ni
          asesoramiento médico. No sustituyen la consulta profesional con
          un especialista cualificado en salud mental. Si te encuentras
          en una situación de malestar o crees que podrías tener una
          condición de salud mental, busca ayuda profesional cualificada.
        </p>
      </Section>

      <Section title="9. Propiedad intelectual">
        <p>
          El cuestionario, la metodología de puntuación, el marco de
          arquetipos, la plantilla del informe, el contenido del sitio web
          y el código fuente son propiedad de FastwaySolutions o de sus
          licenciantes. Recibes una licencia personal, intransferible y no
          exclusiva para leer y conservar tu propio informe para uso
          personal. No están permitidas la reproducción, distribución
          pública, el uso comercial o las obras derivadas basadas en el
          servicio o en sus resultados sin nuestro consentimiento previo
          por escrito.
        </p>
      </Section>

      <Section title="10. Responsabilidad">
        <p>
          En la medida permitida por la ley, nuestra responsabilidad total
          derivada del servicio se limita al precio que hayas pagado por el
          Informe Completo. No somos responsables de daños indirectos,
          incidentales o consecuentes.
        </p>
        <p className="mt-3">
          Nada en estas Condiciones limita los derechos que, en su caso,
          te correspondan como persona consumidora conforme a la
          legislación imperativa aplicable, incluido el derecho a un
          servicio conforme a lo ofrecido.
        </p>
      </Section>

      <Section title="11. Cambios en el servicio o en estas Condiciones">
        <p>
          Podemos mejorar, modificar o interrumpir partes del servicio con
          el tiempo. También podemos actualizar estas Condiciones; a tu
          compra se aplicará la versión vigente en el momento de la misma.
          Los cambios sustanciales se notificarán en el sitio web.
        </p>
      </Section>

      <Section title="12. Ley aplicable y resolución de conflictos">
        <p>
          Estas Condiciones se rigen por la ley española. Las controversias
          se someterán a los juzgados y tribunales competentes del
          domicilio de la persona consumidora, cuando así proceda conforme
          a las normas imperativas de protección de consumidores.
        </p>
        <p className="mt-3">
          La Comisión Europea también pone a disposición una plataforma de
          Resolución de Litigios en Línea disponible en{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1d4ed8] hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </Section>

      <Section title="13. Contacto">
        <p>
          Para cualquier consulta relativa a estas Condiciones,
          contáctanos en{' '}
          <a
            href="mailto:support@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            support@innerscore.es
          </a>
          .
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
