
import React, { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Hotel,
  MapPin,
  Plane,
  Star,
  Utensils,
  Users,
} from "lucide-react";

const packages = [
  {
    id: 1,
    destination: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",
    duration: "5 Days / 4 Nights",
    rating: "4.8",
    reviews: "324",
    price: "₹34,999",
    oldPrice: "₹49,999",
    save: "₹15,000",
    tag: "BEST SELLER",
    description:
      "Luxury, adventure and breathtaking city views come together in one unforgettable Dubai escape.",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Marina"],
    color: "from-orange-500/80",
  },
  {
    id: 2,
    destination: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",
    duration: "6 Days / 5 Nights",
    rating: "4.9",
    reviews: "286",
    price: "₹39,999",
    oldPrice: "₹54,999",
    save: "₹15,000",
    tag: "MOST LOVED",
    description:
      "Relax beside tropical beaches, explore hidden temples and experience the beauty of Bali.",
    highlights: ["Ubud", "Nusa Penida", "Beach Resort"],
    color: "from-emerald-500/80",
  },
  {
    id: 3,
    destination: "Thailand",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=90",
    duration: "5 Days / 4 Nights",
    rating: "4.7",
    reviews: "198",
    price: "₹29,999",
    oldPrice: "₹42,999",
    save: "₹13,000",
    tag: "HOT DEAL",
    description:
      "Explore vibrant streets, beautiful islands and the unforgettable flavours of Thailand.",
    highlights: ["Bangkok", "Pattaya", "Island Tour"],
    color: "from-cyan-500/80",
  },
  {
    id: 4,
    destination: "Manali",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
    duration: "5 Days / 4 Nights",
    rating: "4.8",
    reviews: "412",
    price: "₹12,999",
    oldPrice: "₹18,999",
    save: "₹6,000",
    tag: "INDIA FAVOURITE",
    description:
      "Escape into the mountains with peaceful valleys, scenic roads and unforgettable views.",
    highlights: ["Solang Valley", "Rohtang", "Mall Road"],
    color: "from-blue-500/80",
  },
];

const inclusions = [
  {
    icon: Plane,
    label: "Flights",
  },
  {
    icon: Hotel,
    label: "Hotels",
  },
  {
    icon: Utensils,
    label: "Meals",
  },
];

