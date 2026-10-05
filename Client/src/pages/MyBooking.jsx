import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Hotel,
  MapPin,
  Package,
  Plane,
  Search,
  Ticket,
  XCircle,
} from "lucide-react";

import {
  getMyBookings,
} from "../redux/slicer/MyBookingSlice";

/* =========================================================
   NORMALIZE BACKEND BOOKING
========================================================= */

const normalizeBooking = (booking) => {
  const type = String(
    booking.bookingType || ""
  ).toLowerCase();

  const status = String(
    booking.status ||
      booking.bookingStatus ||
      "pending"
  ).toLowerCase();

  /* ================= HOTEL ================= */

  if (type === "hotel") {
    return {
      mongoId: booking._id,

      id: booking.bookingId,

      type: "hotel",

      status,

      // Keep raw createdAt for correct sorting
      createdAt: booking.createdAt || null,

      bookingDate: booking.createdAt
        ? new Date(
            booking.createdAt
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )
        : "",

      amount: Number(
        booking.totalAmount || 0
      ),

      hotelName:
        booking.hotel?.name ||
        "Hotel",

      location:
        booking.hotel?.location ||
        "",

      image:
        booking.hotel?.image ||
        "",

      checkIn: booking.checkIn
        ? new Date(
            booking.checkIn
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )
        : "",

      checkOut: booking.checkOut
        ? new Date(
            booking.checkOut
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )
        : "",

      nights: booking.nights || 0,

      guests: booking.guests || 0,

      room:
        booking.room?.name ||
        "Room",
    };
  }

  /* ================= PACKAGE ================= */

  if (type === "package") {
    const adults = Number(
      booking.travellers?.adults || 0
    );

    const children = Number(
      booking.travellers?.children || 0
    );

    const infants = Number(
      booking.travellers?.infants || 0
    );

    return {
      mongoId: booking._id,

      id: booking.bookingId,

      type: "package",

      status,

      // Keep raw createdAt for correct sorting
      createdAt: booking.createdAt || null,

      bookingDate: booking.createdAt
        ? new Date(
            booking.createdAt
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )
        : "",

      amount: Number(
        booking.pricing?.totalAmount ||
          0
      ),

      packageName:
        booking.package?.name ||
        booking.packageDetails?.name ||
        "Holiday Package",

      destination:
        booking.package?.destination ||
        booking.packageDetails?.destination ||
        "",

      image:
        booking.package?.image ||
        booking.packageDetails?.image ||
        "",

      duration:
        booking.package?.duration ||
        booking.packageDetails?.duration ||
        "",

      travellers:
        adults +
        children +
        infants,

      /*
       * Keep this empty until actual
       * package inclusions are returned
       * by backend.
       */
      includes: [],
    };
  }

  return null;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const MyBookings = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* =======================================================
     REDUX STATE
  ======================================================= */

  const {
    bookings: backendBookings,
    summary,
    loading,
    error,
  } = useSelector(
    (state) => state.myBooking
  );

  /* =======================================================
     LOCAL UI STATE
  ======================================================= */

  const [activeTab, setActiveTab] =
    useState("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("latest");

  /* =======================================================
     FETCH BOOKINGS THROUGH REDUX
  ======================================================= */

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  /* =======================================================
     NORMALIZE BOOKINGS
  ======================================================= */

  const bookings = useMemo(() => {
    return (backendBookings || [])
      .map(normalizeBooking)
      .filter(Boolean);
  }, [backendBookings]);

  /* =======================================================
     FILTER BOOKINGS
  ======================================================= */

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    /* =====================================================
       TYPE FILTER
    ===================================================== */

    if (activeTab !== "all") {
      result = result.filter(
        (booking) =>
          booking.type === activeTab
      );
    }

    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter !== "all") {
      result = result.filter(
        (booking) =>
          booking.status ===
          statusFilter
      );
    }

    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchTerm.trim()) {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      result = result.filter(
        (booking) => {
          const searchableText = [
            booking.id,

            booking.airline,
            booking.flightNumber,

            booking.from?.city,
            booking.to?.city,

            booking.hotelName,
            booking.location,

            booking.packageName,
            booking.destination,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(
            search
          );
        }
      );
    }

    /* =====================================================
       SORT
    ===================================================== */

    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(
            b.createdAt || 0
          ) -
          new Date(
            a.createdAt || 0
          )
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.amount || 0) -
          Number(a.amount || 0)
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.amount || 0) -
          Number(b.amount || 0)
      );
    }

    return result;
  }, [
    bookings,
    activeTab,
    searchTerm,
    statusFilter,
    sortBy,
  ]);

  /* =======================================================
     STATS
  ======================================================= */

  /*
   * Prefer backend summary because it is calculated
   * from the complete booking collection.
   */

  const totalBookings =
    summary?.totalTrips ??
    bookings.length;

  const upcomingBookings =
    summary?.upcoming ??
    bookings.filter(
      (booking) =>
        booking.status ===
          "confirmed" ||
        booking.status === "pending"
    ).length;

  const completedBookings =
    summary?.completed ??
    bookings.filter(
      (booking) =>
        booking.status ===
        "completed"
    ).length;

  const cancelledBookings =
    summary?.cancelled ??
    bookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length;

  /* =======================================================
     CANCEL BOOKING
  ======================================================= */

  const handleCancelBooking = async (
    booking
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this booking?"
      );

    if (!confirmed) return;

    /*
     * Package cancellation is already
     * handled by the backend endpoint.
     *
     * For now, hotel cancellation API
     * has not been connected.
     */

    if (booking.type === "hotel") {
      window.alert(
        "Hotel cancellation API is not connected yet."
      );

      return;
    }

    /*
     * Package cancellation can be
     * connected through the package
     * booking API.
     *
     * We import api here only for the
     * existing cancellation endpoint.
     */

    if (booking.type === "package") {
      try {
        const { default: api } =
          await import("../redux/api");

        await api.put(
          `/package-bookings/${booking.mongoId}/cancel`,
          {
            cancellationReason:
              "Cancelled by user",
          }
        );

        /*
         * Refresh Redux booking data
         * after successful cancellation.
         */

        dispatch(getMyBookings());
      } catch (error) {
        console.error(
          "Cancel Booking Error:",
          error
        );

        window.alert(
          error.response?.data?.message ||
            "Failed to cancel booking."
        );
      }
    }
  };

  /* =======================================================
     VIEW DETAILS
  ======================================================= */

  const handleViewDetails = (
    booking
  ) => {
    /* ================= FLIGHT ================= */

    if (
      booking.type === "flight"
    ) {
      navigate(
        `/flight-booking/${booking.mongoId}`,
        {
          state: {
            booking,
          },
        }
      );

      return;
    }

    /* ================= HOTEL ================= */

    if (
      booking.type === "hotel"
    ) {
      navigate(
        `/hotel-booking/${booking.mongoId}`,
        {
          state: {
            booking,
          },
        }
      );

      return;
    }

    /* ================= PACKAGE ================= */

    navigate(
      `/package-booking/${booking.mongoId}`,
      {
        state: {
          booking,
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">

        <div className="flex h-16 items-center gap-3 px-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0">

            <h1 className="truncate text-base font-black text-slate-900">
              My Bookings
            </h1>

            <p className="text-[11px] text-slate-500">
              Manage your trips
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">

        {/* ===================================================
            DESKTOP BREADCRUMB
        =================================================== */}

        <div className="mb-5 hidden items-center gap-2 text-xs text-slate-500 lg:flex">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="transition hover:text-blue-600"
          >
            Home
          </button>

          <ChevronRight size={13} />

          <span className="font-semibold text-slate-700">
            My Bookings
          </span>

        </div>

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Your trips
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your flights, hotels and holiday packages.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Explore Trips
            <ArrowRight size={16} />
          </button>

        </section>

        {/* ===================================================
            STATS
        =================================================== */}

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          <BookingStat
            icon={
              <Ticket size={18} />
            }
            value={totalBookings}
            label="Total Trips"
          />

          <BookingStat
            icon={
              <Clock3 size={18} />
            }
            value={upcomingBookings}
            label="Upcoming"
          />

          <BookingStat
            icon={
              <CheckCircle2
                size={18}
              />
            }
            value={completedBookings}
            label="Completed"
          />

          <BookingStat
            icon={
              <XCircle size={18} />
            }
            value={cancelledBookings}
            label="Cancelled"
          />

        </section>

        {/* ===================================================
            FILTER CARD
        =================================================== */}

        <section className="mt-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          {/* Tabs */}

          <div className="overflow-x-auto scrollbar-none">

            <div className="flex min-w-max items-center gap-1 rounded-xl bg-slate-100 p-1">

              <BookingTab
                active={
                  activeTab === "all"
                }
                onClick={() =>
                  setActiveTab("all")
                }
              >
                All
              </BookingTab>

              <BookingTab
                active={
                  activeTab === "flight"
                }
                onClick={() =>
                  setActiveTab(
                    "flight"
                  )
                }
                icon={
                  <Plane size={14} />
                }
              >
                Flights
              </BookingTab>

              <BookingTab
                active={
                  activeTab === "hotel"
                }
                onClick={() =>
                  setActiveTab(
                    "hotel"
                  )
                }
                icon={
                  <Hotel size={14} />
                }
              >
                Hotels
              </BookingTab>

              <BookingTab
                active={
                  activeTab ===
                  "package"
                }
                onClick={() =>
                  setActiveTab(
                    "package"
                  )
                }
                icon={
                  <Package size={14} />
                }
              >
                Packages
              </BookingTab>

            </div>

          </div>

          {/* Search + Filters */}

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">

            {/* Search */}

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                placeholder="Search booking ID, city, hotel..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-700"
                >
                  <XCircle
                    size={16}
                  />
                </button>
              )}

            </div>

            {/* Status */}

            <div className="relative">

              <select
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-44"
              >

                <option value="all">
                  All Status
                </option>

                <option value="confirmed">
                  Confirmed
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

                <option value="pending">
                  Pending
                </option>

              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

            {/* Sort */}

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-44"
              >

                <option value="latest">
                  Latest
                </option>

                <option value="price-high">
                  Price: High
                </option>

                <option value="price-low">
                  Price: Low
                </option>

              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

          </div>

        </section>

        {/* ===================================================
            RESULTS
        =================================================== */}

        <section className="mt-2">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-black text-slate-900">
                Your Trips
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {loading
                  ? "Loading bookings..."
                  : `${filteredBookings.length} booking${
                      filteredBookings.length !==
                      1
                        ? "s"
                        : ""
                    } found`}
              </p>

            </div>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <LoadingBookings />
          ) : error ? (
            <BookingError
              message={error}
              onRetry={() =>
                dispatch(
                  getMyBookings()
                )
              }
            />
          ) : filteredBookings.length >
            0 ? (
            <div className="space-y-4">

              {filteredBookings.map(
                (booking) => {

                  if (
                    booking.type ===
                    "flight"
                  ) {
                    return (
                      <FlightBookingCard
                        key={
                          booking.mongoId ||
                          booking.id
                        }
                        booking={
                          booking
                        }
                        onViewDetails={() =>
                          handleViewDetails(
                            booking
                          )
                        }
                        onCancel={() =>
                          handleCancelBooking(
                            booking
                          )
                        }
                      />
                    );
                  }

                  if (
                    booking.type ===
                    "hotel"
                  ) {
                    return (
                      <HotelBookingCard
                        key={
                          booking.mongoId ||
                          booking.id
                        }
                        booking={
                          booking
                        }
                        onViewDetails={() =>
                          handleViewDetails(
                            booking
                          )
                        }
                        onCancel={() =>
                          handleCancelBooking(
                            booking
                          )
                        }
                      />
                    );
                  }

                  return (
                    <PackageBookingCard
                      key={
                        booking.mongoId ||
                        booking.id
                      }
                      booking={
                        booking
                      }
                      onViewDetails={() =>
                        handleViewDetails(
                          booking
                        )
                      }
                      onCancel={() =>
                        handleCancelBooking(
                          booking
                        )
                      }
                    />
                  );
                }
              )}

            </div>
          ) : (
            <EmptyBookings
              activeTab={
                activeTab
              }
              searchTerm={
                searchTerm
              }
              onClear={() => {
                setSearchTerm("");
                setActiveTab("all");
                setStatusFilter(
                  "all"
                );
              }}
            />
          )}

        </section>

      </main>

    </div>
  );
};

