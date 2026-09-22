import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Wallet,
  CalendarDays,
  Users,
  ArrowRight,
  Plane,
  Hotel,
  Utensils,
  Camera,
  CheckCircle2,
} from "lucide-react";

const AITravelPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
    travellers: "2",
  });

  const [isPlanning, setIsPlanning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlanTrip = (e) => {
    e.preventDefault();

    if (!formData.destination || !formData.budget || !formData.duration) {
      return;
    }

    setIsPlanning(true);

    setTimeout(() => {
      setIsPlanning(false);

      console.log("Trip Planning Data:", formData);
    }, 1000);
  };

  return (
    <section className="w-full bg-white py-4 sm:py-4 lg:py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= MAIN AI CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900">

          {/* Background Decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">

            {/* ================= LEFT CONTENT ================= */}
            <div className="px-6 py-4 sm:px-10 sm:py-4 lg:px-14 lg:py-4">

              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-sm">
                <Sparkles size={16} />
                Powered by Tripora AI
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Plan Your Perfect Trip with{" "}
                <span className="text-blue-400">
                  Tripora AI
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Tell us where you want to go, your budget and how long you
                want to stay. Tripora will help you create a personalized
                travel plan for your journey.
              </p>

              {/* Features */}
              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Plane size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Smart Itinerary
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Get a day-by-day travel plan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Hotel size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Hotel Suggestions
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Find stays based on your budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Utensils size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Food Recommendations
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Discover local food and restaurants.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Camera size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Places to Visit
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Discover must-visit attractions.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Trust */}
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6">

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Personalized Plans
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Budget Friendly
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Easy Planning
                </div>

              </div>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="relative px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:py-4">

              <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-7">

                {/* Form Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Start Planning
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter a few details about your trip.
                  </p>
                </div>

                <form
                  onSubmit={handlePlanTrip}
                  className="space-y-4"
                >

                  {/* Destination */}
                  <div>
                    <label
                      htmlFor="destination"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Where do you want to go?
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500"
                      />

                      <input
                        id="destination"
                        name="destination"
                        type="text"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g. Goa, Dubai, Paris"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      What's your budget?
                    </label>

                    <div className="relative">
                      <Wallet
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500"
                      />

                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="">
                          Select your budget
                        </option>
                        <option value="under-15000">
                          Under ₹15,000
                        </option>
                        <option value="15000-30000">
                          ₹15,000 - ₹30,000
                        </option>
                        <option value="30000-50000">
                          ₹30,000 - ₹50,000
                        </option>
                        <option value="50000-100000">
                          ₹50,000 - ₹1,00,000
                        </option>
                        <option value="above-100000">
                          Above ₹1,00,000
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Duration + Travellers */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* Duration */}
                    <div>
                      <label
                        htmlFor="duration"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Duration
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500"
                        />

                        <select
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        >
                          <option value="">
                            Days
                          </option>
                          <option value="2">2 Days</option>
                          <option value="3">3 Days</option>
                          <option value="4">4 Days</option>
                          <option value="5">5 Days</option>
                          <option value="7">7 Days</option>
                          <option value="10">10 Days</option>
                          <option value="15">15 Days</option>
                        </select>
                      </div>
                    </div>

                    {/* Travellers */}
                    <div>
                      <label
                        htmlFor="travellers"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Travellers
                      </label>

                      <div className="relative">
                        <Users
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500"
                        />

                        <select
                          id="travellers"
                          name="travellers"
                          value={formData.travellers}
                          onChange={handleChange}
                          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        >
                          <option value="1">
                            1 Traveller
                          </option>
                          <option value="2">
                            2 Travellers
                          </option>
                          <option value="3">
                            3 Travellers
                          </option>
                          <option value="4">
                            4 Travellers
                          </option>
                          <option value="5">
                            5 Travellers
                          </option>
                          <option value="6">
                            6+ Travellers
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPlanning}
                    className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Sparkles size={18} />

                    {isPlanning
                      ? "Creating Your Plan..."
                      : "Plan My Trip"}

                    {!isPlanning && (
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>

                </form>

                {/* Form Footer */}
                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Get personalized destination ideas, hotels,
                  activities and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM INFO ================= */}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

          {/* SMART SUGGESTIONS */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3 sm:rounded-xl sm:p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <Sparkles size={17} />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                Smart Suggestions
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                Personalized for you
              </p>
            </div>

          </div>

          {/* STAY WITHIN BUDGET */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3 sm:rounded-xl sm:p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10">
              <Wallet size={17} />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                Stay Within Budget
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                Plans for every budget
              </p>
            </div>

          </div>

          {/* COMPLETE TRIP PLAN */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3 sm:rounded-xl sm:p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 sm:h-10 sm:w-10">
              <Plane size={17} />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                Complete Trip Plan
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                From stay to sightseeing
              </p>
            </div>
          
          </div>

          {/* SMART SUGGESTIONS */}
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3 sm:rounded-xl sm:p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <Sparkles size={17} />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                Smart Suggestions
              </h4>

              <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                Personalized for you
              </p>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
};

export default AITravelPlanner;