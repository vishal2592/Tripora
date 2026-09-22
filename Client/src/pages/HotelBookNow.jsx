import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
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
  guests: "2 Guests",
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
  return new Intl.NumberFormat("en-IN").format(price);
};

const parseDate = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const calculateNights = (checkIn, checkOut) => {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!start || !end || end <= start) {
    return 1;
  }

  const difference = end.getTime() - start.getTime();

  return Math.max(1, Math.ceil(difference / (1000 * 60 * 60 * 24)));
};

const formatDate = (dateValue) => {
  const date = parseDate(dateValue);

  if (!date) {
    return dateValue || "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const HotelBookNow = () => {
  const { id } = useParams();
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

  const roomPrice =
    Number(selectedRoom.price || selectedRoom.startingPrice || 7499);

  const totalRoomPrice = roomPrice * nights;

  const taxes = Number(
    bookingState.taxes ||
      bookingState.tax ||
      1250
  );

  const totalPrice = totalRoomPrice + taxes;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    specialRequest: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guestCountText = useMemo(() => {
    if (typeof guests === "number") {
      return `${guests} ${guests === 1 ? "Guest" : "Guests"}`;
    }

    if (typeof guests === "string") {
      return guests;
    }

    if (guests?.adults || guests?.children) {
      const adults = Number(guests.adults || 0);
      const children = Number(guests.children || 0);
      const total = adults + children;

      return `${total} ${total === 1 ? "Guest" : "Guests"}`;
    }

    return "2 Guests";
  }, [guests]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!agreeTerms) {
      newErrors.terms =
        "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    navigate(`/hotels/${id}/payment`, {
      state: {
        hotel,
        selectedRoom,
        checkIn,
        checkOut,
        guests,
        nights,
        taxes,
        totalRoomPrice,
        totalPrice,
        guestDetails: formData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Hotel size={18} />
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                Tripora
              </span>
            </div>

            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
              <LockKeyhole size={16} className="text-emerald-600" />
              Secure Booking
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check size={16} strokeWidth={2.5} />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Hotel & Room
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-blue-600 sm:mx-4" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
                2
              </div>

              <span className="hidden text-sm font-semibold text-blue-600 sm:block">
                Guest Details
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-slate-200 sm:mx-4" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400">
                3
              </div>

              <span className="hidden text-sm font-medium text-slate-400 sm:block">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-slate-200 sm:mx-4" />

            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400">
                4
              </div>

              <span className="hidden text-sm font-medium text-slate-400 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page heading */}
        <div className="mb-6">
          <p className="mb-1 text-sm font-semibold text-blue-600">
            HOTEL BOOKING
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Complete your booking
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Enter your guest details to continue to secure payment.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* =================================================
              LEFT - GUEST DETAILS
          ================================================== */}
          <div className="space-y-5">
            <form
              onSubmit={handleContinue}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              {/* Section heading */}
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Guest Details
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    Please enter the details of the primary guest.
                  </p>
                </div>
              </div>

              {/* First + Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    First Name
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.firstName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>

                  {errors.firstName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Last Name
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.lastName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>

                  {errors.lastName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                  <span className="text-red-500"> *</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}

                <p className="mt-1.5 text-xs text-slate-400">
                  Booking confirmation will be sent to this email.
                </p>
              </div>

              {/* Mobile */}
              <div className="mt-5">
                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mobile Number
                  <span className="text-red-500"> *</span>
                </label>

                <div className="flex gap-2">
                  <div className="flex h-12 w-[82px] shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
                    <Phone size={16} className="text-slate-400" />
                    +91
                  </div>

                  <div className="relative flex-1">
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(event) => {
                        const value = event.target.value.replace(
                          /\D/g,
                          ""
                        );

                        setFormData((previous) => ({
                          ...previous,
                          mobile: value,
                        }));

                        setErrors((previous) => ({
                          ...previous,
                          mobile: "",
                        }));
                      }}
                      placeholder="Enter mobile number"
                      className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.mobile
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>
                </div>

                {errors.mobile && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Special Request */}
              <div className="mt-5">
                <label
                  htmlFor="specialRequest"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Special Request
                  <span className="ml-1 font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="specialRequest"
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                  rows={4}
                  placeholder="High floor, early check-in, extra bed, etc."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Requests are subject to hotel availability.
                </p>
              </div>

              {/* Terms */}
              <div
                className={`mt-6 rounded-xl border p-4 ${
                  errors.terms
                    ? "border-red-200 bg-red-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(event) => {
                      setAgreeTerms(event.target.checked);

                      setErrors((previous) => ({
                        ...previous,
                        terms: "",
                      }));
                    }}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I agree to Tripora's{" "}
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/termsandconditions")
                      }
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and booking policies.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Mobile CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
              >
                {isSubmitting ? "Please wait..." : "Continue to Payment"}
                {!isSubmitting && <ArrowRight size={17} />}
              </button>
            </form>

            {/* =================================================
                TRUST SECTION
            ================================================== */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-base font-bold text-slate-900">
                Book with confidence
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Secure Payment
                    </p>
                    <p className="text-xs text-slate-500">
                      Your details are protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Instant Confirmation
                    </p>
                    <p className="text-xs text-slate-500">
                      Get booking confirmation quickly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      24/7 Support
                    </p>
                    <p className="text-xs text-slate-500">
                      We're here whenever you need us
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Safe Checkout
                    </p>
                    <p className="text-xs text-slate-500">
                      Trusted payment experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT - BOOKING SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Your Booking
                </h2>
              </div>

              {/* Hotel */}
              <div className="p-5">
                <div className="flex gap-4">
                  <img
                    src={hotel.image || fallbackHotel.image}
                    alt={hotel.name || "Hotel"}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-900">
                      {hotel.name || fallbackHotel.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5">
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
                    </div>

                    <div className="mt-1.5 flex items-start gap-1 text-xs text-slate-500">
                      <MapPin
                        size={13}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        {hotel.location ||
                          fallbackHotel.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays size={14} />
                      Check-in
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(checkIn)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays size={14} />
                      Check-out
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(checkOut)}
                    </p>
                  </div>
                </div>

                {/* Nights / guests */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {nights} {nights === 1 ? "Night" : "Nights"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={14} />
                    {guestCountText}
                  </span>
                </div>

                {/* Room */}
                <div className="mt-5 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {selectedRoom.name ||
                          fallbackRoom.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {selectedRoom.bed ||
                          fallbackRoom.bed}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-sm font-bold text-slate-900">
                      ₹{formatPrice(roomPrice)}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2 size={14} />
                      {selectedRoom.meal ||
                        fallbackRoom.meal}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2 size={14} />
                      {selectedRoom.cancellation ||
                        fallbackRoom.cancellation}
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      ₹{formatPrice(roomPrice)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{formatPrice(totalRoomPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Taxes & Fees</span>

                    <span className="font-semibold text-slate-800">
                      ₹{formatPrice(taxes)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Total Amount
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Inclusive of applicable taxes
                        </p>
                      </div>

                      <p className="text-xl font-extrabold text-blue-600">
                        ₹{formatPrice(totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop CTA */}
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className="mt-5 hidden w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:flex"
                >
                  {isSubmitting
                    ? "Please wait..."
                    : "Continue to Payment"}

                  {!isSubmitting && (
                    <ArrowRight size={17} />
                  )}
                </button>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-3">
                  <LockKeyhole
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-blue-700">
                    You won't be charged until you complete the
                    payment step.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation note */}
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Free cancellation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Cancellation terms may vary depending on the
                    selected room and hotel policy.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HotelBookNow;