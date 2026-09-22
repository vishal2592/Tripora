import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Wifi,
  Coffee,
  Car,
  Waves,
  ArrowRight,
  BedDouble,
} from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "The Grand Palace",
    location: "New Delhi, India",
    rating: 4.8,
    reviews: 324,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
    price: 5999,
    oldPrice: 7999,
    discount: "25% OFF",
    amenities: ["Free WiFi", "Breakfast", "Parking"],
    badge: "Top Rated",
  },
  {
    id: 2,
    name: "The Royal Retreat",
    location: "Jaipur, India",
    rating: 4.7,
    reviews: 286,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    price: 4499,
    oldPrice: 5999,
    discount: "20% OFF",
    amenities: ["Free WiFi", "Breakfast", "Pool"],
    badge: "Popular",
  },
  {
    id: 3,
    name: "Ocean View Resort",
    location: "Goa, India",
    rating: 4.9,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    price: 6999,
    oldPrice: 8999,
    discount: "22% OFF",
    amenities: ["Free WiFi", "Pool", "Breakfast"],
    badge: "Best Choice",
  },
  {
    id: 4,
    name: "Mountain Escape",
    location: "Manali, India",
    rating: 4.6,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    price: 3999,
    oldPrice: 4999,
    discount: "20% OFF",
    amenities: ["Free WiFi", "Parking", "Breakfast"],
    badge: "Great Value",
  },
];

const RecommendedHotels = () => {
  return (
    <section className="w-full bg-slate-50 py-4 sm:py-4 lg:py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-1 flex flex-col gap-4 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {/* Small Label */}
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
              <BedDouble size={16} />
              Stay With Comfort
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Recommended Hotels
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Discover highly rated hotels and resorts at great prices.
              Find the perfect stay for your next journey.
            </p>
          </div>

          {/* View All */}
          <Link
            to="/hotels"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
          >
            View All Hotels

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= HOTEL GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* ================= IMAGE ================= */}
              <div className="relative h-[230px] overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badge */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-blue-600 shadow-md">
                    {hotel.badge}
                  </span>
                </div>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={`Add ${hotel.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-red-500"
                >
                  <Heart size={18} />
                </button>

                {/* Discount */}
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white">
                    {hotel.discount}
                  </span>
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="p-2">

                {/* Hotel Name */}
                <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  {hotel.name}
                </h3>

                {/* Location */}
                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin
                    size={15}
                    className="shrink-0 text-blue-500"
                  />

                  <span className="truncate">
                    {hotel.location}
                  </span>
                </div>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
                    <Star
                      size={12}
                      fill="currentColor"
                    />
                    {hotel.rating}
                  </div>

                  <span className="text-xs text-slate-500">
                    {hotel.reviews} reviews
                  </span>
                </div>

                {/* ================= AMENITIES ================= */}
                <div className="mt-2 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                  {hotel.amenities.map((amenity, index) => {
                    let Icon = Wifi;

                    if (amenity.includes("Breakfast")) {
                      Icon = Coffee;
                    }

                    if (amenity.includes("Parking")) {
                      Icon = Car;
                    }

                    if (amenity.includes("Pool")) {
                      Icon = Waves;
                    }

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1.5 text-[11px] font-medium text-slate-600"
                      >
                        <Icon size={12} />
                        {amenity}
                      </div>
                    );
                  })}
                </div>

                {/* ================= PRICE ================= */}
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-900">
                        ₹{hotel.price.toLocaleString("en-IN")}
                      </span>

                      <span className="text-xs text-slate-400 line-through">
                        ₹{hotel.oldPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-400">
                      + taxes & fees / night
                    </p>
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/hotels/${hotel.id}`}
                    className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE / BOTTOM CTA ================= */}
        <div className="mt-4 flex justify-center sm:mt-4">
          <Link
            to="/hotels"
            className="group inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            Explore More Hotels

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedHotels;