
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Check,
  ChevronDown,
  ChevronUp,
  Coffee,
  Filter,
  Heart,
  MapPin,
  ParkingCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
  Utensils,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   POPULAR DESTINATIONS
========================================================= */

const popularDestinations = [
  {
    id: 1,
    name: "Dubai",
    country: "UAE",
    stays: "1,240 stays",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    stays: "980 stays",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    stays: "860 stays",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Goa",
    country: "India",
    stays: "760 stays",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================================================
   HOTEL DATA
========================================================= */

const hotelData = [
  {
    id: 1,
    name: "The Grand Palace",
    location: "Downtown Dubai",
    city: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 1240,
    stars: 5,
    price: 4999,
    oldPrice: 6999,
    taxes: 850,
    propertyType: "Hotel",
    amenities: ["Free WiFi", "Pool", "Breakfast"],
    freeCancellation: true,
    breakfast: true,
    pool: true,
    wifi: true,
    parking: true,
    featured: true,
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "North Goa",
    city: "Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 865,
    stars: 5,
    price: 3899,
    oldPrice: 5299,
    taxes: 650,
    propertyType: "Resort",
    amenities: ["Pool", "Free WiFi", "Breakfast"],
    freeCancellation: true,
    breakfast: true,
    pool: true,
    wifi: true,
    parking: true,
    featured: true,
  },
  {
    id: 3,
    name: "Royal Heritage Hotel",
    location: "City Center",
    city: "Jaipur",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 642,
    stars: 4,
    price: 2899,
    oldPrice: 3999,
    taxes: 480,
    propertyType: "Hotel",
    amenities: ["Free WiFi", "Breakfast", "Parking"],
    freeCancellation: true,
    breakfast: true,
    pool: false,
    wifi: true,
    parking: true,
    featured: false,
  },
  {
    id: 4,
    name: "Paradise Beach Villa",
    location: "Seminyak",
    city: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviews: 512,
    stars: 5,
    price: 6499,
    oldPrice: 8299,
    taxes: 1050,
    propertyType: "Villa",
    amenities: ["Pool", "Free WiFi", "Breakfast"],
    freeCancellation: true,
    breakfast: true,
    pool: true,
    wifi: true,
    parking: false,
    featured: true,
  },
  {
    id: 5,
    name: "City Lights Hotel",
    location: "Central Paris",
    city: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviews: 734,
    stars: 4,
    price: 7199,
    oldPrice: 8999,
    taxes: 1200,
    propertyType: "Hotel",
    amenities: ["Free WiFi", "Breakfast", "Parking"],
    freeCancellation: false,
    breakfast: true,
    pool: false,
    wifi: true,
    parking: true,
    featured: false,
  },
  {
    id: 6,
    name: "Palm Garden Resort",
    location: "Kuta Beach",
    city: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 923,
    stars: 5,
    price: 4299,
    oldPrice: 5799,
    taxes: 720,
    propertyType: "Resort",
    amenities: ["Pool", "Free WiFi", "Breakfast"],
    freeCancellation: true,
    breakfast: true,
    pool: true,
    wifi: true,
    parking: true,
    featured: false,
  },
];

/* =========================================================
   HOTEL TYPES
========================================================= */

const hotelTypes = [
  {
    title: "Hotels",
    count: "12,400+",
    icon: BedDouble,
  },
  {
    title: "Resorts",
    count: "3,240+",
    icon: Waves,
  },
  {
    title: "Villas",
    count: "1,820+",
    icon: BedDouble,
  },
  {
    title: "Apartments",
    count: "4,620+",
    icon: Users,
  },
];

/* =========================================================
   DEALS
========================================================= */

const hotelDeals = [
  {
    id: 1,
    title: "Dubai Hotels",
    subtitle: "Luxury stays at better prices",
    discount: "30% OFF",
    code: "TRIPORA30",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Goa Getaway",
    subtitle: "Beach stays for your next trip",
    discount: "25% OFF",
    code: "GOA25",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Bali Escapes",
    subtitle: "Stay closer to paradise",
    discount: "35% OFF",
    code: "BALI35",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=80",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Hotels = () => {
  /* =======================================================
     SEARCH STATE
  ======================================================== */

  const [searchData, setSearchData] = useState({
    destination: "Dubai",
    checkIn: "2026-09-18",
    checkOut: "2026-09-22",
    guests: 2,
    rooms: 1,
  });

  const [isSearching, setIsSearching] = useState(false);

  /* =======================================================
     FILTER STATE
  ======================================================== */

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [priceRange, setPriceRange] = useState(10000);

  const [selectedPropertyTypes, setSelectedPropertyTypes] =
    useState([]);

  const [selectedRatings, setSelectedRatings] = useState([]);

  const [selectedAmenities, setSelectedAmenities] =
    useState([]);

  const [activeSort, setActiveSort] = useState("recommended");

  const [expandedHotel, setExpandedHotel] = useState(null);

  const [savedHotels, setSavedHotels] = useState([]);

  /* =======================================================
     SEARCH CHANGE
  ======================================================== */

  const handleSearchChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =======================================================
     SEARCH
  ======================================================== */

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
    }, 700);
  };

  /* =======================================================
     PROPERTY TYPE
  ======================================================== */

  const togglePropertyType = (type) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  /* =======================================================
     RATING
  ======================================================== */

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  /* =======================================================
     AMENITIES
  ======================================================== */

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  /* =======================================================
     SAVE HOTEL
  ======================================================== */

  const toggleSaveHotel = (id) => {
    setSavedHotels((prev) =>
      prev.includes(id)
        ? prev.filter((hotelId) => hotelId !== id)
        : [...prev, id]
    );
  };

  /* =======================================================
     FILTER + SORT
  ======================================================== */

  const filteredHotels = useMemo(() => {
    let hotels = [...hotelData];

    /* PRICE */

    hotels = hotels.filter(
      (hotel) => hotel.price <= priceRange
    );

    /* PROPERTY TYPE */

    if (selectedPropertyTypes.length > 0) {
      hotels = hotels.filter((hotel) =>
        selectedPropertyTypes.includes(hotel.propertyType)
      );
    }

    /* RATING */

    if (selectedRatings.length > 0) {
      hotels = hotels.filter((hotel) =>
        selectedRatings.some(
          (rating) => hotel.rating >= Number(rating)
        )
      );
    }

    /* AMENITIES */

    if (selectedAmenities.length > 0) {
      hotels = hotels.filter((hotel) =>
        selectedAmenities.every((amenity) => {
          if (amenity === "WiFi") return hotel.wifi;
          if (amenity === "Breakfast") return hotel.breakfast;
          if (amenity === "Pool") return hotel.pool;
          if (amenity === "Parking") return hotel.parking;

          return true;
        })
      );
    }

    /* SORT */

    if (activeSort === "cheapest") {
      hotels.sort((a, b) => a.price - b.price);
    }

    if (activeSort === "rating") {
      hotels.sort((a, b) => b.rating - a.rating);
    }

    if (activeSort === "recommended") {
      hotels.sort((a, b) => {
        if (a.featured === b.featured) {
          return b.rating - a.rating;
        }

        return a.featured ? -1 : 1;
      });
    }

    return hotels;
  }, [
    priceRange,
    selectedPropertyTypes,
    selectedRatings,
    selectedAmenities,
    activeSort,
  ]);

  /* =======================================================
     RESET FILTERS
  ======================================================== */

  const resetFilters = () => {
    setPriceRange(10000);
    setSelectedPropertyTypes([]);
    setSelectedRatings([]);
    setSelectedAmenities([]);
  };

  /* =======================================================
     FILTER CONTENT
  ======================================================== */

  const FilterContent = () => (
    <div className="space-y-5">
      {/* PRICE */}

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">
            Price per night
          </h3>

          <button
            type="button"
            onClick={resetFilters}
            className="shrink-0 text-[10px] font-bold text-blue-600"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>₹1,000</span>

          <span className="text-blue-600">
            ₹{priceRange.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="1000"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) =>
            setPriceRange(Number(e.target.value))
          }
          className="mt-2 w-full accent-blue-600"
        />

        <div className="mt-1 flex justify-between text-[9px] text-slate-400">
          <span>₹1,000</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* PROPERTY TYPE */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Property type
        </h3>

        <div className="space-y-2.5">
          {[
            "Hotel",
            "Resort",
            "Villa",
            "Apartment",
          ].map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedPropertyTypes.includes(type)}
                onChange={() => togglePropertyType(type)}
                className="h-4 w-4 accent-blue-600"
              />

              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RATING */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Guest rating
        </h3>

        <div className="space-y-2.5">
          {[
            ["4.5", "4.5 & above"],
            ["4", "4 & above"],
            ["3", "3 & above"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(value)}
                onChange={() => toggleRating(value)}
                className="h-4 w-4 accent-blue-600"
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AMENITIES */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Amenities
        </h3>

        <div className="space-y-2.5">
          {[
            ["WiFi", "Free WiFi"],
            ["Breakfast", "Breakfast included"],
            ["Pool", "Swimming pool"],
            ["Parking", "Free parking"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(value)}
                onChange={() => toggleAmenity(value)}
                className="h-4 w-4 accent-blue-600"
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs text-slate-400">
            <span className="shrink-0">Home</span>

            <span>/</span>

            <span className="shrink-0">Hotels</span>

            <span>/</span>

            <span className="truncate text-slate-600">
              {searchData.destination}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HERO / SEARCH
      ====================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          {/* HEADING */}

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                Find your stay
              </p>

              <h1 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                Find your perfect hotel
              </h1>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
                Discover comfortable stays, luxury resorts and
                beautiful places at the best prices.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <ShieldCheck
                size={15}
                className="text-emerald-400"
              />
              Secure hotel booking
            </div>
          </div>

          {/* SEARCH CARD */}

          <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4 lg:p-5">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_150px]">
              {/* DESTINATION */}

              <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Destination / Hotel
                </label>

                <div className="flex min-w-0 items-center gap-2">
                  <MapPin
                    size={17}
                    className="shrink-0 text-blue-600"
                  />

                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) =>
                      handleSearchChange(
                        "destination",
                        e.target.value
                      )
                    }
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-slate-900 outline-none sm:text-base"
                    placeholder="Where are you going?"
                  />
                </div>
              </div>

              {/* CHECK IN */}

              <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Check-in
                </label>

                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    handleSearchChange(
                      "checkIn",
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 bg-transparent text-xs font-bold text-slate-900 outline-none sm:text-sm"
                />
              </div>

              {/* CHECK OUT */}

              <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Check-out
                </label>

                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    handleSearchChange(
                      "checkOut",
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 bg-transparent text-xs font-bold text-slate-900 outline-none sm:text-sm"
                />
              </div>

              {/* GUESTS */}

              <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Guests & Rooms
                </label>

                <div className="flex min-w-0 items-center gap-2">
                  <Users
                    size={16}
                    className="shrink-0 text-blue-600"
                  />

                  <select
                    value={`${searchData.guests}-${searchData.rooms}`}
                    onChange={(e) => {
                      const [guests, rooms] =
                        e.target.value.split("-");

                      setSearchData((prev) => ({
                        ...prev,
                        guests: Number(guests),
                        rooms: Number(rooms),
                      }));
                    }}
                    className="w-full min-w-0 bg-transparent text-xs font-bold text-slate-900 outline-none sm:text-sm"
                  >
                    <option value="1-1">
                      1 Guest · 1 Room
                    </option>
                    <option value="2-1">
                      2 Guests · 1 Room
                    </option>
                    <option value="3-1">
                      3 Guests · 1 Room
                    </option>
                    <option value="4-1">
                      4 Guests · 1 Room
                    </option>
                    <option value="4-2">
                      4 Guests · 2 Rooms
                    </option>
                    <option value="6-2">
                      6 Guests · 2 Rooms
                    </option>
                    <option value="8-3">
                      8 Guests · 3 Rooms
                    </option>
                  </select>
                </div>
              </div>

              {/* SEARCH BUTTON */}

              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2 lg:col-span-1"
              >
                {isSearching ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={17} />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR DESTINATIONS
      ====================================================== */}

      <section className="bg-white py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Explore
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Popular destinations
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Discover stays in the world's favourite places.
              </p>
            </div>

            <button
              type="button"
              className="hidden shrink-0 items-center gap-1 text-xs font-bold text-blue-600 sm:flex"
            >
              View all
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {popularDestinations.map((destination) => (
              <button
                key={destination.id}
                type="button"
                className="group relative min-w-0 overflow-hidden rounded-2xl text-left"
              >
                <div className="relative h-40 overflow-hidden sm:h-48 lg:h-52">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <p className="text-sm font-extrabold text-white sm:text-base">
                      {destination.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/70">
                      {destination.country}
                      {" · "}
                      {destination.stays}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          RECOMMENDED HOTELS
      ====================================================== */}

      <section className="bg-slate-50 py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Handpicked for you
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Recommended hotels
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Highly rated stays selected by Tripora.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hotelData
              .filter((hotel) => hotel.featured)
              .map((hotel) => {
                const isSaved = savedHotels.includes(
                  hotel.id
                );

                return (
                  <div
                    key={hotel.id}
                    className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* IMAGE */}

                    <div className="relative h-48 overflow-hidden sm:h-52">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-blue-600 shadow-sm">
                        Recommended
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toggleSaveHotel(hotel.id)
                        }
                        className={`absolute right-3 top-3 flex w-8 h-8 items-center justify-center rounded-full backdrop-blur transition ${
                          isSaved
                            ? "bg-blue-600 text-white"
                            : "bg-white/90 text-slate-500"
                        }`}
                        aria-label="Save hotel"
                      >
                        <Heart
                          size={14}
                          fill={
                            isSaved ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </div>

                    {/* CONTENT */}

                    <div className="p-3.5">
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          fill="currentColor"
                          className="text-amber-400"
                        />

                        <span className="text-[10px] font-bold text-slate-700">
                          {hotel.rating}
                        </span>

                        <span className="text-[10px] text-slate-400">
                          ({hotel.reviews})
                        </span>
                      </div>

                      <h3 className="mt-1.5 truncate text-sm font-extrabold text-slate-900">
                        {hotel.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-slate-400">
                        <MapPin size={11} />
                        {hotel.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {hotel.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-md bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-500"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-2 border-t border-slate-100 pt-3">
                        <div className="min-w-0">
                          <p className="text-[9px] text-slate-400">
                            Starting from
                          </p>

                          <p className="text-base font-extrabold text-slate-900">
                            ₹
                            {hotel.price.toLocaleString(
                              "en-IN"
                            )}
                            <span className="text-[9px] font-medium text-slate-400">
                              /night
                            </span>
                          </p>
                        </div>

                        <Link to='/hoteldetails'>
                          <button
                          type="button"
                          className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white hover:bg-blue-700"
                        >
                          View hotel
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH RESULTS
      ====================================================== */}

      <section className="bg-white py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Hotel search
              </p>

              <h2 className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl">
                Hotels in {searchData.destination}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredHotels.length} properties available
                {" · "}
                {searchData.guests} guests
                {" · "}
                {searchData.rooms}{" "}
                {searchData.rooms === 1 ? "room" : "rooms"}
              </p>
            </div>

            {/* MOBILE FILTER */}

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
            {/* =================================================
                FILTER SIDEBAR
            ================================================== */}

            <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
              <div className="mb-5 flex items-center gap-2">
                <Filter
                  size={16}
                  className="text-blue-600"
                />

                <h3 className="text-sm font-bold text-slate-900">
                  Filters
                </h3>
              </div>

              <FilterContent />
            </aside>

            {/* =================================================
                RESULTS
            ================================================== */}

            <div className="min-w-0">
              {/* SORT */}

              <div className="mb-3 grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-50 p-1">
                {[
                  ["recommended", "Recommended"],
                  ["cheapest", "Cheapest"],
                  ["rating", "Top Rated"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveSort(value)}
                    className={`min-w-0 rounded-lg px-2 py-2 text-[10px] font-bold transition sm:text-xs ${
                      activeSort === value
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* RESULTS */}

              <div className="space-y-3">
                {filteredHotels.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <BedDouble size={21} />
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900">
                      No hotels found
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Try changing your filters or increasing
                      the price range.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredHotels.map((hotel) => {
                    const isSaved = savedHotels.includes(
                      hotel.id
                    );

                    const isExpanded =
                      expandedHotel === hotel.id;

                    return (
                      <div
                        key={hotel.id}
                        className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                      >
                        <div className="grid min-w-0 grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_150px]">
                          {/* IMAGE */}

                          <div className="relative h-52 overflow-hidden md:h-full md:min-h-[210px]">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="h-full w-full object-cover"
                            />

                            {hotel.featured && (
                              <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-extrabold text-white">
                                Recommended
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                toggleSaveHotel(hotel.id)
                              }
                              className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur ${
                                isSaved
                                  ? "bg-blue-600 text-white"
                                  : "bg-white/90 text-slate-500"
                              }`}
                              aria-label="Save hotel"
                            >
                              <Heart
                                size={14}
                                fill={
                                  isSaved
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          </div>

                          {/* INFORMATION */}

                          <div className="min-w-0 p-4 sm:p-5">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1">
                                <Star
                                  size={11}
                                  fill="currentColor"
                                  className="text-emerald-600"
                                />

                                <span className="text-[10px] font-bold text-emerald-700">
                                  {hotel.rating}
                                </span>
                              </div>

                              <span className="text-[10px] text-slate-400">
                                {hotel.reviews} reviews
                              </span>

                              <span className="text-[10px] font-semibold text-slate-400">
                                {hotel.stars} Star
                              </span>
                            </div>

                            <h3 className="mt-2 truncate text-base font-extrabold text-slate-900 sm:text-lg">
                              {hotel.name}
                            </h3>

                            <p className="mt-1 flex min-w-0 items-center gap-1 text-xs text-slate-400">
                              <MapPin
                                size={12}
                                className="shrink-0"
                              />

                              <span className="truncate">
                                {hotel.location}
                              </span>
                            </p>

                            {/* AMENITIES */}

                            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                              <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                <Wifi
                                  size={13}
                                  className="shrink-0 text-blue-500"
                                />

                                <span className="truncate text-[9px] font-semibold text-slate-600">
                                  Free WiFi
                                </span>
                              </div>

                              <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                <Coffee
                                  size={13}
                                  className="shrink-0 text-blue-500"
                                />

                                <span className="truncate text-[9px] font-semibold text-slate-600">
                                  Breakfast
                                </span>
                              </div>

                              <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                <Waves
                                  size={13}
                                  className="shrink-0 text-blue-500"
                                />

                                <span className="truncate text-[9px] font-semibold text-slate-600">
                                  Pool
                                </span>
                              </div>

                              <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-2">
                                <ParkingCircle
                                  size={13}
                                  className="shrink-0 text-blue-500"
                                />

                                <span className="truncate text-[9px] font-semibold text-slate-600">
                                  Parking
                                </span>
                              </div>
                            </div>

                            {/* CANCELLATION */}

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              {hotel.freeCancellation ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                  <Check size={12} />
                                  Free cancellation
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-400">
                                  Cancellation policy applies
                                </span>
                              )}
                            </div>

                            {/* MOBILE/TABLET ACTIONS */}

                            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 xl:hidden">
                              <div className="flex items-end justify-between gap-3">
                                <div>
                                  <p className="text-[9px] text-slate-400">
                                    Price per night
                                  </p>

                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-lg font-extrabold text-slate-900">
                                      ₹
                                      {hotel.price.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>

                                    <span className="text-[9px] text-slate-400 line-through">
                                      ₹
                                      {hotel.oldPrice.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>
                                  </div>

                                  <p className="text-[9px] text-slate-400">
                                    + ₹
                                    {hotel.taxes.toLocaleString(
                                      "en-IN"
                                    )}{" "}
                                    taxes
                                  </p>
                                </div>

                               <Link to='/hoteldetails'>
                                 <button
                                  type="button"
                                  className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                                >
                                  View hotel
                                </button>
                               </Link>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedHotel(
                                    isExpanded
                                      ? null
                                      : hotel.id
                                  )
                                }
                                className="flex items-center justify-center gap-1 text-[10px] font-bold text-blue-600"
                              >
                                {isExpanded
                                  ? "Hide details"
                                  : "View hotel details"}

                                {isExpanded ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* PRICE - DESKTOP */}

                          <div className="hidden min-w-0 flex-col justify-between border-l border-slate-100 p-5 xl:flex">
                            <div>
                              <p className="text-[9px] text-slate-400">
                                Price per night
                              </p>

                              <div className="mt-0.5 flex flex-wrap items-baseline gap-1">
                                <span className="text-xl font-extrabold text-slate-900">
                                  ₹
                                  {hotel.price.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>

                                <span className="text-[9px] text-slate-400 line-through">
                                  ₹
                                  {hotel.oldPrice.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </div>

                              <p className="mt-1 text-[9px] text-slate-400">
                                + ₹
                                {hotel.taxes.toLocaleString(
                                  "en-IN"
                                )}{" "}
                                taxes
                              </p>
                            </div>

                            <div className="space-y-2">
                             <Link to='/hoteldetails'>
                               <button
                                type="button"
                                className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-[10px] font-bold text-white hover:bg-blue-700"
                              >
                                View hotel
                                <ArrowRight size={12} />
                              </button>
                             </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedHotel(
                                    isExpanded
                                      ? null
                                      : hotel.id
                                  )
                                }
                                className="flex w-full items-center justify-center gap-1 text-[10px] font-bold text-slate-500"
                              >
                                {isExpanded
                                  ? "Hide details"
                                  : "Details"}

                                {isExpanded ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* EXPANDED DETAILS */}

                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              <div className="rounded-xl bg-white p-3">
                                <p className="text-[9px] text-slate-400">
                                  Property type
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-700">
                                  {hotel.propertyType}
                                </p>
                              </div>

                              <div className="rounded-xl bg-white p-3">
                                <p className="text-[9px] text-slate-400">
                                  Guests rating
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-700">
                                  {hotel.rating} / 5
                                </p>
                              </div>

                              <div className="rounded-xl bg-white p-3">
                                <p className="text-[9px] text-slate-400">
                                  Breakfast
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-700">
                                  {hotel.breakfast
                                    ? "Included"
                                    : "Not included"}
                                </p>
                              </div>

                              <div className="rounded-xl bg-white p-3">
                                <p className="text-[9px] text-slate-400">
                                  Cancellation
                                </p>

                                <p className="mt-1 text-xs font-bold text-emerald-600">
                                  {hotel.freeCancellation
                                    ? "Free cancellation"
                                    : "Policy applies"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
                              <ShieldCheck
                                size={14}
                                className="mt-0.5 shrink-0 text-blue-600"
                              />

                              <p className="text-[10px] leading-5 text-blue-700">
                                Room availability, taxes and final
                                prices may change before booking.
                                Review the final price before
                                completing your reservation.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLORE BY HOTEL TYPE
      ====================================================== */}

      <section className="bg-slate-50 py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Find your style
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              Explore stays by type
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {hotelTypes.map((type) => {
              const Icon = type.icon;

              return (
                <button
                  key={type.title}
                  type="button"
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-3 truncate text-sm font-extrabold text-slate-900">
                    {type.title}
                  </h3>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400">
                      {type.count} stays
                    </span>

                    <ArrowRight
                      size={13}
                      className="shrink-0 text-blue-500 transition group-hover:translate-x-1"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOTEL DEALS
      ====================================================== */}

      <section className="bg-white py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Save more
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              Best hotel deals
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Exclusive offers for your next stay.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hotelDeals.map((deal) => (
              <div
                key={deal.id}
                className="group relative min-h-[190px] overflow-hidden rounded-2xl"
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />

                <div className="relative flex min-h-[190px] flex-col justify-center p-5 sm:p-6">
                  <span className="w-fit rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-extrabold text-white">
                    {deal.discount}
                  </span>

                  <h3 className="mt-2 text-base font-extrabold text-white sm:text-lg">
                    {deal.title}
                  </h3>

                  <p className="mt-1 max-w-[220px] text-[10px] leading-4 text-white/70">
                    {deal.subtitle}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold text-white">
                      Code: {deal.code}
                    </span>

                    <button
                      type="button"
                      className="rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-900"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY TRIPORA
      ====================================================== */}

      <section className="bg-slate-50 py-3 sm:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              Why Tripora
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              Book hotels with confidence
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {[
              {
                icon: ShieldCheck,
                title: "Secure booking",
                text: "Your booking details stay protected.",
              },
              {
                icon: Star,
                title: "Best prices",
                text: "Compare stays and find better deals.",
              },
              {
                icon: Check,
                title: "Verified stays",
                text: "Choose from trusted properties.",
              },
              {
                icon: Users,
                title: "24/7 support",
                text: "We're here whenever you need help.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={16} />
                  </div>

                  <h3 className="mt-3 truncate text-xs font-bold text-slate-900 sm:text-sm">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500 sm:text-xs">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-slate-950 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BedDouble size={20} />
          </div>

          <h2 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
            Ready to find your perfect stay?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
            Great hotels, better prices and memorable journeys.
            Start exploring your next stay with Tripora.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Explore Hotels
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {isFilterOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          {/* DRAWER */}

          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[380px] sm:rounded-none sm:rounded-l-3xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Filters
                </h3>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Refine your hotel search
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            {/* FILTER BODY */}

            <div className="max-h-[calc(88vh-75px)] overflow-y-auto px-5 py-5">
              <FilterContent />

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 flex min-h-[46px] w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white"
              >
                Show {filteredHotels.length} hotels
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <button
            type="button"
            onClick={() => setActiveSort("recommended")}
            className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white"
          >
            <Star size={14} />
            Recommended
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM SPACE */}

      <div className=" lg:hidden" />
    </div>
  );
};

export default Hotels;

