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
        Última actualización: 2 de junio de 2026
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
          A continuación puedes contratar el servicio de pago, que incluye
          el <strong>Informe Completo</strong> (un PDF personalizado de 15
          páginas enviado por correo electrónico) y el acceso al{' '}
          <strong>Área de Miembros</strong>, con cursos, tests adicionales,
          píldoras diarias y herramientas para profundizar en tu
          inteligencia emocional. No se envía ningún producto físico.
        </p>
      </Section>

      <Section title="3. Precio y pago">
        <p>
          El servicio se contrata mediante una <strong>suscripción
          recurrente</strong> con un periodo de prueba inicial de pago:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>Cargo inicial de 1,95 € (impuestos incluidos)</strong>{' '}
            en el momento de la compra. Este cargo te da{' '}
            <strong>acceso completo durante 7 días</strong> al Informe
            Completo y a todo el Área de Miembros.
          </li>
          <li>
            <strong>Renovación automática:</strong> al finalizar el periodo
            de prueba de 7 días, si no has cancelado, se generará
            automáticamente un cargo de{' '}
            <strong>39,99 €/mes (impuestos incluidos)</strong> en el
            mismo método de pago que usaste en la compra inicial. La
            suscripción se renueva mensualmente de forma automática hasta
            que la canceles.
          </li>
          <li>
            <strong>Sin permanencia:</strong> puedes cancelar la
            suscripción en cualquier momento. La cancelación detiene los
            futuros cargos; el periodo ya facturado se mantiene activo
            hasta su finalización.
          </li>
        </ul>
        <p className="mt-3">
          <strong>Cómo cancelar:</strong> puedes cancelar tu suscripción en
          cualquier momento desde la sección &ldquo;Mi cuenta&rdquo; de tu{' '}
          <a
            href="/members"
            className="text-[#1d4ed8] hover:underline"
          >
            Área de Miembros
          </a>{' '}
          o escribiéndonos a{' '}
          <a
            href="mailto:support@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            support@innerscore.es
          </a>
          . Para evitar el primer cargo mensual de 39,99 €, la cancelación
          debe completarse <strong>antes del día 7</strong> contado desde
          la fecha del cargo inicial de 1,95 €.
        </p>
        <p className="mt-3">
          El pago lo procesa <strong>Stripe</strong>; no almacenamos los
          datos completos de la tarjeta en nuestros servidores. Stripe
          conserva el método de pago para poder ejecutar las renovaciones
          mensuales mientras la suscripción esté activa.
        </p>
      </Section>

      <Section title="4. Productos adicionales opcionales">
        <p>
          Durante el proceso de compra se ofrecen productos digitales
          adicionales opcionales (actualmente: la Guía de crecimiento
          emocional, la Orientación profesional con IE y la Guía de
          autoestima emocional). Cada producto adicional es un{' '}
          <strong>pago único de 0,99 €</strong>. Estos productos son
          independientes de la suscripción principal y{' '}
          <strong>no generan cargos recurrentes</strong>. Puedes aceptar o
          rechazar cada uno por separado durante el proceso de compra.
        </p>
      </Section>

      <Section title="5. Entrega">
        <p>
          Una vez confirmado el cargo inicial por Stripe, la generación de
          tu Informe Completo se inicia automáticamente. El PDF se entrega
          normalmente por correo electrónico en unos minutos. Por favor,
          revisa la carpeta de spam si no lo ves poco después de la
          compra. El acceso al Área de Miembros se activa inmediatamente y
          se mantiene mientras la suscripción esté vigente.
        </p>
      </Section>

      <Section title="6. Derecho de desistimiento — contenido digital">
        <p>
          El Informe Completo y el acceso al Área de Miembros son contenido
          digital que se pone a tu disposición de forma inmediata tras el
          pago y, por tanto, quedan sujetos a la exención legal del plazo
          de 14 días de derecho de desistimiento que normalmente se aplica
          a las compras de consumo.
        </p>
        <p className="mt-3">
          Antes de confirmar el pago, debes marcar de forma explícita la
          casilla de aceptación en la página de pago. Al marcar dicha
          casilla y hacer clic en el botón de pago:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>consientes expresamente</strong> que el suministro del
            contenido digital comience de forma inmediata, antes de que
            expire el plazo de desistimiento de 14 días;
          </li>
          <li>
            <strong>reconoces</strong> que, por tanto, pierdes tu derecho
            de desistimiento una vez que el informe ha sido generado y
            entregado a tu correo electrónico y/o has accedido al Área de
            Miembros; y
          </li>
          <li>
            <strong>aceptas expresamente</strong> el modelo de suscripción
            con cargo inicial de 1,95 € por 7 días y renovaciones
            mensuales automáticas de 39,99 € hasta que canceles.
          </li>
        </ul>
        <p className="mt-3">
          Lo anterior se ajusta al artículo 103.m) del Texto Refundido de
          la Ley General para la Defensa de los Consumidores y Usuarios
          (que transpone el artículo 16.m) de la Directiva 2011/83/UE sobre
          derechos de los consumidores).
        </p>
      </Section>

      <Section title="7. Reembolsos">
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
          dentro de los 14 días posteriores a la incidencia y resolveremos
          el caso, lo que puede incluir el reenvío del informe o la
          devolución del importe.
        </p>
      </Section>

      <Section title="8. Uso aceptable">
        <p>
          Te comprometes a utilizar el servicio de buena fe y únicamente
          para tu propia autorreflexión. Te comprometes a no: suplantar la
          identidad de otra persona; revender, redistribuir o sublicenciar
          el informe ni el contenido del Área de Miembros; intentar
          acceder, sondear o interrumpir el servicio o la infraestructura
          subyacente; o utilizar el servicio para dañarte a ti misma o a
          otras personas.
        </p>
      </Section>

      <Section title="9. No constituye asesoramiento médico ni psicológico">
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

      <Section title="10. Propiedad intelectual">
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

      <Section title="11. Responsabilidad">
        <p>
          En la medida permitida por la ley, nuestra responsabilidad total
          derivada del servicio se limita a las cantidades efectivamente
          pagadas por ti en los últimos 12 meses. No somos responsables de
          daños indirectos, incidentales o consecuentes.
        </p>
        <p className="mt-3">
          Nada en estas Condiciones limita los derechos que, en su caso,
          te correspondan como persona consumidora conforme a la
          legislación imperativa aplicable, incluido el derecho a un
          servicio conforme a lo ofrecido.
        </p>
      </Section>

      <Section title="12. Cambios en el servicio o en estas Condiciones">
        <p>
          Podemos mejorar, modificar o interrumpir partes del servicio con
          el tiempo. También podemos actualizar estas Condiciones; a tu
          compra se aplicará la versión vigente en el momento de la misma.
          Los cambios sustanciales se notificarán en el sitio web y, cuando
          afecten a personas suscritas, también por correo electrónico con
          la antelación que exija la ley.
        </p>
      </Section>

      <Section title="13. Ley aplicable y resolución de conflictos">
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

      <Section title="14. Contacto">
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
