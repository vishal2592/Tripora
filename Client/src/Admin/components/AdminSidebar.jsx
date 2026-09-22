import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building2,
  CalendarCheck,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Gift,
  Globe2,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Plane,
  Settings,
  Star,
  Ticket,
  Users,
  X,
} from "lucide-react";

const AdminSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();

  const mainMenu = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Bookings",
      path: "/admin/bookings",
      icon: CalendarCheck,
    },
    {
      label: "Flights",
      path: "/admin/adminflight",
      icon: Plane,
    },
    {
      label: "Hotels",
      path: "/admin/adminhotel",
      icon: Building2,
    },
    {
      label: "Packages",
      path: "/admin/adminpackage",
      icon: Package,
    },
    {
      label: "Destinations",
      path: "/admin/admindestination",
      icon: MapPin,
    },
    {
      label: "Offers & Deals",
      path: "/admin/adminoffers",
      icon: Gift,
    },
  ];

  const managementMenu = [
    {
      label: "Users",
      path: "/admin/adminusers",
      icon: Users,
    },
    {
      label: "Payments",
      path: "/admin/adminpayment",
      icon: CircleDollarSign,
    },
    {
      label: "Reviews",
      path: "/admin/adminreview",
      icon: Star,
    },
    {
      label: "Content",
      path: "/admin/content",
      icon: FileText,
    },
  ];

  const bottomMenu = [
    // {
    //   label: "Settings",
    //   path: "/admin/settings",
    //   icon: Settings,
    // },
    {
      label: "Admin Profile",
      path: "/admin/adminprofile",
      icon: Users,
    },
  ];

  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    setIsSidebarOpen(false);

    navigate("/admin/login");
  };

  const menuItemClass = ({ isActive }) =>
    `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
      isActive
        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      {/* ================= LOGO ================= */}
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-100 px-4">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/20">
            <Plane
              size={19}
              strokeWidth={2.3}
              className="text-white"
            />
          </div>

          <div className="text-left">
            <p className="text-[17px] font-black leading-none tracking-tight text-slate-900">
              Tripora
            </p>

            <p className="mt-1 text-[9px] font-bold text-blue-600">
              ADMIN PANEL
            </p>
          </div>
        </button>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* ================= ADMIN PROFILE MINI CARD ================= */}
      <div className="px-3 pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Users size={16} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold text-slate-900">
              Administrator
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="text-[9px] font-semibold text-slate-500">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}
      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        {/* Main */}
        <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-1">
          {mainMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={handleNavigation}
                className={menuItemClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.4 : 2}
                      className="shrink-0"
                    />

                    <span className="flex-1 truncate">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Management */}
        <p className="mb-2 mt-6 px-3 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
          Management
        </p>

        <nav className="space-y-1">
          {managementMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={menuItemClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.4 : 2}
                      className="shrink-0"
                    />

                    <span className="flex-1 truncate">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* System */}
        <p className="mb-2 mt-6 px-3 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
          System
        </p>

        <nav className="space-y-1">
          {bottomMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={menuItemClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.4 : 2}
                      className="shrink-0"
                    />

                    <span className="flex-1 truncate">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================= LOGOUT ================= */}
      <div className="shrink-0 border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />

          <span>Logout</span>
        </button>

        <div className="mt-3 flex items-center justify-between px-2">
          <p className="text-[9px] font-medium text-slate-400">
            Tripora Admin
          </p>

          <p className="text-[9px] font-bold text-slate-300">
            v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;