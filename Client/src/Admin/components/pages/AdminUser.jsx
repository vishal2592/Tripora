import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  UserCheck,
  UserX,
  ShieldCheck,
  Shield,
  Users as UsersIcon,
  UserRoundCheck,
  UserPlus,
  X,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Filter,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    role: "User",
    status: "Active",
    verified: true,
    joined: "18 Sep 2026",
    location: "Delhi, India",
    bookings: 8,
    avatar: "",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@gmail.com",
    phone: "+91 91234 56789",
    role: "User",
    status: "Active",
    verified: true,
    joined: "15 Sep 2026",
    location: "Mumbai, India",
    bookings: 12,
    avatar: "",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    phone: "+91 99887 66554",
    role: "User",
    status: "Blocked",
    verified: true,
    joined: "10 Sep 2026",
    location: "Patna, India",
    bookings: 3,
    avatar: "",
  },
  {
    id: 4,
    name: "Sneha Verma",
    email: "sneha.verma@gmail.com",
    phone: "+91 98712 34567",
    role: "User",
    status: "Active",
    verified: false,
    joined: "08 Sep 2026",
    location: "Bangalore, India",
    bookings: 5,
    avatar: "",
  },
  {
    id: 5,
    name: "Vikas Gupta",
    email: "vikas.gupta@gmail.com",
    phone: "+91 90909 87654",
    role: "Admin",
    status: "Active",
    verified: true,
    joined: "01 Sep 2026",
    location: "Delhi, India",
    bookings: 0,
    avatar: "",
  },
  {
    id: 6,
    name: "Anjali Patel",
    email: "anjali.patel@gmail.com",
    phone: "+91 98123 45678",
    role: "User",
    status: "Active",
    verified: true,
    joined: "28 Aug 2026",
    location: "Ahmedabad, India",
    bookings: 7,
    avatar: "",
  },
  {
    id: 7,
    name: "Rohit Mehta",
    email: "rohit.mehta@gmail.com",
    phone: "+91 97654 32109",
    role: "User",
    status: "Blocked",
    verified: false,
    joined: "22 Aug 2026",
    location: "Jaipur, India",
    bookings: 2,
    avatar: "",
  },
  {
    id: 8,
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "+91 93456 78901",
    role: "User",
    status: "Active",
    verified: true,
    joined: "18 Aug 2026",
    location: "Kolkata, India",
    bookings: 10,
    avatar: "",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "User",
  status: "Active",
  verified: true,
  location: "",
};

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getAvatarStyle = (name) => {
  const styles = [
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
  ];

  const index =
    name?.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    styles.length;

  return styles[index];
};

function StatCard({ icon: Icon, title, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

function RoleBadge({ role }) {
  const admin = role === "Admin";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        admin
          ? "bg-violet-50 text-violet-700"
          : "bg-blue-50 text-blue-700"
      }`}
    >
      {admin ? <ShieldCheck size={13} /> : <UsersIcon size={13} />}
      {role}
    </span>
  );
}

function VerificationBadge({ verified }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
      <CheckCircle2 size={15} />
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
      <AlertCircle size={15} />
      Pending
    </span>
  );
}

function UserAvatar({ user, size = "normal" }) {
  const sizeClass =
    size === "large"
      ? "h-14 w-14 text-base"
      : size === "small"
      ? "h-9 w-9 text-xs"
      : "h-11 w-11 text-sm";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClass} ${getAvatarStyle(
        user.name
      )}`}
    >
      {getInitials(user.name)}
    </div>
  );
}

