import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock3,
  Globe2,
  Hotel,
  Map,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Train,
  WalletCards,
} from "lucide-react";

const AboutUs = () => {
  const whyTripora = [
    {
      icon: Search,
      title: "Everything in One Place",
      description:
        "Search and explore flights, hotels, trains, buses and holiday packages from one convenient platform.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Booking",
      description:
        "Enjoy a simple and reliable booking experience designed with your travel needs in mind.",
    },
    {
      icon: WalletCards,
      title: "Great Value",
      description:
        "Compare travel options and discover choices that fit your plans and budget.",
    },
    {
      icon: Clock3,
      title: "24/7 Support",
      description:
        "Get assistance whenever you need help with your travel plans or booking.",
    },
    {
      icon: Globe2,
      title: "Explore More",
      description:
        "Discover destinations and travel experiences for your next adventure.",
    },
    {
      icon: Sparkles,
      title: "Simple Experience",
      description:
        "From searching to booking, Tripora keeps your travel planning simple and convenient.",
    },
  ];

  const travelServices = [
    {
      title: "Flights",
      description:
        "Find flights for your next domestic or international journey.",
      icon: Plane,
      path: "/flights",
    },
    {
      title: "Hotels",
      description:
        "Discover comfortable stays for business and leisure trips.",
      icon: Hotel,
      path: "/hotels",
    },
    {
      title: "Trains",
      description:
        "Plan convenient train journeys and explore new destinations.",
      icon: Train,
      path: "/trains",
    },
    {
      title: "Buses",
      description:
        "Find bus travel options for comfortable road journeys.",
      icon: Bus,
      path: "/buses",
    },
    {
      title: "Holiday Packages",
      description:
        "Explore handpicked packages for memorable vacations.",
      icon: Map,
      path: "/packages",
    },
    {
      title: "Cabs",
      description:
        "Find convenient transportation options for your local travel.",
      icon: Ticket,
      path: "/cabs",
    },
  ];

  const howItWorks = [
    {
      number: "01",
      title: "Search",
      description:
        "Tell us where you want to go and explore available travel options.",
      icon: Search,
    },
    {
      number: "02",
      title: "Compare",
      description:
        "Compare options, prices and details to find what works best for you.",
      icon: Star,
    },
    {
      number: "03",
      title: "Book",
      description:
        "Choose your preferred option and complete your booking with ease.",
      icon: Ticket,
    },
    {
      number: "04",
      title: "Travel",
      description:
        "Pack your bags and enjoy your journey with Tripora.",
      icon: Plane,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Decorative shapes */}
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
              About Us
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
            {/* Hero content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                <Globe2 size={15} />
                ABOUT TRIPORA
              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Making every journey simple, memorable and yours.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Tripora is a modern travel platform designed to
                make discovering, planning and booking your next
                journey easier.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/flights"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-2 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Explore Trips
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Hero visual card */}
            <div className="relative hidden lg:block">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                    <Plane size={24} />
                  </div>

                  <div className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    Travel Better
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    Your next adventure
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Explore the world your way.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-blue-100">
                    Search, compare and plan your journey with a
                    travel experience built around you.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xl font-bold text-white">
                      50+
                    </p>

                    <p className="mt-1 text-xs text-blue-100">
                      Destinations
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xl font-bold text-white">
                      24/7
                    </p>

                    <p className="mt-1 text-xs text-blue-100">
                      Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
        <section>
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Content */}
            <div>
              <p className="text-sm font-semibold text-blue-600">
                WHO WE ARE
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Your journey starts with a better travel experience.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Tripora is built with a simple idea: travel
                planning should be exciting, not complicated. We
                bring different travel services together so you
                can spend less time managing bookings and more
                time enjoying your journey.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Whether you are planning a quick weekend getaway,
                a family vacation, a business trip or an
                international adventure, Tripora helps you
                discover travel options and make informed choices.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  "Flights",
                  "Hotels",
                  "Trains",
                  "Buses",
                  "Holiday Packages",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-medium text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-2xl font-bold text-blue-600">
                    12K+
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Happy Travellers
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-2xl font-bold text-slate-900">
                    50+
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Destinations
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-2xl font-bold text-slate-900">
                    500+
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Travel Partners
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-600 p-5">
                  <p className="text-2xl font-bold text-white">
                    24/7
                  </p>

                  <p className="mt-1 text-sm text-blue-100">
                    Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MISSION
        ====================================================== */}
        <section className="mt-6">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 px-2 py-10 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-blue-600">
                OUR MISSION
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                To make travel simpler for everyone.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We want to remove the unnecessary complexity from
                travel planning and give travellers a simple,
                transparent and convenient way to plan their
                journeys.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {/* Simple */}
              <div className="rounded-2xl border border-blue-100 bg-white p-2 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Search size={21} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Simple Booking
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Make your travel planning easier with a clean
                  and straightforward booking experience.
                </p>
              </div>

              {/* Value */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <WalletCards size={21} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Better Value
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Explore different options and find travel
                  choices that work for your plans and budget.
                </p>
              </div>

              {/* Trusted */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Trusted Experience
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Travel with confidence through a convenient
                  experience and helpful support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY TRIPORA
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-7">
            <p className="text-sm font-semibold text-blue-600">
              WHY TRIPORA
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why travellers choose Tripora
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Everything we build is focused on making your travel
              planning easier and more enjoyable.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyTripora.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            WHAT YOU CAN BOOK
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                EXPLORE WITH TRIPORA
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                What you can book
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Explore different travel services and plan your
                complete journey in one place.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  to={service.path}
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

                  <h3 className="mt-5 font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-4 text-sm font-semibold text-blue-600">
                    Explore {service.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            VISION
        ====================================================== */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-6 sm:px-8 lg:px-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                <Globe2 size={24} />
              </div>

              <p className="mt-6 text-sm font-semibold text-blue-300">
                OUR VISION
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Travel more. Plan better. Explore further.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                We believe travel should be about discovering new
                places, creating memories and enjoying the journey
                — not dealing with complicated booking processes.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TRIPORA WORKS
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Your journey in four simple steps
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              From discovering your destination to starting your
              journey, Tripora keeps the process simple.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {index < howItWorks.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block"
                    />
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <span className="text-sm font-bold text-blue-100">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            TRUST STATS
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl bg-blue-600 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  12K+
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  Travellers
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  50+
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  Destinations
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  500+
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  Travel Partners
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  24/7
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm sm:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Plane size={23} />
            </div>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Ready for your next journey?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Discover destinations, compare travel options and
              start planning your next adventure with Tripora.
            </p>

            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/flights"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Trips
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;