
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Baby,
  BedDouble,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Coffee,
  Filter,
  Heart,
  MapPin,
  Mountain,
  Plane,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Users,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   PACKAGE DATA
========================================================= */

const packageData = [
  {
    id: 1,
    title: "Dubai Premium Escape",
    destination: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    rating: 4.8,
    reviews: 324,
    duration: "5 Days / 4 Nights",
    days: 5,
    price: 24999,
    oldPrice: 32999,
    discount: "24% OFF",
    type: "Luxury",
    category: "International",
    hotel: "4★ Hotel",
    meals: "Breakfast",
    activities: ["Desert Safari", "City Tour", "Dhow Cruise"],
    inclusions: [
      "4★ Hotel Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "Desert Safari",
    ],
    featured: true,
    bestSeller: true,
    freeCancellation: true,
  },
  {
    id: 2,
    title: "Bali Tropical Getaway",
    destination: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    rating: 4.9,
    reviews: 412,
    duration: "6 Days / 5 Nights",
    days: 6,
    price: 29999,
    oldPrice: 38999,
    discount: "23% OFF",
    type: "Honeymoon",
    category: "International",
    hotel: "4★ Resort",
    meals: "Breakfast",
    activities: ["Water Sports", "Temple Tour", "Beach Visit"],
    inclusions: [
      "4★ Resort Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "Sightseeing",
    ],
    featured: true,
    bestSeller: true,
    freeCancellation: true,
  },
  {
    id: 3,
    title: "Maldives Luxury Escape",
    destination: "Maldives",
    country: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    rating: 4.9,
    reviews: 286,
    duration: "4 Days / 3 Nights",
    days: 4,
    price: 39999,
    oldPrice: 49999,
    discount: "20% OFF",
    type: "Honeymoon",
    category: "International",
    hotel: "5★ Resort",
    meals: "All Meals",
    activities: ["Island Tour", "Snorkeling", "Sunset Cruise"],
    inclusions: [
      "5★ Beach Resort",
      "All Meals",
      "Airport Transfers",
      "Water Activities",
    ],
    featured: true,
    bestSeller: false,
    freeCancellation: true,
  },
  {
    id: 4,
    title: "Goa Beach Holiday",
    destination: "Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    rating: 4.7,
    reviews: 578,
    duration: "4 Days / 3 Nights",
    days: 4,
    price: 12999,
    oldPrice: 17999,
    discount: "28% OFF",
    type: "Beach",
    category: "Domestic",
    hotel: "4★ Hotel",
    meals: "Breakfast",
    activities: ["Beach Tour", "North Goa", "South Goa"],
    inclusions: [
      "4★ Hotel Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "Sightseeing",
    ],
    featured: true,
    bestSeller: true,
    freeCancellation: true,
  },
  {
    id: 5,
    title: "Paris Romantic Escape",
    destination: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    rating: 4.8,
    reviews: 198,
    duration: "7 Days / 6 Nights",
    days: 7,
    price: 59999,
    oldPrice: 74999,
    discount: "20% OFF",
    type: "Romantic",
    category: "International",
    hotel: "4★ Hotel",
    meals: "Breakfast",
    activities: ["Eiffel Tower", "City Tour", "Seine Cruise"],
    inclusions: [
      "4★ Hotel Stay",
      "Daily Breakfast",
      "City Tour",
      "Airport Transfers",
    ],
    featured: false,
    bestSeller: false,
    freeCancellation: true,
  },
  {
    id: 6,
    title: "Thailand Adventure",
    destination: "Thailand",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
    rating: 4.8,
    reviews: 351,
    duration: "6 Days / 5 Nights",
    days: 6,
    price: 27499,
    oldPrice: 34999,
    discount: "21% OFF",
    type: "Adventure",
    category: "International",
    hotel: "4★ Hotel",
    meals: "Breakfast",
    activities: ["Island Hopping", "Snorkeling", "City Tour"],
    inclusions: [
      "4★ Hotel Stay",
      "Daily Breakfast",
      "Island Hopping",
      "Transfers",
    ],
    featured: false,
    bestSeller: true,
    freeCancellation: true,
  },
  {
    id: 7,
    title: "Singapore Family Tour",
    destination: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
    rating: 4.7,
    reviews: 267,
    duration: "5 Days / 4 Nights",
    days: 5,
    price: 34999,
    oldPrice: 42999,
    discount: "19% OFF",
    type: "Family",
    category: "International",
    hotel: "4★ Hotel",
    meals: "Breakfast",
    activities: ["Universal Studios", "City Tour", "Sentosa"],
    inclusions: [
      "4★ Hotel Stay",
      "Daily Breakfast",
      "City Tour",
      "Airport Transfers",
    ],
    featured: false,
    bestSeller: false,
    freeCancellation: true,
  },
  {
    id: 8,
    title: "Manali Mountain Escape",
    destination: "Manali",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    rating: 4.8,
    reviews: 445,
    duration: "5 Days / 4 Nights",
    days: 5,
    price: 15999,
    oldPrice: 21999,
    discount: "27% OFF",
    type: "Adventure",
    category: "Domestic",
    hotel: "3★ Hotel",
    meals: "Breakfast + Dinner",
    activities: ["Solang Valley", "Rohtang", "Local Sightseeing"],
    inclusions: [
      "3★ Hotel Stay",
      "Breakfast & Dinner",
      "Local Transfers",
      "Sightseeing",
    ],
    featured: false,
    bestSeller: true,
    freeCancellation: true,
  },
];

