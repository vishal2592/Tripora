import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  LockKeyhole,
  MapPin,
  Plane,
  QrCode,
  ShieldCheck,
  Smartphone,
  WalletCards,
  XCircle,
} from "lucide-react";

const FlightPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();

  const paymentData = location.state || {};

  // ----------------------------------------------------
  // FLIGHT DATA
  // ----------------------------------------------------
  const flight = paymentData.flight || {
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 2345",

    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/IndiGo_Airlines_logo.svg",

    from: {
      city: "Delhi",
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "06:30 AM",
    },

    to: {
      city: "Mumbai",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "08:40 AM",
    },

    date: "18 September 2026",
    duration: "2h 10m",
    stops: "Non-stop",
  };

  // ----------------------------------------------------
  // PASSENGER DATA
  // ----------------------------------------------------
  const passengers = paymentData.passengers || [
    {
      title: "Mr",
      firstName: "Vishal",
      lastName: "Kumar",
    },
  ];

  // ----------------------------------------------------
  // CONTACT DATA
  // ----------------------------------------------------
  const contact = paymentData.contact || {
    email: "example@gmail.com",
    mobile: "9876543210",
  };

  // ----------------------------------------------------
  // FARE DATA
  // ----------------------------------------------------
  const baseFare = Number(paymentData.flight?.baseFare || 4800);

  const taxes = Number(paymentData.flight?.taxes || 624);

  const convenienceFee = Number(
    paymentData.flight?.convenienceFee || 75
  );

  const extraBaggagePrice = Number(
    paymentData.extraBaggagePrice || 0
  );

  const totalAmount = Number(
    paymentData.totalAmount ||
      baseFare +
        taxes +
        convenienceFee +
        extraBaggagePrice
  );

  // ----------------------------------------------------
  // PAYMENT STATE
  // ----------------------------------------------------
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });

  const [upiId, setUpiId] = useState("");

  const [selectedBank, setSelectedBank] = useState("");

  const [selectedWallet, setSelectedWallet] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const [paymentError, setPaymentError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  // ----------------------------------------------------
  // PASSENGER NAME
  // ----------------------------------------------------
  const passengerName = useMemo(() => {
    const passenger = passengers?.[0];

    if (!passenger) {
      return "Passenger";
    }

    return `${passenger.firstName || ""} ${
      passenger.lastName || ""
    }`.trim();
  }, [passengers]);

  // ----------------------------------------------------
  // FORMAT CARD NUMBER
  // ----------------------------------------------------
  const formatCardNumber = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    return numbers
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // ----------------------------------------------------
  // CARD NUMBER
  // ----------------------------------------------------
  const handleCardNumberChange = (e) => {
    setCardDetails((prev) => ({
      ...prev,
      cardNumber: formatCardNumber(e.target.value),
    }));
  };

  // ----------------------------------------------------
  // EXPIRY
  // ----------------------------------------------------
  const handleExpiryChange = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setCardDetails((prev) => ({
      ...prev,
      expiry: value,
    }));
  };

  // ----------------------------------------------------
  // VALIDATE PAYMENT
  // ----------------------------------------------------
  const validatePayment = () => {
    setPaymentError("");

    // CARD
    if (paymentMethod === "card") {
      const cardNumber =
        cardDetails.cardNumber.replace(/\s/g, "");

      if (cardNumber.length !== 16) {
        setPaymentError(
          "Please enter a valid 16-digit card number."
        );

        return false;
      }

      if (!cardDetails.cardHolder.trim()) {
        setPaymentError(
          "Please enter the card holder name."
        );

        return false;
      }

      if (cardDetails.expiry.length !== 5) {
        setPaymentError(
          "Please enter a valid expiry date."
        );

        return false;
      }

      if (cardDetails.cvv.length !== 3) {
        setPaymentError(
          "Please enter a valid 3-digit CVV."
        );

        return false;
      }
    }

    // UPI
    if (paymentMethod === "upi") {
      if (
        !upiId.trim() ||
        !upiId.includes("@")
      ) {
        setPaymentError(
          "Please enter a valid UPI ID."
        );

        return false;
      }
    }

    // NET BANKING
    if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        setPaymentError(
          "Please select your bank."
        );

        return false;
      }
    }

    // WALLET
    if (paymentMethod === "wallet") {
      if (!selectedWallet) {
        setPaymentError(
          "Please select a wallet."
        );

        return false;
      }
    }

    return true;
  };

  // ----------------------------------------------------
  // PAYMENT
  // ----------------------------------------------------
  const handlePayment = () => {
    const isValid = validatePayment();

    if (!isValid) {
      return;
    }

    setIsProcessing(true);

    /*
      DEMO PAYMENT

      Later replace this with Razorpay
      or another real payment gateway.
    */

    setTimeout(() => {
      setIsProcessing(false);

      setShowSuccess(true);

      setTimeout(() => {
        navigate(
          `/flight-booking-success/${bookingId}`,
          {
            state: {
              bookingId,
              flight,
              passengers,
              contact,
              totalAmount,
              paymentMethod,
              status: "success",
            },
          }
        );
      }, 1000);
    }, 1800);
  };

  // ----------------------------------------------------
  // PAYMENT METHODS
  // ----------------------------------------------------
  const paymentMethods = [
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: CreditCard,
    },
    {
      id: "upi",
      label: "UPI",
      icon: Smartphone,
    },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: Building2,
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: WalletCards,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-2 sm:pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* BACK */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />

            <span>Back</span>
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Plane size={18} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Trip
              <span className="text-blue-600">
                ora
              </span>
            </span>
          </div>

          {/* SECURITY */}
          <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 sm:flex">
            <LockKeyhole
              size={15}
              className="text-green-600"
            />

            Secure Payment
          </div>

          <div className="sm:hidden">
            <LockKeyhole
              size={17}
              className="text-green-600"
            />
          </div>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">

          <div className="flex items-center gap-2 text-[11px] font-bold sm:gap-4 sm:text-xs">

            {/* FLIGHT */}
            <div className="flex items-center gap-1.5 text-green-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <Check size={12} />
              </span>

              Flight
            </div>

            <div className="h-px w-8 bg-green-300 sm:w-14" />

            {/* PASSENGER */}
            <div className="flex items-center gap-1.5 text-green-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <Check size={12} />
              </span>

              Passenger
            </div>

            <div className="h-px w-8 bg-blue-300 sm:w-14" />

            {/* PAYMENT */}
            <div className="flex items-center gap-1.5 text-blue-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                3
              </span>

              Payment
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 lg:py-7">

        {/* PAGE TITLE */}
        <div className="mb-3">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Complete Your Payment
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Securely pay for your flight booking.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_370px]">

          {/* =================================================
              LEFT
          ================================================= */}
          <section className="space-y-4">

            {/* PAYMENT METHODS */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* TITLE */}
              <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
                <h2 className="text-base font-extrabold text-slate-900">
                  Payment Method
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Choose your preferred payment option.
                </p>
              </div>

              {/* METHODS */}
              <div className="grid grid-cols-2 border-b border-slate-200 sm:grid-cols-4">

                {paymentMethods.map(
                  (method) => {
                    const Icon = method.icon;

                    const active =
                      paymentMethod ===
                      method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(
                            method.id
                          );

                          setPaymentError("");
                        }}
                        className={`relative flex min-h-[86px] flex-col items-center justify-center gap-2 border-b px-2 py-3 text-center transition sm:min-h-[94px] sm:border-b-0 ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "border-slate-100 text-slate-600 hover:bg-slate-50"
                        }`}
                      >

                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                        )}

                        <Icon size={20} />

                        <span className="text-[10px] font-bold leading-tight sm:text-xs">
                          {method.label}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

              {/* METHOD CONTENT */}
              <div className="p-4 sm:p-5">

                {/* =================================================
                    CARD PAYMENT
                ================================================= */}
                {paymentMethod === "card" && (
                  <div>

                    <div className="mb-4 flex items-center justify-between">

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Card Details
                        </h3>

                        <p className="mt-1 text-[11px] text-slate-500">
                          Enter your card details securely.
                        </p>
                      </div>

                      <div className="hidden items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5 text-[10px] font-semibold text-slate-500 sm:flex">
                        <LockKeyhole size={12} />

                        SSL Secured
                      </div>

                    </div>

                    <div className="space-y-4">

                      {/* CARD NUMBER */}
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                          Card Number
                        </label>

                        <div className="relative">

                          <CreditCard
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="text"
                            value={
                              cardDetails.cardNumber
                            }
                            onChange={
                              handleCardNumberChange
                            }
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                        </div>
                      </div>

                      {/* CARD HOLDER */}
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                          Card Holder Name
                        </label>

                        <input
                          type="text"
                          value={
                            cardDetails.cardHolder
                          }
                          onChange={(e) =>
                            setCardDetails(
                              (prev) => ({
                                ...prev,
                                cardHolder:
                                  e.target.value,
                              })
                            )
                          }
                          placeholder="Enter name as on card"
                          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      {/* EXPIRY + CVV */}
                      <div className="grid grid-cols-2 gap-3">

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            Expiry Date
                          </label>

                          <input
                            type="text"
                            value={
                              cardDetails.expiry
                            }
                            onChange={
                              handleExpiryChange
                            }
                            placeholder="MM/YY"
                            inputMode="numeric"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-slate-700">
                            CVV
                          </label>

                          <input
                            type="password"
                            value={
                              cardDetails.cvv
                            }
                            maxLength={3}
                            onChange={(e) =>
                              setCardDetails(
                                (prev) => ({
                                  ...prev,
                                  cvv: e.target.value
                                    .replace(
                                      /\D/g,
                                      ""
                                    )
                                    .slice(
                                      0,
                                      3
                                    ),
                                })
                              )
                            }
                            placeholder="•••"
                            inputMode="numeric"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                      </div>

                      {/* SAVE CARD */}
                      <label className="flex cursor-pointer items-center gap-2">

                        <input
                          type="checkbox"
                          checked={
                            cardDetails.saveCard
                          }
                          onChange={(e) =>
                            setCardDetails(
                              (prev) => ({
                                ...prev,
                                saveCard:
                                  e.target.checked,
                              })
                            )
                          }
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />

                        <span className="text-xs font-medium text-slate-600">
                          Save this card securely
                          for future payments
                        </span>

                      </label>

                    </div>
                  </div>
                )}

                {/* =================================================
                    UPI
                ================================================= */}
                {paymentMethod === "upi" && (
                  <div>

                    <div className="mb-4">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Pay with UPI
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Enter your UPI ID or scan
                        the QR code.
                      </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-[1fr_180px]">

                      <div>

                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                          UPI ID
                        </label>

                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) =>
                            setUpiId(
                              e.target.value
                            )
                          }
                          placeholder="example@upi"
                          className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          Verify UPI ID
                        </button>

                      </div>

                      {/* QR */}
                      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">

                        <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-xl bg-white shadow-sm">

                          <QrCode
                            size={65}
                            className="text-slate-700"
                          />

                        </div>

                        <p className="text-[10px] font-semibold text-slate-500">
                          Scan & Pay
                        </p>

                      </div>

                    </div>

                    {/* UPI APPS */}
                    <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">

                      {[
                        "Google Pay",
                        "PhonePe",
                        "Paytm",
                        "BHIM",
                        "Amazon Pay",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-slate-200 px-2 py-2 text-center text-[10px] font-bold text-slate-600"
                        >
                          {item}
                        </div>
                      ))}

                    </div>

                  </div>
                )}

                {/* =================================================
                    NET BANKING
                ================================================= */}
                {paymentMethod ===
                  "netbanking" && (
                  <div>

                    <div className="mb-4">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Net Banking
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Select your bank to
                        continue.
                      </p>
                    </div>

                    {/* SELECT */}
                    <div>

                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Select Bank
                      </label>

                      <div className="relative">

                        <select
                          value={selectedBank}
                          onChange={(e) =>
                            setSelectedBank(
                              e.target.value
                            )
                          }
                          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                          <option value="other">
                            Other Banks
                          </option>
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                      </div>
                    </div>

                    {/* POPULAR BANKS */}
                    <div className="mt-5">

                      <p className="mb-2 text-xs font-bold text-slate-700">
                        Popular Banks
                      </p>

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                        {[
                          ["sbi", "SBI"],
                          ["hdfc", "HDFC"],
                          ["icici", "ICICI"],
                          ["axis", "Axis"],
                        ].map(
                          ([id, name]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() =>
                                setSelectedBank(
                                  id
                                )
                              }
                              className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${
                                selectedBank ===
                                id
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 text-slate-600 hover:border-blue-300"
                              }`}
                            >
                              {name}
                            </button>
                          )
                        )}

                      </div>
                    </div>

                  </div>
                )}

                {/* =================================================
                    WALLET
                ================================================= */}
                {paymentMethod ===
                  "wallet" && (
                  <div>

                    <div className="mb-4">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Select Wallet
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Choose your preferred
                        wallet.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                      {[
                        ["paytm", "Paytm"],
                        ["phonepe", "PhonePe"],
                        ["mobikwik", "MobiKwik"],
                        ["amazon", "Amazon Pay"],
                      ].map(
                        ([id, name]) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() =>
                              setSelectedWallet(
                                id
                              )
                            }
                            className={`flex min-h-[80px] flex-col items-center justify-center rounded-xl border px-3 py-3 transition ${
                              selectedWallet ===
                              id
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-300"
                            }`}
                          >
                            <WalletCards
                              size={20}
                            />

                            <span className="mt-2 text-xs font-bold">
                              {name}
                            </span>
                          </button>
                        )
                      )}

                    </div>

                  </div>
                )}

                {/* ERROR */}
                {paymentError && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs font-semibold text-red-600">

                    <XCircle size={16} />

                    {paymentError}

                  </div>
                )}

              </div>
            </div>

            {/* =================================================
                SECURITY
            ================================================= */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 sm:p-5">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                  <ShieldCheck size={20} />
                </div>

                <div>

                  <h3 className="text-sm font-extrabold text-green-900">
                    Your payment is secure
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-green-800/70">
                    Your payment information is
                    encrypted and securely
                    processed. Tripora does not
                    store your complete card
                    details.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">

                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                      <Check size={12} />
                      SSL Encryption
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                      <Check size={12} />
                      Secure Payment
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                      <Check size={12} />
                      100% Safe
                    </span>

                  </div>

                </div>

              </div>
            </div>

          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}
          <aside className="space-y-4">

            {/* =================================================
                FLIGHT SUMMARY
            ================================================= */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-sm font-extrabold text-slate-900">
                  Flight Summary
                </h2>

                <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                  {flight.stops ||
                    "Non-stop"}
                </span>

              </div>

              {/* AIRLINE */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white">

                  {flight.logo ? (
                    <img
                      src={flight.logo}
                      alt={flight.airline}
                      className="max-h-7 max-w-7 object-contain"
                    />
                  ) : (
                    <Plane
                      size={18}
                      className="text-blue-600"
                    />
                  )}

                </div>

                <div>

                  <p className="text-xs font-extrabold text-slate-900">
                    {flight.airline}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                    {flight.flightNumber}
                  </p>

                </div>

              </div>

              <div className="my-4 h-px bg-slate-100" />

              {/* ROUTE */}
              <div className="flex items-center justify-between">

                {/* FROM */}
                <div>

                  <p className="text-lg font-extrabold text-slate-900">
                    {flight.from?.time}
                  </p>

                  <p className="mt-0.5 text-xs font-bold text-slate-500">
                    {flight.from?.code}
                  </p>

                  <p className="mt-1 max-w-[95px] text-[9px] leading-4 text-slate-400">
                    {flight.from?.city}
                  </p>

                </div>

                {/* MIDDLE */}
                <div className="flex flex-1 flex-col items-center px-2">

                  <span className="text-[9px] font-semibold text-slate-400">
                    {flight.duration}
                  </span>

                  <div className="my-1 flex w-full items-center">

                    <div className="h-px flex-1 bg-slate-200" />

                    <Plane
                      size={13}
                      className="mx-1 rotate-90 text-blue-600"
                    />

                    <div className="h-px flex-1 bg-slate-200" />

                  </div>

                  <span className="text-[9px] font-bold text-green-600">
                    {flight.stops ||
                      "Non-stop"}
                  </span>

                </div>

                {/* TO */}
                <div className="text-right">

                  <p className="text-lg font-extrabold text-slate-900">
                    {flight.to?.time}
                  </p>

                  <p className="mt-0.5 text-xs font-bold text-slate-500">
                    {flight.to?.code}
                  </p>

                  <p className="mt-1 max-w-[95px] text-[9px] leading-4 text-slate-400">
                    {flight.to?.city}
                  </p>

                </div>

              </div>

              {/* DATE */}
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">

                <MapPin
                  size={13}
                  className="text-blue-600"
                />

                <span className="text-[10px] font-semibold text-slate-600">
                  {flight.date}
                </span>

              </div>

            </div>

            {/* =================================================
                PASSENGER
            ================================================= */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <h2 className="text-sm font-extrabold text-slate-900">
                Passenger
              </h2>

              <div className="mt-3 rounded-xl bg-slate-50 p-3">

                <p className="text-xs font-extrabold text-slate-800">
                  {passengerName ||
                    "Passenger"}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {contact.email}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  +91 {contact.mobile}
                </p>

              </div>

            </div>

            {/* =================================================
                FARE SUMMARY
            ================================================= */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-sm font-extrabold text-slate-900">
                  Fare Summary
                </h2>

                <BadgeCheck
                  size={18}
                  className="text-green-600"
                />

              </div>

              <div className="space-y-3 text-xs">

                {/* BASE FARE */}
                <div className="flex items-center justify-between">

                  <span className="text-slate-500">
                    Base Fare
                  </span>

                  <span className="font-bold text-slate-800">
                    ₹
                    {baseFare.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* TAXES */}
                <div className="flex items-center justify-between">

                  <span className="text-slate-500">
                    Taxes & Fees
                  </span>

                  <span className="font-bold text-slate-800">
                    ₹
                    {taxes.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* CONVENIENCE */}
                <div className="flex items-center justify-between">

                  <span className="text-slate-500">
                    Convenience Fee
                  </span>

                  <span className="font-bold text-slate-800">
                    ₹
                    {convenienceFee.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* EXTRA BAGGAGE */}
                {extraBaggagePrice > 0 && (
                  <div className="flex items-center justify-between">

                    <span className="text-slate-500">
                      Extra Baggage
                    </span>

                    <span className="font-bold text-slate-800">
                      ₹
                      {extraBaggagePrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>
                )}

              </div>

              <div className="my-4 h-px bg-slate-200" />

              {/* TOTAL */}
              <div className="flex items-end justify-between">

                <div>

                  <p className="text-[10px] font-semibold text-slate-500">
                    Total Amount
                  </p>

                  <p className="mt-0.5 text-xl font-extrabold text-slate-900">
                    ₹
                    {totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>

                <span className="text-[9px] font-bold text-green-600">
                  Inclusive of taxes
                </span>

              </div>

              {/* DESKTOP PAY BUTTON */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  showSuccess
                }
                className={`mt-5 hidden h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-extrabold text-white shadow-sm transition sm:flex ${
                  showSuccess
                    ? "bg-green-600"
                    : isProcessing
                    ? "cursor-not-allowed bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >

                {showSuccess ? (
                  <>
                    <Check size={18} />

                    Payment Successful
                  </>
                ) : isProcessing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay ₹
                    {totalAmount.toLocaleString(
                      "en-IN"
                    )}

                    <ArrowRight
                      size={17}
                    />
                  </>
                )}

              </button>

              {/* SECURITY */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-semibold text-slate-400">

                <LockKeyhole size={11} />

                Secure & encrypted payment

              </div>

            </div>

          </aside>

        </div>
      </main>

      {/* =====================================================
          MOBILE PAYMENT BAR
      ===================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] sm:hidden">

        <div className="mx-auto flex max-w-7xl items-center gap-3">

          <div className="min-w-0 flex-1">

            <p className="text-[10px] font-semibold text-slate-500">
              Total Amount
            </p>

            <p className="text-lg font-extrabold text-slate-900">
              ₹
              {totalAmount.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={
              isProcessing ||
              showSuccess
            }
            className={`flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-4 text-xs font-extrabold text-white ${
              showSuccess
                ? "bg-green-600"
                : isProcessing
                ? "bg-blue-400"
                : "bg-blue-600"
            }`}
          >

            {showSuccess ? (
              <>
                <Check size={16} />
                Successful
              </>
            ) : isProcessing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                Processing...
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
      ===================================================== */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-[2px]">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

              <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />

            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Processing Payment
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Please don't close or refresh this page.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default FlightPayment;