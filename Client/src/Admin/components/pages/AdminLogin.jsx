
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  Plane,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../../redux/slicer/adminSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =========================================================
  // REDUX ADMIN STATE
  // =========================================================

  const {
    admin,
    token,
    loading,
    error,
    success,
    message,
  } = useSelector((state) => state.admin);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // ADMIN LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // =====================================================
      // CALL ADMIN LOGIN API THROUGH REDUX
      // =====================================================

      const result = await dispatch(
        loginAdmin({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      ).unwrap();

      // =====================================================
      // LOGIN SUCCESS
      // =====================================================

      setSuccessMessage(
        result.message || "Login successful. Redirecting..."
      );

      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/admin");
      }, 700);
    } catch (error) {
      // =====================================================
      // LOGIN ERROR
      // =====================================================

      console.error("Admin login error:", error);

      setErrorMessage(
        error || "Invalid admin email or password."
      );
    }
  };

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  const handleForgotPassword = () => {
    setErrorMessage("");

    setSuccessMessage(
      "Password reset feature will be available soon."
    );
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-50">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* =================================================
              LOGO / BRAND
          ================================================= */}

          <div className="mb-6 text-center sm:mb-8">
            <div className="mx-auto flex w-fit items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Plane size={22} strokeWidth={2.4} />
              </div>

              <div className="text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Tripora
                </h1>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Admin Portal
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Manage your travel platform from one place
            </p>
          </div>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
            {/* Header */}

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={23} />
              </div>

              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Welcome Back
              </h2>

              <p className="mt-1.5 text-sm text-slate-500">
                Sign in to access your admin dashboard
              </p>
            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {(errorMessage || error) && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{errorMessage || error}</span>
              </div>
            )}

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {(successMessage || (success && message)) && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-green-100 bg-green-50 px-3.5 py-3 text-sm text-green-700">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {successMessage || message}
                </span>
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit} noValidate>
              {/* EMAIL */}

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter admin email"
                    autoComplete="email"
                    disabled={loading}
                    className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    disabled={loading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* REMEMBER + FORGOT */}

              <div className="mb-6 flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    disabled={loading}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-xs font-medium text-slate-600 sm:text-sm">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed sm:text-sm"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                SECURITY INFO
            ================================================= */}

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5">
              <ShieldCheck
                size={15}
                className="text-green-600"
              />

              <span className="text-xs font-medium text-slate-500">
                Secure Admin Access
              </span>
            </div>
          </div>

          {/* =================================================
              DEMO CREDENTIALS
          ================================================= */}

          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5">
            <p className="text-xs font-bold text-blue-800">
              Demo Login
            </p>

            <div className="mt-1.5 space-y-0.5 text-xs text-blue-700">
              <p>
                Email:{" "}
                <span className="font-semibold">
                  admin@tripora.com
                </span>
              </p>

              <p>
                Password:{" "}
                <span className="font-semibold">
                  admin123
                </span>
              </p>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              © 2026 Tripora. Admin Panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

