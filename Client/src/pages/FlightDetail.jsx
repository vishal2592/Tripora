import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Coffee,
  CreditCard,
  Info,
  Luggage,
  MapPin,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

// If you already have a flight slice, connect your getFlightById thunk here.
// import { useDispatch, useSelector } from "react-redux";
// import { getFlightById } from "../redux/slicer/flightSlice";

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --------------------------------------------------
  // TEMPORARY DATA
  // Replace this with your Redux/API data
  // --------------------------------------------------

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openSection, setOpenSection] = useState("cancellation");

  const [passengers, setPassengers] = useState(1);

  // --------------------------------------------------
  // DEMO FLIGHT DATA
  // --------------------------------------------------

  const demoFlight = {
    _id: id || "TRP-FLT-001",

    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 2345",

    aircraft: "Airbus A320",
    cabinClass: "Economy",

    departure: {
      airportCode: "DEL",
      airportName: "Indira Gandhi International Airport",
      city: "Delhi",
      terminal: "Terminal 3",
      date: "18 Sep 2026",
      time: "08:15 AM",
    },

    arrival: {
      airportCode: "BOM",
      airportName: "Chhatrapati Shivaji Maharaj International Airport",
      city: "Mumbai",
      terminal: "Terminal 2",
      date: "18 Sep 2026",
      time: "10:25 AM",
    },

    duration: "2h 10m",
    stops: 0,

    price: 4599,
    baseFare: 3800,
    taxes: 650,
    convenienceFee: 149,

    baggage: {
      cabin: "7 KG",
      checkIn: "15 KG",
    },

    amenities: [
      "Free Wi-Fi",
      "Complimentary meal",
      "USB charging",
      "Entertainment",
    ],

    cancellation: "Free cancellation up to 24 hours before departure",

    refund:
      "Eligible refundable amount will be credited according to the fare rules.",

    status: "On Time",
  };

  // --------------------------------------------------
  // FETCH FLIGHT
  // --------------------------------------------------

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        setLoading(true);

        /*
          Replace this section with your actual API.

          Example:

          const response = await api.get(`/flights/${id}`);
          setFlight(response.data.flight);

        */

        await new Promise((resolve) => setTimeout(resolve, 500));

        setFlight(demoFlight);
      } catch (error) {
        console.error("Failed to fetch flight:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlight();
    }
  }, [id]);

  // --------------------------------------------------
  // PRICE
  // --------------------------------------------------

  const totalPrice = useMemo(() => {
    if (!flight) return 0;

    return flight.price * passengers;
  }, [flight, passengers]);

  const totalBaseFare = useMemo(() => {
    if (!flight) return 0;

    return flight.baseFare * passengers;
  }, [flight, passengers]);

  const totalTaxes = useMemo(() => {
    if (!flight) return 0;

    return flight.taxes * passengers;
  }, [flight, passengers]);

  const totalConvenienceFee = useMemo(() => {
    if (!flight) return 0;

    return flight.convenienceFee * passengers;
  }, [flight, passengers]);

  // --------------------------------------------------
  // ACCORDION
  // --------------------------------------------------

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8fc]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="h-64 rounded-3xl bg-white" />

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="h-96 rounded-3xl bg-white" />
              <div className="h-96 rounded-3xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (!flight) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <X className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Flight not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The flight you're looking for may no longer be available.
          </p>

          <button
            onClick={() => navigate("/flights")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-gray-900">
      {/* =====================================================
          PAGE
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:pb-6">
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}

        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-gray-500 transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <Link
            to="/flights"
            className="text-gray-500 transition hover:text-blue-600"
          >
            Flights
          </Link>

          <span className="text-gray-300">/</span>

          <span className="font-medium text-gray-800">Flight Details</span>
        </div>

        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <button
          onClick={() => navigate("/flights")}
          className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to flights
        </button>

        {/* =====================================================
            MAIN FLIGHT CARD
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {/* TOP BAR */}

          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {/* Airline Logo */}

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                <Plane className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">
                    {flight.airline}
                  </h1>

                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                    {flight.airlineCode}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {flight.flightNumber} • {flight.aircraft}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                {flight.status}
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                {flight.cabinClass}
              </span>
            </div>
          </div>

          {/* JOURNEY */}

          <div className="px-5 py-3 sm:px-7 lg:py-3">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_180px_1fr]">
              {/* DEPARTURE */}

              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {flight.departure.time}
                </p>

                <div className="mt-2 flex items-center justify-center gap-2 lg:justify-start">
                  <span className="text-lg font-bold text-blue-600">
                    {flight.departure.airportCode}
                  </span>

                  <span className="text-sm text-gray-500">
                    {flight.departure.city}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {flight.departure.airportName}
                </p>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 lg:justify-start">
                  <CalendarDays className="h-4 w-4" />

                  {flight.departure.date}
                </div>

                <div className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-500 lg:justify-start">
                  <MapPin className="h-4 w-4" />

                  {flight.departure.terminal}
                </div>
              </div>

              {/* CENTER */}

              <div className="relative flex flex-col items-center">
                <span className="mb-3 text-xs font-semibold text-gray-500">
                  {flight.duration}
                </span>

                <div className="flex w-full items-center">
                  <div className="h-3 w-3 rounded-full border-2 border-blue-600 bg-white" />

                  <div className="relative h-px flex-1 bg-gray-300">
                    <Plane className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white text-blue-600" />
                  </div>

                  <div className="h-3 w-3 rounded-full border-2 border-blue-600 bg-white" />
                </div>

                <span className="mt-3 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {flight.stops === 0
                    ? "Non-stop"
                    : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
                </span>
              </div>

              {/* ARRIVAL */}

              <div className="text-center lg:text-right">
                <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {flight.arrival.time}
                </p>

                <div className="mt-2 flex items-center justify-center gap-2 lg:justify-end">
                  <span className="text-lg font-bold text-blue-600">
                    {flight.arrival.airportCode}
                  </span>

                  <span className="text-sm text-gray-500">
                    {flight.arrival.city}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {flight.arrival.airportName}
                </p>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 lg:justify-end">
                  <CalendarDays className="h-4 w-4" />

                  {flight.arrival.date}
                </div>

                <div className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-500 lg:justify-end">
                  <MapPin className="h-4 w-4" />

                  {flight.arrival.terminal}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT + FARE
        ====================================================== */}

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ===================================================
              LEFT
          ==================================================== */}

          <div className="space-y-4">
            {/* =================================================
                FLIGHT INFORMATION
            ================================================== */}

            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Flight information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Everything you need to know about this flight
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Duration */}

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Clock3 className="h-5 w-5 text-blue-600" />
                  </div>

                  <p className="text-xs text-gray-500">Duration</p>

                  <p className="mt-1 font-bold text-gray-900">
                    {flight.duration}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {flight.stops === 0 ? "Non-stop flight" : "Connecting"}
                  </p>
                </div>

                {/* Class */}

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>

                  <p className="text-xs text-gray-500">Travel class</p>

                  <p className="mt-1 font-bold text-gray-900">
                    {flight.cabinClass}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Standard fare
                  </p>
                </div>

                {/* Aircraft */}

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <Plane className="h-5 w-5 text-orange-600" />
                  </div>

                  <p className="text-xs text-gray-500">Aircraft</p>

                  <p className="mt-1 font-bold text-gray-900">
                    {flight.aircraft}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Modern aircraft
                  </p>
                </div>

                {/* Flight Number */}

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <BriefcaseBusiness className="h-5 w-5 text-green-600" />
                  </div>

                  <p className="text-xs text-gray-500">Flight number</p>

                  <p className="mt-1 font-bold text-gray-900">
                    {flight.flightNumber}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {flight.airline}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                BAGGAGE
            ================================================== */}

            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Baggage allowance
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Baggage included with your selected fare
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Luggage className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Cabin baggage
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {flight.baggage.cabin}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Per passenger
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <BriefcaseBusiness className="h-6 w-6 text-purple-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Check-in baggage
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {flight.baggage.checkIn}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Per passenger
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                AMENITIES
            ================================================== */}

            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  On-board amenities
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Services available on your journey
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {flight.amenities.map((amenity, index) => {
                  let Icon = Sparkles;

                  if (amenity.toLowerCase().includes("wi-fi")) {
                    Icon = Wifi;
                  }

                  if (amenity.toLowerCase().includes("meal")) {
                    Icon = Coffee;
                  }

                  if (amenity.toLowerCase().includes("charging")) {
                    Icon = CreditCard;
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {amenity}
                      </span>

                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                POLICIES
            ================================================== */}

            <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              {/* Cancellation */}

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("cancellation")}
                  className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                      <RotateCcw className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Cancellation policy
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Cancellation and charges
                      </p>
                    </div>
                  </div>

                  {openSection === "cancellation" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {openSection === "cancellation" && (
                  <div className="px-5 pb-5 sm:px-7">
                    <div className="rounded-2xl bg-green-50 p-4">
                      <div className="flex gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <p className="text-sm leading-6 text-green-800">
                          {flight.cancellation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Refund */}

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("refund")}
                  className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Refund policy
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Refund processing information
                      </p>
                    </div>
                  </div>

                  {openSection === "refund" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {openSection === "refund" && (
                  <div className="px-5 pb-5 sm:px-7">
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-sm leading-6 text-blue-800">
                        {flight.refund}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Baggage Rules */}

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("baggage")}
                  className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                      <Luggage className="h-5 w-5 text-orange-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Baggage rules
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Carry-on and check-in baggage
                      </p>
                    </div>
                  </div>

                  {openSection === "baggage" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {openSection === "baggage" && (
                  <div className="px-5 pb-5 sm:px-7">
                    <div className="space-y-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Cabin baggage</span>
                        <span className="font-semibold text-gray-900">
                          {flight.baggage.cabin}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Check-in baggage</span>
                        <span className="font-semibold text-gray-900">
                          {flight.baggage.checkIn}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms */}

              <div>
                <button
                  onClick={() => toggleSection("terms")}
                  className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Terms & conditions
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Important travel information
                      </p>
                    </div>
                  </div>

                  {openSection === "terms" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {openSection === "terms" && (
                  <div className="px-5 pb-5 sm:px-7">
                    <ul className="space-y-3 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Passenger name must match the valid government ID.
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Please arrive at the airport at least 2 hours before
                          domestic departure.
                        </span>
                      </li>

                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Boarding gate may change without prior notice.
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================
                IMPORTANT INFORMATION
            ================================================== */}

            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Important information
                  </h2>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                    <li>
                      • Please carry a valid government-issued photo ID.
                    </li>

                    <li>
                      • Check-in counters generally close before departure.
                    </li>

                    <li>
                      • Boarding gate information may change.
                    </li>

                    <li>
                      • Additional airline charges may apply for optional
                      services.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================
              RIGHT FARE CARD
          ==================================================== */}

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              {/* Price Header */}

              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    Fare summary
                  </h2>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    Best value
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Price for {passengers} passenger
                  {passengers > 1 ? "s" : ""}
                </p>
              </div>

              {/* Passenger Selector */}

              <div className="border-b border-gray-100 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Passengers
                  </span>

                  <Users className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-2">
                  <button
                    disabled={passengers <= 1}
                    onClick={() =>
                      setPassengers((prev) => Math.max(1, prev - 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="font-bold text-gray-900">
                    {passengers}
                  </span>

                  <button
                    disabled={passengers >= 9}
                    onClick={() =>
                      setPassengers((prev) => Math.min(9, prev + 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}

              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Base fare × {passengers}
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹{totalBaseFare.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Taxes × {passengers}
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹{totalTaxes.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Convenience fee</span>

                  <span className="font-medium text-gray-900">
                    ₹{totalConvenienceFee.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Total amount
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Inclusive of taxes & fees
                      </p>
                    </div>

                    <p className="text-2xl font-extrabold text-gray-900">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* BOOK BUTTON */}

                <button
                  onClick={() =>
                    navigate(`/flight-booking/${flight._id}`, {
                      state: {
                        flight,
                        passengers,
                        totalPrice,
                      },
                    })
                  }
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30"
                >
                  Book Now

                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-green-500" />

                  Secure booking with Tripora
                </div>
              </div>

              {/* BENEFITS */}

              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <p className="mb-4 text-sm font-bold text-gray-900">
                  Why book with Tripora?
                </p>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                    <span className="text-xs text-gray-600">
                      Instant booking confirmation
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                    <span className="text-xs text-gray-600">
                      Transparent pricing
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                    <span className="text-xs text-gray-600">
                      Secure payment
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                    <span className="text-xs text-gray-600">
                      24/7 customer support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =====================================================
          MOBILE STICKY BOOKING BAR
      ====================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-5px_25px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">
              Total for {passengers} passenger
              {passengers > 1 ? "s" : ""}
            </p>

            <p className="text-xl font-extrabold text-gray-900">
              ₹{totalPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/flight-booking/${flight._id}`, {
                state: {
                  flight,
                  passengers,
                  totalPrice,
                },
              })
            }
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Book Now

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;