import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { getAllUsers } from "../../../redux/slicer/adminUserSlice";
import { getAllHotelBookings } from "../../../redux/slicer/hotelBookingSlice";
import { getAllPackageBookings } from "../../../redux/slicer/packageBookingSlice";
import { getAllOffers } from "../../../redux/slicer/offferSlice";

// =====================================================
// HELPERS
// =====================================================

const getId = (item) =>
  item?._id ||
  item?.id ||
  item?.bookingId ||
  item?.bookingID ||
  Math.random();

const getBookingId = (booking) =>
  booking?.bookingId ||
  booking?.bookingID ||
  booking?.bookingNumber ||
  booking?._id ||
  booking?.id ||
  "N/A";

const getCustomerName = (booking) => {
  return (
    booking?.guestDetails?.name ||
    booking?.guestDetails?.fullName ||
    booking?.guestDetails?.customerName ||
    booking?.user?.fullName ||
    booking?.user?.name ||
    booking?.customer?.fullName ||
    booking?.customer?.name ||
    booking?.customerName ||
    booking?.name ||
    "Guest User"
  );
};

const getCustomerEmail = (booking) => {
  return (
    booking?.guestDetails?.email ||
    booking?.user?.email ||
    booking?.customer?.email ||
    booking?.email ||
    ""
  );
};

const getAmount = (booking) => {
  const amount =
    booking?.totalAmount ??
    booking?.totalPrice ??
    booking?.grandTotal ??
    booking?.amount ??
    booking?.price ??
    booking?.roomTotal ??
    booking?.packagePrice ??
    0;

  const numericAmount = Number(amount);

  return Number.isFinite(numericAmount) ? numericAmount : 0;
};

const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const formatFullCurrency = (amount) => {
  return `₹${(Number(amount) || 0).toLocaleString("en-IN")}`;
};

const getStatus = (booking) => {
  return (
    booking?.bookingStatus ||
    booking?.status ||
    booking?.paymentStatus ||
    "Pending"
  );
};

const getDestination = (booking, type) => {
  if (type === "Hotel") {
    return (
      booking?.hotelId?.city ||
      booking?.hotel?.city ||
      booking?.hotel?.location ||
      booking?.city ||
      booking?.destination ||
      "Unknown"
    );
  }

  if (type === "Package") {
    return (
      booking?.packageId?.destination ||
      booking?.packageId?.name ||
      booking?.package?.destination ||
      booking?.package?.name ||
      booking?.destination ||
      booking?.destinationName ||
      booking?.city ||
      "Unknown"
    );
  }

  return (
    booking?.destination ||
    booking?.destinationName ||
    booking?.city ||
    "Unknown"
  );
};

const getCreatedAt = (booking) => {
  return (
    booking?.createdAt ||
    booking?.createdDate ||
    booking?.bookingDate ||
    booking?.date ||
    null
  );
};

const getBookingTypeIcon = (type) => {
  if (type === "Hotel") {
    return Hotel;
  }

  if (type === "Package") {
    return Palmtree;
  }

  return Plane;
};

const normalizeBooking = (booking, type) => {
  return {
    ...booking,
    dashboardId: getId(booking),
    id: getBookingId(booking),
    customer: getCustomerName(booking),
    email: getCustomerEmail(booking),
    type,
    destination: getDestination(booking, type),
    amountValue: getAmount(booking),
    amount: formatFullCurrency(getAmount(booking)),
    status: getStatus(booking),
    createdAt: getCreatedAt(booking),
    icon: getBookingTypeIcon(type),
  };
};

const getInitials = (name) => {
  if (!name) return "GU";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

const getTimeAgo = (date) => {
  if (!date) return "Recently";

  const createdDate = new Date(date);

  if (Number.isNaN(createdDate.getTime())) {
    return "Recently";
  }

  const now = new Date();
  const difference = now.getTime() - createdDate.getTime();

  if (difference < 0) {
    return "Recently";
  }

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `Joined ${minutes} min ago`;
  }

  if (hours < 24) {
    return `Joined ${hours} hr${hours > 1 ? "s" : ""} ago`;
  }

  if (days === 1) {
    return "Joined yesterday";
  }

  return `Joined ${days} days ago`;
};

const getOfferIsActive = (offer) => {
  if (typeof offer?.isActive === "boolean") {
    return offer.isActive;
  }

  if (typeof offer?.active === "boolean") {
    return offer.active;
  }

  if (typeof offer?.status === "string") {
    return (
      offer.status.toLowerCase() === "active" ||
      offer.status.toLowerCase() === "published"
    );
  }

  return false;
};

