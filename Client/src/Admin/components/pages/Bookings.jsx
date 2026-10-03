import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Eye,
  Filter,
  Hotel,
  MapPin,
  MoreVertical,
  Package,
  RefreshCw,
  Search,
  Users,
  X,
  XCircle,
} from "lucide-react";

import {
  getAllBooking as getAllHotelBookings,
  cancelBooking as cancelHotelBooking,
} from "../../../redux/slicer/hotelBookingSlice";

import {
  getAllPackageBookings,
  adminCancelPackageBooking
} from "../../../redux/slicer/packageBookingSlice";

// ======================================================
// HELPERS
// ======================================================

const firstValue = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return "";
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (amount) => {
  const numericAmount = Number(amount || 0);

  return `₹${numericAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const normalizeStatus = (status) => {
  if (!status) return "Pending";

  const value = String(status)
    .trim()
    .toLowerCase();

  if (value === "confirmed") return "Confirmed";
  if (value === "cancelled") return "Cancelled";
  if (value === "completed") return "Completed";
  if (value === "pending") return "Pending";
  if (value === "failed") return "Failed";

  return (
    String(status).charAt(0).toUpperCase() +
    String(status).slice(1)
  );
};

const normalizePaymentStatus = (status) => {
  if (!status) return "Pending";

  const value = String(status)
    .trim()
    .toLowerCase();

  if (value === "paid") return "Paid";
  if (value === "pending") return "Pending";
  if (value === "failed") return "Failed";
  if (value === "refunded") return "Refunded";

  if (value === "partially_refunded") {
    return "Partially Refunded";
  }

  return (
    String(status).charAt(0).toUpperCase() +
    String(status).slice(1)
  );
};

const getStatusClasses = (status) => {
  switch (normalizeStatus(status)) {
    case "Confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Completed":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    case "Failed":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const getPaymentClasses = (status) => {
  switch (normalizePaymentStatus(status)) {
    case "Paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Refunded":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "Failed":
      return "bg-red-50 text-red-700 border-red-200";

    case "Partially Refunded":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

// ======================================================
// HOTEL NORMALIZER
// ======================================================

const normalizeHotelBooking = (booking) => {
  const hotel =
    booking?.hotel &&
    typeof booking.hotel === "object"
      ? booking.hotel
      : booking?.hotelDetails &&
        typeof booking.hotelDetails === "object"
      ? booking.hotelDetails
      : {};

  const user =
    booking?.user &&
    typeof booking.user === "object"
      ? booking.user
      : booking?.customer &&
        typeof booking.customer === "object"
      ? booking.customer
      : booking?.userDetails &&
        typeof booking.userDetails === "object"
      ? booking.userDetails
      : {};

  const bookingId = firstValue(
    booking?.bookingId,
    booking?._id,
    booking?.id
  );

  const hotelName = firstValue(
    hotel?.hotelName,
    hotel?.name,
    booking?.hotelName,
    booking?.name,
    "Hotel Booking"
  );

  const city = firstValue(
    hotel?.city,
    booking?.city,
    booking?.location,
    ""
  );

  const state = firstValue(
    hotel?.state,
    booking?.state,
    ""
  );

  const country = firstValue(
    hotel?.country,
    booking?.country,
    ""
  );

  const address = firstValue(
    hotel?.address,
    booking?.address,
    ""
  );

  const guestName = firstValue(
    booking?.guestName,
    booking?.guest?.name,
    booking?.guest?.fullName,
    user?.name,
    user?.fullName,
    booking?.name,
    "Guest"
  );

  const guestEmail = firstValue(
    booking?.guestEmail,
    booking?.guest?.email,
    user?.email,
    booking?.email,
    ""
  );

  const guestMobile = firstValue(
    booking?.guestMobile,
    booking?.guest?.mobileNumber,
    booking?.guest?.mobile,
    user?.mobile,
    user?.mobileNumber,
    booking?.mobile,
    booking?.mobileNumber,
    ""
  );

  const checkIn = firstValue(
    booking?.checkIn,
    booking?.checkInDate,
    booking?.checkInTime
  );

  const checkOut = firstValue(
    booking?.checkOut,
    booking?.checkOutDate,
    booking?.checkOutTime
  );

  const rooms = Number(
    firstValue(
      booking?.rooms,
      booking?.numberOfRooms,
      booking?.roomCount,
      1
    )
  );

  const adults = Number(
    firstValue(
      booking?.adults,
      booking?.guests?.adults,
      booking?.travellers?.adults,
      1
    )
  );

  const children = Number(
    firstValue(
      booking?.children,
      booking?.guests?.children,
      booking?.travellers?.children,
      0
    )
  );

  const amount = Number(
    firstValue(
      booking?.pricing?.totalAmount,
      booking?.totalAmount,
      booking?.grandTotal,
      booking?.totalPrice,
      booking?.amount,
      booking?.price,
      0
    )
  );

  const status = normalizeStatus(
    firstValue(
      booking?.bookingStatus,
      booking?.status,
      "Pending"
    )
  );

  const paymentStatus = normalizePaymentStatus(
    firstValue(
      booking?.paymentStatus,
      booking?.payment?.status,
      "Pending"
    )
  );

  const bookingDate = firstValue(
    booking?.createdAt,
    booking?.bookingDate,
    booking?.createdOn
  );

  const image = firstValue(
    hotel?.image,
    hotel?.images?.[0],
    booking?.image,
    booking?.hotelImage,
    ""
  );

  return {
    id: String(
      bookingId || `hotel-${Math.random()}`
    ),

    mongoId:
      booking?._id || bookingId,

    type: "Hotel",

    title: hotelName,

    location: [city, state, country]
      .filter(Boolean)
      .join(", "),

    city,
    state,
    country,
    address,

    image,

    guestName,
    guestEmail,
    guestMobile,

    bookingDate,
    rawDate: bookingDate,

    checkIn,
    checkOut,

    rooms,
    adults,
    children,

    guests: adults + children,

    amount,

    status,
    paymentStatus,

    cancellationReason:
      booking?.cancellationReason || "",

    original: booking,
  };
};

// ======================================================
// PACKAGE NORMALIZER
// ======================================================

const normalizePackageBooking = (booking) => {
  const packageDetails =
    booking?.packageDetails || {};

  const packageData =
    booking?.package &&
    typeof booking.package === "object"
      ? booking.package
      : {};

  const user =
    booking?.user &&
    typeof booking.user === "object"
      ? booking.user
      : booking?.customer &&
        typeof booking.customer === "object"
      ? booking.customer
      : booking?.userDetails &&
        typeof booking.userDetails === "object"
      ? booking.userDetails
      : {};

  // ====================================================
  // BOOKING ID
  // ====================================================

  const bookingId = firstValue(
    booking?.bookingId,
    booking?._id,
    booking?.id
  );

  // ====================================================
  // PACKAGE NAME
  // ====================================================

  const packageName = firstValue(
    packageDetails?.name,
    packageData?.name,
    booking?.packageName,
    booking?.name,
    "Package Booking"
  );

  // ====================================================
  // DESTINATION
  // ====================================================

  const destinationValue = firstValue(
    packageDetails?.destination,
    packageData?.destination
  );

  const destination =
    firstValue(
      typeof destinationValue === "object"
        ? destinationValue?.name
        : destinationValue,

      booking?.destination?.name,

      typeof booking?.destination === "string"
        ? booking.destination
        : "",

      booking?.location,

      ""
    );

  // ====================================================
  // COUNTRY
  // ====================================================

  const countryValue = firstValue(
    packageDetails?.country,
    packageData?.country,
    booking?.country,
    ""
  );

  const country =
    typeof countryValue === "object"
      ? firstValue(
          countryValue?.name,
          countryValue?.country,
          ""
        )
      : countryValue;

  // ====================================================
  // PACKAGE DETAILS
  // ====================================================

  const duration = firstValue(
    packageDetails?.duration,
    packageData?.duration,
    booking?.duration,
    ""
  );

  const days = firstValue(
    packageDetails?.days,
    packageData?.days,
    booking?.days,
    ""
  );

  const nights = firstValue(
    packageDetails?.nights,
    packageData?.nights,
    booking?.nights,
    ""
  );

  // ====================================================
  // PASSENGERS
  // ====================================================

  const passengers = Array.isArray(
    booking?.passengers
  )
    ? booking.passengers
    : [];

  const firstPassenger =
    passengers[0] || {};

  // ====================================================
  // GUEST
  // ====================================================

  const guestName = firstValue(
    booking?.guestName,
    firstPassenger?.fullName,
    firstPassenger?.name,
    user?.name,
    user?.fullName,
    booking?.name,
    "Guest"
  );

  const guestEmail = firstValue(
    booking?.guestEmail,
    firstPassenger?.email,
    user?.email,
    booking?.email,
    ""
  );

  const guestMobile = firstValue(
    booking?.guestMobile,
    firstPassenger?.mobileNumber,
    firstPassenger?.mobile,
    user?.mobile,
    user?.mobileNumber,
    booking?.mobile,
    booking?.mobileNumber,
    ""
  );

  // ====================================================
  // TRAVELLERS
  // ====================================================

  const adults = Number(
    firstValue(
      booking?.adults,
      booking?.travellers?.adults,
      booking?.travelers?.adults,
      1
    )
  );

  const children = Number(
    firstValue(
      booking?.children,
      booking?.travellers?.children,
      booking?.travelers?.children,
      0
    )
  );

  const infants = Number(
    firstValue(
      booking?.infants,
      booking?.travellers?.infants,
      booking?.travelers?.infants,
      0
    )
  );

  // ====================================================
  // DATES
  // ====================================================

  const travelDate = firstValue(
    booking?.travelDate,
    booking?.journeyDate,
    booking?.date
  );

  const bookingDate = firstValue(
    booking?.createdAt,
    booking?.bookingDate,
    booking?.createdOn
  );

  // ====================================================
  // IMPORTANT:
  // YOUR API HAS pricing.totalAmount
  // ====================================================

  const amount = Number(
    firstValue(
      booking?.pricing?.totalAmount,
      booking?.pricing?.total,
      booking?.pricing?.grandTotal,
      booking?.totalAmount,
      booking?.grandTotal,
      booking?.totalPrice,
      booking?.amount,
      booking?.price,
      0
    )
  );

  // ====================================================
  // STATUS
  // ====================================================

  const status = normalizeStatus(
    firstValue(
      booking?.bookingStatus,
      booking?.status,
      "Pending"
    )
  );

  // ====================================================
  // PAYMENT STATUS
  // ====================================================

  const paymentStatus =
    normalizePaymentStatus(
      firstValue(
        booking?.paymentStatus,
        booking?.payment?.status,
        "Pending"
      )
    );

  // ====================================================
  // IMAGE
  // ====================================================

  const image = firstValue(
    packageDetails?.image,
    packageData?.image,
    booking?.image,
    booking?.packageImage,
    ""
  );

  // ====================================================
  // RETURN
  // ====================================================

  return {
    id: String(
      bookingId ||
        `package-${Math.random()}`
    ),

    mongoId:
      booking?._id || bookingId,

    type: "Package",

    title: packageName,

    location: [destination, country]
      .filter(Boolean)
      .join(", "),

    city: destination,

    country,

    address: "",

    image,

    guestName,
    guestEmail,
    guestMobile,

    bookingDate,
    rawDate: bookingDate,

    travelDate,

    checkIn: travelDate,
    checkOut: "",

    duration,
    days,
    nights,

    rooms: 0,

    adults,
    children,
    infants,

    guests:
      adults +
      children +
      infants,

    amount,

    status,
    paymentStatus,

    passengers,

    cancellationReason:
      booking?.cancellationReason || "",

    original: booking,
  };
};

// ======================================================
// COMPONENT
// ======================================================

const Bookings = () => {
  const dispatch = useDispatch();

  // ====================================================
  // REDUX
  // ====================================================

  const {
    bookings: hotelBookings = [],
    loading: hotelLoading = false,
    error: hotelError = null,
  } = useSelector(
    (state) => state.hotelBooking || {}
  );

  const {
    bookings: packageBookings = [],
    loading: packageLoading = false,
    error: packageError = null,
  } = useSelector(
    (state) => state.packageBooking || {}
  );

  // ====================================================
  // STATES
  // ====================================================

  const [activeTab, setActiveTab] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [cancelBookingData, setCancelBookingData] =
    useState(null);

  const [cancelReason, setCancelReason] =
    useState("Cancelled by admin");

  const [cancelLoading, setCancelLoading] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(null);

  // ====================================================
  // FETCH
  // ====================================================

  useEffect(() => {
    dispatch(getAllHotelBookings());
    dispatch(getAllPackageBookings());
  }, [dispatch]);

  // ====================================================
  // NORMALIZED DATA
  // ====================================================

  const allBookings = useMemo(() => {
    const hotels = Array.isArray(hotelBookings)
      ? hotelBookings.map(
          normalizeHotelBooking
        )
      : [];

    const packages = Array.isArray(
      packageBookings
    )
      ? packageBookings.map(
          normalizePackageBooking
        )
      : [];

    return [...hotels, ...packages].sort(
      (a, b) =>
        new Date(b.rawDate || 0) -
        new Date(a.rawDate || 0)
    );
  }, [
    hotelBookings,
    packageBookings,
  ]);

  // ====================================================
  // FILTER
  // ====================================================

  const filteredBookings = useMemo(() => {
    let data = [...allBookings];

    if (activeTab !== "All") {
      data = data.filter(
        (booking) =>
          booking.type === activeTab
      );
    }

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      data = data.filter((booking) => {
        const searchableText = [
          booking.id,
          booking.mongoId,
          booking.title,
          booking.location,
          booking.city,
          booking.country,
          booking.guestName,
          booking.guestEmail,
          booking.guestMobile,
          booking.type,
          booking.status,
          booking.paymentStatus,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          searchValue
        );
      });
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (booking) =>
          booking.status === statusFilter
      );
    }

    if (paymentFilter !== "All") {
      data = data.filter(
        (booking) =>
          booking.paymentStatus ===
          paymentFilter
      );
    }

    if (dateFilter !== "All") {
      const now = new Date();

      data = data.filter((booking) => {
        if (!booking.rawDate) return false;

        const bookingDate =
          new Date(booking.rawDate);

        const difference =
          now.getTime() -
          bookingDate.getTime();

        const days =
          difference /
          (1000 * 60 * 60 * 24);

        if (dateFilter === "Today") {
          return (
            bookingDate.toDateString() ===
            now.toDateString()
          );
        }

        if (dateFilter === "7 Days") {
          return days >= 0 && days <= 7;
        }

        if (dateFilter === "30 Days") {
          return days >= 0 && days <= 30;
        }

        return true;
      });
    }

    data.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.rawDate || 0) -
          new Date(a.rawDate || 0)
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.rawDate || 0) -
          new Date(b.rawDate || 0)
        );
      }

      if (sortBy === "amountHigh") {
        return b.amount - a.amount;
      }

      if (sortBy === "amountLow") {
        return a.amount - b.amount;
      }

      return 0;
    });

    return data;
  }, [
    allBookings,
    activeTab,
    search,
    statusFilter,
    paymentFilter,
    dateFilter,
    sortBy,
  ]);

  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBookings.length /
        itemsPerPage
    )
  );

  const paginatedBookings =
    filteredBookings.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // ====================================================
  // STATS
  // ====================================================

  const stats = useMemo(() => {
    const total = allBookings.length;

    const confirmed =
      allBookings.filter(
        (booking) =>
          booking.status === "Confirmed"
      ).length;

    const pending =
      allBookings.filter(
        (booking) =>
          booking.status === "Pending"
      ).length;

    const cancelled =
      allBookings.filter(
        (booking) =>
          booking.status === "Cancelled"
      ).length;

    const hotelCount =
      allBookings.filter(
        (booking) =>
          booking.type === "Hotel"
      ).length;

    const packageCount =
      allBookings.filter(
        (booking) =>
          booking.type === "Package"
      ).length;

    const revenue =
      allBookings
        .filter(
          (booking) =>
            booking.paymentStatus ===
              "Paid" ||
            booking.status ===
              "Confirmed" ||
            booking.status ===
              "Completed"
        )
        .reduce(
          (sum, booking) =>
            sum +
            Number(booking.amount || 0),
          0
        );

    return {
      total,
      confirmed,
      pending,
      cancelled,
      hotelCount,
      packageCount,
      revenue,
    };
  }, [allBookings]);

  // ====================================================
  // LOADING
  // ====================================================

  const loading =
    hotelLoading || packageLoading;

  // ====================================================
  // REFRESH
  // ====================================================

  const refreshBookings = () => {
    dispatch(getAllHotelBookings());
    dispatch(getAllPackageBookings());
  };

  // ====================================================
  // CANCEL
  // ====================================================

  const handleCancelBooking = async () => {
    if (!cancelBookingData) return;

    try {
      setCancelLoading(true);

      const bookingId =
        cancelBookingData.mongoId;

      if (!bookingId) {
        throw new Error(
          "Booking ID not found"
        );
      }

      if (
        cancelBookingData.type ===
        "Hotel"
      ) {
        await dispatch(
          cancelHotelBooking(bookingId)
        ).unwrap();
      }

      if (
        cancelBookingData.type ===
        "Package"
      ) {
        await dispatch(
          adminCancelPackageBooking({
            id: bookingId,
            cancellationReason:
              cancelReason ||
              "Cancelled by admin",
          })
        ).unwrap();
      }

      setCancelBookingData(null);
      setSelectedBooking(null);
      setOpenMenu(null);

      setCancelReason(
        "Cancelled by admin"
      );

      await dispatch(
        getAllHotelBookings()
      );

      await dispatch(
        getAllPackageBookings()
      );
    } catch (error) {
      console.error(
        "Booking cancellation error:",
        error
      );

      alert(
        typeof error === "string"
          ? error
          : error?.message ||
              "Failed to cancel booking"
      );
    } finally {
      setCancelLoading(false);
    }
  };

  // ====================================================
  // TAB
  // ====================================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ====================================================
  // RESET
  // ====================================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setDateFilter("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // ====================================================
  // ERROR
  // ====================================================

  const combinedError =
    hotelError || packageError;

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <CalendarDays size={16} />

              <span>
                Booking Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Bookings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage hotel and package
              bookings from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshBookings}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* ERROR */}

        {combinedError && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <XCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Failed to load bookings
              </p>

              <p className="mt-0.5">
                {typeof combinedError ===
                "string"
                  ? combinedError
                  : combinedError?.message ||
                    "Something went wrong while fetching bookings."}
              </p>
            </div>
          </div>
        )}

        {/* STATS */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Bookings
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.total}
                </h3>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <CalendarDays size={21} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              <span>
                Hotels:{" "}
                <b className="text-slate-700">
                  {stats.hotelCount}
                </b>
              </span>

              <span>
                Packages:{" "}
                <b className="text-slate-700">
                  {stats.packageCount}
                </b>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Confirmed
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.confirmed}
                </h3>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Confirmed bookings
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.pending}
                </h3>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Awaiting confirmation
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Revenue
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {formatCurrency(
                    stats.revenue
                  )}
                </h3>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <CircleDollarSign size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              From paid / confirmed bookings
            </p>
          </div>
        </div>

        {/* MAIN CARD */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TABS */}

          <div className="border-b border-slate-200 px-4 pt-4 sm:px-6">
            <div className="flex gap-6 overflow-x-auto">

              {[
                {
                  label: "All",
                  count: stats.total,
                },
                {
                  label: "Hotel",
                  count: stats.hotelCount,
                },
                {
                  label: "Package",
                  count: stats.packageCount,
                },
              ].map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() =>
                    handleTabChange(
                      tab.label
                    )
                  }
                  className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition ${
                    activeTab === tab.label
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}

                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      activeTab ===
                      tab.label
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>

                  {activeTab ===
                    tab.label && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* FILTERS */}

          <div className="border-b border-slate-200 p-4 sm:p-6">

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_auto_auto_auto]">

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                  placeholder="Search booking, guest, hotel, package..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                  className="h-11 min-w-[145px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                  <option value="Failed">
                    Failed
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(e) => {
                    setPaymentFilter(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                  className="h-11 min-w-[145px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Payments
                  </option>

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Refunded">
                    Refunded
                  </option>

                  <option value="Failed">
                    Failed
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                  className="h-11 min-w-[135px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Dates
                  </option>

                  <option value="Today">
                    Today
                  </option>

                  <option value="7 Days">
                    Last 7 Days
                  </option>

                  <option value="30 Days">
                    Last 30 Days
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="h-11 min-w-[150px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                  <option value="amountHigh">
                    Amount High
                  </option>

                  <option value="amountLow">
                    Amount Low
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Filter size={16} />

                <span>
                  Showing{" "}
                  <b className="text-slate-800">
                    {
                      filteredBookings.length
                    }
                  </b>{" "}
                  booking
                  {filteredBookings.length !==
                  1
                    ? "s"
                    : ""}
                </span>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <X size={15} />

                Clear Filters
              </button>
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="flex items-center justify-center gap-3 px-6 py-12 text-sm text-slate-500">
              <RefreshCw
                size={19}
                className="animate-spin text-blue-600"
              />

              Loading bookings...
            </div>
          )}

          {!loading && (
            <>
              {/* DESKTOP */}

              <div className="hidden overflow-x-auto lg:block">

                <table className="w-full min-w-[1100px]">

                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Booking
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Guest
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Date
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {paginatedBookings.map(
                      (booking) => (
                        <tr
                          key={`${booking.type}-${booking.id}`}
                          className="transition hover:bg-slate-50/70"
                        >

                          {/* BOOKING */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">

                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                                {booking.image ? (
                                  <img
                                    src={
                                      booking.image
                                    }
                                    alt={
                                      booking.title
                                    }
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-blue-600">
                                    {booking.type ===
                                    "Hotel" ? (
                                      <BedDouble
                                        size={21}
                                      />
                                    ) : (
                                      <Package
                                        size={21}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">

                                <div className="mb-1 flex items-center gap-2">

                                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                                    {booking.type}
                                  </span>

                                </div>

                                <p className="max-w-[240px] truncate text-sm font-bold text-slate-900">
                                  {booking.title}
                                </p>

                                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                  <MapPin size={12} />

                                  <span className="max-w-[220px] truncate">
                                    {booking.location ||
                                      "Location unavailable"}
                                  </span>
                                </div>

                                <p className="mt-1 text-[11px] text-slate-400">
                                  ID:{" "}
                                  {booking.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* GUEST */}

                          <td className="px-6 py-4">
                            <div>

                              <p className="text-sm font-semibold text-slate-800">
                                {booking.guestName ||
                                  "Guest"}
                              </p>

                              <p className="mt-1 max-w-[190px] truncate text-xs text-slate-500">
                                {booking.guestEmail ||
                                  booking.guestMobile ||
                                  "No contact"}
                              </p>

                              <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                                <Users size={12} />

                                {booking.guests ||
                                  1}{" "}
                                guest
                                {(booking.guests ||
                                  1) !== 1
                                  ? "s"
                                  : ""}
                              </div>

                            </div>
                          </td>

                          {/* DATE */}

                          <td className="px-6 py-4">

                            <div>

                              <p className="text-sm font-medium text-slate-700">
                                {formatDate(
                                  booking.rawDate
                                )}
                              </p>

                              {booking.type ===
                                "Hotel" &&
                                booking.checkIn && (
                                  <p className="mt-1 text-xs text-slate-500">
                                    Check-in:{" "}
                                    {formatDate(
                                      booking.checkIn
                                    )}
                                  </p>
                                )}

                              {booking.type ===
                                "Package" &&
                                booking.travelDate && (
                                  <p className="mt-1 text-xs text-slate-500">
                                    Travel:{" "}
                                    {formatDate(
                                      booking.travelDate
                                    )}
                                  </p>
                                )}

                            </div>

                          </td>

                          {/* AMOUNT */}

                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">
                              {formatCurrency(
                                booking.amount
                              )}
                            </p>
                          </td>

                          {/* PAYMENT */}

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getPaymentClasses(
                                booking.paymentStatus
                              )}`}
                            >
                              {
                                booking.paymentStatus
                              }
                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-4">

                            <div className="relative flex justify-end">

                              <button
                                type="button"
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu ===
                                      booking.id
                                      ? null
                                      : booking.id
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                              >
                                <MoreVertical
                                  size={18}
                                />
                              </button>

                              {openMenu ===
                                booking.id && (
                                <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedBooking(
                                        booking
                                      );

                                      setOpenMenu(
                                        null
                                      );
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    <Eye
                                      size={15}
                                    />

                                    View Details
                                  </button>

                                  {booking.status !==
                                    "Cancelled" && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCancelBookingData(
                                          booking
                                        );

                                        setOpenMenu(
                                          null
                                        );
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                      <XCircle
                                        size={15}
                                      />

                                      Cancel Booking
                                    </button>
                                  )}

                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div className="space-y-3 p-4 lg:hidden">

                {paginatedBookings.map(
                  (booking) => (
                    <div
                      key={`${booking.type}-${booking.id}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                      <div className="flex items-start gap-3">

                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                          {booking.image ? (
                            <img
                              src={booking.image}
                              alt={
                                booking.title
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-blue-600">
                              {booking.type ===
                              "Hotel" ? (
                                <BedDouble
                                  size={22}
                                />
                              ) : (
                                <Package
                                  size={22}
                                />
                              )}
                            </div>
                          )}

                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="mb-1 flex items-center justify-between gap-2">

                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                              {booking.type}
                            </span>

                            <span
                              className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${getStatusClasses(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>

                          </div>

                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {booking.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} />

                            <span className="truncate">
                              {booking.location ||
                                "Location unavailable"}
                            </span>
                          </div>

                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Guest
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                            {booking.guestName ||
                              "Guest"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Booking Date
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {formatDate(
                              booking.rawDate
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            {formatCurrency(
                              booking.amount
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Payment
                          </p>

                          <span
                            className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${getPaymentClasses(
                              booking.paymentStatus
                            )}`}
                          >
                            {
                              booking.paymentStatus
                            }
                          </span>
                        </div>

                      </div>

                      <div className="mt-4 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedBooking(
                              booking
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={15} />

                          View
                        </button>

                        {booking.status !==
                          "Cancelled" && (
                          <button
                            type="button"
                            onClick={() =>
                              setCancelBookingData(
                                booking
                              )
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
                          >
                            <XCircle
                              size={15}
                            />

                            Cancel
                          </button>
                        )}

                      </div>
                    </div>
                  )
                )}

              </div>

              {/* EMPTY */}

              {paginatedBookings.length ===
                0 && (
                <div className="px-6 py-16 text-center">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <CalendarDays
                      size={25}
                    />
                  </div>

                  <h3 className="text-base font-bold text-slate-800">
                    No bookings found
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                    No hotel or package
                    bookings match your
                    current filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear all filters
                  </button>

                </div>
              )}

              {/* PAGINATION */}

              {filteredBookings.length >
                0 && (
                <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-700">
                      {Math.min(
                        (currentPage - 1) *
                          itemsPerPage +
                          1,
                        filteredBookings.length
                      )}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-slate-700">
                      {Math.min(
                        currentPage *
                          itemsPerPage,
                        filteredBookings.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700">
                      {
                        filteredBookings.length
                      }
                    </span>
                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              1,
                              page - 1
                            )
                        )
                      }
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft
                        size={17}
                      />
                    </button>

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) =>
                        index + 1
                    )
                      .slice(
                        Math.max(
                          0,
                          currentPage - 3
                        ),
                        Math.min(
                          totalPages,
                          currentPage + 2
                        )
                      )
                      .map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              page
                            )
                          }
                          className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${
                            currentPage ===
                            page
                              ? "bg-blue-600 text-white shadow-sm"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              totalPages,
                              page + 1
                            )
                        )
                      }
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight
                        size={17}
                      />
                    </button>

                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}

      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

              <div>
                <div className="flex items-center gap-2">

                  {selectedBooking.type ===
                  "Hotel" ? (
                    <Hotel
                      size={18}
                      className="text-blue-600"
                    />
                  ) : (
                    <Package
                      size={18}
                      className="text-blue-600"
                    />
                  )}

                  <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    {
                      selectedBooking.type
                    }
                  </span>

                </div>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Booking Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedBooking(null)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-5 sm:p-6">

              {/* TITLE */}

              <div className="mb-6 flex gap-4">

                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                  {selectedBooking.image ? (
                    <img
                      src={
                        selectedBooking.image
                      }
                      alt={
                        selectedBooking.title
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-blue-600">
                      {selectedBooking.type ===
                      "Hotel" ? (
                        <BedDouble
                          size={28}
                        />
                      ) : (
                        <Package
                          size={28}
                        />
                      )}
                    </div>
                  )}

                </div>

                <div className="min-w-0">

                  <h3 className="text-lg font-bold text-slate-900">
                    {
                      selectedBooking.title
                    }
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} />

                    {
                      selectedBooking.location ||
                      "Location unavailable"
                    }
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Booking ID:{" "}
                    {
                      selectedBooking.id
                    }
                  </p>

                </div>
              </div>

              {/* STATUS */}

              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${getStatusClasses(
                      selectedBooking.status
                    )}`}
                  >
                    {
                      selectedBooking.status
                    }
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-400">
                    Payment
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${getPaymentClasses(
                      selectedBooking.paymentStatus
                    )}`}
                  >
                    {
                      selectedBooking.paymentStatus
                    }
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-400">
                    Amount
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatCurrency(
                      selectedBooking.amount
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-400">
                    Booking Date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {formatDate(
                      selectedBooking.rawDate
                    )}
                  </p>
                </div>

              </div>

              {/* GUEST */}

              <div className="mb-5">

                <h4 className="mb-3 text-sm font-bold text-slate-900">
                  Guest Information
                </h4>

                <div className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-slate-400">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {
                        selectedBooking.guestName ||
                        "N/A"
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                      {
                        selectedBooking.guestEmail ||
                        "N/A"
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Mobile
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {
                        selectedBooking.guestMobile ||
                        "N/A"
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Guests
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {
                        selectedBooking.guests ||
                        1
                      }
                    </p>
                  </div>

                </div>
              </div>

              {/* BOOKING INFO */}

              <div>

                <h4 className="mb-3 text-sm font-bold text-slate-900">
                  Booking Information
                </h4>

                <div className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">

                  {selectedBooking.type ===
                    "Hotel" && (
                    <>
                      <div>
                        <p className="text-xs text-slate-400">
                          Check-in
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {formatDate(
                            selectedBooking.checkIn
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Check-out
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {formatDate(
                            selectedBooking.checkOut
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Rooms
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {
                            selectedBooking.rooms
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Address
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {
                            selectedBooking.address ||
                            "N/A"
                          }
                        </p>
                      </div>
                    </>
                  )}

                  {selectedBooking.type ===
                    "Package" && (
                    <>
                      <div>
                        <p className="text-xs text-slate-400">
                          Travel Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {formatDate(
                            selectedBooking.travelDate
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {
                            selectedBooking.duration ||
                            "N/A"
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Destination
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {
                            selectedBooking.location ||
                            "N/A"
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Travellers
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {
                            selectedBooking.guests ||
                            1
                          }
                        </p>
                      </div>
                    </>
                  )}

                </div>
              </div>

              {selectedBooking.status !==
                "Cancelled" && (
                <button
                  type="button"
                  onClick={() => {
                    setCancelBookingData(
                      selectedBooking
                    );

                    setSelectedBooking(
                      null
                    );
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  <XCircle size={17} />

                  Cancel Booking
                </button>
              )}

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CANCEL MODAL
      ===================================================== */}

      {cancelBookingData && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() =>
            !cancelLoading &&
            setCancelBookingData(null)
          }
        >

          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="mb-5 flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <XCircle size={23} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Cancel Booking?
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Are you sure you want to
                  cancel this{" "}
                  {
                    cancelBookingData.type
                  }{" "}
                  booking?
                </p>
              </div>

            </div>

            {/* BOOKING INFO */}

            <div className="mb-5 rounded-xl bg-slate-50 p-4">

              <p className="text-sm font-bold text-slate-800">
                {
                  cancelBookingData.title
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {
                  cancelBookingData.guestName
                }
              </p>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-xs text-slate-400">
                  Amount
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(
                    cancelBookingData.amount
                  )}
                </span>

              </div>
            </div>

            {/* REASON */}

            <div className="mb-5">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Cancellation Reason
              </label>

              <textarea
                value={cancelReason}
                onChange={(e) =>
                  setCancelReason(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Enter cancellation reason..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              />

            </div>

            {/* ACTIONS */}

            <div className="flex gap-3">

              <button
                type="button"
                disabled={cancelLoading}
                onClick={() =>
                  setCancelBookingData(
                    null
                  )
                }
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                disabled={cancelLoading}
                onClick={
                  handleCancelBooking
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {cancelLoading ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />

                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle size={16} />

                    Confirm Cancel
                  </>
                )}

              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Bookings;