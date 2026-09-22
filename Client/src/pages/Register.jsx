import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeIndianRupee,
  Check,
  Eye,
  EyeOff,
  Headphones,
  LockKeyhole,
  Mail,
  Plane,
  ShieldCheck,
  User,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email or mobile number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    setIsLoading(true);

    // Temporary registration
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 800);
  };

  // =========================
  // GOOGLE
  // =========================
  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 pt-6">
     
      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="flex h-[calc(100vh-60px)] items-center justify-center overflow-hidden px-3 py-3 sm:px-5 lg:px-6">
        {/* =================================================
            MAIN CARD
        ================================================== */}
        <div
          className="
            grid
            h-full
            max-h-[620px]
            w-full
            max-w-[1050px]
            overflow-hidden
            rounded-[24px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]
            lg:h-[620px]
            lg:grid-cols-[46%_54%]
          "
        >
          {/* =================================================
              LEFT IMAGE SECTION
          ================================================== */}
          <section className="relative hidden overflow-hidden lg:block">
            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
              alt="Beautiful travel destination"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/35 to-slate-950/90" />

            {/* CONTENT */}
            <div className="relative flex h-full flex-col justify-between p-8 xl:p-9">
              {/* TOP CONTENT */}
              <div>
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                  <Plane size={12} />
                  Start your journey
                </div>

                {/* HEADING */}
                <h2 className="mt-6 max-w-[340px] text-[36px] font-bold leading-[1.08] tracking-[-0.035em] text-white">
                  Travel more.
                  <br />
                  <span className="text-blue-200">
                    Worry less.
                  </span>
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-4 max-w-[330px] text-[12px] leading-5 text-white/70">
                  Create your account and discover a simpler
                  way to plan, compare and book your next
                  journey.
                </p>
              </div>

              {/* BENEFITS */}
              <div className="space-y-4">
                {/* BENEFIT 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                    <BadgeIndianRupee
                      size={17}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Best travel deals
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/60">
                      Great prices on flights, hotels & more
                    </p>
                  </div>
                </div>

                {/* BENEFIT 2 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                    <ShieldCheck
                      size={17}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Secure booking
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/60">
                      Your information stays protected
                    </p>
                  </div>
                </div>

                {/* BENEFIT 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                    <Headphones
                      size={17}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      24/7 support
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/60">
                      We're here whenever you need us
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px bg-white/15" />

                <p className="text-[10px] leading-4 text-white/45">
                  Join thousands of travellers booking their
                  trips with TravelMate.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT FORM SECTION
          ================================================== */}
          <section
            className="
              flex
              h-full
              items-center
              justify-center
              overflow-hidden
              bg-white
              px-5
              sm:px-8
              lg:px-10
              xl:px-14
            "
          >
            <div className="w-full max-w-[390px]">
              {/* =================================================
                  HEADING
              ================================================== */}
              <div className="mb-4">
                {/* MOBILE ICON */}
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 lg:hidden">
                  <Plane size={17} />
                </div>

                <h2 className="text-[25px] font-bold tracking-[-0.025em] text-slate-900">
                  Create your account
                </h2>

                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  Join TravelMate and start planning your next
                  adventure.
                </p>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="space-y-2.5"
              >
                {/* ================= FULL NAME ================= */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={`
                        h-[44px]
                        w-full
                        rounded-xl
                        border
                        bg-white
                        pl-10
                        pr-3
                        text-[13px]
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                        transition
                        ${
                          errors.name
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }
                      `}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-0.5 text-[9px] font-medium text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* ================= EMAIL ================= */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                    Email or mobile number
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`
                        h-[44px]
                        w-full
                        rounded-xl
                        border
                        bg-white
                        pl-10
                        pr-3
                        text-[13px]
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                        transition
                        ${
                          errors.email
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }
                      `}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-0.5 text-[9px] font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* ================= PASSWORD ================= */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className={`
                        h-[44px]
                        w-full
                        rounded-xl
                        border
                        bg-white
                        pl-10
                        pr-11
                        text-[13px]
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                        transition
                        ${
                          errors.password
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }
                      `}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-0.5 text-[9px] font-medium text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* ================= CONFIRM PASSWORD ================= */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className={`
                        h-[44px]
                        w-full
                        rounded-xl
                        border
                        bg-white
                        pl-10
                        pr-11
                        text-[13px]
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                        transition
                        ${
                          errors.confirmPassword
                            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }
                      `}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>

                  {/* PASSWORD MATCH */}
                  {formData.confirmPassword &&
                    formData.password ===
                      formData.confirmPassword && (
                      <div className="mt-0.5 flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                        <Check size={11} />
                        Passwords match
                      </div>
                    )}

                  {errors.confirmPassword && (
                    <p className="mt-0.5 text-[9px] font-medium text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* ================= TERMS ================= */}
                <div className="pt-0.5">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);

                        if (e.target.checked) {
                          setErrors((prev) => ({
                            ...prev,
                            terms: "",
                          }));
                        }
                      }}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-blue-600"
                    />

                    <span className="text-[10px] leading-[15px] text-slate-500">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-0.5 text-[9px] font-medium text-red-500">
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* ================= CREATE ACCOUNT ================= */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    group
                    flex
                    h-[44px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_-10px_rgba(37,99,235,0.8)]
                    transition-all
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isLoading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* =================================================
                  DIVIDER
              ================================================== */}
              <div className="my-3.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                  Or continue with
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* =================================================
                  GOOGLE BUTTON
              ================================================== */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="
                  flex
                  h-[40px]
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-[12px]
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                {/* GOOGLE ICON */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[14px] font-bold text-blue-600">
                  G
                </span>

                Continue with Google
              </button>

              {/* =================================================
                  LOGIN LINK
              ================================================== */}
              <p className="mt-3 text-center text-[10px] text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {/* =================================================
                  SECURITY
              ================================================== */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-slate-400">
                <ShieldCheck size={11} />
                Your information is securely protected
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;