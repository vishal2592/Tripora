
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  CreditCard,
  Info,
  Luggage,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

const FlightBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();


  const flight = location.state?.flight || {
    id: id || "TRPFL78421",

    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 2345",

    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/IndiGo_Airlines_logo.svg",

    from: {
      city: "Delhi",
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "06:30 AM",
    },

    to: {
      city: "Mumbai",
      airport:
        "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "08:40 AM",
    },

    date: "18 September 2026",
    duration: "2h 10m",
    stops: "Non-stop",
    aircraft: "Airbus A320",
    travelClass: "Economy",

    price: 5499,
    baseFare: 4800,
    taxes: 624,
    convenienceFee: 75,

    baggage: {
      cabin: "7 kg",
      checkIn: "15 kg",
    },
  };

  // ============================
  // Passenger state
  // ============================

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      type: "Adult",
      title: "Mr",
      firstName: "",
      lastName: "",
      day: "",
      month: "",
      year: "",
      gender: "",
    },
  ]);

  // ============================
  // Contact state
  // ============================

  const [contact, setContact] = useState({
    email: "",
    countryCode: "+91",
    mobile: "",
  });

  // ============================
  // Extra baggage
  // ============================

  const [extraBaggage, setExtraBaggage] = useState("None");

  // ============================
  // Validation state
  // ============================

  const [errors, setErrors] = useState({});

  // ============================
  // Extra baggage pricing
  // ============================

  const baggagePrices = {
    None: 0,
    "20 KG": 1499,
    "30 KG": 2199,
  };

  // ============================
  // Total calculation
  // ============================

  const extraBaggagePrice = baggagePrices[extraBaggage] || 0;

  const totalAmount = useMemo(() => {
    return (
      Number(flight.baseFare || 0) +
      Number(flight.taxes || 0) +
      Number(flight.convenienceFee || 0) +
      extraBaggagePrice
    );
  }, [
    flight.baseFare,
    flight.taxes,
    flight.convenienceFee,
    extraBaggagePrice,
  ]);

  // ============================
  // Passenger update
  // ============================

  const updatePassenger = (id, field, value) => {
    setPassengers((prev) =>
      prev.map((passenger) =>
        passenger.id === id
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger
      )
    );

    setErrors((prev) => ({
      ...prev,
      [`passenger_${id}_${field}`]: "",
    }));
  };

  // ============================
  // Contact update
  // ============================

  const updateContact = (field, value) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================
  // Add passenger
  // ============================

  const addPassenger = (type = "Adult") => {
    const newPassenger = {
      id: Date.now(),
      type,
      title: type === "Child" ? "Master" : "Mr",
      firstName: "",
      lastName: "",
      day: "",
      month: "",
      year: "",
      gender: "",
    };

    setPassengers((prev) => [...prev, newPassenger]);
  };

  // ============================
  // Remove passenger
  // ============================

  const removePassenger = (id) => {
    if (passengers.length === 1) return;

    setPassengers((prev) =>
      prev.filter((passenger) => passenger.id !== id)
    );
  };

  // ============================
  // Validate form
  // ============================

  const validateForm = () => {
    const newErrors = {};

    passengers.forEach((passenger) => {
      if (!passenger.firstName.trim()) {
        newErrors[`passenger_${passenger.id}_firstName`] =
          "First name is required";
      }

      if (!passenger.lastName.trim()) {
        newErrors[`passenger_${passenger.id}_lastName`] =
          "Last name is required";
      }

      if (!passenger.day) {
        newErrors[`passenger_${passenger.id}_day`] =
          "Required";
      }

      if (!passenger.month) {
        newErrors[`passenger_${passenger.id}_month`] =
          "Required";
      }

      if (!passenger.year) {
        newErrors[`passenger_${passenger.id}_year`] =
          "Required";
      }

      if (!passenger.gender) {
        newErrors[`passenger_${passenger.id}_gender`] =
          "Please select gender";
      }
    });

    if (!contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!contact.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(contact.mobile)) {
      newErrors.mobile = "Enter a valid 10 digit mobile number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================
  // Continue to payment
  // ============================

  const handleContinue = () => {
    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const bookingId = `TRP${Date.now()
      .toString()
      .slice(-8)}`;

    navigate(`/flight-payment/${bookingId}`, {
      state: {
        flight,
        passengers,
        contact,
        extraBaggage,
        extraBaggagePrice,
        totalAmount,
        bookingId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          TOP SPACE
      ===================================================== */}

      <div className=""></div>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/flights")}
            className="text-slate-500 transition hover:text-blue-600"
          >
            Flights
          </button>

          <span className="text-slate-300">/</span>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-slate-500 transition hover:text-blue-600"
          >
            Flight Details
          </button>

          <span className="text-slate-300">/</span>

          <span className="font-medium text-slate-800">
            Book Flight
          </span>
        </div>

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Flight Details
        </button>

        {/* =====================================================
            PAGE TITLE
        ===================================================== */}

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Complete Your Booking
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Enter passenger and contact details to continue.
          </p>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* ===================================================
              LEFT SIDE
          =================================================== */}

          <div className="space-y-4">
            {/* =================================================
                PASSENGER DETAILS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Passenger Details
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Enter details exactly as they appear on your
                      government ID.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-4 sm:p-7">
                {passengers.map((passenger, index) => (
                  <div
                    key={passenger.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
                  >
                    {/* Passenger header */}

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          Passenger {index + 1}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {passenger.type}
                        </p>
                      </div>

                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removePassenger(passenger.id)
                          }
                          className="text-xs font-semibold text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Name row */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[110px_1fr_1fr]">
                      {/* Title */}

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Title
                        </label>

                        <div className="relative">
                          <select
                            value={passenger.title}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "title",
                                e.target.value
                              )
                            }
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Master">
                              Master
                            </option>
                            <option value="Miss">Miss</option>
                          </select>

                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </div>

                      {/* First name */}

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                          First Name
                        </label>

                        <div className="relative">
                          <User
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "firstName",
                                e.target.value
                              )
                            }
                            placeholder="Enter first name"
                            className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                              errors[
                                `passenger_${passenger.id}_firstName`
                              ]
                                ? "border-red-400"
                                : "border-slate-200"
                            }`}
                          />
                        </div>

                        {errors[
                          `passenger_${passenger.id}_firstName`
                        ] && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors[
                                `passenger_${passenger.id}_firstName`
                              ]
                            }
                          </p>
                        )}
                      </div>

                      {/* Last name */}

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Last Name
                        </label>

                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "lastName",
                              e.target.value
                            )
                          }
                          placeholder="Enter last name"
                          className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                            errors[
                              `passenger_${passenger.id}_lastName`
                            ]
                              ? "border-red-400"
                              : "border-slate-200"
                          }`}
                        />

                        {errors[
                          `passenger_${passenger.id}_lastName`
                        ] && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors[
                                `passenger_${passenger.id}_lastName`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* DOB */}

                    <div className="mt-5">
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Date of Birth
                      </label>

                      <div className="grid grid-cols-3 gap-3">
                        {/* Day */}

                        <div className="relative">
                          <select
                            value={passenger.day}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "day",
                                e.target.value
                              )
                            }
                            className={`h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                              errors[
                                `passenger_${passenger.id}_day`
                              ]
                                ? "border-red-400"
                                : "border-slate-200"
                            }`}
                          >
                            <option value="">Day</option>

                            {Array.from(
                              { length: 31 },
                              (_, i) => i + 1
                            ).map((day) => (
                              <option
                                key={day}
                                value={String(day).padStart(2, "0")}
                              >
                                {String(day).padStart(2, "0")}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>

                        {/* Month */}

                        <div className="relative">
                          <select
                            value={passenger.month}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "month",
                                e.target.value
                              )
                            }
                            className={`h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                              errors[
                                `passenger_${passenger.id}_month`
                              ]
                                ? "border-red-400"
                                : "border-slate-200"
                            }`}
                          >
                            <option value="">Month</option>

                            {[
                              "01",
                              "02",
                              "03",
                              "04",
                              "05",
                              "06",
                              "07",
                              "08",
                              "09",
                              "10",
                              "11",
                              "12",
                            ].map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>

                        {/* Year */}

                        <div className="relative">
                          <select
                            value={passenger.year}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "year",
                                e.target.value
                              )
                            }
                            className={`h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                              errors[
                                `passenger_${passenger.id}_year`
                              ]
                                ? "border-red-400"
                                : "border-slate-200"
                            }`}
                          >
                            <option value="">Year</option>

                            {Array.from(
                              { length: 90 },
                              (_, i) =>
                                new Date().getFullYear() - i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gender */}

                    <div className="mt-5">
                      <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Gender
                      </label>

                      <div className="flex flex-wrap gap-3">
                        {["Male", "Female", "Other"].map(
                          (gender) => (
                            <label
                              key={gender}
                              className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm transition ${
                                passenger.gender === gender
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`gender-${passenger.id}`}
                                value={gender}
                                checked={
                                  passenger.gender === gender
                                }
                                onChange={(e) =>
                                  updatePassenger(
                                    passenger.id,
                                    "gender",
                                    e.target.value
                                  )
                                }
                                className="accent-blue-600"
                              />

                              {gender}
                            </label>
                          )
                        )}
                      </div>

                      {errors[
                        `passenger_${passenger.id}_gender`
                      ] && (
                        <p className="mt-1 text-xs text-red-500">
                          {
                            errors[
                              `passenger_${passenger.id}_gender`
                            ]
                          }
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add passenger */}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => addPassenger("Adult")}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                  >
                    + Add Adult
                  </button>

                  <button
                    type="button"
                    onClick={() => addPassenger("Child")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    + Add Child
                  </button>

                  <button
                    type="button"
                    onClick={() => addPassenger("Infant")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    + Add Infant
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Contact Details
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Your booking confirmation will be sent here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-7">
                {/* Email */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        updateContact(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="example@email.com"
                      className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                        errors.email
                          ? "border-red-400"
                          : "border-slate-200"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Mobile Number
                  </label>

                  <div className="flex gap-2">
                    <div className="relative w-[90px] shrink-0">
                      <select
                        value={contact.countryCode}
                        onChange={(e) =>
                          updateContact(
                            "countryCode",
                            e.target.value
                          )
                        }
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-7 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+971">+971</option>
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    <input
                      type="tel"
                      maxLength={10}
                      value={contact.mobile}
                      onChange={(e) =>
                        updateContact(
                          "mobile",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="9876543210"
                      className={`h-11 min-w-0 flex-1 rounded-xl border bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                        errors.mobile
                          ? "border-red-400"
                          : "border-slate-200"
                      }`}
                    />
                  </div>

                  {errors.mobile && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.mobile}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                BAGGAGE
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Luggage size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Baggage & Add-ons
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Included baggage and optional extra baggage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {/* Included baggage */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BriefcaseIcon />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Cabin Baggage
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {flight.baggage?.cabin || "7 kg"} per
                          passenger
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Luggage size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Check-in Baggage
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {flight.baggage?.checkIn || "15 kg"} per
                          passenger
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra baggage */}

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Add Extra Baggage
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      {
                        name: "None",
                        price: 0,
                      },
                      {
                        name: "20 KG",
                        price: 1499,
                      },
                      {
                        name: "30 KG",
                        price: 2199,
                      },
                    ].map((option) => (
                      <button
                        type="button"
                        key={option.name}
                        onClick={() =>
                          setExtraBaggage(option.name)
                        }
                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                          extraBaggage === option.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <p
                            className={`text-sm font-bold ${
                              extraBaggage === option.name
                                ? "text-blue-700"
                                : "text-slate-800"
                            }`}
                          >
                            {option.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {option.price === 0
                              ? "Included"
                              : `+ ₹${option.price.toLocaleString(
                                  "en-IN"
                                )}`}
                          </p>
                        </div>

                        {extraBaggage === option.name && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check size={13} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                IMPORTANT INFORMATION
            ================================================= */}

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                  <CircleAlert size={19} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-amber-900">
                    Important Information
                  </h2>

                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Passenger name should match the government ID.",
                      "Please enter a valid mobile number and email address.",
                      "Carry a valid government-issued ID at the airport.",
                      "Baggage allowance is subject to the selected fare.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-xs leading-5 text-amber-800"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0"
                        />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* =================================================
                MOBILE CONTINUE BUTTON
            ================================================= */}

            <div className="block lg:hidden">
              <button
                type="button"
                onClick={handleContinue}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck
                  size={14}
                  className="text-emerald-600"
                />
                Secure & encrypted booking
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT SIDE
          =================================================== */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Summary header */}

              <div className="border-b border-slate-100 px-5 py-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Flight Summary
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {flight.airline} · {flight.flightNumber}
                </p>
              </div>

              {/* Airline */}

              <div className="flex items-center gap-3 px-5 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                  <img
                    src={flight.logo}
                    alt={flight.airline}
                    className="max-h-7 max-w-full object-contain"
                  />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {flight.airline}
                  </p>

                  <p className="text-xs text-slate-500">
                    {flight.flightNumber}
                  </p>
                </div>
              </div>

              {/* Route */}

              <div className="border-y border-slate-100 px-5 py-5">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {flight.from.time}
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {flight.from.code}
                    </p>

                    <p className="text-xs text-slate-500">
                      {flight.from.city}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-[10px] font-medium text-slate-400">
                      {flight.duration}
                    </span>

                    <div className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>

                      <div className="mx-1 h-px w-12 bg-slate-300">
                        <Plane
                          size={13}
                          className="relative left-1/2 -top-[6px] -translate-x-1/2 rotate-90 bg-white text-blue-600"
                        />
                      </div>

                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                    </div>

                    <span className="mt-1 text-[10px] font-semibold text-emerald-600">
                      {flight.stops}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {flight.to.time}
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {flight.to.code}
                    </p>

                    <p className="text-xs text-slate-500">
                      {flight.to.city}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays
                    size={14}
                    className="text-blue-600"
                  />

                  {flight.date}
                </div>
              </div>

              {/* Fare */}

              <div className="px-5 py-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Fare Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Base Fare
                    </span>

                    <span className="font-medium text-slate-800">
                      ₹
                      {Number(
                        flight.baseFare || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Taxes & Fees
                    </span>

                    <span className="font-medium text-slate-800">
                      ₹
                      {Number(
                        flight.taxes || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Convenience Fee
                    </span>

                    <span className="font-medium text-slate-800">
                      ₹
                      {Number(
                        flight.convenienceFee || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {extraBaggagePrice > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Extra Baggage
                      </span>

                      <span className="font-medium text-slate-800">
                        ₹
                        {extraBaggagePrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-5 border-t border-dashed border-slate-200"></div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Desktop CTA */}

              <div className="hidden border-t border-slate-100 bg-slate-50 p-5 lg:block">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Continue to Payment
                  <ArrowRight size={18} />
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck
                    size={14}
                    className="text-emerald-600"
                  />
                  Secure & encrypted booking
                </div>
              </div>
            </div>

            {/* Secure booking card */}

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-bold text-blue-900">
                    Safe & Secure Booking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Your personal information is protected with
                    secure encryption.
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

/* ============================================================
   SMALL ICON COMPONENT
============================================================ */

const BriefcaseIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        width="20"
        height="14"
        x="2"
        y="7"
        rx="2"
        ry="2"
      />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
};

export default FlightBook;


