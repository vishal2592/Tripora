
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Plane,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================
  // BLOG DATA
  // =========================================================
  const articles = [
    {
      id: 1,
      title: "10 Beautiful Places You Must Visit in India",
      slug: "beautiful-places-to-visit-in-india",
      category: "Destinations",
      description:
        "Discover stunning mountains, peaceful beaches, vibrant cities and hidden gems across India.",
      date: "Sep 10, 2026",
      readTime: "8 min read",
      location: "India",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85",
      featured: true,
    },
    {
      id: 2,
      title: "How to Find Cheaper Flights for Your Next Trip",
      slug: "how-to-find-cheaper-flights",
      category: "Flights",
      description:
        "Learn simple strategies that can help you find better flight prices and plan your journey smarter.",
      date: "Sep 08, 2026",
      readTime: "6 min read",
      location: "Worldwide",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Planning Your First International Trip",
      slug: "first-international-trip-guide",
      category: "Travel Tips",
      description:
        "Everything you should know before travelling internationally for the first time.",
      date: "Sep 06, 2026",
      readTime: "9 min read",
      location: "Worldwide",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 4,
      title: "Best Weekend Getaways From Delhi",
      slug: "best-weekend-getaways-from-delhi",
      category: "Destinations",
      description:
        "Planning a short escape? Here are some amazing weekend destinations you can explore from Delhi.",
      date: "Sep 04, 2026",
      readTime: "7 min read",
      location: "India",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 5,
      title: "Best Time to Visit Dubai: A Complete Guide",
      slug: "best-time-to-visit-dubai",
      category: "Destinations",
      description:
        "Find the best season, weather, activities and travel tips for your Dubai holiday.",
      date: "Sep 02, 2026",
      readTime: "6 min read",
      location: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 6,
      title: "Travel Essentials You Should Never Forget",
      slug: "travel-essentials-you-should-never-forget",
      category: "Travel Tips",
      description:
        "Use this simple travel checklist before leaving for your next adventure.",
      date: "Aug 30, 2026",
      readTime: "5 min read",
      location: "Worldwide",
      image:
        "https://images.unsplash.com/photo-1553531889-56a9d8c4a1e1?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 7,
      title: "A Food Lover's Guide to Thailand",
      slug: "food-lovers-guide-to-thailand",
      category: "Food & Culture",
      description:
        "Explore the flavours, street food and cultural experiences that make Thailand special.",
      date: "Aug 28, 2026",
      readTime: "7 min read",
      location: "Thailand",
      image:
        "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 8,
      title: "Bali Travel Guide: Beaches, Culture & Experiences",
      slug: "bali-travel-guide",
      category: "Holiday Ideas",
      description:
        "From beautiful beaches to cultural experiences, discover what makes Bali a perfect getaway.",
      date: "Aug 25, 2026",
      readTime: "8 min read",
      location: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 9,
      title: "How to Pack Smart for a Long Holiday",
      slug: "how-to-pack-smart-for-a-long-holiday",
      category: "Travel Tips",
      description:
        "Pack lighter and travel better with these practical tips for your next long holiday.",
      date: "Aug 22, 2026",
      readTime: "5 min read",
      location: "Worldwide",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    },
  ];

  const categories = [
    "All",
    "Destinations",
    "Travel Tips",
    "Flights",
    "Hotels",
    "Food & Culture",
    "Holiday Ideas",
  ];

  const destinations = [
    {
      name: "India",
      stories: "24 Stories",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Dubai",
      stories: "18 Stories",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Bali",
      stories: "15 Stories",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Thailand",
      stories: "12 Stories",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Paris",
      stories: "10 Stories",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Singapore",
      stories: "9 Stories",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=85",
    },
  ];

  const trendingStories = [
    "Best weekend destinations from Delhi",
    "How to plan your first international trip",
    "Best beaches to visit in India",
    "Travel essentials you should never forget",
    "Best time to visit Dubai",
  ];

  // =========================================================
  // FILTER ARTICLES
  // =========================================================
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" ||
        article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = articles.find(
    (article) => article.featured
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Background decoration */}
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
              Blog
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_410px]">
            {/* Hero content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-sm">
                <Sparkles size={15} />
                TRIPORA TRAVEL STORIES
              </div>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Travel ideas for your next journey.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Discover destination guides, travel tips, hidden
                gems and inspiration for your next adventure.
              </p>

              {/* Search */}
              <div className="mt-7 flex max-w-xl items-center rounded-2xl bg-white p-1.5 shadow-xl">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                  <Search
                    size={18}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search travel stories..."
                    className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Search
                </button>
              </div>

              {/* Quick stats */}
              <div className="mt-6 flex flex-wrap gap-5 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <Globe2 size={15} />
                  50+ Destinations
                </div>

                <div className="flex items-center gap-2">
                  <Plane size={15} />
                  Travel Inspiration
                </div>

                <div className="flex items-center gap-2">
                  <Star size={15} />
                  Expert Tips
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="relative h-[220px] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85"
                    alt="Travel destination"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                      Travel inspiration
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      Your next adventure is waiting.
                    </h2>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <div>
                    <p className="text-lg font-bold text-white">
                      100+
                    </p>
                    <p className="text-[11px] text-blue-100">
                      Travel Stories
                    </p>
                  </div>

                  <div className="h-8 w-px bg-white/15" />

                  <div>
                    <p className="text-lg font-bold text-white">
                      50+
                    </p>
                    <p className="text-[11px] text-blue-100">
                      Destinations
                    </p>
                  </div>

                  <div className="h-8 w-px bg-white/15" />

                  <div>
                    <p className="text-lg font-bold text-white">
                      24/7
                    </p>
                    <p className="text-[11px] text-blue-100">
                      Inspiration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
        {/* =====================================================
            FEATURED STORY
        ====================================================== */}
        {featuredArticle && (
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  FEATURED STORY
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Start with inspiration
                </h2>
              </div>

              <Link
                to={`/blog/${featuredArticle.slug}`}
                className="hidden items-center gap-1 text-sm font-semibold text-blue-600 sm:flex"
              >
                Read Story
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Image */}
                <div className="relative min-h-[300px] overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
                    {featuredArticle.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {featuredArticle.date}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                      {featuredArticle.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {featuredArticle.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={14} className="text-blue-600" />
                      {featuredArticle.location}
                    </div>

                    <Link
                      to={`/blog/${featuredArticle.slug}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Read Story
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            CATEGORY FILTER
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-blue-600">
              EXPLORE STORIES
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Browse by category
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* =====================================================
            LATEST STORIES
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                LATEST STORIES
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Fresh travel inspiration
              </h2>
            </div>

            <span className="hidden text-sm text-slate-500 sm:block">
              {filteredArticles.length} stories
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles
                .filter((article) => !article.featured)
                .map((article) => (
                  <article
                    key={article.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Image */}
                    <Link
                      to={`/blog/${article.slug}`}
                      className="relative block h-52 overflow-hidden"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-blue-700 shadow-sm">
                        {article.category}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          {article.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-6 text-slate-900 transition group-hover:text-blue-600">
                        {article.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {article.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin
                            size={13}
                            className="text-blue-500"
                          />
                          {article.location}
                        </span>

                        <Link
                          to={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600"
                        >
                          Read Story
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Search size={22} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No stories found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                View All Stories
              </button>
            </div>
          )}
        </section>

        {/* =====================================================
            DESTINATIONS
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                DESTINATION STORIES
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Inspiration by destination
              </h2>
            </div>

            <Link
              to="/destinations"
              className="hidden items-center gap-1 text-sm font-semibold text-blue-600 sm:flex"
            >
              Explore Destinations
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                to="/destinations"
                className="group relative h-44 overflow-hidden rounded-2xl"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white">
                    {destination.name}
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-200">
                    {destination.stories}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =====================================================
            TRAVEL SMARTER
        ====================================================== */}
        <section className="mt-4">
          <div className="overflow-hidden rounded-3xl bg-blue-50">
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <Sparkles size={16} />
                  TRAVEL SMARTER
                </div>

                <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Simple tips for better journeys.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Make every trip easier with practical travel
                  advice, planning tips and destination insights.
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {[
                    "How to find cheaper flights",
                    "What to pack for your trip",
                    "Best time to visit popular destinations",
                    "How to plan a budget-friendly holiday",
                  ].map((tip) => (
                    <Link
                      key={tip}
                      to="/blog"
                      className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {tip}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Travel Tips
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            TRENDING STORIES
        ====================================================== */}
        <section className="mt-4">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-blue-600">
                TRENDING NOW
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Stories travellers are reading.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Discover popular guides and useful ideas that
                can help you plan your next trip.
              </p>

              <Link
                to="/blog"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                Explore all stories
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trending list */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {trendingStories.map((story, index) => (
                <Link
                  key={story}
                  to="/blog"
                  className={`group flex items-center gap-4 px-5 py-4 transition hover:bg-blue-50 ${
                    index !== trendingStories.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-800 transition group-hover:text-blue-600">
                      {story}
                    </span>

                    <span className="mt-1 block text-xs text-slate-400">
                      Travel Guide
                    </span>
                  </span>

                  <ArrowRight
                    size={16}
                    className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            NEWSLETTER
        ====================================================== */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-10 sm:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-300/10 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_480px]">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                  <Mail size={17} />
                  TRIPORA TRAVEL LETTER
                </div>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Never miss a journey.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100">
                  Get destination inspiration, travel guides,
                  useful tips and exclusive travel ideas directly
                  in your inbox.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-2xl bg-white p-2 shadow-xl"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                    <Mail
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Plane size={22} />
            </div>

            <p className="mt-5 text-sm font-semibold text-blue-600">
              READY TO EXPLORE?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Your next journey starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Turn your travel inspiration into reality. Discover
              destinations, compare options and plan your perfect
              trip with Tripora.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Destinations
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;

