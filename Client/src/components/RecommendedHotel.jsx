import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Wifi,
  Coffee,
  Car,
  Waves,
  ArrowRight,
  BedDouble,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotel } from "../redux/slicer/hotelSlice";

const ITEMS_PER_LOAD = 4;

const RecommendedHotels = () => {
  const dispatch = useDispatch();

  const {
    hotels: backendHotels = [],
    loading,
    error,
  } = useSelector((state) => state.hotel);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // ================= FETCH HOTELS =================

  useEffect(() => {
    dispatch(getAllHotel());
  }, [dispatch]);

  // ================= NORMALIZE BACKEND DATA =================

  const hotels = useMemo(() => {
    return backendHotels.map((hotel) => {
      // ---------------- IMAGE ----------------

      const hotelImage =
        hotel.image ||
        hotel.images?.[0] ||
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80";

      // ---------------- LOCATION ----------------

      const location = [
        hotel.city,
        hotel.state,
        hotel.country,
      ]
        .filter(Boolean)
        .join(", ");

      // ---------------- AMENITIES ----------------

      const amenities = Array.isArray(hotel.amenities)
        ? hotel.amenities.slice(0, 3)
        : [];

      // ---------------- RATING ----------------

      const rating =
        Number(hotel.rating || hotel.guestRating || hotel.starRating || 0);

      // ---------------- REVIEWS ----------------

      const reviews = Number(hotel.reviews || 0);

      // ---------------- PRICE ----------------

      const price = Number(
        hotel.price ||
          hotel.pricePerNight ||
          hotel.roomPrice ||
          0
      );

      // ---------------- OLD PRICE ----------------

      const oldPrice =
        hotel.oldPrice && Number(hotel.oldPrice) > price
          ? Number(hotel.oldPrice)
          : null;

      // ---------------- DISCOUNT ----------------

      let discount = null;

      if (oldPrice && price) {
        const discountPercentage = Math.round(
          ((oldPrice - price) / oldPrice) * 100
        );

        if (discountPercentage > 0) {
          discount = `${discountPercentage}% OFF`;
        }
      }

      // ---------------- BADGE ----------------

      let badge = null;

      if (hotel.isFeatured || hotel.featured) {
        badge = "Featured";
      } else if (rating >= 4.8) {
        badge = "Top Rated";
      } else if (rating >= 4.5) {
        badge = "Popular";
      }

      return {
        id: hotel._id,
        name: hotel.hotelName || hotel.name || "Hotel",
        location: location || hotel.address || "Location unavailable",
        rating,
        reviews,
        image: hotelImage,
        price,
        oldPrice,
        discount,
        amenities,
        badge,
        city: hotel.city || "",
        propertyType: hotel.propertyType || "",
        starRating: hotel.starRating || 0,
      };
    });
  }, [backendHotels]);

  // ================= RESET VISIBLE COUNT =================

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [backendHotels]);

  // ================= VISIBLE HOTELS =================

  const visibleHotels = hotels.slice(0, visibleCount);

  const hasMore = visibleCount < hotels.length;

  // ================= LOAD MORE =================

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  // ================= AMENITY ICON =================

  const getAmenityIcon = (amenity) => {
    const value = String(amenity || "").toLowerCase();

    if (
      value.includes("breakfast") ||
      value.includes("food") ||
      value.includes("restaurant")
    ) {
      return Coffee;
    }

    if (
      value.includes("parking") ||
      value.includes("car")
    ) {
      return Car;
    }

    if (
      value.includes("pool") ||
      value.includes("swimming")
    ) {
      return Waves;
    }

    return Wifi;
  };

  // ================= LOADING =================

  if (loading && backendHotels.length === 0) {
    return (
      <section className="w-full bg-slate-50 py-4 sm:py-4 lg:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header Skeleton */}

          <div className="mb-4">
            <div className="mb-2 h-8 w-48 animate-pulse rounded-full bg-slate-200" />

            <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-slate-200" />
          </div>

          {/* Hotel Skeleton */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-[230px] animate-pulse bg-slate-200" />

                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ================= ERROR =================

  if (error && backendHotels.length === 0) {
    return (
      <section className="w-full bg-slate-50 py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-8 text-center">
            <p className="text-sm font-semibold text-red-600">
              Unable to load hotels
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

  if (!loading && hotels.length === 0) {
    return (
      <section className="w-full bg-slate-50 py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-4">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
              <BedDouble size={16} />
              Stay With Comfort
            </div>

            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Recommended Hotels
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
            <BedDouble
              size={34}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No hotels available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Hotels will appear here once they are added.
            </p>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-slate-50 py-4 sm:py-4 lg:py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-1 flex flex-col gap-4 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">

          <div className="max-w-2xl">

            {/* Small Label */}

            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
              <BedDouble size={16} />
              Stay With Comfort
            </div>

            {/* Heading */}

            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Recommended Hotels
            </h2>

            {/* Description */}

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Discover highly rated hotels and resorts at great prices.
              Find the perfect stay for your next journey.
            </p>

          </div>

          {/* View All */}

          <Link
            to="/hotels"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
          >
            View All Hotels

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* ================= HOTEL GRID ================= */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {visibleHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* ================= IMAGE ================= */}

              <div className="relative h-[230px] overflow-hidden">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Gradient */}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badge */}

                {hotel.badge && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-blue-600 shadow-md">
                      {hotel.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist */}

                <button
                  type="button"
                  aria-label={`Add ${hotel.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-red-500"
                >
                  <Heart size={18} />
                </button>

                {/* Discount */}

                {hotel.discount && (
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white">
                      {hotel.discount}
                    </span>
                  </div>
                )}

              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-2">

                {/* Hotel Name */}

                <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  {hotel.name}
                </h3>

                {/* Location */}

                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">

                  <MapPin
                    size={15}
                    className="shrink-0 text-blue-500"
                  />

                  <span className="truncate">
                    {hotel.location}
                  </span>

                </div>

                {/* Rating */}

                <div className="mt-2 flex items-center gap-2">

                  {hotel.rating > 0 ? (
                    <>
                      <div className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
                        <Star
                          size={12}
                          fill="currentColor"
                        />

                        {hotel.rating}
                      </div>

                      <span className="text-xs text-slate-500">
                        {hotel.reviews} reviews
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400">
                      No ratings yet
                    </span>
                  )}

                </div>

                {/* ================= AMENITIES ================= */}

                {hotel.amenities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 border-b border-slate-100 pb-4">

                    {hotel.amenities.map((amenity, index) => {

                      const Icon = getAmenityIcon(amenity);

                      return (
                        <div
                          key={`${hotel.id}-${index}`}
                          className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1.5 text-[9px] font-medium text-slate-600"
                        >
                          <Icon size={12} />
                          {amenity}
                        </div>
                      );
                    })}

                  </div>
                )}

                {/* ================= PRICE ================= */}

                <div className="mt-2 flex items-end justify-between gap-3">

                  <div>

                    {hotel.price > 0 ? (
                      <>
                        <div className="flex items-center gap-2">

                          <span className="text-xl font-bold text-slate-900">
                            ₹{hotel.price.toLocaleString("en-IN")}
                          </span>

                          {hotel.oldPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{hotel.oldPrice.toLocaleString("en-IN")}
                            </span>
                          )}

                        </div>

                        <p className="mt-0.5 text-xs text-slate-400">
                          + taxes & fees / night
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-slate-600">
                        Price unavailable
                      </p>
                    )}

                  </div>

                  {/* View Button */}

                  <Link
                    to="/hotels"
                    className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                  >
                    View
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ================= VIEW MORE ================= */}

        {hasMore && (
          <div className="mt-5 flex justify-center">

            <button
              type="button"
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              View More Hotels

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </div>
        )}

        {/* ================= MOBILE / BOTTOM CTA ================= */}

        <div className="mt-4 flex justify-center sm:mt-4">

          <Link
            to="/hotels"
            className="group inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            Explore More Hotels

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default RecommendedHotels;