// =====================================================
// DASHBOARD
// =====================================================

function Dashboard() {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX STATE
  // ===================================================

  const {
    users = [],
    loading: usersLoading,
  } = useSelector((state) => state.users || {});

  const {
    bookings: hotelBookings = [],
    loading: hotelLoading,
  } = useSelector((state) => state.booking || {});

  const {
    bookings: packageBookings = [],
    loading: packageLoading,
  } = useSelector((state) => state.packageBooking || {});

  const {
    offers = [],
    loading: offerLoading,
  } = useSelector((state) => state.offer || {});

  // ===================================================
  // LOCAL STATE
  // ===================================================

  const [chartRange, setChartRange] = useState("7");

  // ===================================================
  // FETCH DASHBOARD DATA
  // ===================================================

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllHotelBookings());
    dispatch(getAllPackageBookings());
    dispatch(getAllOffers());
  }, [dispatch]);

  // ===================================================
  // NORMALIZE BOOKINGS
  // ===================================================

  const allBookings = useMemo(() => {
    const hotels = Array.isArray(hotelBookings)
      ? hotelBookings.map((booking) =>
          normalizeBooking(booking, "Hotel")
        )
      : [];

    const packages = Array.isArray(packageBookings)
      ? packageBookings.map((booking) =>
          normalizeBooking(booking, "Package")
        )
      : [];

    return [...hotels, ...packages];
  }, [hotelBookings, packageBookings]);

  // ===================================================
  // SORTED BOOKINGS
  // ===================================================

  const sortedBookings = useMemo(() => {
    return [...allBookings].sort((a, b) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dateB - dateA;
    });
  }, [allBookings]);

  // ===================================================
  // TOTAL USERS
  // ===================================================

  const totalUsers = Array.isArray(users)
    ? users.length
    : 0;

  // ===================================================
  // TOTAL BOOKINGS
  // ===================================================

  const totalBookings = allBookings.length;

  // ===================================================
  // TOTAL REVENUE
  // ===================================================

  const totalRevenue = useMemo(() => {
    return allBookings.reduce(
      (total, booking) => total + booking.amountValue,
      0
    );
  }, [allBookings]);

  // ===================================================
  // ACTIVE OFFERS
  // ===================================================

  const activeOffers = useMemo(() => {
    if (!Array.isArray(offers)) {
      return 0;
    }

    return offers.filter(getOfferIsActive).length;
  }, [offers]);

  // ===================================================
  // STATS
  // ===================================================

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: totalUsers.toLocaleString("en-IN"),
        change: "",
        description: "registered users",
        icon: Users,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        trend: "up",
      },
      {
        title: "Total Bookings",
        value: totalBookings.toLocaleString("en-IN"),
        change: "",
        description: "hotel + package",
        icon: CalendarCheck,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        trend: "up",
      },
      {
        title: "Total Revenue",
        value: formatCurrency(totalRevenue),
        change: "",
        description: "hotel + package",
        icon: IndianRupee,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        trend: "up",
      },
      {
        title: "Active Offers",
        value: activeOffers.toLocaleString("en-IN"),
        change: "",
        description: "currently active",
        icon: Gift,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        trend: "up",
      },
    ],
    [totalUsers, totalBookings, totalRevenue, activeOffers]
  );

  // ===================================================
  // BOOKING BY TYPE
  // ===================================================

  const hotelBookingCount = hotelBookings.length;
  const packageBookingCount = packageBookings.length;

  const bookingTypeTotal =
    hotelBookingCount + packageBookingCount;

  const hotelPercentage =
    bookingTypeTotal > 0
      ? Math.round(
          (hotelBookingCount / bookingTypeTotal) * 100
        )
      : 0;

  const packagePercentage =
    bookingTypeTotal > 0
      ? Math.round(
          (packageBookingCount / bookingTypeTotal) * 100
        )
      : 0;

  // Flight is intentionally 0 for now.
  const flightPercentage = 0;

  // ===================================================
  // RECENT BOOKINGS
  // ===================================================

  const recentBookings = useMemo(() => {
    return sortedBookings.slice(0, 5);
  }, [sortedBookings]);

  // ===================================================
  // RECENT USERS
  // ===================================================

  const recentUsers = useMemo(() => {
    if (!Array.isArray(users)) {
      return [];
    }

    return [...users]
      .sort((a, b) => {
        const dateA = a?.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b?.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      })
      .slice(0, 4)
      .map((user) => {
        const name =
          user?.fullName ||
          user?.name ||
          "Unknown User";

        return {
          id: user?._id || user?.id,
          name,
          email: user?.email || "No email",
          time: getTimeAgo(user?.createdAt),
          initials: getInitials(name),
        };
      });
  }, [users]);

  // ===================================================
  // POPULAR DESTINATIONS
  // ===================================================

  const destinations = useMemo(() => {
    const destinationMap = {};

    allBookings.forEach((booking) => {
      const destination =
        booking.destination || "Unknown";

      if (
        !destination ||
        destination.toLowerCase() === "unknown"
      ) {
        return;
      }

      if (!destinationMap[destination]) {
        destinationMap[destination] = {
          name: destination,
          bookings: 0,
        };
      }

      destinationMap[destination].bookings += 1;
    });

    return Object.values(destinationMap)
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 4);
  }, [allBookings]);

  // ===================================================
  // CHART DATA
  // ===================================================

  const chartDays = useMemo(() => {
    const days =
      chartRange === "7"
        ? 7
        : chartRange === "30"
        ? 30
        : 90;

    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = allBookings.filter((booking) => {
        if (!booking.createdAt) {
          return false;
        }

        const bookingDate = new Date(
          booking.createdAt
        );

        return (
          bookingDate >= date &&
          bookingDate < nextDate
        );
      }).length;

      result.push({
        date,
        count,
      });
    }

    return result;
  }, [allBookings, chartRange]);

  const chartMax = useMemo(() => {
    const max = Math.max(
      ...chartDays.map((item) => item.count),
      1
    );

    return Math.max(max, 4);
  }, [chartDays]);

  const chartPath = useMemo(() => {
    if (!chartDays.length) {
      return "M0 180 L700 180";
    }

    const points = chartDays.map((item, index) => {
      const x =
        chartDays.length === 1
          ? 350
          : (index / (chartDays.length - 1)) * 700;

      const y =
        180 -
        (item.count / chartMax) * 150;

      return {
        x,
        y,
      };
    });

    if (points.length === 1) {
      return `M0 ${points[0].y} L700 ${points[0].y}`;
    }

    let path = `M${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const previous = points[i - 1];
      const current = points[i];

      const controlX =
        (previous.x + current.x) / 2;

      path += ` C${controlX} ${previous.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`;
    }

    return path;
  }, [chartDays, chartMax]);

  const chartAreaPath = `${chartPath} L700 210 L0 210 Z`;

  const chartLabels = useMemo(() => {
    if (chartRange === "7") {
      return chartDays.map((item) =>
        item.date.toLocaleDateString("en-US", {
          weekday: "short",
        })
      );
    }

    if (chartRange === "30") {
      return chartDays.map((item, index) => {
        if (index % 5 !== 0) return "";

        return item.date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
      });
    }

    return chartDays.map((item, index) => {
      if (index % 15 !== 0) return "";

      return item.date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    });
  }, [chartDays, chartRange]);

  // ===================================================
  // STATUS CLASS
  // ===================================================

  const getStatusClass = (status) => {
    const normalizedStatus =
      String(status || "").toLowerCase();

    if (
      normalizedStatus === "confirmed" ||
      normalizedStatus === "paid" ||
      normalizedStatus === "success" ||
      normalizedStatus === "completed"
    ) {
      return "border-emerald-100 bg-emerald-50 text-emerald-700";
    }

    if (
      normalizedStatus === "pending" ||
      normalizedStatus === "processing"
    ) {
      return "border-amber-100 bg-amber-50 text-amber-700";
    }

    if (
      normalizedStatus === "cancelled" ||
      normalizedStatus === "canceled" ||
      normalizedStatus === "failed"
    ) {
      return "border-red-100 bg-red-50 text-red-700";
    }

    return "border-slate-200 bg-slate-50 text-slate-600";
  };

  // ===================================================
  // LOADING
  // ===================================================

  const dashboardLoading =
    usersLoading ||
    hotelLoading ||
    packageLoading ||
    offerLoading;

  // ===================================================
  // QUICK ACTIONS
  // ===================================================

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
            <ChevronRight
              size={16}
              className="rotate-90 text-slate-400"
            />
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
                    <Icon
                      size={21}
                      className={item.iconColor}
                    />
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
                  {dashboardLoading && item.title !== "Total Users" ? (
                    <span className="inline-block h-7 w-20 animate-pulse rounded bg-slate-100" />
                  ) : (
                    item.value
                  )}
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

                    {item.change || "Live"}
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
                  Booking performance for the last{" "}
                  {chartRange === "7"
                    ? "7 days"
                    : chartRange === "30"
                    ? "30 days"
                    : "3 months"}
                </p>
              </div>

              <div className="flex w-fit items-center rounded-xl bg-slate-100 p-1">
                {[
                  ["7", "7 Days"],
                  ["30", "30 Days"],
                  ["90", "3 Months"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setChartRange(value)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                      chartRange === value
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}

            <div className="relative h-[260px] overflow-hidden">

              {/* Grid Lines */}

              <div className="absolute inset-0 flex flex-col justify-between">
                {[4, 3, 2, 1, 0].map((value) => (
                  <div
                    key={value}
                    className="relative border-t border-dashed border-slate-100"
                  >
                    <span className="absolute -top-2.5 left-0 bg-white pr-2 text-[10px] font-medium text-slate-400">
                      {Math.round(
                        (chartMax / 4) * value
                      )}
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
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity="0.18"
                      />

                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d={chartAreaPath}
                    fill="url(#bookingGradient)"
                  />

                  <path
                    d={chartPath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {chartDays.map((item, index) => {
                    if (chartDays.length > 30) {
                      if (
                        index % 15 !== 0 &&
                        index !==
                          chartDays.length - 1
                      ) {
                        return null;
                      }
                    }

                    if (
                      chartDays.length <= 30 &&
                      index !==
                        chartDays.length - 1 &&
                      index % 2 !== 0
                    ) {
                      return null;
                    }

                    const x =
                      chartDays.length === 1
                        ? 350
                        : (index /
                            (chartDays.length - 1)) *
                          700;

                    const y =
                      180 -
                      (item.count /
                        chartMax) *
                        150;

                    return (
                      <circle
                        key={`${item.date.toISOString()}-${index}`}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#fff"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Days */}

              <div className="absolute bottom-0 left-10 right-3 flex justify-between overflow-hidden text-[10px] font-bold text-slate-400 sm:text-xs">
                {chartLabels
                  .filter(Boolean)
                  .slice(0, 7)
                  .map((label, index) => (
                    <span key={`${label}-${index}`}>
                      {label}
                    </span>
                  ))}
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
                      <Plane
                        size={15}
                        className="text-blue-600"
                      />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Flights
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">
                    {flightPercentage}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${flightPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Hotel */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                      <Hotel
                        size={15}
                        className="text-violet-600"
                      />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Hotels
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">
                    {hotelPercentage}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{
                      width: `${hotelPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Package */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                      <Palmtree
                        size={15}
                        className="text-emerald-600"
                      />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      Packages
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900">
                    {packagePercentage}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{
                      width: `${packagePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Total Bookings
                </span>

                <span className="text-xl font-black text-slate-900">
                  {totalBookings.toLocaleString(
                    "en-IN"
                  )}
                </span>
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
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => {
                    const Icon = booking.icon;

                    return (
                      <tr
                        key={booking.dashboardId}
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
                              <Icon
                                size={15}
                                className="text-slate-600"
                              />
                            </div>

                            <span className="text-sm font-semibold text-slate-600">
                              {booking.type}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                            <MapPin
                              size={14}
                              className="text-slate-400"
                            />

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
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-sm font-semibold text-slate-400"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet */}

          <div className="divide-y divide-slate-100 lg:hidden">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => {
                const Icon = booking.icon;

                return (
                  <div
                    key={booking.dashboardId}
                    className="p-4 sm:p-2"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                          <Icon
                            size={18}
                            className="text-slate-600"
                          />
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

                        <p className="truncate text-xs font-bold text-slate-700">
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
              })
            ) : (
              <div className="px-4 py-10 text-center text-sm font-semibold text-slate-400">
                No bookings found
              </div>
            )}
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

              <MapPin
                size={20}
                className="text-blue-600"
              />
            </div>

            <div className="space-y-4">
              {destinations.length > 0 ? (
                destinations.map(
                  (destination, index) => (
                    <div
                      key={destination.name}
                      className="flex items-center gap-3"
                    >
                      <span className="w-4 text-xs font-black text-slate-400">
                        {index + 1}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                        <MapPin
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {destination.name}
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          {destination.bookings} bookings
                        </p>
                      </div>

                      <ChevronRight
                        size={17}
                        className="text-slate-300"
                      />
                    </div>
                  )
                )
              ) : (
                <div className="py-6 text-center text-xs font-semibold text-slate-400">
                  No destination data available
                </div>
              )}
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

              <UserPlus
                size={20}
                className="text-blue-600"
              />
            </div>

            <div className="space-y-5">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div
                    key={user.id || user.email}
                    className="flex items-center gap-3"
                  >
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
                ))
              ) : (
                <div className="py-6 text-center text-xs font-semibold text-slate-400">
                  No users found
                </div>
              )}
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
                      <Icon
                        size={17}
                        className={action.iconColor}
                      />
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