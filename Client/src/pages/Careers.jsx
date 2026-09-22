
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Globe2,
  Heart,
  Lightbulb,
  Map,
  Plane,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

const Careers = () => {
  const cultureCards = [
    {
      icon: Compass,
      title: "Stay Curious",
      description:
        "We keep exploring new ideas, new perspectives and new ways to make travel better.",
    },
    {
      icon: Rocket,
      title: "Think Big",
      description:
        "We believe travel has no boundaries, and neither should our ambition.",
    },
    {
      icon: Sparkles,
      title: "Keep It Simple",
      description:
        "We turn complicated travel experiences into simple and enjoyable journeys.",
    },
    {
      icon: Users,
      title: "Travel Together",
      description:
        "Great things happen when different people, ideas and experiences come together.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision starts with understanding what makes a traveller's journey better.",
    },
    {
      icon: Lightbulb,
      title: "Keep Learning",
      description:
        "We learn from every journey, every challenge and every opportunity.",
    },
  ];

  const whyTripora = [
    {
      icon: Globe2,
      title: "A World of Possibilities",
      description:
        "Work on experiences that connect people with destinations around the world.",
    },
    {
      icon: Lightbulb,
      title: "Ideas Matter",
      description:
        "We encourage people to question, experiment and bring better ideas to the table.",
    },
    {
      icon: Users,
      title: "People First",
      description:
        "We believe great experiences are created by people who feel valued and connected.",
    },
    {
      icon: Rocket,
      title: "Build Something Meaningful",
      description:
        "Create products that can make a real difference in how people plan their journeys.",
    },
  ];

  const journeySteps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Every great journey starts with curiosity and the desire to explore something new.",
    },
    {
      number: "02",
      title: "Imagine",
      description:
        "We turn ideas into experiences that help travellers imagine their next adventure.",
    },
    {
      number: "03",
      title: "Create",
      description:
        "We build simple, thoughtful and useful travel experiences for everyone.",
    },
    {
      number: "04",
      title: "Explore",
      description:
        "Our ultimate goal is to help people spend less time planning and more time exploring.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Decorative elements */}
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
              Careers
            </span>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-[1fr_400px]">
            {/* Left content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-sm">
                <Plane size={15} />
                TRAVEL WITH PURPOSE
              </div>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build the future of travel with Tripora.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                We are creating a world where discovering new
                places is easier, more accessible and more
                memorable. Come be part of the journey.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Explore Tripora
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#culture"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Meet Our Culture
                </a>
              </div>
            </div>

            {/* Right travel card */}
            <div className="relative hidden lg:block">
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                {/* Visual area */}
                <div className="relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

                  <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10" />

                  <div className="absolute left-6 top-6 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm">
                    <Globe2 size={25} />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
                      The journey begins here
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      Explore beyond boundaries.
                    </h2>
                  </div>

                  <div className="absolute right-6 top-6 rounded-2xl bg-white/15 p-3 text-white backdrop-blur-sm">
                    <Plane size={22} />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      50+
                    </p>

                    <p className="mt-0.5 text-[10px] text-blue-100">
                      Destinations
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      12K+
                    </p>

                    <p className="mt-0.5 text-[10px] text-blue-100">
                      Travellers
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      24/7
                    </p>

                    <p className="mt-0.5 text-[10px] text-blue-100">
                      Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
        {/* =====================================================
            LIFE AT TRIPORA
        ====================================================== */}
        <section id="culture" className="scroll-mt-24">
          <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-blue-600">
                LIFE AT TRIPORA
              </p>

              <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                We are travellers, creators, builders and
                problem-solvers.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We believe that the best journeys begin with
                curiosity. At Tripora, we bring that same
                curiosity into everything we build.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We are building a culture where people can share
                ideas, learn from one another and create
                experiences that make travelling easier and more
                enjoyable.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Curiosity",
                  "Creativity",
                  "Collaboration",
                  "Growth",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right visual cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <Compass size={22} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    Explore
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Stay curious and discover better ways to
                    solve problems.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Lightbulb size={22} />
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  Create
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Turn ideas into experiences people genuinely
                  enjoy.
                </p>
              </div>

              <div className="-mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Users size={22} />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  Connect
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Work together and learn from different
                  perspectives.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-900 p-6 text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Plane size={22} />
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Travel
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Build experiences inspired by the joy of
                  travelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TRAVEL CHANGES PEOPLE
        ====================================================== */}
        <section className="mt-4">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="grid lg:grid-cols-2">
              {/* Visual */}
              <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

                <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />

                {/* Decorative route */}
                <div className="absolute left-10 right-10 top-1/2 h-px border-t border-dashed border-white/40" />

                <div className="absolute left-10 top-[calc(50%-12px)] flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>

                <div className="absolute right-10 top-[calc(50%-12px)] flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>

                {/* Center plane */}
                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-12 items-center justify-center rounded-2xl bg-white shadow-xl">
                  <Plane
                    size={25}
                    className="text-blue-600"
                  />
                </div>

                <div className="absolute bottom-8 left-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                    Tripora philosophy
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    Discover. Experience. Remember.
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center p-3 sm:p-6 lg:p-9">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    WHY WE EXIST
                  </p>

                  <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    Travel opens minds. We build the tools that
                    make it possible.
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Travelling gives people the chance to see
                    different places, meet different people and
                    experience life from a new perspective.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    We want to remove the friction from planning
                    those experiences. Tripora brings travel
                    discovery, planning and booking together in a
                    simple and enjoyable experience.
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Heart size={19} />
                    </div>

                    <p className="text-sm font-semibold text-slate-800">
                      Built around the joy of travel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            OUR CULTURE
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-4 max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              OUR CULTURE
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What moves us forward
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Our culture is shaped by the way we think, work and
              create experiences for travellers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cultureCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
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
            WHY TRIPORA
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl bg-blue-50 px-3 py-4 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-blue-600">
                WHY TRIPORA
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Why build your journey with us?
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We are building more than a travel platform. We
                are building a place where ideas, people and
                journeys can come together.
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyTripora.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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
          </div>
        </section>

        {/* =====================================================
            OUR JOURNEY
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold text-blue-600">
              OUR JOURNEY
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              From an idea to a journey
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Everything we do starts with one simple question:
              how can we make travel better?
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
              >
                {index < journeySteps.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block"
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    {step.number}
                  </div>

                  <Map
                    size={18}
                    className="text-blue-100"
                  />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            NUMBERS / TRUST STRIP
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Users size={20} />
                </div>

                <p className="mt-3 text-2xl font-bold text-white">
                  12K+
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Happy Travellers
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Globe2 size={20} />
                </div>

                <p className="mt-3 text-2xl font-bold text-white">
                  50+
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Destinations
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Star size={20} />
                </div>

                <p className="mt-3 text-2xl font-bold text-white">
                  4.8/5
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Traveller Rating
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <ShieldCheck size={20} />
                </div>

                <p className="mt-3 text-2xl font-bold text-white">
                  24/7
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-4 text-center sm:px-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-indigo-300/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Plane size={23} />
              </div>

              <p className="mt-6 text-sm font-semibold text-blue-100">
                YOUR NEXT JOURNEY STARTS HERE
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Come build the future of travel with us.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                Be part of Tripora and help us make travel simpler,
                smarter and more inspiring for people everywhere.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Explore Tripora
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Careers;

