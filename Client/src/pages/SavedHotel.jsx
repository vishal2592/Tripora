
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  getAllSavedHotel,
  removeSavedHotel,
} from "../redux/slicer/savedHotelSlice";

const SavedHotels = () => {
  const dispatch = useDispatch();

  const {
    savedData = [],
    loading,
    error,
  } = useSelector((state) => state.saved);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showSort, setShowSort] = useState(false);

  // ================= FETCH SAVED HOTELS =================

  useEffect(() => {
    dispatch(getAllSavedHotel());
  }, [dispatch]);

  // ================= FILTER + SORT =================

  const filteredHotels = useMemo(() => {
    let hotels = [...savedData];

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      hotels = hotels.filter((item) => {
        const name = item.hotelDetails?.name?.toLowerCase() || "";
        const location =
          item.hotelDetails?.location?.toLowerCase() || "";

        return (
          name.includes(searchValue) ||
          location.includes(searchValue)
        );
      });
    }

    // Sort
    if (sortBy === "priceLow") {
      hotels.sort(
        (a, b) =>
          (a.hotelDetails?.price || 0) -
          (b.hotelDetails?.price || 0)
      );
    }

    if (sortBy === "priceHigh") {
      hotels.sort(
        (a, b) =>
          (b.hotelDetails?.price || 0) -
          (a.hotelDetails?.price || 0)
      );
    }

    if (sortBy === "rating") {
      hotels.sort(
        (a, b) =>
          (b.hotelDetails?.rating || 0) -
          (a.hotelDetails?.rating || 0)
      );
    }

    if (sortBy === "recent") {
      hotels.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return hotels;
  }, [savedData, search, sortBy]);

  // ================= REMOVE HOTEL =================

  const handleRemove = async (hotelId) => {
    if (!hotelId) return;

    const result = await dispatch(removeSavedHotel(hotelId));

    if (removeSavedHotel.fulfilled.match(result)) {
      toast.success("Hotel removed from saved hotels");
    } else {
      toast.error(
        result.payload || "Failed to remove hotel"
      );
    }
  };

  // ================= SORT LABEL =================

  const getSortLabel = () => {
    switch (sortBy) {
      case "priceLow":
        return "Price: Low to High";

      case "priceHigh":
        return "Price: High to Low";

      case "rating":
        return "Highest Rated";

      default:
        return "Recently Saved";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO / HEADER ================= */}

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 md:py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-slate-800 font-medium">
                Saved Hotels
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                  <Heart size={15} fill="currentColor" />
                  Your Favorites
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  Saved Hotels
                </h1>

                <p className="mt-3 text-slate-500 max-w-2xl text-sm sm:text-base">
                  Keep your favorite stays in one place and
                  find them whenever you are ready to travel.
                </p>
              </div>

              {/* Count */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <BedDouble size={22} />
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900 leading-none">
                    {savedData.length}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Saved Hotels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-6">
        {/* ================= SEARCH + SORT ================= */}

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved hotels or locations..."
              className="w-full h-14 pl-11 pr-11 bg-white border border-slate-200 rounded-xl outline-none text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative lg:w-64">
            <button
              type="button"
              onClick={() => setShowSort((prev) => !prev)}
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-sm hover:border-blue-300 transition"
            >
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal
                  size={18}
                  className="text-slate-500"
                />

                <span className="text-slate-700">
                  {getSortLabel()}
                </span>
              </div>

              <ChevronDown
                size={17}
                className={`text-slate-400 transition-transform ${
                  showSort ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSort && (
              <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                {[
                  {
                    value: "recent",
                    label: "Recently Saved",
                  },
                  {
                    value: "priceLow",
                    label: "Price: Low to High",
                  },
                  {
                    value: "priceHigh",
                    label: "Price: High to Low",
                  },
                  {
                    value: "rating",
                    label: "Highest Rated",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition ${
                      sortBy === option.value
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= RESULT HEADER ================= */}

        {!loading && !error && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                {search
                  ? `${filteredHotels.length} hotels found`
                  : `${savedData.length} Saved Hotels`}
              </h2>

              {search && (
                <p className="text-sm text-slate-500 mt-1">
                  Results for "{search}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-slate-200" />

                <div className="p-5 space-y-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-1/3" />

                  <div className="flex justify-between pt-3">
                    <div className="h-8 bg-slate-200 rounded w-24" />
                    <div className="h-8 bg-slate-200 rounded w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="min-h-[350px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-5">
                <X size={28} />
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                Unable to load saved hotels
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {error}
              </p>

              <button
                type="button"
                onClick={() => dispatch(getAllSavedHotel())}
                className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}

        {!loading &&
          !error &&
          savedData.length === 0 && (
            <div className="min-h-[430px] bg-white border border-slate-200 rounded-3xl flex items-center justify-center px-5">
              <div className="text-center max-w-md">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-50" />

                  <div className="relative w-full h-full flex items-center justify-center text-blue-500">
                    <Heart size={34} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  No Saved Hotels Yet
                </h2>

                <p className="mt-3 text-sm sm:text-base text-slate-500 leading-6">
                  Save the hotels you love while exploring
                  Tripora. They will appear here for easy
                  access later.
                </p>

                <Link
                  to="/hotels"
                  className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
                >
                  Explore Hotels
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          )}

        {/* ================= NO SEARCH RESULT ================= */}

        {!loading &&
          !error &&
          savedData.length > 0 &&
          filteredHotels.length === 0 && (
            <div className="min-h-[350px] bg-white border border-slate-200 rounded-3xl flex items-center justify-center px-5">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-5">
                  <Search size={28} />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  No hotels found
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  We couldn't find any saved hotel matching
                  your search.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

        {/* ================= HOTEL GRID ================= */}

        {!loading &&
          !error &&
          filteredHotels.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map((savedHotel) => {
                const hotel = savedHotel.hotelDetails || {};

                const hotelId = savedHotel.hotel;

                return (
                  <article
                    key={savedHotel._id}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
                  >
                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      {hotel.image ? (
                        <img
                          src={hotel.image}
                          alt={hotel.name || "Hotel"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                          <BedDouble size={46} />
                        </div>
                      )}

                      {/* Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                      {/* Saved Badge */}

                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-semibold shadow-sm">
                          <Heart
                            size={13}
                            fill="currentColor"
                          />
                          Saved
                        </span>
                      </div>

                      {/* Remove */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(hotelId)
                        }
                        disabled={loading}
                        aria-label="Remove saved hotel"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm text-red-500 flex items-center justify-center shadow-md hover:bg-red-50 transition disabled:opacity-50"
                      >
                        <Heart
                          size={19}
                          fill="currentColor"
                        />
                      </button>
                    </div>

                    {/* CONTENT */}

                    <div className="p-5">
                      {/* Name */}

                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                          {hotel.name || "Unnamed Hotel"}
                        </h3>

                        {/* Rating */}

                        {hotel.rating > 0 && (
                          <div className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-600">
                            <Star
                              size={13}
                              fill="currentColor"
                            />

                            <span className="text-xs font-semibold">
                              {Number(hotel.rating).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Location */}

                      {hotel.location && (
                        <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                          <MapPin
                            size={15}
                            className="shrink-0"
                          />

                          <span className="text-sm truncate">
                            {hotel.location}
                          </span>
                        </div>
                      )}

                      {/* Divider */}

                      <div className="border-t border-slate-100 my-4" />

                      {/* Bottom */}

                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">
                            Starting from
                          </p>

                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-slate-900">
                              ₹
                              {Number(
                                hotel.price || 0
                              ).toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-slate-500">
                              / night
                            </span>
                          </div>
                        </div>

                        {/* View */}

                        <Link
                          to={`/hoteldetails/${hotelId}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-md shadow-blue-600/10"
                        >
                          View Hotel
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
      </main>
    </div>
  );
};

export default SavedHotels;


