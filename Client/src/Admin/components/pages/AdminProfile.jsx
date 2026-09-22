import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Clock3,
  Monitor,
  Edit3,
  Save,
  X,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  LogOut,
  KeyRound,
  Activity,
  Camera,
  AlertCircle,
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [profile, setProfile] = useState({
    name: "Vishal Kumar Rai",
    email: "admin@tripora.com",
    mobile: "+91 98765 43210",
    role: "Super Admin",
  });

  const [editForm, setEditForm] = useState(profile);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
    setMessage("");
  };

  const handleCancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!editForm.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!editForm.email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!editForm.mobile.trim()) {
      setMessage("Please enter your mobile number.");
      return;
    }

    setProfile(editForm);
    setIsEditing(false);
    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (!passwords.currentPassword) {
      setMessage("Please enter your current password.");
      return;
    }

    if (!passwords.newPassword) {
      setMessage("Please enter your new password.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setMessage("Password updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);

    // Add your real logout logic here.
    // Example:
    // localStorage.removeItem("adminToken");
    // navigate("/admin/login");

    setMessage("Logout action triggered.");
  };

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-4">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Admin Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your profile information and account security
            </p>
          </div>

          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Edit3 size={17} />
            Edit Profile
          </button>
        </div>

        {/* ================= SUCCESS / ERROR MESSAGE ================= */}
        {message && (
          <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <span>{message}</span>
          </div>
        )}

        {/* ================= PROFILE HERO ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 sm:h-36" />

          <div className="px-4 pb-5 sm:px-6">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              {/* Profile Info */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-2xl font-bold text-blue-700 shadow-md sm:h-28 sm:w-28 sm:text-3xl">
                    {getInitials(profile.name)}
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                    title="Change profile photo"
                  >
                    <Camera size={14} />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {profile.name}
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      <ShieldCheck size={13} />
                      {profile.role}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {profile.email}
                  </p>
                </div>
              </div>

              {/* Active Badge */}
              <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Account Active
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* ================= PROFILE INFORMATION ================= */}
          <div className="xl:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Profile Information
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Your personal and account details
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    <Edit3 size={15} />
                    Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-4 sm:grid-cols-2 sm:p-6">
                  <InfoItem
                    icon={<User size={17} />}
                    label="Full Name"
                    value={profile.name}
                  />

                  <InfoItem
                    icon={<Mail size={17} />}
                    label="Email Address"
                    value={profile.email}
                  />

                  <InfoItem
                    icon={<Phone size={17} />}
                    label="Mobile Number"
                    value={profile.mobile}
                  />

                  <InfoItem
                    icon={<ShieldCheck size={17} />}
                    label="Account Role"
                    value={profile.role}
                  />

                  <InfoItem
                    icon={<CheckCircle2 size={17} />}
                    label="Account Status"
                    value="Active"
                    valueClass="text-green-600"
                  />

                  <InfoItem
                    icon={<CalendarDays size={17} />}
                    label="Joined Date"
                    value="18 September 2026"
                  />
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={editForm.name}
                      onChange={handleProfileChange}
                      icon={<User size={17} />}
                      placeholder="Enter your name"
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleProfileChange}
                      icon={<Mail size={17} />}
                      placeholder="Enter email address"
                    />

                    <InputField
                      label="Mobile Number"
                      name="mobile"
                      value={editForm.mobile}
                      onChange={handleProfileChange}
                      icon={<Phone size={17} />}
                      placeholder="Enter mobile number"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Account Role
                      </label>

                      <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                        <ShieldCheck size={17} />
                        {editForm.role}
                      </div>

                      <p className="mt-1.5 text-xs text-slate-400">
                        Role can only be changed by another administrator.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <X size={17} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Save size={17} />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ================= ACCOUNT STATUS ================= */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
                <h3 className="font-bold text-slate-900">
                  Account Overview
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Recent account activity
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                <ActivityItem
                  icon={<CheckCircle2 size={17} />}
                  title="Account Status"
                  value="Active"
                  valueClass="text-green-600"
                />

                <ActivityItem
                  icon={<CalendarDays size={17} />}
                  title="Joined Date"
                  value="18 Sep 2026"
                />

                <ActivityItem
                  icon={<Clock3 size={17} />}
                  title="Last Login"
                  value="Today, 10:42 AM"
                />

                <ActivityItem
                  icon={<Monitor size={17} />}
                  title="Login Device"
                  value="Chrome • Windows"
                />

                <ActivityItem
                  icon={<Activity size={17} />}
                  title="Last Activity"
                  value="Today, 11:18 AM"
                />
              </div>
            </div>

            {/* Quick Action */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="font-bold text-slate-900">Quick Actions</h3>

              <div className="mt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex items-center gap-3">
                    <Edit3 size={17} />
                    Edit Profile
                  </span>

                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordSection(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex items-center gap-3">
                    <KeyRound size={17} />
                    Change Password
                  </span>

                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-red-100 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <span className="flex items-center gap-3">
                    <LogOut size={17} />
                    Logout
                  </span>

                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECURITY ================= */}
        <div
          id="security"
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <LockKeyhole size={18} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Security
                </h3>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:ml-11">
                Keep your admin account secure by updating your password
                regularly.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowPasswordSection(!showPasswordSection)
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <KeyRound size={16} />
              {showPasswordSection ? "Hide" : "Change Password"}
            </button>
          </div>

          {showPasswordSection && (
            <form onSubmit={handleUpdatePassword} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  show={showPasswords.current}
                  onToggle={() => togglePassword("current")}
                  placeholder="Enter current password"
                />

                <PasswordField
                  label="New Password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  show={showPasswords.new}
                  onToggle={() => togglePassword("new")}
                  placeholder="Enter new password"
                />

                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  show={showPasswords.confirm}
                  onToggle={() => togglePassword("confirm")}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <span>
                  Password should contain at least 6 characters. Use a
                  combination of letters, numbers and special characters for
                  better security.
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  <LockKeyhole size={17} />
                  Update Password
                </button>
              </div>
            </form>
          )}

          {!showPasswordSection && (
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Password protected
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Your account password is securely protected.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordSection(true)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <KeyRound size={16} />
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* ================= FOOTER INFO ================= */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row">
          <p>Tripora Admin Panel</p>

          <p className="flex items-center gap-1">
            <ShieldCheck size={13} />
            Secure Admin Account
          </p>
        </div>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <Modal
          title="Logout"
          onClose={() => setShowLogoutModal(false)}
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LogOut size={24} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Logout from Admin Panel?
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Are you sure you want to logout from your Tripora admin
              account?
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Yes, Logout
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon,
  label,
  value,
  valueClass = "text-slate-800",
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p
          className={`mt-1 break-words text-sm font-semibold ${valueClass}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   ACTIVITY ITEM
========================================================= */

const ActivityItem = ({
  icon,
  title,
  value,
  valueClass = "text-slate-700",
}) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          {icon}
        </div>

        <span className="text-sm text-slate-500">{title}</span>
      </div>

      <span
        className={`shrink-0 text-right text-xs font-semibold sm:text-sm ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input h-11 pl-10"
        />
      </div>
    </div>
  );
};

/* =========================================================
   PASSWORD FIELD
========================================================= */

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <LockKeyhole size={17} />
        </span>

        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input h-11 pl-10 pr-11"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   MODAL
========================================================= */

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 sm:p-5">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
          <h3 className="font-bold text-slate-900">{title}</h3>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminProfile;