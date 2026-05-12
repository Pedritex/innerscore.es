export const metadata = {
  title: 'Cookie Policy — InnerScore',
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-[#0f172a]">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Last updated: 12 May 2026
      </p>

      <Section title="1. What this policy covers">
        <p>
          This Cookie Policy explains how InnerScore uses cookies and
          similar local-storage technologies on{' '}
          <strong>innerscore.es</strong>. It complements our Privacy Policy.
        </p>
      </Section>

      <Section title="2. What we use, and why">
        <p>
          InnerScore deliberately runs without analytics, advertising or
          tracking cookies. The only storage we set on your device is what
          is strictly necessary to deliver the service you requested:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[15px]">
          <li>
            <strong>innerscore_session</strong> (browser localStorage) —
            holds the answers you have given so far and the email you
            entered, so we can show your free results screen and pass the
            data to checkout if you decide to purchase the full report. It
            stays on your device only.
          </li>
          <li>
            <strong>innerscore_cookies</strong> (browser localStorage) —
            records your response to the cookie banner so we don&apos;t ask
            again.
          </li>
        </ul>
        <p className="mt-3">
          These items are stored locally in your browser. They are not
          cookies in the strict HTTP sense and are not sent to our servers
          on every request, but they fulfil a similar function and are
          covered by the cookie consent rules.
        </p>
      </Section>

      <Section title="3. Third-party services">
        <p>
          When you proceed to checkout you are redirected to{' '}
          <strong>Stripe</strong>, which sets its own cookies on its
          domain to operate the payment session and detect fraud. Those
          cookies are controlled by Stripe and governed by Stripe&apos;s
          own privacy and cookie policies.
        </p>
        <p className="mt-3">
          Our hosting and infrastructure provider (<strong>Vercel</strong>)
          may set strictly functional cookies needed to serve the site
          (for example, to route traffic). These do not identify you.
        </p>
      </Section>

      <Section title="4. Your choices">
        <p>
          The cookie banner you see on first visit lets you accept or
          decline. Because we don&apos;t use non-essential cookies,
          declining does not disable any feature — the only thing it
          changes is that your choice is recorded.
        </p>
        <p className="mt-3">
          You can clear the stored values at any time from your
          browser&apos;s settings (Site data / Local storage). Once
          cleared, the banner will appear again on your next visit.
        </p>
      </Section>

      <Section title="5. Updates">
        <p>
          If we ever introduce additional cookies (for example, optional
          analytics), we will update this policy and ask for your consent
          again before activating them.
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
