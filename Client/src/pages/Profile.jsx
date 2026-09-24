
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  ChevronRight,
  Edit3,
  Heart,
  Hotel,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Plane,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Ticket,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfile,
  logout,
} from "../redux/slicer/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux auth data
  const {
    user: authUser,
    token,
    loading,
    error,
  } = useSelector((state) => state.auth);

  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Profile data used by UI
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    dob: "",
    gender: "",
    avatar: "",
    preferredDestination: "Dubai",
    travelType: "Leisure",
    seatPreference: "Window",
    mealPreference: "Vegetarian",
  });

  // Edit form
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    dob: "",
    gender: "",
    preferredDestination: "Dubai",
    travelType: "Leisure",
    seatPreference: "Window",
    mealPreference: "Vegetarian",
  });

  /*
   * Get profile from backend when user is logged in
   */
  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch, token]);

  /*
   * Convert backend user data into UI profile data
   *
   * Backend:
   * fullName
   * mobileNumber
   *
   * UI:
   * name
   * mobile
   */
  useEffect(() => {
    if (!authUser) return;

    setProfileData((prev) => ({
      ...prev,

      name: authUser.fullName || "",
      email: authUser.email || "",
      mobile: authUser.mobileNumber || "",
    }));
  }, [authUser]);

  /*
   * Update edit form when profile data changes
   */
  useEffect(() => {
    setEditForm({
      name: profileData.name,
      email: profileData.email,
      mobile: profileData.mobile,
      location: profileData.location,
      dob: profileData.dob,
      gender: profileData.gender,
      preferredDestination: profileData.preferredDestination,
      travelType: profileData.travelType,
      seatPreference: profileData.seatPreference,
      mealPreference: profileData.mealPreference,
    });
  }, [profileData]);

  /*
   * Logout
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /*
   * Open edit modal
   */
  const handleEditProfile = () => {
    setEditForm({
      name: profileData.name,
      email: profileData.email,
      mobile: profileData.mobile,
      location: profileData.location,
      dob: profileData.dob,
      gender: profileData.gender,
      preferredDestination: profileData.preferredDestination,
      travelType: profileData.travelType,
      seatPreference: profileData.seatPreference,
      mealPreference: profileData.mealPreference,
    });

    setIsEditModalOpen(true);
  };

  /*
   * Edit form input change
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * Save profile
   *
   * NOTE:
   * Currently this updates frontend state only.
   *
   * Backend update API is not created yet.
   */
  const handleSaveProfile = (e) => {
    e.preventDefault();

    setProfileData((prev) => ({
      ...prev,
      ...editForm,
    }));

    setIsEditModalOpen(false);
  };

  /*
   * Close menu when clicking navigation item
   */
  const handleMenuNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  /*
   * Loading state
   */
  if (loading && !authUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-lg font-bold text-slate-900">
            My Profile
          </h1>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white shadow-lg">
            <div className="p-3 space-y-1">
              <button
                onClick={() => handleMenuNavigation("/")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-left"
              >
                <Plane size={18} />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleMenuNavigation("/flights")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-left"
              >
                <Ticket size={18} />
                <span>Flights</span>
              </button>

              <button
                onClick={() => handleMenuNavigation("/hotels")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-left"
              >
                <Hotel size={18} />
                <span>Hotels</span>
              </button>

              <button
                onClick={() => handleMenuNavigation("/bookings")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-left"
              >
                <Calendar size={18} />
                <span>My Bookings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* ================= BREADCRUMB ================= */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500 mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600 transition"
          >
            Home
          </button>

          <ChevronRight size={16} />

          <span className="text-slate-900 font-medium">
            My Profile
          </span>
        </div>

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          {/* Cover */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-72 h-72 rounded-full bg-white -top-40 -right-20" />
              <div className="absolute w-56 h-56 rounded-full bg-white -bottom-40 left-20" />
            </div>
          </div>

          {/* Profile Header Content */}
          <div className="px-5 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 relative">
                {/* Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-lg">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-blue-600">
                        {profileData.name
                          ? profileData.name.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="pb-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {profileData.name || "User"}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {profileData.email || "Email not available"}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                    <MapPin size={15} />

                    <span>
                      {profileData.location || "Location not added"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Edit3 size={17} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={<Ticket size={21} />}
            title="Bookings"
            value="12"
            subtitle="Total bookings"
          />

          <StatCard
            icon={<Heart size={21} />}
            title="Saved Trips"
            value="8"
            subtitle="Saved destinations"
          />

          <StatCard
            icon={<Star size={21} />}
            title="Reviews"
            value="6"
            subtitle="Reviews given"
          />

          <StatCard
            icon={<Wallet size={21} />}
            title="Wallet"
            value="₹2,450"
            subtitle="Available balance"
          />
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Your personal details
                  </p>
                </div>

                <button
                  onClick={handleEditProfile}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit3 size={18} />
                </button>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ProfileField
                  icon={<User size={18} />}
                  label="Full Name"
                  value={profileData.name || "Not added"}
                />

                <ProfileField
                  icon={<Search size={18} />}
                  label="Email Address"
                  value={profileData.email || "Not added"}
                />

                <ProfileField
                  icon={<PhoneIcon />}
                  label="Mobile Number"
                  value={profileData.mobile || "Not added"}
                />

                <ProfileField
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={profileData.location || "Not added"}
                />

                <ProfileField
                  icon={<Calendar size={18} />}
                  label="Date of Birth"
                  value={profileData.dob || "Not added"}
                />

                <ProfileField
                  icon={<User size={18} />}
                  label="Gender"
                  value={profileData.gender || "Not added"}
                />
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="px-5 sm:px-6 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Travel Preferences
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Customize your travel experience
                </p>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PreferenceCard
                  icon={<MapPin size={19} />}
                  title="Preferred Destination"
                  value={profileData.preferredDestination}
                />

                <PreferenceCard
                  icon={<Plane size={19} />}
                  title="Travel Type"
                  value={profileData.travelType}
                />

                <PreferenceCard
                  icon={<Ticket size={19} />}
                  title="Seat Preference"
                  value={profileData.seatPreference}
                />

                <PreferenceCard
                  icon={<HotelIcon />}
                  title="Meal Preference"
                  value={profileData.mealPreference}
                />
              </div>
            </div>

            {/* Account Protection */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="px-5 sm:px-6 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Account Protection
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Manage your account security
                </p>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <ActionItem
                  icon={<Lock size={19} />}
                  title="Change Password"
                  subtitle="Update your account password"
                  onClick={() => navigate("/change-password")}
                />

                <ActionItem
                  icon={<ShieldCheck size={19} />}
                  title="Security"
                  subtitle="Manage account security settings"
                  onClick={() => navigate("/security")}
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="px-5 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Quick Actions
                </h3>
              </div>

              <div className="p-3">
                <ActionItem
                  icon={<Ticket size={19} />}
                  title="My Bookings"
                  subtitle="View your bookings"
                  onClick={() => navigate("/bookings")}
                />

                <ActionItem
                  icon={<Heart size={19} />}
                  title="Saved Trips"
                  subtitle="Your saved destinations"
                  onClick={() => navigate("/saved-trips")}
                />

                <ActionItem
                  icon={<Wallet size={19} />}
                  title="Wallet"
                  subtitle="Manage your wallet"
                  onClick={() => navigate("/wallet")}
                />

                <ActionItem
                  icon={<Star size={19} />}
                  title="My Reviews"
                  subtitle="View your reviews"
                  onClick={() => navigate("/reviews")}
                />
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="px-5 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Settings
                </h3>
              </div>

              <div className="p-3">
                <SettingItem
                  icon={<Bell size={19} />}
                  title="Notifications"
                  onClick={() => navigate("/notifications")}
                />

                <SettingItem
                  icon={<Settings size={19} />}
                  title="Preferences"
                  onClick={() => navigate("/settings")}
                />

                <SettingItem
                  icon={<ShieldCheck size={19} />}
                  title="Privacy & Security"
                  onClick={() => navigate("/privacy")}
                />
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full bg-white border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-600 hover:bg-red-50 transition shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <LogOut size={19} />
              </div>

              <div className="text-left">
                <p className="font-semibold">
                  Logout
                </p>

                <p className="text-xs text-red-400 mt-0.5">
                  Sign out from your account
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 sm:px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Edit Profile
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Update your profile information
                </p>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveProfile}
              className="p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Enter your email"
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  value={editForm.mobile}
                  onChange={handleEditChange}
                  placeholder="Enter mobile number"
                />

                <InputField
                  label="Location"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  placeholder="Bihar, India"
                />

                <InputField
                  label="Date of Birth"
                  name="dob"
                  value={editForm.dob}
                  onChange={handleEditChange}
                  placeholder="15 August 2000"
                />

                <SelectField
                  label="Gender"
                  name="gender"
                  value={editForm.gender}
                  onChange={handleEditChange}
                  options={[
                    "Male",
                    "Female",
                    "Other",
                    "Prefer not to say",
                  ]}
                />

                <SelectField
                  label="Preferred Destination"
                  name="preferredDestination"
                  value={editForm.preferredDestination}
                  onChange={handleEditChange}
                  options={[
                    "Dubai",
                    "Paris",
                    "Singapore",
                    "Bali",
                    "Maldives",
                    "Switzerland",
                    "Thailand",
                    "Kashmir",
                    "Goa",
                  ]}
                />

                <SelectField
                  label="Travel Type"
                  name="travelType"
                  value={editForm.travelType}
                  onChange={handleEditChange}
                  options={[
                    "Leisure",
                    "Business",
                    "Adventure",
                    "Family",
                    "Honeymoon",
                    "Solo",
                  ]}
                />

                <SelectField
                  label="Seat Preference"
                  name="seatPreference"
                  value={editForm.seatPreference}
                  onChange={handleEditChange}
                  options={[
                    "Window",
                    "Aisle",
                    "Middle",
                  ]}
                />

                <SelectField
                  label="Meal Preference"
                  name="mealPreference"
                  value={editForm.mealPreference}
                  onChange={handleEditChange}
                  options={[
                    "Vegetarian",
                    "Non-Vegetarian",
                    "Vegan",
                    "Jain",
                  ]}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {value}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ================= PROFILE FIELD ================= */

const ProfileField = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

/* ================= PREFERENCE CARD ================= */

const PreferenceCard = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {title}
        </p>

        <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

/* ================= ACTION ITEM ================= */

const ActionItem = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-0.5 truncate">
          {subtitle}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="text-slate-400 shrink-0"
      />
    </button>
  );
};

/* ================= SETTING ITEM ================= */

const SettingItem = ({
  icon,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
        {icon}
      </div>

      <span className="flex-1 text-sm font-semibold text-slate-800">
        {title}
      </span>

      <ChevronRight
        size={17}
        className="text-slate-400"
      />
    </button>
  );
};

/* ================= INPUT FIELD ================= */

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
};

/* ================= SELECT FIELD ================= */

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

/* ================= PHONE ICON ================= */

const PhoneIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
};

/* ================= HOTEL ICON ================= */

const HotelIcon = () => {
  return (
    <Hotel size={19} />
  );
};

export default Profile;

