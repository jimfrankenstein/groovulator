import DarkModeToggle from "../../components/DarkModeToggle";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Groovulator",
  description: "Terms and conditions for groovulator.com",
};

export default function TermsPage() {
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
              <h1 className="text-xl md:text-2xl font-bold">Terms and Conditions</h1>
              <p className="mt-2 text-sm opacity-60">Last updated: March 2, 2026</p>
            </div>
            <div className="md:col-span-2 text-sm md:text-base leading-relaxed opacity-90 space-y-10">
              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">1. Acceptance of Terms</h2>
                <p>
                  Welcome to groovulator.com (the &ldquo;Site&rdquo;), operated by Groovulator LLC
                  (&ldquo;Groovulator,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                  &ldquo;our&rdquo;), a Minnesota limited liability company based in Minneapolis,
                  MN. By accessing or using this Site, including any subdomains (such as
                  theverybaddays.com and jimfrankenstein.com), you (&ldquo;you&rdquo; or
                  &ldquo;User&rdquo;) agree to be bound by these Terms and Conditions
                  (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you must not use the
                  Site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">2. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes become effective
                  when posted on this page. Your continued use of the Site after changes are posted
                  constitutes your acceptance of the revised Terms. We encourage you to review these
                  Terms periodically.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">3. Use of the Site</h2>
                <p>
                  You agree to use the Site only for lawful purposes and in accordance with these
                  Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use the Site in any way that violates applicable federal, state, local, or
                    international law or regulation.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any portion of the Site, other accounts,
                    computer systems, or networks connected to the Site.
                  </li>
                  <li>
                    Use any robot, spider, scraper, or other automated means to access the Site for
                    any purpose without our express written permission.
                  </li>
                  <li>
                    Introduce viruses, trojans, worms, or other material that is malicious or
                    technologically harmful.
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of the Site or its
                    contents.
                  </li>
                </ul>
                <p>
                  We reserve the right to terminate or restrict your access to the Site at our sole
                  discretion, without notice, for any conduct that we believe violates these Terms
                  or is harmful to other users, us, or third parties.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">4. Intellectual Property</h2>
                <p>
                  All content on this Site&mdash;including but not limited to music, lyrics,
                  artwork, photographs, graphics, text, audio recordings, video, logos, and
                  trademarks&mdash;is the property of Groovulator LLC or its licensors and is
                  protected by United States and international copyright, trademark, and other
                  intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works from, publicly
                  display, publicly perform, republish, download, store, or transmit any content on
                  the Site without our prior written consent, except as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Your device may temporarily store copies of materials in RAM incidental to your
                    accessing and viewing them.
                  </li>
                  <li>
                    You may store files that are automatically cached by your web browser for
                    display enhancement purposes.
                  </li>
                  <li>
                    You may share links to content on the Site via social media, provided you do so
                    in a way that does not suggest any endorsement by us.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">5. Purchases and Ecommerce</h2>
                <p>
                  Certain products (including but not limited to merchandise, music, and digital
                  goods) may be available for purchase through the Site. Purchases are processed
                  through our third-party ecommerce provider, Shopify. By making a purchase, you
                  also agree to Shopify&rsquo;s terms of service.
                </p>
                <p>
                  <strong>Pricing.</strong> All prices are listed in U.S. dollars unless otherwise
                  stated. We reserve the right to change prices at any time without prior notice.
                  Prices do not include applicable taxes and shipping, which are calculated at
                  checkout.
                </p>
                <p>
                  <strong>Payment.</strong> Payment must be made at the time of purchase through
                  accepted payment methods as displayed at checkout. You represent and warrant that
                  you have the right to use any payment method you provide.
                </p>
                <p>
                  <strong>Order Acceptance.</strong> Your receipt of an order confirmation does not
                  constitute our acceptance of your order. We reserve the right to refuse or cancel
                  any order at any time for reasons including but not limited to product
                  availability, errors in product or pricing information, or suspected fraud.
                </p>
                <p>
                  <strong>Shipping.</strong> Shipping times and costs are estimates and are not
                  guaranteed. Groovulator LLC is not responsible for delays caused by the carrier or
                  customs processing. Risk of loss and title for items pass to you upon delivery to
                  the carrier.
                </p>
                <p>
                  <strong>Refunds and Exchanges.</strong> Due to the nature of our products, all
                  sales are generally final. If you receive a defective or incorrect item, please
                  contact us at{" "}
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>{" "}
                  within 14 days of delivery and we will work with you to resolve the issue. Digital
                  goods are non-refundable once delivered or downloaded.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">6. Email and Mailing List</h2>
                <p>
                  By providing your email address through our Site (e.g., newsletter signup forms),
                  you consent to receiving marketing emails from Groovulator LLC. You may
                  unsubscribe at any time by clicking the &ldquo;unsubscribe&rdquo; link in any
                  email or by contacting us at{" "}
                  <a
                    href="mailto:admin@groovulator.com"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    admin@groovulator.com
                  </a>
                  . For more information on how we handle your data, please see our{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">7. Third-Party Links</h2>
                <p>
                  The Site may contain links to third-party websites or services (including but not
                  limited to Spotify, Apple Music, YouTube, Amazon Music, and social media
                  platforms) that are not owned or controlled by Groovulator LLC. We have no control
                  over, and assume no responsibility for, the content, privacy policies, or
                  practices of any third-party websites or services. You acknowledge and agree that
                  we are not responsible or liable for any damage or loss caused by the use of any
                  such content or services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">8. Disclaimer of Warranties</h2>
                <p>
                  THE SITE AND ALL CONTENT, PRODUCTS, AND SERVICES PROVIDED THROUGH THE SITE ARE
                  PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT
                  WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED
                  BY LAW, GROOVULATOR LLC DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                  BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT
                  DEFECTS WILL BE CORRECTED, OR THAT THE SITE OR THE SERVERS THAT MAKE IT AVAILABLE
                  ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">9. Limitation of Liability</h2>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GROOVULATOR
                  LLC, ITS MEMBERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
                  LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                  ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO
                  ACCESS OR USE) THE SITE, ANY CONTENT ON THE SITE, OR ANY PRODUCTS OR SERVICES
                  PURCHASED THROUGH THE SITE.
                </p>
                <p>
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT YOU
                  PAID TO US, IF ANY, DURING THE SIX (6) MONTHS PRECEDING THE EVENT GIVING RISE TO
                  THE LIABILITY.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">10. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Groovulator LLC, its members,
                  employees, agents, and affiliates from and against any and all claims, damages,
                  obligations, losses, liabilities, costs, or expenses (including reasonable
                  attorneys&rsquo; fees) arising from: (a) your use of the Site; (b) your violation
                  of these Terms; or (c) your violation of any rights of a third party.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">
                  11. Governing Law and Jurisdiction
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  State of Minnesota, without regard to its conflict of law provisions. You agree to
                  submit to the exclusive jurisdiction of the state and federal courts located in
                  Hennepin County, Minnesota, for the resolution of any disputes arising out of or
                  relating to these Terms or your use of the Site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">12. Severability</h2>
                <p>
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable,
                  the remaining provisions shall continue in full force and effect. The invalid or
                  unenforceable provision shall be modified to the minimum extent necessary to make
                  it valid and enforceable.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">13. Entire Agreement</h2>
                <p>
                  These Terms, together with our{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-pink-500 dark:hover:text-yellow-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  , constitute the entire agreement between you and Groovulator LLC regarding your
                  use of the Site and supersede all prior and contemporaneous understandings,
                  agreements, representations, and warranties.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold opacity-100">14. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
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
