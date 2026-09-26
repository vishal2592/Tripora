
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  BellRing,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Dumbbell,
  Heart,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  ParkingCircle,
  Plane,
  Plus,
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


const HotelDetails = () => {
  const { id } = useParams();

  // =========================================================
  // DEMO HOTEL DATA
  // Replace this later with your API data using `id`
  // =========================================================
  const hotel = {
    id: id || "dubai-marina-hotel",
    name: "Marina View Hotel",
    location: "Dubai Marina, Dubai",
    description:
      "Enjoy a comfortable stay in the heart of Dubai Marina with modern rooms, premium amenities and easy access to shopping, dining and major attractions.",
    rating: 4.6,
    reviews: 1248,
    category: "Luxury Hotel",
    distance: "1.2 km from Dubai Marina",
    startingPrice: 8499,
    oldPrice: 11999,
    taxes: 1250,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
    ],
  };

  // =========================================================
  // ROOMS
  // =========================================================
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=85",
      bed: "1 King Bed",
      guests: 2,
      size: "32 m²",
      price: 7499,
      oldPrice: 9999,
      features: [
        "Free WiFi",
        "Breakfast included",
        "Free cancellation",
      ],
      tag: "Best Value",
    },
    {
      id: 2,
      name: "Premium Sea View Room",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=85",
      bed: "1 King Bed",
      guests: 2,
      size: "38 m²",
      price: 9499,
      oldPrice: 12499,
      features: [
        "Sea view",
        "Breakfast included",
        "Free cancellation",
      ],
      tag: "Popular",
    },
    {
      id: 3,
      name: "Family Suite",
      image:
        "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=700&q=85",
      bed: "1 King + 1 Sofa Bed",
      guests: 4,
      size: "52 m²",
      price: 12999,
      oldPrice: 15999,
      features: [
        "Family room",
        "Breakfast included",
        "Free WiFi",
      ],
      tag: "Family Choice",
    },
  ];

  // =========================================================
  // AMENITIES
  // =========================================================
  const amenities = [
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet",
    },
    {
      icon: ParkingCircle,
      title: "Free Parking",
      description: "On-site parking",
    },
    {
      icon: Coffee,
      title: "Breakfast",
      description: "Breakfast available",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Modern gym",
    },
    {
      icon: Sparkles,
      title: "Swimming Pool",
      description: "Outdoor pool",
    },
    {
      icon: Snowflake,
      title: "Air Conditioning",
      description: "All rooms",
    },
    {
      icon: Utensils,
      title: "Restaurant",
      description: "On-site dining",
    },
    {
      icon: ShieldCheck,
      title: "24/7 Security",
      description: "Safe & secure",
    },
  ];

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
      text: "The hotel was clean, modern and close to everything we wanted to visit in Dubai Marina.",
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
      question: "Does the hotel provide breakfast?",
      answer:
        "Yes. Breakfast is available for selected room plans. Please check the room inclusions before booking.",
    },
    {
      question: "Is free cancellation available?",
      answer:
        "Selected rooms include free cancellation. The exact cancellation deadline is shown before you confirm your booking.",
    },
    {
      question: "How far is the hotel from Dubai Marina?",
      answer:
        "The hotel is approximately 1.2 km from Dubai Marina.",
    },
    {
      question: "Does the hotel have free WiFi?",
      answer:
        "Yes. Complimentary WiFi is available for hotel guests.",
    },
    {
      question: "Can I modify my booking?",
      answer:
        "Modification depends on the room and booking policy. You can manage eligible bookings from your Tripora account.",
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
  // STATES
  // =========================================================
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [checkIn, setCheckIn] = useState("2026-09-20");
  const [checkOut, setCheckOut] = useState("2026-09-23");
  const [guests, setGuests] = useState(2);

  const [showGuestPicker, setShowGuestPicker] = useState(false);

  // =========================================================
  // CALCULATE TOTAL
  // =========================================================
  const bookingSummary = useMemo(() => {
    const nights = 3;

    const roomTotal = selectedRoom.price * nights;
    const taxes = hotel.taxes;
    const total = roomTotal + taxes;

    return {
      nights,
      roomTotal,
      taxes,
      total,
    };
  }, [selectedRoom, hotel.taxes]);

  // =========================================================
  // IMAGE CONTROLS
  // =========================================================
  const nextImage = () => {
    setActiveImage((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  // =========================================================
  // GUEST CONTROL
  // =========================================================
  const decreaseGuests = () => {
    setGuests((prev) => Math.max(1, prev - 1));
  };

  const increaseGuests = () => {
    setGuests((prev) => Math.min(8, prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          TOP SEARCH / BOOKING BAR
      ====================================================== */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Hotel Name */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <p className="truncate text-sm font-bold text-slate-900">
                {hotel.name}
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} />
                {hotel.location}
              </p>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-3 gap-2 lg:w-[640px]">
              {/* Destination */}
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
                    Dubai
                  </span>
                </div>
              </div>

              {/* Dates */}
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
                    20 Sep - 23 Sep
                  </span>
                </div>
              </div>

              {/* Guests */}
              <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowGuestPicker((prev) => !prev)
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
                          setShowGuestPicker(false)
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
                          onClick={decreaseGuests}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                        >
                          −
                        </button>

                        <span className="min-w-5 text-center text-sm font-semibold">
                          {guests}
                        </span>

                        <button
                          type="button"
                          onClick={increaseGuests}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowGuestPicker(false)
                      }
                      className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
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
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
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

          <span>Dubai</span>

          <ChevronRight size={13} />

          <span className="font-medium text-slate-800">
            {hotel.name}
          </span>
        </div>

        {/* =====================================================
            HOTEL GALLERY
        ====================================================== */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-1 bg-slate-100 lg:grid-cols-[1.7fr_0.8fr_0.8fr]">
            {/* Main Image */}
            <div className="group relative min-h-[270px] overflow-hidden lg:min-h-[420px]">
              <img
                src={hotel.images[activeImage]}
                alt={hotel.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

              {/* Previous */}
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>

              {/* Photo count */}
              <button
                type="button"
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/75"
              >
                <Menu size={14} />
                View all {hotel.images.length} photos
              </button>
            </div>

            {/* Second image */}
            <button
              type="button"
              onClick={() => setActiveImage(1)}
              className="group hidden min-h-[205px] overflow-hidden lg:block"
            >
              <img
                src={hotel.images[1]}
                alt={`${hotel.name} room`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>

            {/* Right image column */}
            <div className="hidden flex-col gap-1 lg:flex">
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

                <span className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900">
                  More photos
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              HOTEL BASIC INFORMATION
          ================================================== */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                {/* Badge */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                    {hotel.category}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600">
                    <Star
                      size={11}
                      fill="currentColor"
                    />
                    {hotel.rating}
                  </span>
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

                  <span className="hidden text-slate-300 sm:inline">
                    •
                  </span>

                  <span className="font-medium text-slate-700">
                    {hotel.reviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>

              {/* Actions */}
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
                    fill={isSaved ? "currentColor" : "none"}
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

            {/* Description */}
            <div className="mt-5 max-w-4xl">
              <p
                className={`text-sm leading-7 text-slate-600 ${
                  !expandedDescription ? "line-clamp-2" : ""
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

        {/* =====================================================
            QUICK HIGHLIGHTS
        ====================================================== */}
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
                  {hotel.rating} Excellent
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {hotel.reviews.toLocaleString()} reviews
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
                  {hotel.distance}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wifi size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Free WiFi
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Available throughout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <BedDouble size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Luxury Rooms
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Comfortable stay
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT + BOOKING SUMMARY
        ====================================================== */}
        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[1fr_350px]">
          <div>
            {/* ================================================
                ABOUT
            ================================================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  ABOUT THE HOTEL
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  A comfortable stay in Dubai Marina
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-[1fr_250px]">
                <div>
                  <p className="text-sm leading-7 text-slate-600">
                    Marina View Hotel offers a comfortable and
                    modern stay in one of Dubai's most popular
                    neighbourhoods. Guests can enjoy easy access
                    to shopping, restaurants, beaches and major
                    attractions.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    With spacious rooms, complimentary WiFi,
                    breakfast options and a range of modern
                    facilities, the hotel is suitable for both
                    leisure and business travellers.
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
                        2:00 PM
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Clock3 size={14} />
                        Check-out
                      </span>

                      <span className="font-semibold text-slate-800">
                        12:00 PM
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500">
                        Rooms
                      </span>

                      <span className="font-semibold text-slate-800">
                        120+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================
                AMENITIES
            ================================================= */}
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
                  24+ amenities
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;

                  return (
                    <div
                      key={amenity.title}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <Icon size={17} />
                      </div>

                      <p className="mt-3 text-xs font-bold text-slate-900">
                        {amenity.title}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {amenity.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="mt-5 text-xs font-semibold text-blue-600"
              >
                View all amenities →
              </button>
            </section>

            {/* ================================================
                ROOMS
            ================================================= */}
            <section className="mt-6" id="rooms">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  ROOMS & RATES
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Choose your room
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a room that works best for your stay.
                </p>
              </div>

              <div className="space-y-4">
                {rooms.map((room) => {
                  const isSelected =
                    selectedRoom.id === room.id;

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
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden lg:h-full lg:min-h-[210px]">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />

                          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white">
                            {room.tag}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">
                                {room.name}
                              </h3>

                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <BedDouble size={14} />
                                  {room.bed}
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <Users size={14} />
                                  {room.guests} Guests
                                </span>

                                <span>
                                  {room.size}
                                </span>
                              </div>
                            </div>

                            {isSelected && (
                              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                <Check size={12} />
                                Selected
                              </span>
                            )}
                          </div>

                          <div className="mt-5 space-y-2">
                            {room.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-center gap-2 text-xs text-slate-600"
                              >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                  <Check size={11} />
                                </span>

                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
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
                              setSelectedRoom(room)
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

                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================================================
                REVIEWS
            ================================================= */}
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
                {/* Rating */}
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <div className="text-4xl font-bold text-slate-900">
                    {hotel.rating}
                  </div>

                  <div className="mt-2 flex justify-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill="currentColor"
                        />
                      )
                    )}
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {hotel.reviews.toLocaleString()} verified
                    reviews
                  </p>

                  <div className="mt-5 space-y-2 text-left">
                    {[
                      ["Cleanliness", "4.7"],
                      ["Location", "4.8"],
                      ["Comfort", "4.6"],
                      ["Service", "4.5"],
                      ["Value", "4.3"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
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
                                Number(value) * 20
                              }%`,
                            }}
                          />
                        </div>

                        <span className="text-[10px] font-semibold text-slate-700">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div
                      key={`${review.name}-${review.date}`}
                      className="rounded-2xl border border-slate-100 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                            {review.name
                              .split(" ")
                              .map((item) => item[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {review.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Stayed in {review.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({
                            length: review.rating,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              size={12}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-6 text-slate-600">
                        {review.text}
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-1 text-xs font-semibold text-blue-600"
                  >
                    View all reviews →
                  </button>
                </div>
              </div>
            </section>

            {/* ================================================
                LOCATION
            ================================================= */}
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
                        Dubai Marina, Dubai
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        A convenient location close to
                        restaurants, shopping and major Dubai
                        attractions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      ["Dubai Marina", "1.2 km"],
                      ["Marina Beach", "1.5 km"],
                      ["Dubai Mall", "18 km"],
                      ["Burj Khalifa", "18.5 km"],
                      ["Dubai Airport", "32 km"],
                    ].map(([place, distance]) => (
                      <div
                        key={place}
                        className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs last:border-0"
                      >
                        <span className="text-slate-500">
                          {place}
                        </span>

                        <span className="font-semibold text-slate-800">
                          {distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100">
                  {/* Map lines */}
                  <div className="absolute left-1/4 top-0 h-full w-px rotate-12 bg-blue-200/70" />
                  <div className="absolute left-1/2 top-0 h-full w-px -rotate-12 bg-blue-200/60" />
                  <div className="absolute left-3/4 top-0 h-full w-px rotate-12 bg-blue-200/50" />
                  <div className="absolute left-0 top-1/3 h-px w-full rotate-6 bg-white" />
                  <div className="absolute left-0 top-2/3 h-px w-full -rotate-6 bg-white" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-ping rounded-full bg-blue-500/20" />

                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
                        <MapPin size={20} fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                    <p className="text-xs font-bold text-slate-900">
                      Marina View Hotel
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Dubai Marina
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

            {/* ================================================
                POLICIES
            ================================================= */}
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
                    Check-in & Check-out
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Check-in from 2:00 PM. Check-out before
                    12:00 PM.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Cancellation
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Cancellation policy depends on your selected
                    room and booking plan.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Child Policy
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Children are welcome. Additional charges may
                    apply depending on room type.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Payment Policy
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Major cards and secure online payment methods
                    are accepted.
                  </p>
                </div>
              </div>
            </section>

            {/* ================================================
                FAQ
            ================================================= */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  FAQ
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Frequently asked questions
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(
                            isOpen ? null : index
                          )
                        }
                        className="flex w-full items-center justify-between gap-5 py-4 text-left"
                      >
                        <span className="text-sm font-semibold text-slate-800">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={17}
                          className={`shrink-0 text-slate-400 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-4 pr-8 text-xs leading-6 text-slate-500">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ===================================================
              BOOKING SIDEBAR
          ==================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              {/* Header */}
              <div className="border-b border-slate-100 p-5">
                <p className="text-xs font-semibold text-slate-400">
                  YOUR STAY
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedRoom.name}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin
                    size={13}
                    className="text-blue-600"
                  />
                  {hotel.location}
                </div>
              </div>

              {/* Dates */}
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
                      value={checkIn}
                      onChange={(e) =>
                        setCheckIn(e.target.value)
                      }
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
                      value={checkOut}
                      onChange={(e) =>
                        setCheckOut(e.target.value)
                      }
                      className="min-w-0 bg-transparent text-xs font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guest */}
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
                      onClick={decreaseGuests}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-xs font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={increaseGuests}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    ₹
                    {selectedRoom.price.toLocaleString(
                      "en-IN"
                    )}{" "}
                    × {bookingSummary.nights} nights
                  </span>

                  <span className="font-semibold text-slate-800">
                    ₹
                    {bookingSummary.roomTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

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

                <Link to='/hotelbook'>
                    <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Continue to Book
                  <ArrowRight size={17} />
                </button>
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck
                    size={13}
                    className="text-emerald-500"
                  />
                  Secure booking with Tripora
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <MessageCircle size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Need help?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Our support team is available 24/7 to help
                    with your booking.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600"
                  >
                    Contact Support
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================================
            SIMILAR HOTELS
        ====================================================== */}
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
            {similarHotels.map((item) => (
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
                        .replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                      View
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* =======================================================
          MOBILE BOOKING BAR
      ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400">
              From
            </p>

            <p className="truncate text-lg font-bold text-slate-900">
              ₹
              {selectedRoom.price.toLocaleString(
                "en-IN"
              )}
              <span className="ml-1 text-[10px] font-normal text-slate-400">
                / night
              </span>
            </p>
          </div>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Select Room
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* =======================================================
          PHOTO MODAL
      ======================================================== */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4">
          <button
            type="button"
            onClick={() => setShowAllPhotos(false)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={hotel.images[activeImage]}
                alt={hotel.name}
                className="max-h-[75vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={previousImage}
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
              {hotel.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                    activeImage === index
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
              ))}
            </div>

            <div className="mt-3 text-center text-xs text-slate-300">
              {activeImage + 1} / {hotel.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;

