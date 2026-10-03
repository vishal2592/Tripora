import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";

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

import {
  createHotelBooking,
  createHotelRazorpayOrder,
  verifyHotelRazorpayPayment,
  handleHotelPaymentFailure,
} from "../redux/slicer/hotelBookingSlice";

// ============================================================
// FALLBACK DATA
// ============================================================

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
  guests: 2,
  meal: "Breakfast Included",
  cancellation: "Free Cancellation",
};

const fallbackBooking = {
  checkIn: "20 Sep 2026",
  checkOut: "23 Sep 2026",
  nights: 3,
  guests: 2,
};

// ============================================================
// HELPERS
// ============================================================

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(
    Number(price || 0)
  );
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

const calculateNights = (
  checkIn,
  checkOut
) => {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (!start || !end || end <= start) {
    return 1;
  }

  const difference =
    end.getTime() - start.getTime();

  return Math.max(
    1,
    Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
};

// ============================================================
// COMPONENT
// ============================================================

const HotelPayment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  // ==========================================================
  // RAZORPAY SDK STATE
  // ==========================================================

  const [
    razorpayLoaded,
    setRazorpayLoaded,
  ] = useState(false);

  // ==========================================================
  // LOAD RAZORPAY CHECKOUT
  // ==========================================================

  useEffect(() => {
    let isMounted = true;

    const loadRazorpay = () => {
      return new Promise((resolve) => {
        // Already loaded
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        // Script already exists
        const existingScript =
          document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
          );

        if (existingScript) {
          existingScript.addEventListener(
            "load",
            () => resolve(true),
            { once: true }
          );

          existingScript.addEventListener(
            "error",
            () => resolve(false),
            { once: true }
          );

          return;
        }

        // Create script
        const script =
          document.createElement("script");

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () => {
          resolve(true);
        };

        script.onerror = () => {
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpay().then((loaded) => {
      if (isMounted) {
        setRazorpayLoaded(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // ==========================================================
  // BOOKING STATE FROM HOTEL BOOK NOW
  // ==========================================================

  const bookingState =
    location.state || {};

  // ==========================================================
  // HOTEL
  // ==========================================================

  const hotel =
    bookingState.hotel ||
    fallbackHotel;

  // ==========================================================
  // SELECTED ROOM
  // ==========================================================

  const selectedRoom =
    bookingState.selectedRoom ||
    bookingState.room ||
    fallbackRoom;

  // ==========================================================
  // IMPORTANT:
  // THIS MUST BE MONGODB HOTEL _id
  // ==========================================================

  const hotelId =
    bookingState.hotelId ||
    hotel._id ||
    hotel.id ||
    id;

  // ==========================================================
  // DATES
  // ==========================================================

  const checkIn =
    bookingState.checkIn ||
    fallbackBooking.checkIn;

  const checkOut =
    bookingState.checkOut ||
    fallbackBooking.checkOut;

  // ==========================================================
  // GUESTS
  // ==========================================================

  const guests =
    bookingState.guests ??
    fallbackBooking.guests;

  // ==========================================================
  // NIGHTS
  // ==========================================================

  const nights =
    Number(bookingState.nights) ||
    calculateNights(
      checkIn,
      checkOut
    );

  // ==========================================================
  // ROOM PRICE
  // ==========================================================

  const roomPrice = Number(
    selectedRoom.price ||
      selectedRoom.startingPrice ||
      fallbackRoom.price
  );

  // ==========================================================
  // TOTAL ROOM PRICE
  // ==========================================================

  const totalRoomPrice = Number(
    bookingState.totalRoomPrice ??
      bookingState.roomTotal ??
      roomPrice * nights
  );

  // ==========================================================
  // TAXES
  // ==========================================================

  const taxes = Number(
    bookingState.taxes ??
      bookingState.tax ??
      Math.round(
        totalRoomPrice * 0.12
      )
  );

  // ==========================================================
  // TOTAL PRICE
  // ==========================================================

  const totalPrice = Number(
    bookingState.totalPrice ??
      bookingState.totalAmount ??
      totalRoomPrice + taxes
  );

  // ==========================================================
  // GUEST DETAILS
  // ==========================================================

  const guestDetails =
    bookingState.guestDetails || {};

  // ==========================================================
  // PAYMENT STATE
  // ==========================================================

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState(
    bookingState.paymentMethod ||
      "upi"
  );

  // These fields are UI-only.
  // Razorpay collects the real payment details.

  const [upiId, setUpiId] =
    useState("");

  const [cardData, setCardData] =
    useState({
      number: "",
      holder: "",
      expiry: "",
      cvv: "",
    });

  const [bank, setBank] =
    useState("");

  const [wallet, setWallet] =
    useState("");

  const [agreeTerms, setAgreeTerms] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [
    isProcessing,
    setIsProcessing,
  ] = useState(false);

  const [
    showSuccess,
    setShowSuccess,
  ] = useState(false);

  // ==========================================================
  // GUEST COUNT TEXT
  // ==========================================================

  const guestCountText = useMemo(() => {
    if (typeof guests === "number") {
      return `${guests} ${
        guests === 1
          ? "Guest"
          : "Guests"
      }`;
    }

    if (typeof guests === "string") {
      return guests;
    }

    if (
      guests?.adults ||
      guests?.children
    ) {
      const adults = Number(
        guests.adults || 0
      );

      const children = Number(
        guests.children || 0
      );

      const total =
        adults + children;

      return `${total} ${
        total === 1
          ? "Guest"
          : "Guests"
      }`;
    }

    return "2 Guests";
  }, [guests]);

  // ==========================================================
  // CARD CHANGE
  // ==========================================================

  const handleCardChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCardData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      payment: "",
    }));
  };

  // ==========================================================
  // NORMALIZE GUEST COUNT
  // ==========================================================

  const getNumericGuests = () => {
    let numericGuests = 1;

    if (
      typeof guests === "number"
    ) {
      numericGuests = guests;
    } else if (
      typeof guests === "string"
    ) {
      numericGuests =
        Number(guests) || 1;
    } else if (
      guests &&
      typeof guests === "object"
    ) {
      numericGuests =
        Number(
          guests.adults || 0
        ) +
        Number(
          guests.children || 0
        );
    }

    return Math.max(
      1,
      Number(numericGuests) || 1
    );
  };

  // ==========================================================
  // PAYMENT VALIDATION
  // ==========================================================

  const validatePayment = () => {
    const newErrors = {};

    // --------------------------------------------------------
    // HOTEL ID
    // --------------------------------------------------------

    if (!hotelId) {
      newErrors.payment =
        "Hotel information is missing. Please go back and select the hotel again.";
    }

    // --------------------------------------------------------
    // GUEST DETAILS
    // --------------------------------------------------------

    if (
      !guestDetails.firstName?.trim()
    ) {
      newErrors.payment =
        "Guest first name is missing. Please go back and enter your details.";
    }

    if (
      !guestDetails.lastName?.trim()
    ) {
      newErrors.payment =
        "Guest last name is missing. Please go back and enter your details.";
    }

    if (
      !guestDetails.email?.trim()
    ) {
      newErrors.payment =
        "Guest email is missing. Please go back and enter your details.";
    }

    if (
      !guestDetails.mobile?.trim()
    ) {
      newErrors.payment =
        "Guest mobile number is missing. Please go back and enter your details.";
    }

    // --------------------------------------------------------
    // PRICE
    // --------------------------------------------------------

    if (
      !Number.isFinite(roomPrice) ||
      roomPrice < 0
    ) {
      newErrors.payment =
        "Invalid room price. Please go back and select the room again.";
    }

    if (
      !Number.isFinite(totalRoomPrice) ||
      totalRoomPrice < 0
    ) {
      newErrors.payment =
        "Invalid room total. Please go back and try again.";
    }

    if (
      !Number.isFinite(taxes) ||
      taxes < 0
    ) {
      newErrors.payment =
        "Invalid tax amount. Please go back and try again.";
    }

    if (
      !Number.isFinite(totalPrice) ||
      totalPrice <= 0
    ) {
      newErrors.payment =
        "Invalid booking amount. Please go back and try again.";
    }

    // --------------------------------------------------------
    // DATES
    // --------------------------------------------------------

    const startDate =
      parseDate(checkIn);

    const endDate =
      parseDate(checkOut);

    if (
      !startDate ||
      !endDate ||
      endDate <= startDate
    ) {
      newErrors.payment =
        "Invalid check-in or check-out date.";
    }

    // --------------------------------------------------------
    // TERMS
    // --------------------------------------------------------

    if (!agreeTerms) {
      newErrors.terms =
        "Please accept the Terms & Conditions";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ==========================================================
  // HANDLE PAYMENT
  // ==========================================================

  const handlePayment = async (
    event
  ) => {
    event.preventDefault();

    // Prevent duplicate click
    if (isProcessing) {
      return;
    }

    // --------------------------------------------------------
    // VALIDATE
    // --------------------------------------------------------

    if (!validatePayment()) {
      return;
    }

    // --------------------------------------------------------
    // RAZORPAY SDK CHECK
    // --------------------------------------------------------

    if (
      !razorpayLoaded ||
      !window.Razorpay
    ) {
      setErrors({
        payment:
          "Razorpay Checkout is still loading. Please wait a moment and try again.",
      });

      return;
    }

    setIsProcessing(true);

    setErrors({});

    try {
      // ======================================================
      // NORMALIZE GUEST COUNT
      // ======================================================

      const numericGuests =
        getNumericGuests();

      // ======================================================
      // HOTEL LOCATION
      // ======================================================

      const hotelLocation =
        hotel.location ||
        [
          hotel.city,
          hotel.state,
          hotel.country,
        ]
          .filter(Boolean)
          .join(", ") ||
        fallbackHotel.location;

      // ======================================================
      // BOOKING PAYLOAD
      // ======================================================

      const bookingPayload = {
        // ----------------------------------------------------
        // IMPORTANT:
        // This must be MongoDB Hotel _id
        // ----------------------------------------------------

        hotelId,

        // ----------------------------------------------------
        // HOTEL DETAILS
        // ----------------------------------------------------

        hotelDetails: {
          name:
            hotel.name ||
            hotel.hotelName ||
            fallbackHotel.name,

          image:
            hotel.image ||
            hotel.images?.[0] ||
            fallbackHotel.image,

          location:
            hotelLocation,
        },

        // ----------------------------------------------------
        // ROOM DETAILS
        // ----------------------------------------------------

        roomDetails: {
          name:
            selectedRoom.name ||
            fallbackRoom.name,

          price: roomPrice,

          bed:
            selectedRoom.bed ||
            fallbackRoom.bed,

          guests: Number(
            selectedRoom.guests ||
              fallbackRoom.guests ||
              2
          ),

          meal:
            selectedRoom.meal ||
            fallbackRoom.meal,

          cancellation:
            selectedRoom.cancellation ||
            fallbackRoom.cancellation,
        },

        // ----------------------------------------------------
        // DATES
        // ----------------------------------------------------

        checkIn,

        checkOut,

        nights: Number(nights),

        guests: numericGuests,

        // ----------------------------------------------------
        // PRIMARY GUEST
        // ----------------------------------------------------

        guestDetails: {
          firstName:
            guestDetails.firstName?.trim() ||
            "",

          lastName:
            guestDetails.lastName?.trim() ||
            "",

          email:
            guestDetails.email?.trim() ||
            "",

          countryCode:
            guestDetails.countryCode ||
            "+91",

          mobile:
            guestDetails.mobile?.trim() ||
            "",

          specialRequest:
            guestDetails.specialRequest?.trim() ||
            "",
        },

        // ----------------------------------------------------
        // PRICE
        // ----------------------------------------------------

        roomTotal: Number(
          totalRoomPrice
        ),

        taxes: Number(taxes),

        totalAmount: Number(
          totalPrice
        ),

        // ----------------------------------------------------
        // PAYMENT METHOD
        // ----------------------------------------------------
        // Actual payment happens through Razorpay.

        paymentMethod: "razorpay",
      };

      console.log(
        "======================================"
      );

      console.log(
        "HOTEL BOOKING PAYLOAD"
      );

      console.log(
        bookingPayload
      );

      console.log(
        "MongoDB Hotel ID:",
        hotelId
      );

      console.log(
        "======================================"
      );

      // ======================================================
      // STEP 1
      // CREATE PENDING HOTEL BOOKING
      // ======================================================

      const bookingResult =
        await dispatch(
          createHotelBooking(
            bookingPayload
          )
        ).unwrap();

      console.log(
        "Hotel Booking Response:",
        bookingResult
      );

      const createdBooking =
        bookingResult?.booking;

      const bookingId =
        createdBooking?.bookingId;

      if (!bookingId) {
        throw new Error(
          "Booking ID was not received from server."
        );
      }

      // ======================================================
      // STEP 2
      // CREATE RAZORPAY ORDER
      // ======================================================

      const orderResult =
        await dispatch(
          createHotelRazorpayOrder(
            bookingId
          )
        ).unwrap();

      console.log(
        "Razorpay Order Response:",
        orderResult
      );

      const razorpayOrder =
        orderResult?.order;

      if (!razorpayOrder?.id) {
        throw new Error(
          "Razorpay order was not created."
        );
      }

      if (
        !orderResult?.razorpayKey
      ) {
        throw new Error(
          "Razorpay key was not received from server."
        );
      }

      // ======================================================
      // STEP 3
      // RAZORPAY CHECKOUT OPTIONS
      // ======================================================

      const options = {
        key: orderResult.razorpayKey,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency ||
          "INR",

        name: "Tripora",

        description:
          `Hotel Booking - ${bookingId}`,

        order_id:
          razorpayOrder.id,

        // ----------------------------------------------------
        // PREFILL
        // ----------------------------------------------------

        prefill: {
          name: `${guestDetails.firstName || ""} ${
            guestDetails.lastName || ""
          }`.trim(),

          email:
            guestDetails.email || "",

          contact: `${(
            guestDetails.countryCode ||
            "+91"
          ).replace(
            /\s/g,
            ""
          )}${(
            guestDetails.mobile || ""
          ).replace(/\s/g, "")}`,
        },

        // ----------------------------------------------------
        // NOTES
        // ----------------------------------------------------

        notes: {
          bookingId,
          hotelId,
        },

        // ----------------------------------------------------
        // THEME
        // ----------------------------------------------------

        theme: {
          color: "#2563eb",
        },

        // ----------------------------------------------------
        // MODAL
        // ----------------------------------------------------

        modal: {
          ondismiss: () => {
            console.log(
              "Razorpay checkout closed"
            );

            setIsProcessing(false);

            setErrors({
              payment:
                "Payment window was closed. Your booking is still pending.",
            });
          },
        },

        // ====================================================
        // PAYMENT SUCCESS
        // ====================================================

        handler: async (
          response
        ) => {
          try {
            console.log(
              "Razorpay Payment Response:",
              response
            );

            setIsProcessing(true);

            // ------------------------------------------------
            // Validate Razorpay response
            // ------------------------------------------------

            if (
              !response?.razorpay_order_id ||
              !response?.razorpay_payment_id ||
              !response?.razorpay_signature
            ) {
              throw new Error(
                "Incomplete Razorpay payment response."
              );
            }

            // =================================================
            // STEP 4
            // VERIFY PAYMENT ON BACKEND
            // =================================================

            const verifyResult =
              await dispatch(
                verifyHotelRazorpayPayment(
                  {
                    bookingId,

                    paymentData: {
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,
                    },
                  }
                )
              ).unwrap();

            console.log(
              "Payment Verification Response:",
              verifyResult
            );

            // =================================================
            // VERIFIED SUCCESSFULLY
            // =================================================

            setIsProcessing(false);

            setShowSuccess(true);

            // ------------------------------------------------
            // Redirect to success page
            // ------------------------------------------------

            setTimeout(() => {
              navigate(
                `/booking-success/${bookingId}`,
                {
                  replace: true,

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

                    paymentMethod:
                      "razorpay",

                    booking:
                      verifyResult?.booking ||
                      createdBooking,

                    payment:
                      verifyResult?.payment,
                  },
                }
              );
            }, 700);
          } catch (
            verificationError
          ) {
            console.error(
              "Payment Verification Error:",
              verificationError
            );

            setIsProcessing(false);

            setShowSuccess(false);

            setErrors({
              payment:
                typeof verificationError ===
                "string"
                  ? verificationError
                  : verificationError?.message ||
                    "Payment was received but verification failed. Please contact support.",
            });
          }
        },
      };

      // ======================================================
      // STEP 5
      // CREATE RAZORPAY INSTANCE
      // ======================================================

      const razorpay =
        new window.Razorpay(
          options
        );

      // ======================================================
      // PAYMENT FAILED
      // ======================================================

      razorpay.on(
        "payment.failed",
        async (response) => {
          console.error(
            "Razorpay Payment Failed:",
            response
          );

          try {
            await dispatch(
              handleHotelPaymentFailure(
                {
                  bookingId,

                  paymentData: {
                    razorpay_order_id:
                      response?.error
                        ?.metadata
                        ?.order_id ||
                      razorpayOrder.id,

                    razorpay_payment_id:
                      response?.error
                        ?.metadata
                        ?.payment_id ||
                      "",

                    reason:
                      response?.error
                        ?.description ||
                      "Payment failed",
                  },
                }
              )
            ).unwrap();
          } catch (
            failureError
          ) {
            console.error(
              "Payment Failure Update Error:",
              failureError
            );
          }

          setIsProcessing(false);

          setShowSuccess(false);

          setErrors({
            payment:
              response?.error
                ?.description ||
              "Payment failed. Please try again.",
          });
        }
      );

      // ======================================================
      // STEP 6
      // OPEN RAZORPAY
      // ======================================================

      razorpay.open();
    } catch (error) {
      console.error(
        "Hotel Payment Error:",
        error
      );

      setIsProcessing(false);

      setShowSuccess(false);

      setErrors({
        payment:
          typeof error === "string"
            ? error
            : error?.message ||
              "Payment/booking failed. Please try again.",
      });
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

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
              onClick={() =>
                navigate(-1)
              }
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />

              <span>
                Back to Booking
              </span>
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
        {/* Heading */}

        <div className="mb-6">
          <p className="mb-1 text-sm font-semibold text-blue-600">
            SECURE CHECKOUT
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Complete your payment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Choose your preferred payment
            method to confirm your hotel
            booking.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* =================================================
              LEFT
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
                    Select how you would
                    like to pay.
                  </p>
                </div>
              </div>

              {/* Razorpay Loading */}

              {!razorpayLoaded &&
                !errors.payment && (
                  <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-700">
                      Loading secure
                      Razorpay checkout...
                    </p>
                  </div>
                )}

              {/* Backend / Booking Error */}

              {errors.payment && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-700">
                    {errors.payment}
                  </p>
                </div>
              )}

              {/* =================================================
                  PAYMENT BUTTONS
              ================================================== */}

              <div className="grid gap-3">
                {/* UPI */}

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod(
                      "upi"
                    );

                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod ===
                    "upi"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod ===
                        "upi"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Smartphone
                        size={19}
                      />
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
                        Google Pay,
                        PhonePe and
                        other UPI apps
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod ===
                      "upi"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod ===
                      "upi" && (
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
                    setPaymentMethod(
                      "card"
                    );

                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod ===
                    "card"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod ===
                        "card"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <CreditCard
                        size={19}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Credit / Debit Card
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Visa, Mastercard
                        and RuPay
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod ===
                      "card"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod ===
                      "card" && (
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
                    setPaymentMethod(
                      "netbanking"
                    );

                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod ===
                    "netbanking"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod ===
                        "netbanking"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <WalletCards
                        size={19}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Net Banking
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay directly from
                        your bank account
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod ===
                      "netbanking"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod ===
                      "netbanking" && (
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
                    setPaymentMethod(
                      "wallet"
                    );

                    setErrors({});
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    paymentMethod ===
                    "wallet"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod ===
                        "wallet"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <WalletCards
                        size={19}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Wallets
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay using supported
                        digital wallets
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod ===
                      "wallet"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {paymentMethod ===
                      "wallet" && (
                      <Check
                        size={13}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>
              </div>

              {/* =================================================
                  UPI
              ================================================== */}

              {paymentMethod ===
                "upi" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-bold text-slate-900">
                      Pay with UPI
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Razorpay will open
                      the secure UPI
                      payment window.
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
                      onChange={(
                        event
                      ) => {
                        setUpiId(
                          event.target
                            .value
                        );

                        setErrors(
                          (
                            previous
                          ) => ({
                            ...previous,
                            upiId:
                              "",
                            payment:
                              "",
                          })
                        );
                      }}
                      placeholder="example@upi"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    This field is for UI
                    preference only. Razorpay
                    will securely collect the
                    actual payment information.
                  </p>

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />

                    <span className="text-xs font-medium text-slate-400">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-7">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <QrCode
                        size={34}
                      />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      Scan to Pay
                    </p>

                    <p className="mt-1 px-5 text-center text-xs text-slate-500">
                      Razorpay Checkout will
                      provide the available
                      payment options.
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  CARD
              ================================================== */}

              {paymentMethod ===
                "card" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-5">
                    <h3 className="text-base font-bold text-slate-900">
                      Card Payment
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your card details will
                      be collected securely by
                      Razorpay Checkout.
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard
                        size={20}
                        className="mt-0.5 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-bold text-blue-800">
                          Secure Card Payment
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                          Click the Pay button
                          below. Razorpay will
                          open a secure checkout
                          where you can enter your
                          card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  NET BANKING
              ================================================== */}

              {paymentMethod ===
                "netbanking" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-slate-900">
                    Net Banking
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Razorpay will show the
                    supported banks during
                    checkout.
                  </p>

                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <WalletCards
                        size={20}
                        className="text-blue-600"
                      />

                      <p className="text-sm font-semibold text-blue-800">
                        Bank selection will
                        open inside Razorpay.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  WALLET
              ================================================== */}

              {paymentMethod ===
                "wallet" && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-slate-900">
                    Wallet Payment
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Razorpay will display the
                    wallets currently available
                    for your transaction.
                  </p>

                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <WalletCards
                        size={20}
                        className="text-blue-600"
                      />

                      <p className="text-sm font-semibold text-blue-800">
                        Wallet selection will
                        open inside Razorpay.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  SECURITY
              ================================================== */}

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                  <ShieldCheck
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Your payment is
                    secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Your payment details
                    are securely processed
                    by Razorpay.
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
                    checked={
                      agreeTerms
                    }
                    onChange={(
                      event
                    ) => {
                      setAgreeTerms(
                        event.target
                          .checked
                      );

                      setErrors(
                        (
                          previous
                        ) => ({
                          ...previous,
                          terms:
                            "",
                          payment:
                            "",
                        })
                      );
                    }}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I agree to
                    Tripora's{" "}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/termsandconditions"
                        )
                      }
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms &
                      Conditions
                    </button>{" "}
                    and payment
                    policies.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {
                      errors.terms
                    }
                  </p>
                )}
              </div>

              {/* =================================================
                  DESKTOP PAY BUTTON
              ================================================== */}

              <button
                type="submit"
                disabled={
                  isProcessing ||
                  !razorpayLoaded
                }
                className="mt-6 hidden w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:flex"
              >
                {isProcessing
                  ? "Processing Payment..."
                  : !razorpayLoaded
                  ? "Loading Payment..."
                  : `Pay ₹${formatPrice(
                      totalPrice
                    )}`}

                {!isProcessing &&
                  razorpayLoaded && (
                    <ArrowRight
                      size={17}
                    />
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
                    <LockKeyhole
                      size={17}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Secure Checkout
                    </p>

                    <p className="text-xs text-slate-500">
                      Protected payment
                      experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2
                      size={17}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Instant Confirmation
                    </p>

                    <p className="text-xs text-slate-500">
                      Get booking
                      confirmation quickly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Clock3
                      size={17}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      24/7 Support
                    </p>

                    <p className="text-xs text-slate-500">
                      We're always here
                      to help
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Phone
                      size={17}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Booking Support
                    </p>

                    <p className="text-xs text-slate-500">
                      Help whenever you
                      need it
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================== */}

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                      hotel.images?.[0] ||
                      fallbackHotel.image
                    }
                    alt={
                      hotel.name ||
                      hotel.hotelName ||
                      "Hotel"
                    }
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-900">
                      {hotel.name ||
                        hotel.hotelName ||
                        fallbackHotel.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                        <Star
                          size={12}
                          fill="currentColor"
                        />

                        {hotel.rating ||
                          hotel.guestRating ||
                          4.6}
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
                          [
                            hotel.city,
                            hotel.state,
                            hotel.country,
                          ]
                            .filter(Boolean)
                            .join(", ") ||
                          fallbackHotel.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates */}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays
                        size={14}
                      />

                      Check-in
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(
                        checkIn
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays
                        size={14}
                      />

                      Check-out
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(
                        checkOut
                      )}
                    </p>
                  </div>
                </div>

                {/* Guests */}

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock3
                      size={14}
                    />

                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User
                      size={14}
                    />

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
                      ₹
                      {formatPrice(
                        roomPrice
                      )}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2
                        size={14}
                      />

                      {selectedRoom.meal ||
                        fallbackRoom.meal}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle2
                        size={14}
                      />

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
                      {
                        guestDetails.firstName
                      }{" "}
                      {
                        guestDetails.lastName
                      }
                    </p>

                    {guestDetails.email && (
                      <p className="mt-1 text-xs text-slate-500">
                        {
                          guestDetails.email
                        }
                      </p>
                    )}
                  </div>
                )}

                {/* Price */}

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      Room ₹
                      {formatPrice(
                        roomPrice
                      )}{" "}
                      × {nights}{" "}
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
                    <span>
                      Taxes & Fees
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹
                      {formatPrice(
                        taxes
                      )}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Total Amount
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Inclusive of
                          applicable taxes
                        </p>
                      </div>

                      <p className="text-xl font-extrabold text-blue-600">
                        ₹
                        {formatPrice(
                          totalPrice
                        )}
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
                        Cancellation policy
                        depends on the
                        selected room and
                        hotel.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Pay */}

                <button
                  type="button"
                  onClick={
                    handlePayment
                  }
                  disabled={
                    isProcessing ||
                    !razorpayLoaded
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
                >
                  {isProcessing
                    ? "Processing Payment..."
                    : !razorpayLoaded
                    ? "Loading Payment..."
                    : `Pay ₹${formatPrice(
                        totalPrice
                      )}`}

                  {!isProcessing &&
                    razorpayLoaded && (
                      <ArrowRight
                        size={17}
                      />
                    )}
                </button>

                <div className="mt-4 flex items-start gap-2">
                  <LockKeyhole
                    size={14}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <p className="text-[11px] leading-4 text-slate-400">
                    Your payment is
                    processed securely
                    through Razorpay. You
                    will receive your booking
                    confirmation after
                    successful payment.
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
              Please wait while we
              process your payment. Do
              not close or refresh this
              page.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS STATE
      ====================================================== */}

      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2
                size={34}
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Payment Successful
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your payment has been
              verified successfully.
              Redirecting to your booking
              confirmation...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPayment;