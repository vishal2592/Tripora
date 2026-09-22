
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Plane,
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Mail,
  Phone,
  Luggage,
  Download,
  ArrowRight,
  Home,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

const FlightBookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId: routeBookingId } = useParams();

  const [copied, setCopied] = useState(false);

  /*
   * Data received from FlightPayment.jsx
   */
  const bookingData = location.state || {};

  const bookingId = bookingData.bookingId || routeBookingId || "TRP15684742";

  const flight = bookingData.flight || {
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

    baggage: {
      cabin: "7 kg",
      checkIn: "15 kg",
    },

    baseFare: 4800,
    taxes: 624,
    convenienceFee: 75,
  };

  const passengers = bookingData.passengers?.length
    ? bookingData.passengers
    : [
        {
          title: "Mr",
          firstName: "Vishal",
          lastName: "Kumar Rai",
          gender: "Male",
          type: "Adult",
        },
      ];

  const contact = bookingData.contact || {
    email: "example@gmail.com",
    mobile: "+91 98765 43210",
  };

  const totalAmount = Number(
    bookingData.totalAmount ||
      Number(flight.baseFare || 4800) +
        Number(flight.taxes || 624) +
        Number(flight.convenienceFee || 75)
  );

  const extraBaggagePrice = Number(bookingData.extraBaggagePrice || 0);

  const extraBaggage =
    bookingData.extraBaggage || "No extra baggage selected";

  const paymentMethod = bookingData.paymentMethod || "UPI";

  const handleCopyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Unable to copy booking ID:", error);
    }
  };

  const handleDownloadTicket = () => {
    /*
     * Demo download action.
     * Replace this later with your real PDF ticket API.
     */
    const ticketContent = `
TRIPORA - FLIGHT TICKET

Booking ID: ${bookingId}
Status: CONFIRMED

Airline: ${flight.airline}
Flight: ${flight.flightNumber}

Date: ${flight.date}

From:
${flight.from.city} (${flight.from.code})
${flight.from.time}

To:
${flight.to.city} (${flight.to.code})
${flight.to.time}

Duration: ${flight.duration}
Stops: ${flight.stops}
Class: ${flight.travelClass}

Passengers:
${passengers
  .map(
    (passenger, index) =>
      `${index + 1}. ${passenger.title || ""} ${
        passenger.firstName || ""
      } ${passenger.lastName || ""}`
  )
  .join("\n")}

Contact Email: ${contact.email}
Contact Mobile: ${contact.mobile}

Total Paid: ₹${totalAmount.toLocaleString("en-IN")}

Thank you for booking with Tripora.
`;

    const blob = new Blob([ticketContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${bookingId}-Tripora-Flight-Ticket.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Plane
                size={19}
                strokeWidth={2.3}
                className="rotate-[-10deg] text-white"
              />
            </div>

            <div className="text-left">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Tripora
              </div>

              <div className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Travel Better
              </div>
            </div>
          </button>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 sm:flex">
              <ShieldCheck size={16} className="text-emerald-600" />
              Secure Booking
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Home size={14} />
              Home
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
        {/* =====================================================
            SUCCESS HERO
        ===================================================== */}
        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-5 py-6 text-center sm:px-8 sm:py-6">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
              <CheckCircle2
                size={46}
                strokeWidth={2}
                className="text-emerald-600"
              />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Booking Confirmed!
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Your flight has been booked successfully. Your booking details
              are shown below.
            </p>

            {/* Booking ID */}
            <div className="mx-auto mt-6 flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Booking ID
                </p>

                <p className="mt-0.5 text-sm font-extrabold tracking-wide text-blue-600 sm:text-base">
                  {bookingId}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyBookingId}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                title="Copy booking ID"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-600" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-bold text-emerald-700">
                Confirmed
              </span>

              <span className="text-xs text-slate-400">
                • Payment Successful
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ===================================================
              LEFT CONTENT
          =================================================== */}
          <div className="space-y-6">
            {/* =================================================
                FLIGHT DETAILS
            ================================================= */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {/* Header */}
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                    Flight Details
                  </p>

                  <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                    {flight.airline}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                    {flight.flightNumber}
                  </span>

                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
                    {flight.stops}
                  </span>
                </div>
              </div>

              {/* Flight route */}
              <div className="mt-6">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  {/* Departure */}
                  <div className="text-left">
                    <p className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {flight.from.time}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-lg font-extrabold text-blue-600">
                        {flight.from.code}
                      </span>

                      <span className="text-xs font-semibold text-slate-500">
                        {flight.from.city}
                      </span>
                    </div>

                    <p className="mt-1 max-w-[190px] text-[10px] leading-4 text-slate-400 sm:text-xs">
                      {flight.from.airport}
                    </p>
                  </div>

                  {/* Center */}
                  <div className="flex min-w-[95px] flex-col items-center">
                    <div className="flex w-full items-center">
                      <div className="h-px flex-1 bg-slate-200" />

                      <div className="mx-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Plane
                          size={17}
                          className="rotate-90"
                          strokeWidth={2.2}
                        />
                      </div>

                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-slate-400">
                      {flight.duration}
                    </span>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <p className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {flight.to.time}
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1.5">
                      <span className="text-lg font-extrabold text-blue-600">
                        {flight.to.code}
                      </span>

                      <span className="text-xs font-semibold text-slate-500">
                        {flight.to.city}
                      </span>
                    </div>

                    <p className="ml-auto mt-1 max-w-[190px] text-[10px] leading-4 text-slate-400 sm:text-xs">
                      {flight.to.airport}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flight meta */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <CalendarDays
                    size={16}
                    className="text-blue-600"
                  />

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {flight.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <Clock3 size={16} className="text-blue-600" />

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {flight.duration}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <Plane size={16} className="text-blue-600" />

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Aircraft
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {flight.aircraft || "Airbus A320"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <User size={16} className="text-blue-600" />

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Class
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {flight.travelClass || "Economy"}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                PASSENGER DETAILS
            ================================================= */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                    Passenger Details
                  </p>

                  <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                    {passengers.length}{" "}
                    {passengers.length === 1 ? "Passenger" : "Passengers"}
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={18} />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {passengers.map((passenger, index) => {
                  const fullName =
                    `${passenger.title || ""} ${
                      passenger.firstName || ""
                    } ${passenger.lastName || ""}`.trim();

                  return (
                    <div
                      key={`${fullName}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                          <User size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-slate-800">
                            {fullName || "Passenger"}
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                            {passenger.type || "Adult"} •{" "}
                            {flight.travelClass || "Economy"}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        Confirmed
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="border-b border-slate-100 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  Contact Details
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                  Booking Contact
                </h2>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 truncate text-xs font-bold text-slate-700">
                      {contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Phone size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Mobile
                    </p>

                    <p className="mt-1 truncate text-xs font-bold text-slate-700">
                      {contact.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                BAGGAGE
            ================================================= */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="border-b border-slate-100 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  Baggage
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                  Baggage Allowance
                </h2>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Luggage size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Cabin
                    </p>

                    <p className="mt-1 text-xs font-extrabold text-slate-700">
                      {flight.baggage?.cabin || "7 kg"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Luggage size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Check-in
                    </p>

                    <p className="mt-1 text-xs font-extrabold text-slate-700">
                      {flight.baggage?.checkIn || "15 kg"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Luggage size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Extra
                    </p>

                    <p className="mt-1 truncate text-xs font-extrabold text-slate-700">
                      {extraBaggagePrice > 0
                        ? extraBaggage
                        : "Not selected"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}
          <aside className="space-y-6">
            {/* Fare summary */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-5">
              <div className="border-b border-slate-100 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  Fare Summary
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                  Payment Details
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    Base Fare
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    ₹
                    {Number(flight.baseFare || 4800).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    Taxes & Fees
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    ₹
                    {Number(flight.taxes || 624).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    Convenience Fee
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    ₹
                    {Number(
                      flight.convenienceFee || 75
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                {extraBaggagePrice > 0 && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      Extra Baggage
                    </span>

                    <span className="text-xs font-bold text-slate-700">
                      ₹{extraBaggagePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-5 border-t border-dashed border-slate-200" />

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Total Paid
                  </p>

                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                  Paid
                </span>
              </div>

              {/* Payment method */}
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Payment Method
                  </span>

                  <span className="text-xs font-extrabold text-slate-700">
                    {paymentMethod}
                  </span>
                </div>
              </div>
            </section>

            {/* Important information */}
            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Booking secured
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your booking details have been securely saved. Please
                    carry a valid government ID during your journey.
                  </p>
                </div>
              </div>
            </section>

            {/* Desktop actions */}
            <div className="hidden space-y-3 lg:block">
              <button
                type="button"
                onClick={handleDownloadTicket}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Download size={17} />
                Download Ticket
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-trips")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                View My Trips
                <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>

        {/* =====================================================
            BOTTOM ACTIONS
        ===================================================== */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Ready for your journey?
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Keep your booking ID handy for future reference.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Home size={15} />
                Back to Home
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-trips")}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-blue-700"
              >
                My Trips
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          MOBILE STICKY ACTION BAR
      ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2">
          <button
            type="button"
            onClick={handleDownloadTicket}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-extrabold text-slate-700"
          >
            <Download size={15} />
            Download
          </button>

          <button
            type="button"
            onClick={() => navigate("/my-trips")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-extrabold text-white"
          >
            My Trips
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Bottom spacing for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default FlightBookingSuccess;



