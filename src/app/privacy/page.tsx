import DarkModeToggle from "../../components/DarkModeToggle";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Groovulator",
  description: "Privacy policy for groovulator.com",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white antialiased transition-colors">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="font-black font-fugaz tracking-tight lowercase text-2xl hover:text-pink-500 active:text-pink-700 dark:hover:text-yellow-300 dark:active:text-yellow-300/80 transition-colors"
          >
            <span>Ectophonic</span> Groovulator
          </Link>
          <DarkModeToggle />
        </div>
      </header>

      <main>
        <section className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Privacy Policy</h1>
              <p className="mt-2 text-sm opacity-60">Last updated: March 2, 2026</p>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-10">
              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">1. Introduction</h2>
                <p>
                  Groovulator LLC (&ldquo;Groovulator,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                  &ldquo;our&rdquo;) operates groovulator.com and associated subdomains including
                  theverybaddays.com and jimfrankenstein.com (collectively, the &ldquo;Site&rdquo;).
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit the Site, make a purchase, or interact with our
                  services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using the Site, you consent to the
                  practices described in this policy. If you do not agree with the terms of this
                  Privacy Policy, please do not access the Site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">2. Information We Collect</h2>

                <h3 className="text-lg font-semibold">Personal Information You Provide</h3>
                <p>We may collect personal information that you voluntarily provide when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Make a purchase (name, email address, shipping address, billing address, payment
                    information)
                  </li>
                  <li>
                    Subscribe to our mailing list or newsletter (email address, and optionally your
                    name)
                  </li>
                  <li>
                    Contact us via email (name, email address, and any information you include in
                    your message)
                  </li>
                </ul>
                <p>
                  Payment information (such as credit card numbers) is processed directly by our
                  ecommerce provider, Shopify, and is not stored on our servers.
                </p>

                <h3 className="text-lg font-semibold">Information Collected Automatically</h3>
                <p>
                  When you visit the Site, certain information is collected automatically,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Device and browser information:</strong> IP address, browser type and
                    version, operating system, device type, and screen resolution.
                  </li>
                  <li>
                    <strong>Usage data:</strong> Pages visited, time spent on pages, referring URLs,
                    click patterns, and other interaction data.
                  </li>
                  <li>
                    <strong>Cookies and similar technologies:</strong> We use cookies, web beacons,
                    and pixel tags to collect information about your browsing activity. See Section
                    5 for details.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Order fulfillment:</strong> To process and ship purchases, send order
                    confirmations, and handle customer service inquiries.
                  </li>
                  <li>
                    <strong>Marketing and communications:</strong> To send newsletters, promotional
                    emails, and updates about new releases, merchandise, and events. You can opt out
                    at any time.
                  </li>
                  <li>
                    <strong>Analytics and improvement:</strong> To understand how visitors use the
                    Site, analyze trends, and improve our content and user experience.
                  </li>
                  <li>
                    <strong>Advertising:</strong> To deliver targeted advertisements and measure the
                    effectiveness of our advertising campaigns through third-party platforms.
                  </li>
                  <li>
                    <strong>Legal compliance:</strong> To comply with applicable laws, regulations,
                    and legal processes.
                  </li>
                  <li>
                    <strong>Fraud prevention:</strong> To detect and prevent fraudulent transactions
                    and other illegal activities.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">4. Third-Party Services</h2>
                <p>
                  We use the following third-party services that may collect and process your data:
                </p>

                <h3 className="text-lg font-semibold">Shopify</h3>
                <p>
                  We use Shopify to power our online store. When you make a purchase, Shopify
                  collects your personal information (name, address, payment details) to process the
                  transaction. Shopify&rsquo;s privacy policy is available at{" "}
                  <a
                    href="https://www.shopify.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    shopify.com/legal/privacy
                  </a>
                  .
                </p>

                <h3 className="text-lg font-semibold">Klaviyo</h3>
                <p>
                  We use Klaviyo to manage our email mailing list and send marketing communications.
                  When you subscribe to our mailing list, your email address (and any additional
                  information you provide) is stored and processed by Klaviyo. Klaviyo&rsquo;s
                  privacy policy is available at{" "}
                  <a
                    href="https://www.klaviyo.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    klaviyo.com/legal/privacy
                  </a>
                  .
                </p>

                <h3 className="text-lg font-semibold">Meta (Facebook) Pixel</h3>
                <p>
                  We use the Meta (Facebook) Pixel to track conversions from Facebook ads, optimize
                  ad delivery, build targeted audiences, and remarket to people who have taken
                  actions on the Site. The Pixel collects data such as pages visited, actions taken,
                  and device information. Meta&rsquo;s data policy is available at{" "}
                  <a
                    href="https://www.facebook.com/privacy/policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    facebook.com/privacy/policy
                  </a>
                  .
                </p>

                <p>
                  We may also use other third-party services from time to time (such as streaming
                  platforms, analytics providers, or hosting services). Each third-party service
                  provider has its own privacy policy governing the data it collects.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">
                  5. Cookies and Tracking Technologies
                </h2>
                <p>
                  Cookies are small data files placed on your device when you visit a website. We
                  use the following types of cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> Necessary for the Site to function properly
                    (e.g., shopping cart functionality, session management).
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how visitors interact
                    with the Site by collecting usage data anonymously.
                  </li>
                  <li>
                    <strong>Marketing cookies:</strong> Used to track visitors across websites to
                    display relevant advertisements. This includes the Meta (Facebook) Pixel and
                    Klaviyo tracking.
                  </li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Most browsers allow you to
                  refuse or delete cookies. However, disabling cookies may affect certain features
                  of the Site. You can also opt out of targeted advertising by visiting{" "}
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    aboutads.info
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    networkadvertising.org
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">6. Data Sharing and Disclosure</h2>
                <p>
                  We do not sell your personal information. We may share your information in the
                  following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Service providers:</strong> With third-party vendors who perform
                    services on our behalf (e.g., Shopify for order processing, Klaviyo for email
                    marketing, shipping carriers for delivery).
                  </li>
                  <li>
                    <strong>Advertising partners:</strong> With advertising platforms (such as Meta)
                    to deliver and measure the effectiveness of advertising campaigns, using cookies
                    and tracking technologies.
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> If required by law, regulation, legal
                    process, or governmental request.
                  </li>
                  <li>
                    <strong>Business transfers:</strong> In connection with a merger, acquisition,
                    reorganization, or sale of assets, your information may be transferred as part
                    of that transaction.
                  </li>
                  <li>
                    <strong>Protection of rights:</strong> To enforce our Terms and Conditions,
                    protect our rights, privacy, safety, or property, and to protect against fraud
                    or other illegal activity.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">7. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the
                  purposes described in this Privacy Policy, unless a longer retention period is
                  required or permitted by law. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Purchase records:</strong> Retained for a minimum of six (6) years for
                    tax and legal compliance purposes.
                  </li>
                  <li>
                    <strong>Mailing list data:</strong> Retained until you unsubscribe or request
                    deletion.
                  </li>
                  <li>
                    <strong>Analytics data:</strong> Retained in aggregated, anonymized form
                    indefinitely for trend analysis.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">8. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have the following rights regarding your
                  personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal information we hold
                    about you.
                  </li>
                  <li>
                    <strong>Correction:</strong> Request that we correct inaccurate or incomplete
                    personal information.
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request that we delete your personal information,
                    subject to certain legal exceptions.
                  </li>
                  <li>
                    <strong>Opt-out of marketing:</strong> Unsubscribe from marketing emails by
                    clicking the &ldquo;unsubscribe&rdquo; link in any email or by contacting us
                    directly.
                  </li>
                  <li>
                    <strong>Opt-out of targeted advertising:</strong> Adjust your browser or device
                    settings, or use the opt-out links provided in Section 5.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">
                  9. California Privacy Rights (CCPA)
                </h2>
                <p>
                  If you are a California resident, you have additional rights under the California
                  Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Right to know:</strong> You may request that we disclose the categories
                    and specific pieces of personal information we have collected about you, the
                    categories of sources, the business purpose for collection, and the categories
                    of third parties with whom we share it.
                  </li>
                  <li>
                    <strong>Right to delete:</strong> You may request deletion of personal
                    information we have collected from you, subject to certain exceptions.
                  </li>
                  <li>
                    <strong>Right to opt out of sale:</strong> We do not sell personal information
                    as defined under the CCPA.
                  </li>
                  <li>
                    <strong>Non-discrimination:</strong> We will not discriminate against you for
                    exercising your CCPA rights.
                  </li>
                </ul>
                <p>
                  To submit a CCPA request, contact us at{" "}
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>
                  . We may need to verify your identity before processing your request.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">10. Children&rsquo;s Privacy</h2>
                <p>
                  The Site is not directed to children under the age of 13, and we do not knowingly
                  collect personal information from children under 13. If we learn that we have
                  collected personal information from a child under 13 without parental consent, we
                  will take steps to delete that information as promptly as possible. If you believe
                  a child under 13 has provided us with personal information, please contact us at{" "}
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">11. Data Security</h2>
                <p>
                  We implement reasonable administrative, technical, and physical security measures
                  to protect your personal information from unauthorized access, use, alteration,
                  and disclosure. However, no method of transmission over the Internet or method of
                  electronic storage is 100% secure. While we strive to use commercially acceptable
                  means to protect your personal information, we cannot guarantee its absolute
                  security.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">12. International Users</h2>
                <p>
                  The Site is operated from the United States. If you are accessing the Site from
                  outside the United States, please be aware that your information may be
                  transferred to, stored, and processed in the United States where our servers are
                  located and our central database is operated. By using the Site, you consent to
                  the transfer of your information to the United States.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">
                  13. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes become effective when
                  posted on this page, and the &ldquo;Last updated&rdquo; date at the top of this
                  policy will be revised accordingly. We encourage you to review this Privacy Policy
                  periodically. Your continued use of the Site after changes are posted constitutes
                  your acceptance of the revised policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">14. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data
                  practices, please contact us at:
                </p>
                <p>
                  Groovulator LLC
                  <br />
                  Minneapolis, MN
                  <br />
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="dark bg-gray-950 text-white py-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-start">
          <div className="order-2 md:order-1 text-center md:text-left text-sm opacity-70">
            <span>&copy; {new Date().getFullYear()} Groovulator LLC. All rights reserved.</span>
            <br />
            <span>
              Minneapolis, MN ·{" "}
              <Link
                href="/terms"
                className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
              >
                Terms
              </Link>{" "}
              ·{" "}
              <Link
                href="/privacy"
                className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
              >
                Privacy
              </Link>
            </span>
          </div>
          <div className="order-1 md:order-2 flex gap-2 justify-center md:justify-end items-center text-sm">
            <DarkModeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
