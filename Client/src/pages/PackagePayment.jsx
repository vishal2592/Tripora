import React, { useState } from "react";
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

const PackagePayment = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const location = useLocation();

  const {
    packageData,
    travellers,
    travelDate,
    passenger,
    packageSubtotal,
    taxes,
    convenienceFee,
    totalAmount,
  } = location.state || {};

  /* =====================================================
     FALLBACK DATA
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

  const packageItem = packageData || fallbackPackage;

  const safeTravellers = travellers || {
    adults: 2,
    children: 0,
    infants: 0,
  };

  const safeSubtotal =
    Number(packageSubtotal) ||
    Number(packageItem.price || 34999) *
      Number(safeTravellers.adults || 1);

  const safeTaxes =
    Number(taxes) || Math.round(safeSubtotal * 0.05);

  const safeConvenienceFee =
    Number(convenienceFee) || 299;

  const safeTotal =
    Number(totalAmount) ||
    safeSubtotal +
      safeTaxes +
      safeConvenienceFee;

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

  const [cardData, setCardData] = useState({
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
    Number(value).toLocaleString("en-IN");

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

    if (paymentMethod === "card") {
      const cardNumber = cardData.cardNumber.replace(
        /\s/g,
        ""
      );

      if (!cardNumber) {
        newErrors.cardNumber =
          "Card number is required";
      } else if (cardNumber.length !== 16) {
        newErrors.cardNumber =
          "Enter a valid 16 digit card number";
      }

      if (!cardData.cardHolder.trim()) {
        newErrors.cardHolder =
          "Card holder name is required";
      }

      if (!cardData.expiry) {
        newErrors.expiry =
          "Expiry date is required";
      } else if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
          cardData.expiry
        )
      ) {
        newErrors.expiry =
          "Enter expiry as MM/YY";
      }

      if (!cardData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (cardData.cvv.length !== 3) {
        newErrors.cvv = "Enter valid CVV";
      }
    }

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        newErrors.upiId = "UPI ID is required";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())
      ) {
        newErrors.upiId =
          "Enter a valid UPI ID";
      }
    }

    if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        newErrors.bank =
          "Please select your bank";
      }
    }

    if (paymentMethod === "wallet") {
      if (!selectedWallet) {
        newErrors.wallet =
          "Please select a wallet";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     PAYMENT HANDLER
  ====================================================== */

  const handlePayment = () => {
    if (isProcessing || showSuccess) {
      return;
    }

    const isValid = validatePayment();

    if (!isValid) {
      return;
    }

    setIsProcessing(true);

    /*
     * Demo payment processing
     */
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      /*
       * Navigate after success
       */
      setTimeout(() => {
        navigate(
          `/package-booking-success/${bookingId}`,
          {
            state: {
              bookingId,
              packageData: packageItem,
              travellers: safeTravellers,
              travelDate,
              passenger,
              totalAmount: safeTotal,
              paymentMethod,
              status: "success",
            },
          }
        );
      }, 1000);
    }, 1800);
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
          setErrors({});
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
     INPUT FIELD
  ====================================================== */

  const InputError = ({ message }) => {
    if (!message) return null;

    return (
      <p className="mt-1 text-[9px] font-semibold text-red-500">
        {message}
      </p>
    );
  };

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
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                <Check size={13} />
              </div>

              <span className="hidden text-[10px] font-bold text-green-600 sm:inline sm:text-xs">
                Traveller Details
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-green-200 sm:mx-4 sm:w-16" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white">
                2
              </div>

              <span className="text-[10px] font-bold text-blue-600 sm:text-xs">
                Payment
              </span>
            </div>

            <div className="mx-2 h-px w-8 bg-slate-200 sm:mx-4 sm:w-16" />

            {/* Step 3 */}
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
            GRID
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              LEFT PAYMENT
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
                  CARD FORM
              ================================================== */}
              {paymentMethod === "card" && (
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900">
                        Card Details
                      </h3>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        Enter your card information
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                      <LockKeyhole size={11} />
                      Secure
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                        Card Number
                        <span className="ml-0.5 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">
                        <CreditCard
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          name="cardNumber"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          className={`h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-xs font-semibold tracking-wider text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                            errors.cardNumber
                              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                          }`}
                        />
                      </div>

                      <InputError
                        message={errors.cardNumber}
                      />
                    </div>

                    {/* Card Holder */}
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                        Card Holder Name
                        <span className="ml-0.5 text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="cardHolder"
                        value={cardData.cardHolder}
                        onChange={handleCardChange}
                        placeholder="Name as on card"
                        className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                          errors.cardHolder
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                      />

                      <InputError
                        message={errors.cardHolder}
                      />
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                          Expiry Date
                          <span className="ml-0.5 text-red-500">
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          inputMode="numeric"
                          placeholder="MM/YY"
                          className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                            errors.expiry
                              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                          }`}
                        />

                        <InputError
                          message={errors.expiry}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                          CVV
                          <span className="ml-0.5 text-red-500">
                            *
                          </span>
                        </label>

                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          inputMode="numeric"
                          placeholder="•••"
                          maxLength={3}
                          className={`h-11 w-full rounded-xl border bg-white px-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                            errors.cvv
                              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                          }`}
                        />

                        <InputError
                          message={errors.cvv}
                        />
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
                    Enter your UPI ID to continue
                  </p>

                  <div className="mt-4">
                    <label className="mb-1.5 block text-[10px] font-bold text-slate-600 sm:text-xs">
                      UPI ID
                      <span className="ml-0.5 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Smartphone
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);

                          setErrors((prev) => ({
                            ...prev,
                            upiId: "",
                          }));
                        }}
                        placeholder="example@upi"
                        className={`h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 ${
                          errors.upiId
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                      />
                    </div>

                    <InputError
                      message={errors.upiId}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Google Pay", "PhonePe", "Paytm"].map(
                      (app) => (
                        <div
                          key={app}
                          className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-3 text-center"
                        >
                          <p className="text-[9px] font-bold text-slate-600">
                            {app}
                          </p>
                        </div>
                      )
                    )}
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
                        setSelectedBank(e.target.value);

                        setErrors((prev) => ({
                          ...prev,
                          bank: "",
                        }));
                      }}
                      className={`h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none focus:ring-2 ${
                        errors.bank
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
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

                  <InputError
                    message={errors.bank}
                  />

                  <div className="mt-4 rounded-xl bg-blue-50 p-3">
                    <div className="flex gap-2">
                      <ShieldCheck
                        size={15}
                        className="shrink-0 text-blue-600"
                      />

                      <p className="text-[9px] leading-4 text-blue-700">
                        You will be redirected to your
                        bank's secure website to complete
                        the payment.
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
                    Choose a wallet to pay
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
                            setSelectedWallet(wallet);

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
                            Secure wallet payment
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
                    Tripora uses industry-standard
                    encryption to protect your payment
                    information.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
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
                        "+91"}{" "}
                      {passenger?.mobile ||
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
                        {travelDate ||
                          "25 September 2026"}
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
                        ₹
                        {formatPrice(
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
                    isProcessing || showSuccess
                  }
                  className={`mt-4 hidden h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-extrabold text-white shadow-sm transition sm:flex ${
                    showSuccess
                      ? "bg-green-600"
                      : isProcessing
                      ? "cursor-not-allowed bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  }`}
                >
                  {showSuccess ? (
                    <>
                      <Check size={16} />
                      Payment Successful
                    </>
                  ) : isProcessing ? (
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
              isProcessing || showSuccess
            }
            className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-xs font-extrabold text-white shadow-sm transition ${
              showSuccess
                ? "bg-green-600"
                : isProcessing
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 active:bg-blue-800"
            }`}
          >
            {showSuccess ? (
              <>
                <Check size={15} />
                Successful
              </>
            ) : isProcessing ? (
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
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <span className="h-7 w-7 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Processing Payment
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Please don't close or refresh this page.
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
                {bookingId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagePayment;