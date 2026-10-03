import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hotel,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
  Users,
} from "lucide-react";

import { getHotelById } from "../redux/slicer/hotelSlice";
import { setBookingData } from "../redux/slicer/hotelBookingSlice";

// =========================================================
// FALLBACK HOTEL
// =========================================================

const fallbackHotel = {
  id: "",

  name: "Marina View Hotel",

  location: "Dubai Marina, Dubai",

  city: "Dubai",

  state: "",

  country: "UAE",

  address: "",

  rating: 4.6,

  reviews: 1248,

  price: 7499,

  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
};

// =========================================================
// FALLBACK ROOM
// =========================================================

const fallbackRoom = {
  id: 1,

  name: "Deluxe Room",

  price: 7499,

  bed: "1 King Bed",

  guests: 2,

  meal: "Breakfast Included",

  cancellation: "Free Cancellation",
};

// =========================================================
// FALLBACK BOOKING
// =========================================================

const fallbackBooking = {
  checkIn: "20 Sep 2026",

  checkOut: "23 Sep 2026",

  nights: 3,

  guests: 2,
};

// =========================================================
// HELPERS
// =========================================================

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(
    Number(price || 0)
  );
};

const parseDate = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const calculateNights = (
  checkIn,
  checkOut
) => {
  const start = parseDate(checkIn);

  const end = parseDate(checkOut);

  if (
    !start ||
    !end ||
    end <= start
  ) {
    return 1;
  }

  const difference =
    end.getTime() -
    start.getTime();

  return Math.max(
    1,
    Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
};

const formatDate = (dateValue) => {
  const date = parseDate(dateValue);

  if (!date) {
    return dateValue || "-";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// =========================================================
// COMPONENT
// =========================================================

const HotelBookNow = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [searchParams] =
    useSearchParams();

  // =======================================================
  // QUERY PARAMS
  // =======================================================

  const hotelId =
    searchParams.get("hotelId");

  const roomId =
    searchParams.get("roomId");

  const checkInParam =
    searchParams.get("checkIn");

  const checkOutParam =
    searchParams.get("checkOut");

  const guestsParam =
    searchParams.get("guests");

  const nightsParam =
    searchParams.get("nights");

  const roomPriceParam =
    searchParams.get("roomPrice");

  const roomTotalParam =
    searchParams.get("roomTotal");

  const taxesParam =
    searchParams.get("taxes");

  const totalParam =
    searchParams.get("total");

  // =======================================================
  // REDUX
  // =======================================================

  const {
    hotel: apiHotel,
    loading: hotelLoading,
    error: hotelError,
  } = useSelector(
    (state) => state.hotel
  );

  // =======================================================
  // BOOKING FORM
  // =======================================================

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      specialRequest: "",
    });

  const [errors, setErrors] =
    useState({});

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // =======================================================
  // GET HOTEL
  // =======================================================

  useEffect(() => {
    if (!hotelId) {
      console.log(
        "HOTEL ID NOT FOUND IN URL"
      );

      return;
    }

    console.log(
      "HOTEL BOOK PAGE HOTEL ID:",
      hotelId
    );

    dispatch(
      getHotelById(hotelId)
    );
  }, [
    dispatch,
    hotelId,
  ]);

  // =======================================================
  // HOTEL NORMALIZATION
  // =======================================================

  const hotel = useMemo(() => {
    if (!apiHotel) {
      return fallbackHotel;
    }

    return {
      ...fallbackHotel,

      // IMPORTANT:
      // Keep actual MongoDB hotel _id
      id: apiHotel._id,

      name:
        apiHotel.hotelName ||
        "Hotel",

      location:
        [
          apiHotel.city,
          apiHotel.state,
          apiHotel.country,
        ]
          .filter(Boolean)
          .join(", ") ||
        apiHotel.address ||
        "Location unavailable",

      city:
        apiHotel.city || "",

      state:
        apiHotel.state || "",

      country:
        apiHotel.country || "",

      address:
        apiHotel.address || "",

      rating: Number(
        apiHotel.rating ||
          apiHotel.starRating ||
          0
      ),

      reviews: Number(
        apiHotel.reviews || 0
      ),

      image:
        apiHotel.image ||
        apiHotel.images?.[0] ||
        fallbackHotel.image,

      price: Number(
        apiHotel.price || 0
      ),

      rooms: Number(
        apiHotel.rooms || 0
      ),

      checkIn:
        apiHotel.checkIn ||
        "02:00 PM",

      checkOut:
        apiHotel.checkOut ||
        "12:00 PM",

      amenities:
        Array.isArray(
          apiHotel.amenities
        )
          ? apiHotel.amenities
          : [],
    };
  }, [apiHotel]);

  // =======================================================
  // LOCAL ROOM DATA
  // =======================================================

  const rooms = useMemo(() => {
    const basePrice = Number(
      hotel.price ||
        fallbackRoom.price
    );

    return [
      {
        id: 1,

        name: "Deluxe Room",

        price: basePrice,

        bed: "1 King Bed",

        guests: 2,

        meal: "Breakfast Included",

        cancellation:
          "Free Cancellation",
      },

      {
        id: 2,

        name: "Premium Room",

        price: Math.round(
          basePrice * 1.2
        ),

        bed: "1 King Bed",

        guests: 2,

        meal: "Breakfast Included",

        cancellation:
          "Free Cancellation",
      },

      {
        id: 3,

        name: "Family Suite",

        price: Math.round(
          basePrice * 1.4
        ),

        bed:
          "1 King Bed + 1 Sofa Bed",

        guests: 4,

        meal: "Breakfast Included",

        cancellation:
          "Free Cancellation",
      },
    ];
  }, [hotel.price]);

  // =======================================================
  // SELECTED ROOM
  // =======================================================

  const selectedRoom = useMemo(() => {
    if (roomId) {
      const foundRoom =
        rooms.find(
          (room) =>
            String(room.id) ===
            String(roomId)
        );

      if (foundRoom) {
        return foundRoom;
      }
    }

    return (
      rooms[0] ||
      fallbackRoom
    );
  }, [
    roomId,
    rooms,
  ]);

  // =======================================================
  // BOOKING DATA
  // =======================================================

  const checkIn =
    checkInParam ||
    fallbackBooking.checkIn;

  const checkOut =
    checkOutParam ||
    fallbackBooking.checkOut;

  const guests = Math.max(
    1,
    Number(
      guestsParam ||
        fallbackBooking.guests
    )
  );

  const calculatedNights =
    calculateNights(
      checkIn,
      checkOut
    );

  const nights = Math.max(
    1,
    Number(
      nightsParam ||
        calculatedNights
    )
  );

  // =======================================================
  // PRICE CALCULATION
  // =======================================================

  const roomPrice = Number(
    roomPriceParam ||
      selectedRoom?.price ||
      hotel.price ||
      fallbackRoom.price
  );

  const includedGuests =
    Number(
      selectedRoom?.guests || 2
    );

  const extraGuests = Math.max(
    0,
    guests - includedGuests
  );

  /*
    Extra guest fee:
    10% of room price
    per extra guest
    per night.
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

  const calculatedRoomTotal =
    baseRoomTotal +
    extraGuestTotal;

  const totalRoomPrice = Number(
    roomTotalParam ||
      calculatedRoomTotal
  );

  const taxes = Number(
    taxesParam ||
      Math.round(
        totalRoomPrice * 0.12
      )
  );

  const totalPrice = Number(
    totalParam ||
      totalRoomPrice + taxes
  );

  // =======================================================
  // INPUT HANDLER
  // =======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );

    setErrors(
      (previous) => ({
        ...previous,

        [name]: "",
      })
    );
  };

  // =======================================================
  // VALIDATION
  // =======================================================

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.firstName.trim()
    ) {
      newErrors.firstName =
        "First name is required";
    }

    if (
      !formData.lastName.trim()
    ) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        "Mobile number is required";
    } else if (
      !/^\d{10}$/.test(
        formData.mobile
      )
    ) {
      newErrors.mobile =
        "Enter a valid 10 digit mobile number";
    }

    if (!termsAccepted) {
      newErrors.terms =
        "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // =======================================================
  // CONTINUE TO PAYMENT
  // =======================================================

  const handleContinue = () => {
    // Make sure actual MongoDB hotel ID exists
    if (!hotelId) {
      setErrors({
        general:
          "Hotel information is missing. Please go back and select the hotel again.",
      });

      return;
    }

    // Validate guest form
    if (!validateForm()) {
      return;
    }

    // Same guest details will be used in
    // Redux and navigation state
    const bookingGuestDetails = {
      ...formData,
      countryCode: "+91",
    };

    setIsSubmitting(true);

    // =====================================================
    // SAVE BOOKING DATA IN REDUX
    // =====================================================

    dispatch(
      setBookingData({
        selectedHotel: hotel,

        // Actual selected room
        roomDetails: selectedRoom,

        checkIn,

        checkOut,

        nights,

        guests,

        guestDetails:
          bookingGuestDetails,

        roomTotal:
          totalRoomPrice,

        taxes,

        totalAmount:
          totalPrice,

        // IMPORTANT:
        // Actual payment method is Razorpay
        paymentMethod: "razorpay",
      })
    );

    // =====================================================
    // GO TO PAYMENT PAGE
    // =====================================================

    navigate(
      `/hotels/${hotelId}/payment`,
      {
        state: {
          // IMPORTANT:
          // Actual MongoDB Hotel _id
          hotelId,

          // Local/synthetic room id
          roomId,

          hotel,

          selectedRoom,

          checkIn,

          checkOut,

          guests,

          nights,

          roomPrice,

          baseRoomTotal,

          extraGuests,

          extraGuestFeePerNight,

          extraGuestTotal,

          totalRoomPrice,

          taxes,

          totalPrice,

          guestDetails:
            bookingGuestDetails,

          // Keep payment information
          // available to HotelPayment
          paymentMethod: "razorpay",
        },
      }
    );
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (
    hotelLoading &&
    !apiHotel
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // HOTEL ERROR
  // =======================================================

  if (
    hotelError &&
    !apiHotel
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Hotel size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to load hotel
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {hotelError}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft
              size={16}
            />

            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />

            Back
          </button>

          <div className="flex items-center gap-2">
            <ShieldCheck
              size={18}
              className="text-emerald-500"
            />

            <span className="text-xs font-semibold text-slate-500">
              Secure Booking
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {/* STEP 1 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                1
              </div>

              <span className="hidden text-xs font-semibold text-blue-600 sm:block">
                Hotel & Room
              </span>
            </div>

            <div className="h-px flex-1 bg-blue-200" />

            {/* STEP 2 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                2
              </div>

              <span className="hidden text-xs font-semibold text-blue-600 sm:block">
                Guest Details
              </span>
            </div>

            <div className="h-px flex-1 bg-slate-200" />

            {/* STEP 3 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
                3
              </div>

              <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                Payment
              </span>
            </div>

            <div className="h-px flex-1 bg-slate-200" />

            {/* STEP 4 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
                4
              </div>

              <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid items-start gap-7 lg:grid-cols-[1fr_380px]">
          {/* =================================================
              LEFT
          ================================================== */}

          <div>
            {/* TITLE */}

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Guest Details
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Enter your details
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Please provide the guest
                information required to
                complete your hotel booking.
              </p>
            </div>

            {/* HOTEL SUMMARY */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-28 w-full rounded-xl object-cover sm:w-40"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {hotel.name}
                    </h2>

                    {hotel.rating >
                      0 && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                        <Star
                          size={11}
                          fill="currentColor"
                        />

                        {
                          hotel.rating
                        }
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin
                      size={13}
                      className="text-blue-600"
                    />

                    {hotel.location}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays
                        size={14}
                        className="text-blue-600"
                      />

                      {formatDate(
                        checkIn
                      )}{" "}
                      -{" "}
                      {formatDate(
                        checkOut
                      )}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3
                        size={14}
                        className="text-blue-600"
                      />

                      {nights}{" "}
                      {nights === 1
                        ? "Night"
                        : "Nights"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Users
                        size={14}
                        className="text-blue-600"
                      />

                      {guests}{" "}
                      {guests === 1
                        ? "Guest"
                        : "Guests"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ROOM */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600">
                  SELECTED ROOM
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedRoom.name}
                </h2>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedRoom.name}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Hotel
                          size={14}
                        />

                        {
                          selectedRoom.bed
                        }
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Users
                          size={14}
                        />

                        {
                          selectedRoom.guests
                        }{" "}
                        Guests included
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                        {
                          selectedRoom.meal
                        }
                      </span>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                        {
                          selectedRoom.cancellation
                        }
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <p className="text-xs text-slate-400">
                      Per night
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹
                      {formatPrice(
                        roomPrice
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GUEST FORM */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <User size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Primary Guest
                    </p>

                    <p className="text-xs text-slate-400">
                      Enter the details of
                      the main guest.
                    </p>
                  </div>
                </div>
              </div>

              {errors.general && (
                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  {errors.general}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* FIRST NAME */}

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    First Name
                  </label>

                  <div
                    className={`mt-2 flex items-center gap-2 rounded-xl border bg-white px-3 ${
                      errors.firstName
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                  >
                    <User
                      size={16}
                      className="text-slate-400"
                    />

                    <input
                      type="text"
                      name="firstName"
                      value={
                        formData.firstName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter first name"
                      className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {errors.firstName && (
                    <p className="mt-1.5 text-[10px] font-medium text-red-500">
                      {
                        errors.firstName
                      }
                    </p>
                  )}
                </div>

                {/* LAST NAME */}

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Last Name
                  </label>

                  <div
                    className={`mt-2 flex items-center gap-2 rounded-xl border bg-white px-3 ${
                      errors.lastName
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                  >
                    <User
                      size={16}
                      className="text-slate-400"
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={
                        formData.lastName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter last name"
                      className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {errors.lastName && (
                    <p className="mt-1.5 text-[10px] font-medium text-red-500">
                      {
                        errors.lastName
                      }
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div
                    className={`mt-2 flex items-center gap-2 rounded-xl border bg-white px-3 ${
                      errors.email
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                  >
                    <Mail
                      size={16}
                      className="text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="you@example.com"
                      className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-[10px] font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* MOBILE */}

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Mobile Number
                  </label>

                  <div
                    className={`mt-2 flex items-center gap-2 rounded-xl border bg-white px-3 ${
                      errors.mobile
                        ? "border-red-300"
                        : "border-slate-200"
                    }`}
                  >
                    <Phone
                      size={16}
                      className="text-slate-400"
                    />

                    <span className="border-r border-slate-200 pr-2 text-xs font-semibold text-slate-500">
                      +91
                    </span>

                    <input
                      type="tel"
                      name="mobile"
                      value={
                        formData.mobile
                      }
                      onChange={(e) => {
                        const value =
                          e.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(
                              0,
                              10
                            );

                        setFormData(
                          (
                            previous
                          ) => ({
                            ...previous,
                            mobile:
                              value,
                          })
                        );

                        setErrors(
                          (
                            previous
                          ) => ({
                            ...previous,
                            mobile:
                              "",
                          })
                        );
                      }}
                      placeholder="10 digit mobile number"
                      className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {errors.mobile && (
                    <p className="mt-1.5 text-[10px] font-medium text-red-500">
                      {
                        errors.mobile
                      }
                    </p>
                  )}
                </div>

                {/* SPECIAL REQUEST */}

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Special Request{" "}
                    <span className="font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="specialRequest"
                    value={
                      formData.specialRequest
                    }
                    onChange={
                      handleChange
                    }
                    rows={4}
                    placeholder="Late check-in, room preference, special occasion..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* TERMS */}

              <div className="mt-6 border-t border-slate-100 pt-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={
                      termsAccepted
                    }
                    onChange={(e) => {
                      setTermsAccepted(
                        e.target.checked
                      );

                      setErrors(
                        (
                          previous
                        ) => ({
                          ...previous,
                          terms: "",
                        })
                      );
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to Tripora's{" "}
                    <span className="font-semibold text-blue-600">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-blue-600">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-[10px] font-medium text-red-500">
                    {errors.terms}
                  </p>
                )}
              </div>
            </section>

            {/* TRUST */}

            <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <ShieldCheck
                    size={19}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Your booking is secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your personal information
                    is protected using secure
                    booking technology.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT BOOKING SUMMARY
          ================================================== */}

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              {/* HOTEL IMAGE */}

              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-lg font-bold text-white">
                    {hotel.name}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                    <MapPin size={12} />

                    {hotel.location}
                  </p>
                </div>
              </div>

              {/* SUMMARY */}

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      BOOKING SUMMARY
                    </p>

                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      {selectedRoom.name}
                    </h3>
                  </div>

                  {hotel.rating >
                    0 && (
                    <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
                      <Star
                        size={12}
                        fill="currentColor"
                      />

                      {hotel.rating}
                    </span>
                  )}
                </div>

                {/* DATES */}

                <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200">
                  <div className="border-r border-slate-200 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Check-in
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      {formatDate(
                        checkIn
                      )}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {hotel.checkIn}
                    </p>
                  </div>

                  <div className="p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Check-out
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      {formatDate(
                        checkOut
                      )}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {hotel.checkOut}
                    </p>
                  </div>
                </div>

                {/* GUESTS */}

                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <Users
                      size={15}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                      Guests
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-900">
                    {guests}{" "}
                    {guests === 1
                      ? "Guest"
                      : "Guests"}
                  </span>
                </div>

                {/* NIGHT */}

                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                      Stay duration
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-900">
                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </span>
                </div>

                {/* ROOM */}

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      ₹
                      {formatPrice(
                        roomPrice
                      )}{" "}
                      × {nights}{" "}
                      nights
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹
                      {formatPrice(
                        baseRoomTotal
                      )}
                    </span>
                  </div>

                  {/* EXTRA GUEST */}

                  {extraGuests >
                    0 && (
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Extra guest ×{" "}
                        {nights} nights
                      </span>

                      <span className="font-semibold text-slate-800">
                        ₹
                        {formatPrice(
                          extraGuestTotal
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
                      {formatPrice(
                        taxes
                      )}
                    </span>
                  </div>

                  <div className="my-4 border-t border-dashed border-slate-200" />

                  {/* TOTAL */}

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        Total amount
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        ₹
                        {formatPrice(
                          totalPrice
                        )}
                      </p>
                    </div>

                    <span className="mb-1 text-[10px] text-slate-400">
                      incl. taxes
                    </span>
                  </div>
                </div>

                {/* CONTINUE */}

                <button
                  type="button"
                  onClick={
                    handleContinue
                  }
                  disabled={
                    isSubmitting
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Processing..."
                    : "Continue to Payment"}

                  {!isSubmitting && (
                    <ArrowRight
                      size={17}
                    />
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <LockKeyhole
                    size={12}
                    className="text-emerald-500"
                  />

                  Secure payment & booking
                </div>
              </div>
            </div>

            {/* CANCELLATION */}

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Free cancellation
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Cancellation availability
                    depends on your selected
                    room and booking policy.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-slate-400">
              Total
            </p>

            <p className="text-lg font-bold text-slate-900">
              ₹
              {formatPrice(
                totalPrice
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={
              handleContinue
            }
            disabled={
              isSubmitting
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting
              ? "Processing..."
              : "Continue to Payment"}

            {!isSubmitting && (
              <ArrowRight
                size={16}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelBookNow;