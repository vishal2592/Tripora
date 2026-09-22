
import React, { useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Clock3,
  Copy,
  Hotel,
  Plane,
  Sparkles,
  Ticket,
  Car,
  Luggage,
} from "lucide-react";

const offers = [
  {
    id: 1,
    category: "Flights",
    icon: Plane,
    title: "Fly to your next adventure",
    subtitle: "Domestic & international flights",
    discount: "₹3,000",
    discountText: "OFF",
    code: "FLY3000",
    minBooking: "on bookings above ₹12,000",
    validity: "Ends tonight",
    background:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 2,
    category: "Hotels",
    icon: Hotel,
    title: "Stay somewhere amazing",
    subtitle: "Hotels & resorts across the world",
    discount: "25%",
    discountText: "OFF",
    code: "STAY25",
    minBooking: "on selected properties",
    validity: "Ends in 2 days",
    background:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 3,
    category: "Holidays",
    icon: Luggage,
    title: "Your perfect holiday awaits",
    subtitle: "Handpicked holiday packages",
    discount: "40%",
    discountText: "OFF",
    code: "TRAVEL40",
    minBooking: "on selected packages",
    validity: "Limited period",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 4,
    category: "Cabs",
    icon: Car,
    title: "Ride more, pay less",
    subtitle: "Airport transfers & city rides",
    discount: "₹500",
    discountText: "OFF",
    code: "CAB500",
    minBooking: "on your first ride",
    validity: "Ends in 3 days",
    background:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=85",
  },
];

const ExclusiveDeals = () => {
  const [activeOffer, setActiveOffer] = useState(offers[0]);
  const [copied, setCopied] = useState(false);

  const Icon = activeOffer.icon;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(activeOffer.code);
      }
    } catch (error) {
      console.log("Copy failed:", error);
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <section className="bg-slate-50 py-5 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                <Sparkles size={12} />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
                Save on your journey
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Exclusive Deals & Offers
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Unlock special savings on your next adventure.
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1 text-[11px] font-bold text-blue-600 transition hover:text-blue-700 sm:flex"
          >
            View all offers
            <ArrowRight size={13} />
          </button>
        </div>

        {/* =====================================================
            MAIN PROMOTION
        ====================================================== */}
        <div className="grid overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm lg:grid-cols-12">

          {/* =================================================
              LEFT PROMOTIONAL IMAGE
          ================================================== */}
          <div className="relative min-h-[270px] overflow-hidden sm:min-h-[290px] lg:col-span-8 lg:min-h-[310px]">

            <img
              src={activeOffer.background}
              alt={activeOffer.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/15" />

            {/* Top label */}
            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <BadgePercent size={10} />
                Limited time offer
              </span>
            </div>

            {/* Main content */}
            <div className="relative flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">

              <div className="max-w-md">

                {/* Category */}
                <div className="mb-2 flex items-center gap-2 text-white/70">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 backdrop-blur">
                    <Icon size={14} />
                  </div>

                  <span className="text-[11px] font-semibold">
                    {activeOffer.category}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-[34px]">
                  {activeOffer.title}
                </h3>

                <p className="mt-1.5 text-xs text-white/70 sm:text-sm">
                  {activeOffer.subtitle}
                </p>

                {/* Discount */}
                <div className="mt-3.5 flex items-center gap-3">

                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-wider text-white/50">
                      Get
                    </p>

                    <p className="text-2xl font-extrabold text-white sm:text-3xl">
                      {activeOffer.discount}
                    </p>
                  </div>

                  <div className="h-8 w-px bg-white/20" />

                  <div>
                    <p className="text-base font-extrabold text-white">
                      {activeOffer.discountText}
                    </p>

                    <p className="text-[9px] text-white/50">
                      {activeOffer.minBooking}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-slate-900 transition hover:bg-blue-600 hover:text-white"
                >
                  Book now
                  <ArrowRight size={12} />
                </button>

              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT COUPON PANEL
          ================================================== */}
          <div className="relative flex flex-col justify-between bg-white p-4 sm:p-5 lg:col-span-4">

            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-50" />

            <div className="relative">

              {/* Header */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                    Today's deal
                  </p>

                  <h4 className="mt-0.5 text-base font-bold text-slate-900">
                    Special savings
                  </h4>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Ticket size={15} />
                </div>
              </div>

              {/* Coupon */}
              <div className="relative mt-4 overflow-hidden rounded-xl border border-blue-100 bg-blue-50/60">

                {/* Ticket circles */}
                <div className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-blue-100 bg-white" />

                <div className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-blue-100 bg-white" />

                <div className="p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-[9px] font-medium text-slate-400">
                        Coupon
                      </p>

                      <p className="mt-0.5 text-xl font-extrabold text-blue-600">
                        {activeOffer.discount}

                        <span className="ml-1 text-xs">
                          {activeOffer.discountText}
                        </span>
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                      <BadgePercent size={15} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-dashed border-blue-200" />

                  {/* Code */}
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">
                    Use promo code
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">

                    <div className="min-w-0 flex-1 rounded-md border border-dashed border-slate-300 bg-white px-2.5 py-2">
                      <span className="block truncate text-[10px] font-extrabold tracking-[0.14em] text-slate-800">
                        {activeOffer.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex h-8 shrink-0 items-center gap-1 rounded-md bg-blue-600 px-2.5 text-[9px] font-bold text-white transition hover:bg-blue-700"
                    >
                      {copied ? (
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

              {/* Validity */}
              <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-400">
                <Clock3 size={11} />
                {activeOffer.validity}
              </div>
            </div>

            {/* Bottom info */}
            <div className="relative mt-4 rounded-lg bg-slate-50 p-2.5">

              <div className="flex items-start gap-2">

                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check size={10} />
                </div>

                <div>
                  <p className="text-[9px] font-bold text-slate-700">
                    Easy to redeem
                  </p>

                  <p className="mt-0.5 text-[8px] leading-3.5 text-slate-400">
                    Apply the coupon at checkout and enjoy your savings.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =====================================================
            OFFER CATEGORY SELECTOR
        ====================================================== */}
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-1.5">

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">

            {offers.map((offer) => {
              const OfferIcon = offer.icon;
              const isActive = activeOffer.id === offer.id;

              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => {
                    setActiveOffer(offer);
                    setCopied(false);
                  }}
                  className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                    }`}
                  >
                    <OfferIcon size={14} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] font-bold ${
                        isActive
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      {offer.category}
                    </p>

                    <p
                      className={`mt-0.5 text-[8px] ${
                        isActive
                          ? "text-blue-100"
                          : "text-slate-400"
                      }`}
                    >
                      {offer.discount} {offer.discountText}
                    </p>
                  </div>

                  {isActive && (
                    <ArrowRight
                      size={12}
                      className="ml-auto shrink-0"
                    />
                  )}

                </button>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            TRUST LINE
        ====================================================== */}
        <div className="mt-3 flex flex-col items-center justify-between gap-1.5 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-1.5">

            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Check size={10} />
            </div>

            <span className="text-[9px] text-slate-500">
              No hidden charges • Secure booking • Best price guarantee
            </span>

          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-[9px] font-bold text-blue-600"
          >
            View terms
            <ArrowRight size={10} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default ExclusiveDeals;

