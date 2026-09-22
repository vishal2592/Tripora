
import React from "react";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

const TravelInspiration = () => {
  const articles = [
    {
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85",
      category: "DESTINATION GUIDE",
      title: "10 Beautiful Places in India You Must Visit",
      description:
        "Discover breathtaking destinations, hidden gems and unforgettable experiences across India.",
      location: "India",
      readTime: "6 min read",
      featured: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
      category: "TRAVEL TIPS",
      title: "How to Plan the Perfect Weekend Getaway",
      location: "Travel Guide",
      readTime: "4 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85",
      category: "NATURE",
      title: "Escape to Nature: Peaceful Places to Explore",
      location: "Nature & Wildlife",
      readTime: "5 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
      category: "ADVENTURE",
      title: "Adventure Experiences for Your Next Trip",
      location: "Adventure",
      readTime: "7 min read",
    },
  ];

  return (
    <section className="w-full bg-white py-4 sm:py-4 lg:py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-600">
              TRAVEL INSPIRATION
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Get inspired for your
              <span className="block text-blue-600">
                next adventure.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover travel stories, destination guides, useful tips and
              ideas to help you plan a journey worth remembering.
            </p>
          </div>

          {/* View all */}
          <button
            type="button"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600"
          >
            View all inspiration

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* =====================================================
            FEATURED ARTICLE
        ===================================================== */}
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

          {/* Featured */}
          <article className="group relative min-h-[440px] overflow-hidden rounded-[2rem] bg-slate-900 sm:min-h-[520px]">

            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">

              <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white backdrop-blur-md">
                {articles[0].category}
              </span>

              <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {articles[0].title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                {articles[0].description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-medium text-white/80">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {articles[0].location}
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {articles[0].readTime}
                </div>
              </div>

              <button
                type="button"
                className="group/btn mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Read story

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </article>

          {/* =====================================================
              SMALL ARTICLES
          ===================================================== */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

            {articles.slice(1).map((article, index) => (
              <article
                key={index}
                className="group flex overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60"
              >
                {/* Image */}
                <div className="relative h-40 w-[42%] shrink-0 overflow-hidden sm:h-44 lg:h-auto lg:w-40">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">

                  <span className="text-[10px] font-bold tracking-wider text-blue-600">
                    {article.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-base font-bold leading-5 text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg sm:leading-6">
                    {article.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {article.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>

        {/* =====================================================
            TOPIC TAGS
        ===================================================== */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="mr-1 text-sm font-semibold text-slate-700">
            Explore:
          </span>

          {[
            "Beach Escapes",
            "Mountain Trips",
            "Family Travel",
            "Honeymoon",
            "Budget Travel",
            "Adventure",
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TravelInspiration;

