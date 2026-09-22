import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plane,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  BadgeIndianRupee,
  Headphones,
  ChevronLeft,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /* =====================================================
     HANDLE INPUT CHANGE
  ====================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  /* =====================================================
     VALIDATION
  ====================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email or mobile number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     LOGIN
  ====================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      /*
       * Connect your login API here.
       *
       * Example:
       *
       * const response = await loginUser(formData);
       *
       * if (response?.success) {
       *   navigate("/");
       * }
       */

      console.log("Login Data:", formData);

      // Temporary login simulation
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Login error:", error);

      setIsLoading(false);

      setErrors({
        submit: "Invalid email or password. Please try again.",
      });
    }
  };

  /* =====================================================
     GOOGLE LOGIN
  ====================================================== */

  const handleGoogleLogin = () => {
    console.log("Google login clicked");

    // Add Google authentication here
  };

  return (
    <div className=" overflow-hidden bg-slate-50">


      {/* =================================================
          MAIN
      ================================================== */}

      <main className="h-[calc(100vh-64px)] overflow-hidden px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
        <div className="mx-auto grid h-full max-w-6xl overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)] lg:grid-cols-2">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <section className="relative hidden h-full min-h-0 overflow-hidden lg:block">

            {/* BACKGROUND IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
              alt="Beautiful travel destination"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/70 to-blue-900/35" />

            {/* DECORATIVE CIRCLES */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/10" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">

              {/* TOP */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  <Plane size={14} />
                  Your journey starts here
                </div>

                <h2 className="mt-7 max-w-md text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-[42px]">
                  Travel more.
                  <br />
                  <span className="text-blue-300">
                    Worry less.
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
                  Sign in to discover amazing destinations,
                  manage your bookings and get the best travel
                  deals in one place.
                </p>
              </div>

              {/* BENEFITS */}
              <div className="space-y-2.5">
                <TravelBenefit
                  icon={<BadgeIndianRupee size={18} />}
                  title="Best travel deals"
                  description="Save more on every journey"
                />

                <TravelBenefit
                  icon={<ShieldCheck size={18} />}
                  title="Secure booking"
                  description="Your travel plans are always protected"
                />

                <TravelBenefit
                  icon={<Headphones size={18} />}
                  title="24/7 support"
                  description="We're here whenever you need us"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <section className="h-full min-h-0 overflow-hidden">
            <div className="flex  items-center justify-center px-5 py-5 sm:px-8 lg:px-9 xl:px-11">

              <div className="w-full max-w-[390px]">

                {/* MOBILE BACK */}
                <Link
                  to="/"
                  className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-blue-600 lg:hidden"
                >
                  <ChevronLeft size={15} />
                  Back to home
                </Link>

                {/* MOBILE ICON */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 lg:hidden">
                  <Plane size={20} />
                </div>

                {/* HEADING */}
                <div>
                  <h2 className="text-[28px] font-bold tracking-tight text-slate-900 sm:text-[30px]">
                    Welcome back
                  </h2>

                  <p className="mt-1.5 text-sm text-slate-500">
                    Login to continue your travel journey.
                  </p>
                </div>

                {/* ERROR */}
                {errors.submit && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                    {errors.submit}
                  </div>
                )}

                {/* =================================================
                    FORM
                ================================================== */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-5 space-y-4"
                >

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Email or mobile number
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email or mobile number"
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-slate-700"
                      >
                        Password
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-[11px] font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* REMEMBER */}
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-slate-300 accent-blue-600"
                    />
                    Remember me
                  </label>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Or continue with
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* GOOGLE */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold">
                    <span className="bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                      G
                    </span>
                  </span>

                  Continue with Google
                </button>

                {/* REGISTER */}
                <p className="mt-5 text-center text-xs text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Create account
                  </Link>
                </p>

                {/* SECURITY */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck size={13} />
                  Secure & encrypted login
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   TRAVEL BENEFIT
========================================================= */

const TravelBenefit = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-blue-200">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs font-semibold text-white">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-[11px] text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Login;