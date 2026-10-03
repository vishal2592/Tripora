import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  createPackageRazorpayOrder,
  verifyPackageRazorpayPayment,
  handlePackagePaymentFailure,
  clearPackagePaymentError,
} from "../redux/slicer/packagePaymentSlice";

import {
  getSinglePackageBooking,
} from "../redux/slicer/packageBookingSlice";

const PackagePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const location = useLocation();

  /* =====================================================
     REDUX
  ====================================================== */

  const {
    order,
    loading: paymentLoading,
    orderLoading,
    verifyLoading,
    failureLoading,
    error: paymentError,
  } = useSelector(
    (state) => state.packagePayment || {}
  );

  const {
    booking: reduxBooking,
    singleLoading: bookingLoading,
  } = useSelector(
    (state) => state.packageBooking || {}
  );

  /* =====================================================
     LOCATION STATE
  ====================================================== */

  const locationState = location.state || {};

  const {
    packageData,
    travellers,
    travelDate,
    passenger,
    passengers,
    packageSubtotal,
    taxes,
    convenienceFee,
    totalAmount,
    booking: stateBooking,
  } = locationState;

  /* =====================================================
     LOAD BOOKING IF PAGE IS REFRESHED
  ====================================================== */

  useEffect(() => {
    if (!bookingId) return;

    /*
     * bookingId in this page URL must be MongoDB _id.
     *
     * Example:
     * /package-payment/6abe517ec43e1a617675bd56
     *
     * NOT:
     * /package-payment/TRP1790857598601434
     */

    if (!stateBooking && !reduxBooking) {
      dispatch(getSinglePackageBooking(bookingId));
    }
  }, [
    bookingId,
    stateBooking,
    reduxBooking,
    dispatch,
  ]);

  /* =====================================================
     CURRENT BOOKING
  ====================================================== */

  const currentBooking =
    stateBooking || reduxBooking || null;

  /* =====================================================
     PACKAGE FALLBACK
  ====================================================== */

  const fallbackPackage = {
    id: bookingId || "1",
    title: "Dubai Premium Escape",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    price: 34999,
    rating: 4.8,
    reviews: 324,
  };

  /*
   * Prefer backend booking package snapshot.
   * Then navigation state.
   * Finally fallback UI data.
   */

  const packageItem = useMemo(() => {
    if (currentBooking?.packageDetails) {
      return {
        ...fallbackPackage,
        ...packageData,

        title:
          currentBooking.packageDetails.name ||
          packageData?.title ||
          packageData?.name ||
          fallbackPackage.title,

        destination:
          currentBooking.packageDetails.destination
            ? `${currentBooking.packageDetails.destination}${
                currentBooking.packageDetails.country
                  ? `, ${currentBooking.packageDetails.country}`
                  : ""
              }`
            : packageData?.destination ||
              fallbackPackage.destination,

        duration:
          currentBooking.packageDetails.duration ||
          packageData?.duration ||
          fallbackPackage.duration,

        image:
          currentBooking.packageDetails.image ||
          packageData?.image ||
          fallbackPackage.image,
      };
    }

    return packageData || fallbackPackage;
  }, [
    currentBooking,
    packageData,
  ]);

  /* =====================================================
     TRAVELLERS
  ====================================================== */

  const safeTravellers =
    currentBooking?.travellers ||
    travellers ||
    {
      adults: 2,
      children: 0,
      infants: 0,
    };

  /* =====================================================
     PRICING
  ====================================================== */

  const safeSubtotal =
    Number(
      currentBooking?.pricing?.subtotal
    ) ||
    Number(packageSubtotal) ||
    Number(packageItem.price || 34999) *
      Number(safeTravellers.adults || 1);

  const safeTaxes =
    Number(
      currentBooking?.pricing?.taxes
    ) ||
    Number(taxes) ||
    Math.round(safeSubtotal * 0.05);

  const safeConvenienceFee =
    Number(
      currentBooking?.pricing?.convenienceFee
    ) ||
    Number(convenienceFee) ||
    299;

  const safeTotal =
    Number(
      currentBooking?.pricing?.totalAmount
    ) ||
    Number(totalAmount) ||
    safeSubtotal +
      safeTaxes +
      safeConvenienceFee;

  /* =====================================================
     DISPLAY BOOKING ID
  ====================================================== */

  const displayBookingId =
    currentBooking?.bookingId ||
    locationState.displayBookingId ||
    "Pending";

  /* =====================================================
     TRAVEL DATE
  ====================================================== */

  const safeTravelDate =
    currentBooking?.travelDate ||
    travelDate ||
    "25 September 2026";

  /* =====================================================
     PACKAGE DATA
  ====================================================== */

  const packageTitle =
    packageItem.title ||
    packageItem.name ||
    "Dubai Premium Escape";

  const packageDestination =
    packageItem.destination ||
    packageItem.location ||
    "Dubai, UAE";

  const packageDuration =
    packageItem.duration ||
    "5 Days / 4 Nights";

  const packageImage =
    packageItem.image ||
    packageItem.imageUrl ||
    packageItem.coverImage ||
    packageItem.heroImage ||
    fallbackPackage.image;

  const totalTravellers =
    Number(safeTravellers.adults || 0) +
    Number(safeTravellers.children || 0) +
    Number(safeTravellers.infants || 0);

  /* =====================================================
     PAYMENT STATE
  ====================================================== */

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  /*
   * These fields are kept because your existing UI
   * contains them.
   *
   * IMPORTANT:
   * They are NOT sent to your backend.
   * Razorpay Checkout handles sensitive payment data.
   */

  const [cardData, setCardData] =
    useState({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

  const [upiId, setUpiId] = useState("");

  const [selectedBank, setSelectedBank] =
    useState("");

  const [selectedWallet, setSelectedWallet] =
    useState("");

  const [errors, setErrors] = useState({});

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  /* =====================================================
     FORMAT PRICE
  ====================================================== */

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  /* =====================================================
     LOAD RAZORPAY SCRIPT
  ====================================================== */

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  /* =====================================================
     CARD INPUT
  ====================================================== */

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);

      if (formattedValue.length >= 3) {
        formattedValue =
          formattedValue.slice(0, 2) +
          "/" +
          formattedValue.slice(2);
      }
    }

    if (name === "cvv") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 3);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =====================================================
     VALIDATION
  ====================================================== */

  const validatePayment = () => {
    const newErrors = {};

    /*
     * Razorpay Checkout handles:
     * card number
     * CVV
     * expiry
     * UPI
     */

    if (!paymentMethod) {
      newErrors.paymentMethod =
        "Please select a payment method";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     RAZORPAY PAYMENT
  ====================================================== */

  const handlePayment = async () => {
    if (
      isProcessing ||
      showSuccess ||
      orderLoading ||
      verifyLoading ||
      failureLoading
    ) {
      return;
    }

    setErrors({});

    dispatch(clearPackagePaymentError());

    const isValid = validatePayment();

    if (!isValid) {
      return;
    }

    /*
     * IMPORTANT:
     * bookingId must be MongoDB _id.
     */

    if (!bookingId) {
      setErrors({
        submit:
          "Booking ID is missing. Please go back and create the booking again.",
      });

      return;
    }

    try {
      setIsProcessing(true);

      /* =================================================
         STEP 1
         CREATE RAZORPAY ORDER
      ================================================== */

      const orderResponse = await dispatch(
        createPackageRazorpayOrder(bookingId)
      ).unwrap();

      console.log(
        "Package Razorpay Order Response:",
        orderResponse
      );

      const razorpayOrder =
        orderResponse?.order;

      if (!razorpayOrder?.id) {
        throw new Error(
          "Razorpay order was not created."
        );
      }

      /* =================================================
         STEP 2
         LOAD RAZORPAY CHECKOUT
      ================================================== */

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay Checkout could not be loaded. Please check your internet connection."
        );
      }

      /* =================================================
         STEP 3
         GET RAZORPAY PUBLIC KEY
      ================================================== */

    const razorpayKey = orderResponse?.razorpayKey;

if (!razorpayKey) {
  throw new Error(
    "Razorpay Key ID was not received from the server."
  );
}

      /*
       * Optional debugging.
       *
       * Only public Key ID is logged.
       * Never log the secret.
       */

      console.log(
        "Razorpay Key Loaded:",
        razorpayKey
      );

      /* =================================================
         CONTACT DETAILS
      ================================================== */

      const primaryPassenger =
        passenger ||
        currentBooking?.passengers?.[0] ||
        passengers?.[0] ||
        null;

      const customerName =
        primaryPassenger?.fullName ||
        primaryPassenger?.name ||
        "";

      const customerEmail =
        primaryPassenger?.email ||
        "";

      const customerContact =
        primaryPassenger?.mobileNumber ||
        `${primaryPassenger?.countryCode || ""}${
          primaryPassenger?.mobile || ""
        }`.replace(/\s/g, "");

      /* =================================================
         STEP 4
         RAZORPAY OPTIONS
      ================================================== */

      const options = {
        key: razorpayKey,

        amount: razorpayOrder.amount,

        currency:
          razorpayOrder.currency || "INR",

        name: "Tripora",

        description:
          `${packageTitle} - Package Booking`,

        order_id: razorpayOrder.id,

        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerContact,
        },

        notes: {
          bookingId: displayBookingId,
          packageName: packageTitle,
        },

        theme: {
          color: "#2563eb",
        },

        /* =================================================
           STEP 5
           PAYMENT SUCCESS
        ================================================== */

        handler: async function (
          razorpayResponse
        ) {
          try {
            console.log(
              "Razorpay Success Response:",
              razorpayResponse
            );

            /* =============================================
               STEP 6
               VERIFY PAYMENT ON BACKEND
            ============================================== */

            const verificationResponse =
              await dispatch(
                verifyPackageRazorpayPayment({
                  bookingId,

                  razorpay_order_id:
                    razorpayResponse.razorpay_order_id,

                  razorpay_payment_id:
                    razorpayResponse.razorpay_payment_id,

                  razorpay_signature:
                    razorpayResponse.razorpay_signature,
                })
              ).unwrap();

            console.log(
              "Payment Verification Response:",
              verificationResponse
            );

            setIsProcessing(false);

            setShowSuccess(true);

            const verifiedBooking =
              verificationResponse?.booking;

            const verifiedPayment =
              verificationResponse?.payment;

            /*
             * Navigate to confirmation page.
             *
             * URL uses MongoDB _id.
             * UI displays TRP bookingId.
             */

            setTimeout(() => {
              navigate(
                `/package-booking-success/${bookingId}`,
                {
                  state: {
                    bookingId,

                    displayBookingId:
                      verifiedBooking?.bookingId ||
                      displayBookingId,

                    packageData: packageItem,

                    travellers:
                      verifiedBooking?.travellers ||
                      safeTravellers,

                    travelDate:
                      verifiedBooking?.travelDate ||
                      safeTravelDate,

                    passenger:
                      verifiedBooking?.passengers?.[0] ||
                      primaryPassenger ||
                      passenger,

                    passengers:
                      verifiedBooking?.passengers ||
                      passengers ||
                      [],

                    packageSubtotal:
                      verifiedBooking?.pricing?.subtotal ||
                      safeSubtotal,

                    taxes:
                      verifiedBooking?.pricing?.taxes ||
                      safeTaxes,

                    convenienceFee:
                      verifiedBooking?.pricing?.convenienceFee ||
                      safeConvenienceFee,

                    totalAmount:
                      verifiedBooking?.pricing
                        ?.totalAmount ||
                      safeTotal,

                    paymentMethod:
                      "Razorpay",

                    status: "success",

                    booking:
                      verifiedBooking,

                    payment:
                      verifiedPayment,

                    razorpayPaymentId:
                      razorpayResponse.razorpay_payment_id,
                  },
                }
              );
            }, 900);
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setIsProcessing(false);

            /*
             * IMPORTANT:
             * Do NOT store the Error object directly.
             *
             * React cannot render:
             * Error {}
             *
             * Use error.message instead.
             */

            setErrors({
              submit:
                error?.message ||
                "Payment verification failed. Please contact support if money was deducted.",
            });
          }
        },

        /* =================================================
           RAZORPAY MODAL DISMISS
        ================================================== */

        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      /* =================================================
         STEP 7
         CREATE RAZORPAY INSTANCE
      ================================================== */

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout is not available."
        );
      }

      const razorpay =
        new window.Razorpay(options);

      /* =================================================
         PAYMENT FAILED EVENT
      ================================================== */

      razorpay.on(
        "payment.failed",
        async (response) => {
          console.error(
            "Razorpay Payment Failed:",
            response
          );

          try {
            await dispatch(
              handlePackagePaymentFailure({
                bookingId,

                razorpay_order_id:
                  razorpayOrder.id,

                razorpay_payment_id:
                  response?.error?.metadata
                    ?.payment_id || "",

                reason:
                  response?.error?.description ||
                  "Razorpay payment failed",
              })
            ).unwrap();
          } catch (error) {
            console.error(
              "Failed to update payment failure:",
              error?.message || error
            );
          }

          setIsProcessing(false);

          setErrors({
            submit:
              response?.error?.description ||
              response?.error?.reason ||
              "Payment failed. Please try again.",
          });
        }
      );

      /* =================================================
         STEP 8
         OPEN RAZORPAY CHECKOUT
      ================================================== */

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay payment error:",
        error
      );

      setIsProcessing(false);

      /*
       * IMPORTANT FIX:
       *
       * Previously:
       *
       * submit: error
       *
       * That stores an Error object.
       *
       * React then throws:
       * Objects are not valid as a React child
       *
       * Now we store only the message.
       */

      setErrors({
        submit:
          error?.message ||
          paymentError?.message ||
          paymentError ||
          "Unable to start payment. Please try again.",
      });
    }
  };

  /* =====================================================
     PAYMENT METHOD BUTTON
  ====================================================== */

  const PaymentMethod = ({
    id,
    icon,
    title,
    description,
  }) => {
    const active = paymentMethod === id;

    return (
      <button
        type="button"
        onClick={() => {
          setPaymentMethod(id);

          setErrors((prev) => ({
            ...prev,
            submit: "",
            paymentMethod: "",
          }));
        }}
        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
          active
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`text-xs font-extrabold ${
              active
                ? "text-blue-700"
                : "text-slate-800"
            }`}
          >
            {title}
          </p>

          <p className="mt-0.5 truncate text-[9px] font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            active
              ? "border-blue-600"
              : "border-slate-300"
          }`}
        >
          {active && (
            <div className="h-2 w-2 rounded-full bg-blue-600" />
          )}
        </div>
      </button>
    );
  };

  /* =====================================================
     INPUT ERROR
  ====================================================== */

  const InputError = ({ message }) => {
    if (!message) return null;

    const safeMessage =
      message?.message ||
      String(message);

    return (
      <p className="mt-1 text-[9px] font-semibold text-red-500">
        {safeMessage}
      </p>
    );
  };

  /* =====================================================
     LOADING BOOKING
  ====================================================== */

  if (
    bookingLoading &&
    !currentBooking
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm font-bold text-slate-700">
            Loading booking...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     SAFE PAYMENT ERROR
  ====================================================== */

  const safePaymentError =
    paymentError?.message ||
    (paymentError
      ? String(paymentError)
      : "");

  const safeSubmitError =
    errors.submit?.message ||
    (errors.submit
      ? String(errors.submit)
      : "");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HEADER
      ================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />

            <span className="hidden sm:inline">
              Back
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <CreditCard size={17} />
            </div>

            <div>
              <p className="text-sm font-extrabold leading-none text-slate-900">
                Tripora
              </p>

              <p className="mt-1 text-[9px] font-semibold text-slate-400">
                Secure Payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 sm:text-xs">
            <LockKeyhole size={14} />
            Secure
          </div>
        </div>
      </header>

      {/* =================================================
          PROGRESS
      ================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">

          <div className="mx-auto flex max-w-2xl items-center justify-center">

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                <Check size={13} />
              </div>

              <span className="hidden text-[10px] font-bold text-green-600 sm:inline sm:text-xs">
                Traveller Details
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-green-200 sm:mx-4 sm:w-16" />

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white">
                2
              </div>

              <span className="text-[10px] font-bold text-blue-600 sm:text-xs">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-slate-200 sm:mx-4 sm:w-16" />

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[10px] font-extrabold text-slate-400">
                3
              </div>

              <span className="hidden text-[10px] font-bold text-slate-400 sm:inline sm:text-xs">
                Confirmation
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================== */}

      <main className="mx-auto w-full max-w-7xl px-4 py-5 pb-28 sm:px-6 sm:py-4 lg:px-8 lg:pb-10">

        {/* Breadcrumb */}

        <div className="mb-5 flex items-center gap-1.5 overflow-hidden text-[10px] font-semibold text-slate-400 sm:text-xs">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0 hover:text-blue-600"
          >
            Home
          </button>

          <span>/</span>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="shrink-0 hover:text-blue-600"
          >
            Packages
          </button>

          <span>/</span>

          <span className="shrink-0 text-slate-500">
            Booking
          </span>

          <span>/</span>

          <span className="truncate text-slate-700">
            Payment
          </span>
        </div>

        {/* Heading */}

        <div className="mb-6">

          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
            Secure checkout
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Complete Your Payment
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Choose your preferred payment method and
            complete your booking securely.
          </p>

        </div>

        {/* =================================================
            ERROR
        ================================================== */}

        {(safeSubmitError ||
          safePaymentError) && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-xs font-semibold text-red-600">
              {safeSubmitError ||
                safePaymentError}
            </p>
          </div>
        )}

        {/* =================================================
            GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              LEFT
          ================================================== */}

          <div className="space-y-5">

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-5">

                <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Payment Method
                </h2>

                <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                  Select a payment option to continue
                </p>

              </div>

              {/* Payment Methods */}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                <PaymentMethod
                  id="card"
                  icon={<CreditCard size={17} />}
                  title="Credit / Debit Card"
                  description="Visa, Mastercard, RuPay"
                />

                <PaymentMethod
                  id="upi"
                  icon={<Smartphone size={17} />}
                  title="UPI"
                  description="Google Pay, PhonePe, Paytm"
                />

                <PaymentMethod
                  id="netbanking"
                  icon={<WalletCards size={17} />}
                  title="Net Banking"
                  description="All major Indian banks"
                />

                <PaymentMethod
                  id="wallet"
                  icon={<WalletCards size={17} />}
                  title="Wallet"
                  description="Paytm, Amazon Pay & more"
                />

              </div>

              {/* =================================================
                  CARD
              ================================================== */}

              {paymentMethod === "card" && (
                <div className="mt-5 border-t border-slate-100 pt-5">

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900">
                        Card Details
                      </h3>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        Card details will be securely collected by Razorpay
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                      <LockKeyhole size={11} />
                      Secure
                    </div>

                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
                        <CreditCard size={17} />
                      </div>

                      <div>

                        <p className="text-xs font-extrabold text-blue-800">
                          Secure Razorpay Checkout
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-blue-600">
                          Your card number, expiry date and CVV will be entered securely in Razorpay's payment window.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  UPI
              ================================================== */}

              {paymentMethod === "upi" && (
                <div className="mt-5 border-t border-slate-100 pt-5">

                  <h3 className="text-xs font-extrabold text-slate-900">
                    Pay with UPI
                  </h3>

                  <p className="mt-1 text-[9px] text-slate-400">
                    UPI payment will be completed securely through Razorpay
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">

                    {[
                      "Google Pay",
                      "PhonePe",
                      "Paytm",
                    ].map((app) => (
                      <div
                        key={app}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-3 text-center"
                      >
                        <p className="text-[9px] font-bold text-slate-600">
                          {app}
                        </p>
                      </div>
                    ))}

                  </div>

                </div>
              )}

              {/* =================================================
                  NET BANKING
              ================================================== */}

              {paymentMethod === "netbanking" && (
                <div className="mt-5 border-t border-slate-100 pt-5">

                  <h3 className="text-xs font-extrabold text-slate-900">
                    Net Banking
                  </h3>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Select your bank
                  </p>

                  <div className="relative mt-4">

                    <select
                      value={selectedBank}
                      onChange={(e) => {
                        setSelectedBank(
                          e.target.value
                        );

                        setErrors((prev) => ({
                          ...prev,
                          bank: "",
                        }));
                      }}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select your bank
                      </option>

                      <option value="SBI">
                        State Bank of India
                      </option>

                      <option value="HDFC">
                        HDFC Bank
                      </option>

                      <option value="ICICI">
                        ICICI Bank
                      </option>

                      <option value="Axis">
                        Axis Bank
                      </option>

                      <option value="Kotak">
                        Kotak Mahindra Bank
                      </option>

                      <option value="PNB">
                        Punjab National Bank
                      </option>

                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>

                  <div className="mt-4 rounded-xl bg-blue-50 p-3">

                    <div className="flex gap-2">

                      <ShieldCheck
                        size={15}
                        className="shrink-0 text-blue-600"
                      />

                      <p className="text-[9px] leading-4 text-blue-700">
                        Razorpay will securely show the available banks and payment options.
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  WALLET
              ================================================== */}

              {paymentMethod === "wallet" && (
                <div className="mt-5 border-t border-slate-100 pt-5">

                  <h3 className="text-xs font-extrabold text-slate-900">
                    Select Wallet
                  </h3>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Wallet options will be available in Razorpay Checkout
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">

                    {[
                      "Paytm",
                      "Amazon Pay",
                      "Mobikwik",
                    ].map((wallet) => {

                      const active =
                        selectedWallet === wallet;

                      return (
                        <button
                          type="button"
                          key={wallet}
                          onClick={() => {
                            setSelectedWallet(
                              wallet
                            );

                            setErrors((prev) => ({
                              ...prev,
                              wallet: "",
                            }));
                          }}
                          className={`rounded-xl border p-3 text-left transition ${
                            active
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 bg-white hover:border-blue-200"
                          }`}
                        >

                          <div className="flex items-center justify-between">

                            <span className="text-xs font-extrabold text-slate-800">
                              {wallet}
                            </span>

                            {active && (
                              <Check
                                size={14}
                                className="text-blue-600"
                              />
                            )}

                          </div>

                          <p className="mt-1 text-[9px] text-slate-400">
                            Available through Razorpay
                          </p>

                        </button>
                      );
                    })}

                  </div>

                  <InputError
                    message={errors.wallet}
                  />

                </div>
              )}

              {/* Security */}

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-600">
                  <ShieldCheck size={16} />
                </div>

                <div>

                  <p className="text-[10px] font-extrabold text-green-700">
                    Your payment is secure
                  </p>

                  <p className="mt-0.5 text-[9px] leading-4 text-green-600">
                    Tripora uses Razorpay's secure checkout and server-side payment verification.
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                CONTACT
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                Booking Contact
              </h2>

              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                Your booking confirmation will be sent
                to these details.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600">
                    <Mail size={15} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-semibold text-slate-400">
                      Email
                    </p>

                    <p className="truncate text-[10px] font-bold text-slate-700">
                      {passenger?.email ||
                        currentBooking?.passengers?.[0]?.email ||
                        "traveller@example.com"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600">
                    <Smartphone size={15} />
                  </div>

                  <div>

                    <p className="text-[9px] font-semibold text-slate-400">
                      Mobile
                    </p>

                    <p className="text-[10px] font-bold text-slate-700">

                      {passenger?.countryCode ||
                        ""}

                      {passenger?.mobile ||
                        passenger?.mobileNumber ||
                        currentBooking?.passengers?.[0]?.mobileNumber ||
                        "9876543210"}

                    </p>

                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================== */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Image */}

              <div className="relative h-44 overflow-hidden">

                <img
                  src={packageImage}
                  alt={packageTitle}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">

                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/80">
                    Holiday Package
                  </p>

                  <h2 className="mt-1 text-base font-extrabold text-white">
                    {packageTitle}
                  </h2>

                </div>

              </div>

              <div className="p-4 sm:p-5">

                {/* Package Info */}

                <div className="space-y-3 border-b border-slate-100 pb-4">

                  <div className="flex items-start gap-2">

                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>

                      <p className="text-[9px] font-semibold text-slate-400">
                        Destination
                      </p>

                      <p className="text-[10px] font-bold text-slate-700">
                        {packageDestination}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-2">

                    <div className="mt-0.5 text-blue-600">

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                        />

                        <path d="M12 7v5l3 2" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-[9px] font-semibold text-slate-400">
                        Duration
                      </p>

                      <p className="text-[10px] font-bold text-slate-700">
                        {packageDuration}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-2">

                    <div className="mt-0.5 text-blue-600">

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                        />

                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-[9px] font-semibold text-slate-400">
                        Travel Date
                      </p>

                      <p className="text-[10px] font-bold text-slate-700">
                        {safeTravelDate}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-2">

                    <div className="mt-0.5 text-blue-600">

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />

                        <circle
                          cx="9"
                          cy="7"
                          r="4"
                        />

                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-[9px] font-semibold text-slate-400">
                        Travellers
                      </p>

                      <p className="text-[10px] font-bold text-slate-700">
                        {totalTravellers}{" "}
                        {totalTravellers === 1
                          ? "Traveller"
                          : "Travellers"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Fare */}

                <div className="mt-4">

                  <h3 className="text-xs font-extrabold text-slate-900">
                    Fare Summary
                  </h3>

                  <div className="mt-3 space-y-2.5">

                    <div className="flex items-center justify-between">

                      <span className="text-[10px] text-slate-500">
                        Package Fare
                      </span>

                      <span className="text-[10px] font-bold text-slate-700">
                        ₹{formatPrice(safeSubtotal)}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-[10px] text-slate-500">
                        Taxes & Fees
                      </span>

                      <span className="text-[10px] font-bold text-slate-700">
                        ₹{formatPrice(safeTaxes)}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-[10px] text-slate-500">
                        Convenience Fee
                      </span>

                      <span className="text-[10px] font-bold text-slate-700">
                        ₹{formatPrice(
                          safeConvenienceFee
                        )}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Total */}

                <div className="mt-4 rounded-xl bg-blue-50 p-3">

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold text-slate-600">
                      Total Amount
                    </span>

                    <span className="text-xl font-extrabold text-blue-700">
                      ₹{formatPrice(safeTotal)}
                    </span>

                  </div>

                </div>

                {/* Desktop Pay */}

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={
                    isProcessing ||
                    showSuccess ||
                    paymentLoading ||
                    bookingLoading
                  }
                  className={`mt-4 hidden h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-extrabold text-white shadow-sm transition sm:flex ${
                    showSuccess
                      ? "bg-green-600"
                      : isProcessing ||
                        paymentLoading
                      ? "cursor-not-allowed bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  }`}
                >

                  {showSuccess ? (
                    <>
                      <Check size={16} />
                      Payment Successful
                    </>
                  ) : isProcessing ||
                    paymentLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹{formatPrice(safeTotal)}
                      <ArrowRight size={15} />
                    </>
                  )}

                </button>

                <p className="mt-3 text-center text-[9px] leading-4 text-slate-400">
                  By continuing, you agree to Tripora's
                  terms and cancellation policy.
                </p>

              </div>

            </section>

          </aside>

        </div>

      </main>

      {/* =====================================================
          MOBILE PAYMENT BAR
      ====================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] sm:hidden">

        <div className="flex items-center gap-3">

          <div className="min-w-0 flex-1">

            <p className="text-[9px] font-semibold text-slate-400">
              Total Amount
            </p>

            <p className="mt-0.5 text-lg font-extrabold leading-tight text-slate-900">
              ₹{formatPrice(safeTotal)}
            </p>

          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={
              isProcessing ||
              showSuccess ||
              paymentLoading
            }
            className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-xs font-extrabold text-white shadow-sm transition ${
              showSuccess
                ? "bg-green-600"
                : isProcessing ||
                  paymentLoading
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 active:bg-blue-800"
            }`}
          >

            {showSuccess ? (
              <>
                <Check size={15} />
                Successful
              </>
            ) : isProcessing ||
              paymentLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Processing
              </>
            ) : (
              <>
                Pay Now
                <ArrowRight size={15} />
              </>
            )}

          </button>

        </div>

      </div>

      {/* =====================================================
          PROCESSING OVERLAY
      ====================================================== */}

      {isProcessing && !showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

              <span className="h-7 w-7 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Processing Payment
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Razorpay Checkout is opening. Please don't close or refresh this page.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">

              <div className="flex items-center justify-between">

                <span className="text-[9px] font-semibold text-slate-400">
                  Amount
                </span>

                <span className="text-xs font-extrabold text-slate-800">
                  ₹{formatPrice(safeTotal)}
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          SUCCESS OVERLAY
      ====================================================== */}

      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                <Check size={23} />
              </div>

            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Payment Successful
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your package booking has been confirmed.
            </p>

            <div className="mt-4 rounded-xl bg-green-50 p-3">

              <p className="text-[9px] font-semibold text-green-600">
                Booking ID
              </p>

              <p className="mt-1 text-sm font-extrabold tracking-wide text-green-700">
                {displayBookingId}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default PackagePayment;