/* =========================================================
   DESTINATIONS
========================================================= */

const popularDestinations = [
  {
    name: "Dubai",
    duration: "5D / 4N",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bali",
    duration: "6D / 5N",
    price: "₹29,999",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Maldives",
    duration: "4D / 3N",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Paris",
    duration: "7D / 6N",
    price: "₹59,999",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Goa",
    duration: "4D / 3N",
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================================================
   TRAVEL TYPES
========================================================= */

const travelTypes = [
  {
    name: "Honeymoon",
    icon: Heart,
    description: "Romantic escapes",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Family",
    icon: Users,
    description: "Memories together",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Adventure",
    icon: Mountain,
    description: "Thrill & discovery",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Beach",
    icon: Waves,
    description: "Relax by the sea",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Luxury",
    icon: Sparkles,
    description: "Premium experiences",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Weekend",
    icon: Clock3,
    description: "Quick getaways",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================================================
   FAQ
========================================================= */

// const faqs = [
//   {
//     question: "What is included in a holiday package?",
//     answer:
//       "Depending on the package, inclusions can include hotel stay, meals, airport transfers, sightseeing, activities and local transportation.",
//   },
//   {
//     question: "Can I customize my holiday package?",
//     answer:
//       "Yes. You can customize destinations, hotels, activities, duration and other travel preferences according to your requirements.",
//   },
//   {
//     question: "Are flights included in the package?",
//     answer:
//       "Flights depend on the selected package. The package details clearly mention whether flights are included or available as an add-on.",
//   },
//   {
//     question: "Can I cancel my package?",
//     answer:
//       "Cancellation depends on the package's cancellation policy. Packages with free cancellation will show the cancellation information clearly.",
//   },
//   {
//     question: "Can I change my travel dates?",
//     answer:
//       "Date changes depend on availability and the selected package's terms. Contact support before making changes to your booking.",
//   },
// ];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Packages = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    duration: "5 Days",
    travellers: "2 Adults",
  });

  const [activeType, setActiveType] = useState("All");
  const [activeSort, setActiveSort] = useState("recommended");

  const [priceRange, setPriceRange] = useState(70000);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [savedPackages, setSavedPackages] = useState([]);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const [customTrip, setCustomTrip] = useState({
    destination: "",
    budget: "",
    duration: "",
    type: "Honeymoon",
  });

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearchChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);

      document.getElementById("package-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 600);
  };

  /* =========================================================
     FILTER HELPERS
  ========================================================= */

  const toggleArrayValue = (setter, value) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setPriceRange(70000);
    setSelectedDuration([]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setActiveType("All");
  };

  /* =========================================================
     SAVE PACKAGE
  ========================================================= */

  const toggleSavePackage = (id) => {
    setSavedPackages((prev) =>
      prev.includes(id)
        ? prev.filter((packageId) => packageId !== id)
        : [...prev, id]
    );
  };

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredPackages = useMemo(() => {
    let result = [...packageData];

    if (searchData.destination.trim()) {
      const search = searchData.destination.toLowerCase();

      result = result.filter(
        (item) =>
          item.destination.toLowerCase().includes(search) ||
          item.country.toLowerCase().includes(search) ||
          item.title.toLowerCase().includes(search)
      );
    }

    if (activeType !== "All") {
      result = result.filter((item) => item.type === activeType);
    }

    if (priceRange) {
      result = result.filter((item) => item.price <= priceRange);
    }

    if (selectedDuration.length > 0) {
      result = result.filter((item) =>
        selectedDuration.some((duration) => {
          if (duration === "3-4 Days") {
            return item.days >= 3 && item.days <= 4;
          }

          if (duration === "5-6 Days") {
            return item.days >= 5 && item.days <= 6;
          }

          if (duration === "7+ Days") {
            return item.days >= 7;
          }

          return true;
        })
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedRatings.length > 0) {
      result = result.filter((item) =>
        selectedRatings.some((rating) => item.rating >= Number(rating))
      );
    }

    if (activeSort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (activeSort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (activeSort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    searchData.destination,
    activeType,
    priceRange,
    selectedDuration,
    selectedCategories,
    selectedRatings,
    activeSort,
  ]);

  /* =========================================================
     FILTER CONTENT
  ========================================================= */

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Price */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">Price Range</h4>

          <span className="text-xs font-semibold text-blue-600">
            ₹{priceRange.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="5000"
          max="70000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-blue-600"
        />

        <div className="mt-1 flex justify-between text-[10px] text-slate-400">
          <span>₹5K</span>
          <span>₹70K+</span>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Duration */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-slate-800">Duration</h4>

        <div className="space-y-2.5">
          {["3-4 Days", "5-6 Days", "7+ Days"].map((duration) => (
            <label
              key={duration}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedDuration.includes(duration)}
                onChange={() =>
                  toggleArrayValue(setSelectedDuration, duration)
                }
                className="h-4 w-4 rounded accent-blue-600"
              />

              <span>{duration}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Package Category */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-slate-800">
          Package Type
        </h4>

        <div className="space-y-2.5">
          {["Domestic", "International"].map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  toggleArrayValue(setSelectedCategories, category)
                }
                className="h-4 w-4 rounded accent-blue-600"
              />

              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Rating */}
      <div>
        <h4 className="mb-3 text-sm font-bold text-slate-800">Rating</h4>

        <div className="space-y-2.5">
          {["4.8", "4.5", "4.0"].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => toggleArrayValue(setSelectedRatings, rating)}
                className="h-4 w-4 rounded accent-blue-600"
              />

              <span className="flex items-center gap-1">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {rating}+
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
      >
        Reset Filters
      </button>
    </div>
  );

  /* =========================================================
     PACKAGE CARD
  ========================================================= */

  const PackageCard = ({ item }) => {
    const isSaved = savedPackages.includes(item.id);
    const isExpanded = expandedPackage === item.id;

    return (
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="grid lg:grid-cols-[240px_1fr_155px]">
          {/* Image */}
          <div className="relative h-[220px] lg:h-full lg:min-h-[245px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            {item.bestSeller && (
              <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-blue-700 shadow-sm">
                <Sparkles size={11} />
                BEST SELLER
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleSavePackage(item.id)}
              className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition ${isSaved
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-slate-600 hover:bg-white"
                }`}
              aria-label="Save package"
            >
              <Heart
                size={16}
                className={isSaved ? "fill-current" : ""}
              />
            </button>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-[10px] font-semibold text-white/80">
                {item.country}
              </p>

              <p className="mt-0.5 text-lg font-extrabold">
                {item.destination}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                    {item.type}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                    <Star
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                <h3 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                  {item.title}
                </h3>

                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  {item.duration}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <BedDouble size={15} className="text-blue-600" />
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-700">
                  {item.hotel}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5">
                <Coffee size={15} className="text-blue-600" />
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-700">
                  {item.meals}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5">
                <Plane size={15} className="text-blue-600" />
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-700">
                  Transfers
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5">
                <Sparkles size={15} className="text-blue-600" />
                <p className="mt-1 truncate text-[10px] font-semibold text-slate-700">
                  Activities
                </p>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {item.inclusions.slice(0, 4).map((inclusion) => (
                <div
                  key={inclusion}
                  className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-slate-600"
                >
                  <Check size={12} className="shrink-0 text-emerald-500" />
                  <span className="truncate">{inclusion}</span>
                </div>
              ))}
            </div>

            {item.freeCancellation && (
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                <ShieldCheck size={13} />
                Free cancellation available
              </div>
            )}

            {/* Expanded */}
            {isExpanded && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-700">
                  Package Includes
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.inclusions.map((inclusion) => (
                    <div
                      key={inclusion}
                      className="flex items-center gap-2 text-[10px] text-slate-600"
                    >
                      <Check
                        size={12}
                        className="shrink-0 text-emerald-500"
                      />
                      {inclusion}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.activities.map((activity) => (
                    <span
                      key={activity}
                      className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-slate-600"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setExpandedPackage(isExpanded ? null : item.id)
              }
              className="mt-4 flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? "Hide details" : "View package details"}

              {isExpanded ? (
                <ChevronUp size={13} />
              ) : (
                <ChevronDown size={13} />
              )}
            </button>
          </div>

          {/* Price */}
          <div className="border-t border-slate-100 bg-slate-50/60 p-4 lg:border-l lg:border-t-0 lg:p-5">
            <div className="flex h-full flex-row items-center justify-between gap-4 lg:flex-col lg:items-end lg:justify-center">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
                  <Tag size={10} />
                  {item.discount}
                </span>

                <div className="mt-2 flex items-center gap-2 lg:flex-col lg:items-end lg:gap-0">
                  <span className="text-xs text-slate-400 line-through">
                    ₹{item.oldPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="mt-0.5 text-right text-[9px] text-slate-400">
                  per person
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/packages/${item.id}`)}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                View Package
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-visible bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-blue-100 backdrop-blur-sm">
              <Sparkles size={12} />
              TRAVEL SMART WITH TRIPORA
            </span>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Discover Your Perfect
              <span className="block text-blue-400">
                Holiday Package
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
              Curated trips, handpicked stays and unforgettable experiences
              at the best available prices.
            </p>
          </div>

          {/* Search Card */}
          <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              {/* Destination */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <MapPin size={17} className="shrink-0 text-blue-600" />

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) =>
                      handleSearchChange("destination", e.target.value)
                    }
                    placeholder="Where do you want to go?"
                    className="mt-0.5 w-full bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <Clock3 size={17} className="shrink-0 text-blue-600" />

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    Travel Date
                  </p>

                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) =>
                      handleSearchChange("date", e.target.value)
                    }
                    className="mt-0.5 w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <Clock3 size={17} className="shrink-0 text-blue-600" />

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    Duration
                  </p>

                  <select
                    value={searchData.duration}
                    onChange={(e) =>
                      handleSearchChange("duration", e.target.value)
                    }
                    className="mt-0.5 w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option>3 Days</option>
                    <option>4 Days</option>
                    <option>5 Days</option>
                    <option>6 Days</option>
                    <option>7 Days</option>
                    <option>10+ Days</option>
                  </select>
                </div>
              </div>

              {/* Travellers */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <Users size={17} className="shrink-0 text-blue-600" />

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    Travellers
                  </p>

                  <select
                    value={searchData.travellers}
                    onChange={(e) =>
                      handleSearchChange("travellers", e.target.value)
                    }
                    className="mt-0.5 w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                    <option>5+ Adults</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Search size={16} />
                {isSearching ? "Searching..." : "Search Packages"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR DESTINATIONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
              Explore
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Popular Destinations
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Discover destinations loved by Tripora travellers.
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1 text-xs font-bold text-blue-600 sm:flex"
          >
            View All
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {popularDestinations.map((destination) => (
            <button
              type="button"
              key={destination.name}
              onClick={() =>
                setSearchData((prev) => ({
                  ...prev,
                  destination: destination.name,
                }))
              }
              className="group relative h-36 overflow-hidden rounded-2xl text-left sm:h-40"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-sm font-extrabold">
                  {destination.name}
                </p>

                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-[9px] text-white/80">
                    {destination.duration}
                  </span>

                  <span className="text-[10px] font-bold">
                    {destination.price}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED PACKAGES
      ===================================================== */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                Handpicked For You
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                Featured Holiday Packages
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Popular packages with stays, activities and transfers.
              </p>
            </div>

            <button
              type="button"
              className="hidden items-center gap-1 text-xs font-bold text-blue-600 sm:flex"
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packageData
              .filter((item) => item.featured)
              .map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {item.bestSeller && (
                      <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-extrabold text-white">
                        BEST SELLER
                      </span>
                    )}

                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold text-red-600">
                      {item.discount}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <p className="text-lg font-black">
                          {item.destination}
                        </p>
                        <p className="text-[10px] text-white/80">
                          {item.duration}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold backdrop-blur-sm">
                        <Star
                          size={11}
                          className="fill-amber-400 text-amber-400"
                        />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="truncate text-base font-extrabold text-slate-900">
                      {item.title}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {item.inclusions.slice(0, 4).map((inclusion) => (
                        <div
                          key={inclusion}
                          className="flex min-w-0 items-center gap-1.5 text-[9px] font-semibold text-slate-600"
                        >
                          <Check
                            size={11}
                            className="shrink-0 text-emerald-500"
                          />
                          <span className="truncate">{inclusion}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-[9px] text-slate-400">
                          Starting from
                        </p>

                        <p className="text-lg font-black text-slate-900">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/packages/${item.id}`)}
                        className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3.5 py-2 text-[10px] font-bold text-white hover:bg-blue-700"
                      >
                        Explore
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAVEL TYPE
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="mb-5">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
            Find Your Style
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            Explore By Travel Type
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {travelTypes.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveType(item.name)}
                className={`group relative h-32 overflow-hidden rounded-2xl text-left ${activeType === item.name
                    ? "ring-2 ring-blue-600 ring-offset-2"
                    : ""
                  }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-x-3 bottom-3 text-white">
                  <Icon size={17} />

                  <p className="mt-1 text-sm font-extrabold">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/80">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {activeType !== "All" && (
          <button
            type="button"
            onClick={() => setActiveType("All")}
            className="mt-3 text-xs font-bold text-blue-600"
          >
            Clear travel type
          </button>
        )}
      </section>

      {/* =====================================================
          SPECIAL OFFER
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 pb-1 sm:px-6 sm:pb-4 lg:px-8 lg:pb-4">
        <div className="overflow-hidden rounded-3xl bg-blue-600">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="relative h-64 lg:h-[340px]">
              <img
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"
                alt="Bali special offer"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold text-red-600">
                LIMITED TIME OFFER
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 text-white sm:p-7 lg:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-100">
                Special Holiday Deal
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Bali Tropical Getaway
              </h2>

              <p className="mt-2 text-xs leading-5 text-blue-100">
                Experience beaches, temples, island adventures and
                unforgettable sunsets with our curated Bali package.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["6 Days / 5 Nights", "4★ Resort", "Breakfast", "Transfers"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[9px] font-bold"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] text-blue-100">
                    Starting from
                  </p>

                  <p className="text-2xl font-black">₹29,999</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate(`/packages/1`);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-blue-600 transition hover:bg-blue-50"
                >
                  View Deal
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ALL PACKAGES
      ===================================================== */}
      <section
        id="package-results"
        className="scroll-mt-20 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                Find Your Trip
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                Holiday Packages
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredPackages.length} packages available
              </p>
            </div>

            {/* Mobile Filter */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            {/* Desktop Sidebar */}
            <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 lg:block lg:self-start">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter size={15} className="text-blue-600" />
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Filters
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-bold text-blue-600"
                >
                  Reset
                </button>
              </div>

              <FilterContent />
            </aside>

            {/* Results */}
            <div className="min-w-0">
              {/* Sort */}
              <div className="mb-4 flex items-center justify-between gap-3 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5">
                <div className="flex min-w-max gap-1">
                  {[
                    ["recommended", "Recommended"],
                    ["price-low", "Cheapest"],
                    ["rating", "Top Rated"],
                    ["price-high", "Price High"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setActiveSort(value)}
                      className={`rounded-lg px-3 py-2 text-[10px] font-bold ${activeSort === value
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <span className="hidden shrink-0 pr-2 text-[10px] font-semibold text-slate-400 sm:block">
                  {filteredPackages.length} results
                </span>
              </div>

              <div className="space-y-4">
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((item) => (
                    <PackageCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
                    <Search
                      size={30}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-3 text-base font-extrabold text-slate-800">
                      No packages found
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Try changing your destination or filters.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY TRIPORA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="mb-5 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
            Travel With Confidence
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            Why Choose Tripora?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              icon: Tag,
              title: "Best Prices",
              text: "Great packages at competitive prices.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Booking",
              text: "Safe and reliable travel booking.",
            },
            {
              icon: Users,
              title: "24/7 Support",
              text: "Help whenever you need it.",
            },
            {
              icon: Sparkles,
              title: "Curated Trips",
              text: "Handpicked experiences for every traveller.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={19} />
                </div>

                <h3 className="mt-3 text-sm font-extrabold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CUSTOM TRIP
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 pb-1 sm:px-6 sm:pb-2 lg:px-8 lg:pb-4">
        <div className="overflow-hidden rounded-3xl bg-slate-950">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-5 text-white sm:p-7 lg:p-9">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1.5 text-[10px] font-bold text-blue-300">
                <Sparkles size={12} />
                CUSTOM TRIP
              </span>

              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                Build Your Dream Trip
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-slate-400">
                Tell us your preferences and create a holiday that matches
                your budget, style and travel plans.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <MapPin size={16} className="text-blue-400" />
                  <p className="mt-2 text-[10px] font-bold text-white">
                    Choose Destination
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Tag size={16} className="text-blue-400" />
                  <p className="mt-2 text-[10px] font-bold text-white">
                    Set Your Budget
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Clock3 size={16} className="text-blue-400" />
                  <p className="mt-2 text-[10px] font-bold text-white">
                    Select Duration
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Heart size={16} className="text-blue-400" />
                  <p className="mt-2 text-[10px] font-bold text-white">
                    Pick Travel Style
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-7 lg:p-9">
              <h3 className="text-lg font-black text-slate-900">
                Tell us about your trip
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                    Destination
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                    <MapPin size={15} className="text-blue-600" />

                    <input
                      type="text"
                      value={customTrip.destination}
                      onChange={(e) =>
                        setCustomTrip((prev) => ({
                          ...prev,
                          destination: e.target.value,
                        }))
                      }
                      placeholder="e.g. Bali"
                      className="w-full text-xs font-semibold outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                    Budget
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                    <Tag size={15} className="text-blue-600" />

                    <select
                      value={customTrip.budget}
                      onChange={(e) =>
                        setCustomTrip((prev) => ({
                          ...prev,
                          budget: e.target.value,
                        }))
                      }
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    >
                      <option value="">Select budget</option>
                      <option value="under-20k">Under ₹20K</option>
                      <option value="20-40k">₹20K - ₹40K</option>
                      <option value="40-60k">₹40K - ₹60K</option>
                      <option value="60k-plus">₹60K+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                    Duration
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                    <Clock3 size={15} className="text-blue-600" />

                    <select
                      value={customTrip.duration}
                      onChange={(e) =>
                        setCustomTrip((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    >
                      <option value="">Select duration</option>
                      <option value="3-4">3 - 4 Days</option>
                      <option value="5-6">5 - 6 Days</option>
                      <option value="7-8">7 - 8 Days</option>
                      <option value="9-plus">9+ Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-slate-500">
                    Travel Type
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                    <Heart size={15} className="text-blue-600" />

                    <select
                      value={customTrip.type}
                      onChange={(e) =>
                        setCustomTrip((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    >
                      <option>Honeymoon</option>
                      <option>Family</option>
                      <option>Adventure</option>
                      <option>Beach</option>
                      <option>Luxury</option>
                      <option>Weekend</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-extrabold text-white transition hover:bg-blue-700"
              >
                Plan My Trip
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INCLUSIONS
      ===================================================== */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mb-5 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
              Everything You Need
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Package Inclusions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              [BedDouble, "Hotels"],
              [Plane, "Flights"],
              [Utensils, "Meals"],
              [MapPin, "Transfers"],
              [Sparkles, "Activities"],
              [ShieldCheck, "Travel Support"],
            ].map(([Icon, title]) => (
              <div
                key={title}
                className="flex min-w-0 flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={18} />
                </div>

                <p className="mt-2 truncate text-[10px] font-extrabold text-slate-700">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAVELER REVIEWS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="mb-5 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
            Traveler Stories
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Rahul Sharma",
              city: "Delhi",
              text: "The Bali package was perfectly planned. Hotels and activities were excellent.",
            },
            {
              name: "Priya Singh",
              city: "Mumbai",
              text: "We booked our honeymoon package through Tripora and everything was hassle-free.",
            },
            {
              name: "Amit Verma",
              city: "Bengaluru",
              text: "Great pricing and a very smooth booking experience. Highly recommended.",
            },
          ].map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-600">
                "{review.text}"
              </p>

              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-600">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <p className="text-xs font-extrabold text-slate-800">
                    {review.name}
                  </p>

                  <p className="text-[9px] text-slate-400">
                    {review.city}, India
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      {/* <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mb-5 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
              Need Help?
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                  >
                    <span className="text-xs font-extrabold text-slate-800">
                      {faq.question}
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
                    <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                      <p className="text-xs leading-5 text-slate-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-5 py-8 text-center text-white sm:px-8 sm:py-10">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-blue-100">
              <Sparkles size={12} />
              YOUR NEXT ADVENTURE AWAITS
            </span>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Ready for Your Next Adventure?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-blue-100">
              Explore amazing holiday packages and create memories that
              last a lifetime.
            </p>

            <button
              type="button"
              onClick={() =>
                document.getElementById("package-results")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-blue-600 shadow-lg transition hover:bg-blue-50"
            >
              Explore Packages
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} className="text-blue-600" />

                <h3 className="text-base font-extrabold text-slate-900">
                  Filters
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <FilterContent />

            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-extrabold text-white"
            >
              Show {filteredPackages.length} Packages
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className="h-16 lg:hidden" />

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-2.5 shadow-2xl backdrop-blur-sm lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-extrabold text-slate-700"
          >
            <Filter size={15} />
            Filter
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveSort(
                activeSort === "price-low" ? "recommended" : "price-low"
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-extrabold text-white"
          >
            <ArrowRight size={15} />
            {activeSort === "price-low" ? "Recommended" : "Cheapest"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packages;


