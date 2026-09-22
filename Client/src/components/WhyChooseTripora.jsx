
import React from "react";
import {
  ArrowRight,
  Check,
  Sparkles,
  Star,
  ShieldCheck,
  WalletCards,
  Headphones,
} from "lucide-react";

const WhyChooseTripora = () => {
  const benefits = [
    {
      number: "01",
      title: "Personalized Travel",
      description:
        "Get travel recommendations designed around your destination, interests, budget and travel style.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Best Value Deals",
      description:
        "Discover attractive offers and carefully selected travel options that give you more value.",
      icon: WalletCards,
    },
    {
      number: "03",
      title: "Trusted Experiences",
      description:
        "Explore reliable hotels, destinations and experiences selected to make your journey worry-free.",
      icon: ShieldCheck,
    },
    {
      number: "04",
      title: "Travel Support",
      description:
        "Get helpful assistance whenever you need it, from planning your trip to making your booking.",
      icon: Headphones,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50  py-4 sm:py-4 lg:py-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div>
            {/* Small label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Sparkles className="h-4 w-4" />
              Why Choose Tripora?
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
              Your journey,
              <span className="block text-blue-600">
                thoughtfully planned.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              From discovering your next destination to finding the right
              stay, Tripora makes every step of your journey simple,
              personalized and enjoyable.
            </p>

            {/* Small trust points */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Easy trip planning
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Carefully selected stays
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Smart recommendations
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Reliable travel support
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              Start Exploring

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* Main image */}
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
                alt="Beautiful travel destination"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

              {/* Image bottom text */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-medium text-white/80">
                  Discover more. Travel better.
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Your next adventure awaits.
                </h3>
              </div>
            </div>

            {/* Rating floating card */}
            <div className="absolute -left-3 top-8 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-xl sm:-left-8 sm:px-5 sm:py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Star className="h-5 w-5 fill-current text-blue-600" />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-slate-900">
                      4.9
                    </span>

                    <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                  </div>

                  <p className="text-xs text-slate-500">
                    Traveler rating
                  </p>
                </div>
              </div>
            </div>

            {/* Destination floating card */}
            <div className="absolute -bottom-5 right-3 rounded-2xl border border-white/80 bg-white p-4 shadow-xl sm:-right-6 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80"
                    alt="Beach destination"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Explore next
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    Dream Destinations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTripora;

