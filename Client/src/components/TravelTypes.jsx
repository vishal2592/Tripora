import React from "react";
import { Link } from "react-router-dom";
import {
  Waves,
  Mountain,
  Heart,
  Users,
  Compass,
  Landmark,
  ArrowRight,
} from "lucide-react";

const travelTypes = [
  {
    id: 1,
    title: "Beach Escapes",
    subtitle: "Relax by the sea",
    description: "Beautiful beaches, sunsets and peaceful getaways.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    icon: Waves,
    link: "/packages?type=beach",
  },
  {
    id: 2,
    title: "Mountain Trips",
    subtitle: "Explore the heights",
    description: "Discover breathtaking mountains and scenic views.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    icon: Mountain,
    link: "/packages?type=mountain",
  },
  {
    id: 3,
    title: "Romantic Getaways",
    subtitle: "Create beautiful memories",
    description: "Perfect destinations for couples and honeymoon trips.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    icon: Heart,
    link: "/packages?type=romantic",
  },
  {
    id: 4,
    title: "Family Holidays",
    subtitle: "Fun for everyone",
    description: "Enjoy unforgettable moments with your loved ones.",
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=80",
    icon: Users,
    link: "/packages?type=family",
  },
  {
    id: 5,
    title: "Adventure Trips",
    subtitle: "Feel the adventure",
    description: "Thrilling activities and exciting outdoor experiences.",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",
    icon: Compass,
    link: "/packages?type=adventure",
  },
  {
    id: 6,
    title: "Heritage Tours",
    subtitle: "Discover history",
    description: "Explore historical places, culture and traditions.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    icon: Landmark,
    link: "/packages?type=heritage",
  },
];

const TravelTypes = () => {
  return (
    <section className="w-full bg-white py-4 sm:py-4 lg:py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-4 flex flex-col gap-4 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="mb-1.5 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
              Travel Your Way
            </span>

            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Explore Trips Your Way
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Whether you want to relax on a beach, explore the mountains,
              enjoy an adventure or spend quality time with family,
              find the perfect trip for your travel style.
            </p>
          </div>

          <Link
            to="/packages"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All Trips

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Travel Type Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travelTypes.map((type) => {
            const Icon = type.icon;

            return (
              <Link
                key={type.id}
                to={type.link}
                className="group relative block overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-[250px] overflow-hidden sm:h-[270px]">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Icon */}
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-blue-600 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/80">
                      {type.subtitle}
                    </div>

                    <h3 className="text-xl font-bold sm:text-2xl">
                      {type.title}
                    </h3>

                    <p className="mt-1.5 max-w-sm text-sm leading-5 text-white/80">
                      {type.description}
                    </p>

                    {/* Explore Link */}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explore

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelTypes;