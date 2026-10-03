import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Dumbbell,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  ParkingCircle,
  Search,
  Share2,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Utensils,
  Users,
  Wifi,
  X,
} from "lucide-react";

import { getHotelById } from "../redux/slicer/hotelSlice";

const HotelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // =========================================================
  // REDUX HOTEL STATE
  // =========================================================

  const {
    hotel: apiHotel,
    loading,
    error,
  } = useSelector((state) => state.hotel);

  // =========================================================
  // GET HOTEL BY ID
  // =========================================================

  useEffect(() => {
    if (!id) {
      console.log("HOTEL ID NOT FOUND");
      return;
    }

    console.log("HOTEL DETAIL PAGE ID:", id);

    dispatch(getHotelById(id));
  }, [dispatch, id]);

  // =========================================================
  // NORMALIZE HOTEL DATA
  // =========================================================

  const hotel = useMemo(() => {
    if (!apiHotel) return null;

    const allImages = [
      apiHotel.image,
      ...(Array.isArray(apiHotel.images)
        ? apiHotel.images
        : []),
    ].filter(Boolean);

    const uniqueImages = [...new Set(allImages)];

    const basePrice = Number(apiHotel.price || 0);

    return {
      id: apiHotel._id,

      name: apiHotel.hotelName || "Hotel",

      city: apiHotel.city || "",
      state: apiHotel.state || "",
      country: apiHotel.country || "",

      location:
        [apiHotel.city, apiHotel.state, apiHotel.country]
          .filter(Boolean)
          .join(", ") || "Location unavailable",

      fullAddress:
        [
          apiHotel.address,
          apiHotel.city,
          apiHotel.state,
          apiHotel.country,
        ]
          .filter(Boolean)
          .join(", ") || "Address unavailable",

      description:
        apiHotel.description ||
        "Enjoy a comfortable stay with modern facilities and convenient amenities.",

      rating:
        apiHotel.rating !== undefined &&
        apiHotel.rating !== null
          ? Number(apiHotel.rating)
          : apiHotel.starRating
            ? Number(apiHotel.starRating)
            : 0,

      reviews: Number(apiHotel.reviews || 0),

      category:
        apiHotel.propertyType || "Hotel",

      distance: apiHotel.city
        ? `Located in ${apiHotel.city}`
        : "Great location",

      startingPrice: basePrice,

      oldPrice: basePrice,

      taxes: Math.round(basePrice * 0.12),

      images:
        uniqueImages.length > 0
          ? uniqueImages
          : [
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
            ],

      checkIn:
        apiHotel.checkIn || "02:00 PM",

      checkOut:
        apiHotel.checkOut || "12:00 PM",

      rooms: Number(apiHotel.rooms || 0),

      amenities:
        Array.isArray(apiHotel.amenities)
          ? apiHotel.amenities
          : [],
    };
  }, [apiHotel]);

  // =========================================================
  // STATES
  // =========================================================

  const [activeImage, setActiveImage] =
    useState(0);

  const [isSaved, setIsSaved] =
    useState(false);

  const [showAllPhotos, setShowAllPhotos] =
    useState(false);

  const [expandedDescription, setExpandedDescription] =
    useState(false);

  const [openFaq, setOpenFaq] =
    useState(null);

  // =========================================================
  // BOOKING STATES
  // =========================================================

  const [checkIn, setCheckIn] =
    useState("2026-09-20");

  const [checkOut, setCheckOut] =
    useState("2026-09-23");

  const [guests, setGuests] =
    useState(2);

  const [showGuestPicker, setShowGuestPicker] =
    useState(false);

  // =========================================================
  // TODAY DATE
  // =========================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =========================================================
  // CALCULATE NIGHTS
  // =========================================================

  const calculateNights = (
    startDate,
    endDate
  ) => {
    if (!startDate || !endDate) {
      return 1;
    }

    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return 1;
    }

    const difference =
      end.getTime() - start.getTime();

    if (difference <= 0) {
      return 1;
    }

    return Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatShortDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(
      `${date}T00:00:00`
    );

    if (
      Number.isNaN(parsedDate.getTime())
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );
  };

  // =========================================================
  // ROOM DATA
  // =========================================================

  const rooms = useMemo(() => {
    if (!hotel) return [];

    const basePrice =
      hotel.startingPrice || 0;

    return [
      {
        id: 1,

        name: "Deluxe Room",

        image:
          hotel.images[0] ||
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=85",

        bed: "1 King Bed",

        guests: 2,

        size: "32 m²",

        price: basePrice,

        oldPrice:
          basePrice > 0
            ? Math.round(
                basePrice * 1.25
              )
            : 0,

        features: [
          "Free WiFi",
          "Breakfast included",
          "Free cancellation",
        ],

        tag: "Best Value",
      },

      {
        id: 2,

        name: "Premium Room",

        image:
          hotel.images[1] ||
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=85",

        bed: "1 King Bed",

        guests: 2,

        size: "38 m²",

        price:
          basePrice > 0
            ? Math.round(
                basePrice * 1.2
              )
            : 0,

        oldPrice:
          basePrice > 0
            ? Math.round(
                basePrice * 1.45
              )
            : 0,

        features: [
          "Premium room",
          "Breakfast included",
          "Free cancellation",
        ],

        tag: "Popular",
      },

      {
        id: 3,

        name: "Family Suite",

        image:
          hotel.images[2] ||
          "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=700&q=85",

        bed: "1 King + 1 Sofa Bed",

        guests: 4,

        size: "52 m²",

        price:
          basePrice > 0
            ? Math.round(
                basePrice * 1.4
              )
            : 0,

        oldPrice:
          basePrice > 0
            ? Math.round(
                basePrice * 1.7
              )
            : 0,

        features: [
          "Family room",
          "Breakfast included",
          "Free WiFi",
        ],

        tag: "Family Choice",
      },
    ];
  }, [hotel]);

  // =========================================================
  // SELECTED ROOM
  // =========================================================

  const [selectedRoom, setSelectedRoom] =
    useState(null);

  useEffect(() => {
    if (
      rooms.length > 0 &&
      !selectedRoom
    ) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  // =========================================================
  // AMENITIES
  // =========================================================

  const amenityIconMap = {
    wifi: Wifi,

    "free wifi": Wifi,

    parking: ParkingCircle,

    "free parking": ParkingCircle,

    breakfast: Coffee,

    gym: Dumbbell,

    "fitness center": Dumbbell,

    "swimming pool": Sparkles,

    pool: Sparkles,

    spa: Sparkles,

    "air conditioning": Snowflake,

    restaurant: Utensils,

    security: ShieldCheck,
  };

  const getAmenityIcon = (
    amenity
  ) => {
    const key = String(amenity)
      .trim()
      .toLowerCase();

    return (
      amenityIconMap[key] ||
      Sparkles
    );
  };

  const amenities = useMemo(() => {
    if (!hotel) return [];

    return hotel.amenities.map(
      (amenity) => {
        const Icon =
          getAmenityIcon(amenity);

        return {
          icon: Icon,

          title: amenity,

          description:
            "Available at the hotel",
        };
      }
    );
  }, [hotel]);

  // =========================================================
  // REVIEWS
  // =========================================================

  const reviews = [
    {
      name: "Rahul Sharma",
      date: "September 2026",
      rating: 5,
      text: "Great location and very comfortable rooms. The staff was friendly and the overall experience was excellent.",
    },

    {
      name: "Priya Mehta",
      date: "August 2026",
      rating: 5,
      text: "The hotel was clean, modern and close to everything we wanted to visit.",
    },

    {
      name: "Amit Kumar",
      date: "August 2026",
      rating: 4,
      text: "Very good stay for the price. Breakfast was nice and the room had everything we needed.",
    },
  ];

  // =========================================================
  // FAQ
  // =========================================================

  const faqs = [
    {
      question:
        "Does the hotel provide breakfast?",

      answer:
        "Breakfast availability depends on the selected room plan. Please check the room inclusions before booking.",
    },

    {
      question:
        "Is free cancellation available?",

      answer:
        "Selected rooms may include free cancellation. The exact cancellation policy is shown before booking.",
    },

    {
      question:
        "What are the check-in and check-out times?",

      answer: hotel
        ? `Check-in is from ${hotel.checkIn} and check-out is before ${hotel.checkOut}.`
        : "Check-in and check-out information will be shown here.",
    },

    {
      question:
        "Does the hotel have free WiFi?",

      answer:
        "Yes, complimentary WiFi is available for hotel guests when included in the hotel amenities.",
    },

    {
      question:
        "Can I modify my booking?",

      answer:
        "Modification depends on the room and booking policy. Eligible bookings can be managed from your Tripora account.",
    },
  ];

  // =========================================================
  // SIMILAR HOTELS
  // =========================================================

  const similarHotels = [
    {
      name: "Dubai Marina Grand",

      location: "Dubai Marina",

      rating: 4.5,

      reviews: 892,

      price: 7999,

      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    },

    {
      name: "Blue Horizon Resort",

      location: "Jumeirah, Dubai",

      rating: 4.7,

      reviews: 1054,

      price: 9499,

      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    },

    {
      name: "Palm View Suites",

      location: "Palm Jumeirah",

      rating: 4.6,

      reviews: 764,

      price: 8299,

      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // =========================================================
  // DYNAMIC BOOKING SUMMARY
  // =========================================================

  const bookingSummary = useMemo(() => {
    if (!hotel || !selectedRoom) {
      return {
        nights: 1,

        baseRoomTotal: 0,

        extraGuestTotal: 0,

        roomTotal: 0,

        taxes: 0,

        total: 0,

        extraGuests: 0,

        extraGuestFeePerNight: 0,
      };
    }

    const nights =
      calculateNights(
        checkIn,
        checkOut
      );

    const roomPrice = Number(
      selectedRoom.price || 0
    );

    const includedGuests =
      Number(
        selectedRoom.guests || 2
      );

    const extraGuests =
      Math.max(
        0,
        Number(guests) -
          includedGuests
      );

    /*
      Extra guest pricing:
      10% of room price per
      extra guest per night.
    */

    const extraGuestFeePerNight =
      Math.round(
        roomPrice * 0.1
      );

    const baseRoomTotal =
      roomPrice * nights;

    const extraGuestTotal =
      extraGuests *
      extraGuestFeePerNight *
      nights;

    const roomTotal =
      baseRoomTotal +
      extraGuestTotal;

    const taxes =
      Math.round(
        roomTotal * 0.12
      );

    const total =
      roomTotal + taxes;

    return {
      nights,

      baseRoomTotal,

      extraGuestTotal,

      roomTotal,

      taxes,

      total,

      extraGuests,

      extraGuestFeePerNight,
    };
  }, [
    hotel,
    selectedRoom,
    checkIn,
    checkOut,
    guests,
  ]);

  // =========================================================
  // BOOKING URL
  // =========================================================

  const bookingSearchParams =
    useMemo(() => {
      return new URLSearchParams({
        hotelId: hotel?.id || "",

        roomId:
          selectedRoom?.id
            ? String(selectedRoom.id)
            : "",

        checkIn: checkIn || "",

        checkOut: checkOut || "",

        guests: String(guests),

        nights: String(
          bookingSummary.nights
        ),

        roomPrice: String(
          selectedRoom?.price || 0
        ),

        roomTotal: String(
          bookingSummary.roomTotal
        ),

        taxes: String(
          bookingSummary.taxes
        ),

        total: String(
          bookingSummary.total
        ),
      }).toString();
    }, [
      hotel?.id,
      selectedRoom,
      checkIn,
      checkOut,
      guests,
      bookingSummary,
    ]);

  const bookingUrl =
    `/hotelbook?${bookingSearchParams}`;

  // =========================================================
  // IMAGE CONTROLS
  // =========================================================

  const nextImage = () => {
    if (!hotel?.images?.length) {
      return;
    }

    setActiveImage((prev) =>
      prev ===
      hotel.images.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousImage = () => {
    if (!hotel?.images?.length) {
      return;
    }

    setActiveImage((prev) =>
      prev === 0
        ? hotel.images.length - 1
        : prev - 1
    );
  };

  // =========================================================
  // GUEST CONTROL
  // =========================================================

  const decreaseGuests = () => {
    setGuests((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const increaseGuests = () => {
    setGuests((prev) =>
      Math.min(8, prev + 1)
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading || !hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading hotel details...
          </p>

          {id && (
            <p className="mt-1 text-xs text-slate-400">
              Hotel ID: {id}
            </p>
          )}
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <X size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to load hotel
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error?.message ||
              "Hotel details could not be loaded."}
          </p>

          <Link
            to="/hotels"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          TOP SEARCH / BOOKING BAR
      ====================================================== */}

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="hidden min-w-0 flex-1 lg:block">
              <p className="truncate text-sm font-bold text-slate-900">
                {hotel.name}
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} />
                {hotel.location}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 lg:w-[640px]">
              {/* DESTINATION */}

              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Destination
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <MapPin
                    size={14}
                    className="shrink-0 text-blue-600"
                  />

                  <span className="truncate text-xs font-semibold text-slate-800">
                    {hotel.city ||
                      hotel.location}
                  </span>
                </div>
              </div>

              {/* DATES */}

              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Dates
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <CalendarDays
                    size={14}
                    className="shrink-0 text-blue-600"
                  />

                  <span className="truncate text-xs font-semibold text-slate-800">
                    {formatShortDate(
                      checkIn
                    )}{" "}
                    -{" "}
                    {formatShortDate(
                      checkOut
                    )}
                  </span>
                </div>
              </div>

              {/* GUESTS */}

              <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowGuestPicker(
                      (prev) => !prev
                    )
                  }
                  className="w-full text-left"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Guests
                  </p>

                  <div className="mt-0.5 flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5 truncate text-xs font-semibold text-slate-800">
                      <Users
                        size={14}
                        className="shrink-0 text-blue-600"
                      />

                      {guests} Guests
                    </span>

                    <ChevronDown
                      size={13}
                      className="shrink-0 text-slate-400"
                    />
                  </div>
                </button>

                {showGuestPicker && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-[100] w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Guests
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Maximum 8 guests
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowGuestPicker(
                            false
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Guests
                        </p>

                        <p className="text-xs text-slate-400">
                          Adults & children
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={
                            decreaseGuests
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                        >
                          −
                        </button>

                        <span className="min-w-5 text-center text-sm font-semibold">
                          {guests}
                        </span>

                        <button
                          type="button"
                          onClick={
                            increaseGuests
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowGuestPicker(
                          false
                        )
                      }
                      className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 lg:w-auto"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        {/* BREADCRUMB */}

        <div className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <Link
            to="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <Link
            to="/hotels"
            className="transition hover:text-blue-600"
          >
            Hotels
          </Link>

          <ChevronRight size={13} />

          <span>
            {hotel.city || "Location"}
          </span>

          <ChevronRight size={13} />

          <span className="font-medium text-slate-800">
            {hotel.name}
          </span>
        </div>

        {/* HOTEL GALLERY */}

      {/* HOTEL GALLERY */}

<section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  <div className="grid gap-1 bg-slate-100 lg:grid-cols-[1.7fr_0.8fr_0.8fr]">

    {/* MAIN IMAGE */}

    <div className="group relative h-[180px] overflow-hidden lg:h-[250px]">
      <img
        src={hotel.images[activeImage]}
        alt={hotel.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <button
        type="button"
        onClick={previousImage}
        className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={nextImage}
        className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
      >
        <ChevronRight size={18} />
      </button>

      <button
        type="button"
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/75"
      >
        <Menu size={14} />
        View all {hotel.images.length} photos
      </button>
    </div>

    {/* SECOND IMAGE */}

    {hotel.images[1] && (
      <button
        type="button"
        onClick={() => setActiveImage(1)}
        className="group hidden h-[250px] overflow-hidden lg:block"
      >
        <img
          src={hotel.images[1]}
          alt={`${hotel.name} room`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </button>
    )}

    {/* RIGHT IMAGE COLUMN */}

    <div className="hidden flex-col gap-1 lg:flex">

      {hotel.images[2] && (
        <button
          type="button"
          onClick={() => setActiveImage(2)}
          className="group h-1/2 overflow-hidden"
        >
          <img
            src={hotel.images[2]}
            alt={`${hotel.name} pool`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>
      )}

      {hotel.images[3] && (
        <button
          type="button"
          onClick={() => setActiveImage(3)}
          className="group relative h-1/2 overflow-hidden"
        >
          <img
            src={hotel.images[3]}
            alt={`${hotel.name} interior`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20" />

          <span className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900">
            More photos
          </span>
        </button>
      )}

    </div>
  </div>

  {/* HOTEL BASIC INFORMATION */}

  <div className="p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

      <div className="min-w-0">

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {hotel.category}
          </span>

          {hotel.rating > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600">
              <Star
                size={11}
                fill="currentColor"
              />

              {hotel.rating}
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {hotel.name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">

          <span className="flex items-center gap-1.5">
            <MapPin
              size={15}
              className="text-blue-600"
            />

            {hotel.location}
          </span>

          <span className="hidden text-slate-300 sm:inline">
            •
          </span>

          <span>
            {hotel.distance}
          </span>

          {hotel.reviews > 0 && (
            <>
              <span className="hidden text-slate-300 sm:inline">
                •
              </span>

              <span className="font-medium text-slate-700">
                {hotel.reviews.toLocaleString()} reviews
              </span>
            </>
          )}

        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">

        <button
          type="button"
          onClick={() =>
            setIsSaved((prev) => !prev)
          }
          className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-xs font-semibold transition ${
            isSaved
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
          }`}
        >
          <Heart
            size={16}
            fill={
              isSaved
                ? "currentColor"
                : "none"
            }
          />

          {isSaved ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
        >
          <Share2 size={16} />
          Share
        </button>

      </div>
    </div>

    <div className="mt-5 max-w-4xl">

      <p
        className={`text-sm leading-7 text-slate-600 ${
          !expandedDescription
            ? "line-clamp-2"
            : ""
        }`}
      >
        {hotel.description}
      </p>

      <button
        type="button"
        onClick={() =>
          setExpandedDescription(
            (prev) => !prev
          )
        }
        className="mt-1 text-xs font-semibold text-blue-600"
      >
        {expandedDescription
          ? "Show less"
          : "Read more"}
      </button>

    </div>
  </div>
</section>

        {/* QUICK HIGHLIGHTS */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Star
                  size={18}
                  fill="currentColor"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {hotel.rating ||
                    "New"}{" "}
                  {hotel.rating
                    ? "Excellent"
                    : "Hotel"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {hotel.reviews >
                  0
                    ? `${hotel.reviews.toLocaleString()} reviews`
                    : "No reviews yet"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Great Location
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {hotel.city ||
                    "Convenient location"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wifi size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {hotel.amenities.some(
                    (item) =>
                      item
                        .toLowerCase()
                        .includes("wifi")
                  )
                    ? "Free WiFi"
                    : "Hotel Amenities"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Available at property
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <BedDouble size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {hotel.rooms || 0}{" "}
                  Rooms
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Comfortable stay
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[1fr_350px]">
          <div>
            {/* ABOUT */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  ABOUT THE HOTEL
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  A comfortable stay in{" "}
                  {hotel.city ||
                    "your destination"}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-[1fr_250px]">
                <div>
                  <p className="text-sm leading-7 text-slate-600">
                    {hotel.description}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Enjoy modern facilities,
                    comfortable rooms and
                    convenient amenities during
                    your stay at {hotel.name}.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    Hotel Information
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Clock3 size={14} />
                        Check-in
                      </span>

                      <span className="font-semibold text-slate-800">
                        {hotel.checkIn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Clock3 size={14} />
                        Check-out
                      </span>

                      <span className="font-semibold text-slate-800">
                        {hotel.checkOut}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500">
                        Rooms
                      </span>

                      <span className="font-semibold text-slate-800">
                        {hotel.rooms}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AMENITIES */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-blue-600">
                    AMENITIES
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Everything you need
                  </h2>
                </div>

                <span className="hidden text-xs text-slate-400 sm:block">
                  {hotel.amenities.length}{" "}
                  amenities
                </span>
              </div>

              {amenities.length >
              0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {amenities.map(
                    (amenity) => {
                      const Icon =
                        amenity.icon;

                      return (
                        <div
                          key={
                            amenity.title
                          }
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <Icon size={17} />
                          </div>

                          <p className="mt-3 text-xs font-bold text-slate-900">
                            {amenity.title}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {
                              amenity.description
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No amenities
                  available.
                </p>
              )}
            </section>

            {/* ROOMS */}

            <section
              className="mt-6"
              id="rooms"
            >
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  ROOMS & RATES
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Choose your room
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a room that
                  works best for your
                  stay.
                </p>
              </div>

              <div className="space-y-4">
                {rooms.map((room) => {
                  const isSelected =
                    selectedRoom?.id ===
                    room.id;

                  return (
                    <div
                      key={room.id}
                      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                        isSelected
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-slate-200 hover:border-blue-200"
                      }`}
                    >
                      <div className="grid lg:grid-cols-[220px_1fr_190px]">
                        <div className="relative h-48 overflow-hidden lg:h-full lg:min-h-[210px]">
                          <img
                            src={room.image}
                            alt={
                              room.name
                            }
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />

                          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white">
                            {room.tag}
                          </span>
                        </div>

                        <div className="p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">
                                {
                                  room.name
                                }
                              </h3>

                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <BedDouble
                                    size={
                                      14
                                    }
                                  />
                                  {
                                    room.bed
                                  }
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <Users
                                    size={
                                      14
                                    }
                                  />
                                  {
                                    room.guests
                                  }{" "}
                                  Guests
                                </span>

                                <span>
                                  {
                                    room.size
                                  }
                                </span>
                              </div>
                            </div>

                            {isSelected && (
                              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                <Check
                                  size={
                                    12
                                  }
                                />
                                Selected
                              </span>
                            )}
                          </div>

                          <div className="mt-5 space-y-2">
                            {room.features.map(
                              (
                                feature
                              ) => (
                                <div
                                  key={
                                    feature
                                  }
                                  className="flex items-center gap-2 text-xs text-slate-600"
                                >
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <Check
                                      size={
                                        11
                                      }
                                    />
                                  </span>

                                  {
                                    feature
                                  }
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 bg-slate-50/70 p-5 lg:border-l lg:border-t-0">
                          <p className="text-xs text-slate-400">
                            Starting from
                          </p>

                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-900">
                              ₹
                              {room.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-[10px] text-slate-400">
                            per night + taxes
                          </p>

                          <p className="mt-3 text-xs text-slate-400 line-through">
                            ₹
                            {room.oldPrice.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRoom(
                                room
                              )
                            }
                            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition ${
                              isSelected
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "border border-blue-200 bg-white text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {isSelected
                              ? "Selected"
                              : "Select Room"}

                            <ArrowRight
                              size={
                                14
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* REVIEWS */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <p className="text-xs font-semibold text-blue-600">
                  GUEST REVIEWS
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  What guests are saying
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-[230px_1fr]">
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <div className="text-4xl font-bold text-slate-900">
                    {hotel.rating ||
                      "New"}
                  </div>

                  <div className="mt-2 flex justify-center gap-0.5 text-amber-400">
                    {Array.from({
                      length: 5,
                    }).map(
                      (_, index) => (
                        <Star
                          key={
                            index
                          }
                          size={15}
                          fill="currentColor"
                        />
                      )
                    )}
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {hotel.reviews >
                    0
                      ? `${hotel.reviews.toLocaleString()} verified reviews`
                      : "No reviews yet"}
                  </p>

                  <div className="mt-5 space-y-2 text-left">
                    {[
                      [
                        "Cleanliness",
                        "4.7",
                      ],
                      [
                        "Location",
                        "4.8",
                      ],
                      [
                        "Comfort",
                        "4.6",
                      ],
                      [
                        "Service",
                        "4.5",
                      ],
                      [
                        "Value",
                        "4.3",
                      ],
                    ].map(
                      ([
                        label,
                        value,
                      ]) => (
                        <div
                          key={
                            label
                          }
                          className="flex items-center gap-2"
                        >
                          <span className="w-20 text-[10px] text-slate-500">
                            {label}
                          </span>

                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{
                                width: `${
                                  Number(
                                    value
                                  ) *
                                  20
                                }%`,
                              }}
                            />
                          </div>

                          <span className="text-[10px] font-semibold text-slate-700">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {reviews.map(
                    (review) => (
                      <div
                        key={`${review.name}-${review.date}`}
                        className="rounded-2xl border border-slate-100 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                              {review.name
                                .split(
                                  " "
                                )
                                .map(
                                  (
                                    item
                                  ) =>
                                    item[0]
                                )
                                .join(
                                  ""
                                )}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {
                                  review.name
                                }
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                Stayed in{" "}
                                {
                                  review.date
                                }
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-400">
                            {Array.from(
                              {
                                length:
                                  review.rating,
                              }
                            ).map(
                              (
                                _,
                                index
                              ) => (
                                <Star
                                  key={
                                    index
                                  }
                                  size={
                                    12
                                  }
                                  fill="currentColor"
                                />
                              )
                            )}
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-6 text-slate-600">
                          {
                            review.text
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* LOCATION */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  LOCATION
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Explore the neighbourhood
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {hotel.location}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {
                          hotel.fullAddress
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                      <span className="text-slate-500">
                        City
                      </span>

                      <span className="font-semibold text-slate-800">
                        {apiHotel?.city ||
                          "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                      <span className="text-slate-500">
                        State
                      </span>

                      <span className="font-semibold text-slate-800">
                        {apiHotel?.state ||
                          "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                      <span className="text-slate-500">
                        Country
                      </span>

                      <span className="font-semibold text-slate-800">
                        {apiHotel?.country ||
                          "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Pincode
                      </span>

                      <span className="font-semibold text-slate-800">
                        {apiHotel?.pincode ||
                          "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100">
                  <div className="absolute left-1/4 top-0 h-full w-px rotate-12 bg-blue-200/70" />
                  <div className="absolute left-1/2 top-0 h-full w-px -rotate-12 bg-blue-200/60" />
                  <div className="absolute left-3/4 top-0 h-full w-px rotate-12 bg-blue-200/50" />
                  <div className="absolute left-0 top-1/3 h-px w-full rotate-6 bg-white" />
                  <div className="absolute left-0 top-2/3 h-px w-full -rotate-6 bg-white" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-ping rounded-full bg-blue-500/20" />

                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
                        <MapPin
                          size={20}
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                    <p className="text-xs font-bold text-slate-900">
                      {hotel.name}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      {hotel.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 text-[10px] font-semibold text-blue-600 shadow-sm"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </section>

            {/* POLICIES */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  HOTEL POLICIES
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Good to know
                </h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Check-in &
                    Check-out
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Check-in from{" "}
                    {hotel.checkIn}.
                    Check-out before{" "}
                    {hotel.checkOut}.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Cancellation
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Cancellation policy
                    depends on your
                    selected room and
                    booking plan.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Child Policy
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Children are
                    welcome. Additional
                    charges may apply
                    depending on room
                    type.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Payment Policy
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Secure online payment
                    methods are accepted.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  FAQ
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Frequently asked
                  questions
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {faqs.map(
                  (faq, index) => {
                    const isOpen =
                      openFaq ===
                      index;

                    return (
                      <div
                        key={
                          faq.question
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaq(
                              isOpen
                                ? null
                                : index
                            )
                          }
                          className="flex w-full items-center justify-between gap-5 py-4 text-left"
                        >
                          <span className="text-sm font-semibold text-slate-800">
                            {
                              faq.question
                            }
                          </span>

                          <ChevronDown
                            size={17}
                            className={`shrink-0 text-slate-400 transition ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-4 pr-8 text-xs leading-6 text-slate-500">
                            {
                              faq.answer
                            }
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>

          {/* BOOKING SIDEBAR */}

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              <div className="border-b border-slate-100 p-5">
                <p className="text-xs font-semibold text-slate-400">
                  YOUR STAY
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedRoom?.name ||
                    "Select a room"}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin
                    size={13}
                    className="text-blue-600"
                  />

                  {hotel.location}
                </div>
              </div>

              {/* DATES */}

              <div className="grid grid-cols-2 border-b border-slate-100">
                <div className="border-r border-slate-100 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Check-in
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-blue-600"
                    />

                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        const newCheckIn =
                          e.target.value;

                        setCheckIn(
                          newCheckIn
                        );

                        if (
                          checkOut &&
                          newCheckIn >=
                            checkOut
                        ) {
                          const nextDay =
                            new Date(
                              `${newCheckIn}T00:00:00`
                            );

                          nextDay.setDate(
                            nextDay.getDate() +
                              1
                          );

                          setCheckOut(
                            nextDay
                              .toISOString()
                              .split(
                                "T"
                              )[0]
                          );
                        }
                      }}
                      className="min-w-0 bg-transparent text-xs font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Check-out
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-blue-600"
                    />

                    <input
                      type="date"
                      min={
                        checkIn || today
                      }
                      value={checkOut}
                      onChange={(e) => {
                        const newCheckOut =
                          e.target.value;

                        if (
                          checkIn &&
                          newCheckOut <=
                            checkIn
                        ) {
                          return;
                        }

                        setCheckOut(
                          newCheckOut
                        );
                      }}
                      className="min-w-0 bg-transparent text-xs font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* GUESTS */}

              <div className="border-b border-slate-100 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Guests
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users
                      size={16}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-semibold text-slate-800">
                      {guests} Guests
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={
                        decreaseGuests
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-xs font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseGuests
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE */}

              <div className="p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    ₹
                    {selectedRoom?.price?.toLocaleString(
                      "en-IN"
                    ) || 0}{" "}
                    ×{" "}
                    {
                      bookingSummary.nights
                    }{" "}
                    nights
                  </span>

                  <span className="font-semibold text-slate-800">
                    ₹
                    {bookingSummary.baseRoomTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {/* EXTRA GUEST */}

                {bookingSummary.extraGuests >
                  0 && (
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Extra guest ×{" "}
                      {
                        bookingSummary.nights
                      }{" "}
                      nights
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹
                      {bookingSummary.extraGuestTotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                )}

                {/* TAX */}

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Taxes & fees
                  </span>

                  <span className="font-semibold text-slate-800">
                    ₹
                    {bookingSummary.taxes.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="my-4 border-t border-dashed border-slate-200" />

                {/* TOTAL */}

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      ₹
                      {bookingSummary.total.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <span className="mb-1 text-[10px] text-slate-400">
                    incl. taxes
                  </span>
                </div>

                {/* CONTINUE TO BOOK */}

                <Link to={bookingUrl}>
                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Continue to Book

                    <ArrowRight
                      size={17}
                    />
                  </button>
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck
                    size={13}
                    className="text-emerald-500"
                  />

                  Secure booking with
                  Tripora
                </div>
              </div>
            </div>

            {/* SUPPORT */}

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <MessageCircle
                    size={17}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Need help?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Our support team is
                    available 24/7 to
                    help with your
                    booking.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600"
                  >
                    Contact Support

                    <ArrowRight
                      size={13}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* SIMILAR HOTELS */}

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-blue-600">
                SIMILAR HOTELS
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                You may also like
              </h2>
            </div>

            <Link
              to="/hotels"
              className="hidden items-center gap-1 text-xs font-semibold text-blue-600 sm:flex"
            >
              View all

              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {similarHotels.map(
              (item) => (
                <div
                  key={item.name}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm">
                      <Star
                        size={11}
                        className="text-amber-500"
                        fill="currentColor"
                      />

                      {item.rating}
                    </div>

                    <button
                      type="button"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:text-red-500"
                    >
                      <Heart size={15} />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-slate-900">
                      {item.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin size={12} />
                      {item.location}
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">
                          From
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-slate-900">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          per night
                        </p>
                      </div>

                      <Link
                        to={`/hotels/${item.name
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      >
                        View

                        <ArrowRight
                          size={13}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      {/* MOBILE BOOKING BAR */}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400">
              From
            </p>

            <p className="truncate text-lg font-bold text-slate-900">
              ₹
              {selectedRoom?.price?.toLocaleString(
                "en-IN"
              ) || 0}

              <span className="ml-1 text-[10px] font-normal text-slate-400">
                / night
              </span>
            </p>
          </div>

          <Link
            to={bookingUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Select Room

            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* PHOTO MODAL */}

      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4">
          <button
            type="button"
            onClick={() =>
              setShowAllPhotos(
                false
              )
            }
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={
                  hotel.images[
                    activeImage
                  ]
                }
                alt={hotel.name}
                className="max-h-[75vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={
                  previousImage
                }
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {hotel.images.map(
                (image, index) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                    className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                      activeImage ===
                      index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                )
              )}
            </div>

            <div className="mt-3 text-center text-xs text-slate-300">
              {activeImage + 1} /{" "}
              {hotel.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;