import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Plane,
  Hotel,
  Map,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  Download,
  Ban,
  UserRound,
  RefreshCcw,
  X,
  MapPin,
  Mail,
  Phone,
  IndianRupee,
  WalletCards,
  ArrowRight,
  Ticket,
  Building2,
  Package,
} from "lucide-react";

const bookingsData = [
  {
    id: "TRP784521",
    customer: "Vishal Kumar",
    email: "vishal@example.com",
    phone: "+91 98765 43210",
    type: "Flight",
    route: "DEL → BOM",
    details: "IndiGo • 6E-2045",
    date: "18 Sep 2026",
    rawDate: "2026-09-18",
    amount: 5499,
    status: "Confirmed",
    payment: "Paid",
    passengers: 1,
    bookingDate: "12 Sep 2026",
    location: "Delhi → Mumbai",
  },
  {
    id: "TRP784522",
    customer: "Rahul Singh",
    email: "rahul@example.com",
    phone: "+91 98765 11223",
    type: "Hotel",
    route: "Dubai",
    details: "Grand Dubai Hotel • Deluxe Room",
    date: "20 Sep 2026",
    rawDate: "2026-09-20",
    amount: 8999,
    status: "Confirmed",
    payment: "Paid",
    passengers: 2,
    bookingDate: "11 Sep 2026",
    location: "Dubai, UAE",
  },
  {
    id: "TRP784523",
    customer: "Aman Kumar",
    email: "aman@example.com",
    phone: "+91 91234 56789",
    type: "Package",
    route: "Bali",
    details: "Bali Explorer • 5 Nights / 6 Days",
    date: "24 Sep 2026",
    rawDate: "2026-09-24",
    amount: 34999,
    status: "Completed",
    payment: "Paid",
    passengers: 2,
    bookingDate: "8 Sep 2026",
    location: "Bali, Indonesia",
  },
  {
    id: "TRP784524",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 99887 66554",
    type: "Flight",
    route: "BOM → DEL",
    details: "Air India • AI-687",
    date: "26 Sep 2026",
    rawDate: "2026-09-26",
    amount: 6299,
    status: "Pending",
    payment: "Pending",
    passengers: 1,
    bookingDate: "13 Sep 2026",
    location: "Mumbai → Delhi",
  },
  {
    id: "TRP784525",
    customer: "Neha Verma",
    email: "neha@example.com",
    phone: "+91 98711 22334",
    type: "Hotel",
    route: "Goa",
    details: "Sea View Resort • Premium Room",
    date: "28 Sep 2026",
    rawDate: "2026-09-28",
    amount: 12499,
    status: "Cancelled",
    payment: "Refunded",
    passengers: 3,
    bookingDate: "5 Sep 2026",
    location: "Goa, India",
  },
  {
    id: "TRP784526",
    customer: "Arjun Patel",
    email: "arjun@example.com",
    phone: "+91 98111 33445",
    type: "Package",
    route: "Thailand",
    details: "Thailand Escape • 4 Nights / 5 Days",
    date: "30 Sep 2026",
    rawDate: "2026-09-30",
    amount: 29999,
    status: "Confirmed",
    payment: "Paid",
    passengers: 2,
    bookingDate: "10 Sep 2026",
    location: "Bangkok, Thailand",
  },
  {
    id: "TRP784527",
    customer: "Pooja Gupta",
    email: "pooja@example.com",
    phone: "+91 97654 88776",
    type: "Flight",
    route: "BLR → DEL",
    details: "Vistara • UK-810",
    date: "02 Oct 2026",
    rawDate: "2026-10-02",
    amount: 7199,
    status: "Confirmed",
    payment: "Paid",
    passengers: 2,
    bookingDate: "12 Sep 2026",
    location: "Bangalore → Delhi",
  },
  {
    id: "TRP784528",
    customer: "Rohit Yadav",
    email: "rohit@example.com",
    phone: "+91 96543 11221",
    type: "Hotel",
    route: "Manali",
    details: "Snow Valley Resort • Suite",
    date: "05 Oct 2026",
    rawDate: "2026-10-05",
    amount: 10999,
    status: "Pending",
    payment: "Pending",
    passengers: 2,
    bookingDate: "14 Sep 2026",
    location: "Manali, India",
  },
  {
    id: "TRP784529",
    customer: "Anjali Singh",
    email: "anjali@example.com",
    phone: "+91 95432 77889",
    type: "Package",
    route: "Dubai",
    details: "Dubai Premium • 3 Nights / 4 Days",
    date: "08 Oct 2026",
    rawDate: "2026-10-08",
    amount: 45999,
    status: "Confirmed",
    payment: "Paid",
    passengers: 4,
    bookingDate: "13 Sep 2026",
    location: "Dubai, UAE",
  },
  {
    id: "TRP784530",
    customer: "Karan Mehta",
    email: "karan@example.com",
    phone: "+91 94321 66778",
    type: "Flight",
    route: "DEL → DXB",
    details: "Emirates • EK-517",
    date: "12 Oct 2026",
    rawDate: "2026-10-12",
    amount: 28999,
    status: "Completed",
    payment: "Paid",
    passengers: 1,
    bookingDate: "1 Sep 2026",
    location: "Delhi → Dubai",
  },
];

const stats = [
  {
    title: "Total Bookings",
    value: "3,842",
    change: "+12.5%",
    icon: Ticket,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Upcoming",
    value: "1,245",
    change: "+8.2%",
    icon: CalendarDays,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Completed",
    value: "2,321",
    change: "+15.4%",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Cancelled",
    value: "276",
    change: "-4.5%",
    icon: XCircle,
    iconClass: "bg-red-50 text-red-600",
  },
];

const bookingTypes = ["All", "Flight", "Hotel", "Package"];

const getTypeIcon = (type) => {
  if (type === "Flight") return Plane;
  if (type === "Hotel") return Hotel;
  return Package;
};

const getTypeStyle = (type) => {
  if (type === "Flight") {
    return "bg-blue-50 text-blue-600";
  }

  if (type === "Hotel") {
    return "bg-violet-50 text-violet-600";
  }

  return "bg-orange-50 text-orange-600";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "Completed":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-100";
    default:
      return "bg-slate-50 text-slate-700 border-slate-100";
  }
};

const getPaymentStyle = (payment) => {
  switch (payment) {
    case "Paid":
      return "text-emerald-600";
    case "Pending":
      return "text-amber-600";
    case "Refunded":
      return "text-blue-600";
    case "Failed":
      return "text-red-600";
    default:
      return "text-slate-600";
  }
};

