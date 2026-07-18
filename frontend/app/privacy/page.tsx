import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | WaterStress",
  description:
    "WaterStress privacy policy — what we collect, what we don't, and which third-party services see your data",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-32 pb-24 px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-muted hover:text-white text-sm font-medium"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-4xl font-bold text-surface mt-8 mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm mb-12">
          Effective date: July 17, 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none text-white/70 space-y-8">
          <p>
            WaterStress (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
            a web application that alerts farm operators when a field is
            approaching water stress and tracks estimated water savings. This
            policy describes exactly what data the service collects, what it
            deliberately does not collect, and which third-party services
            process data on our behalf. Your use of the service is also subject
            to our{" "}
            <Link
              href="/terms"
              className="text-muted hover:text-white underline"
            >
              Terms of Service
            </Link>
            .
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Information We Collect
          </h2>
          <h4 className="text-base font-medium text-surface">Account Data</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Email address</li>
            <li>
              Password — stored only as a bcrypt hash, never in plain text
            </li>
            <li>Name (optional)</li>
            <li>Language preference (English or Spanish)</li>
          </ul>
          <h4 className="text-base font-medium text-surface">
            Phone Number (Optional)
          </h4>
          <p>
            If you opt in to SMS alerts, we collect your mobile number to send
            water-stress alerts and to match your text replies (irrigation
            logs, alert feedback) to your account. SMS alerts are off by
            default; the service works fully without a phone number.
          </p>
          <h4 className="text-base font-medium text-surface">
            Demographic Self-Identification (Optional)
          </h4>
          <p>
            You may voluntarily indicate whether you identify as a socially
            disadvantaged farmer or a beginning farmer. These fields are never
            required, are used only in anonymized aggregate for impact and
            grant reporting, and are never shown on any public page or in any
            form that could identify you.
          </p>
          <h4 className="text-base font-medium text-surface">
            Farm and Field Data
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Field boundary polygons you draw on the map</li>
            <li>Crop type, planting date, and soil type</li>
            <li>Irrigation system and pump configuration</li>
            <li>
              Irrigation events you log, in the app or by SMS reply, and your
              baseline water-use figures
            </li>
          </ul>
          <h4 className="text-base font-medium text-surface">Derived Data</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Daily evapotranspiration (ET) values for your fields, retrieved
              from the third-party data sources listed below
            </li>
            <li>
              Crop-model outputs: soil-moisture depletion, stress severity
              (green/yellow/red), and days-to-stress estimates
            </li>
            <li>Computed water, energy, and CO&#x2082; savings</li>
            <li>Alert history and any Y/N feedback you send in response</li>
          </ul>
          <h4 className="text-base font-medium text-surface">Technical Data</h4>
          <p>
            Our hosting providers keep standard server logs (IP address, user
            agent, request timestamps) for security and debugging. We set only
            the essential authentication cookies described below.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            What We Do Not Collect
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>No payment data.</strong> The service is free and has no
              billing; we never ask for or process payment information.
            </li>
            <li>
              <strong>No advertising or analytics trackers.</strong> There are
              no third-party analytics scripts, ad pixels, web beacons, or
              cross-site tracking of any kind.
            </li>
            <li>
              <strong>No stored device location.</strong> The map&apos;s
              &quot;locate me&quot; button uses your browser&apos;s location
              only to center the map in that moment; it is not saved. The only
              location data we store is the field boundaries you draw.
            </li>
            <li>
              <strong>No sale of data.</strong> We do not sell or rent your
              personal data, and we do not share your field-level data for
              marketing or advertising.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-surface pt-4">Cookies</h2>
          <p>
            We set two cookies, both essential for login: a short-lived access
            token and a refresh token. Both are HttpOnly (not readable by
            JavaScript) and are used only to keep you signed in. We set no
            analytics, advertising, or tracking cookies, so the service behaves
            the same whether or not your browser sends &quot;Do Not
            Track.&quot; Blocking cookies entirely will prevent login from
            working.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Third-Party Services That Process Your Data
          </h2>
          <p>
            We use a small set of external services, each of which receives
            only the data needed for its function. None of them receive your
            data for advertising purposes.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>OpenET</strong> — receives your field boundary polygon
              and a date range in order to return satellite-derived ET for that
              field.
            </li>
            <li>
              <strong>Spatial CIMIS</strong> (California Department of Water
              Resources) — receives your field&apos;s coordinates to return
              reference ET used to fill the gap while satellite data catches
              up.
            </li>
            <li>
              <strong>Open-Meteo</strong> — receives your field&apos;s
              coordinates to return observed rainfall.
            </li>
            <li>
              <strong>Twilio</strong> — if you enable SMS alerts, receives your
              phone number and the alert text in order to deliver it; your SMS
              replies also pass through Twilio.
            </li>
            <li>
              <strong>Formspree</strong> — receives whatever you submit through
              the contact form, including your email address, so we can respond.
            </li>
            <li>
              <strong>Esri/ArcGIS</strong> — satellite map tiles load directly
              from Esri in your browser, so Esri sees your IP address and the
              map area you are viewing, as with any online map.
            </li>
            <li>
              <strong>Railway and Vercel</strong> — host the backend/database
              and the frontend respectively; your data is stored in the
              service&apos;s database on Railway.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Public Impact Statistics
          </h2>
          <p>
            The public impact page shows aggregate totals — water, energy, and
            CO&#x2082; saved, and counts of participating farms — computed
            across all users. These figures are anonymized and cannot be traced
            back to an individual account or field. Demographic
            self-identification responses never appear on the public page.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            SGMA and Grant Reports
          </h2>
          <p>
            You can generate per-farm water-use reports (CSV or PDF) at any
            time. Reports are downloaded directly by you; we do not transmit
            them to any agency. Whether and with whom to share a report is
            entirely your decision.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Data Security
          </h2>
          <p>
            All traffic is encrypted in transit with TLS. Passwords are hashed
            with bcrypt. Login session (refresh) tokens are stored only as
            SHA-256 hashes, and reuse of a stale token revokes all of that
            account&apos;s sessions. Authentication cookies are HttpOnly.
            Inbound SMS webhooks are verified against Twilio&apos;s request
            signature, and authentication endpoints are rate-limited. No method
            of transmitting or storing data is completely secure, but the
            measures above are in place and tested.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Data Retention and Deletion
          </h2>
          <p>
            We keep your data for as long as your account is active so the
            service can maintain the multi-week history its stress model needs.
            You can request deletion of your account and all associated data at
            any time through the{" "}
            <Link
              href="/contact"
              className="text-muted hover:text-white underline"
            >
              contact page
            </Link>
            , and we will delete it.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Children&apos;s Privacy
          </h2>
          <p>
            The service is not directed to children under 13, and we do not
            knowingly collect personal information from them. If you believe a
            child under 13 has created an account, contact us and we will
            delete it.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Your Rights
          </h2>
          <p>
            You can view and update your profile information in the app. You
            may request a copy of the data we hold about you, ask us to correct
            it, or ask us to delete it by reaching out through the{" "}
            <Link
              href="/contact"
              className="text-muted hover:text-white underline"
            >
              contact page
            </Link>
            . We do not sell personal information, so there is nothing to opt
            out of under California&apos;s &quot;Do Not Sell&quot; provisions.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Changes to this Policy
          </h2>
          <p>
            If our data practices change, we will update this page and its
            effective date. Material changes will be called out in the app.
          </p>

          <h2 className="text-xl font-semibold text-surface pt-4">
            Contact
          </h2>
          <p>
            Questions about this policy or your data? Reach us through the{" "}
            <Link
              href="/contact"
              className="text-muted hover:text-white underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
