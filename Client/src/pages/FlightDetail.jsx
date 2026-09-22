
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Plane,
  Clock3,
  CalendarDays,
  Luggage,
  BriefcaseBusiness,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Info,
  MapPin,
  Wifi,
  Utensils,
  Armchair,
  CreditCard,
} from "lucide-react";

const FlightDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Demo flight data
  // Later you can replace this with API data using the id.
  const flight = {
    id: id || "TRPFL78421",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 2345",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/IndiGo_Airlines_logo.svg",

    from: {
      city: "Delhi",
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "06:30 AM",
    },

    to: {
      city: "Mumbai",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
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

  const handleContinue = () => {
    navigate(`/flight-booking/${flight.id}`, {
      state: {
        flight,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER SPACE ================= */}
      <div className=""></div>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* ================= BREADCRUMB ================= */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <button
            onClick={() => navigate("/flights")}
            className="text-slate-500 transition hover:text-blue-600"
          >
            Flights
          </button>

          <span className="text-slate-300">/</span>

          <span className="font-medium text-slate-700">
            Flight Details
          </span>
        </div>

        {/* ================= BACK BUTTON ================= */}
        <button
          onClick={() => navigate(-1)}
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Flights
        </button>

        {/* ================= PAGE GRID ================= */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}
          <div className="space-y-4">
            {/* ================= FLIGHT SUMMARY ================= */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Top header */}
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
                      <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="max-h-8 max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <h1 className="text-lg font-bold text-slate-900">
                        {flight.airline}
                      </h1>

                      <p className="text-sm text-slate-500">
                        {flight.flightNumber} · {flight.aircraft}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      {flight.travelClass}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      {flight.stops}
                    </span>
                  </div>
                </div>
              </div>

              {/* Flight route */}
              <div className="px-5 py-7 sm:px-7">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  {/* Departure */}
                  <div>
                    <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {flight.from.time}
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-800">
                      {flight.from.code}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {flight.from.city}
                    </p>
                  </div>

                  {/* Center */}
                  <div className="flex min-w-[90px] flex-col items-center">
                    <span className="mb-2 whitespace-nowrap text-xs font-medium text-slate-500">
                      {flight.duration}
                    </span>

                    <div className="flex w-full items-center">
                      <div className="h-2 w-2 rounded-full border-2 border-blue-600 bg-white"></div>

                      <div className="relative mx-1 h-px flex-1 bg-slate-300">
                        <Plane
                          size={17}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white px-0.5 text-blue-600"
                        />
                      </div>

                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>

                    <span className="mt-2 whitespace-nowrap text-xs font-semibold text-emerald-600">
                      {flight.stops}
                    </span>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {flight.to.time}
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-800">
                      {flight.to.code}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {flight.to.city}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-blue-600" />
                    <span>{flight.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} className="text-blue-600" />
                    <span>{flight.duration} travel time</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Plane size={16} className="text-blue-600" />
                    <span>{flight.aircraft}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= FLIGHT DETAILS ================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-7">
                <h2 className="text-xl font-bold text-slate-900">
                  Flight Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete departure and arrival information
                </p>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-7 bottom-7 w-px bg-slate-200"></div>

                {/* Departure */}
                <div className="relative flex gap-5 pb-10">
                  <div className="z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-4 border-blue-50 bg-blue-600"></div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          Departure
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                          {flight.from.time}
                        </h3>

                        <p className="mt-1 font-semibold text-slate-800">
                          {flight.from.city} ({flight.from.code})
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-slate-700">
                          {flight.from.airport}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Terminal 2
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="relative mb-10 ml-11 rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Clock3 size={16} className="text-slate-500" />

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {flight.duration}
                      </p>

                      <p className="text-xs text-slate-500">
                        {flight.stops}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="relative flex gap-5">
                  <div className="z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          Arrival
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                          {flight.to.time}
                        </h3>

                        <p className="mt-1 font-semibold text-slate-800">
                          {flight.to.city} ({flight.to.code})
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-slate-700">
                          {flight.to.airport}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Terminal 1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= BAGGAGE ================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Baggage Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Baggage allowance included with this fare
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Cabin */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Cabin Baggage
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {flight.baggage.cabin}
                      </p>

                      <p className="text-xs text-slate-500">
                        per passenger
                      </p>
                    </div>
                  </div>
                </div>

                {/* Check-in */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Luggage size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Check-in Baggage
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {flight.baggage.checkIn}
                      </p>

                      <p className="text-xs text-slate-500">
                        per passenger
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= FARE BENEFITS ================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Fare Benefits
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  What's included with your selected fare
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Luggage,
                    title: "15 kg Check-in Baggage",
                    text: "Included in your fare",
                  },
                  {
                    icon: BriefcaseBusiness,
                    title: "7 kg Cabin Baggage",
                    text: "Carry-on baggage included",
                  },
                  {
                    icon: Armchair,
                    title: "Seat Selection",
                    text: "Available during booking",
                  },
                  {
                    icon: Utensils,
                    title: "In-flight Services",
                    text: "Available as per airline policy",
                  },
                  {
                    icon: Wifi,
                    title: "Entertainment",
                    text: "Available on selected aircraft",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure Booking",
                    text: "Protected payment process",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <div className="mt-0.5 text-emerald-600">
                        <CheckCircle2 size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= CANCELLATION ================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Info size={20} />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900">
                    Cancellation & Refund
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Cancellation charges and refund eligibility depend on
                    the selected fare type and the time of cancellation.
                  </p>

                  <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View cancellation policy
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* ==================================================
              RIGHT FARE SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Fare header */}
              <div className="border-b border-slate-100 px-5 py-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Fare Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {flight.airline} · {flight.flightNumber}
                </p>
              </div>

              {/* Price */}
              <div className="px-5 py-5">
                <p className="text-xs font-medium text-slate-500">
                  Starting from
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    ₹{flight.price.toLocaleString("en-IN")}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    / passenger
                  </span>
                </div>
              </div>

              {/* Fare breakdown */}
              <div className="border-t border-slate-100 px-5 py-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Base Fare</span>

                    <span className="font-medium text-slate-800">
                      ₹{flight.baseFare.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Taxes & Fees</span>

                    <span className="font-medium text-slate-800">
                      ₹{flight.taxes.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Convenience Fee</span>

                    <span className="font-medium text-slate-800">
                      ₹{flight.convenienceFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-dashed border-slate-200"></div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ₹
                    {(
                      flight.baseFare +
                      flight.taxes +
                      flight.convenienceFee
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Booking button */}
              <div className="border-t border-slate-100 bg-slate-50 p-5">
                <button
                  onClick={handleContinue}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Continue to Book
                  <ArrowRight size={18} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck size={14} className="text-emerald-600" />
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
                    No hidden charges
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    The displayed fare includes applicable taxes and
                    booking charges.
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

export default FlightDetail;