const HolidayPackages = () => {
  const [activePackage, setActivePackage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const currentPackage = packages[activePackage];

  const nextPackage = () => {
    setActivePackage((prev) =>
      prev === packages.length - 1 ? 0 : prev + 1
    );
  };

  const previousPackage = () => {
    setActivePackage((prev) =>
      prev === 0 ? packages.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-slate-50 py-5 sm:py-6 lg:py-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Curated for you
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[30px]">
              Holiday Packages
            </h2>

            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
              Discover carefully planned holidays with flights, stays and
              experiences bundled together.
            </p>
          </div>

          <button
            type="button"
            className="group flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            Explore all packages

            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ================= MAIN EXPERIENCE ================= */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.07)]">

          <div className="grid lg:grid-cols-12">

            {/* ================= LEFT DESTINATION MENU ================= */}
            <div className="border-b border-slate-100 p-3.5 sm:p-4 lg:col-span-3 lg:border-b-0 lg:border-r lg:p-4">

              <div className="mb-3 px-1">
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Popular escapes
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Choose your destination
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
                {packages.map((pkg, index) => {
                  const isActive = activePackage === index;

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setActivePackage(index)}
                      className={`group relative flex items-center gap-2 overflow-hidden rounded-xl p-1.5 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50 ring-1 ring-blue-100"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={pkg.image}
                          alt={pkg.destination}
                          className={`h-full w-full object-cover transition duration-500 ${
                            isActive ? "scale-110" : "group-hover:scale-105"
                          }`}
                        />

                        {isActive && (
                          <div className="absolute inset-0 bg-blue-600/20" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p
                            className={`truncate text-[10px] font-bold ${
                              isActive
                                ? "text-blue-700"
                                : "text-slate-800"
                            }`}
                          >
                            {pkg.destination}
                          </p>

                          {isActive && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <p className="mt-0.5 text-[8px] text-slate-400">
                          From{" "}
                          <span className="font-semibold text-slate-600">
                            {pkg.price}
                          </span>
                        </p>

                        <div className="mt-0.5 flex items-center gap-1">
                          <Star
                            size={8}
                            className="text-amber-500"
                            fill="currentColor"
                          />

                          <span className="text-[8px] text-slate-400">
                            {pkg.rating}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Small side information */}
              <div className="mt-4 hidden rounded-xl bg-slate-50 p-3 lg:block">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <Users size={13} />
                </div>

                <p className="text-[10px] font-bold text-slate-700">
                  Travel together
                </p>

                <p className="mt-0.5 text-[8px] leading-3.5 text-slate-400">
                  Packages are perfect for couples, families and groups.
                </p>
              </div>
            </div>

            {/* ================= RIGHT FEATURED PACKAGE ================= */}
            <div className="relative lg:col-span-9">

              <div className="grid lg:grid-cols-2">

                {/* ================= IMAGE ================= */}
                <div className="relative h-[250px] overflow-hidden sm:h-[300px] lg:h-[420px]">

                  <img
                    src={currentPackage.image}
                    alt={currentPackage.destination}
                    className="h-full w-full object-cover transition-all duration-700"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${currentPackage.color} via-black/10 to-black/20`}
                  />

                  {/* Top controls */}
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-extrabold tracking-wider text-slate-800 shadow-lg backdrop-blur">
                      {currentPackage.tag}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={previousPackage}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={nextPackage}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Image bottom content */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">

                    <div className="flex items-center gap-1 text-white/80">
                      <MapPin size={11} />

                      <span className="text-[9px] font-medium">
                        {currentPackage.country}
                      </span>
                    </div>

                    <h3 className="mt-0.5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {currentPackage.destination}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[8px] font-semibold backdrop-blur">
                        <CalendarDays size={10} />
                        {currentPackage.duration}
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[8px] font-semibold backdrop-blur">
                        <Star size={9} fill="currentColor" />
                        {currentPackage.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="flex flex-col p-4 sm:p-5 lg:p-6">

                  {/* Heading */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[8px] font-bold text-green-700">
                        {currentPackage.rating} ★
                      </span>

                      <span className="text-[8px] text-slate-400">
                        {currentPackage.reviews} travellers rated this
                      </span>
                    </div>

                    <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {currentPackage.destination} Escape
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-4.5 text-slate-500">
                      {currentPackage.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4">
                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Experience highlights
                    </p>

                    <div className="space-y-1.5">
                      {currentPackage.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Check size={11} />
                          </div>

                          <div>
                            <p className="text-[10px] font-semibold text-slate-700">
                              {highlight}
                            </p>

                            <p className="text-[8px] text-slate-400">
                              Included in your itinerary
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="mt-4 border-t border-slate-100 pt-3.5">

                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Package includes
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {inclusions.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5"
                          >
                            <Icon
                              size={11}
                              className="text-blue-600"
                            />

                            <span className="text-[9px] font-semibold text-slate-600">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-auto border-t border-slate-100 pt-3.5">

                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">

                      <div>
                        <p className="text-[8px] text-slate-400">
                          Starting from
                        </p>

                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 line-through">
                            {currentPackage.oldPrice}
                          </span>

                          <span className="text-xl font-extrabold text-slate-900">
                            {currentPackage.price}
                          </span>
                        </div>

                        <p className="mt-0.5 text-[9px] font-bold text-green-600">
                          Save {currentPackage.save} per person
                        </p>
                      </div>

                      <button
                        type="button"
                        className="group flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[10px] font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                      >
                        Explore package

                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= BOTTOM PROGRESS ================= */}
              <div className="border-t border-slate-100 bg-white px-4 py-2.5 sm:px-5">

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-1.5">
                    {packages.map((pkg, index) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setActivePackage(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activePackage === index
                            ? "w-6 bg-blue-600"
                            : "w-2.5 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Show ${pkg.destination}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
                    <span className="font-semibold text-slate-600">
                      {String(activePackage + 1).padStart(2, "0")}
                    </span>

                    <span>/</span>

                    <span>
                      {String(packages.length).padStart(2, "0")}
                    </span>

                    <span className="hidden sm:inline">
                      destinations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="mt-4 hidden  sm:grid grid-cols-1 gap-1.5 sm:grid-cols-3">

          <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Plane size={12} />
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-700">
                Flights & transfers
              </p>

              <p className="text-[8px] text-slate-400">
                Hassle-free travel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Hotel size={12} />
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-700">
                Handpicked stays
              </p>

              <p className="text-[8px] text-slate-400">
                Comfortable hotels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Clock3 size={12} />
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-700">
                Flexible booking
              </p>

              <p className="text-[8px] text-slate-400">
                Easy travel planning
              </p>
            </div>
          </div>

        </div>

        {/* ================= MOBILE EXTRA BUTTON ================= */}
        <div className="mt-4 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[10px] font-bold text-blue-600 shadow-sm"
          >
            View all packages

            <ChevronDown
              size={12}
              className={`transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HolidayPackages;

