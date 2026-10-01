import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowRight,
  BadgePercent,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Crown,
  Gift,
  Globe2,
  Hotel,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  TicketPercent,
  Timer,
  Users,
  Wallet,
  BusFront,
  TrainFront,
  X,
} from "lucide-react";

// import { getAllOfffer } from "../redux/slicer/offerSlice";
import { getAllOffers, getClientOffers } from "../redux/slicer/offferSlice";

/* =========================================================
   OFFER CATEGORIES
========================================================= */

const offerCategories = [
  {
    id: "all",
    backendValue: "all",
    label: "All Offers",
    icon: Sparkles,
  },
  {
    id: "flights",
    backendValue: "Flight",
    label: "Flights",
    icon: Plane,
  },
  {
    id: "hotels",
    backendValue: "Hotel",
    label: "Hotels",
    icon: Hotel,
  },
  {
    id: "holidays",
    backendValue: "Package",
    label: "Holidays",
    icon: Globe2,
  },
  {
    id: "trains",
    backendValue: "Train",
    label: "Trains",
    icon: TrainFront,
  },
  {
    id: "buses",
    backendValue: "Bus",
    label: "Buses",
    icon: BusFront,
  },
  {
    id: "cabs",
    backendValue: "Cab",
    label: "Cabs",
    icon: Wallet,
  },
];

/* =========================================================
   HOW IT WORKS - STATIC INFORMATION
========================================================= */

const howItWorks = [
  {
    number: "01",
    icon: Search,
    title: "Find an Offer",
    text: "Choose flights, hotels, holidays, trains, buses or cabs and explore the latest deals.",
  },
  {
    number: "02",
    icon: TicketPercent,
    title: "Claim Your Deal",
    text: "Copy the coupon code and apply it during your eligible booking.",
  },
  {
    number: "03",
    icon: Plane,
    title: "Travel & Save",
    text: "Complete your booking and enjoy your trip with extra savings.",
  },
];

/* =========================================================
   WHY TRIPORA - STATIC INFORMATION
========================================================= */

const whyTripora = [
  {
    icon: BadgePercent,
    title: "Verified Offers",
    text: "Every featured deal is checked before being shown to travellers.",
  },
  {
    icon: Wallet,
    title: "Best Price",
    text: "Compare available deals and get competitive prices for your next trip.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    text: "Your booking and payment experience stays safe and reliable.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    text: "Get travel assistance whenever you need help.",
  },
];

/* =========================================================
   OFFER INFORMATION
========================================================= */

const offerInfo = [
  {
    title: "Can I use more than one coupon?",
    text: "Usually one promotional coupon can be applied per booking unless the offer specifically says otherwise.",
  },
  {
    title: "How long are these offers valid?",
    text: "Every offer has its own validity period. Check the offer card and applicable terms before booking.",
  },
  {
    title: "Are all destinations eligible?",
    text: "Eligibility depends on the specific offer, route, hotel, destination and travel dates.",
  },
  {
    title: "Can I cancel an offer booking?",
    text: "Cancellation depends on the fare, hotel or package cancellation policy associated with your booking.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {
  if (!date) return "Limited period";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Limited period";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatValidity = (validFrom, validUntil) => {
  if (!validFrom && !validUntil) {
    return "Limited period";
  }

  if (validFrom && validUntil) {
    return `${formatDate(validFrom)} - ${formatDate(validUntil)}`;
  }

  if (validUntil) {
    return `Valid till ${formatDate(validUntil)}`;
  }

  return `Valid from ${formatDate(validFrom)}`;
};

const getCategoryLabel = (category) => {
  const item = offerCategories.find(
    (item) => item.backendValue === category
  );

  return item?.label || category || "Offer";
};

const getFrontendCategory = (category) => {
  const categoryMap = {
    Flight: "flights",
    Hotel: "hotels",
    Package: "holidays",
    Train: "trains",
    Bus: "buses",
    Cab: "cabs",
  };

  return categoryMap[category] || "other";
};

const getDiscountLabel = (offer) => {
  if (!offer?.discountType) {
    return "SPECIAL OFFER";
  }

  if (
    offer.discount !== undefined &&
    offer.discount !== null &&
    offer.discount !== ""
  ) {
    if (offer.discountType === "FLAT") {
      return `₹${Number(offer.discount).toLocaleString("en-IN")} OFF`;
    }

    return `${offer.discount}% OFF`;
  }

  return offer.discountType;
};

const getOfferFeatures = (offer) => {
  const features = [];

  if (offer?.featured) {
    features.push("Featured");
  }

  features.push("Verified Offer");
  features.push("Easy Booking");

  if (offer?.limit !== undefined && offer?.limit !== null) {
    features.push(`${offer.limit} Uses`);
  }

  return features.slice(0, 3);
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Offers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    clientOffers = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.offer);

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState("");
  const [openInfo, setOpenInfo] = useState(null);
  const [showAllDeals, setShowAllDeals] = useState(false);

  /* =========================================================
     GET OFFERS FROM BACKEND
  ========================================================= */

  useEffect(() => {
    dispatch(getClientOffers());
  }, [dispatch]);

  /* =========================================================
     NORMALIZE BACKEND DATA
  ========================================================= */

  const normalizedOffers = useMemo(() => {
    return (clientOffers || []).map((offer) => {
      const frontendCategory = getFrontendCategory(offer.category);

      return {
        id: offer._id || offer.id,

        title: offer.title || "Travel Offer",

        category: frontendCategory,

        backendCategory: offer.category || "",

        description: offer.description || "",

        coupon: offer.couponCode || "",

        image:
          offer.image ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",

        discount: offer.discount,

        discountType: offer.discountType || "",

        badge: getDiscountLabel(offer),

        validity: formatValidity(
          offer.validFrom,
          offer.validUntil
        ),

        validFrom: offer.validFrom,

        validUntil: offer.validUntil,

        status: offer.status,

        featured: Boolean(offer.featured),

        usage: offer.usage || 0,

        limit: offer.limit || 0,

        features: getOfferFeatures(offer),
      };
    });
  }, [clientOffers]);

  /* =========================================================
     FILTER OFFERS
  ========================================================= */

  const filteredDeals = useMemo(() => {
    let data = [...normalizedOffers];

    if (activeCategory !== "all") {
      data = data.filter(
        (item) => item.category === activeCategory
      );
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      data = data.filter((item) => {
        const searchableText = [
          item.title,
          item.description,
          item.category,
          item.backendCategory,
          item.coupon,
          item.discountType,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    return data;
  }, [normalizedOffers, activeCategory, search]);

  /* =========================================================
     VISIBLE DEALS
  ========================================================= */

  const visibleDeals = showAllDeals
    ? filteredDeals
    : filteredDeals.slice(0, 6);

  /* =========================================================
     FEATURED / FLASH DEALS
  ========================================================= */

  const featuredOffers = useMemo(() => {
    return normalizedOffers.filter((offer) => offer.featured);
  }, [normalizedOffers]);

  /* =========================================================
     CATEGORY OFFERS
  ========================================================= */

  const flightOffers = useMemo(() => {
    return normalizedOffers.filter(
      (offer) => offer.category === "flights"
    );
  }, [normalizedOffers]);

  const hotelOffers = useMemo(() => {
    return normalizedOffers.filter(
      (offer) => offer.category === "hotels"
    );
  }, [normalizedOffers]);

  const holidayOffers = useMemo(() => {
    return normalizedOffers.filter(
      (offer) => offer.category === "holidays"
    );
  }, [normalizedOffers]);

  /* =========================================================
     COPY COUPON
  ========================================================= */

  const handleCopy = async (code) => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  /* =========================================================
     CLAIM OFFER
  ========================================================= */

  const handleClaim = (offer) => {
    if (!offer) return;

    switch (offer.category) {
      case "flights":
        navigate("/flights");
        return;

      case "hotels":
        navigate("/hotels");
        return;

      case "holidays":
        navigate("/packages");
        return;

      case "trains":
        navigate("/trains");
        return;

      case "buses":
        navigate("/buses");
        return;

      case "cabs":
        navigate("/cabs");
        return;

      default:
        navigate("/offers");
    }
  };

  /* =========================================================
     SCROLL TO DEALS
  ========================================================= */

  const scrollToDeals = () => {
    document.getElementById("best-deals")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================================
     ERROR
  ========================================================= */

  useEffect(() => {
    if (error) {
      console.error("Offer API Error:", error);
    }
  }, [error]);

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45" />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200 backdrop-blur">
              <Sparkles size={13} />
              Tripora Exclusive Offers
            </div>

            <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Travel More.
              <span className="block text-blue-400">
                Pay Less.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Discover exclusive flight, hotel, holiday, train,
              bus and cab deals designed to make your next journey
              more affordable.
            </p>

            {/* Search */}

            <div className="mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search offers, destinations or coupons..."
                  className="w-full bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={scrollToDeals}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Explore Deals
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust badges */}

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                <ShieldCheck
                  size={13}
                  className="text-emerald-400"
                />
                Verified Offers
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                <BadgePercent
                  size={13}
                  className="text-amber-400"
                />
                Best Price Deals
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                <Timer
                  size={13}
                  className="text-blue-400"
                />
                Limited Time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY TABS
      ====================================================== */}

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2 scrollbar-hide sm:px-6 lg:px-8">
          <div className="flex min-w-max gap-2">

            {offerCategories.map((category) => {
              const Icon = category.icon;
              const isActive =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category.id)
                  }
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={14} />
                  {category.label}
                </button>
              );
            })}

          </div>
        </div>
      </section>

      <main>

        {/* =====================================================
            BEST DEALS
        ====================================================== */}

        <section
          id="best-deals"
          className="scroll-mt-6 bg-slate-50 py-4 sm:py-4 lg:py-4"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="TODAY'S BEST DEALS"
              title="Deals you don't want to miss"
              description="Grab limited-time offers before they disappear."
            />

            {loading ? (
              <LoadingOffers />
            ) : visibleDeals.length > 0 ? (
              <>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {visibleDeals.map((offer) => (
                    <BestDealCard
                      key={offer.id}
                      offer={offer}
                      copiedCode={copiedCode}
                      onCopy={handleCopy}
                      onClaim={handleClaim}
                    />
                  ))}

                </div>

                {filteredDeals.length > 6 && (
                  <div className="mt-7 flex justify-center">

                    <button
                      type="button"
                      onClick={() =>
                        setShowAllDeals((prev) => !prev)
                      }
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                    >
                      {showAllDeals
                        ? "Show Less"
                        : "View All Deals"}

                      {showAllDeals ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}
                    </button>

                  </div>
                )}
              </>
            ) : (
              <EmptyDeals
                message={
                  search
                    ? "Try another destination, coupon or offer category."
                    : "There are no active offers available right now."
                }
              />
            )}

          </div>
        </section>

        {/* =====================================================
            FLASH / FEATURED DEALS
        ====================================================== */}

        <section className="bg-slate-950 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-400">
                  <Timer size={13} />
                  Featured Deals
                </div>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Featured offers from Tripora
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
                  Explore the offers currently highlighted by
                  Tripora.
                </p>
              </div>

              <div className="flex items-center gap-2">

                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                  <p className="text-lg font-black text-white">
                    {String(featuredOffers.length).padStart(
                      2,
                      "0"
                    )}
                  </p>

                  <p className="text-[8px] uppercase text-slate-500">
                    Offers
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                  <p className="text-lg font-black text-white">
                    {String(normalizedOffers.length).padStart(
                      2,
                      "0"
                    )}
                  </p>

                  <p className="text-[8px] uppercase text-slate-500">
                    Total
                  </p>
                </div>

              </div>
            </div>

            {featuredOffers.length > 0 ? (
              <div className="mt-7 grid gap-4 md:grid-cols-3">

                {featuredOffers
                  .slice(0, 3)
                  .map((offer) => (
                    <FlashDealCard
                      key={offer.id}
                      deal={offer}
                      onClick={() =>
                        handleClaim(offer)
                      }
                    />
                  ))}

              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 px-5 py-10 text-center">
                <Sparkles
                  size={24}
                  className="mx-auto text-slate-500"
                />

                <p className="mt-3 text-sm font-semibold text-slate-300">
                  No featured offers available
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Featured offers will appear here when available.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            FLIGHT OFFERS
        ====================================================== */}

        <section className="py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="FLIGHT OFFERS"
              title="Fly farther for less"
              description="Explore the latest flight offers available on Tripora."
            />

            {flightOffers.length > 0 ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {flightOffers.slice(0, 4).map((offer) => (
                  <FlightOfferCard
                    key={offer.id}
                    offer={offer}
                    onClick={() => handleClaim(offer)}
                    onCopy={handleCopy}
                    copiedCode={copiedCode}
                  />
                ))}

              </div>
            ) : (
              <CategoryEmpty
                category="flight"
              />
            )}

          </div>
        </section>

        {/* =====================================================
            HOTEL OFFERS
        ====================================================== */}

        <section className="bg-slate-50 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="HOTEL OFFERS"
              title="Stay better. Save more."
              description="Explore hotel and resort offers available on Tripora."
            />

            {hotelOffers.length > 0 ? (
              <div className="mt-7 grid gap-4 md:grid-cols-3">

                {hotelOffers.slice(0, 3).map((offer) => (
                  <HotelOfferCard
                    key={offer.id}
                    offer={offer}
                    onClick={() => handleClaim(offer)}
                  />
                ))}

              </div>
            ) : (
              <CategoryEmpty
                category="hotel"
              />
            )}

          </div>
        </section>

        {/* =====================================================
            HOLIDAY PACKAGES
        ====================================================== */}

        <section className="py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="HOLIDAY PACKAGE OFFERS"
              title="Your dream holiday, now for less"
              description="Explore holiday package offers available on Tripora."
            />

            {holidayOffers.length > 0 ? (
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {holidayOffers
                  .slice(0, 4)
                  .map((offer) => (
                    <HolidayOfferCard
                      key={offer.id}
                      offer={offer}
                      onClick={() =>
                        handleClaim(offer)
                      }
                    />
                  ))}

              </div>
            ) : (
              <CategoryEmpty
                category="holiday"
              />
            )}

          </div>
        </section>

        {/* =====================================================
            COUPONS
        ====================================================== */}

        <section className="bg-blue-50 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <SectionHeading
                eyebrow="EXCLUSIVE COUPONS"
                title="Extra savings with Tripora"
                description="Copy a coupon and apply it during your eligible booking."
              />

              <div className="hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm sm:flex">
                <Gift size={15} />
                More savings inside
              </div>

            </div>

            {normalizedOffers.length > 0 ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {normalizedOffers
                  .filter((offer) => offer.coupon)
                  .slice(0, 4)
                  .map((offer) => (
                    <CouponCard
                      key={offer.id}
                      coupon={offer}
                      copiedCode={copiedCode}
                      onCopy={handleCopy}
                    />
                  ))}

              </div>
            ) : (
              <CategoryEmpty
                category="coupon"
              />
            )}

          </div>
        </section>

        {/* =====================================================
            OFFER CATEGORIES
        ====================================================== */}

        <section className="py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="EXPLORE OFFERS"
              title="Choose your way to save"
              description="Find the right deal for every part of your journey."
            />

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

              {offerCategories
                .filter((category) => category.id !== "all")
                .map((category) => {
                  const Icon = category.icon;

                  const count =
                    normalizedOffers.filter(
                      (offer) =>
                        offer.category === category.id
                    ).length;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.id);
                        scrollToDeals();
                      }}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={18} />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-900">
                        {category.label}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-1 text-[10px] font-bold text-blue-600">

                        <span>
                          {count}{" "}
                          {count === 1
                            ? "Offer"
                            : "Offers"}
                        </span>

                        <ArrowRight size={12} />

                      </div>
                    </button>
                  );
                })}

            </div>

          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="bg-slate-50 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Save in three simple steps"
              description="Getting your Tripora deal is quick and easy."
              centered
            />

            <div className="relative mt-8 grid gap-4 md:grid-cols-3">

              {howItWorks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="relative rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <Icon size={20} />
                    </div>

                    <span className="mt-4 block text-[10px] font-black uppercase tracking-widest text-blue-600">
                      Step {item.number}
                    </span>

                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>

                    {index < howItWorks.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white text-blue-500 md:block"
                      />
                    )}
                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* =====================================================
            WHY TRIPORA
        ====================================================== */}

        <section className="py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionHeading
              eyebrow="WHY TRIPORA"
              title="Deals you can travel with confidence"
              description="We make finding and booking travel deals simple, transparent and secure."
            />

            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

              {whyTripora.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900 sm:text-base">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                      {item.text}
                    </p>
                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* =====================================================
            TERMS / INFORMATION
        ====================================================== */}

        <section className="bg-slate-50 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                <ShieldCheck size={13} />
                Offer Information
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Know before you book
              </h2>

              <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                A few important things to keep in mind before claiming an offer.
              </p>

            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">

              {offerInfo.map((item, index) => {
                const isOpen = openInfo === index;

                return (
                  <div
                    key={item.title}
                    className={
                      index !== offerInfo.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenInfo(
                          isOpen ? null : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                    >
                      <span className="text-xs font-bold text-slate-800 sm:text-sm">
                        {item.title}
                      </span>

                      {isOpen ? (
                        <ChevronUp
                          size={16}
                          className="shrink-0 text-blue-600"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="shrink-0 text-slate-400"
                        />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5">
                        <p className="text-xs leading-5 text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="bg-blue-600 py-6 sm:py-6 lg:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-3xl bg-blue-700 px-5 py-8 text-center sm:px-8 sm:py-10">

              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="relative">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Crown size={22} />
                </div>

                <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Don't Miss Your Next Great Deal
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-blue-100 sm:text-sm">
                  Find the perfect flight, hotel or holiday
                  package and unlock exclusive Tripora savings.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">

                  <button
                    type="button"
                    onClick={scrollToDeals}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    Explore All Deals
                    <ArrowRight size={15} />
                  </button>

                  <Link
                    to="/packages"
                    className="flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
                  >
                    Explore Packages
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div className={centered ? "text-center" : ""}>

      <div
        className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 ${
          centered ? "justify-center" : ""
        }`}
      >
        <Sparkles size={12} />
        {eyebrow}
      </div>

      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      <p
        className={`mt-2 text-xs leading-5 text-slate-500 sm:text-sm ${
          centered
            ? "mx-auto max-w-xl"
            : "max-w-xl"
        }`}
      >
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   BEST DEAL CARD
========================================================= */

function BestDealCard({
  offer,
  copiedCode,
  onCopy,
  onClaim,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative h-48 overflow-hidden sm:h-52">

        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1 text-[10px] font-black text-white shadow-lg">
          {offer.badge}
        </div>

        <div className="absolute right-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-[9px] font-bold text-slate-700 shadow">
          {getCategoryLabel(offer.backendCategory)}
        </div>

        <div className="absolute bottom-3 left-3 right-3">

          <p className="text-[10px] font-medium text-white/80">
            {offer.backendCategory}
          </p>

          <h3 className="mt-0.5 text-lg font-black text-white">
            {offer.title}
          </h3>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">

            <p className="text-[10px] text-slate-400">
              Offer Details
            </p>

            <p className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-800">
              {offer.description || "Exclusive Tripora offer"}
            </p>

          </div>

          <div className="shrink-0 text-right">

            <p className="text-[9px] text-slate-400">
              Validity
            </p>

            <p className="mt-0.5 max-w-[110px] text-[10px] font-bold text-slate-700">
              {offer.validity}
            </p>

          </div>

        </div>

        {/* FEATURES */}

        <div className="mt-3 grid grid-cols-3 gap-1.5">

          {offer.features.map((feature) => (
            <div
              key={feature}
              className="rounded-lg bg-slate-50 px-1.5 py-1.5 text-center text-[8px] font-semibold text-slate-500"
            >
              {feature}
            </div>
          ))}

        </div>

        {/* COUPON */}

        {offer.coupon && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 px-3 py-2">

            <div className="min-w-0">

              <p className="text-[8px] uppercase tracking-wide text-slate-400">
                Coupon
              </p>

              <p className="truncate text-[11px] font-black tracking-wide text-blue-700">
                {offer.coupon}
              </p>

            </div>

            <button
              type="button"
              onClick={() => onCopy(offer.coupon)}
              className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-[9px] font-bold text-blue-600 shadow-sm"
            >
              {copiedCode === offer.coupon ? (
                <>
                  <Check size={11} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={11} />
                  Copy
                </>
              )}
            </button>

          </div>
        )}

        {/* CLAIM */}

        <button
          type="button"
          onClick={() => onClaim(offer)}
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white transition hover:bg-blue-700"
        >
          Claim Offer
          <ArrowRight size={14} />
        </button>

      </div>
    </article>
  );
}

/* =========================================================
   FLASH DEAL CARD
========================================================= */

function FlashDealCard({ deal, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative min-h-[230px] overflow-hidden rounded-2xl text-left"
    >

      <img
        src={deal.image}
        alt={deal.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1 text-[10px] font-black text-white">
        {deal.badge}
      </div>

      <div className="absolute right-3 top-3 rounded-lg bg-white/95 px-2 py-1 text-[9px] font-bold text-slate-700">
        {deal.backendCategory}
      </div>

      <div className="absolute bottom-4 left-4 right-4">

        <p className="text-[10px] font-medium text-slate-300">
          Featured Offer
        </p>

        <h3 className="mt-1 text-lg font-black text-white">
          {deal.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-slate-300">
          {deal.description}
        </p>

        <div className="mt-3 flex items-center justify-between">

          <div>

            <p className="text-[9px] text-slate-400">
              Validity
            </p>

            <p className="text-xs font-black text-white">
              {deal.validity}
            </p>

          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600">
            <ArrowRight size={15} />
          </span>

        </div>

      </div>
    </button>
  );
}

/* =========================================================
   FLIGHT OFFER CARD
========================================================= */

function FlightOfferCard({
  offer,
  onClick,
  onCopy,
  copiedCode,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <span className="rounded-lg bg-red-50 px-2 py-1 text-[9px] font-black text-red-600">
          {offer.badge}
        </span>

        <Plane
          size={17}
          className="text-blue-600"
        />

      </div>

      <div className="mt-5">

        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          Flight Offer
        </p>

        <h3 className="mt-1 text-lg font-black text-slate-900">
          {offer.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
          {offer.description}
        </p>

      </div>

      <div className="mt-5 border-t border-slate-100 pt-3">

        <div className="flex items-end justify-between">

          <div>

            <span className="text-[9px] text-slate-400">
              Validity
            </span>

            <p className="text-xs font-black text-blue-600">
              {offer.validity}
            </p>

          </div>

          <button
            type="button"
            onClick={onClick}
            className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white hover:bg-blue-700"
          >
            View Flights
          </button>

        </div>

        {offer.coupon && (
          <button
            type="button"
            onClick={() => onCopy(offer.coupon)}
            className="mt-3 flex w-full items-center justify-between rounded-lg border border-dashed border-blue-200 bg-blue-50 px-2.5 py-2"
          >
            <span className="text-[9px] text-slate-500">
              Coupon
            </span>

            <span className="flex items-center gap-1 text-[9px] font-black text-blue-700">
              {offer.coupon}

              {copiedCode === offer.coupon ? (
                <Check size={11} />
              ) : (
                <Copy size={11} />
              )}
            </span>
          </button>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   HOTEL OFFER CARD
========================================================= */

function HotelOfferCard({ offer, onClick }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="relative h-52 overflow-hidden">

        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

        <span className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1 text-[9px] font-black text-white">
          {offer.badge}
        </span>

        <div className="absolute bottom-3 left-3 right-3">

          <div className="flex items-end justify-between gap-2">

            <div>

              <p className="text-[10px] text-white/70">
                Hotel Offer
              </p>

              <h3 className="mt-0.5 text-base font-black text-white">
                {offer.title}
              </h3>

            </div>

            <div className="rounded-lg bg-white/95 px-2 py-1 text-[9px] font-bold text-slate-800">
              {offer.discountType || "OFFER"}
            </div>

          </div>

        </div>

      </div>

      <div className="p-4">

        <p className="line-clamp-2 text-xs leading-5 text-slate-500">
          {offer.description}
        </p>

        <div className="mt-3 flex items-end justify-between">

          <div>

            <p className="text-[9px] text-slate-400">
              Validity
            </p>

            <p className="text-xs font-black text-blue-600">
              {offer.validity}
            </p>

          </div>

          <span className="text-[9px] font-bold text-slate-400">
            {offer.coupon
              ? offer.coupon
              : "No coupon"}
          </span>

        </div>

        <button
          type="button"
          onClick={onClick}
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700"
        >
          View Hotels
          <ArrowRight size={14} />
        </button>

      </div>
    </article>
  );
}

/* =========================================================
   HOLIDAY OFFER CARD
========================================================= */

function HolidayOfferCard({ offer, onClick }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="relative h-48 overflow-hidden">

        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1 text-[9px] font-black text-white">
          {offer.badge}
        </span>

        <div className="absolute bottom-3 left-3">

          <p className="text-[10px] text-white/75">
            Package Offer
          </p>

          <h3 className="mt-0.5 text-base font-black text-white">
            {offer.title}
          </h3>

        </div>

      </div>

      <div className="p-4">

        <p className="line-clamp-2 text-xs leading-5 text-slate-500">
          {offer.description}
        </p>

        <div className="mt-3 flex items-end justify-between">

          <div>

            <p className="text-[9px] text-slate-400">
              Validity
            </p>

            <p className="text-xs font-black text-blue-600">
              {offer.validity}
            </p>

          </div>

          <span className="text-[9px] font-black text-slate-400">
            {offer.coupon || "Special Offer"}
          </span>

        </div>

        <button
          type="button"
          onClick={onClick}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[10px] font-bold text-white hover:bg-blue-700"
        >
          View Package
          <ArrowRight size={13} />
        </button>

      </div>
    </article>
  );
}

/* =========================================================
   COUPON CARD
========================================================= */

function CouponCard({
  coupon,
  copiedCode,
  onCopy,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">

      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-50" />

      <div className="relative">

        <div className="flex items-start justify-between gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Tag size={17} />
          </div>

          <span className="rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-black text-blue-700">
            {coupon.backendCategory}
          </span>

        </div>

        <h3 className="mt-4 text-sm font-black text-slate-900">
          {coupon.title}
        </h3>

        <p className="mt-1.5 min-h-[40px] text-[10px] leading-4 text-slate-500">
          {coupon.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 p-2">

          <div>

            <p className="text-[8px] uppercase tracking-wide text-slate-400">
              Use code
            </p>

            <p className="text-sm font-black tracking-wide text-blue-700">
              {coupon.coupon}
            </p>

          </div>

          <button
            type="button"
            onClick={() => onCopy(coupon.coupon)}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-2 text-[9px] font-bold text-white hover:bg-blue-700"
          >
            {copiedCode === coupon.coupon ? (
              <>
                <Check size={11} />
                Copied
              </>
            ) : (
              <>
                <Copy size={11} />
                Copy
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   CATEGORY EMPTY
========================================================= */

function CategoryEmpty({ category }) {
  return (
    <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Tag size={20} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-800">
        No {category} offers available
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        New offers will appear here when they are added.
      </p>

    </div>
  );
}

/* =========================================================
   EMPTY DEALS
========================================================= */

function EmptyDeals({
  message = "Try another destination, coupon or offer category.",
}) {
  return (
    <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Search size={20} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-800">
        No offers found
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {message}
      </p>

    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingOffers() {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-52 animate-pulse bg-slate-200" />

          <div className="space-y-3 p-4">

            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />

            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />

            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />

          </div>
        </div>
      ))}

    </div>
  );
}