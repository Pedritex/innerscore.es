export const metadata = {
  title: 'Terms of Service — InnerScore',
};

export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Last updated: 12 May 2026
      </p>

      <Section title="1. Who we are">
        <p>
          InnerScore is operated by <strong>FastwaySolutions</strong>
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;), through the website{' '}
          <strong>innerscore.es</strong>. By using the website you agree to
          these Terms of Service, the Privacy Policy and the Cookie Policy.
          If you do not agree, please do not use the service.
        </p>
      </Section>

      <Section title="2. The service">
        <p>
          InnerScore offers a self-assessment questionnaire on emotional
          intelligence (14 questions across 5 dimensions). After completing
          the quiz, you receive a free on-screen preview of your overall
          score, dimension scores and emotional archetype.
        </p>
        <p className="mt-3">
          You may then optionally purchase the <strong>Full Report</strong>:
          a personalized 15-page PDF, generated automatically based on your
          answers and result, delivered to the email address you provide. No
          physical goods are shipped.
        </p>
      </Section>

      <Section title="3. Price and payment">
        <p>
          The Full Report has a one-time price of{' '}
          <strong>£9.99 (GBP)</strong>, taxes included where applicable.
          The price is shown on the results page before purchase. Payment
          is processed by <strong>Stripe</strong>; we do not store full
          card details on our servers.
        </p>
        <p className="mt-3">
          The purchase is a one-off transaction. There is no recurring
          subscription, no auto-renewal and no hidden charges.
        </p>
      </Section>

      <Section title="4. Delivery">
        <p>
          After your payment is confirmed by Stripe, generation of your
          Full Report starts automatically. The PDF is typically delivered
          to your email within a few minutes. Please check your spam folder
          if you do not see it shortly after purchase.
        </p>
      </Section>

      <Section title="5. Right of withdrawal — digital content">
        <p>
          The Full Report is digital content delivered immediately upon
          payment and is therefore subject to the legal exemption from the
          14-day right of withdrawal that normally applies to consumer
          purchases.
        </p>
        <p className="mt-3">
          By clicking{' '}
          <em className="italic text-[#ea580c]">
            &ldquo;Get My Full Report&rdquo;
          </em>{' '}
          on the results page, you:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>expressly consent</strong> to the supply of the digital
            content beginning immediately, before the expiry of the 14-day
            withdrawal period; and
          </li>
          <li>
            <strong>acknowledge</strong> that you therefore lose your right
            of withdrawal once the report has been generated and sent to
            your email.
          </li>
        </ul>
        <p className="mt-3">
          This is in accordance with Article 103(m) of the Spanish General
          Law for the Defence of Consumers and Users (transposing Article
          16(m) of EU Directive 2011/83/EU on consumer rights).
        </p>
      </Section>

      <Section title="6. Refunds">
        <p>
          Because the Full Report is generated individually for each user
          and delivered immediately, we generally do not offer refunds once
          the report has been delivered. If something goes wrong (the
          report was never delivered, was unreadable, was duplicated and
          charged twice, etc.), please contact us at{' '}
          <a
            href="mailto:support@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            support@innerscore.es
          </a>{' '}
          within 14 days of purchase and we will resolve the issue, which
          may include re-sending the report or refunding the payment.
        </p>
      </Section>

      <Section title="7. Acceptable use">
        <p>
          You agree to use the service in good faith and only for your own
          self-reflection. You agree not to: misrepresent another
          person&apos;s identity; resell, redistribute or sub-license the
          report; attempt to access, probe or disrupt the service or its
          underlying infrastructure; or use the service to harm yourself
          or others.
        </p>
      </Section>

      <Section title="8. Not medical or psychological advice">
        <p>
          InnerScore is an educational and self-reflection tool. The
          assessment and the report are <strong>not</strong> a clinical
          diagnosis, psychological evaluation, therapy, or medical advice.
          They do not replace professional consultation with a qualified
          mental-health professional. If you are in distress or believe
          you may have a mental-health condition, please seek qualified
          help.
        </p>
      </Section>

      <Section title="9. Intellectual property">
        <p>
          The questionnaire, scoring methodology, archetype framework,
          report template, website content and source code are owned by
          FastwaySolutions or its licensors. You receive a personal,
          non-transferable, non-exclusive licence to read and keep your own
          report for personal use. Any reproduction, public distribution,
          commercial use or derivative work based on the service or its
          outputs is not permitted without our prior written consent.
        </p>
      </Section>

      <Section title="10. Liability">
        <p>
          To the extent permitted by law, our total liability arising out
          of or in connection with the service is limited to the price paid
          by you for the Full Report. We are not liable for indirect,
          incidental or consequential damages.
        </p>
        <p className="mt-3">
          Nothing in these Terms limits any right you may have as a
          consumer under applicable mandatory legislation, including the
          right to a service that conforms with what was offered.
        </p>
      </Section>

      <Section title="11. Changes to the service or these Terms">
        <p>
          We may improve, change or discontinue parts of the service over
          time. We may also update these Terms; the version in force at the
          time of your purchase will apply to that purchase. Material
          changes will be notified on the website.
        </p>
      </Section>

      <Section title="12. Governing law and disputes">
        <p>
          These Terms are governed by Spanish law. Disputes will be subject
          to the competent courts at the consumer&apos;s domicile, where
          applicable under mandatory consumer-protection rules.
        </p>
        <p className="mt-3">
          The European Commission also operates an Online Dispute
          Resolution platform available at{' '}
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

      <Section title="13. Contact">
        <p>
          For any question regarding these Terms, contact us at{' '}
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