/* =========================================================
   LOADING BOOKINGS
========================================================= */

const LoadingBookings = () => {
  return (
    <div className="space-y-4">

      {[1, 2].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >

          <div className="animate-pulse">

            <div className="h-5 w-28 bg-slate-200" />

            <div className="space-y-4 p-5">

              <div className="h-5 w-2/3 rounded bg-slate-200" />

              <div className="h-4 w-1/3 rounded bg-slate-200" />

              <div className="grid gap-3 sm:grid-cols-3">

                <div className="h-12 rounded-xl bg-slate-100" />

                <div className="h-12 rounded-xl bg-slate-100" />

                <div className="h-12 rounded-xl bg-slate-100" />

              </div>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

/* =========================================================
   ERROR
========================================================= */

const BookingError = ({
  message,
  onRetry,
}) => {
  return (
    <div className="rounded-3xl border border-red-100 bg-white px-5 py-14 text-center shadow-sm">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <XCircle size={28} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-900">
        Unable to load bookings
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
      >
        Try Again
      </button>

    </div>
  );
};

/* =========================================================
   BOOKING STAT
========================================================= */

const BookingStat = ({
  icon,
  value,
  label,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-3 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-xs font-medium text-slate-500">
        {label}
      </p>

    </div>
  );
};

/* =========================================================
   BOOKING TAB
========================================================= */

const BookingTab = ({
  children,
  active,
  onClick,
  icon,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
        active
          ? "bg-white text-blue-600 shadow-sm"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

/* =========================================================
   FLIGHT BOOKING CARD
========================================================= */

const FlightBookingCard = ({
  booking,
  onViewDetails,
  onCancel,
}) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-sm">

            {booking.logo ? (
              <img
                src={booking.logo}
                alt={booking.airline}
                className="max-h-7 max-w-full object-contain"
              />
            ) : (
              <Plane
                size={18}
                className="text-blue-600"
              />
            )}

          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-sm font-black text-slate-900">
                {booking.airline}
              </h3>

              <span className="text-xs text-slate-400">
                {booking.flightNumber}
              </span>

            </div>

            <p className="mt-0.5 text-xs text-slate-500">
              {booking.date} •{" "}
              {booking.duration}
            </p>

          </div>

        </div>

        <StatusBadge
          status={
            booking.status
          }
        />

      </div>

      <div className="p-4 sm:p-5">

        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">

          <div className="text-left">

            <p className="text-2xl font-black tracking-tight text-slate-900">
              {booking.from?.code}
            </p>

            <p className="mt-1 text-xs font-bold text-slate-700">
              {booking.from?.city}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {booking.from?.time}
            </p>

          </div>

          <div className="hidden min-w-[150px] items-center gap-2 md:flex">

            <div className="h-px flex-1 bg-slate-200" />

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Plane size={15} />
            </div>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 md:hidden">

            <div className="h-px flex-1 bg-slate-200" />

            <Plane
              size={14}
              className="text-blue-600"
            />

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          <div className="text-left md:text-right">

            <p className="text-2xl font-black tracking-tight text-slate-900">
              {booking.to?.code}
            </p>

            <p className="mt-1 text-xs font-bold text-slate-700">
              {booking.to?.city}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {booking.to?.time}
            </p>

          </div>

        </div>

        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">

          <BookingMeta
            label="Booking ID"
            value={booking.id}
          />

          <BookingMeta
            label="Passengers"
            value={`${booking.passengers} Traveller${
              booking.passengers > 1
                ? "s"
                : ""
            }`}
          />

          <BookingMeta
            label="Total Fare"
            value={`₹${Number(
              booking.amount || 0
            ).toLocaleString(
              "en-IN"
            )}`}
            highlight
          />

        </div>

        <BookingActions
          status={
            booking.status
          }
          onViewDetails={
            onViewDetails
          }
          onCancel={onCancel}
        />

      </div>

    </article>
  );
};

/* =========================================================
   HOTEL BOOKING CARD
========================================================= */

const HotelBookingCard = ({
  booking,
  onViewDetails,
  onCancel,
}) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      <div className="flex flex-col md:flex-row">

        <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-60">

          {booking.image ? (
            <img
              src={booking.image}
              alt={booking.hotelName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[208px] w-full items-center justify-center bg-slate-100 text-slate-400">
              <Hotel size={36} />
            </div>
          )}

          <div className="absolute left-3 top-3">
            <StatusBadge
              status={
                booking.status
              }
            />
          </div>

        </div>

        <div className="min-w-0 flex-1 p-4 sm:p-5">

          <div className="flex flex-col gap-4">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Hotel Booking
              </p>

              <h3 className="mt-1 text-xl font-black text-slate-900">
                {booking.hotelName}
              </h3>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={14} />

                {booking.location ||
                  "Location not available"}
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              <DateBox
                label="Check-in"
                value={
                  booking.checkIn
                }
              />

              <DateBox
                label="Check-out"
                value={
                  booking.checkOut
                }
              />

            </div>

            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">

              <BookingMeta
                label="Booking ID"
                value={
                  booking.id
                }
              />

              <BookingMeta
                label="Room"
                value={
                  booking.room
                }
              />

              <BookingMeta
                label="Total"
                value={`₹${Number(
                  booking.amount ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}`}
                highlight
              />

            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

              {/* <button
                type="button"
                onClick={
                  onViewDetails
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                View Details
                <ArrowRight
                  size={14}
                />
              </button> */}

              {booking.status ===
                "confirmed" && (
                <button
                  type="button"
                  onClick={
                    onCancel
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
                >
                  Cancel Booking
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </article>
  );
};

/* =========================================================
   PACKAGE BOOKING CARD
========================================================= */

const PackageBookingCard = ({
  booking,
  onViewDetails,
  onCancel,
}) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      <div className="flex flex-col md:flex-row">

        <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-60">

          {booking.image ? (
            <img
              src={booking.image}
              alt={booking.packageName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[208px] w-full items-center justify-center bg-slate-100 text-slate-400">
              <Package
                size={36}
              />
            </div>
          )}

          <div className="absolute left-3 top-3">
            <StatusBadge
              status={
                booking.status
              }
            />
          </div>

        </div>

        <div className="min-w-0 flex-1 p-4 sm:p-5">

          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Holiday Package
          </p>

          <h3 className="mt-1 text-xl font-black text-slate-900">
            {booking.packageName}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={14} />

            {booking.destination ||
              "Destination not available"}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <BookingMeta
              label="Duration"
              value={
                booking.duration
              }
            />

            <BookingMeta
              label="Travellers"
              value={`${booking.travellers} Traveller${
                booking.travellers >
                1
                  ? "s"
                  : ""
              }`}
            />

            <BookingMeta
              label="Total"
              value={`₹${Number(
                booking.amount ||
                  0
              ).toLocaleString(
                "en-IN"
              )}`}
              highlight
            />

          </div>

          {booking.includes?.length >
            0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {booking.includes.map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600"
                  >
                    ✓ {item}
                  </span>
                )
              )}

            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={
                onViewDetails
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
            >
              View Details

              <ArrowRight
                size={14}
              />
            </button>

            {booking.status ===
              "confirmed" && (
              <button
                type="button"
                onClick={
                  onCancel
                }
                className="inline-flex items-center justify-center rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
              >
                Cancel Booking
              </button>
            )}

          </div>

        </div>

      </div>

    </article>
  );
};

/* =========================================================
   DATE BOX
========================================================= */

const DateBox = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">

      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">

        <CalendarDays
          size={13}
        />

        {label}

      </div>

      <p className="mt-1.5 text-xs font-bold text-slate-800">
        {value ||
          "Not available"}
      </p>

    </div>
  );
};

/* =========================================================
   BOOKING META
========================================================= */

const BookingMeta = ({
  label,
  value,
  highlight = false,
}) => {
  return (
    <div className="min-w-0">

      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-xs font-bold ${
          highlight
            ? "text-blue-600"
            : "text-slate-800"
        }`}
      >
        {value || "-"}
      </p>

    </div>
  );
};

/* =========================================================
   BOOKING ACTIONS
========================================================= */

const BookingActions = ({
  status,
  onViewDetails,
  onCancel,
}) => {
  return (
    <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

      <button
        type="button"
        onClick={
          onViewDetails
        }
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
      >
        View Details

        <ArrowRight
          size={14}
        />
      </button>

      {status ===
        "confirmed" && (
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
        >
          Cancel Booking
        </button>
      )}

    </div>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {
  const statusConfig = {
    confirmed: {
      label: "Confirmed",

      icon: (
        <CheckCircle2
          size={13}
        />
      ),

      className:
        "bg-emerald-50 text-emerald-700 border-emerald-100",
    },

    completed: {
      label: "Completed",

      icon: (
        <CheckCircle2
          size={13}
        />
      ),

      className:
        "bg-blue-50 text-blue-700 border-blue-100",
    },

    cancelled: {
      label: "Cancelled",

      icon: (
        <XCircle size={13} />
      ),

      className:
        "bg-red-50 text-red-700 border-red-100",
    },

    pending: {
      label: "Pending",

      icon: (
        <Clock3 size={13} />
      ),

      className:
        "bg-amber-50 text-amber-700 border-amber-100",
    },
  };

  const config =
    statusConfig[status] ||
    statusConfig.pending;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${config.className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyBookings = ({
  activeTab,
  searchTerm,
  onClear,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Ticket size={28} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-900">
        No bookings found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

        {searchTerm
          ? "We couldn't find a booking matching your search."
          : activeTab !==
            "all"
          ? `You don't have any ${activeTab} bookings yet.`
          : "Your upcoming trips and past bookings will appear here."}

      </p>

      <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Clear Filters
        </button>

        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "/")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
        >
          Explore Trips

          <ArrowRight
            size={14}
          />
        </button>

      </div>

    </div>
  );
};

export default MyBookings;