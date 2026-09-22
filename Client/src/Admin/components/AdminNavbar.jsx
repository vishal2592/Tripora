import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

const AdminNavbar = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/admin") return "Dashboard";
    if (path.includes("/bookings")) return "Bookings";
    if (path.includes("/flights")) return "Flights";
    if (path.includes("/hotels")) return "Hotels";
    if (path.includes("/packages")) return "Packages";
    if (path.includes("/destinations")) return "Destinations";
    if (path.includes("/offers")) return "Offers & Deals";
    if (path.includes("/users")) return "Users";
    if (path.includes("/payments")) return "Payments";
    if (path.includes("/reviews")) return "Reviews";
    if (path.includes("/content")) return "Content";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/profile")) return "Admin Profile";

    return "Admin Panel";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-[68px] items-center justify-between px-4 sm:px-5 lg:px-6">
        {/* ================= LEFT ================= */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={19} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-black text-slate-900 sm:text-lg">
              {getPageTitle()}
            </h1>

            <p className="hidden text-[10px] font-medium text-slate-400 sm:block">
              Manage your Tripora platform
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Search */}
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 sm:flex"
            aria-label="Search"
          >
            <Search size={17} />
          </button>

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell size={17} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Admin Profile */}
          <button
            type="button"
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <UserRound size={17} />
            </div>

            <div className="hidden text-left md:block">
              <p className="text-xs font-extrabold text-slate-900">
                Admin
              </p>

              <p className="text-[9px] font-medium text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={14}
              className="hidden text-slate-400 md:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;