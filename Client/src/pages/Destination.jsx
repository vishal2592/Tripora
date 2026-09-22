
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Star,
  Sparkles,
  Mountain,
  Waves,
  Heart,
  Compass,
  Users,
  Crown,
} from "lucide-react";

/* =========================================================
   DESTINATION DATA
========================================================= */

const destinations = [
  {
    id: 1,
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 2450,
    tag: "Luxury",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 1980,
    tag: "Beach",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 1650,
    tag: "Honeymoon",
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 2120,
    tag: "Romantic",
  },
  {
    id: 5,
    name: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 1870,
    tag: "Family",
  },
  {
    id: 6,
    name: "Thailand",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 2030,
    tag: "Adventure",
  },
  {
    id: 7,
    name: "Vietnam",
    country: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 1420,
    tag: "Culture",
  },
  {
    id: 8,
    name: "Switzerland",
    country: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 1760,
    tag: "Mountains",
  },
];

const indiaDestinations = [
  {
    id: 1,
    name: "Kashmir",
    state: "Jammu & Kashmir",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 1850,
  },
  {
    id: 2,
    name: "Goa",
    state: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 2210,
  },
  {
    id: 3,
    name: "Kerala",
    state: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 1690,
  },
  {
    id: 4,
    name: "Manali",
    state: "Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 1540,
  },
  {
    id: 5,
    name: "Jaipur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 1230,
  },
  {
    id: 6,
    name: "Andaman",
    state: "Andaman & Nicobar",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 980,
  },
];

const regions = [
  {
    name: "Middle East",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    count: "12 Destinations",
  },
  {
    name: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80",
    count: "18 Destinations",
  },
  {
    name: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    count: "25 Destinations",
  },
  {
    name: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    count: "10 Destinations",
  },
];

const experiences = [
  {
    name: "Beach",
    description: "Relax on beautiful beaches",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mountains",
    description: "Escape into the mountains",
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Honeymoon",
    description: "Create romantic memories",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Adventure",
    description: "Discover thrilling experiences",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Family",
    description: "Memories for everyone",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Luxury",
    description: "Travel in ultimate comfort",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
];

const beachDestinations = [
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Thailand",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
  },
];

const inspiration = [
  {
    title: "Best places to visit this year",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Top honeymoon destinations",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Best family holiday destinations",
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1000&q=80",
  },
];

/* =========================================================
   HELPER
========================================================= */

