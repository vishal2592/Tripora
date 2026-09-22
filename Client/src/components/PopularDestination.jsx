import React from "react";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Plane,
} from "lucide-react";

const destinations = [
  {
    name: "Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",
    price: "₹8,999",
    duration: "3N / 4D",
    featured: true,
  },
  {
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    price: "₹29,999",
    duration: "4N / 5D",
  },
  {
    name: "Manali",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
    price: "₹10,999",
    duration: "4N / 5D",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    price: "₹32,999",
    duration: "5N / 6D",
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    price: "₹59,999",
    duration: "5N / 6D",
  },
];

const PopularDestinations = () => {
  return (
    <section className="bg-white py-6 sm:py-6 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Sparkles size={14} />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                Explore the world
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[32px]">
              Popular Destinations
            </h2>

            <p className="mt-1.5 max-w-xl text-sm text-slate-500">
              Discover breathtaking places, unforgettable experiences and
              amazing travel deals.
            </p>
          </div>

          {/* Desktop View All */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex"
          >
            View all
            <ArrowRight size={15} />
          </button>
        </div>

        {/* ================= DESTINATION GRID ================= */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* ================= FEATURED DESTINATION ================= */}
          <div className="group relative overflow-hidden rounded-3xl lg:col-span-6">
            <div className="relative h-[360px] sm:h-[400px] lg:h-[390px]">
              <img
                src={destinations[0].image}
                alt={destinations[0].name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Featured Badge */}
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-blue-600 shadow-sm backdrop-blur">
                  <Sparkles size={12} />
                  Popular choice
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-1.5 text-white/80">
                      <MapPin size={13} />
                      <span className="text-xs font-medium">
                        {destinations[0].country}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white sm:text-4xl">
                      {destinations[0].name}
                    </h3>

                    <p className="mt-1 text-xs text-white/70">
                      {destinations[0].duration}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-white/60">
                      Starting from
                    </p>

                    <p className="text-lg font-bold text-white">
                      {destinations[0].price}
                    </p>
                  </div>
                </div>

                {/* Explore button */}
                <button
                  type="button"
                  className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 opacity-100 transition hover:bg-blue-600 hover:text-white lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                >
                  Explore Goa
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= SMALL DESTINATIONS ================= */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">

            {destinations.slice(1).map((destination) => (
              <div
                key={destination.name}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-[188px] sm:h-[210px] lg:h-[188px]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Location */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-end justify-between gap-2">

                      <div>
                        <div className="flex items-center gap-1 text-white/75">
                          <MapPin size={11} />
                          <span className="text-[10px]">
                            {destination.country}
                          </span>
                        </div>

                        <h3 className="mt-0.5 text-base font-bold text-white">
                          {destination.name}
                        </h3>

                        <p className="text-[10px] text-white/65">
                          {destination.duration}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] text-white/60">
                          From
                        </p>

                        <p className="text-xs font-bold text-white">
                          {destination.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Explore */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-900 shadow-lg">
                      Explore
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ================= BOTTOM INFO ================= */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <Plane size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Planning your next adventure?
              </p>

              <p className="text-[11px] text-slate-500">
                Find flights, hotels and holiday packages at the best prices.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Start Exploring
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;