import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  Headphones,
  Hotel,
  Info,
  Plane,
  RefreshCcw,
  ShieldCheck,
  Train,
  Bus,
  Package,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Refund Eligibility" },
  { id: "process", label: "Refund Process" },
  { id: "timeline", label: "Refund Timeline" },
  { id: "flights", label: "Flight Refunds" },
  { id: "hotels", label: "Hotel Refunds" },
  { id: "transport", label: "Train & Bus Refunds" },
  { id: "packages", label: "Holiday Packages" },
  { id: "non-refundable", label: "Non-Refundable Bookings" },
  { id: "charges", label: "Payment Charges" },
  { id: "status", label: "Refund Status" },
  { id: "exceptions", label: "Exceptions" },
  { id: "contact", label: "Contact Support" },
];

const RefundPolicy = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =========================================
          HERO / PAGE HEADER
      ========================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
          {/* Breadcrumb */}
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link
              to="/"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <ChevronRight size={15} />

            <span className="font-medium text-slate-700">
              Refund Policy
            </span>
          </div>

          {/* Header */}
          <div className="max-w-3xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
              <RefreshCcw size={16} />
              Refund Information
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Refund Policy
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              We want your booking experience with Tripora to be
              simple and transparent. Learn how cancellations, refunds
              and refund timelines work for different travel services.
            </p>

            {/* Quick points */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-green-500"
                />
                Transparent refund process
              </span>

              <span className="flex items-center gap-2">
                <Clock3
                  size={17}
                  className="text-blue-500"
                />
                Clear processing timelines
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-indigo-500"
                />
                Secure payments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* =====================================
              SIDEBAR / TABLE OF CONTENTS
          ====================================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
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

          {/* =====================================
              CONTENT
          ====================================== */}
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-8 lg:p-4">
            {/* =================================
                01 OVERVIEW
            ================================== */}
            <section
              id="overview"
              className="scroll-mt-24 border-b border-slate-200 pb-8"
            >
              <SectionHeading
                number="01"
                title="Overview"
                icon={<FileText size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Tripora aims to provide a transparent and convenient
                booking experience. If you cancel a booking or a
                service provider cancels a reservation, the refund
                amount and eligibility may depend on the terms of the
                selected service.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Before completing a booking, we recommend reviewing
                the cancellation and refund conditions shown for that
                particular service.
              </p>

              {/* Highlight */}
              <div className="mt-6 flex gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Info size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Important
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Refund rules can vary by airline, hotel,
                    transport operator, package provider and fare
                    type.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================
                02 ELIGIBILITY
            ================================== */}
            <section
              id="eligibility"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="02"
                title="Refund Eligibility"
                icon={<CheckCircle2 size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                A booking may qualify for a refund depending on the
                cancellation policy associated with the service.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <EligibilityCard
                  type="eligible"
                  title="Generally Eligible"
                  items={[
                    "Cancellation allowed under the booking policy",
                    "Service provider approves the refund",
                    "Booking was cancelled within the permitted period",
                    "Provider cancelled the service",
                  ]}
                />

                <EligibilityCard
                  type="notEligible"
                  title="May Not Be Eligible"
                  items={[
                    "Non-refundable booking",
                    "Cancellation after the permitted deadline",
                    "No-show where provider terms exclude refunds",
                    "Certain promotional or special fares",
                  ]}
                />
              </div>
            </section>

            {/* =================================
                03 PROCESS
            ================================== */}
            <section
              id="process"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="03"
                title="Cancellation & Refund Process"
                icon={<RefreshCcw size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                The refund process generally follows these steps:
              </p>

              {/* Process steps */}
              <div className="mt-7 grid gap-4 md:grid-cols-4">
                <ProcessCard
                  number="01"
                  title="Cancel"
                  text="Submit your cancellation request according to the booking rules."
                />

                <ProcessCard
                  number="02"
                  title="Verify"
                  text="The booking and applicable cancellation conditions are verified."
                />

                <ProcessCard
                  number="03"
                  title="Process"
                  text="The eligible refund amount is processed through the applicable payment channel."
                />

                <ProcessCard
                  number="04"
                  title="Receive"
                  text="The refunded amount is credited back to the original payment method where applicable."
                />
              </div>
            </section>

            {/* =================================
                04 TIMELINE
            ================================== */}
            <section
              id="timeline"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="04"
                title="Refund Timeline"
                icon={<Clock3 size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Once a refund has been approved and processed, the
                time required for the amount to appear in your account
                may depend on the payment method and financial
                institution.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="space-y-6">
                  <TimelineItem
                    number="01"
                    title="Cancellation Requested"
                    text="Your cancellation request is submitted."
                  />

                  <TimelineItem
                    number="02"
                    title="Booking Verified"
                    text="The applicable provider and cancellation policy are checked."
                  />

                  <TimelineItem
                    number="03"
                    title="Refund Approved"
                    text="The eligible refund amount is confirmed."
                  />

                  <TimelineItem
                    number="04"
                    title="Refund Processed"
                    text="The refund is initiated through the applicable payment channel."
                  />

                  <TimelineItem
                    number="05"
                    title="Amount Credited"
                    text="Your bank or payment provider credits the amount to the original payment method."
                    last
                  />
                </div>
              </div>
            </section>

            {/* =================================
                05 FLIGHTS
            ================================== */}
            <section
              id="flights"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="05"
                title="Flight Refunds"
                icon={<Plane size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Flight cancellation and refund rules depend on the
                airline, fare type, route and booking conditions.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<Plane size={18} />}
                  title="Airline Cancellation"
                  text="If an airline cancels or significantly changes a flight, refund options may be available according to the applicable airline policy."
                />

                <InfoCard
                  icon={<RefreshCcw size={18} />}
                  title="Customer Cancellation"
                  text="Customer-initiated cancellation is subject to the fare and airline cancellation rules."
                />
              </div>
            </section>

            {/* =================================
                06 HOTELS
            ================================== */}
            <section
              id="hotels"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="06"
                title="Hotel Refunds"
                icon={<Hotel size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Hotel cancellation policies vary by property, room
                type, rate plan and booking conditions.
              </p>

              <ul className="mt-5 space-y-3">
                <Bullet text="Free cancellation bookings may qualify for a full refund when cancelled within the allowed period." />
                <Bullet text="Non-refundable hotel rates may not qualify for a refund." />
                <Bullet text="Late cancellation or no-show charges may apply." />
                <Bullet text="Special hotel promotions may have separate refund conditions." />
              </ul>
            </section>

            {/* =================================
                07 TRAIN & BUS
            ================================== */}
            <section
              id="transport"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="07"
                title="Train & Bus Refunds"
                icon={<Train size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Train and bus cancellations are generally governed by
                the cancellation rules of the respective transport
                operator.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<Train size={18} />}
                  title="Train Bookings"
                  text="Refund eligibility and cancellation charges depend on the applicable railway or train operator rules."
                />

                <InfoCard
                  icon={<Bus size={18} />}
                  title="Bus Bookings"
                  text="Bus refund amounts may depend on the operator, route and time remaining before departure."
                />
              </div>
            </section>

            {/* =================================
                08 PACKAGES
            ================================== */}
            <section
              id="packages"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="08"
                title="Holiday Package Refunds"
                icon={<Package size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Holiday packages may include multiple travel
                components such as flights, accommodation,
                transportation, activities and transfers.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Because of these components, cancellation charges and
                refund amounts may depend on the individual package
                terms and the providers involved.
              </p>

              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex gap-3">
                  <Info
                    size={19}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <p className="text-sm leading-6 text-amber-800">
                    Always check the package-specific cancellation
                    conditions before confirming your booking.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================
                09 NON REFUNDABLE
            ================================== */}
            <section
              id="non-refundable"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="09"
                title="Non-Refundable Bookings"
                icon={<XCircle size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Some bookings may be marked as non-refundable. These
                bookings generally do not qualify for a refund after
                confirmation or cancellation.
              </p>

              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="flex gap-3">
                  <XCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Check before booking
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Non-refundable conditions will generally be
                      displayed during the booking process. Please
                      review them carefully before payment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================
                10 PAYMENT CHARGES
            ================================== */}
            <section
              id="charges"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="10"
                title="Payment Gateway Charges"
                icon={<CreditCard size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Depending on the payment method and transaction,
                certain payment processing or service charges may
                apply.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Where applicable, such charges and their refund
                treatment will be communicated during the booking
                process.
              </p>
            </section>

            {/* =================================
                11 REFUND STATUS
            ================================== */}
            <section
              id="status"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="11"
                title="Refund Status"
                icon={<RefreshCcw size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                If you have cancelled a booking and are waiting for a
                refund, you can contact Tripora support with your
                booking details.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <RefreshCcw size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Waiting for your refund?
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Keep your booking reference and payment details
                      available when contacting our support team.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================
                12 EXCEPTIONS
            ================================== */}
            <section
              id="exceptions"
              className="scroll-mt-24 border-b border-slate-200 py-8"
            >
              <SectionHeading
                number="12"
                title="Refund Exceptions"
                icon={<Info size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                Certain situations may be subject to special refund
                conditions. These may include extraordinary events,
                provider-specific restrictions, government
                restrictions or other circumstances outside Tripora's
                reasonable control.
              </p>

              <ul className="mt-5 space-y-3">
                <Bullet text="Government travel restrictions" />
                <Bullet text="Severe weather or natural events" />
                <Bullet text="Airline or hotel operational disruptions" />
                <Bullet text="Special promotional or discounted fares" />
                <Bullet text="Provider-specific cancellation restrictions" />
              </ul>
            </section>

            {/* =================================
                13 CONTACT SUPPORT
            ================================== */}
            <section
              id="contact"
              className="scroll-mt-24 pt-8"
            >
              <SectionHeading
                number="13"
                title="Contact Support"
                icon={<Headphones size={18} />}
              />

              <p className="mt-4 leading-7 text-slate-600">
                If you have any questions about a cancellation or
                refund, our Tripora support team is here to help.
              </p>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Headphones size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Need help with a refund?
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Contact our support team and provide your
                        booking reference for faster assistance.
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

            {/* =================================
                LAST UPDATED
            ================================== */}
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

/* =====================================================
   SECTION HEADING
===================================================== */

const SectionHeading = ({ number, title, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-blue-600">
          {number}
        </span>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
      </div>
    </div>
  );
};

/* =====================================================
   BULLET
===================================================== */

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

/* =====================================================
   ELIGIBILITY CARD
===================================================== */

const EligibilityCard = ({
  type,
  title,
  items,
}) => {
  const isEligible = type === "eligible";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isEligible
          ? "border-green-100 bg-green-50/60"
          : "border-red-100 bg-red-50/60"
      }`}
    >
      <div className="flex items-center gap-3">
        {isEligible ? (
          <CheckCircle2
            size={20}
            className="text-green-600"
          />
        ) : (
          <XCircle
            size={20}
            className="text-red-500"
          />
        )}

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isEligible
                  ? "bg-green-500"
                  : "bg-red-400"
              }`}
            />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* =====================================================
   PROCESS CARD
===================================================== */

const ProcessCard = ({
  number,
  title,
  text,
}) => {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
};

/* =====================================================
   TIMELINE ITEM
===================================================== */

const TimelineItem = ({
  number,
  title,
  text,
  last = false,
}) => {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div className="absolute left-[17px] top-9 h-[calc(100%+24px)] w-px bg-blue-100" />
      )}

      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
        {number}
      </div>

      <div className="pb-1">
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {text}
        </p>
      </div>
    </div>
  );
};

/* =====================================================
   INFO CARD
===================================================== */

const InfoCard = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
};

export default RefundPolicy;

