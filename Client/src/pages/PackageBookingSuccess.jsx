import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Home,
  Mail,
  MapPin,
  Plane,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

import { getSinglePackageBooking } from "../redux/slicer/packageBookingSlice";

const PackageBookingSuccess = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { state } = useLocation();

  const dispatch = useDispatch();

  const {
    booking: reduxBooking,
    singleLoading,
    error: bookingError,
  } = useSelector((state) => state.packageBooking);

  // =========================================================
  // BOOKING DATA
  // =========================================================

  const booking = state?.booking || reduxBooking;

  // =========================================================
  // FETCH BOOKING ON REFRESH
  // =========================================================
  useEffect(() => {
    /*
      bookingId URL me MongoDB _id hai.

      Example:
      /package-booking-success/68dabc1234567890abcdef12
    */

    if (!booking && bookingId) {
      dispatch(getSinglePackageBooking(bookingId));
    }
  }, [dispatch, bookingId, booking]);

  // =========================================================
  // PACKAGE DATA
  // =========================================================

  const packageData = useMemo(() => {
    const backendPackage = booking?.package;
    const packageDetails = booking?.packageDetails;

    const statePackage = state?.packageData;

    return {
      title:
        packageDetails?.name ||
        backendPackage?.name ||
        backendPackage?.title ||
        statePackage?.title ||
        statePackage?.name ||
        "Dubai Premium Escape",

      destination:
        packageDetails?.destination ||
        backendPackage?.destination?.name ||
        statePackage?.destination ||
        "Dubai, UAE",

      country:
        packageDetails?.country ||
        backendPackage?.destination?.country ||
        statePackage?.country ||
        "",

      duration:
        packageDetails?.duration ||
        backendPackage?.duration ||
        statePackage?.duration ||
        "5 Days / 4 Nights",

      image:
        packageDetails?.image ||
        backendPackage?.image ||
        statePackage?.image ||
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",

      rating:
        backendPackage?.rating ??
        statePackage?.rating ??
        null,

      reviews:
        backendPackage?.reviews ??
        statePackage?.reviews ??
        null,

      price:
        backendPackage?.price ??
        statePackage?.price ??
        34999,
    };
  }, [booking, state]);

  // =========================================================
  // TRAVELLERS
  // =========================================================

  const travellers = useMemo(() => {
    return (
      booking?.travellers ||
      state?.travellers || {
        adults: 2,
        children: 0,
        infants: 0,
      }
    );
  }, [booking, state]);

  // =========================================================
  // PASSENGERS
  // =========================================================

  const passengers = useMemo(() => {
    if (Array.isArray(booking?.passengers)) {
      return booking.passengers;
    }

    if (Array.isArray(state?.passengers)) {
      return state.passengers;
    }

    return [];
  }, [booking, state]);

  // =========================================================
  // PRIMARY PASSENGER
  // =========================================================

  const passenger = useMemo(() => {
    const backendPassenger = passengers[0];

    if (backendPassenger) {
      const nameParts = String(
        backendPassenger.fullName || ""
      )
        .trim()
        .split(/\s+/);

      return {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        fullName: backendPassenger.fullName || "",
        email: backendPassenger.email || "",
        mobile:
          backendPassenger.mobileNumber ||
          backendPassenger.mobile ||
          "",
        age: backendPassenger.age,
        gender: backendPassenger.gender,
      };
    }

    return (
      state?.passenger || {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
      }
    );
  }, [passengers, state]);

  // =========================================================
  // TRAVEL DATE
  // =========================================================

  const travelDate =
    booking?.travelDate ||
    state?.travelDate ||
    "20 September 2026";

  // =========================================================
  // PRICING
  // =========================================================

  const pricing = booking?.pricing || state?.pricing || {};

  const packageSubtotal =
    Number(pricing.subtotal) ||
    Number(state?.packageSubtotal) ||
    Number(packageData.price) ||
    34999;

  const taxes =
    pricing.taxes !== undefined
      ? Number(pricing.taxes)
      : Number(state?.taxes) ||
        Math.round(packageSubtotal * 0.05);

  const convenienceFee =
    pricing.convenienceFee !== undefined
      ? Number(pricing.convenienceFee)
      : Number(state?.convenienceFee) || 299;

  const totalAmount =
    pricing.totalAmount !== undefined
      ? Number(pricing.totalAmount)
      : Number(state?.totalAmount) ||
        packageSubtotal + taxes + convenienceFee;

  // =========================================================
  // PAYMENT METHOD
  // =========================================================

  const paymentMethod =
    state?.paymentMethod ||
    "Razorpay";

  // =========================================================
  // DISPLAY BOOKING ID
  // =========================================================

  /*
    IMPORTANT:

    bookingId from URL = MongoDB _id

    booking.bookingId = human-readable ID

    User ko human-readable booking ID dikhani hai.
  */

  const safeBookingId =
    booking?.bookingId ||
    state?.displayBookingId ||
    state?.booking?.bookingId ||
    "Booking ID unavailable";

  // =========================================================
  // TRAVELLER COUNT
  // =========================================================

  const travellerCount =
    Number(travellers.adults || 0) +
    Number(travellers.children || 0) +
    Number(travellers.infants || 0);

  // =========================================================
  // CURRENCY FORMAT
  // =========================================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatTravelDate = (date) => {
    if (!date) {
      return "20 September 2026";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // DOWNLOAD / PRINT
  // =========================================================

  const handleDownload = () => {
    window.print();
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!booking && singleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-7 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <Plane
              size={22}
              className="animate-pulse text-blue-600"
            />
          </div>

          <h2 className="mt-4 text-base font-black text-slate-900">
            Loading Booking Details
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Please wait while we load your confirmed booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/20">
              <Plane
                size={19}
                strokeWidth={2.2}
                className="text-white"
              />
            </div>

            <div className="text-left">
              <p className="text-[17px] font-black leading-none tracking-tight text-slate-900">
                Tripora
              </p>

              <p className="mt-0.5 text-[9px] font-semibold text-slate-400">
                Travel Your Way
              </p>
            </div>
          </button>

          {/* Secure booking */}
          <div className="hidden items-center gap-2 sm:flex">
            <ShieldCheck
              size={16}
              className="text-green-600"
            />

            <span className="text-xs font-semibold text-slate-600">
              Secure Booking
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* ================= SUCCESS HERO ================= */}
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50 sm:h-24 sm:w-24">
            <Check
              size={42}
              strokeWidth={3}
              className="text-green-600 sm:h-12 sm:w-12"
            />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-green-600">
            Payment Successful
          </p>

          <h1 className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Booking Confirmed!
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Your holiday package has been booked successfully.
            Your trip details are ready below.
          </p>

          {/* Booking ID */}
          <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <CheckCircle2
                size={17}
                className="text-blue-600"
              />
            </div>

            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Booking ID
              </p>

              <p className="text-sm font-black tracking-wide text-slate-900">
                {safeBookingId}
              </p>
            </div>
          </div>
        </section>

        {/* ================= FETCH ERROR ================= */}
        {bookingError && !booking && (
          <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
            <p className="text-sm font-extrabold text-red-900">
              Unable to load booking details
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700">
              {bookingError}
            </p>

            <button
              type="button"
              onClick={() =>
                bookingId &&
                dispatch(
                  getSinglePackageBooking(bookingId)
                )
              }
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </section>
        )}

        {/* ================= CONFIRMATION MESSAGE ================= */}
        <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
              <Mail
                size={17}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm font-extrabold text-green-900">
                Booking confirmation sent
              </p>

              <p className="mt-1 text-xs leading-5 text-green-800">
                Your booking confirmation and trip details will be
                available in My Bookings.
              </p>

              {passenger?.email && (
                <p className="mt-1 text-xs font-semibold text-green-700">
                  Confirmation email: {passenger.email}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ================= PACKAGE CARD ================= */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Your Holiday Package
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                  Package Details
                </h2>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-extrabold text-green-700">
                <Check
                  size={12}
                  strokeWidth={3}
                />
                Confirmed
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Image */}
              <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-52">
                <img
                  src={packageData.image}
                  alt={packageData.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    Holiday Package
                  </span>

                  {packageData.rating && (
                    <span className="text-[10px] font-bold text-slate-500">
                      ★ {packageData.rating}

                      {packageData.reviews
                        ? ` (${packageData.reviews})`
                        : ""}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-lg font-black text-slate-900">
                  {packageData.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin
                    size={14}
                    className="shrink-0 text-blue-600"
                  />

                  <span>
                    {packageData.destination}

                    {packageData.country &&
                    !packageData.destination
                      ?.toLowerCase()
                      ?.includes(
                        packageData.country.toLowerCase()
                      )
                      ? `, ${packageData.country}`
                      : ""}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Clock3
                    size={14}
                    className="shrink-0 text-blue-600"
                  />

                  <span>{packageData.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOOKING DETAILS ================= */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <CalendarDays
                size={16}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-sm font-black text-slate-900">
                Booking Details
              </h2>

              <p className="text-[10px] font-medium text-slate-400">
                Your confirmed trip information
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {/* Travel Date */}
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CalendarDays size={13} />

                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Travel Date
                </span>
              </div>

              <p className="mt-2 text-xs font-extrabold text-slate-900">
                {formatTravelDate(travelDate)}
              </p>
            </div>

            {/* Travellers */}
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Users size={13} />

                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Travellers
                </span>
              </div>

              <p className="mt-2 text-xs font-extrabold text-slate-900">
                {travellerCount}{" "}
                {travellerCount === 1
                  ? "Traveller"
                  : "Travellers"}
              </p>

              <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                {travellers.adults || 0} Adults

                {travellers.children
                  ? ` • ${travellers.children} Children`
                  : ""}

                {travellers.infants
                  ? ` • ${travellers.infants} Infants`
                  : ""}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle2 size={13} />

                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Status
                </span>
              </div>

              <p className="mt-2 text-xs font-extrabold text-green-600">
                {booking?.bookingStatus || "Confirmed"}
              </p>

              <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                Booking successful
              </p>
            </div>

            {/* Payment */}
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                <WalletCards size={13} />

                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Payment
                </span>
              </div>

              <p className="mt-2 text-xs font-extrabold text-slate-900">
                {booking?.paymentStatus || "Paid"}
              </p>

              <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                {paymentMethod}
              </p>
            </div>
          </div>
        </section>

        {/* ================= PASSENGER DETAILS ================= */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-black text-slate-900">
            Traveller Details
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* Primary Traveller */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Primary Traveller
              </p>

              <p className="mt-1 text-sm font-extrabold text-slate-900">
                {passenger?.fullName ||
                  `${passenger?.firstName || ""} ${
                    passenger?.lastName || ""
                  }`.trim() ||
                  "Traveller"}
              </p>

              {passenger?.gender && (
                <p className="mt-1 text-[10px] font-medium text-slate-400">
                  {passenger.gender}

                  {passenger.age !== undefined &&
                  passenger.age !== null
                    ? ` • ${passenger.age} years`
                    : ""}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Contact
              </p>

              <p className="mt-1 text-xs font-bold text-slate-700">
                {passenger?.mobile || "Contact number unavailable"}
              </p>

              <p className="mt-0.5 break-all text-[10px] font-medium text-slate-400">
                {passenger?.email || "Email unavailable"}
              </p>
            </div>
          </div>

          {/* Additional Travellers */}
          {passengers.length > 1 && (
            <div className="mt-4">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Additional Travellers
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {passengers
                  .slice(1)
                  .map((traveller, index) => (
                    <div
                      key={
                        traveller._id ||
                        `${traveller.fullName}-${index}`
                      }
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <p className="text-xs font-extrabold text-slate-800">
                        {traveller.fullName ||
                          `Traveller ${index + 2}`}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-slate-400">
                        {traveller.age !== undefined &&
                        traveller.age !== null
                          ? `${traveller.age} years`
                          : ""}

                        {traveller.gender
                          ? ` • ${traveller.gender}`
                          : ""}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* ================= PAYMENT SUMMARY ================= */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <WalletCards
                size={16}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-sm font-black text-slate-900">
                Payment Summary
              </h2>

              <p className="text-[10px] font-medium text-slate-400">
                Your payment has been successfully processed
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {/* Package Fare */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-medium text-slate-500">
                Package Fare
              </span>

              <span className="font-bold text-slate-900">
                {formatCurrency(packageSubtotal)}
              </span>
            </div>

            {/* Taxes */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-medium text-slate-500">
                Taxes & Fees
              </span>

              <span className="font-bold text-slate-900">
                {formatCurrency(taxes)}
              </span>
            </div>

            {/* Convenience Fee */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-medium text-slate-500">
                Convenience Fee
              </span>

              <span className="font-bold text-slate-900">
                {formatCurrency(convenienceFee)}
              </span>
            </div>

            {/* Total */}
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-black text-slate-900">
                  Total Paid
                </span>

                <span className="text-xl font-black text-blue-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= IMPORTANT INFO ================= */}
        <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
              <ShieldCheck
                size={18}
                className="text-blue-600"
              />
            </div>

            <div>
              <h3 className="text-sm font-black text-blue-900">
                What happens next?
              </h3>

              <div className="mt-2 space-y-1.5 text-xs leading-5 text-blue-800">
                <p>
                  • Your booking is confirmed and payment has
                  been received.
                </p>

                <p>
                  • Keep your booking ID{" "}
                  <span className="font-extrabold">
                    {safeBookingId}
                  </span>{" "}
                  for future reference.
                </p>

                <p>
                  • You can view your complete booking anytime
                  from My Bookings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACTION BUTTONS ================= */}
        <section className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {/* My Bookings */}
            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 sm:w-auto"
            >
              View My Bookings

              <ArrowRight size={15} />
            </button>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-extrabold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              <Download size={15} />

              Download Booking
            </button>

            {/* Home */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-extrabold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              <Home size={15} />

              Back to Home
            </button>
          </div>
        </section>

        {/* ================= FOOT NOTE ================= */}
        <div className="mt-7 flex items-center justify-center gap-2 text-center">
          <ShieldCheck
            size={14}
            className="shrink-0 text-green-600"
          />

          <p className="text-[10px] font-semibold text-slate-400">
            Your booking and payment information is securely
            protected by Tripora.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PackageBookingSuccess;