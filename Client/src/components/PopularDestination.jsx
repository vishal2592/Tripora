import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Plane,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestination } from "../redux/slicer/destinationSlice";
import { Link } from "react-router-dom";

const ITEMS_PER_LOAD = 4;

const PopularDestinations = () => {
  const dispatch = useDispatch();

  const {
    destinations: backendDestinations = [],
    loading,
    error,
  } = useSelector((state) => state.destination);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // ================= FETCH DESTINATIONS =================

  useEffect(() => {
    dispatch(getAllDestination());
  }, [dispatch]);

  // ================= NORMALIZE BACKEND DATA =================

  const destinations = useMemo(() => {
    return backendDestinations
      .filter((destination) => {
        // Only show active destinations
        if (destination.status === undefined) return true;

        return (
          destination.status === true ||
          destination.status === "active" ||
          destination.status === "Active"
        );
      })
      .map((destination) => ({
        id: destination._id,
        name: destination.name || "Unknown Destination",
        country: destination.country || "Unknown",
        image:
          destination.image ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",

        // Backend may contain different price-related fields
        price:
          destination.price ||
          destination.startingPrice ||
          destination.priceFrom ||
          null,

        duration:
          destination.duration ||
          destination.packageDuration ||
          null,

        featured: Boolean(destination.isPopular),

        rating: destination.rating || 0,
        description: destination.description || "",
        region: destination.region || "",
        destinationType: destination.destinationType || "",
      }));
  }, [backendDestinations]);

  // ================= RESET LOAD MORE =================

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [backendDestinations]);

  // ================= VISIBLE DESTINATIONS =================

  const visibleDestinations = destinations.slice(0, visibleCount);

  const hasMore = visibleCount < destinations.length;

  const featuredDestination =
    visibleDestinations.find((destination) => destination.featured) ||
    visibleDestinations[0];

  const smallDestinations = visibleDestinations.filter(
    (destination) => destination.id !== featuredDestination?.id
  );

  // ================= LOAD MORE =================

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  // ================= LOADING =================

  if (loading && backendDestinations.length === 0) {
    return (
      <section className="bg-white py-6 sm:py-6 lg:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="h-[390px] animate-pulse rounded-3xl bg-slate-100 lg:col-span-6" />

            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[188px] animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= ERROR =================

  if (error && backendDestinations.length === 0) {
    return (
      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-6 text-center">
            <p className="text-sm font-semibold text-red-600">
              Unable to load destinations
            </p>

            <p className="mt-1 text-xs text-red-500">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ================= EMPTY =================

  if (!loading && destinations.length === 0) {
    return (
      <section className="bg-white py-6 sm:py-6 lg:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
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
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-10 text-center">
            <MapPin className="mx-auto text-slate-300" size={30} />

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No destinations available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Destinations will appear here once they are added.
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        <Link to='/destinations'>
            <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex"
          >
            View all
            <ArrowRight size={15} />
          </button>
        </Link>
         </div>

        {/* ================= DESTINATION GRID ================= */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* ================= FEATURED DESTINATION ================= */}

          {featuredDestination && (
            <div className="group relative overflow-hidden rounded-3xl lg:col-span-6">
              <div className="relative h-[360px] sm:h-[400px] lg:h-[390px]">

                <img
                  src={featuredDestination.image}
                  alt={featuredDestination.name}
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
                          {featuredDestination.country}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-white sm:text-4xl">
                        {featuredDestination.name}
                      </h3>

                      {featuredDestination.duration && (
                        <p className="mt-1 text-xs text-white/70">
                          {featuredDestination.duration}
                        </p>
                      )}
                    </div>

                    {featuredDestination.price && (
                      <div className="text-right">
                        <p className="text-[10px] text-white/60">
                          Starting from
                        </p>

                        <p className="text-lg font-bold text-white">
                          {featuredDestination.price}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Explore button */}

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 opacity-100 transition hover:bg-blue-600 hover:text-white lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                  >
                    Explore {featuredDestination.name}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SMALL DESTINATIONS ================= */}

          <div className="grid grid-cols-2 gap-4 lg:col-span-6">

            {smallDestinations.map((destination) => (
              <div
                key={destination.id}
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

                        {destination.duration && (
                          <p className="text-[10px] text-white/65">
                            {destination.duration}
                          </p>
                        )}
                      </div>

                      {destination.price && (
                        <div className="text-right">
                          <p className="text-[9px] text-white/60">
                            From
                          </p>

                          <p className="text-xs font-bold text-white">
                            {destination.price}
                          </p>
                        </div>
                      )}
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

        {/* ================= LOAD MORE ================= */}

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Load More
              <ArrowRight size={14} />
            </button>
          </div>
        )}

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