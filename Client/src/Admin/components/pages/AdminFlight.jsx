import { useMemo, useState } from "react";
import {
  Plane,
  Plus,
  Search,
  SlidersHorizontal,
  RotateCcw,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Power,
  X,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Luggage,
  ChevronLeft,
  ChevronRight,
  PlaneTakeoff,
  PlaneLanding,
  Building2,
  IndianRupee,
  Armchair,
  Timer,
  Route,
  AlertTriangle,
} from "lucide-react";

const initialFlights = [
  {
    id: 1,
    flightNumber: "6E-2045",
    airline: "IndiGo",
    airlineCode: "6E",
    aircraft: "Airbus A320",
    flightType: "Domestic",
    from: "DEL",
    fromCity: "Delhi",
    to: "BOM",
    toCity: "Mumbai",
    departureDate: "2026-09-18",
    departureTime: "06:30",
    arrivalTime: "08:40",
    duration: "2h 10m",
    price: 5499,
    businessPrice: 8999,
    seats: 42,
    totalSeats: 180,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
  {
    id: 2,
    flightNumber: "AI-687",
    airline: "Air India",
    airlineCode: "AI",
    aircraft: "Airbus A321",
    flightType: "Domestic",
    from: "BOM",
    fromCity: "Mumbai",
    to: "DEL",
    toCity: "Delhi",
    departureDate: "2026-09-18",
    departureTime: "09:15",
    arrivalTime: "11:25",
    duration: "2h 10m",
    price: 6299,
    businessPrice: 10999,
    seats: 28,
    totalSeats: 186,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
  {
    id: 3,
    flightNumber: "UK-810",
    airline: "Vistara",
    airlineCode: "UK",
    aircraft: "Airbus A320neo",
    flightType: "Domestic",
    from: "BLR",
    fromCity: "Bengaluru",
    to: "DEL",
    toCity: "Delhi",
    departureDate: "2026-09-19",
    departureTime: "14:30",
    arrivalTime: "17:15",
    duration: "2h 45m",
    price: 7199,
    businessPrice: 12999,
    seats: 16,
    totalSeats: 164,
    stops: "Non-stop",
    baggage: "20 KG",
    status: "Active",
  },
  {
    id: 4,
    flightNumber: "EK-517",
    airline: "Emirates",
    airlineCode: "EK",
    aircraft: "Boeing 777",
    flightType: "International",
    from: "DEL",
    fromCity: "Delhi",
    to: "DXB",
    toCity: "Dubai",
    departureDate: "2026-09-20",
    departureTime: "21:40",
    arrivalTime: "00:15",
    duration: "3h 35m",
    price: 28999,
    businessPrice: 74999,
    seats: 8,
    totalSeats: 354,
    stops: "Non-stop",
    baggage: "30 KG",
    status: "Active",
  },
  {
    id: 5,
    flightNumber: "SG-421",
    airline: "SpiceJet",
    airlineCode: "SG",
    aircraft: "Boeing 737",
    flightType: "Domestic",
    from: "DEL",
    fromCity: "Delhi",
    to: "GOI",
    toCity: "Goa",
    departureDate: "2026-09-21",
    departureTime: "07:20",
    arrivalTime: "09:50",
    duration: "2h 30m",
    price: 4299,
    businessPrice: 6999,
    seats: 0,
    totalSeats: 189,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Inactive",
  },
  {
    id: 6,
    flightNumber: "6E-5123",
    airline: "IndiGo",
    airlineCode: "6E",
    aircraft: "Airbus A320",
    flightType: "Domestic",
    from: "HYD",
    fromCity: "Hyderabad",
    to: "BLR",
    toCity: "Bengaluru",
    departureDate: "2026-09-22",
    departureTime: "10:10",
    arrivalTime: "11:25",
    duration: "1h 15m",
    price: 3899,
    businessPrice: 6299,
    seats: 64,
    totalSeats: 180,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
  {
    id: 7,
    flightNumber: "AI-302",
    airline: "Air India",
    airlineCode: "AI",
    aircraft: "Boeing 787",
    flightType: "International",
    from: "DEL",
    fromCity: "Delhi",
    to: "LHR",
    toCity: "London",
    departureDate: "2026-09-23",
    departureTime: "02:15",
    arrivalTime: "07:10",
    duration: "10h 25m",
    price: 54999,
    businessPrice: 129999,
    seats: 21,
    totalSeats: 256,
    stops: "Non-stop",
    baggage: "30 KG",
    status: "Active",
  },
  {
    id: 8,
    flightNumber: "IX-1345",
    airline: "Air India Express",
    airlineCode: "IX",
    aircraft: "Boeing 737 MAX",
    flightType: "Domestic",
    from: "CCU",
    fromCity: "Kolkata",
    to: "DEL",
    toCity: "Delhi",
    departureDate: "2026-09-24",
    departureTime: "16:25",
    arrivalTime: "18:55",
    duration: "2h 30m",
    price: 4599,
    businessPrice: 7499,
    seats: 35,
    totalSeats: 186,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
  {
    id: 9,
    flightNumber: "6E-781",
    airline: "IndiGo",
    airlineCode: "6E",
    aircraft: "Airbus A321",
    flightType: "Domestic",
    from: "BOM",
    fromCity: "Mumbai",
    to: "GOI",
    toCity: "Goa",
    departureDate: "2026-09-25",
    departureTime: "13:45",
    arrivalTime: "14:55",
    duration: "1h 10m",
    price: 3499,
    businessPrice: 5799,
    seats: 51,
    totalSeats: 186,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
  {
    id: 10,
    flightNumber: "AI-567",
    airline: "Air India",
    airlineCode: "AI",
    aircraft: "Airbus A320",
    flightType: "Domestic",
    from: "MAA",
    fromCity: "Chennai",
    to: "DEL",
    toCity: "Delhi",
    departureDate: "2026-09-26",
    departureTime: "19:20",
    arrivalTime: "22:15",
    duration: "2h 55m",
    price: 6799,
    businessPrice: 11499,
    seats: 12,
    totalSeats: 180,
    stops: "Non-stop",
    baggage: "15 KG",
    status: "Active",
  },
];

const emptyFlight = {
  flightNumber: "",
  airline: "",
  aircraft: "",
  flightType: "Domestic",
  from: "",
  fromCity: "",
  to: "",
  toCity: "",
  departureDate: "",
  departureTime: "",
  arrivalTime: "",
  duration: "",
  price: "",
  businessPrice: "",
  seats: "",
  totalSeats: "",
  stops: "Non-stop",
  baggage: "15 KG",
  status: "Active",
};

const formatPrice = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

function AdminFlight() {
  const [flights, setFlights] = useState(initialFlights);

  const [search, setSearch] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [formData, setFormData] = useState(emptyFlight);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const airlines = useMemo(() => {
    return [...new Set(flights.map((flight) => flight.airline))];
  }, [flights]);

  const fromCities = useMemo(() => {
    return [...new Set(flights.map((flight) => flight.from))];
  }, [flights]);

  const toCities = useMemo(() => {
    return [...new Set(flights.map((flight) => flight.to))];
  }, [flights]);

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        flight.flightNumber.toLowerCase().includes(searchText) ||
        flight.airline.toLowerCase().includes(searchText) ||
        flight.from.toLowerCase().includes(searchText) ||
        flight.to.toLowerCase().includes(searchText) ||
        flight.fromCity.toLowerCase().includes(searchText) ||
        flight.toCity.toLowerCase().includes(searchText);

      const matchesAirline =
        !airlineFilter || flight.airline === airlineFilter;

      const matchesType =
        !typeFilter || flight.flightType === typeFilter;

      const matchesStatus =
        !statusFilter || flight.status === statusFilter;

      const matchesFrom =
        !fromFilter || flight.from === fromFilter;

      const matchesTo =
        !toFilter || flight.to === toFilter;

      return (
        matchesSearch &&
        matchesAirline &&
        matchesType &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    flights,
    search,
    airlineFilter,
    typeFilter,
    statusFilter,
    fromFilter,
    toFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFlights.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedFlights = filteredFlights.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const totalFlights = flights.length;

  const activeFlights = flights.filter(
    (flight) => flight.status === "Active"
  ).length;

  const inactiveFlights = flights.filter(
    (flight) => flight.status === "Inactive"
  ).length;

  const airlineCount = new Set(
    flights.map((flight) => flight.airline)
  ).size;

  const resetFilters = () => {
    setSearch("");
    setAirlineFilter("");
    setTypeFilter("");
    setStatusFilter("");
    setFromFilter("");
    setToFilter("");
    setCurrentPage(1);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setFormData(emptyFlight);
    setSelectedFlight(null);
    setShowAddModal(true);
    setOpenMenu(null);
  };

  const openEditModal = (flight) => {
    setSelectedFlight(flight);
    setFormData({
      ...flight,
      price: String(flight.price),
      businessPrice: String(flight.businessPrice),
      seats: String(flight.seats),
      totalSeats: String(flight.totalSeats),
    });
    setShowEditModal(true);
    setOpenMenu(null);
  };

  const openDetailsModal = (flight) => {
    setSelectedFlight(flight);
    setShowDetailsModal(true);
    setOpenMenu(null);
  };

  const openDeleteModal = (flight) => {
    setSelectedFlight(flight);
    setShowDeleteModal(true);
    setOpenMenu(null);
  };

  const handleAddFlight = (e) => {
    e.preventDefault();

    const newFlight = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      businessPrice: Number(formData.businessPrice),
      seats: Number(formData.seats),
      totalSeats: Number(formData.totalSeats),
    };

    setFlights((prev) => [newFlight, ...prev]);
    setShowAddModal(false);
    setFormData(emptyFlight);
    setCurrentPage(1);
  };

  const handleEditFlight = (e) => {
    e.preventDefault();

    setFlights((prev) =>
      prev.map((flight) =>
        flight.id === selectedFlight.id
          ? {
              ...formData,
              id: selectedFlight.id,
              price: Number(formData.price),
              businessPrice: Number(formData.businessPrice),
              seats: Number(formData.seats),
              totalSeats: Number(formData.totalSeats),
            }
          : flight
      )
    );

    setShowEditModal(false);
    setSelectedFlight(null);
    setFormData(emptyFlight);
  };

  const toggleStatus = (flight) => {
    setFlights((prev) =>
      prev.map((item) =>
        item.id === flight.id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );

    setOpenMenu(null);
  };

  const handleDelete = () => {
    if (!selectedFlight) return;

    setFlights((prev) =>
      prev.filter((flight) => flight.id !== selectedFlight.id)
    );

    setShowDeleteModal(false);
    setSelectedFlight(null);

    if (
      safeCurrentPage > 1 &&
      paginatedFlights.length === 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-2 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Plane size={18} />
              </div>

              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Flights
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Manage all flights available on Tripora
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add New Flight
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
          <StatCard
            title="Total Flights"
            value={totalFlights}
            change="+12.4%"
            icon={Plane}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Active Flights"
            value={activeFlights}
            change="+8.6%"
            icon={Power}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Inactive Flights"
            value={inactiveFlights}
            change="-3.2%"
            icon={AlertTriangle}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            negative
          />

          <StatCard
            title="Airlines"
            value={airlineCount}
            change="+2 new"
            icon={Building2}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search flight number, airline, route..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <button
              onClick={resetFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-5">
              <FilterSelect
                label="Airline"
                value={airlineFilter}
                onChange={(value) => {
                  setAirlineFilter(value);
                  setCurrentPage(1);
                }}
                options={airlines}
                placeholder="All Airlines"
              />

              <FilterSelect
                label="Flight Type"
                value={typeFilter}
                onChange={(value) => {
                  setTypeFilter(value);
                  setCurrentPage(1);
                }}
                options={["Domestic", "International"]}
                placeholder="All Types"
              />

              <FilterSelect
                label="Status"
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                options={["Active", "Inactive"]}
                placeholder="All Status"
              />

              <FilterSelect
                label="From"
                value={fromFilter}
                onChange={(value) => {
                  setFromFilter(value);
                  setCurrentPage(1);
                }}
                options={fromCities}
                placeholder="All Origins"
              />

              <FilterSelect
                label="To"
                value={toFilter}
                onChange={(value) => {
                  setToFilter(value);
                  setCurrentPage(1);
                }}
                options={toCities}
                placeholder="All Destinations"
              />
            </div>
          )}
        </div>

        {/* Result Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredFlights.length}
            </span>{" "}
            flights
          </p>

          <p className="hidden text-sm text-slate-400 sm:block">
            Page {safeCurrentPage} of {totalPages}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <TableHeader>Flight</TableHeader>
                  <TableHeader>Airline</TableHeader>
                  <TableHeader>Route</TableHeader>
                  <TableHeader>Departure</TableHeader>
                  <TableHeader>Arrival</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Seats</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader align="right">Action</TableHeader>
                </tr>
              </thead>

              <tbody>
                {paginatedFlights.length > 0 ? (
                  paginatedFlights.map((flight) => (
                    <tr
                      key={flight.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                    >
                      {/* Flight */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <AirlineLogo
                            code={flight.airlineCode}
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {flight.flightNumber}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {flight.flightType} · {flight.stops}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Airline */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {flight.airline}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {flight.aircraft}
                        </p>
                      </td>

                      {/* Route */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {flight.from}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {flight.fromCity}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 text-slate-300">
                            <span className="h-px w-5 bg-slate-200" />
                            <Plane
                              size={14}
                              className="text-blue-500"
                            />
                            <span className="h-px w-5 bg-slate-200" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {flight.to}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {flight.toCity}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Departure */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {flight.departureTime}
                        </p>

                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                          <CalendarDays size={12} />
                          {formatDate(flight.departureDate)}
                        </p>
                      </td>

                      {/* Arrival */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {flight.arrivalTime}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {flight.duration}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {formatPrice(flight.price)}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Economy
                        </p>
                      </td>

                      {/* Seats */}
                      <td className="px-4 py-4">
                        <p
                          className={`text-sm font-semibold ${
                            flight.seats === 0
                              ? "text-red-600"
                              : flight.seats <= 10
                              ? "text-amber-600"
                              : "text-slate-800"
                          }`}
                        >
                          {flight.seats}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          / {flight.totalSeats}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                            flight.status
                          )}`}
                        >
                          {flight.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="relative px-4 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === flight.id
                                  ? null
                                  : flight.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openMenu === flight.id && (
                            <ActionMenu
                              flight={flight}
                              onView={() =>
                                openDetailsModal(flight)
                              }
                              onEdit={() =>
                                openEditModal(flight)
                              }
                              onToggle={() =>
                                toggleStatus(flight)
                              }
                              onDelete={() =>
                                openDeleteModal(flight)
                              }
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyTable />
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile / Tablet Cards */}
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          {paginatedFlights.length > 0 ? (
            paginatedFlights.map((flight) => (
              <div
                key={flight.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <AirlineLogo code={flight.airlineCode} />

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">
                          {flight.flightNumber}
                        </p>

                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusClass(
                            flight.status
                          )}`}
                        >
                          {flight.status}
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {flight.airline} · {flight.aircraft}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === flight.id
                            ? null
                            : flight.id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === flight.id && (
                      <ActionMenu
                        mobile
                        flight={flight}
                        onView={() =>
                          openDetailsModal(flight)
                        }
                        onEdit={() =>
                          openEditModal(flight)
                        }
                        onToggle={() =>
                          toggleStatus(flight)
                        }
                        onDelete={() =>
                          openDeleteModal(flight)
                        }
                      />
                    )}
                  </div>
                </div>

                {/* Route */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">
                        {flight.departureTime}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {flight.from} · {flight.fromCity}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-4">
                      <p className="mb-1 text-[10px] text-slate-400">
                        {flight.duration}
                      </p>

                      <div className="flex w-full items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span className="h-px flex-1 bg-slate-200" />
                        <Plane
                          size={14}
                          className="mx-1 text-blue-500"
                        />
                        <span className="h-px flex-1 bg-slate-200" />
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      </div>

                      <p className="mt-1 text-[10px] font-medium text-slate-400">
                        {flight.stops}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">
                        {flight.arrivalTime}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {flight.to} · {flight.toCity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[10px] text-slate-400">
                      Date
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {formatDate(flight.departureDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">
                      Seats
                    </p>
                    <p
                      className={`mt-1 text-xs font-semibold ${
                        flight.seats === 0
                          ? "text-red-600"
                          : "text-slate-700"
                      }`}
                    >
                      {flight.seats} available
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">
                      From
                    </p>
                    <p className="mt-1 text-sm font-bold text-blue-600">
                      {formatPrice(flight.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white py-14 text-center">
              <Plane className="mx-auto text-slate-300" size={35} />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                No flights found
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredFlights.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {(safeCurrentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              -
              <span className="font-semibold text-slate-700">
                {" "}
                {Math.min(
                  safeCurrentPage * itemsPerPage,
                  filteredFlights.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredFlights.length}
              </span>
            </p>

            <div className="flex items-center justify-center gap-1">
              <button
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      safeCurrentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalPages, prev + 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Flight Modal */}
      {showAddModal && (
        <FlightFormModal
          title="Add New Flight"
          subtitle="Create a new flight for Tripora"
          formData={formData}
          onChange={handleFormChange}
          onClose={() => {
            setShowAddModal(false);
            setFormData(emptyFlight);
          }}
          onSubmit={handleAddFlight}
          submitText="Add Flight"
        />
      )}

      {/* Edit Flight Modal */}
      {showEditModal && (
        <FlightFormModal
          title="Edit Flight"
          subtitle="Update flight information"
          formData={formData}
          onChange={handleFormChange}
          onClose={() => {
            setShowEditModal(false);
            setFormData(emptyFlight);
          }}
          onSubmit={handleEditFlight}
          submitText="Save Changes"
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedFlight && (
        <FlightDetailsModal
          flight={selectedFlight}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedFlight(null);
          }}
          onEdit={() => {
            setShowDetailsModal(false);
            openEditModal(selectedFlight);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedFlight && (
        <DeleteModal
          flight={selectedFlight}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedFlight(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  negative = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={19} className={iconColor} />
        </div>
      </div>

      <div className="mt-3">
        <span
          className={`text-xs font-semibold ${
            negative ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {change}
        </span>

        <span className="ml-1 text-xs text-slate-400">
          from last month
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({ children, align = "left" }) {
  return (
    <th
      className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

/* =========================================================
   AIRLINE LOGO
========================================================= */

function AirlineLogo({ code }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
      {code}
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function ActionMenu({
  flight,
  onView,
  onEdit,
  onToggle,
  onDelete,
  mobile = false,
}) {
  return (
    <div
      className={`absolute z-[100] ${
        mobile ? "right-0 top-10" : "right-0 top-10"
      } w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl`}
    >
      <button
        onClick={onView}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
      >
        <Eye size={16} />
        View Details
      </button>

      <button
        onClick={onEdit}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
      >
        <Pencil size={16} />
        Edit Flight
      </button>

      <button
        onClick={onView}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
      >
        <Users size={16} />
        View Bookings
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
      >
        <Power size={16} />
        {flight.status === "Active"
          ? "Deactivate"
          : "Activate"}
      </button>

      <button
        onClick={onDelete}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete Flight
      </button>
    </div>
  );
}

/* =========================================================
   EMPTY TABLE
========================================================= */

function EmptyTable() {
  return (
    <tr>
      <td colSpan="9">
        <div className="py-16 text-center">
          <Plane
            size={38}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No flights found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   FLIGHT FORM MODAL
========================================================= */

function FlightFormModal({
  title,
  subtitle,
  formData,
  onChange,
  onClose,
  onSubmit,
  submitText,
}) {
  return (
    <Modal onClose={onClose}>
      <div className="flex max-h-[92vh] flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="overflow-y-auto px-5 py-5 sm:px-6"
        >
          {/* Basic Information */}
          <FormSection
            icon={Plane}
            title="Basic Information"
          >
            <InputField
              label="Flight Number"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={onChange}
              placeholder="e.g. 6E-2045"
              required
            />

            <InputField
              label="Airline"
              name="airline"
              value={formData.airline}
              onChange={onChange}
              placeholder="e.g. IndiGo"
              required
            />

            <SelectField
              label="Flight Type"
              name="flightType"
              value={formData.flightType}
              onChange={onChange}
              options={[
                "Domestic",
                "International",
              ]}
            />

            <InputField
              label="Aircraft"
              name="aircraft"
              value={formData.aircraft}
              onChange={onChange}
              placeholder="e.g. Airbus A320"
              required
            />
          </FormSection>

          {/* Route */}
          <FormSection
            icon={Route}
            title="Route & Schedule"
          >
            <InputField
              label="From Airport"
              name="from"
              value={formData.from}
              onChange={onChange}
              placeholder="e.g. DEL"
              required
            />

            <InputField
              label="From City"
              name="fromCity"
              value={formData.fromCity}
              onChange={onChange}
              placeholder="e.g. Delhi"
              required
            />

            <InputField
              label="To Airport"
              name="to"
              value={formData.to}
              onChange={onChange}
              placeholder="e.g. BOM"
              required
            />

            <InputField
              label="To City"
              name="toCity"
              value={formData.toCity}
              onChange={onChange}
              placeholder="e.g. Mumbai"
              required
            />

            <InputField
              label="Departure Date"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={onChange}
              required
            />

            <InputField
              label="Departure Time"
              name="departureTime"
              type="time"
              value={formData.departureTime}
              onChange={onChange}
              required
            />

            <InputField
              label="Arrival Time"
              name="arrivalTime"
              type="time"
              value={formData.arrivalTime}
              onChange={onChange}
              required
            />

            <InputField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={onChange}
              placeholder="e.g. 2h 10m"
              required
            />
          </FormSection>

          {/* Pricing */}
          <FormSection
            icon={IndianRupee}
            title="Pricing & Seats"
          >
            <InputField
              label="Economy Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={onChange}
              placeholder="5499"
              required
            />

            <InputField
              label="Business Price"
              name="businessPrice"
              type="number"
              value={formData.businessPrice}
              onChange={onChange}
              placeholder="8999"
            />

            <InputField
              label="Available Seats"
              name="seats"
              type="number"
              value={formData.seats}
              onChange={onChange}
              placeholder="42"
              required
            />

            <InputField
              label="Total Seats"
              name="totalSeats"
              type="number"
              value={formData.totalSeats}
              onChange={onChange}
              placeholder="180"
              required
            />
          </FormSection>

          {/* Additional */}
          <FormSection
            icon={Luggage}
            title="Additional Information"
          >
            <SelectField
              label="Stops"
              name="stops"
              value={formData.stops}
              onChange={onChange}
              options={[
                "Non-stop",
                "1 Stop",
                "2 Stops",
              ]}
            />

            <SelectField
              label="Baggage"
              name="baggage"
              value={formData.baggage}
              onChange={onChange}
              options={[
                "7 KG",
                "15 KG",
                "20 KG",
                "30 KG",
                "40 KG",
              ]}
            />

            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={onChange}
              options={[
                "Active",
                "Inactive",
              ]}
            />
          </FormSection>

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({ icon: Icon, title, children }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={16} />
        </div>

        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function FlightDetailsModal({
  flight,
  onClose,
  onEdit,
}) {
  return (
    <Modal onClose={onClose}>
      <div className="max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <AirlineLogo code={flight.airlineCode} />

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {flight.flightNumber}
              </h2>

              <p className="text-xs text-slate-400">
                {flight.airline} · {flight.aircraft}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {/* Status */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div>
              <p className="text-xs text-slate-400">
                Flight Status
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {flight.flightType}
              </p>
            </div>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                flight.status === "Active"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {flight.status}
            </span>
          </div>

          {/* Route */}
          <div className="mt-4 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {flight.departureTime}
                </p>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  {flight.from}
                </p>

                <p className="text-xs text-slate-400">
                  {flight.fromCity}
                </p>
              </div>

              <div className="flex flex-1 flex-col items-center px-3">
                <div className="flex w-full items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="h-px flex-1 bg-slate-200" />

                  <div className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Plane size={15} />
                  </div>

                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                </div>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  {flight.duration} · {flight.stops}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {flight.arrivalTime}
                </p>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  {flight.to}
                </p>

                <p className="text-xs text-slate-400">
                  {flight.toCity}
                </p>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <DetailItem
              icon={CalendarDays}
              label="Departure Date"
              value={formatDate(flight.departureDate)}
            />

            <DetailItem
              icon={Timer}
              label="Duration"
              value={flight.duration}
            />

            <DetailItem
              icon={Route}
              label="Stops"
              value={flight.stops}
            />

            <DetailItem
              icon={Luggage}
              label="Baggage"
              value={flight.baggage}
            />

            <DetailItem
              icon={Armchair}
              label="Available Seats"
              value={`${flight.seats} / ${flight.totalSeats}`}
            />

            <DetailItem
              icon={Plane}
              label="Aircraft"
              value={flight.aircraft}
            />
          </div>

          {/* Pricing */}
          <div className="mt-4 rounded-2xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-slate-800">
              Pricing
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Economy
                </p>

                <p className="mt-1 text-lg font-bold text-blue-600">
                  {formatPrice(flight.price)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Business
                </p>

                <p className="mt-1 text-lg font-bold text-blue-600">
                  {formatPrice(flight.businessPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              onClick={onEdit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Pencil size={16} />
              Edit Flight
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-blue-500" />

        <p className="text-[11px] text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  flight,
  onClose,
  onConfirm,
}) {
  return (
    <Modal onClose={onClose} small>
      <div className="p-5 sm:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={21} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Delete Flight?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">
            {flight.flightNumber}
          </span>{" "}
          from{" "}
          <span className="font-semibold text-slate-700">
            {flight.from}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-700">
            {flight.to}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete Flight
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   GENERIC MODAL
========================================================= */

function Modal({
  children,
  onClose,
  small = false,
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${
          small
            ? "max-w-md"
            : "max-w-4xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date) {
  if (!date) return "-";

  const formatted = new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatted;
}

export default AdminFlight;