function Modal({ children, onClose, title, subtitle }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-2 backdrop-blur-[2px] sm:p-5">
      <div className="max-h-[95vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="min-w-0 pr-4">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="max-h-[calc(95vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function UserFormModal({
  mode,
  form,
  setForm,
  onClose,
  onSave,
}) {
  const isEdit = mode === "edit";

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      return;
    }

    onSave();
  };

  return (
    <Modal
      onClose={onClose}
      title={isEdit ? "Edit User" : "Add New User"}
      subtitle={
        isEdit
          ? "Update the selected user's information."
          : "Create a new user account."
      }
    >
      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter full name"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>

            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="form-input appearance-none pr-10"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status
            </label>

            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="form-input appearance-none pr-10"
              >
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Delhi, India"
              className="form-input"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) =>
                  handleChange("verified", e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Email Verified
                </p>
                <p className="text-xs text-slate-500">
                  Mark this user's email as verified.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            {isEdit ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ViewUserModal({ user, onClose, onEdit }) {
  if (!user) return null;

  return (
    <Modal
      onClose={onClose}
      title="User Details"
      subtitle="View complete information about this user."
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-5 text-center sm:flex-row sm:text-left">
          <UserAvatar user={user} size="large" />

          <div className="mt-4 min-w-0 sm:ml-4 sm:mt-0">
            <h3 className="text-lg font-bold text-slate-900">
              {user.name}
            </h3>

            <p className="mt-1 break-all text-sm text-slate-500">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status} />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-xs font-medium">Email</span>
            </div>

            <p className="mt-2 break-all text-sm font-semibold text-slate-800">
              {user.email}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Phone size={16} />
              <span className="text-xs font-medium">Phone</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {user.phone}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={16} />
              <span className="text-xs font-medium">Joined</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {user.joined}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              <span className="text-xs font-medium">Location</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {user.location || "Not provided"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Email Verification
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current verification status
              </p>
            </div>

            <VerificationBadge verified={user.verified} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Total Bookings
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Bookings made by this user
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {user.bookings}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Edit3 size={16} />
            Edit User
          </button>
        </div>
      </div>
    </Modal>
  );
}

function DeleteModal({ user, onClose, onDelete }) {
  if (!user) return null;

  return (
    <Modal
      onClose={onClose}
      title="Delete User"
      subtitle="This action cannot be undone."
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            Delete {user.name}?
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Are you sure you want to permanently delete this user? All
            associated user data will be removed.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
          >
            Delete User
          </button>
        </div>
      </div>
    </Modal>
  );
}

function UserActions({
  user,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
      >
        <MoreVertical size={17} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onView(user);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Details
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEdit(user);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Edit3 size={16} />
              Edit User
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onToggleStatus(user);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {user.status === "Active" ? (
                <>
                  <UserX size={16} />
                  Block User
                </>
              ) : (
                <>
                  <UserCheck size={16} />
                  Unblock User
                </>
              )}
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete(user);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete User
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [modalMode, setModalMode] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.location?.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      const matchesVerification =
        verificationFilter === "All" ||
        (verificationFilter === "Verified" && user.verified) ||
        (verificationFilter === "Pending" && !user.verified);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
    verificationFilter,
  ]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const verifiedUsers = users.filter(
    (user) => user.verified
  ).length;

  const newUsers = users.filter((user) =>
    [
      "18 Sep 2026",
      "15 Sep 2026",
      "10 Sep 2026",
    ].includes(user.joined)
  ).length;

  const openAddModal = () => {
    setForm(emptyForm);
    setModalMode("add");
  };

  const openEditModal = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      verified: user.verified,
      location: user.location || "",
    });

    setSelectedUser(user);
    setViewUser(null);
    setModalMode("edit");
  };

  const handleSaveUser = () => {
    if (modalMode === "add") {
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status: form.status,
        verified: form.verified,
        location: form.location.trim() || "Not provided",
        bookings: 0,
        joined: "18 Sep 2026",
        avatar: "",
      };

      setUsers((prev) => [newUser, ...prev]);
    } else if (modalMode === "edit" && selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                role: form.role,
                status: form.status,
                verified: form.verified,
                location: form.location.trim() || "Not provided",
              }
            : user
        )
      );
    }

    setModalMode(null);
    setSelectedUser(null);
    setForm(emptyForm);
  };

  const handleToggleStatus = (user) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : item
      )
    );
  };

  const handleDeleteUser = () => {
    if (!deleteUser) return;

    setUsers((prev) =>
      prev.filter((user) => user.id !== deleteUser.id)
    );

    setDeleteUser(null);
  };

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setVerificationFilter("All");
  };

  const hasFilters =
    search ||
    roleFilter !== "All" ||
    statusFilter !== "All" ||
    verificationFilter !== "All";

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-2 lg:p-4">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-2 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Users
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage registered users and their account activity.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4 lg:gap-4">
          <StatCard
            icon={UsersIcon}
            title="Total Users"
            value={totalUsers}
            description="All registered users"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={UserRoundCheck}
            title="Active Users"
            value={activeUsers}
            description="Currently active"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={ShieldCheck}
            title="Verified Users"
            value={verifiedUsers}
            description="Email verified"
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            icon={UserPlus}
            title="New Users"
            value={newUsers}
            description="Recently registered"
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* MAIN CARD */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6">
          {/* SEARCH + FILTER HEADER */}
          <div className="border-b border-slate-200 p-3 sm:p-4 lg:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, phone..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 lg:hidden"
              >
                <Filter size={17} />
                Filters
              </button>

              {/* DESKTOP FILTERS */}
              <div className="hidden items-center gap-2 lg:flex">
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="All">All Roles</option>
                    <option value="User">Users</option>
                    <option value="Admin">Admins</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={verificationFilter}
                    onChange={(e) =>
                      setVerificationFilter(e.target.value)
                    }
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="All">All Verification</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* MOBILE FILTERS */}
            {showFilters && (
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-3 lg:hidden">
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="form-input appearance-none pr-9"
                  >
                    <option value="All">All Roles</option>
                    <option value="User">Users</option>
                    <option value="Admin">Admins</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-input appearance-none pr-9"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={verificationFilter}
                    onChange={(e) =>
                      setVerificationFilter(e.target.value)
                    }
                    className="form-input appearance-none pr-9"
                  >
                    <option value="All">All Verification</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* FILTER RESULT */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500 sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {users.length}
                </span>{" "}
                users
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Role
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Joined
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Verification
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {user.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {user.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm text-slate-700">
                            {user.email}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {user.phone}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {user.joined}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <VerificationBadge verified={user.verified} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={user.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <UserActions
                            user={user}
                            onView={setViewUser}
                            onEdit={openEditModal}
                            onToggleStatus={handleToggleStatus}
                            onDelete={setDeleteUser}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE + TABLET CARDS */}
          <div className="p-3 sm:p-4 lg:hidden">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar user={user} />

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {user.name}
                          </h3>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <UserActions
                        user={user}
                        onView={setViewUser}
                        onEdit={openEditModal}
                        onToggleStatus={handleToggleStatus}
                        onDelete={setDeleteUser}
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <RoleBadge role={user.role} />
                      <StatusBadge status={user.status} />
                      <VerificationBadge verified={user.verified} />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Phone
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {user.phone}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Joined
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {user.joined}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Bookings
                        </span>

                        <span className="text-right text-xs font-bold text-blue-600">
                          {user.bookings}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setViewUser(user)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                onClear={handleClearFilters}
                hasFilters={hasFilters}
              />
            )}
          </div>

          {/* DESKTOP EMPTY */}
          {filteredUsers.length === 0 && (
            <div className="hidden lg:block">
              <EmptyState
                onClear={handleClearFilters}
                hasFilters={hasFilters}
              />
            </div>
          )}

          {/* FOOTER */}
          {filteredUsers.length > 0 && (
            <div className="border-t border-slate-200 px-4 py-3 sm:px-5">
              <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Total{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredUsers.length}
                  </span>{" "}
                  users displayed
                </p>

                <p>
                  Active:{" "}
                  <span className="font-semibold text-emerald-600">
                    {activeUsers}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewUser && (
        <ViewUserModal
          user={viewUser}
          onClose={() => setViewUser(null)}
          onEdit={() => openEditModal(viewUser)}
        />
      )}

      {/* ADD / EDIT MODAL */}
      {modalMode && (
        <UserFormModal
          mode={modalMode}
          form={form}
          setForm={setForm}
          onClose={() => {
            setModalMode(null);
            setSelectedUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}

      {/* DELETE MODAL */}
      {deleteUser && (
        <DeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}

function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <UsersIcon size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No users found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        No users match your current search or filter selection.
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}