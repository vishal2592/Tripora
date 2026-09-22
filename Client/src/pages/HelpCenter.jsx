
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bus,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Hotel,
  Package,
  Plane,
  RefreshCcw,
  Search,
  Ticket,
  Train,
  UserRound,
  X,
} from "lucide-react";

/* =====================================================
   HELP CATEGORIES
===================================================== */

const categories = [
  {
    title: "Flights",
    description: "Search, booking, cancellation and flight changes",
    articles: "24 articles",
    icon: Plane,
    path: "/flights",
  },
  {
    title: "Hotels",
    description: "Reservations, check-in and hotel cancellations",
    articles: "18 articles",
    icon: Hotel,
    path: "/hotels",
  },
  {
    title: "Trains",
    description: "Tickets, seats, cancellations and travel details",
    articles: "10 articles",
    icon: Train,
    path: "/trains",
  },
  {
    title: "Buses",
    description: "Bus tickets, seats, boarding and cancellations",
    articles: "12 articles",
    icon: Bus,
    path: "/buses",
  },
  {
    title: "Payments",
    description: "Payment methods, failed payments and transactions",
    articles: "15 articles",
    icon: CreditCard,
    path: "/refundpolicy",
  },
  {
    title: "Refunds",
    description: "Refund eligibility, status and processing time",
    articles: "14 articles",
    icon: RefreshCcw,
    path: "/refundpolicy",
  },
  {
    title: "Holiday Packages",
    description: "Packages, inclusions, changes and cancellations",
    articles: "11 articles",
    icon: Package,
    path: "/packages",
  },
  {
    title: "Account",
    description: "Login, profile, password and account settings",
    articles: "9 articles",
    icon: UserRound,
    path: "/help-center/account",
  },
];

/* =====================================================
   POPULAR QUESTIONS
===================================================== */

const popularQuestions = [
  {
    question: "How can I cancel my booking?",
    answer:
      "You can cancel your booking from the My Bookings section. Open the booking you want to cancel, select the cancellation option and follow the instructions. Cancellation charges and refund eligibility depend on the terms of your selected service.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "Refund processing time depends on the travel service provider and your payment method. Once the refund has been processed by Tripora, the amount may take additional time to appear in your bank or payment account.",
  },
  {
    question: "How can I change my booking?",
    answer:
      "Booking changes depend on the service provider and the type of booking. Open My Bookings and check whether a change or modification option is available for your reservation.",
  },
  {
    question: "How can I download my ticket?",
    answer:
      "After your booking is confirmed, you can access your booking details from My Bookings. If a downloadable ticket is available, you can view or download it from the booking details page.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Tripora may support multiple payment methods depending on the booking and payment provider, including cards, online banking and supported digital payment methods.",
  },
  {
    question: "What should I do if my payment failed?",
    answer:
      "First, check whether the amount was deducted from your account. If the amount was not deducted, you can try the payment again. If the amount was deducted but your booking was not confirmed, contact Tripora support with your transaction details.",
  },
  {
    question: "Can I modify passenger or traveller details?",
    answer:
      "Modification of traveller details depends on the travel provider and booking type. Some details may be editable while others may require cancellation and a new booking.",
  },
  {
    question: "Where can I find my booking details?",
    answer:
      "You can find your confirmed bookings under the My Bookings section of your Tripora account. Open a booking to view its travel information, payment details and available actions.",
  },
];

/* =====================================================
   QUICK HELP
===================================================== */

const quickHelp = [
  {
    icon: Ticket,
    title: "Manage Your Booking",
    description:
      "View, cancel or manage your existing Tripora bookings.",
    button: "My Bookings",
    path: "/my-bookings",
  },
//   {
//     icon: HeadsetIcon,
//     title: "Contact Support",
//     description:
//       "Can't find what you're looking for? Our support team can help.",
//     button: "Contact Support",
//     path: "/contact",
//   },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  /* Search popular questions */
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return popularQuestions;
    }

    return popularQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleQuestion = (index) => {
    setOpenQuestion((current) =>
      current === index ? null : index
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =================================================
          HERO / SEARCH
      ================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

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
              Help Center
            </span>
          </div>

          {/* Hero content */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
              <HelpCircle size={26} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              How can we help you?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Find answers about bookings, payments, cancellations,
              refunds and everything you need for your Tripora journey.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <div className="flex items-center rounded-2xl bg-white p-1.5 shadow-xl">
                <Search
                  size={21}
                  className="ml-4 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search for bookings, refunds, payments..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}

                <button
                  type="button"
                  className="hidden rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:block"
                >
                  Search
                </button>
              </div>

              <p className="mt-3 text-xs text-blue-100">
                Try searching for "refund", "cancel booking" or
                "payment failed"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
        {/* =================================================
            CATEGORIES
        ================================================== */}
        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold text-blue-600">
              HELP TOPICS
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Browse help topics
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Choose a category to find answers and useful
              information about your Tripora services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  to={category.path}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <p className="mt-4 text-xs font-medium text-blue-600">
                    {category.articles}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* =================================================
            POPULAR QUESTIONS
        ================================================== */}
        <section className="mt-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              FAQ
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Popular questions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Quick answers to some of the most common questions.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item, index) => {
                const isOpen = openQuestion === index;

                return (
                  <div
                    key={item.question}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleQuestion(index)
                      }
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <BookOpen size={15} />
                        </div>

                        <span className="text-sm font-semibold text-slate-800 sm:text-base">
                          {item.question}
                        </span>
                      </div>

                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pl-[60px] sm:px-6 sm:pb-6 sm:pl-[67px]">
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={22} />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No results found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try another search term or contact our support
                  team.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            QUICK ASSISTANCE
        ================================================== */}
        <section className="mt-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              QUICK ASSISTANCE
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Still need help?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {quickHelp.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={item.path}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {item.button}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            REFUND CTA
        ================================================== */}
        <section className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
            <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <RefreshCcw size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Looking for refund information?
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    Learn about refund eligibility, cancellation
                    rules and refund processing timelines.
                  </p>
                </div>
              </div>

              <Link
                to="/refundpolicy"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-600 hover:text-white"
              >
                View Refund Policy
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================
            SUPPORT CTA
        ================================================== */}
        <section className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 sm:px-8 lg:px-10">
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-2xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                  <CheckCircle2 size={14} />
                  Tripora Support
                </div>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Can't find what you're looking for?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Our support team is ready to help you with your
                  bookings, payments, cancellations and other
                  travel-related questions.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
              >
                Contact Support
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* =====================================================
   CUSTOM HEADSET ICON WRAPPER
===================================================== */

const HeadsetIcon = ({ size = 22 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export default HelpCenter;

