import React, { useEffect, useState } from "react";
import {
  Plane,
  Hotel,
  TrainFront,
  BusFront,
  BriefcaseBusiness,
  MapPin,
  Tag,
  Home,
  Search,
  UserRound,
  Menu,
  X,
  Globe2,
  Languages,
  ChevronDown,
  User,
  Ticket,
  Heart,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slicer/userSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("EN");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= REDUX AUTH =================

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ================= CLOSE MENUS ON ROUTE CHANGE =================

  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyOpen(false);
    setLanguageOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // ================= BODY SCROLL =================

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ================= NAV ITEMS =================

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Flights",
      path: "/flights",
      icon: Plane,
    },
    {
      name: "Hotels",
      path: "/hotels",
      icon: Hotel,
    },
    {
      name: "Trains",
      path: "/trains",
      icon: TrainFront,
    },
    {
      name: "Buses",
      path: "/buses",
      icon: BusFront,
    },
    {
      name: "Packages",
      path: "/packages",
      icon: BriefcaseBusiness,
    },
    {
      name: "Destinations",
      path: "/destinations",
      icon: MapPin,
    },
    {
      name: "Offers",
      path: "/offers",
      icon: Tag,
    },
  ];

  const currencies = ["INR", "USD", "EUR", "GBP"];
  const languages = ["EN", "HI"];

  // ================= LOGOUT =================

  const handleLogout = () => {
    dispatch(logout());

    setUserMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/login");
  };

  // ================= USER MENU NAVIGATION =================

  const handleUserNavigation = (path) => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);

    navigate(path);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 shadow-[0_2px_15px_rgba(15,23,42,0.05)] backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ================= LOGO ================= */}

          <Link to="/" className="group flex shrink-0 items-center gap-2">
            {/* Logo Mark */}
            <div className="relative flex h-11 w-11 items-center justify-center">
              <div className="absolute inset-1 rotate-[-25deg] rounded-full border-[5px] border-blue-600 border-r-transparent border-t-transparent" />

              <div className="absolute left-[8px] top-[7px] h-7 w-7 rounded-full bg-blue-600 shadow-md">
                <div className="absolute left-[9px] top-[8px] h-2.5 w-2.5 rounded-full bg-white" />
              </div>

              <Plane
                size={17}
                strokeWidth={2.5}
                className="absolute right-0 top-0 rotate-[-35deg] text-blue-600"
              />

              <div className="absolute bottom-0 left-0 h-3 w-6 rotate-[-25deg] rounded-full bg-amber-400" />
            </div>

            {/* Brand Name */}
            <div className="leading-none">
              <div className="text-[27px] font-extrabold tracking-[-1.5px] text-slate-900">
                Trip<span className="text-blue-600">ora</span>
              </div>

              <p className="mt-1 hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
                Plan. Book. Explore.
              </p>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAV
          ===================================================== */}

          <nav className="hidden items-center xl:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      group relative flex h-[76px] min-w-[76px] flex-col
                      items-center justify-center px-2
                      text-[13px] font-medium transition-all duration-200
                      ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={21}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={`mb-1.5 transition-transform duration-200 ${
                            isActive ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />

                        <span>{item.name}</span>

                        {/* Active underline */}
                        <span
                          className={`
                            absolute bottom-0 left-1/2 h-[3px]
                            -translate-x-1/2 rounded-t-full
                            bg-blue-600 transition-all duration-200
                            ${isActive ? "w-10 opacity-100" : "w-0 opacity-0"}
                          `}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* =====================================================
              DESKTOP RIGHT SIDE
          ===================================================== */}

          <div className="hidden items-center gap-2 xl:flex">
            {/* ================= CURRENCY ================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLanguageOpen(false);
                  setUserMenuOpen(false);
                }}
                className="flex h-11 items-center gap-2 rounded-full bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Globe2 size={17} />

                <span>{currency}</span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    currencyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 top-[50px] z-50 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                  {currencies.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCurrency(item);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        currency === item
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ================= SEARCH ================= */}

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* =================================================
                AUTHENTICATED USER
            ================================================= */}

            {isAuthenticated && user ? (
              <div className="relative ml-1">
                {/* User Icon Button */}
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setCurrencyOpen(false);
                    setLanguageOpen(false);
                  }}
                  className="flex h-11 items-center gap-2 rounded-full bg-blue-50 px-2.5 pr-3 text-blue-600 transition hover:bg-blue-100"
                  aria-label="User menu"
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <UserRound size={17} />
                  </div>

                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ================= USER DROPDOWN ================= */}

                {userMenuOpen && (
                  <div className="absolute right-0 top-[52px] z-50 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
                    {/* User Information */}
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <UserRound size={20} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {user.fullName || "User"}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {/* Profile */}
                      <button
                        type="button"
                        onClick={() => handleUserNavigation("/profile")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <User size={18} />
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            My Profile
                          </p>

                          <p className="text-xs text-slate-400">
                            View and edit profile
                          </p>
                        </div>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-slate-400"
                        />
                      </button>

                      {/* Book Flight */}
                      <button
                        type="button"
                        onClick={() => handleUserNavigation("/flights")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Plane size={18} />
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            Book Flight
                          </p>

                          <p className="text-xs text-slate-400">
                            Search and book flights
                          </p>
                        </div>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-slate-400"
                        />
                      </button>

                      {/* Book Hotel */}
                      <button
                        type="button"
                        onClick={() => handleUserNavigation("/hotels")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Hotel size={18} />
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            Book Hotel
                          </p>

                          <p className="text-xs text-slate-400">
                            Find your perfect stay
                          </p>
                        </div>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-slate-400"
                        />
                      </button>

                      {/* My Bookings */}
                      <button
                        type="button"
                        onClick={() => handleUserNavigation("/my-bookings")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Ticket size={18} />
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            My Bookings
                          </p>

                          <p className="text-xs text-slate-400">
                            View your bookings
                          </p>
                        </div>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-slate-400"
                        />
                      </button>

                      {/* Saved Trips */}
                      <button
                        type="button"
                        onClick={() => handleUserNavigation("/saved-trips")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Heart size={18} />
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            Saved Trips
                          </p>

                          <p className="text-xs text-slate-400">
                            Your saved destinations
                          </p>
                        </div>

                        <ChevronDown
                          size={15}
                          className="-rotate-90 text-slate-400"
                        />
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 transition hover:bg-red-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                          <LogOut size={18} />
                        </span>

                        <div>
                          <p className="text-sm font-semibold">Logout</p>

                          <p className="text-xs text-red-400">
                            Sign out from Tripora
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ================= LOGIN BUTTON ================= */

              <Link
                to="/login"
                className="ml-1 flex h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-lg"
              >
                <UserRound size={18} />

                <span>Login / Register</span>
              </Link>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-800 transition hover:bg-blue-50 hover:text-blue-600 xl:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`
          fixed inset-0 z-[60] bg-slate-900/40
          transition-opacity duration-300 xl:hidden
          ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed right-0 top-0 z-[70] flex h-full w-[320px]
          max-w-[88vw] flex-col bg-white shadow-2xl
          transition-transform duration-300 ease-out xl:hidden
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ================= MOBILE HEADER ================= */}

        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-1 rotate-[-25deg] rounded-full border-[4px] border-blue-600 border-r-transparent border-t-transparent" />

              <div className="absolute left-[8px] top-[7px] h-6 w-6 rounded-full bg-blue-600">
                <div className="absolute left-[7px] top-[7px] h-2 w-2 rounded-full bg-white" />
              </div>

              <Plane
                size={14}
                className="absolute right-0 top-0 rotate-[-35deg] text-blue-600"
              />

              <div className="absolute bottom-0 left-0 h-2.5 w-5 rotate-[-25deg] rounded-full bg-amber-400" />
            </div>

            <div>
              <div className="text-[23px] font-extrabold tracking-[-1px] text-slate-900">
                Trip<span className="text-blue-600">ora</span>
              </div>

              <p className="text-[9px] font-medium tracking-wide text-slate-500">
                Plan. Book. Explore.
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-red-500"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* ================= MOBILE NAVIGATION ================= */}

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {/* Logged in User */}
          {isAuthenticated && user && (
            <div className="mb-5 rounded-2xl bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {user.fullName || "User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user.email || ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Explore Tripora
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-4 rounded-xl px-4 py-3.5
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`
                          flex h-9 w-9 items-center justify-center
                          rounded-lg
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </span>

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* =================================================
              MOBILE USER OPTIONS
          ================================================= */}

          {isAuthenticated && user && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                My Tripora
              </p>

              <div className="space-y-1">
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => handleUserNavigation("/profile")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <User size={18} />
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    My Profile
                  </span>
                </button>

                {/* Book Flight */}
                <button
                  type="button"
                  onClick={() => handleUserNavigation("/flights")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Plane size={18} />
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    Book Flight
                  </span>
                </button>

                {/* Book Hotel */}
                <button
                  type="button"
                  onClick={() => handleUserNavigation("/hotels")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Hotel size={18} />
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    Book Hotel
                  </span>
                </button>

                {/* My Bookings */}
                <button
                  type="button"
                  onClick={() => handleUserNavigation("/bookings")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Ticket size={18} />
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    My Bookings
                  </span>
                </button>

                {/* Saved Trips */}
                <button
                  type="button"
                  onClick={() => handleUserNavigation("/saved-trips")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Heart size={18} />
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    Saved Trips
                  </span>
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                    <LogOut size={18} />
                  </span>

                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= MOBILE PREFERENCES ================= */}

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Preferences
            </p>

            <div className="grid grid-cols-2 gap-2">
              {/* Currency */}
              <button
                type="button"
                onClick={() => {
                  const currentIndex = currencies.indexOf(currency);

                  const nextIndex = (currentIndex + 1) % currencies.length;

                  setCurrency(currencies[nextIndex]);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700"
              >
                <Globe2 size={17} />
                {currency}
              </button>

              {/* Language */}
              <button
                type="button"
                onClick={() => {
                  const currentIndex = languages.indexOf(language);

                  const nextIndex = (currentIndex + 1) % languages.length;

                  setLanguage(languages[nextIndex]);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700"
              >
                <Languages size={17} />
                {language}
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE BOTTOM LOGIN / PROFILE
        ================================================= */}

        {!isAuthenticated ? (
          <div className="border-t border-slate-100 p-4">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <UserRound size={19} />
              Login / Register
            </Link>
          </div>
        ) : (
          <div className="border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
