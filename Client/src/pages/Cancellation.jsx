import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Bus,
  CalendarX2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Hotel,
  Info,
  Package,
  Plane,
  RefreshCcw,
  Ticket,
  Train,
} from "lucide-react";

const Cancellation = () => {
  const [activeService, setActiveService] = useState("Flights");

  const cancellationSteps = [
    {
      number: "01",
      title: "Open My Booking",
      description:
        "Log in to your Tripora account and open your booking.",
      icon: Ticket,
    },
    {
      number: "02",
      title: "Select Booking",
      description:
        "Choose the reservation you want to cancel.",
      icon: CalendarX2,
    },
    {
      number: "03",
      title: "Review & Cancel",
      description:
        "Check applicable charges and confirm cancellation.",
      icon: CheckCircle2,
    },
    {
      number: "04",
      title: "Get Confirmation",
      description:
        "Receive your cancellation confirmation and refund details.",
      icon: RefreshCcw,
    },
  ];

  const serviceCards = [
    {
      title: "Flights",
      icon: Plane,
      description:
        "Cancellation charges depend on the airline and fare rules.",
    },
    {
      title: "Hotels",
      icon: Hotel,
      description:
        "Charges depend on the hotel's cancellation policy.",
    },
    {
      title: "Trains",
      icon: Train,
      description:
        "Cancellation follows applicable railway or operator rules.",
    },
    {
      title: "Buses",
      icon: Bus,
      description:
        "Charges depend on the bus operator and cancellation timing.",
    },
    {
      title: "Packages",
      icon: Package,
      description:
        "Package cancellation depends on the package provider's terms.",
    },
  ];

  const serviceDetails = {
    Flights: {
      icon: Plane,
      title: "Flight Cancellation",
      description:
        "Before cancelling your flight, review the airline's applicable cancellation and fare conditions.",
      points: [
        "Airline cancellation rules",
        "Fare type and ticket conditions",
        "Time remaining before departure",
        "Applicable cancellation charges",
        "Eligible refund amount",
      ],
    },
    Hotels: {
      icon: Hotel,
      title: "Hotel Cancellation",
      description:
        "Hotel cancellation policies can vary by property, room type and booking conditions.",
      points: [
        "Hotel cancellation policy",
        "Room and rate conditions",
        "Free cancellation deadline",
        "Applicable cancellation charges",
        "Eligible refund amount",
      ],
    },
    Trains: {
      icon: Train,
      title: "Train Cancellation",
      description:
        "Train cancellation rules depend on the applicable railway or service provider policies.",
      points: [
        "Ticket cancellation rules",
        "Time of cancellation",
        "Applicable cancellation charges",
        "Ticket status",
        "Eligible refund amount",
      ],
    },
    Buses: {
      icon: Bus,
      title: "Bus Cancellation",
      description:
        "Bus cancellation charges and eligibility may vary between different operators.",
      points: [
        "Bus operator cancellation rules",
        "Time remaining before departure",
        "Operator cancellation charges",
        "Ticket conditions",
        "Eligible refund amount",
      ],
    },
    Packages: {
      icon: Package,
      title: "Holiday Package Cancellation",
      description:
        "Holiday package cancellation depends on the package provider, itinerary and booking conditions.",
      points: [
        "Package cancellation policy",
        "Travel date and booking timing",
        "Hotel and transport conditions",
        "Applicable cancellation charges",
        "Eligible refund amount",
      ],
    },
  };

  const activeDetails = serviceDetails[activeService];
  const ActiveIcon = activeDetails.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          {/* Breadcrumb */}
          <div className="mb-2 flex items-center gap-2 text-sm text-blue-100">
            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-white">
              Cancellation
            </span>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
            {/* Hero Text */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                <CalendarX2 size={15} />
                Tripora Booking Support
              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Cancel your booking with ease
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Need to change your travel plans? Learn how
                cancellation works, what charges may apply and what
                happens after you cancel your booking.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                //   to="/my-bookings"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Manage My Booking
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:block">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <CalendarX2 size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Before you cancel
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Always review the cancellation policy shown on
                your booking before confirming cancellation.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-white">
                <Info size={16} />
                Policies vary by service provider
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
        {/* =====================================================
            IMPORTANT NOTICE
        ====================================================== */}
        <section>
          <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
              <AlertCircle size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Before you cancel
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Cancellation rules depend on the airline, hotel,
                train, bus operator or holiday package provider.
                Please check the cancellation policy displayed
                during your booking before cancelling.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TO CANCEL
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How to cancel your booking
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Follow these simple steps to submit a cancellation
              request from your Tripora account.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cancellationSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {/* Connector */}
                  {index < cancellationSteps.length - 1 && (
                    <div className="absolute right-[-17px] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ChevronRight
                        size={20}
                        className="text-slate-300"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <span className="text-sm font-bold text-blue-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            CANCELLATION CHARGES
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              SERVICE POLICIES
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cancellation charges
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Cancellation charges are determined by the applicable
              provider policy and your booking conditions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.title;

              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() =>
                    setActiveService(service.title)
                  }
                  className={`group rounded-2xl border p-5 text-left transition duration-200 ${
                    isActive
                      ? "border-blue-500 bg-blue-600 text-white shadow-md"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon size={21} />
                  </div>

                  <h3
                    className={`mt-4 font-bold ${
                      isActive
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-5 ${
                      isActive
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {service.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            CANCELLATION TIMELINE
        ====================================================== */}
        <section className="mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ActiveIcon size={21} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeDetails.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {activeDetails.description}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {activeDetails.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-4"
                >
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <span className="text-sm leading-5 text-slate-600">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            TIMELINE
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              WHAT HAPPENS NEXT
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cancellation timeline
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="relative">
              {/* Desktop Line */}
              <div className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-blue-100 lg:block" />

              <div className="grid gap-7 lg:grid-cols-5">
                {[
                  {
                    title: "Booking Confirmed",
                    description:
                      "Your travel reservation is active.",
                  },
                  {
                    title: "Cancellation Request",
                    description:
                      "You submit a cancellation request.",
                  },
                  {
                    title: "Policy Check",
                    description:
                      "Applicable charges are calculated.",
                  },
                  {
                    title: "Booking Cancelled",
                    description:
                      "Cancellation is confirmed by the provider.",
                  },
                  {
                    title: "Refund Initiated",
                    description:
                      "Eligible refund processing begins.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="relative flex items-start gap-4 lg:block lg:text-center"
                  >
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white ring-8 ring-white lg:mx-auto">
                      {index + 1}
                    </div>

                    <div className="lg:mt-5">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
              <Clock3
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-slate-600">
                The exact refund amount and processing time depend
                on your booking's applicable cancellation policy and
                payment method.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            BEFORE YOU CANCEL
        ====================================================== */}
        <section className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 size={21} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Before you cancel
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Make sure you check these details before confirming
                your cancellation.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Check applicable cancellation charges",
                  "Check refund eligibility",
                  "Confirm that you selected the correct booking",
                  "Review your travel date and service details",
                  "Save your booking confirmation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Check size={14} />
                    </div>

                    <span className="text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Charges */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CircleDollarSign size={21} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                What determines cancellation charges?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                The final cancellation amount can depend on several
                factors related to your booking.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Service provider",
                    text: "Airline, hotel, train or bus operator rules.",
                  },
                  {
                    title: "Booking type",
                    text: "Fare, room, ticket or package conditions.",
                  },
                  {
                    title: "Cancellation timing",
                    text: "How early or late you cancel before departure or check-in.",
                  },
                  {
                    title: "Special conditions",
                    text: "Promotional and non-refundable bookings may have different rules.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CANCELLATION VS REFUND
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold text-blue-600">
              UNDERSTAND THE DIFFERENCE
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cancellation vs Refund
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Cancellation and refund are connected, but they are
              not the same thing.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
            {/* Cancellation */}
            <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarX2 size={21} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Cancellation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Cancellation stops or terminates your existing
                travel reservation according to the applicable
                booking rules.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-blue-600" />
                  Booking cancellation request
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-blue-600" />
                  Provider policy is applied
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-blue-600" />
                  Cancellation charges may apply
                </div>
              </div>
            </div>

            {/* Refund */}
            <div className="p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <RefreshCcw size={21} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Refund
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A refund is the eligible amount returned after a
                cancellation or other qualifying transaction.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-emerald-600" />
                  Eligible amount is calculated
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-emerald-600" />
                  Refund processing begins
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-emerald-600" />
                  Amount is returned through applicable method
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link
              to="/refund"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View Refund Policy
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* =====================================================
            SUPPORT CTA
        ====================================================== */}
        <section className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                  <HeadsetIcon />
                  Tripora Support
                </div>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Need help cancelling your booking?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  If you're unsure about cancellation charges,
                  eligibility or the cancellation process, our
                  support team can help.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                //   to="/my-bookings"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Manage Booking
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Contact Support
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* =====================================================
   SMALL HEADSET ICON
===================================================== */

const HeadsetIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-2v-5h4v3Z" />
      <path d="M3 19a2 2 0 0 0 2 2h2v-5H3v3Z" />
    </svg>
  );
};

export default Cancellation;