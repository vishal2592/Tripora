
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Download,
  FileText,
  Globe2,
  Image as ImageIcon,
  Mail,
  Megaphone,
  Newspaper,
  Plane,
  Quote,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

const Press = () => {
  // =========================================================
  // MEDIA STORIES
  // Replace these demo entries with your real media coverage
  // =========================================================
  const mediaStories = [
    {
      id: 1,
      publication: "Travel Media",
      title:
        "Tripora is making travel planning simpler for modern travellers",
      date: "Sep 2026",
      category: "Travel",
    },
    {
      id: 2,
      publication: "Business & Travel",
      title:
        "How Tripora is building a simpler way to discover and book travel",
      date: "Aug 2026",
      category: "Business",
    },
    {
      id: 3,
      publication: "Travel Stories",
      title:
        "The new generation of travellers wants simpler journeys",
      date: "Aug 2026",
      category: "Insights",
    },
  ];

  // =========================================================
  // ANNOUNCEMENTS
  // =========================================================
  const announcements = [
    {
      date: "12",
      month: "SEP",
      title:
        "Tripora expands its travel experience for modern travellers",
      description:
        "Discover how Tripora is bringing travel discovery and booking together in one simple experience.",
    },
    {
      date: "28",
      month: "AUG",
      title:
        "New destinations are coming to Tripora",
      description:
        "Tripora continues to expand its destination experience and make more journeys accessible.",
    },
    {
      date: "15",
      month: "AUG",
      title:
        "Making travel planning simpler with Tripora",
      description:
        "Our approach to creating a smoother and more intuitive travel planning experience.",
    },
  ];

  // =========================================================
  // BRAND ASSETS
  // =========================================================
  const brandAssets = [
    {
      icon: ImageIcon,
      title: "Tripora Logo",
      description:
        "Primary Tripora logo assets for editorial and media use.",
    },
    {
      icon: FileText,
      title: "Brand Guidelines",
      description:
        "Our visual identity, logo usage and brand guidelines.",
    },
    {
      icon: Plane,
      title: "Product Images",
      description:
        "Selected Tripora product visuals for stories and articles.",
    },
    {
      icon: Globe2,
      title: "Travel Images",
      description:
        "Travel-focused visuals for approved media use.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Decorative circles */}
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

            <ChevronRight size={15} />

            <span className="font-medium text-white">
              Press
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            {/* Left */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-sm">
                <Newspaper size={15} />
                TRIPORA PRESS
              </div>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Stories worth sharing.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Discover Tripora's latest announcements, brand
                stories, travel insights and media resources.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#media-contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Contact Press
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#press-kit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Press Kit
                  <Download size={16} />
                </a>
              </div>

              {/* Hero quick info */}
              <div className="mt-4 flex flex-wrap gap-5 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <Megaphone size={15} />
                  Company News
                </div>

                <div className="flex items-center gap-2">
                  <Newspaper size={15} />
                  Media Resources
                </div>

                <div className="flex items-center gap-2">
                  <Globe2 size={15} />
                  Travel Stories
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="relative overflow-hidden rounded-2xl bg-white p-6">
                  {/* Top brand row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Plane size={18} />
                      </div>

                      <span className="font-bold text-slate-900">
                        Tripora
                      </span>
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
                      PRESS
                    </span>
                  </div>

                  {/* Visual */}
                  <div className="relative mt-5 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700">
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />

                    <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-white/10" />

                    <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                      <Globe2 size={22} />
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-100">
                        Travel made simpler
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-white">
                        Explore. Plan. Travel.
                      </h2>
                    </div>

                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                      <Sparkles size={19} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-lg font-bold text-slate-900">
                        12K+
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Travellers
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-lg font-bold text-slate-900">
                        50+
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Destinations
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-lg font-bold text-slate-900">
                        500+
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Partners
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
        {/* =====================================================
            ABOUT TRIPORA
        ====================================================== */}
        <section>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            {/* Content */}
            <div>
              <p className="text-sm font-semibold text-blue-600">
                ABOUT TRIPORA
              </p>

              <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                Making travel simpler for everyone.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                Tripora is a modern travel platform designed to
                make discovering, planning and booking journeys
                simple.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                We bring flights, hotels, trains, buses, cabs and
                holiday experiences together in one easy-to-use
                platform, helping travellers spend less time
                planning and more time exploring.
              </p>

              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                Learn more about Tripora
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <Users
                    size={21}
                    className="text-blue-600"
                  />

                  <p className="mt-5 text-2xl font-bold text-slate-900">
                    12K+
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Travellers
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-5">
                  <Globe2
                    size={21}
                    className="text-indigo-600"
                  />

                  <p className="mt-5 text-2xl font-bold text-slate-900">
                    50+
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Destinations
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-5">
                  <Plane
                    size={21}
                    className="text-sky-600"
                  />

                  <p className="mt-5 text-2xl font-bold text-slate-900">
                    6
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Travel Services
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-5">
                  <Sparkles
                    size={21}
                    className="text-violet-600"
                  />

                  <p className="mt-5 text-2xl font-bold text-slate-900">
                    24/7
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            IN THE NEWS
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              IN THE NEWS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              What people are saying about Tripora.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Media stories and editorial coverage about Tripora
              and the future of travel.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mediaStories.map((story) => (
              <article
                key={story.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Publication */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                      <Newspaper size={18} />
                    </div>

                    <span className="text-xs font-bold text-slate-800">
                      {story.publication}
                    </span>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
                    {story.category}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold leading-6 text-slate-900 transition group-hover:text-blue-600">
                  {story.title}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarDays size={13} />
                    {story.date}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600"
                  >
                    Read Article
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Demo content note */}
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-center">
            <p className="text-xs text-slate-400">
              Media coverage shown above is placeholder content.
              Replace it with verified Tripora press mentions.
            </p>
          </div>
        </section>

        {/* =====================================================
            ANNOUNCEMENTS
        ====================================================== */}
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              LATEST ANNOUNCEMENTS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              The latest from Tripora.
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.title}
                className={`group grid gap-5 px-5 py-5 transition hover:bg-blue-50/50 sm:grid-cols-[65px_1fr_auto] sm:items-center ${
                  index !== announcements.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                {/* Date */}
                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <span className="text-lg font-bold leading-none">
                    {announcement.date}
                  </span>

                  <span className="mt-1 text-[9px] font-bold tracking-wider">
                    {announcement.month}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 transition group-hover:text-blue-600">
                    {announcement.title}
                  </h3>

                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
                    {announcement.description}
                  </p>
                </div>

                {/* Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 sm:justify-self-end"
                >
                  Read More
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            PRESS KIT
        ====================================================== */}
        <section id="press-kit" className="mt-4 scroll-mt-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="relative p-6 sm:p-8 lg:p-10">
              {/* Decoration */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                    <Download size={17} />
                    PRESS KIT
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Everything you need to tell the Tripora story.
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                    Access Tripora's company information, brand
                    resources, product information and approved
                    visual assets for media use.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Company Overview",
                      "Brand Assets",
                      "Product Information",
                      "Visual Resources",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Download Press Kit
                  <ArrowDownToLine size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            BRAND ASSETS
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600">
              BRAND ASSETS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Tripora media resources.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A simple collection of resources for approved media,
              editorial and brand stories.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandAssets.map((asset) => {
              const Icon = asset.icon;

              return (
                <div
                  key={asset.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <button
                      type="button"
                      aria-label={`Download ${asset.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      <Download size={16} />
                    </button>
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {asset.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {asset.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            BY THE NUMBERS
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 lg:p-10">
            <div className="mb-4 text-center">
              <p className="text-sm font-semibold text-blue-400">
                TRIPORA BY THE NUMBERS
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Growing with every journey.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Users size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-white">
                  12K+
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Travellers
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Globe2 size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-white">
                  50+
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Destinations
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Plane size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-white">
                  500+
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Travel Partners
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <Sparkles size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-white">
                  24/7
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MEDIA CONTACT
        ====================================================== */}
        <section
          id="media-contact"
          className="mt-4 scroll-mt-24"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            {/* Contact intro */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Mail size={22} />
              </div>

              <p className="mt-6 text-sm font-semibold text-blue-600">
                MEDIA CONTACT
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Working on a story about travel or Tripora?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                We would love to connect. For interviews,
                editorial questions, company information or media
                requests, reach out to our press team.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Press enquiries
                    </p>

                    <a
                      href="mailto:press@tripora.com"
                      className="mt-0.5 block text-sm font-semibold text-slate-900 hover:text-blue-600"
                    >
                      press@tripora.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      General enquiries
                    </p>

                    <a
                      href="mailto:support@tripora.com"
                      className="mt-0.5 block text-sm font-semibold text-slate-900 hover:text-blue-600"
                    >
                      support@tripora.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-3xl bg-blue-600 p-6 text-white sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Send size={22} />
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Let's talk.
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100">
                Have an interview request, partnership story or
                media enquiry? Send us a message and our team will
                get back to you.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Contact Tripora
                <ArrowRight size={16} />
              </Link>

              <div className="mt-8 border-t border-white/15 pt-6">
                <div className="flex gap-3">
                  <Quote
                    size={22}
                    className="shrink-0 text-blue-200"
                  />

                  <p className="text-sm italic leading-6 text-blue-100">
                    "We want to make every journey easier to
                    discover, plan and remember."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-11 text-center sm:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-300/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Newspaper size={22} />
              </div>

              <p className="mt-5 text-sm font-semibold text-blue-100">
                LET'S CONNECT
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Have a story to tell?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-100">
                Whether you are writing about travel,
                technology or Tripora, our team would love to hear
                from you.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Contact Press
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Press;