const createDestinationSlug = (destination) => {
  return destination
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

/* =========================================================
   MAIN DESTINATION PAGE
========================================================= */

function Destination() {
  const navigate = useNavigate();

  /*
    IMPORTANT:
    Previously this function was sending users directly
    to the packages page.

    Now every actual destination goes to:
    /destination/:slug
  */

  const handleExplore = (destination) => {
    const slug = createDestinationSlug(destination);

    navigate(`/destination/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
              <Sparkles size={14} />
              Explore the World
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Discover Your Next Destination
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore amazing destinations, discover unique experiences and
              plan your perfect trip with Tripora.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================================================
            POPULAR DESTINATIONS
        ==================================================== */}

        <section>
          <SectionHeading
            eyebrow="Popular destinations"
            title="Places travelers love"
            description="Discover some of the most popular destinations around the world."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onExplore={handleExplore}
              />
            ))}
          </div>
        </section>

        {/* ===================================================
            TRENDING DESTINATIONS
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Trending now"
            title="Where everyone is going"
            description="Get inspired by destinations trending among Tripora travelers."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 4).map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onExplore={handleExplore}
                trending
              />
            ))}
          </div>
        </section>

        {/* ===================================================
            INTERNATIONAL DESTINATIONS
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="International travel"
            title="Explore the world"
            description="From tropical beaches to modern cities, find your perfect international escape."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((destination) => (
              <InternationalCard
                key={destination.id}
                destination={destination}
                onExplore={handleExplore}
              />
            ))}
          </div>
        </section>

        {/* ===================================================
            EXPLORE INDIA
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Explore India"
            title="Beautiful places in India"
            description="Discover mountains, beaches, heritage cities and peaceful escapes across India."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {indiaDestinations.map((destination) => (
              <button
                key={destination.id}
                type="button"
                onClick={() => handleExplore(destination.name)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black text-white">
                          {destination.name}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-white/80">
                          <MapPin size={12} />
                          {destination.state}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800">
                        <Star
                          size={12}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Explore {destination.name}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      {destination.reviews.toLocaleString()} reviews
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ===================================================
            REGIONS
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Travel by region"
            title="Explore by region"
            description="Choose a region and start planning your next adventure."
          />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {regions.map((region) => (
              <Link
                key={region.name}
                to="/packages"
                className="group relative h-48 overflow-hidden rounded-2xl"
              >
                <img
                  src={region.image}
                  alt={region.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-black text-white">
                    {region.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/75">
                    {region.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================================================
            TRAVEL EXPERIENCES
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Travel your way"
            title="Explore by travel experience"
            description="Find a holiday style that matches your mood."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {experiences.map((experience) => {
              const Icon = experience.icon;

              return (
                <Link
                  key={experience.name}
                  to="/packages"
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/25" />

                    <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-blue-600">
                      <Icon size={16} />
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-black text-slate-900">
                      {experience.name}
                    </h3>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      {experience.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            BEACH DESTINATIONS
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Beach escapes"
            title="Best beach destinations"
            description="Sun, sand and unforgettable coastal experiences."
          />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {beachDestinations.map((destination) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => handleExplore(destination.name)}
                className="group relative h-64 overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">
                    {destination.name}
                  </h3>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ===================================================
            DESTINATION SPOTLIGHT
        ==================================================== */}

        <section className="mt-4 overflow-hidden rounded-3xl bg-slate-900">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85"
                alt="Bali"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-600">
                Destination Spotlight
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                This month's pick
              </p>

              <h2 className="mt-2 text-3xl font-black text-white">
                Discover Bali
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Discover tropical beaches, peaceful temples, beautiful rice
                terraces and unforgettable experiences in one of Asia's most
                loved destinations.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  Beaches
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  Adventure
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  Honeymoon
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleExplore("Bali")}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Explore Bali
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            INSPIRATION
        ==================================================== */}

        <section className="mt-4">
          <SectionHeading
            eyebrow="Travel inspiration"
            title="Get inspired for your next trip"
            description="Ideas and inspiration to help you plan your perfect holiday."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {inspiration.map((item) => (
              <Link
                key={item.title}
                to="/packages"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <h3 className="text-sm font-black leading-5 text-slate-900">
                    {item.title}
                  </h3>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

        <section className="mt-4 rounded-3xl bg-blue-600 px-6 py-4 text-center sm:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Sparkles size={23} />
            </div>

            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
              Ready to explore the world?
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Find flights, hotels and holiday packages for your next
              adventure with Tripora.
            </p>

            <Link
              to="/packages"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Packages
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DESTINATION CARD
========================================================= */

function DestinationCard({ destination, onExplore, trending = false }) {
  return (
    <button
      type="button"
      onClick={() => onExplore(destination.name)}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {trending && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-blue-600">
            Trending
          </span>
        )}

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800">
          <Star
            size={12}
            className="text-amber-500"
            fill="currentColor"
          />
          {destination.rating}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white">
            {destination.name}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
            <MapPin size={12} />
            {destination.country}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-bold text-slate-900">
            {destination.tag}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {destination.reviews.toLocaleString()} reviews
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   INTERNATIONAL CARD
========================================================= */

function InternationalCard({ destination, onExplore }) {
  return (
    <button
      type="button"
      onClick={() => onExplore(destination.name)}
      className="group relative h-72 overflow-hidden rounded-2xl text-left"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-white">
              {destination.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
              <MapPin size={12} />
              {destination.country}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </button>
  );
}

export default Destination;


