import {
  Users,
  CalendarCheck,
  IndianRupee,
  Gift,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plane,
  Hotel,
  Palmtree,
  MoreHorizontal,
  MapPin,
  UserPlus,
  Plus,
  TicketPercent,
  Building2,
  Package,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    change: "12.5%",
    description: "vs last month",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "up",
  },
  {
    title: "Total Bookings",
    value: "3,842",
    change: "8.2%",
    description: "vs last month",
    icon: CalendarCheck,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "₹48.5L",
    change: "15.4%",
    description: "vs last month",
    icon: IndianRupee,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "up",
  },
  {
    title: "Active Offers",
    value: "24",
    change: "4.5%",
    description: "vs last month",
    icon: Gift,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    trend: "up",
  },
];

const bookings = [
  {
    id: "TRP784521",
    customer: "Vishal Kumar",
    type: "Flight",
    destination: "Mumbai",
    amount: "₹5,499",
    status: "Confirmed",
    icon: Plane,
  },
  {
    id: "TRP784522",
    customer: "Rahul Singh",
    type: "Hotel",
    destination: "Dubai",
    amount: "₹8,999",
    status: "Confirmed",
    icon: Hotel,
  },
  {
    id: "TRP784523",
    customer: "Aman Kumar",
    type: "Package",
    destination: "Bali",
    amount: "₹34,999",
    status: "Paid",
    icon: Palmtree,
  },
  {
    id: "TRP784524",
    customer: "Priya Sharma",
    type: "Flight",
    destination: "Delhi",
    amount: "₹6,299",
    status: "Pending",
    icon: Plane,
  },
  {
    id: "TRP784525",
    customer: "Neha Verma",
    type: "Hotel",
    destination: "Goa",
    amount: "₹12,499",
    status: "Cancelled",
    icon: Hotel,
  },
];

const destinations = [
  {
    name: "Dubai",
    bookings: "1,245",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bali",
    bookings: "986",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Singapore",
    bookings: "742",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Maldives",
    bookings: "618",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=200&q=80",
  },
];

const recentUsers = [
  {
    name: "Vishal Kumar",
    email: "vishal@example.com",
    time: "Joined 2 hours ago",
    initials: "VK",
  },
  {
    name: "Rahul Singh",
    email: "rahul@example.com",
    time: "Joined 5 hours ago",
    initials: "RS",
  },
  {
    name: "Aman Kumar",
    email: "aman@example.com",
    time: "Joined yesterday",
    initials: "AK",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    time: "Joined yesterday",
    initials: "PS",
  },
];

