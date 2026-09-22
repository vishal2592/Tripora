
import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "using-tripora", label: "Using Tripora" },
  { id: "account", label: "Account Registration" },
  { id: "bookings", label: "Bookings & Reservations" },
  { id: "payments", label: "Payments & Pricing" },
  { id: "cancellation", label: "Cancellation & Refunds" },
  { id: "documents", label: "Travel Documents" },
  { id: "responsibilities", label: "User Responsibilities" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "privacy", label: "Privacy & Data Protection" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact Us" },
];

const TermsAndConditions = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =========================
          HERO / PAGE HEADER
      ========================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-sm text-slate-500">
            <Link
              to="/"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <ChevronRight size={15} />

            <span className="font-medium text-slate-700">
              Terms & Conditions
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
              <FileText size={16} />
              Legal Information
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Please read these terms carefully before using Tripora.
              By accessing our platform or using our travel services,
              you agree to be bound by these Terms & Conditions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-green-500"
                />
                Transparent policies
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-blue-500"
                />
                Secure booking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* =========================
              TABLE OF CONTENTS
          ========================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-slate-900">
                On this page
              </h2>

              <div className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                      {index + 1}
                    </span>

                    <span className="leading-5">
                      {section.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* =========================
              TERMS CONTENT
          ========================== */}
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-8 lg:p-10">
            {/* Introduction */}
            <section
              id="introduction"
              className="scroll-mt-24 border-b border-slate-200 pb-8"
            >
              <SectionHeading
                number="01"
                title="Introduction"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Welcome to Tripora. Tripora is a travel platform that
                helps users discover, compare and book travel-related
                services including flights, hotels, trains, buses,
                cabs and holiday packages.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                These Terms & Conditions explain the rules and
                responsibilities that apply when you access or use
                our website, applications and services.
              </p>
            </section>

            {/* Acceptance */}
            <section
              id="acceptance"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="02"
                title="Acceptance of Terms"
              />

              <p className="mt-4 leading-7 text-slate-600">
                By visiting Tripora, creating an account, making a
                booking or using any of our services, you acknowledge
                that you have read, understood and agreed to these
                Terms & Conditions.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                If you do not agree with any part of these terms,
                please discontinue use of the Tripora platform.
              </p>
            </section>

            {/* Using Tripora */}
            <section
              id="using-tripora"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="03"
                title="Using Tripora"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora provides an online platform for searching,
                comparing and accessing travel services. Information
                displayed on Tripora may come from airlines, hotels,
                transport operators, tour providers and other service
                partners.
              </p>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm leading-6 text-blue-800">
                  Tripora aims to provide accurate and updated
                  information, but availability, prices, schedules
                  and service conditions may change without prior
                  notice.
                </p>
              </div>
            </section>

            {/* Account */}
            <section
              id="account"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="04"
                title="Account Registration"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Some Tripora services may require you to create an
                account. You are responsible for providing accurate
                information during registration and keeping your
                account details up to date.
              </p>

              <ul className="mt-5 space-y-3">
                <Bullet text="Provide accurate and complete information." />
                <Bullet text="Keep your login credentials confidential." />
                <Bullet text="Notify Tripora if you believe your account has been compromised." />
                <Bullet text="Do not use another person's account without authorization." />
              </ul>
            </section>

            {/* Bookings */}
            <section
              id="bookings"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="05"
                title="Bookings & Reservations"
              />

              <p className="mt-4 leading-7 text-slate-600">
                When you make a booking through Tripora, you agree to
                provide correct traveller information and verify the
                booking details before completing your reservation.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Depending on the service, the booking may be subject
                to additional terms and conditions imposed by the
                airline, hotel, transport operator or travel provider.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Flights"
                  text="Flight schedules, baggage rules and fare conditions may vary by airline."
                />

                <InfoCard
                  title="Hotels"
                  text="Hotel policies, check-in requirements and cancellation rules may differ by property."
                />

                <InfoCard
                  title="Transport"
                  text="Train, bus and cab services are subject to the respective operator's policies."
                />

                <InfoCard
                  title="Packages"
                  text="Holiday packages may include specific inclusions, exclusions and booking conditions."
                />
              </div>
            </section>

            {/* Payments */}
            <section
              id="payments"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="06"
                title="Payments & Pricing"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Prices shown on Tripora may include applicable taxes,
                fees or charges depending on the selected service.
                The final amount will be displayed before you confirm
                your booking.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                You agree to provide valid payment information and
                authorize Tripora or its payment partners to process
                the amount associated with your booking.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Important
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A booking is considered confirmed only after
                  successful payment processing and confirmation from
                  the applicable travel service provider.
                </p>
              </div>
            </section>

            {/* Cancellation */}
            <section
              id="cancellation"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="07"
                title="Cancellation & Refunds"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Cancellation and refund policies depend on the
                particular travel service booked through Tripora.
                Different airlines, hotels, transport operators and
                package providers may have different rules.
              </p>

              <ul className="mt-5 space-y-3">
                <Bullet text="Review cancellation conditions before completing a booking." />
                <Bullet text="Refund amounts may depend on the provider's cancellation policy." />
                <Bullet text="Certain bookings may be non-refundable." />
                <Bullet text="Processing time for refunds may vary depending on the payment method and service provider." />
              </ul>
            </section>

            {/* Documents */}
            <section
              id="documents"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="08"
                title="Travel Documents"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Travellers are responsible for ensuring that they have
                all documents required for their journey.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <RequirementCard text="Valid identification documents" />
                <RequirementCard text="Visa or entry permits where required" />
                <RequirementCard text="Valid passport for international travel" />
                <RequirementCard text="Required vaccination or health documents" />
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                Requirements may vary depending on the destination,
                nationality, airline and applicable government
                regulations.
              </p>
            </section>

            {/* Responsibilities */}
            <section
              id="responsibilities"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="09"
                title="User Responsibilities"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Users agree to use Tripora responsibly and in
                accordance with applicable laws and these Terms &
                Conditions.
              </p>

              <ul className="mt-5 space-y-3">
                <Bullet text="Do not provide false or misleading information." />
                <Bullet text="Do not attempt to interfere with the security or operation of the platform." />
                <Bullet text="Do not use Tripora for unlawful activities." />
                <Bullet text="Do not misuse promotional offers or booking systems." />
                <Bullet text="Respect the rights of other users and service providers." />
              </ul>
            </section>

            {/* Third Party */}
            <section
              id="third-party"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="10"
                title="Third-Party Services"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora may provide access to services offered by
                third-party providers such as airlines, hotels,
                transport companies, payment processors and tour
                operators.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                These third parties may have their own terms,
                conditions, privacy policies and cancellation rules.
                Users should review those policies before completing
                a transaction.
              </p>
            </section>

            {/* Privacy */}
            <section
              id="privacy"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="11"
                title="Privacy & Data Protection"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora respects your privacy and handles personal
                information according to its applicable privacy
                practices.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Information may be used to process bookings, provide
                customer support, improve services, communicate with
                users and maintain platform security.
              </p>

              <Link
                to="/privacy-policy"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Read our Privacy Policy
                <ArrowRight size={16} />
              </Link>
            </section>

            {/* Liability */}
            <section
              id="liability"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="12"
                title="Limitation of Liability"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora works to provide a reliable and useful travel
                booking experience. However, Tripora may not be
                responsible for circumstances outside its reasonable
                control, including service disruptions, delays,
                cancellations, weather conditions, government
                restrictions or actions of third-party providers.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Where a service is provided by a third-party operator,
                the provider's applicable terms and responsibilities
                may also apply.
              </p>
            </section>

            {/* Changes */}
            <section
              id="changes"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="13"
                title="Changes to Terms"
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora may update these Terms & Conditions from time
                to time to reflect changes in our services, legal
                requirements or business practices.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Updated terms will be published on this page. Your
                continued use of Tripora after an update means that
                you accept the revised terms.
              </p>
            </section>

            {/* Contact */}
            <section
              id="contact"
              className="scroll-mt-24 pt-8"
            >
              <SectionHeading
                number="14"
                title="Contact Us"
              />

              <p className="mt-4 leading-7 text-slate-600">
                If you have questions about these Terms & Conditions,
                our support team is available to help.
              </p>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Headphones size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Need help?
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Our Tripora support team is here to assist
                        you with your questions.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Contact Support
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="mt-10 border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500">
                Last updated: September 12, 2026
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

/* =========================
   REUSABLE COMPONENTS
========================= */

const SectionHeading = ({ number, title }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
        {number}
      </span>

      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h2>
    </div>
  );
};

const Bullet = ({ text }) => {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base">
      <CheckCircle2
        size={18}
        className="mt-1 shrink-0 text-blue-600"
      />

      <span>{text}</span>
    </li>
  );
};

const InfoCard = ({ title, text }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
};

const RequirementCard = ({ text }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
      <CheckCircle2
        size={18}
        className="shrink-0 text-green-500"
      />

      <span className="text-sm text-slate-600">
        {text}
      </span>
    </div>
  );
};

export default TermsAndConditions;

