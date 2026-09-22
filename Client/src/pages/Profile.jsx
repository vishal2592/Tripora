
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Plane,
  Settings,
  ShieldCheck,
  Star,
  Ticket,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Vishal Kumar",
    email: "vishal@example.com",
    mobile: "+91 98765 43210",
    location: "Bihar, India",
    dob: "15 August 2000",
    gender: "Male",
    avatar: "",
    preferredDestination: "Dubai",
    travelType: "Leisure",
    seatPreference: "Window",
    mealPreference: "Vegetarian",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name,
    mobile: user.mobile,
    location: user.location,
    dob: user.dob,
    gender: user.gender,
    preferredDestination: user.preferredDestination,
    travelType: user.travelType,
    seatPreference: user.seatPreference,
    mealPreference: user.mealPreference,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      ...editForm,
    }));

    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          MOBILE TOP BAR
      ===================================================== */}

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-base font-black text-slate-900">
            My Profile
          </h1>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* Mobile menu */}

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Home
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              My Bookings
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/support")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Help & Support
              <ChevronRight size={16} />
            </button>

          </div>
        )}
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">

        {/* ===================================================
            DESKTOP BREADCRUMB
        =================================================== */}

        <div className="mb-5 hidden items-center gap-2 text-xs text-slate-500 lg:flex">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition hover:text-blue-600"
          >
            Home
          </button>

          <ChevronRight size={13} />

          <span className="font-semibold text-slate-700">
            My Profile
          </span>

        </div>

        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Blue Cover */}

          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 sm:h-40">

            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="absolute right-20 top-10 h-24 w-24 rounded-full bg-white/10" />

            <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-black/10 to-transparent" />

          </div>

          {/* Profile Info */}

          <div className="relative px-5 pb-5 sm:px-7 sm:pb-6">

            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                {/* Avatar */}

                <div className="relative">

                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-blue-100 text-3xl font-black text-blue-600 shadow-lg sm:h-28 sm:w-28">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">
                    <CheckCircle2 size={15} />
                  </div>

                </div>

                {/* Name */}

                <div className="pb-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                      {user.name}
                    </h1>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                      Traveller
                    </span>

                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">

                    <span className="flex items-center gap-1.5">
                      <Mail size={14} />
                      {user.email}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {user.location}
                    </span>

                  </div>

                </div>

              </div>

              {/* Edit Button */}

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>

            </div>

          </div>

        </section>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <StatCard
            icon={<Ticket size={19} />}
            value="12"
            label="Bookings"
            onClick={() => navigate("/my-bookings")}
          />

          <StatCard
            icon={<Heart size={19} />}
            value="8"
            label="Saved Trips"
            onClick={() => navigate("/saved")}
          />

          <StatCard
            icon={<Star size={19} />}
            value="6"
            label="Reviews"
            onClick={() => navigate("/reviews")}
          />

          <StatCard
            icon={<Wallet size={19} />}
            value="₹2,450"
            label="Wallet"
            onClick={() => navigate("/wallet")}
          />

        </section>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_350px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* PERSONAL INFORMATION */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Account details
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your basic personal information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50 sm:flex"
                >
                  <Edit3 size={14} />
                  Edit
                </button>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <ProfileField
                  icon={<User size={17} />}
                  label="Full Name"
                  value={user.name}
                />

                <ProfileField
                  icon={<Mail size={17} />}
                  label="Email Address"
                  value={user.email}
                />

                <ProfileField
                  icon={<PhoneIcon />}
                  label="Mobile Number"
                  value={user.mobile}
                />

                <ProfileField
                  icon={<CalendarDays size={17} />}
                  label="Date of Birth"
                  value={user.dob}
                />

                <ProfileField
                  icon={<Users size={17} />}
                  label="Gender"
                  value={user.gender}
                />

                <ProfileField
                  icon={<MapPin size={17} />}
                  label="Location"
                  value={user.location}
                />

              </div>

            </section>

            {/* TRAVEL PREFERENCES */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Your travel style
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  Travel Preferences
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  We'll use these preferences to improve your travel experience.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <PreferenceCard
                  icon={<MapPin size={18} />}
                  label="Preferred Destination"
                  value={user.preferredDestination}
                />

                <PreferenceCard
                  icon={<Plane size={18} />}
                  label="Travel Type"
                  value={user.travelType}
                />

                <PreferenceCard
                  icon={<Users size={18} />}
                  label="Seat Preference"
                  value={user.seatPreference}
                />

                <PreferenceCard
                  icon={<CheckCircle2 size={18} />}
                  label="Meal Preference"
                  value={user.mealPreference}
                />

              </div>

            </section>

            {/* TRAVELER BENEFITS */}

            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Your Tripora account is protected
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Your personal information and booking details are securely
                    stored and protected.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/privacy")}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Learn more
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-5">

            {/* QUICK ACTIONS */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Manage your trips
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  Quick Actions
                </h2>
              </div>

              <div className="mt-5 space-y-2">

                <ActionItem
                  icon={<Ticket size={18} />}
                  title="My Bookings"
                  subtitle="View your upcoming trips"
                  onClick={() => navigate("/my-bookings")}
                />

                <ActionItem
                  icon={<Heart size={18} />}
                  title="Saved Trips"
                  subtitle="Your saved hotels & destinations"
                  onClick={() => navigate("/saved")}
                />

                <ActionItem
                  icon={<Plane size={18} />}
                  title="Find Flights"
                  subtitle="Search and book flights"
                  onClick={() => navigate("/flights")}
                />

                <ActionItem
                  icon={<HotelIcon />}
                  title="Find Hotels"
                  subtitle="Discover your next stay"
                  onClick={() => navigate("/hotels")}
                />

              </div>

            </section>

            {/* ACCOUNT SETTINGS */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Account
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  Settings
                </h2>
              </div>

              <div className="mt-5 space-y-1">

                <SettingItem
                  icon={<Bell size={17} />}
                  title="Notifications"
                  onClick={() => navigate("/settings/notifications")}
                />

                <SettingItem
                  icon={<Lock size={17} />}
                  title="Password & Security"
                  onClick={() => navigate("/settings/security")}
                />

                <SettingItem
                  icon={<Settings size={17} />}
                  title="Account Settings"
                  onClick={() => navigate("/settings")}
                />

                <SettingItem
                  icon={<HelpCircle size={17} />}
                  title="Help & Support"
                  onClick={() => navigate("/support")}
                />

              </div>

            </section>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white px-4 py-3.5 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>

          </aside>

        </div>

      </main>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl">

            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Update your personal and travel information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
              >
                <X size={19} />
              </button>

            </div>

            {/* Modal Content */}

            <div className="space-y-5 p-5 sm:p-6">

              {/* Personal */}

              <div>

                <h3 className="mb-3 text-sm font-black text-slate-900">
                  Personal Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  <InputField
                    label="Full Name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    value={editForm.mobile}
                    onChange={handleInputChange}
                  />

                  <InputField
                    label="Date of Birth"
                    name="dob"
                    value={editForm.dob}
                    onChange={handleInputChange}
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    value={editForm.gender}
                    onChange={handleInputChange}
                    options={["Male", "Female", "Other"]}
                  />

                  <div className="sm:col-span-2">
                    <InputField
                      label="Location"
                      name="location"
                      value={editForm.location}
                      onChange={handleInputChange}
                    />
                  </div>

                </div>

              </div>

              {/* Travel Preferences */}

              <div>

                <h3 className="mb-3 text-sm font-black text-slate-900">
                  Travel Preferences
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  <SelectField
                    label="Preferred Destination"
                    name="preferredDestination"
                    value={editForm.preferredDestination}
                    onChange={handleInputChange}
                    options={[
                      "Dubai",
                      "Bali",
                      "Maldives",
                      "Paris",
                      "Singapore",
                      "Thailand",
                      "Switzerland",
                      "Goa",
                      "Kashmir",
                      "Manali",
                    ]}
                  />

                  <SelectField
                    label="Travel Type"
                    name="travelType"
                    value={editForm.travelType}
                    onChange={handleInputChange}
                    options={[
                      "Leisure",
                      "Adventure",
                      "Family",
                      "Honeymoon",
                      "Business",
                      "Luxury",
                    ]}
                  />

                  <SelectField
                    label="Seat Preference"
                    name="seatPreference"
                    value={editForm.seatPreference}
                    onChange={handleInputChange}
                    options={[
                      "Window",
                      "Aisle",
                      "Middle",
                      "No Preference",
                    ]}
                  />

                  <SelectField
                    label="Meal Preference"
                    name="mealPreference"
                    value={editForm.mealPreference}
                    onChange={handleInputChange}
                    options={[
                      "Vegetarian",
                      "Non-Vegetarian",
                      "Vegan",
                      "No Preference",
                    ]}
                  />

                </div>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="sticky bottom-0 flex gap-3 border-t border-slate-200 bg-white p-4 sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:flex-none"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ icon, value, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <ArrowRight
          size={15}
          className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
        />

      </div>

      <p className="mt-3 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-xs font-medium text-slate-500">
        {label}
      </p>

    </button>
  );
};

/* =========================================================
   PROFILE FIELD
========================================================= */

const ProfileField = ({ icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

      <div className="flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          {icon}
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </span>

      </div>

      <p className="mt-3 truncate text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
};

/* =========================================================
   PREFERENCE CARD
========================================================= */

const PreferenceCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
};

/* =========================================================
   ACTION ITEM
========================================================= */

const ActionItem = ({ icon, title, subtitle, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-blue-50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {subtitle}
        </p>

      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-slate-400 group-hover:text-blue-600"
      />

    </button>
  );
};

/* =========================================================
   SETTING ITEM
========================================================= */

const SettingItem = ({ icon, title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-slate-50"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600">
        {icon}
      </div>

      <span className="flex-1 text-sm font-semibold text-slate-700">
        {title}
      </span>

      <ChevronRight
        size={15}
        className="text-slate-300 group-hover:text-blue-600"
      />

    </button>
  );
};

/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({ label, name, value, onChange }) => {
  return (
    <label className="block">

      <span className="mb-1.5 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </label>
  );
};

/* =========================================================
   SELECT FIELD
========================================================= */

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <label className="block">

      <span className="mb-1.5 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </label>
  );
};

/* =========================================================
   SMALL ICON HELPERS
========================================================= */

const PhoneIcon = () => {
  return (
    <span className="text-[15px] font-black">
      ☎
    </span>
  );
};

const HotelIcon = () => {
  return <span className="text-[15px]">🏨</span>;
};

export default Profile;