const quickActions = [
  {
    title: "Add Flight",
    description: "Create a new flight",
    icon: Plane,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Add Hotel",
    description: "Create a new hotel",
    icon: Building2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Add Package",
    description: "Create travel package",
    icon: Package,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Create Offer",
    description: "Add new travel offer",
    icon: TicketPercent,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

function Dashboard() {
  const getStatusClass = (status) => {
    if (status === "Confirmed" || status === "Paid") {
      return "border-emerald-100 bg-emerald-50 text-emerald-700";
    }

    if (status === "Pending") {
      return "border-amber-100 bg-amber-50 text-amber-700";
    }

    return "border-red-100 bg-red-50 text-red-700";
  };

  return (
    <div className="min-h-full bg-slate-50 p-2 sm:p-2 lg:p-2">
      <div className="mx-auto max-w-[1600px]">
        {/* ==================== HEADER ==================== */}

        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Dashboard
              </h1>

              {/* <span className="text-xl sm:text-2xl">👋</span> */}
            </div>

            <p className="text-sm font-medium text-slate-500">
              Welcome back, Administrator. Here's what's happening with Tripora.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Last 7 Days
            <ChevronRight size={16} className="rotate-90 text-slate-400" />
          </button>
        </div>

        {/* ==================== STATS ==================== */}

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon size={21} className={item.iconColor} />
                  </div>

                  <button
                    type="button"
                    className="text-slate-400 transition hover:text-slate-700"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <p className="mb-1 text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <h2 className="mb-3 text-2xl font-black tracking-tight text-slate-900">
                  {item.value}
                </h2>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                      item.trend === "up"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.trend === "up" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}

                    {item.change}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================== CHART + BOOKING TYPE ==================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Booking Overview */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Booking Overview
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Booking performance for the last 7 days
                </p>
              </div>

              <div className="flex w-fit items-center rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-600 shadow-sm"
                >
                  7 Days
                </button>

                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
                >
                  30 Days
                </button>

                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
                >
                  3 Months
                </button>
              </div>
            </div>

            {/* Simple CSS Chart */}

            <div className="relative h-[260px] overflow-hidden">
              {/* Grid Lines */}

              <div className="absolute inset-0 flex flex-col justify-between">
                {[400, 300, 200, 100, 0].map((value) => (
                  <div
                    key={value}
                    className="relative border-t border-dashed border-slate-100"
                  >
                    <span className="absolute -top-2.5 left-0 bg-white pr-2 text-[10px] font-medium text-slate-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Area */}

              <div className="absolute bottom-7 left-10 right-3 top-2">
                <svg
                  viewBox="0 0 700 210"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id="bookingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 170
                    C50 155, 65 130, 105 140
                    S170 120, 210 105
                    S275 130, 315 90
                    S380 45, 420 72
                    S485 105, 525 58
                    S600 25, 650 52
                    S680 42, 700 30
                    L700 210
                    L0 210 Z"
                    fill="url(#bookingGradient)"
                  />

                  <path
                    d="M0 170
                    C50 155, 65 130, 105 140
                    S170 120, 210 105
                    S275 130, 315 90
                    S380 45, 420 72
                    S485 105, 525 58
                    S600 25, 650 52
                    S680 42, 700 30"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <circle cx="105" cy="140" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="210" cy="105" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="315" cy="90" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="420" cy="72" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="525" cy="58" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="650" cy="52" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                </svg>
              </div>

              {/* Days */}

              <div className="absolute bottom-0 left-10 right-3 flex justify-between text-[10px] font-bold text-slate-400 sm:text-xs">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Booking by Type */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-base font-black text-slate-900">
                Booking by Type
              </h2>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Distribution of all bookings
              </p>
            </div>

            <div className="space-y-6">
              {/* Flight */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                      <Plane size={15} className="text-blue-600" />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Flights
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">45%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[45%] rounded-full bg-blue-600" />
                </div>
              </div>

              {/* Hotel */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                      <Hotel size={15} className="text-violet-600" />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Hotels
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">30%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[30%] rounded-full bg-violet-600" />
                </div>
              </div>

              {/* Package */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                      <Palmtree size={15} className="text-emerald-600" />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Packages
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">25%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[25%] rounded-full bg-emerald-600" />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Total Bookings
                </span>

                <span className="text-xl font-black text-slate-900">3,842</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== RECENT BOOKINGS ==================== */}

        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-base font-black text-slate-900">
                Recent Bookings
              </h2>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Latest bookings made on Tripora
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-600 transition hover:text-blue-700"
            >
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Desktop Table */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Booking ID
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Destination
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const Icon = booking.icon;

                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">
                          {booking.id}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-700">
                          {booking.customer}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <Icon size={15} className="text-slate-600" />
                          </div>

                          <span className="text-sm font-semibold text-slate-600">
                            {booking.type}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          {booking.destination}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-black text-slate-900">
                          {booking.amount}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="font-bold text-blue-600 transition hover:text-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Booking Cards */}

          <div className="divide-y divide-slate-100 lg:hidden">
            {bookings.map((booking) => {
              const Icon = booking.icon;

              return (
                <div key={booking.id} className="p-4 sm:p-2">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Icon size={18} className="text-slate-600" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {booking.customer}
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-slate-400">
                          {booking.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Type
                      </p>

                      <p className="text-xs font-bold text-slate-700">
                        {booking.type}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Destination
                      </p>

                      <p className="text-xs font-bold text-slate-700">
                        {booking.destination}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Amount
                      </p>

                      <p className="text-xs font-black text-slate-900">
                        {booking.amount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== BOTTOM SECTION ==================== */}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Popular Destinations */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Popular Destinations
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Most booked destinations
                </p>
              </div>

              <MapPin size={20} className="text-blue-600" />
            </div>

            <div className="space-y-4">
              {destinations.map((destination, index) => (
                <div
                  key={destination.name}
                  className="flex items-center gap-3"
                >
                  <span className="w-4 text-xs font-black text-slate-400">
                    {index + 1}
                  </span>

                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-11 w-11 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {destination.name}
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-slate-400">
                      {destination.bookings} bookings
                    </p>
                  </div>

                  <ChevronRight size={17} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Recent Users
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Recently joined users
                </p>
              </div>

              <UserPlus size={20} className="text-blue-600" />
            </div>

            <div className="space-y-5">
              {recentUsers.map((user) => (
                <div key={user.email} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-600">
                    {user.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.name}
                    </p>

                    <p className="truncate text-xs font-medium text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <span className="hidden text-[10px] font-semibold text-slate-400 sm:block">
                    {user.time}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-black text-slate-600 transition hover:bg-slate-50"
            >
              View All Users
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Quick Actions */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-black text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Manage Tripora faster
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    type="button"
                    className="group rounded-xl border border-slate-200 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                  >
                    <div
                      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${action.iconBg}`}
                    >
                      <Icon size={17} className={action.iconColor} />
                    </div>

                    <p className="text-xs font-black text-slate-800">
                      {action.title}
                    </p>

                    <p className="mt-1 text-[10px] font-medium leading-relaxed text-slate-400">
                      {action.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-black text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
            >
              <Plus size={16} />
              Add New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;