import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  FileText,
  Hotel,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
  Users,
} from "lucide-react";

const fallbackHotel = {
  name: "Marina View Hotel",
  location: "Dubai Marina, Dubai",
  rating: 4.6,
  reviews: 1248,
  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
};

const fallbackRoom = {
  name: "Deluxe Room",
  price: 7499,
  bed: "1 King Bed",
  meal: "Breakfast Included",
  cancellation: "Free Cancellation",
};

const fallbackBooking = {
  checkIn: "20 Sep 2026",
  checkOut: "23 Sep 2026",
  nights: 3,
  guests: 2,
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(
    Number(price || 0)
  );
};

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const formatDate = (value) => {
  const date = parseDate(value);

  if (!date) {
    return value || "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const calculateNights = (checkIn, checkOut) => {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!start || !end || end <= start) {
    return 1;
  }

  return Math.max(
    1,
    Math.ceil(
      (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
};

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingState = location.state || {};

  const hotel = bookingState.hotel || fallbackHotel;

  const selectedRoom =
    bookingState.selectedRoom ||
    bookingState.room ||
    fallbackRoom;

  const checkIn =
    bookingState.checkIn ||
    fallbackBooking.checkIn;

  const checkOut =
    bookingState.checkOut ||
    fallbackBooking.checkOut;

  const guests =
    bookingState.guests ||
    fallbackBooking.guests;

  const nights =
    bookingState.nights ||
    calculateNights(checkIn, checkOut);

  const roomPrice = Number(
    selectedRoom.price ||
      selectedRoom.startingPrice ||
      fallbackRoom.price
  );

  const totalRoomPrice =
    bookingState.totalRoomPrice ||
    roomPrice * nights;

  const taxes = Number(
    bookingState.taxes ||
      bookingState.tax ||
      1250
  );

  const totalPrice =
    bookingState.totalPrice ||
    totalRoomPrice + taxes;

  const guestDetails =
    bookingState.guestDetails || {};

  const paymentMethod =
    bookingState.paymentMethod || "UPI";

  const [copied, setCopied] = useState(false);

  const guestCountText = useMemo(() => {
    if (typeof guests === "number") {
      return `${guests} ${
        guests === 1 ? "Guest" : "Guests"
      }`;
    }

    if (typeof guests === "string") {
      return guests;
    }

    if (guests?.adults || guests?.children) {
      const adults = Number(guests.adults || 0);
      const children = Number(
        guests.children || 0
      );

      const total = adults + children;

      return `${total} ${
        total === 1 ? "Guest" : "Guests"
      }`;
    }

    return "2 Guests";
  }, [guests]);

  const displayBookingId =
    bookingId || "TRP58392147";

  const handleCopyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(
        displayBookingId
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(
        "Unable to copy booking ID:",
        error
      );
    }
  };

  const handleDownloadBooking = () => {
    /*
      Frontend demo download.

      Later this can be replaced with a real
      PDF booking confirmation generated from
      your backend.
    */

    const bookingText = `
TRIPORA - BOOKING CONFIRMATION

Booking ID: ${displayBookingId}

HOTEL
${hotel.name || fallbackHotel.name}
${hotel.location || fallbackHotel.location}

ROOM
${selectedRoom.name || fallbackRoom.name}
${selectedRoom.bed || fallbackRoom.bed}

CHECK-IN
${formatDate(checkIn)}

CHECK-OUT
${formatDate(checkOut)}

DURATION
${nights} ${nights === 1 ? "Night" : "Nights"}

GUESTS
${guestCountText}

PRIMARY GUEST
${guestDetails.firstName || "Guest"} ${
      guestDetails.lastName || ""
    }

EMAIL
${guestDetails.email || "Not provided"}

MOBILE
${guestDetails.mobile || "Not provided"}

PAYMENT METHOD
${paymentMethod.toUpperCase()}

ROOM PRICE
₹${formatPrice(totalRoomPrice)}

TAXES & FEES
₹${formatPrice(taxes)}

TOTAL PAID
₹${formatPrice(totalPrice)}

PAYMENT STATUS
PAID

Thank you for booking with Tripora.
    `.trim();

    const blob = new Blob([bookingText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${displayBookingId}-Tripora-Booking.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-2">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              <span>Tripora Home</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Hotel size={18} />
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                Tripora
              </span>
            </div>

            <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
              <ShieldCheck
                size={17}
                className="text-emerald-600"
              />
              Booking Confirmed
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Hotel & Room
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-emerald-500 sm:mx-4" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Guest Details
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-emerald-500 sm:mx-4" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-emerald-500 sm:mx-4" />

            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-emerald-600 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUCCESS HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6 lg:py-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
            <CheckCircle2
              size={42}
              strokeWidth={2}
            />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
            Booking Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your trip is all set!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your hotel booking has been successfully
            confirmed. We have sent the booking details
            to your registered email address.
          </p>

          {/* Booking ID */}
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
              Booking ID
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-lg font-extrabold tracking-wide text-slate-900">
                {displayBookingId}
              </span>

              <button
                type="button"
                onClick={handleCopyBookingId}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm transition hover:bg-blue-100"
                title="Copy booking ID"
              >
                {copied ? (
                  <Check size={15} />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-blue-600">
              {copied
                ? "Booking ID copied!"
                : "Keep this ID for future reference."}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                navigate("/my-bookings")
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              View My Booking
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={handleDownloadBooking}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              <Download size={16} />
              Download Booking
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
          {/* =================================================
              LEFT
          ================================================== */}
          <div className="space-y-6">
            {/* Hotel Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Your Stay
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Hotel Details
                  </h2>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />
                  Confirmed
                </span>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={
                    hotel.image ||
                    fallbackHotel.image
                  }
                  alt={
                    hotel.name ||
                    "Hotel"
                  }
                  className="h-52 w-full rounded-2xl object-cover sm:h-32 sm:w-44"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {hotel.name ||
                      fallbackHotel.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                      <Star
                        size={12}
                        fill="currentColor"
                      />

                      {hotel.rating || 4.6}
                    </span>

                    <span className="text-xs text-slate-500">
                      Excellent
                    </span>

                    {hotel.reviews && (
                      <span className="text-xs text-slate-400">
                        ({hotel.reviews} reviews)
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      {hotel.location ||
                        fallbackHotel.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {selectedRoom.name ||
                        fallbackRoom.name}
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {selectedRoom.bed ||
                        fallbackRoom.bed}
                    </span>

                    <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      {selectedRoom.meal ||
                        fallbackRoom.meal}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Stay Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Reservation
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Stay Details
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays size={15} />
                    Check-in
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {formatDate(checkIn)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    From 2:00 PM
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays size={15} />
                    Check-out
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {formatDate(checkOut)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Before 11:00 AM
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock3 size={15} />
                    Duration
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {guestCountText}
                  </p>
                </div>
              </div>
            </section>

            {/* Guest Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Primary Guest
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Guest Details
                </h2>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <User size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      {guestDetails.firstName ||
                        "Vishal"}{" "}
                      {guestDetails.lastName ||
                        "Kumar"}
                    </p>

                    <div className="mt-2 space-y-1.5">
                      <p className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail size={13} />
                        {guestDetails.email ||
                          "guest@example.com"}
                      </p>

                      <p className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone size={13} />
                        {guestDetails.mobile
                          ? `+91 ${guestDetails.mobile}`
                          : "+91 XXXXX XXXXX"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {guestDetails.specialRequest && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Special Request
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {guestDetails.specialRequest}
                  </p>
                </div>
              )}
            </section>

            {/* Important Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Good to know
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Important Information
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={17}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-bold text-slate-800">
                      Check-in time
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    From 2:00 PM
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={17}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-bold text-slate-800">
                      Check-out time
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Before 11:00 AM
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={17}
                      className="text-emerald-600"
                    />

                    <p className="text-sm font-bold text-emerald-800">
                      Cancellation
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-emerald-700">
                    {selectedRoom.cancellation ||
                      fallbackRoom.cancellation}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Users
                      size={17}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-bold text-slate-800">
                      Guests
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {guestCountText}
                  </p>
                </div>
              </div>
            </section>

            {/* What's Next */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Next Steps
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  What's Next?
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Booking confirmation sent
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your booking details have been
                      prepared for your trip.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Your hotel is confirmed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your room has been reserved
                      successfully.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Keep your booking ID
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use {displayBookingId} whenever
                      you need help with this booking.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Payment Summary
                </h2>
              </div>

              <div className="p-5">
                {/* Payment status */}
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-600">
                      Payment Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-800">
                      Payment Successful
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Check size={18} />
                  </div>
                </div>

                {/* Booking ID */}
                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Booking ID
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {displayBookingId}
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyBookingId}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {copied ? (
                        <>
                          <Check size={13} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Room price */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      Room ₹{formatPrice(roomPrice)} ×{" "}
                      {nights}{" "}
                      {nights === 1
                        ? "night"
                        : "nights"}
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹
                      {formatPrice(
                        totalRoomPrice
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Taxes & Fees</span>

                    <span className="font-semibold text-slate-800">
                      ₹{formatPrice(taxes)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Total Paid
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Including applicable taxes
                        </p>
                      </div>

                      <p className="text-xl font-extrabold text-blue-600">
                        ₹{formatPrice(totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-bold uppercase text-slate-800">
                    {paymentMethod}
                  </p>
                </div>

                {/* Hotel mini info */}
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="flex gap-3">
                    <img
                      src={
                        hotel.image ||
                        fallbackHotel.image
                      }
                      alt={
                        hotel.name ||
                        "Hotel"
                      }
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-bold text-slate-900">
                        {hotel.name ||
                          fallbackHotel.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                        <Star
                          size={11}
                          fill="currentColor"
                        />

                        {hotel.rating || 4.6}
                      </div>

                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={11} />

                        <span className="truncate">
                          {hotel.location ||
                            fallbackHotel.location}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download */}
                <button
                  type="button"
                  onClick={handleDownloadBooking}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Download size={16} />
                  Download Booking
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={19} />
              </div>

              <h3 className="mt-4 text-base font-bold">
                Need help with your booking?
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-300">
                Our Tripora support team is available
                24/7 to help you with your reservation.
              </p>

              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/my-bookings")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Manage Booking
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/contact")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-100">
                Your journey starts here
              </p>

              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                Ready to explore more?
              </h2>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-blue-100">
                Discover more destinations, hotels and
                holiday experiences with Tripora.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Tripora
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BookingSuccess;