import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Hotel,
  LockKeyhole,
  MapPin,
  Phone,
  QrCode,
  ShieldCheck,
  Smartphone,
  Star,
  User,
  WalletCards,
} from "lucide-react";

const fallbackHotel = {
  name: "Marina View Hotel",
  location: "Dubai Marina, Dubai",
  rating: 4.6,
  reviews: 1248,
  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
};

const fallbackRoom = {
  name: "Deluxe Room",
  price: 7499,
  bed: "1 King Bed",
  guests: "2 Guests",
  meal: "Breakfast Included",
  cancellation: "Free Cancellation",
};

const fallbackBooking = {
  checkIn: "20 Sep 2026",
  checkOut: "23 Sep 2026",
  nights: 3,
  guests: 2,
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const formatDate = (value) => {
  const date = parseDate(value);

  if (!date) {
    return value || "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const calculateNights = (checkIn, checkOut) => {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!start || !end || end <= start) {
    return 1;
  }

  const difference = end.getTime() - start.getTime();

  return Math.max(
    1,
    Math.ceil(difference / (1000 * 60 * 60 * 24))
  );
};

const HotelPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingState = location.state || {};

  const hotel = bookingState.hotel || fallbackHotel;

  const selectedRoom =
    bookingState.selectedRoom ||
    bookingState.room ||
    fallbackRoom;

  const checkIn =
    bookingState.checkIn ||
    fallbackBooking.checkIn;

  const checkOut =
    bookingState.checkOut ||
    fallbackBooking.checkOut;

  const guests =
    bookingState.guests ||
    fallbackBooking.guests;

  const nights =
    bookingState.nights ||
    calculateNights(checkIn, checkOut);

  const roomPrice = Number(
    selectedRoom.price ||
      selectedRoom.startingPrice ||
      fallbackRoom.price
  );

  const totalRoomPrice =
    bookingState.totalRoomPrice ||
    roomPrice * nights;

  const taxes = Number(
    bookingState.taxes ||
      bookingState.tax ||
      1250
  );

  const totalPrice =
    bookingState.totalPrice ||
    totalRoomPrice + taxes;

  const guestDetails = bookingState.guestDetails || {};

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [upiId, setUpiId] = useState("");

  const [cardData, setCardData] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const [bank, setBank] = useState("");

  const [wallet, setWallet] = useState("");

  const [agreeTerms, setAgreeTerms] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const guestCountText = useMemo(() => {
    if (typeof guests === "number") {
      return `${guests} ${
        guests === 1 ? "Guest" : "Guests"
      }`;
    }

    if (typeof guests === "string") {
      return guests;
    }

    if (guests?.adults || guests?.children) {
      const adults = Number(guests.adults || 0);
      const children = Number(
        guests.children || 0
      );

      const total = adults + children;

      return `${total} ${
        total === 1 ? "Guest" : "Guests"
      }`;
    }

    return "2 Guests";
  }, [guests]);

  const handleCardChange = (event) => {
    const { name, value } = event.target;

    setCardData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        newErrors.upiId =
          "Please enter your UPI ID";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(upiId)
      ) {
        newErrors.upiId =
          "Please enter a valid UPI ID";
      }
    }

    if (paymentMethod === "card") {
      const cleanCardNumber =
        cardData.number.replace(/\s/g, "");

      if (!cleanCardNumber) {
        newErrors.number =
          "Card number is required";
      } else if (
        !/^\d{16}$/.test(cleanCardNumber)
      ) {
        newErrors.number =
          "Enter a valid 16-digit card number";
      }

      if (!cardData.holder.trim()) {
        newErrors.holder =
          "Card holder name is required";
      }

      if (!cardData.expiry.trim()) {
        newErrors.expiry =
          "Expiry date is required";
      }

      if (!cardData.cvv.trim()) {
        newErrors.cvv =
          "CVV is required";
      } else if (
        !/^\d{3,4}$/.test(cardData.cvv)
      ) {
        newErrors.cvv =
          "Enter a valid CVV";
      }
    }

    if (paymentMethod === "netbanking") {
      if (!bank) {
        newErrors.bank =
          "Please select your bank";
      }
    }

    if (paymentMethod === "wallet") {
      if (!wallet) {
        newErrors.wallet =
          "Please select a wallet";
      }
    }

    if (!agreeTerms) {
      newErrors.terms =
        "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (event) => {
    event.preventDefault();

    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    /*
      This is only a frontend demo payment flow.

      Later you can replace this with your
      actual Razorpay / payment gateway API call.
    */

    setTimeout(() => {
      const bookingId =
        `TRP${Date.now().toString().slice(-8)}`;

      setIsProcessing(false);

      navigate(`/booking-success/${bookingId}`, {
        state: {
          bookingId,
          hotel,
          selectedRoom,
          checkIn,
          checkOut,
          guests,
          nights,
          taxes,
          totalRoomPrice,
          totalPrice,
          guestDetails,
          paymentMethod,
        },
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              <span>Back to Booking</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <Hotel size={18} />
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                Tripora
              </span>
            </div>

            <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
              <LockKeyhole
                size={16}
                className="text-emerald-600"
              />
              Secure Payment
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Hotel & Room
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-emerald-500 sm:mx-4" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check
                  size={16}
                  strokeWidth={2.5}
                />
              </div>

              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Guest Details
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-blue-600 sm:mx-4" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
                3
              </div>

              <span className="hidden text-sm font-semibold text-blue-600 sm:block">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px flex-1 bg-slate-200 sm:mx-4" />

            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400">
                4
              </div>

              <span className="hidden text-sm font-medium text-slate-400 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page Heading */}
        <div className="mb-6">
          <p className="mb-1 text-sm font-semibold text-blue-600">
            SECURE CHECKOUT
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Complete your payment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Choose your preferred payment method to
            confirm your hotel booking.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* =================================================
              LEFT PAYMENT SECTION
          ================================================== */}
          <div>
            <form
              onSubmit={handlePayment}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              {/* Section Header */}
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-500">
                    Select how you would like to pay.
                  </p>
                </div>
              </div>

              {/* =================================================
                  PAYMENT METHOD BUTTONS
              ================================================== */}
              <div className="grid gap-3">
                {/* UPI */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("upi");
                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "upi"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Smartphone size={19} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">
                          UPI
                        </p>

                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Recommended
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Google Pay, PhonePe and other UPI apps
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === "upi"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "upi" && (
                      <Check
                        size={13}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("card");
                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "card"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <CreditCard size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Credit / Debit Card
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Visa, Mastercard and RuPay
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <Check
                        size={13}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>

                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("netbanking");
                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "netbanking"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "netbanking"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <WalletCards size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Net Banking
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay directly from your bank account
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === "netbanking"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "netbanking" && (
                      <Check
                        size={13}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>

                {/* Wallet */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("wallet");
                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "wallet"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <WalletCards size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Wallets
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay using supported digital wallets
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === "wallet"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "wallet" && (
                      <Check
                        size={13}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>
              </div>

              {/* =================================================
                  UPI FORM
              ================================================== */}
              {paymentMethod === "upi" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-bold text-slate-900">
                      Pay with UPI
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter your UPI ID to continue.
                    </p>
                  </div>

                  <label
                    htmlFor="upiId"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    UPI ID
                  </label>

                  <div className="relative">
                    <Smartphone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="upiId"
                      type="text"
                      value={upiId}
                      onChange={(event) => {
                        setUpiId(event.target.value);

                        setErrors((previous) => ({
                          ...previous,
                          upiId: "",
                        }));
                      }}
                      placeholder="example@upi"
                      className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.upiId
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>

                  {errors.upiId && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.upiId}
                    </p>
                  )}

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />

                    <span className="text-xs font-medium text-slate-400">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-7">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <QrCode size={34} />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      Scan to Pay
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      QR payment will be available with
                      payment gateway integration.
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  CARD FORM
              ================================================== */}
              {paymentMethod === "card" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-bold text-slate-900">
                      Card Details
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter your card details securely.
                    </p>
                  </div>

                  {/* Card Number */}
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Card Number
                    </label>

                    <div className="relative">
                      <CreditCard
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="cardNumber"
                        name="number"
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={cardData.number}
                        onChange={(event) => {
                          const numbers =
                            event.target.value.replace(
                              /\D/g,
                              ""
                            );

                          const formatted =
                            numbers
                              .slice(0, 16)
                              .replace(
                                /(.{4})/g,
                                "$1 "
                              )
                              .trim();

                          setCardData((previous) => ({
                            ...previous,
                            number: formatted,
                          }));

                          setErrors((previous) => ({
                            ...previous,
                            number: "",
                          }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                          errors.number
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />
                    </div>

                    {errors.number && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.number}
                      </p>
                    )}
                  </div>

                  {/* Card Holder */}
                  <div className="mt-4">
                    <label
                      htmlFor="cardHolder"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Card Holder Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="cardHolder"
                        name="holder"
                        type="text"
                        value={cardData.holder}
                        onChange={handleCardChange}
                        placeholder="Name on card"
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                          errors.holder
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />
                    </div>

                    {errors.holder && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.holder}
                      </p>
                    )}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="expiry"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Expiry Date
                      </label>

                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(event) => {
                          let value =
                            event.target.value.replace(
                              /\D/g,
                              ""
                            );

                          if (value.length > 2) {
                            value =
                              value.slice(0, 2) +
                              "/" +
                              value.slice(2, 4);
                          }

                          setCardData((previous) => ({
                            ...previous,
                            expiry: value,
                          }));

                          setErrors((previous) => ({
                            ...previous,
                            expiry: "",
                          }));
                        }}
                        placeholder="MM / YY"
                        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                          errors.expiry
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />

                      {errors.expiry && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.expiry}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        CVV
                      </label>

                      <input
                        id="cvv"
                        name="cvv"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(event) => {
                          const value =
                            event.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setCardData((previous) => ({
                            ...previous,
                            cvv: value,
                          }));

                          setErrors((previous) => ({
                            ...previous,
                            cvv: "",
                          }));
                        }}
                        placeholder="•••"
                        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                          errors.cvv
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />

                      {errors.cvv && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  NET BANKING
              ================================================== */}
              {paymentMethod === "netbanking" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-slate-900">
                    Select Your Bank
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose your bank to continue.
                  </p>

                  <select
                    value={bank}
                    onChange={(event) => {
                      setBank(event.target.value);

                      setErrors((previous) => ({
                        ...previous,
                        bank: "",
                      }));
                    }}
                    className={`mt-5 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-4 ${
                      errors.bank
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option value="sbi">
                      State Bank of India
                    </option>

                    <option value="hdfc">
                      HDFC Bank
                    </option>

                    <option value="icici">
                      ICICI Bank
                    </option>

                    <option value="axis">
                      Axis Bank
                    </option>

                    <option value="kotak">
                      Kotak Mahindra Bank
                    </option>
                  </select>

                  {errors.bank && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.bank}
                    </p>
                  )}
                </div>
              )}

              {/* =================================================
                  WALLET
              ================================================== */}
              {paymentMethod === "wallet" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-slate-900">
                    Select Wallet
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose your preferred wallet.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        value: "paytm",
                        label: "Paytm",
                      },
                      {
                        value: "phonepe",
                        label: "PhonePe",
                      },
                      {
                        value: "amazonpay",
                        label: "Amazon Pay",
                      },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setWallet(item.value);

                          setErrors((previous) => ({
                            ...previous,
                            wallet: "",
                          }));
                        }}
                        className={`rounded-xl border p-4 text-sm font-semibold transition ${
                          wallet === item.value
                            ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {errors.wallet && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.wallet}
                    </p>
                  )}
                </div>
              )}

              {/* =================================================
                  SECURITY NOTE
              ================================================== */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Your payment is secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Your payment details are protected with
                    secure encryption.
                  </p>
                </div>
              </div>

              {/* =================================================
                  TERMS
              ================================================== */}
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  errors.terms
                    ? "border-red-200 bg-red-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(event) => {
                      setAgreeTerms(
                        event.target.checked
                      );

                      setErrors((previous) => ({
                        ...previous,
                        terms: "",
                      }));
                    }}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I agree to Tripora's{" "}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/termsandconditions"
                        )
                      }
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and payment policies.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Desktop Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 hidden w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:flex"
              >
                {isProcessing
                  ? "Processing Payment..."
                  : `Pay ₹${formatPrice(totalPrice)}`}

                {!isProcessing && (
                  <ArrowRight size={17} />
                )}
              </button>
            </form>

            {/* =================================================
                TRUST FEATURES
            ================================================== */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-base font-bold text-slate-900">
                Why pay with Tripora?
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <LockKeyhole size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Secure Checkout
                    </p>

                    <p className="text-xs text-slate-500">
                      Protected payment experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Instant Confirmation
                    </p>

                    <p className="text-xs text-slate-500">
                      Get booking confirmation quickly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      24/7 Support
                    </p>

                    <p className="text-xs text-slate-500">
                      We're always here to help
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Booking Support
                    </p>

                    <p className="text-xs text-slate-500">
                      Help whenever you need it
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT BOOKING SUMMARY
          ================================================== */}
          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Booking Summary
                </h2>
              </div>

              <div className="p-5">
                {/* Hotel */}
                <div className="flex gap-4">
                  <img
                    src={
                      hotel.image ||
                      fallbackHotel.image
                    }
                    alt={
                      hotel.name ||
                      "Hotel"
                    }
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-900">
                      {hotel.name ||
                        fallbackHotel.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                        <Star
                          size={12}
                          fill="currentColor"
                        />

                        {hotel.rating || 4.6}
                      </span>

                      <span className="text-xs text-slate-500">
                        Excellent
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-start gap-1 text-xs text-slate-500">
                      <MapPin
                        size={13}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        {hotel.location ||
                          fallbackHotel.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays size={14} />
                      Check-in
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(checkIn)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays size={14} />
                      Check-out
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(checkOut)}
                    </p>
                  </div>
                </div>

                {/* Guests */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {guestCountText}
                  </span>
                </div>

                {/* Room */}
                <div className="mt-5 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {selectedRoom.name ||
                          fallbackRoom.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {selectedRoom.bed ||
                          fallbackRoom.bed}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-sm font-bold text-slate-900">
                      ₹{formatPrice(roomPrice)}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2 size={14} />

                      {selectedRoom.meal ||
                        fallbackRoom.meal}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2 size={14} />

                      {selectedRoom.cancellation ||
                        fallbackRoom.cancellation}
                    </div>
                  </div>
                </div>

                {/* Guest */}
                {guestDetails.firstName && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Primary Guest
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {guestDetails.firstName}{" "}
                      {guestDetails.lastName}
                    </p>

                    {guestDetails.email && (
                      <p className="mt-1 text-xs text-slate-500">
                        {guestDetails.email}
                      </p>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      Room ₹{formatPrice(roomPrice)} ×{" "}
                      {nights}{" "}
                      {nights === 1
                        ? "night"
                        : "nights"}
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹
                      {formatPrice(
                        totalRoomPrice
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Taxes & Fees</span>

                    <span className="font-semibold text-slate-800">
                      ₹{formatPrice(taxes)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Total Amount
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Inclusive of applicable taxes
                        </p>
                      </div>

                      <p className="text-xl font-extrabold text-blue-600">
                        ₹{formatPrice(totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation */}
                <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="text-xs font-bold text-emerald-800">
                        Free Cancellation
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-emerald-700">
                        Cancellation policy depends on the
                        selected room and hotel.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Pay Button */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
                >
                  {isProcessing
                    ? "Processing Payment..."
                    : `Pay ₹${formatPrice(
                        totalPrice
                      )}`}

                  {!isProcessing && (
                    <ArrowRight size={17} />
                  )}
                </button>

                <div className="mt-4 flex items-start gap-2">
                  <LockKeyhole
                    size={14}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <p className="text-[11px] leading-4 text-slate-400">
                    Your payment is processed securely.
                    You will receive your booking
                    confirmation after successful payment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =====================================================
          PROCESSING OVERLAY
      ====================================================== */}
      {isProcessing && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <LockKeyhole
                size={25}
                className="animate-pulse"
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Processing Payment
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Please wait while we process your payment.
              Do not close or refresh this page.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DEMO SUCCESS STATE
      ====================================================== */}
      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={34} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Payment Successful
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your hotel booking has been confirmed
              successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPayment;