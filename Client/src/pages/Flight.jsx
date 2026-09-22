
import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Filter,
  Info,
  Luggage,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   MOCK FLIGHT DATA
========================================================= */

const flightData = [
  {
    id: 1,
    airline: "IndiGo",
    flightNumber: "6E 2145",
    aircraft: "Airbus A320",
    logo: "6E",
    from: "DEL",
    fromCity: "New Delhi",
    departure: "06:15",
    to: "BOM",
    toCity: "Mumbai",
    arrival: "08:25",
    duration: "2h 10m",
    stops: "Non-stop",
    stopCount: 0,
    price: 4899,
    oldPrice: 5599,
    baggage: "15 kg",
    cabin: "7 kg",
    meal: "Paid",
    wifi: false,
    rating: 4.4,
    recommended: true,
    cancellation: "Free cancellation",
  },
  {
    id: 2,
    airline: "Air India",
    flightNumber: "AI 865",
    aircraft: "Airbus A320neo",
    logo: "AI",
    from: "DEL",
    fromCity: "New Delhi",
    departure: "08:40",
    to: "BOM",
    toCity: "Mumbai",
    arrival: "10:55",
    duration: "2h 15m",
    stops: "Non-stop",
    stopCount: 0,
    price: 5299,
    oldPrice: 6199,
    baggage: "20 kg",
    cabin: "7 kg",
    meal: "Included",
    wifi: true,
    rating: 4.2,
    recommended: false,
    cancellation: "Free cancellation",
  },
  {
    id: 3,
    airline: "Akasa Air",
    flightNumber: "QP 1123",
    aircraft: "Boeing 737 MAX",
    logo: "QP",
    from: "DEL",
    fromCity: "New Delhi",
    departure: "11:30",
    to: "BOM",
    toCity: "Mumbai",
    arrival: "13:45",
    duration: "2h 15m",
    stops: "Non-stop",
    stopCount: 0,
    price: 4499,
    oldPrice: 5199,
    baggage: "15 kg",
    cabin: "7 kg",
    meal: "Paid",
    wifi: false,
    rating: 4.3,
    recommended: false,
    cancellation: "Limited cancellation",
  },
  {
    id: 4,
    airline: "Vistara",
    flightNumber: "UK 955",
    aircraft: "Airbus A321",
    logo: "UK",
    from: "DEL",
    fromCity: "New Delhi",
    departure: "15:10",
    to: "BOM",
    toCity: "Mumbai",
    arrival: "17:25",
    duration: "2h 15m",
    stops: "Non-stop",
    stopCount: 0,
    price: 5799,
    oldPrice: 6599,
    baggage: "20 kg",
    cabin: "7 kg",
    meal: "Included",
    wifi: true,
    rating: 4.6,
    recommended: true,
    cancellation: "Free cancellation",
  },
  {
    id: 5,
    airline: "IndiGo",
    flightNumber: "6E 5338",
    aircraft: "Airbus A321",
    logo: "6E",
    from: "DEL",
    fromCity: "New Delhi",
    departure: "19:25",
    to: "BOM",
    toCity: "Mumbai",
    arrival: "21:40",
    duration: "2h 15m",
    stops: "Non-stop",
    stopCount: 0,
    price: 5099,
    oldPrice: 5899,
    baggage: "15 kg",
    cabin: "7 kg",
    meal: "Paid",
    wifi: false,
    rating: 4.4,
    recommended: false,
    cancellation: "Free cancellation",
  },
];

/* =========================================================
   POPULAR ROUTES
========================================================= */

const popularRoutes = [
  {
    from: "DEL",
    fromCity: "New Delhi",
    to: "BOM",
    toCity: "Mumbai",
    price: "₹4,899",
  },
  {
    from: "BOM",
    fromCity: "Mumbai",
    to: "GOI",
    toCity: "Goa",
    price: "₹3,299",
  },
  {
    from: "DEL",
    fromCity: "New Delhi",
    to: "GOI",
    toCity: "Goa",
    price: "₹4,099",
  },
  {
    from: "BLR",
    fromCity: "Bengaluru",
    to: "DEL",
    toCity: "New Delhi",
    price: "₹4,599",
  },
];

