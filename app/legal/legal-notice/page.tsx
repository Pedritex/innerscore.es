export const metadata = {
  title: 'Legal Notice — InnerScore',
};

export default function LegalNoticePage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Legal Notice
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Last updated: 12 May 2026
      </p>

      <Section title="1. Site owner">
        <p>
          The website <strong>innerscore.es</strong> (hereinafter, the
          &ldquo;Website&rdquo;) is owned and operated by{' '}
          <strong>FastwaySolutions</strong> (hereinafter, the &ldquo;Owner&rdquo;
          or &ldquo;we&rdquo;).
        </p>
        <p className="mt-3">
          Tax ID / Business registration: [to be completed]<br />
          Registered address: [to be completed]<br />
          Contact email:{' '}
          <a
            href="mailto:legal@innerscore.es"
            className="text-[#1d4ed8] hover:underline"
          >
            legal@innerscore.es
          </a>
        </p>
      </Section>

      <Section title="2. Purpose">
        <p>
          The Website offers an online emotional intelligence (EQ) assessment.
          Users complete a 14-question quiz and may optionally purchase a
          personalized 15-page PDF report delivered to their email inbox. No
          physical goods are shipped.
        </p>
      </Section>

      <Section title="3. Use of the Website">
        <p>
          Accessing the Website grants you the status of user and implies your
          acceptance of this Legal Notice as well as our Terms of Service,
          Privacy Policy and Cookie Policy. You agree to use the Website in
          good faith, in accordance with applicable law, and not to interfere
          with its normal operation.
        </p>
      </Section>

      <Section title="4. Intellectual property">
        <p>
          All content displayed on the Website — including texts,
          assessments, scoring methodology, archetype framework, graphics,
          logos, source code, and the PDF report — is the property of the
          Owner or its licensors and is protected by applicable intellectual
          property laws. No part of the Website or its outputs may be
          reproduced, distributed, modified, or transmitted without prior
          written authorization, except for personal, non-commercial use of
          your own purchased report.
        </p>
      </Section>

      <Section title="5. Liability">
        <p>
          The Owner makes reasonable efforts to ensure that the information
          provided on the Website is accurate and up to date. The EQ
          assessment is intended for self-reflection and educational purposes
          only and does not constitute medical, psychological, or therapeutic
          advice. The Owner shall not be liable for any decisions taken on
          the basis of the report.
        </p>
        <p className="mt-3">
          To the maximum extent permitted by law, the Owner declines all
          liability for damages arising from the use of the Website,
          interruptions in service, or third-party content that may be linked
          from the Website.
        </p>
      </Section>

      <Section title="6. External links">
        <p>
          The Website may contain links to third-party services that we use
          to deliver the product (payment, infrastructure, email). The Owner
          is not responsible for the content or practices of those third
          parties; their use is governed by their own terms.
        </p>
      </Section>

      <Section title="7. Modifications">
        <p>
          The Owner reserves the right to update this Legal Notice at any
          time. The version in force at the moment of access shall apply.
        </p>
      </Section>

      <Section title="8. Applicable law and jurisdiction">
        <p>
          This Legal Notice is governed by Spanish law. Any dispute arising
          from the use of the Website shall be subject to the competent
          courts of the Owner&apos;s registered address, without prejudice to
          consumers&apos; rights under applicable mandatory legislation.
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
