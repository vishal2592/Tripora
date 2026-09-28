import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  CreditCard,
  Info,
  MapPin,
  ParkingCircle,
  ShieldCheck,
  Star,
  Users,
  Utensils,
  Wifi,
  Waves,
  Car,
  Dumbbell,
  X,
} from "lucide-react";

import { getHotelById } from "../redux/slicer/hotelSlice";

const HotelDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* =========================================================
     FETCH ACTUAL HOTEL BY ID
  ========================================================= */

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) {
        setError("Hotel ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setHotel(null);
        setSelectedImage(0);

        console.log("Fetching hotel with ID:", id);

        const response = await dispatch(getHotelById(id)).unwrap();

        console.log("Actual hotel API response:", response);

        /*
          Expected backend response:

          {
            success: true,
            hotel: {
              _id: "...",
              hotelName: "...",
              image: "...",
              images: [...]
            }
          }
        */

        const hotelData = response?.hotel;

        if (!hotelData) {
          throw new Error(
            response?.message || "Hotel details not found."
          );
        }

        if (!hotelData._id) {
          throw new Error("Invalid hotel data received from server.");
        }

        console.log("Actual hotel data:", hotelData);

        setHotel(hotelData);
      } catch (err) {
        console.error("Get hotel detail error:", err);

        const message =
          err?.message ||
          err?.payload?.message ||
          err?.response?.data?.message ||
          "Failed to load hotel details.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [dispatch, id]);

  /* =========================================================
     ACTUAL HOTEL IMAGES
  ========================================================= */

  const hotelImages = useMemo(() => {
    if (!hotel) return [];

    const images = [];

    if (hotel.image) {
      images.push(hotel.image);
    }

    if (Array.isArray(hotel.images)) {
      images.push(...hotel.images);
    }

    return [...new Set(images)].filter(Boolean);
  }, [hotel]);

  /* =========================================================
     AMENITIES
  ========================================================= */

  const amenities = useMemo(() => {
    if (!hotel) return [];

    if (!Array.isArray(hotel.amenities)) {
      return [];
    }

    return hotel.amenities.filter(Boolean);
  }, [hotel]);

  /* =========================================================
     ACTUAL HOTEL DATA
  ========================================================= */

  const hotelName = hotel?.hotelName || "";
  const propertyType = hotel?.propertyType || "";

  const location = [
    hotel?.address,
    hotel?.city,
    hotel?.state,
    hotel?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const rating =
    hotel?.rating !== undefined && hotel?.rating !== null
      ? Number(hotel.rating)
      : 0;

  const reviews =
    hotel?.reviews !== undefined && hotel?.reviews !== null
      ? Number(hotel.reviews)
      : 0;

  const stars =
    hotel?.starRating !== undefined && hotel?.starRating !== null
      ? Number(hotel.starRating)
      : 0;

  const price =
    hotel?.price !== undefined && hotel?.price !== null
      ? Number(hotel.price)
      : 0;

  const description = hotel?.description || "";

  const checkIn = hotel?.checkIn || "";
  const checkOut = hotel?.checkOut || "";

  const rooms =
    hotel?.rooms !== undefined && hotel?.rooms !== null
      ? Number(hotel.rooms)
      : 0;

  const city = hotel?.city || "";
  const state = hotel?.state || "";
  const country = hotel?.country || "";

  /* =========================================================
     IMAGE HANDLERS
  ========================================================= */

  const nextImage = () => {
    if (!hotelImages.length) return;

    setSelectedImage((current) =>
      current === hotelImages.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    if (!hotelImages.length) return;

    setSelectedImage((current) =>
      current === 0 ? hotelImages.length - 1 : current - 1
    );
  };

  /* =========================================================
     BOOK HOTEL
  ========================================================= */

  const handleBookNow = () => {
    if (!hotel?._id) return;

    navigate("/hotelbook", {
      state: {
        hotel,
      },
    });
  };

  /* =========================================================
     AMENITY ICON
  ========================================================= */

  const getAmenityIcon = (amenity) => {
    const value = String(amenity).toLowerCase();

    if (value.includes("wifi") || value.includes("internet")) {
      return Wifi;
    }

    if (value.includes("breakfast") || value.includes("food")) {
      return Coffee;
    }

    if (value.includes("pool") || value.includes("swimming")) {
      return Waves;
    }

    if (value.includes("parking")) {
      return ParkingCircle;
    }

    if (value.includes("gym") || value.includes("fitness")) {
      return Dumbbell;
    }

    if (value.includes("restaurant")) {
      return Utensils;
    }

    if (value.includes("car")) {
      return Car;
    }

    return CheckCircle2;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-5">
            <div className="h-5 w-48 rounded bg-slate-200"></div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
              <div className="space-y-4">
                <div className="h-[420px] rounded-2xl bg-slate-200"></div>
                <div className="h-52 rounded-2xl bg-slate-200"></div>
                <div className="h-64 rounded-2xl bg-slate-200"></div>
              </div>

              <div className="h-[430px] rounded-2xl bg-slate-200"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Info size={26} />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Hotel not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error || "We couldn't find the requested hotel."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/hotels")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={17} />
              Back to Hotels
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/hotels")}
            className="text-slate-500 transition hover:text-blue-600"
          >
            Hotels
          </button>

          <span className="text-slate-300">/</span>

          <span className="max-w-[250px] truncate font-medium text-slate-700">
            {hotelName}
          </span>
        </div>

        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Hotels
        </button>

        {/* ==================================================
            HOTEL TITLE
        ================================================== */}

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {propertyType && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {propertyType}
                  </span>
                )}

                {hotel?.status && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {hotel.status}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                {hotelName}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                {location && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={16} className="text-blue-600" />
                    <span>{location}</span>
                  </div>
                )}

                {rating > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-1 text-white">
                      <Star size={13} fill="currentColor" />

                      <span className="text-xs font-bold">
                        {rating.toFixed(1)}
                      </span>
                    </div>

                    {reviews > 0 && (
                      <span className="text-sm text-slate-500">
                        {reviews.toLocaleString("en-IN")} reviews
                      </span>
                    )}
                  </div>
                )}

                {stars > 0 && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({
                      length: Math.min(stars, 5),
                    }).map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        className="text-amber-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {price > 0 && (
              <div className="shrink-0">
                <p className="text-xs font-medium text-slate-500">
                  Starting from
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    / night
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            PAGE GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="space-y-4">
            {/* ==================================================
                IMAGE GALLERY
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {hotelImages.length > 0 ? (
                <>
                  <div className="relative h-[300px] overflow-hidden bg-slate-100 sm:h-[430px]">
                    <img
                      src={hotelImages[selectedImage]}
                      alt={hotelName}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        console.error(
                          "Hotel image failed to load:",
                          hotelImages[selectedImage]
                        );

                        event.currentTarget.style.display = "none";
                      }}
                    />

                    {hotelImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
                        >
                          <ChevronLeft size={21} />
                        </button>

                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
                        >
                          <ChevronRight size={21} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                          {selectedImage + 1} / {hotelImages.length}
                        </div>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/75"
                    >
                      View all photos
                    </button>
                  </div>

                  {hotelImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto p-4">
                      {hotelImages.map((image, index) => (
                        <button
                          type="button"
                          key={`${image}-${index}`}
                          onClick={() => setSelectedImage(index)}
                          className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                            selectedImage === index
                              ? "border-blue-600"
                              : "border-transparent"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${hotelName} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-[300px] items-center justify-center bg-slate-100 sm:h-[430px]">
                  <div className="text-center">
                    <BedDouble
                      size={48}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-500">
                      Hotel image not available
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* ==================================================
                ABOUT HOTEL
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  About this hotel
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Everything you need to know about your stay
                </p>
              </div>

              {description ? (
                <p className="text-sm leading-7 text-slate-600">
                  {description}
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  No description available for this hotel.
                </p>
              )}
            </section>

            {/* ==================================================
                HOTEL INFORMATION
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Hotel Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Important information for your stay
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Property Type */}

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <BedDouble size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Property Type
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {propertyType || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rooms */}

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Users size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Available Rooms
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {rooms > 0 ? rooms : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Check In */}

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Clock3 size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Check-in
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {checkIn || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Check Out */}

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Check-out
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {checkOut || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}

                <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {location || "Location not available"}
                      </p>

                      {(city || state || country) && (
                        <p className="mt-1 text-xs text-slate-500">
                          {[city, state, country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ==================================================
                AMENITIES
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Amenities
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Facilities available at this property
                </p>
              </div>

              {amenities.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {amenities.map((amenity, index) => {
                    const Icon = getAmenityIcon(amenity);

                    return (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon size={18} />
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <p className="text-sm text-slate-500">
                    No amenities information available.
                  </p>
                </div>
              )}
            </section>

            {/* ==================================================
                LOCATION
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Location
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Where you'll be staying
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {hotelName}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {location || "Location not available"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ==================================================
                BOOKING INFO
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Info size={20} />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900">
                    Booking Information
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Please check the property's cancellation policy,
                    room availability and booking conditions before
                    completing your reservation.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ==================================================
              RIGHT BOOKING SUMMARY
          ================================================== */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}

              <div className="border-b border-slate-100 px-5 py-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Your Stay
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {hotelName}
                </p>
              </div>

              {/* Location */}

              <div className="border-b border-slate-100 px-5 py-5">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-sm leading-5 text-slate-600">
                    {location || "Location not available"}
                  </p>
                </div>
              </div>

              {/* Price */}

              <div className="px-5 py-5">
                <p className="text-xs font-medium text-slate-500">
                  Starting from
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    / night
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Taxes and charges may apply
                </p>
              </div>

              {/* Stay Details */}

              <div className="border-t border-slate-100 px-5 py-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="text-blue-600"
                      />

                      <span className="text-sm text-slate-500">
                        Check-in
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {checkIn || "Not available"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="text-blue-600"
                      />

                      <span className="text-sm text-slate-500">
                        Check-out
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {checkOut || "Not available"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BedDouble
                        size={16}
                        className="text-blue-600"
                      />

                      <span className="text-sm text-slate-500">
                        Property
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {propertyType || "Not available"}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-dashed border-slate-200"></div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Price / Night
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Booking */}

              <div className="border-t border-slate-100 bg-slate-50 p-5">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Book Now
                  <ArrowRight size={18} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck
                    size={14}
                    className="text-emerald-600"
                  />
                  Secure & encrypted booking
                </div>
              </div>
            </div>

            {/* Quick info */}

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex gap-3">
                <CreditCard
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Secure booking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Your booking information and payment details are
                    protected through a secure booking process.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ======================================================
          LIGHTBOX
      ====================================================== */}

      {lightboxOpen && hotelImages.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={previousImage}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={25} />
          </button>

          <div className="flex max-h-[90vh] max-w-6xl items-center justify-center">
            <img
              src={hotelImages[selectedImage]}
              alt={hotelName}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </div>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={25} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
            {selectedImage + 1} / {hotelImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;