const airlines = ["IndiGo", "Air India", "Akasa Air", "Vistara"];

/* =========================================================
   COMPONENT
========================================================= */

const FlightPage = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("round-trip");

  const [searchData, setSearchData] = useState({
    from: "New Delhi",
    fromCode: "DEL",
    to: "Mumbai",
    toCode: "BOM",
    departure: "2026-09-18",
    return: "2026-09-22",
    travellers: 2,
    cabin: "Economy",
  });

  const [activeSort, setActiveSort] = useState("recommended");
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [savedFlights, setSavedFlights] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedStops, setSelectedStops] = useState("all");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);

  /* =======================================================
     SEARCH CHANGE
  ======================================================= */

  const handleSearchChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =======================================================
     SWAP
  ======================================================= */

  const handleSwap = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      fromCode: prev.toCode,
      to: prev.from,
      toCode: prev.fromCode,
    }));
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
    }, 700);
  };

  /* =======================================================
     SAVE FLIGHT
  ======================================================= */

  const handleSaveFlight = (id) => {
    setSavedFlights((prev) =>
      prev.includes(id)
        ? prev.filter((flightId) => flightId !== id)
        : [...prev, id]
    );
  };

  /* =======================================================
     AIRLINE FILTER
  ======================================================= */

  const toggleAirline = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((item) => item !== airline)
        : [...prev, airline]
    );
  };

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredFlights = useMemo(() => {
    let flights = [...flightData];

    if (selectedStops === "non-stop") {
      flights = flights.filter((flight) => flight.stopCount === 0);
    }

    if (selectedStops === "1-stop") {
      flights = flights.filter((flight) => flight.stopCount === 1);
    }

    if (selectedAirlines.length > 0) {
      flights = flights.filter((flight) =>
        selectedAirlines.includes(flight.airline)
      );
    }

    flights = flights.filter((flight) => flight.price <= priceRange);

    if (activeSort === "cheapest") {
      flights.sort((a, b) => a.price - b.price);
    }

    if (activeSort === "fastest") {
      flights.sort(
        (a, b) => getMinutes(a.duration) - getMinutes(b.duration)
      );
    }

    if (activeSort === "recommended") {
      flights.sort((a, b) => {
        if (a.recommended === b.recommended) {
          return a.price - b.price;
        }

        return a.recommended ? -1 : 1;
      });
    }

    return flights;
  }, [
    selectedStops,
    selectedAirlines,
    priceRange,
    activeSort,
  ]);

  /* =======================================================
     DURATION HELPER
  ======================================================= */

  function getMinutes(duration) {
    const hoursMatch = duration.match(/(\d+)h/);
    const minutesMatch = duration.match(/(\d+)m/);

    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

    return hours * 60 + minutes;
  }

  /* =======================================================
     FILTER CONTENT
  ======================================================= */

  const FilterContent = () => (
    <div className="space-y-5">
      {/* STOPS */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Stops
          </h3>

          <button
            type="button"
            onClick={() => setSelectedStops("all")}
            className="text-[11px] font-semibold text-blue-600"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2.5">
          {[
            ["all", "All flights"],
            ["non-stop", "Non-stop"],
            ["1-stop", "1 stop"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="stops"
                checked={selectedStops === value}
                onChange={() => setSelectedStops(value)}
                className="h-4 w-4 accent-blue-600"
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Price
          </h3>

          <span className="text-xs font-bold text-blue-600">
            ₹{priceRange.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="3000"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) =>
            setPriceRange(Number(e.target.value))
          }
          className="w-full accent-blue-600"
        />

        <div className="mt-2 flex justify-between text-[10px] text-slate-400">
          <span>₹3,000</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* AIRLINES */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Airlines
        </h3>

        <div className="space-y-2.5">
          {airlines.map((airline) => (
            <label
              key={airline}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="h-4 w-4 shrink-0 accent-blue-600"
                />

                <span className="truncate">
                  {airline}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* DEPARTURE */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Departure time
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {[
            "Before 6 AM",
            "6 AM - 12 PM",
            "12 PM - 6 PM",
            "After 6 PM",
          ].map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-lg border border-slate-200 px-2 py-2 text-[10px] font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-hidden text-xs text-slate-400">
            <span className="shrink-0">Home</span>
            <span>/</span>
            <span className="shrink-0">Flights</span>
            <span>/</span>
            <span className="truncate text-slate-600">
              {searchData.from} to {searchData.to}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH SECTION
      ====================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

          {/* HEADER */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                Search flights
              </p>

              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                Find your perfect flight
              </h1>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Compare flights and choose the best deal for your trip.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <ShieldCheck size={15} className="text-emerald-400" />
              Secure booking
            </div>
          </div>

          {/* TRIP TYPE TOGGLE - CENTER */}
          <div className="mb-2.5 flex justify-center">
            <div className="flex w-fit rounded-xl bg-slate-100 p-1">
              {[
                ["one-way", "One Way"],
                ["round-trip", "Round Trip"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTripType(value)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:px-5 ${tripType === value
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH CARD */}
          <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4 lg:p-5">

            {/* SEARCH FORM */}
            <div
              className="
          grid
          w-full
          min-w-0
          grid-cols-1
          gap-2.5
          lg:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(145px,auto)]
        "
            >

              {/* FROM */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  From
                </label>

                <div className="flex min-w-0 items-center gap-2">
                  <MapPin
                    size={17}
                    className="shrink-0 text-blue-600"
                  />

                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={searchData.from}
                      onChange={(e) =>
                        handleSearchChange(
                          "from",
                          e.target.value
                        )
                      }
                      className="w-full min-w-0 truncate bg-transparent text-sm font-bold text-slate-900 outline-none sm:text-base"
                    />

                    <p className="truncate text-[10px] text-slate-400">
                      {searchData.fromCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* SWAP */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                  aria-label="Swap locations"
                >
                  <ArrowLeftRight size={15} />
                </button>
              </div>

              {/* TO */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  To
                </label>

                <div className="flex min-w-0 items-center gap-2">
                  <MapPin
                    size={17}
                    className="shrink-0 text-blue-600"
                  />

                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={searchData.to}
                      onChange={(e) =>
                        handleSearchChange(
                          "to",
                          e.target.value
                        )
                      }
                      className="w-full min-w-0 truncate bg-transparent text-sm font-bold text-slate-900 outline-none sm:text-base"
                    />

                    <p className="truncate text-[10px] text-slate-400">
                      {searchData.toCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* DEPARTURE */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Departure
                </label>

                <input
                  type="date"
                  value={searchData.departure}
                  onChange={(e) =>
                    handleSearchChange(
                      "departure",
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 bg-transparent text-xs font-bold text-slate-900 outline-none sm:text-sm"
                />
              </div>

              {/* RETURN */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {tripType === "one-way" ? "Trip" : "Return"}
                </label>

                {tripType === "one-way" ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Plane
                      size={14}
                      className="shrink-0 text-blue-600"
                    />

                    <span className="truncate">
                      One way
                    </span>
                  </div>
                ) : (
                  <input
                    type="date"
                    value={searchData.return}
                    onChange={(e) =>
                      handleSearchChange(
                        "return",
                        e.target.value
                      )
                    }
                    className="w-full min-w-0 bg-transparent text-xs font-bold text-slate-900 outline-none sm:text-sm"
                  />
                )}
              </div>

              {/* TRAVELLERS */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Travellers
                </label>

                <div className="flex min-w-0 items-center gap-2">
                  <Briefcase
                    size={16}
                    className="shrink-0 text-blue-600"
                  />

                  <select
                    value={searchData.travellers}
                    onChange={(e) =>
                      handleSearchChange(
                        "travellers",
                        Number(e.target.value)
                      )
                    }
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-slate-900 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                      (number) => (
                        <option
                          key={number}
                          value={number}
                        >
                          {number}{" "}
                          {number === 1
                            ? "Traveller"
                            : "Travellers"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="flex min-h-[50px] min-w-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSearching ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="truncate">
                      Searching...
                    </span>
                  </>
                ) : (
                  <>
                    <Search size={17} />
                    <span className="whitespace-nowrap">
                      Search Flights
                    </span>
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR ROUTES
      ====================================================== */}

      <section className="bg-white py-5 sm:py-7">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Explore routes
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Popular flight routes
              </h2>
            </div>

            <button
              type="button"
              className="hidden items-center gap-1 text-xs font-bold text-blue-600 sm:flex"
            >
              View all
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {popularRoutes.map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-4"
              >
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-900">
                      {route.from}
                    </p>

                    <p className="truncate text-[10px] text-slate-400">
                      {route.fromCity}
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    className="shrink-0 text-blue-500"
                  />

                  <div className="min-w-0 text-right">
                    <p className="text-sm font-extrabold text-slate-900">
                      {route.to}
                    </p>

                    <p className="truncate text-[10px] text-slate-400">
                      {route.toCity}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-[10px] text-slate-400">
                    Starting from
                  </span>

                  <span className="text-xs font-extrabold text-blue-600">
                    {route.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      <section className="bg-slate-50 py-5 sm:py-7">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* RESULT HEADER */}

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                {searchData.fromCode} → {searchData.toCode}
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {filteredFlights.length} flights available
                {" · "}
                {searchData.travellers} travellers
              </p>
            </div>

            {/* MOBILE FILTER */}

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
            {/* =================================================
                DESKTOP FILTER
            ================================================== */}

            <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
              <div className="mb-5 flex items-center gap-2">
                <Filter size={16} className="text-blue-600" />

                <h3 className="text-sm font-bold text-slate-900">
                  Filters
                </h3>
              </div>

              <FilterContent />
            </aside>

            {/* =================================================
                FLIGHT RESULTS
            ================================================== */}

            <div className="min-w-0">
              {/* SORT */}

              <div className="mb-3 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                {[
                  ["recommended", "Recommended"],
                  ["cheapest", "Cheapest"],
                  ["fastest", "Fastest"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveSort(value)}
                    className={`min-w-0 rounded-lg px-2 py-2 text-[10px] font-bold transition sm:text-xs ${activeSort === value
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* FLIGHTS */}

              <div className="space-y-3">
                {filteredFlights.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Plane size={21} />
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900">
                      No flights found
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Try changing your filters or increasing
                      the price range.
                    </p>
                  </div>
                ) : (
                  filteredFlights.map((flight) => {
                    const isSaved = savedFlights.includes(
                      flight.id
                    );

                    const isExpanded =
                      expandedFlight === flight.id;

                    return (
                      <div
                        key={flight.id}
                        className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                      >
                        {/* RECOMMENDED */}

                        {flight.recommended && (
                          <div className="flex items-center gap-1.5 bg-blue-50 px-4 py-2 text-[10px] font-bold text-blue-700">
                            <Star size={12} fill="currentColor" />
                            Recommended for you
                          </div>
                        )}

                        {/* MAIN CARD */}

                        <div className="p-3.5 sm:p-4 lg:p-5">
                          {/* MOBILE/TABLET CARD */}

                          <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_150px]">
                            {/* FLIGHT INFO */}

                            <div className="min-w-0">
                              <div className="flex min-w-0 items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-extrabold text-blue-600">
                                  {flight.logo}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-xs font-bold text-slate-900">
                                    {flight.airline}
                                  </p>

                                  <p className="text-[10px] text-slate-400">
                                    {flight.flightNumber}
                                    {" · "}
                                    {flight.aircraft}
                                  </p>
                                </div>
                              </div>

                              {/* TIME ROW */}

                              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                                <div className="min-w-0">
                                  <p className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                                    {flight.departure}
                                  </p>

                                  <p className="text-xs font-bold text-slate-500">
                                    {flight.from}
                                  </p>

                                  <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                    {flight.fromCity}
                                  </p>
                                </div>

                                <div className="flex min-w-[75px] flex-col items-center">
                                  <span className="whitespace-nowrap text-[10px] text-slate-400">
                                    {flight.duration}
                                  </span>

                                  <div className="my-1.5 flex w-full items-center gap-1.5">
                                    <span className="h-px flex-1 bg-slate-200" />

                                    <Plane
                                      size={13}
                                      className="shrink-0 rotate-90 text-blue-500"
                                    />

                                    <span className="h-px flex-1 bg-slate-200" />
                                  </div>

                                  <span className="whitespace-nowrap text-[10px] font-semibold text-emerald-600">
                                    {flight.stops}
                                  </span>
                                </div>

                                <div className="min-w-0 text-right">
                                  <p className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                                    {flight.arrival}
                                  </p>

                                  <p className="text-xs font-bold text-slate-500">
                                    {flight.to}
                                  </p>

                                  <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                    {flight.toCity}
                                  </p>
                                </div>
                              </div>

                              {/* FEATURES */}

                              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                  <Luggage
                                    size={13}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="truncate text-[10px] font-semibold text-slate-600">
                                    {flight.baggage}
                                  </span>
                                </div>

                                <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                  <Briefcase
                                    size={13}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="truncate text-[10px] font-semibold text-slate-600">
                                    {flight.cabin} cabin
                                  </span>
                                </div>

                                <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                  <Utensils
                                    size={13}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="truncate text-[10px] font-semibold text-slate-600">
                                    {flight.meal}
                                  </span>
                                </div>

                                <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                  <Wifi
                                    size={13}
                                    className={`shrink-0 ${flight.wifi
                                      ? "text-emerald-500"
                                      : "text-slate-300"
                                      }`}
                                  />

                                  <span className="truncate text-[10px] font-semibold text-slate-600">
                                    {flight.wifi
                                      ? "Wi-Fi"
                                      : "No Wi-Fi"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* PRICE + ACTIONS */}

                            <div className="flex min-w-0 flex-col justify-between border-t border-slate-100 pt-4 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                              <div className="flex items-start justify-between gap-3 xl:block">
                                <div>
                                  <p className="text-[10px] text-slate-400">
                                    Starting from
                                  </p>

                                  <div className="mt-0.5 flex items-baseline gap-1.5">
                                    <span className="text-xl font-extrabold text-slate-900">
                                      ₹
                                      {flight.price.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>

                                    <span className="text-[10px] text-slate-400 line-through">
                                      ₹
                                      {flight.oldPrice.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>
                                  </div>

                                  <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                                    {flight.cancellation}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSaveFlight(
                                      flight.id
                                    )
                                  }
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition xl:absolute xl:right-5 xl:top-5 ${isSaved
                                    ? "border-blue-200 bg-blue-50 text-blue-600"
                                    : "border-slate-200 text-slate-400 hover:bg-slate-50"
                                    }`}
                                  aria-label="Save flight"
                                >
                                  <Star
                                    size={14}
                                    fill={
                                      isSaved
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                </button>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-2 xl:grid-cols-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedFlight(
                                      isExpanded
                                        ? null
                                        : flight.id
                                    )
                                  }
                                  className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 sm:text-xs"
                                >
                                  {isExpanded ? (
                                    <>
                                      Hide details
                                      <ChevronUp size={13} />
                                    </>
                                  ) : (
                                    <>
                                      Flight details
                                      <ChevronDown size={13} />
                                    </>
                                  )}
                                </button>

                                <button
                                onClick={() => navigate(`/flights/${flight._id}`)}
                                  type="button"
                                  className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-[10px] font-bold text-white shadow-sm transition hover:bg-blue-700 sm:text-xs"
                                >
                                  Select
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* DETAILS */}

                          {isExpanded && (
                            <div className="mt-5 border-t border-slate-100 pt-5">
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* FLIGHT DETAILS */}

                                <div className="rounded-xl bg-slate-50 p-4">
                                  <div className="mb-3 flex items-center gap-2">
                                    <Clock3
                                      size={15}
                                      className="text-blue-600"
                                    />

                                    <h4 className="text-xs font-bold text-slate-900">
                                      Flight details
                                    </h4>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-[10px] text-slate-400">
                                        Flight number
                                      </p>

                                      <p className="mt-1 text-xs font-bold text-slate-700">
                                        {flight.flightNumber}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-[10px] text-slate-400">
                                        Aircraft
                                      </p>

                                      <p className="mt-1 text-xs font-bold text-slate-700">
                                        {flight.aircraft}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-[10px] text-slate-400">
                                        Departure
                                      </p>

                                      <p className="mt-1 text-xs font-bold text-slate-700">
                                        {flight.departure}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-[10px] text-slate-400">
                                        Arrival
                                      </p>

                                      <p className="mt-1 text-xs font-bold text-slate-700">
                                        {flight.arrival}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* BAGGAGE */}

                                <div className="rounded-xl bg-slate-50 p-4">
                                  <div className="mb-3 flex items-center gap-2">
                                    <Luggage
                                      size={15}
                                      className="text-blue-600"
                                    />

                                    <h4 className="text-xs font-bold text-slate-900">
                                      Baggage & fare
                                    </h4>
                                  </div>

                                  <div className="space-y-2.5">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-xs text-slate-500">
                                        Check-in baggage
                                      </span>

                                      <span className="text-xs font-bold text-slate-700">
                                        {flight.baggage}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-xs text-slate-500">
                                        Cabin baggage
                                      </span>

                                      <span className="text-xs font-bold text-slate-700">
                                        {flight.cabin}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-xs text-slate-500">
                                        Meal
                                      </span>

                                      <span className="text-xs font-bold text-slate-700">
                                        {flight.meal}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* INFO */}

                              <div className="mt-3 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
                                <Info
                                  size={14}
                                  className="mt-0.5 shrink-0 text-blue-600"
                                />

                                <p className="text-[10px] leading-5 text-blue-700">
                                  Prices shown are indicative and
                                  may change based on availability,
                                  fare rules and taxes.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY BOOK WITH TRIPORA
      ====================================================== */}

      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Why Tripora
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              Book flights with confidence
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {[
              {
                icon: ShieldCheck,
                title: "Secure booking",
                text: "Your booking information stays protected.",
              },
              {
                icon: Star,
                title: "Best deals",
                text: "Compare prices before you book.",
              },
              {
                icon: Clock3,
                title: "Fast search",
                text: "Find suitable flights quickly.",
              },
              {
                icon: Check,
                title: "Easy booking",
                text: "Simple and convenient booking experience.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon size={15} />
                  </div>

                  <h3 className="mt-3 truncate text-xs font-bold text-slate-900 sm:text-sm">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500 sm:text-xs">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {isFilterOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          {/* DRAWER */}

          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:left-auto sm:inset-y-0 sm:right-0 sm:w-[380px] sm:rounded-none sm:rounded-l-3xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Filters
                </h3>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Refine your flight search
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[calc(88vh-75px)] overflow-y-auto px-5 py-5">
              <FilterContent />

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 flex min-h-[46px] w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white"
              >
                Show {filteredFlights.length} flights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <button
            type="button"
            onClick={() => setActiveSort("recommended")}
            className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white"
          >
            <Star size={14} />
            Recommended
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile fixed bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
};

export default FlightPage;

