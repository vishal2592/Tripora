
import React from "react";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Sharma",
      role: "Weekend Traveler",
      location: "Mumbai, India",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85",
      review:
        "Tripora made planning our vacation incredibly easy. The recommendations were exactly what we were looking for, and we found a beautiful stay within our budget.",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      role: "Frequent Traveler",
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85",
      review:
        "I loved how simple everything felt. From discovering destinations to comparing travel options, Tripora saved me a lot of time.",
    },
    {
      id: 3,
      name: "Priya Kapoor",
      role: "Family Traveler",
      location: "Bengaluru, India",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=85",
      review:
        "The holiday package recommendations were amazing. We had a wonderful family trip and the entire planning experience was smooth.",
    },
    {
      id: 4,
      name: "Arjun Verma",
      role: "Adventure Traveler",
      location: "Pune, India",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
      review:
        "Tripora helped us discover places we had never considered before. The complete experience from searching to planning was smooth and convenient.",
    },
    {
      id: 5,
      name: "Neha Singh",
      role: "Solo Traveler",
      location: "Jaipur, India",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=85",
      review:
        "I was looking for an easy way to plan my solo trip and Tripora made everything much simpler. The destination suggestions were really helpful.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-5 sm:py-6 lg:py-7">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-5 flex items-end justify-between gap-4">

          <div>

            {/* Badge */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-blue-600">
              <Star className="h-3 w-3 fill-current" />
              TRAVELER STORIES
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Loved by travelers,
              <span className="block text-blue-600">
                trusted for every journey.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-600 sm:text-sm">
              See what travelers are saying about their experiences with
              Tripora and discover why thousands of travelers choose us.
            </p>

          </div>

          {/* =================================================
              NAVIGATION BUTTONS
          ================================================== */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">

            <button
              type="button"
              className="testimonial-prev flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-600 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              className="testimonial-next flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-600 hover:text-white"
              aria-label="Next testimonial"
            >
              <ArrowRight size={15} />
            </button>

          </div>

        </div>

        {/* =====================================================
            TESTIMONIAL SLIDER
        ====================================================== */}
        <div className="relative">

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            spaceBetween={14}
            slidesPerView={1}
            loop={true}
            speed={650}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              el: ".testimonial-pagination",
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
            }}
            className="!pb-10"
          >

            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>

                {/* =================================================
                    TESTIMONIAL CARD
                ================================================== */}
                <article className="group relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-200/60 sm:p-6">

                  {/* Decorative Quote */}
                  <div className="pointer-events-none absolute right-4 top-3 text-blue-50">
                    <Quote size={65} />
                  </div>

                  {/* Rating */}
                  <div className="relative flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-current text-amber-400"
                      />
                    ))}

                  </div>

                  {/* Review */}
                  <p className="relative mt-5 flex-1 text-sm leading-6 text-slate-600">
                    “{testimonial.review}”
                  </p>

                  {/* Divider */}
                  <div className="my-4 border-t border-slate-100" />

                  {/* User */}
                  <div className="flex items-center gap-3">

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-blue-50"
                    />

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        {testimonial.role}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                        <MapPin size={10} />
                        {testimonial.location}
                      </div>

                    </div>

                  </div>

                  {/* Small Verified Label */}
                  <div className="absolute right-5 bottom-5 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                    Verified Traveler
                  </div>

                </article>

              </SwiperSlide>
            ))}

          </Swiper>

          {/* =====================================================
              PAGINATION
          ====================================================== */}
          <div className="testimonial-pagination absolute bottom-0 left-0 right-0 z-10 flex justify-center" />

        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        <div className="mt-1 flex items-center justify-center gap-2 sm:hidden">

          <button
            type="button"
            className="testimonial-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={14} />
          </button>

          <button
            type="button"
            className="testimonial-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Next testimonial"
          >
            <ArrowRight size={14} />
          </button>

        </div>

        {/* =====================================================
            TRUST STATS
        ====================================================== */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white py-3">

          <div className="text-center">
            <p className="text-lg font-extrabold text-slate-900">
              4.9/5
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
              Average Rating
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-extrabold text-slate-900">
              10K+
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
              Happy Travelers
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-extrabold text-slate-900">
              98%
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
              Recommend Us
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;

