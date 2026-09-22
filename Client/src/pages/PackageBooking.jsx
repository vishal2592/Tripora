import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  LockKeyhole,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const PackageBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const packageData = location.state?.packageData;

  const initialTravellers = location.state?.travellers || {
    adults: 2,
    children: 0,
    infants: 0,
  };

  const initialTravelDate =
    location.state?.travelDate || "25 September 2026";

  const [travelDate, setTravelDate] = useState(
    initialTravelDate
  );

  const [travellers, setTravellers] = useState({
    adults: initialTravellers.adults || 2,
    children: initialTravellers.children || 0,
    infants: initialTravellers.infants || 0,
  });

  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    specialRequest: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  /*
   * Fallback package
   * Agar PackageDetail se state nahi aaye,
   * tab bhi page break nahi hoga.
   */
  const fallbackPackage = {
    id: id || 1,
    title: "Dubai Premium Escape",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    price: 34999,
    oldPrice: 44999,
    rating: 4.8,
    reviews: 324,
    includes: [
      "Flights",
      "4 Star Hotel",
      "Airport Transfers",
      "Daily Breakfast",
    ],
  };

  const packageItem = packageData || fallbackPackage;

  /*
   * Different package data structures ko handle karne ke liye
   */
  const packagePrice = Number(
    packageItem.price ||
      packageItem.currentPrice ||
      packageItem.amount ||
      34999
  );

  const packageImage =
    packageItem.image ||
    packageItem.imageUrl ||
    packageItem.coverImage ||
    packageItem.heroImage ||
    fallbackPackage.image;

  const packageTitle =
    packageItem.title ||
    packageItem.name ||
    "Dubai Premium Escape";

  const packageDestination =
    packageItem.destination ||
    packageItem.location ||
    "Dubai, UAE";

  const packageDuration =
    packageItem.duration ||
    "5 Days / 4 Nights";

  /*
   * Pricing
   */
  const adultPrice = packagePrice;
  const childPrice = Math.round(packagePrice * 0.7);
  const infantPrice = Math.round(packagePrice * 0.25);

  const adultAmount = travellers.adults * adultPrice;
  const childAmount = travellers.children * childPrice;
  const infantAmount = travellers.infants * infantPrice;

  const packageSubtotal =
    adultAmount + childAmount + infantAmount;

  const taxes = Math.round(packageSubtotal * 0.05);

  const convenienceFee = 299;

  const totalAmount =
    packageSubtotal + taxes + convenienceFee;

  const totalTravellers =
    travellers.adults +
    travellers.children +
    travellers.infants;

  /*
   * Update traveller count
   */
  const updateTraveller = (type, action) => {
    setTravellers((prev) => {
      const current = prev[type];

      let nextValue =
        action === "increase"
          ? current + 1
          : current - 1;

      if (type === "adults") {
        nextValue = Math.max(1, nextValue);
      } else if (type === "children") {
        nextValue = Math.max(0, nextValue);
      } else if (type === "infants") {
        nextValue = Math.max(0, nextValue);
      }

      if (type === "infants" && nextValue > prev.adults) {
        return prev;
      }

      return {
        ...prev,
        [type]: nextValue,
      };
    });
  };

  /*
   * Input handler
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /*
   * Validation
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.mobile)
    ) {
      newErrors.mobile =
        "Enter a valid 10 digit mobile number";
    }

    if (!agreeTerms) {
      newErrors.terms =
        "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * Continue to payment
   */
  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }

    const bookingId = `TRP${Date.now()
      .toString()
      .slice(-8)}`;

    navigate(`/package-payment/${bookingId}`, {
      state: {
        bookingId,
        packageData: packageItem,
        travellers,
        travelDate,
        passenger: formData,
        packageSubtotal,
        taxes,
        convenienceFee,
        totalAmount,
      },
    });
  };

  /*
   * Format money
   */
  const formatPrice = (value) =>
    Number(value).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">
              Back
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <CreditCard size={17} />
            </div>

            <div>
              <p className="text-sm font-extrabold leading-none text-slate-900">
                Tripora
              </p>
              <p className="mt-1 text-[9px] font-semibold text-slate-400">
                Secure Booking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 sm:text-xs">
            <LockKeyhole size={14} />
            Secure
          </div>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white">
                1
              </div>

              <span className="text-[10px] font-bold text-blue-600 sm:text-xs">
                Traveller Details
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-slate-200 sm:mx-4 sm:w-16" />

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[10px] font-extrabold text-slate-400">
                2
              </div>

              <span className="hidden text-[10px] font-bold text-slate-400 sm:inline sm:text-xs">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-slate-200 sm:mx-4 sm:w-16" />

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[10px] font-extrabold text-slate-400">
                3
              </div>

              <span className="hidden text-[10px] font-bold text-slate-400 sm:inline sm:text-xs">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="mx-auto w-full max-w-7xl px-4 py-5 pb-28 sm:px-6 sm:py-4 lg:px-8 lg:pb-10">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 overflow-hidden text-[10px] font-semibold text-slate-400 sm:text-xs">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0 hover:text-blue-600"
          >
            Home
          </button>

          <span>/</span>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="shrink-0 hover:text-blue-600"
          >
            Packages
          </button>

          <span>/</span>

          <span className="truncate text-slate-600">
            Booking
          </span>
        </div>

        {/* Heading */}
        <div className="mb-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
            Almost there
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Complete Your Booking
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Enter your details to continue with your
            package booking.
          </p>
        </div>

        {/* =================================================
            GRID
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              LEFT
          ================================================== */}
          <div className="space-y-5">
            {/* Package Summary */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={packageImage}
                    alt={packageTitle}
                    className="h-44 w-full rounded-xl object-cover sm:h-28 sm:w-40"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-extrabold text-blue-600">
                        Holiday Package
                      </span>

                      {packageItem.rating && (
                        <span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-extrabold text-green-600">
                          ★ {packageItem.rating}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">
                      {packageTitle}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-slate-500 sm:text-xs">
                      <span className="inline-flex items-center gap-1">
                        <MapPin
                          size={13}
                          className="text-blue-600"
                        />
                        {packageDestination}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <CalendarDays
                          size={13}
                          className="text-blue-600"
                        />
                        {packageDuration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                    Travel Details
                  </h2>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Select your travel date and
                    travellers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Travel Date */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                    Travel Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) =>
                        setTravelDate(e.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Total Traveller */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                    Total Travellers
                  </label>

                  <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <Users
                      size={15}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-bold text-slate-700">
                      {totalTravellers}{" "}
                      {totalTravellers === 1
                        ? "Traveller"
                        : "Travellers"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Traveller Counters */}
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {/* Adults */}
                <TravellerCounter
                  title="Adults"
                  subtitle="12+ years"
                  value={travellers.adults}
                  onMinus={() =>
                    updateTraveller(
                      "adults",
                      "decrease"
                    )
                  }
                  onPlus={() =>
                    updateTraveller(
                      "adults",
                      "increase"
                    )
                  }
                  disableMinus={
                    travellers.adults <= 1
                  }
                />

                {/* Children */}
                <TravellerCounter
                  title="Children"
                  subtitle="2–11 years"
                  value={travellers.children}
                  onMinus={() =>
                    updateTraveller(
                      "children",
                      "decrease"
                    )
                  }
                  onPlus={() =>
                    updateTraveller(
                      "children",
                      "increase"
                    )
                  }
                  disableMinus={
                    travellers.children <= 0
                  }
                />

                {/* Infants */}
                <TravellerCounter
                  title="Infants"
                  subtitle="Below 2 years"
                  value={travellers.infants}
                  onMinus={() =>
                    updateTraveller(
                      "infants",
                      "decrease"
                    )
                  }
                  onPlus={() =>
                    updateTraveller(
                      "infants",
                      "increase"
                    )
                  }
                  disableMinus={
                    travellers.infants <= 0
                  }
                />
              </div>
            </section>

            {/* Primary Traveller */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                    Primary Traveller
                  </h2>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Enter details exactly as shown on
                    your travel document
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Title */}
                <FormField
                  label="Title"
                  required
                  error={errors.title}
                >
                  <div className="relative">
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Mr">
                        Mr
                      </option>
                      <option value="Mrs">
                        Mrs
                      </option>
                      <option value="Ms">
                        Ms
                      </option>
                      <option value="Dr">
                        Dr
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </FormField>

                {/* First Name */}
                <FormField
                  label="First Name"
                  required
                  error={errors.firstName}
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </FormField>

                {/* Last Name */}
                <FormField
                  label="Last Name"
                  required
                  error={errors.lastName}
                >
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </FormField>

                {/* DOB */}
                <FormField
                  label="Date of Birth"
                  required
                  error={errors.dob}
                >
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:ring-2 ${
                      errors.dob
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </FormField>

                {/* Gender */}
                <FormField
                  label="Gender"
                  required
                  error={errors.gender}
                >
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none focus:ring-2 ${
                        errors.gender
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">
                        Select gender
                      </option>
                      <option value="Male">
                        Male
                      </option>
                      <option value="Female">
                        Female
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </FormField>
              </div>
            </section>

            {/* Contact Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                    Contact Information
                  </h2>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Booking confirmation will be sent
                    here
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Email */}
                <FormField
                  label="Email Address"
                  required
                  error={errors.email}
                >
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                  </div>
                </FormField>

                {/* Mobile */}
                <FormField
                  label="Mobile Number"
                  required
                  error={errors.mobile}
                >
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="h-11 w-[78px] shrink-0 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-2 text-xs font-bold text-slate-700 outline-none"
                    >
                      <option value="+91">
                        +91
                      </option>
                      <option value="+1">
                        +1
                      </option>
                      <option value="+44">
                        +44
                      </option>
                      <option value="+971">
                        +971
                      </option>
                    </select>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="9876543210"
                      className={`h-11 min-w-0 flex-1 rounded-r-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                        errors.mobile
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                  </div>
                </FormField>
              </div>
            </section>

            {/* Special Request */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <FileText size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                    Special Request
                  </h2>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Optional
                  </p>
                </div>
              </div>

              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requirement, room preference or accessibility request..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </section>

            {/* Terms */}
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);

                    if (e.target.checked) {
                      setErrors((prev) => ({
                        ...prev,
                        terms: "",
                      }));
                    }
                  }}
                  className="mt-0.5 h-4 w-4 accent-blue-600"
                />

                <span className="text-[10px] leading-5 text-slate-500 sm:text-xs">
                  I agree to Tripora's{" "}
                  <button
                    type="button"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </button>
                  ,{" "}
                  <button
                    type="button"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </button>{" "}
                  and cancellation policy.
                </span>
              </label>

              {errors.terms && (
                <p className="mt-2 text-[10px] font-semibold text-red-500">
                  {errors.terms}
                </p>
              )}
            </section>
          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={packageImage}
                  alt={packageTitle}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/80">
                    Package
                  </p>

                  <h2 className="mt-1 text-base font-extrabold text-white">
                    {packageTitle}
                  </h2>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 sm:p-5">
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <SummaryRow
                    label="Destination"
                    value={packageDestination}
                  />

                  <SummaryRow
                    label="Duration"
                    value={packageDuration}
                  />

                  <SummaryRow
                    label="Travel Date"
                    value={
                      travelDate || "Select date"
                    }
                  />

                  <SummaryRow
                    label="Travellers"
                    value={`${totalTravellers} Traveller${
                      totalTravellers > 1
                        ? "s"
                        : ""
                    }`}
                  />
                </div>

                {/* Fare */}
                <div className="mt-4">
                  <p className="text-xs font-extrabold text-slate-900">
                    Fare Summary
                  </p>

                  <div className="mt-3 space-y-2.5">
                    <FareRow
                      label={`Adults × ${travellers.adults}`}
                      value={adultAmount}
                    />

                    {travellers.children > 0 && (
                      <FareRow
                        label={`Children × ${travellers.children}`}
                        value={childAmount}
                      />
                    )}

                    {travellers.infants > 0 && (
                      <FareRow
                        label={`Infants × ${travellers.infants}`}
                        value={infantAmount}
                      />
                    )}

                    <FareRow
                      label="Taxes & Fees"
                      value={taxes}
                    />

                    <FareRow
                      label="Convenience Fee"
                      value={convenienceFee}
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 rounded-xl bg-blue-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">
                      Total Amount
                    </span>

                    <span className="text-xl font-extrabold text-blue-700">
                      ₹{formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <SecurityItem text="Secure Payment" />
                  <SecurityItem text="Instant Confirmation" />
                </div>

                {/* Desktop Continue */}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-4 hidden h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 sm:flex"
                >
                  Continue to Payment
                  <ArrowRight size={16} />
                </button>

                <p className="mt-3 text-center text-[9px] leading-4 text-slate-400">
                  Your payment information is protected
                  with industry-standard security.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] sm:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-semibold text-slate-400">
              Total Amount
            </p>

            <p className="mt-0.5 text-lg font-extrabold leading-tight text-slate-900">
              ₹{formatPrice(totalAmount)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-extrabold text-white shadow-sm transition active:bg-blue-800"
          >
            Continue
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   TRAVELLER COUNTER
========================================================= */

const TravellerCounter = ({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
  disableMinus,
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div>
        <p className="text-xs font-extrabold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] font-medium text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMinus}
          disabled={disableMinus}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={13} />
        </button>

        <span className="w-5 text-center text-xs font-extrabold text-slate-800">
          {value}
        </span>

        <button
          type="button"
          onClick={onPlus}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   FORM FIELD
========================================================= */

const FormField = ({
  label,
  required,
  error,
  children,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
        {label}

        {required && (
          <span className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-[9px] font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   SUMMARY ROW
========================================================= */

const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[10px] font-medium text-slate-400">
        {label}
      </span>

      <span className="max-w-[190px] text-right text-[10px] font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   FARE ROW
========================================================= */

const FareRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] font-medium text-slate-500">
        {label}
      </span>

      <span className="text-[10px] font-bold text-slate-700">
        ₹{Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
};

/* =========================================================
   SECURITY ITEM
========================================================= */

const SecurityItem = ({ text }) => {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-2 py-2">
      <ShieldCheck
        size={13}
        className="shrink-0 text-green-600"
      />

      <span className="text-[8px] font-bold leading-3 text-green-700">
        {text}
      </span>
    </div>
  );
};

export default PackageBooking;