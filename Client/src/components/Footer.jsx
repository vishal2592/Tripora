import React from "react";
import {
  ArrowUp,
  //   Facebook,
  Headphones,
  //   Instagram,
  Mail,
  MapPin,
  Plane,
  ShieldCheck,
  //   Twitter,
} from "lucide-react";
import { Link } from 'react-router-dom';


const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    console.log("Newsletter subscription");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#071426] text-white">
      {/* =====================================================
          NEWSLETTER SECTION
      ====================================================== */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Mail size={15} />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-400">
                  Travel inspiration
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Get travel ideas in your inbox
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                Discover new destinations, travel deals and useful tips
                straight to your inbox.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md"
            >
              <div className="flex rounded-xl border border-white/10 bg-white/[0.06] p-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>

              <p className="mt-2 text-[10px] text-slate-500">
                No spam. Just useful travel updates.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* =================================================
              BRAND
          ================================================== */}
          <div className="max-w-xs">
            {/* LOGO */}

            <Link
              to="/"
              className="group flex shrink-0 items-center gap-2"
            >
              {/* Logo Mark */}
              <div className="relative flex h-11 w-11 items-center justify-center">
                <div className="absolute inset-1 rotate-[-25deg] rounded-full border-[5px] border-blue-600 border-r-transparent border-t-transparent" />

                <div className="absolute left-[8px] top-[7px] h-7 w-7 rounded-full bg-blue-600 shadow-md">
                  <div className="absolute left-[9px] top-[8px] h-2.5 w-2.5 rounded-full bg-white" />
                </div>

                <Plane
                  size={17}
                  strokeWidth={2.5}
                  className="absolute right-0 top-0 rotate-[-35deg] text-blue-600"
                />

                <div className="absolute bottom-0 left-0 h-3 w-6 rotate-[-25deg] rounded-full bg-amber-400" />
              </div>

              {/* Brand Name */}
              <div className="leading-none">
                <div className="text-[27px] font-extrabold tracking-[-1.5px] text-white">
                  Trip<span className="text-blue-400">ora</span>
                </div>

                <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
                  Plan. Book. Explore.
                </p>
              </div>
            </Link>



            <p className="mt-5 text-sm leading-6 text-slate-400">
              Your simple travel companion for discovering,
              comparing and booking unforgettable journeys.
            </p>

            {/* QUICK LINKS */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-slate-400">
                Flights
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-slate-400">
                Hotels
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-slate-400">
                Trains
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-slate-400">
                Buses
              </span>
            </div>
          </div>

          {/* =================================================
              COMPANY
          ================================================== */}
          <FooterColumn
            title="Company"
            links={[
              {
                label: "About Us",
                path: "/about",
              },
              {
                label: "Careers",
                path: "/careers",
              },
              {
                label: "Contact Us",
                path: "/contact",
              },
              {
                label: "Blog",
                path: "/blog",
              },
              {
                label: "Press",
                path: "/press",
              }
            ]}
          />

          {/* =================================================
              EXPLORE
          ================================================== */}
          <FooterColumn
            title="Explore"
            links={[
              {
                label: "Flights",
                path: "/flights",
              },
              {
                label: "Hotels",
                path: "/hotels",
              },
              {
                label: "Trains",
                // path: "/trains",
              },
              {
                label: "Buses",
                // path: "/buses",
              },
              {
                label: "Holiday Packages",
                path: "/packages",
              }
            ]}
          />

          {/* =================================================
              SUPPORT
          ================================================== */}
          <FooterColumn
            title="Support"
            links={[
              {
                label: "Help Center",
                path: "/helpcenter",
              },
              {
                label: "Contact Support",
                path: "/contact",
              },
              {
                label: "Cancellation",
                path: "/cancellation",
              },
              {
                label: "Refund Policy",
                path: "/refundpolicy",
              },
              {
                label: "Terms & Conditions",
                path: "/termsandconditions",
              },
            ]}
          />

          {/* =================================================
              DESTINATIONS
          ================================================== */}
          <FooterColumn
            title="Popular destinations"
            links={[
              {
                label: "Dubai",
                path: "/destinations",
              },
              {
                label: "Paris",
                path: "/destinations",
              },
              {
                label: "Singapore",
                path: "/destinations",
              },
              {
                label: "Bali",
                path: "/destinations",
              },
              {
                label: "Goa",
                path: "/destinations",
              }
            ]}
          />
        </div>
      </div>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}
      <div className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {/* TRUST 1 */}
          <div className="flex items-center gap-3 py-5 sm:px-6 sm:first:pl-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Secure booking
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Your data stays protected
              </p>
            </div>
          </div>

          {/* TRUST 2 */}
          <div className="flex items-center gap-3 py-5 sm:px-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <MapPin size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Great destinations
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Explore places around the world
              </p>
            </div>
          </div>

          {/* TRUST 3 */}
          <div className="flex items-center gap-3 py-5 sm:px-6 sm:last:pr-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Headphones size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                24/7 support
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                We're always here to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FOOTER
      ====================================================== */}
      <div>
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {/* COPYRIGHT */}
          <div>
            <p className="text-[11px] text-slate-400">
              © 2026 TravelMate. All rights reserved.
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Made for travellers, by travellers.
            </p>
          </div>

          {/* SOCIAL + TOP */}
          <div className="flex items-center gap-2">
            {/* INSTAGRAM */}
            {/* <SocialButton
              icon={<Instagram size={15} />}
              label="Instagram"
            /> */}

            {/* FACEBOOK */}
            {/* <SocialButton
              icon={<Facebook size={15} />}
              label="Facebook"
            /> */}

            {/* TWITTER / X */}
            {/* <SocialButton
              icon={<Twitter size={15} />}
              label="Twitter"
            /> */}

            {/* DIVIDER */}
            <div className="mx-2 h-5 w-px bg-white/10" />

            {/* BACK TO TOP */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-[10px] font-medium text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================
   FOOTER COLUMN
========================================================= */



const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">
        {title}
      </h3>

      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* =========================================================
   SOCIAL BUTTON
========================================================= */

const SocialButton = ({ icon, label }) => {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
    >
      {icon}
    </button>
  );
};

export default Footer;