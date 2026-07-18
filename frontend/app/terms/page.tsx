import Link from "next/link";

export const metadata = {
  title: "Terms of Service | WaterStress",
  description: "WaterStress terms of service",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-muted text-sm mb-12">
          Effective date: July 17, 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-8">
          <p>
            These Terms of Service (the &quot;Terms&quot;) govern your access
            to and use of WaterStress (the &quot;Service&quot;), a free
            web-based crop water-stress alert tool. By creating an account or
            using the Service you agree to these Terms. If you do not agree, do
            not use the Service.
          </p>
          {/* Table of Contents */}
          <div className="border border-white/10 rounded-lg p-6 space-y-2">
            <h2 className="text-base font-semibold text-surface mb-3">
              Table of Contents
            </h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>The Service</li>
              <li>Your Account</li>
              <li>Acceptable Use</li>
              <li>SMS Alerts</li>
              <li>Agronomic Disclaimer</li>
              <li>Third-Party Data and Services</li>
              <li>Free Service, Availability, and Changes</li>
              <li>Your Data</li>
              <li>Ownership</li>
              <li>Warranty Disclaimer</li>
              <li>Limitation of Liability</li>
              <li>Termination</li>
              <li>General Terms</li>
            </ol>
          </div>

          {/* 1. The Service */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            1. The Service
          </h2>
          <p>
            WaterStress monitors the fields you register for approaching water
            stress. For each field it combines publicly available
            evapotranspiration and weather data with a crop water-balance model
            to produce a green / yellow / red stress severity and a
            days-to-stress estimate, and it tracks the water, energy, and
            CO&#x2082; you save relative to a baseline you provide. It can also
            generate per-farm water-use reports (CSV or PDF) for you to
            download. The Service is an <strong>alert tool</strong>: it flags
            fields that need attention. It does not control irrigation
            equipment.
          </p>
          <p>
            Anything you submit through the Service — field boundaries, crop
            details, irrigation logs, feedback — is a &quot;Submission.&quot;
            You are responsible for the accuracy of your Submissions; model
            outputs are only as good as the field information provided.
          </p>

          {/* 2. Your Account */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            2. Your Account
          </h2>
          <p>
            You must provide accurate account information and keep your
            password confidential. You are responsible for activity that
            happens under your account, unless it results from a security
            failure of the Service itself. You must be at least 13 years old to
            use the Service. If you register a phone number for SMS alerts, it
            must be a number you own or are authorized to use.
          </p>

          {/* 3. Acceptable Use */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            3. Acceptable Use
          </h2>
          <p>You agree not to, and not to allow others to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              use the Service in violation of any applicable law or regulation;
            </li>
            <li>
              attempt to gain unauthorized access to the Service, other
              users&apos; accounts or data, or the systems the Service runs on;
            </li>
            <li>
              probe, scan, or test the vulnerability of the Service except
              through responsible disclosure to us;
            </li>
            <li>
              interfere with or disrupt the Service, including by introducing
              malicious code or overloading it with automated requests;
            </li>
            <li>
              resell the Service or provide access to it as part of a
              commercial offering;
            </li>
            <li>
              present stress severities, savings figures, or other model
              outputs to a regulatory body, court, or lender as though they
              were certified agronomic or hydrologic assessments, without
              independent verification by a qualified professional.
            </li>
          </ul>
          <p>
            We may suspend access that, in our reasonable judgment, is harming
            the Service or other users. Where practical, we will give you
            notice and a chance to remedy the issue first.
          </p>

          {/* 4. SMS Alerts */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            4. SMS Alerts
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              SMS alerts are opt-in. Standard message and data rates from your
              carrier may apply.
            </li>
            <li>
              Alerts are sent only when a field&apos;s stress severity
              escalates — this is an alert channel, not a marketing channel.
            </li>
            <li>
              You can reply to log an irrigation event or to give Y/N feedback
              on an alert; those replies update your account.
            </li>
            <li>
              You can opt out at any time by replying STOP, which blocks
              further messages at the carrier level.
            </li>
            <li>
              SMS delivery is not guaranteed: carrier filtering, an incorrectly
              entered number, or provider outages can delay or drop messages.
              Do not rely on SMS as your only signal for irrigation decisions.
            </li>
          </ul>

          {/* 5. Agronomic Disclaimer */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            5. Agronomic Disclaimer
          </h2>
          <p>
            Stress severities, days-to-stress estimates, and savings figures
            are produced by mathematical models driven by satellite and weather
            data — not by sensors in your soil. Satellite ET data arrives with
            a lag of roughly five to seven days, which the Service bridges with
            provisional estimates; every data-derived figure is labeled with
            its &quot;as of&quot; date. These outputs are a prioritization
            signal, not professional agronomic advice. Actual field conditions
            can differ from modeled conditions. Confirm in the field before
            acting, and understand that all irrigation decisions — and their
            outcomes for your crops, yields, and water use — are yours alone.
            We do not guarantee crop outcomes, yields, or water savings.
          </p>

          {/* 6. Third-Party Data and Services */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            6. Third-Party Data and Services
          </h2>
          <p>
            The Service depends on external data providers — OpenET for
            satellite ET, Spatial CIMIS for reference ET, and Open-Meteo for
            rainfall — and on Twilio for SMS delivery and Esri for satellite
            map imagery. These services are not owned or controlled by us. We
            pass their data through as received and cannot guarantee its
            accuracy, availability, or continuity. Their own terms and privacy
            policies govern their services; see our{" "}
            <Link
              href="/privacy"
              className="text-muted hover:text-white underline"
            >
              Privacy Policy
            </Link>{" "}
            for exactly what data each of them receives.
          </p>

          {/* 7. Free Service */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            7. Free Service, Availability, and Changes
          </h2>
          <p>
            The Service is currently provided free of charge. There are no
            fees, no subscriptions, and no payment processing. We may add,
            change, or remove features, impose reasonable usage limits (for
            example, on the number of monitored fields), or suspend or
            discontinue the Service at any time. We do not promise any
            particular level of availability or uptime. If we ever introduce
            paid features, they will be clearly presented and will require your
            explicit agreement — nothing will be charged silently.
          </p>

          {/* 8. Your Data */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            8. Your Data
          </h2>
          <p>
            You own your Submissions, including your field boundaries, crop
            configurations, and irrigation records. You grant us a
            non-exclusive license to store and process them solely to provide
            the Service — computing stress severities, retrieving ET data for
            your fields from the providers above, sending alerts you have
            opted into, and generating reports you request. We may use
            aggregated, anonymized data (for example, total water saved across
            all farms) to operate and describe the Service, including on the
            public impact page; such aggregates never identify you or your
            fields. You can request deletion of your account and data at any
            time via the{" "}
            <Link
              href="/contact"
              className="text-muted hover:text-white underline"
            >
              contact page
            </Link>
            .
          </p>

          {/* 9. Ownership */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            9. Ownership
          </h2>
          <p>
            We own the Service, its software, design, and branding, and all
            intellectual property rights in them. These Terms do not grant you
            any rights in the Service other than the right to use it as
            described here.
          </p>

          {/* 10. Warranty Disclaimer */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            10. Warranty Disclaimer
          </h2>
          <p className="uppercase text-xs leading-relaxed">
            THE SERVICE AND ALL RELATED COMPONENTS AND INFORMATION ARE PROVIDED
            ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT
            ANY WARRANTIES OF ANY KIND, AND WE EXPRESSLY DISCLAIM ALL
            WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED
            WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE
            WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE. WE DO NOT
            WARRANT THE ACCURACY OF ANY STRESS SEVERITY, DAYS-TO-STRESS
            ESTIMATE, SAVINGS FIGURE, OR OTHER MODEL OUTPUT. SUCH OUTPUTS ARE
            ESTIMATES BASED ON MATHEMATICAL MODELS AND PUBLICLY AVAILABLE DATA
            THAT MAY CONTAIN ERRORS OR INACCURACIES. SOME JURISDICTIONS DO NOT
            ALLOW THE DISCLAIMER OF CERTAIN WARRANTIES; THIS DISCLAIMER APPLIES
            TO THE FULLEST EXTENT PERMITTED BY LAW.
          </p>

          {/* 11. Limitation of Liability */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            11. Limitation of Liability
          </h2>
          <p className="uppercase text-xs leading-relaxed">
            TO THE FULLEST EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE, UNDER
            ANY LEGAL THEORY, FOR (A) INDIRECT, SPECIAL, INCIDENTAL, OR
            CONSEQUENTIAL DAMAGES, INCLUDING CROP LOSS, REDUCED YIELDS, WATER
            WASTE, REGULATORY PENALTIES, OR LOST REVENUE ARISING FROM RELIANCE
            ON THE SERVICE&apos;S OUTPUTS; (B) ANY DAMAGES ARISING FROM
            INTERRUPTION, DELAY, OR INABILITY TO USE THE SERVICE, OR FROM LOSS
            OR CORRUPTION OF DATA; OR (C) AGGREGATE DAMAGES EXCEEDING ONE
            HUNDRED U.S. DOLLARS (US$100). THESE LIMITATIONS APPLY WHETHER OR
            NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND
            NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED
            REMEDY.
          </p>

          {/* 12. Termination */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            12. Termination
          </h2>
          <p>
            You may stop using the Service at any time and may request deletion
            of your account and data via the{" "}
            <Link
              href="/contact"
              className="text-muted hover:text-white underline"
            >
              contact page
            </Link>
            . We may suspend or terminate your access if you materially breach
            these Terms and, where the breach is curable, fail to cure it
            within thirty (30) days of notice. Sections 5 and 8 through 13
            survive termination.
          </p>

          {/* 13. General Terms */}
          <h2 className="text-xl font-semibold text-surface pt-4">
            13. General Terms
          </h2>
          <h3 className="text-lg font-medium text-surface">
            13.1 Governing Law and Venue
          </h3>
          <p>
            These Terms are governed by the laws of the State of California,
            without regard to its conflict-of-laws rules. The state and federal
            courts located in California will have exclusive jurisdiction over
            any dispute arising out of these Terms, and each party consents to
            their jurisdiction.
          </p>
          <h3 className="text-lg font-medium text-surface">
            13.2 Changes to these Terms
          </h3>
          <p>
            We may update these Terms from time to time. Changes take effect
            when posted on this page with a new effective date; material
            changes will be called out in the app. Continuing to use the
            Service after changes take effect constitutes acceptance.
          </p>
          <h3 className="text-lg font-medium text-surface">
            13.3 Severability
          </h3>
          <p>
            If any provision of these Terms is held unenforceable, it will be
            modified to the minimum extent necessary to make it enforceable,
            and the remaining provisions will remain in full effect.
          </p>
          <h3 className="text-lg font-medium text-surface">
            13.4 Entire Agreement
          </h3>
          <p>
            These Terms, together with the{" "}
            <Link
              href="/privacy"
              className="text-muted hover:text-white underline"
            >
              Privacy Policy
            </Link>
            , are the entire agreement between you and us regarding the
            Service, and supersede any prior agreements on the subject.
          </p>
          <h3 className="text-lg font-medium text-surface">13.5 Contact</h3>
          <p>
            Questions about these Terms? Reach us through the{" "}
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