function Bookings() {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        booking.id.toLowerCase().includes(searchValue) ||
        booking.customer.toLowerCase().includes(searchValue) ||
        booking.email.toLowerCase().includes(searchValue) ||
        booking.route.toLowerCase().includes(searchValue);

      const matchesType =
        activeType === "All" || booking.type === activeType;

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || booking.payment === paymentFilter;

      const matchesFrom =
        !dateFrom || booking.rawDate >= dateFrom;

      const matchesTo =
        !dateTo || booking.rawDate <= dateTo;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesPayment &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    search,
    activeType,
    statusFilter,
    paymentFilter,
    dateFrom,
    dateTo,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / itemsPerPage)
  );

  const visibleBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setActiveType("All");
    setStatusFilter("All");
    setPaymentFilter("All");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-2 py-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Bookings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all Tripora bookings
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCcw size={16} />
            Reset Filters
          </button>
        </div>

        {/* Stats */}
        <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      {stat.change}{" "}
                      <span className="font-normal text-slate-400">
                        vs last month
                      </span>
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                  >
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Search + Filter */}
          <div className="border-b border-slate-200 p-2 sm:p-2">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search booking ID, customer, email..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                  showFilters
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter size={17} />
                Filters
                <ChevronDown
                  size={16}
                  className={`transition ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Status */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Booking Status
                    </label>

                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="All">All Status</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Payment */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Payment
                    </label>

                    <select
                      value={paymentFilter}
                      onChange={(e) => {
                        setPaymentFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="All">All Payments</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  {/* From */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Date From
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => {
                          setDateFrom(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Date To
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                          setDateTo(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
              {bookingTypes.map((type) => {
                const isActive = activeType === type;

                return (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {type === "All" ? "All Bookings" : `${type}s`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredBookings.length}
                </span>{" "}
                bookings
              </p>

              <p className="hidden text-xs text-slate-400 sm:block">
                {activeType === "All"
                  ? "All booking types"
                  : `${activeType} bookings`}
              </p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Booking
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Trip Details
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleBookings.map((booking) => {
                  const TypeIcon = getTypeIcon(booking.type);

                  return (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-blue-600">
                          {booking.id}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {booking.bookingDate}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {booking.customer
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {booking.customer}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {booking.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${getTypeStyle(
                              booking.type
                            )}`}
                          >
                            <TypeIcon size={15} />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {booking.type}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {booking.route}
                        </p>

                        <p className="mt-1 max-w-[220px] truncate text-xs text-slate-400">
                          {booking.details}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {booking.date}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {booking.passengers}{" "}
                          {booking.passengers === 1
                            ? "Passenger"
                            : "Passengers"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-800">
                          ₹{booking.amount.toLocaleString("en-IN")}
                        </p>

                        <p
                          className={`mt-1 text-xs font-medium ${getPaymentStyle(
                            booking.payment
                          )}`}
                        >
                          {booking.payment}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status === "Confirmed" && (
                            <CheckCircle2 size={12} />
                          )}

                          {booking.status === "Pending" && (
                            <Clock3 size={12} />
                          )}

                          {booking.status === "Completed" && (
                            <CheckCircle2 size={12} />
                          )}

                          {booking.status === "Cancelled" && (
                            <XCircle size={12} />
                          )}

                          {booking.status}
                        </span>
                      </td>

                      <td className="relative px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === booking.id ? null : booking.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openMenu === booking.id && (
                          <BookingActionMenu
                            booking={booking}
                            onView={handleView}
                            onClose={() => setOpenMenu(null)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {visibleBookings.length === 0 && (
              <EmptyState />
            )}
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {visibleBookings.map((booking) => {
              const TypeIcon = getTypeIcon(booking.type);

              return (
                <div
                  key={booking.id}
                  className="relative p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getTypeStyle(
                          booking.type
                        )}`}
                      >
                        <TypeIcon size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-blue-600">
                          {booking.id}
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
                          {booking.customer}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === booking.id ? null : booking.id
                        )
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === booking.id && (
                      <BookingActionMenu
                        booking={booking}
                        onView={handleView}
                        onClose={() => setOpenMenu(null)}
                        mobile
                      />
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Trip
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {booking.route}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {booking.details}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Travel Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {booking.date}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {booking.passengers}{" "}
                        {booking.passengers === 1
                          ? "Passenger"
                          : "Passengers"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Amount</p>

                      <p className="mt-0.5 text-base font-bold text-slate-900">
                        ₹{booking.amount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                      <p
                        className={`mt-1 text-xs font-medium ${getPaymentStyle(
                          booking.payment
                        )}`}
                      >
                        {booking.payment}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleView(booking)}
                    className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    View Booking
                  </button>
                </div>
              );
            })}

            {visibleBookings.length === 0 && <EmptyState />}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredBookings.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              –{" "}
              <span className="font-semibold text-slate-800">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredBookings.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredBookings.length}
              </span>
            </p>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

/* ---------------------------------------
   Action Menu
---------------------------------------- */

function BookingActionMenu({
  booking,
  onView,
  onClose,
  mobile = false,
}) {
  return (
    <div
      className={`absolute z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl ${
        mobile
          ? "right-4 top-14"
          : "right-5 top-12"
      }`}
    >
      <button
        onClick={() => onView(booking)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Eye size={16} />
        View Details
      </button>

      <button
        onClick={() => {
          alert(`Customer: ${booking.customer}`);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <UserRound size={16} />
        View Customer
      </button>

      <button
        onClick={() => {
          alert(`Payment status: ${booking.payment}`);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <CreditCard size={16} />
        View Payment
      </button>

      <button
        onClick={() => {
          alert(`Invoice for ${booking.id}`);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Download size={16} />
        Download Invoice
      </button>

      {booking.status !== "Cancelled" && (
        <>
          <div className="my-1 border-t border-slate-100" />

          <button
            onClick={() => {
              const confirmed = window.confirm(
                `Cancel booking ${booking.id}?`
              );

              if (confirmed) {
                alert("Booking cancellation API will be connected here.");
              }

              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Ban size={16} />
            Cancel Booking
          </button>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------
   Empty State
---------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Search size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        No bookings found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Try changing your search or filters to find matching bookings.
      </p>
    </div>
  );
}

/* ---------------------------------------
   Booking Details Modal
---------------------------------------- */

function BookingDetailsModal({ booking, onClose }) {
  const TypeIcon = getTypeIcon(booking.type);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Booking Details
              </h2>

              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              {booking.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={19} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {/* Customer */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={17} className="text-blue-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Customer Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                  <UserRound size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">
                    Customer
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {booking.customer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                  <Mail size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400">
                    Email
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-800">
                    {booking.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                  <Phone size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {booking.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                  <Users size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">
                    Travellers
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {booking.passengers}{" "}
                    {booking.passengers === 1
                      ? "Person"
                      : "People"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Trip */}
          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={17} className="text-blue-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Trip Information
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getTypeStyle(
                    booking.type
                  )}`}
                >
                  <TypeIcon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {booking.type}
                    </span>

                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {booking.id}
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {booking.route}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {booking.details}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InfoBox
                  icon={CalendarDays}
                  label="Travel Date"
                  value={booking.date}
                />

                <InfoBox
                  icon={MapPin}
                  label="Location"
                  value={booking.location}
                />

                <InfoBox
                  icon={Users}
                  label="Travellers"
                  value={`${booking.passengers} ${
                    booking.passengers === 1
                      ? "Person"
                      : "People"
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard size={17} className="text-blue-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Payment Information
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <WalletCards size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Payment Status
                    </p>

                    <p
                      className={`text-sm font-bold ${getPaymentStyle(
                        booking.payment
                      )}`}
                    >
                      {booking.payment}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Total Amount
                  </p>

                  <p className="mt-1 flex items-center justify-end text-lg font-bold text-slate-900">
                    <IndianRupee size={17} />
                    {booking.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 text-sm">
                <span className="text-slate-500">
                  Booking Date
                </span>

                <span className="font-semibold text-slate-800">
                  {booking.bookingDate}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:justify-end">
          <button
            onClick={() => alert(`Invoice: ${booking.id}`)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download size={16} />
            Download Invoice
          </button>

          {booking.status !== "Cancelled" && (
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  `Cancel booking ${booking.id}?`
                );

                if (confirmed) {
                  alert(
                    "Cancellation API will be connected here."
                  );
                  onClose();
                }
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Ban size={16} />
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={14} />

        <span className="text-[11px] font-medium">
          {label}
        </span>
      </div>

      <p className="mt-1.5 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default Bookings;