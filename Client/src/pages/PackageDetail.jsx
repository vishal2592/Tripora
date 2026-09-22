
import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  FileText,
  Hotel,
  Info,
  MapPin,
  Plane,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

/* =========================================================
   PACKAGE DATA
========================================================= */

const packageData = {
  "dubai-explorer": {
    id: "dubai-explorer",
    name: "Dubai Explorer",
    destination: "Dubai",
    country: "UAE",

    rating: 4.8,
    reviews: 324,

    duration: "5 Days / 4 Nights",

    price: 34999,
    oldPrice: 42999,
    savings: 8000,

    travelers: 2,

    tag: "Best Seller",

    shortDescription:
      "Experience the best of Dubai with luxury stays, iconic attractions, desert safari and comfortable transfers.",

    description:
      "Experience the best of Dubai with our carefully designed 5-day holiday package. Explore the iconic Burj Khalifa, discover Dubai Marina, enjoy an exciting desert safari and relax at a premium hotel. This package combines sightseeing, comfort and memorable experiences for a hassle-free Dubai holiday.",

    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=85",
    ],

    overview: [
      {
        icon: <CalendarDays size={18} />,
        label: "Duration",
        value: "5 Days / 4 Nights",
      },
      {
        icon: <Users size={18} />,
        label: "Travellers",
        value: "2 People",
      },
      {
        icon: <Hotel size={18} />,
        label: "Stay",
        value: "4 Star Hotel",
      },
      {
        icon: <Plane size={18} />,
        label: "Flights",
        value: "Included",
      },
    ],

    highlights: [
      {
        icon: "🏙️",
        title: "Burj Khalifa",
        description:
          "Visit the world's iconic skyscraper and enjoy stunning city views.",
      },
      {
        icon: "🏜️",
        title: "Desert Safari",
        description:
          "Enjoy dune bashing, camel rides, BBQ dinner and live entertainment.",
      },
      {
        icon: "🚤",
        title: "Marina Cruise",
        description:
          "Relax on a beautiful evening cruise around Dubai Marina.",
      },
      {
        icon: "🛍️",
        title: "Dubai Mall",
        description:
          "Explore one of the world's largest shopping and entertainment destinations.",
      },
    ],

    itinerary: [
      {
        day: "Day 1",
        title: "Dubai Arrival",
        description:
          "Arrive at Dubai International Airport and transfer to your hotel.",
        activities: [
          "Airport Pickup",
          "Hotel Check-in",
          "Welcome Assistance",
          "Evening at Leisure",
        ],
      },
      {
        day: "Day 2",
        title: "Dubai City Tour",
        description:
          "Explore Dubai's most famous landmarks and attractions.",
        activities: [
          "Burj Khalifa",
          "Dubai Mall",
          "Jumeirah Mosque",
          "Palm Jumeirah",
          "Photo Stop at Atlantis",
        ],
      },
      {
        day: "Day 3",
        title: "Desert Safari",
        description:
          "Spend an exciting evening in the Dubai desert.",
        activities: [
          "Desert Dune Bashing",
          "Camel Ride",
          "Sunset Photography",
          "Live Entertainment",
          "BBQ Dinner",
        ],
      },
      {
        day: "Day 4",
        title: "Dubai Marina & Leisure",
        description:
          "Enjoy Dubai Marina and spend the rest of the day at leisure.",
        activities: [
          "Dubai Marina",
          "Marina Cruise",
          "Palm Jumeirah",
          "Shopping",
          "Evening Leisure",
        ],
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Enjoy breakfast before checking out and transferring to the airport.",
        activities: [
          "Breakfast",
          "Hotel Check-out",
          "Airport Transfer",
          "Departure",
        ],
      },
    ],

    inclusions: [
      "4 nights accommodation in a 4-star hotel",
      "Daily breakfast",
      "Return economy class flights",
      "Airport pickup and drop",
      "Dubai city sightseeing",
      "Desert safari with BBQ dinner",
      "Marina cruise",
      "Professional assistance",
    ],

    exclusions: [
      "Personal expenses",
      "Travel insurance",
      "Visa charges",
      "Tips and gratuities",
      "Extra activities",
      "Meals not mentioned",
    ],

    hotel: {
      name: "Dubai Grand Hotel",
      rating: 4.5,
      room: "Deluxe Room",
      nights: 4,
      meal: "Breakfast Included",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
      location: "Dubai, UAE",
    },

    flights: {
      departure: {
        airline: "IndiGo",
        flight: "6E 1453",
        from: "Delhi",
        fromCode: "DEL",
        fromTime: "06:30 AM",
        to: "Dubai",
        toCode: "DXB",
        toTime: "09:15 AM",
        duration: "3h 45m",
      },

      return: {
        airline: "IndiGo",
        flight: "6E 1454",
        from: "Dubai",
        fromCode: "DXB",
        fromTime: "10:30 AM",
        to: "Delhi",
        toCode: "DEL",
        toTime: "03:25 PM",
        duration: "3h 55m",
      },
    },

    importantInfo: [
      "Passport should be valid for at least 6 months from the travel date.",
      "Flight timings are subject to airline availability.",
      "Hotel check-in and check-out timings depend on the hotel.",
      "Some attractions may require advance reservation.",
      "The itinerary can change due to weather or operational reasons.",
    ],

    cancellation: [
      "Free cancellation up to 15 days before departure.",
      "50% cancellation fee between 7 and 14 days before departure.",
      "100% cancellation fee within 7 days of departure.",
      "Flight cancellation charges are subject to airline policy.",
    ],
  },

  "bali-escape": {
    id: "bali-escape",
    name: "Bali Escape",
    destination: "Bali",
    country: "Indonesia",

    rating: 4.7,
    reviews: 286,

    duration: "5 Days / 4 Nights",

    price: 39999,
    oldPrice: 47999,
    savings: 8000,

    travelers: 2,

    tag: "Popular",

    shortDescription:
      "Discover Bali's beaches, temples, waterfalls and tropical landscapes with a comfortable 5-day holiday.",

    description:
      "Explore the beauty of Bali with a perfect mix of beaches, culture, adventure and relaxation. Visit iconic temples, discover waterfalls and enjoy beautiful sunsets while staying in a comfortable hotel.",

    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1555400038-5f4f5f6f6f0e?auto=format&fit=crop&w=900&q=85",
    ],

    overview: [
      {
        icon: <CalendarDays size={18} />,
        label: "Duration",
        value: "5 Days / 4 Nights",
      },
      {
        icon: <Users size={18} />,
        label: "Travellers",
        value: "2 People",
      },
      {
        icon: <Hotel size={18} />,
        label: "Stay",
        value: "4 Star Hotel",
      },
      {
        icon: <Plane size={18} />,
        label: "Flights",
        value: "Included",
      },
    ],

    highlights: [
      {
        icon: "🏝️",
        title: "Beautiful Beaches",
        description:
          "Relax at some of Bali's most beautiful tropical beaches.",
      },
      {
        icon: "🛕",
        title: "Temple Tour",
        description:
          "Explore Bali's famous temples and cultural landmarks.",
      },
      {
        icon: "🌊",
        title: "Waterfalls",
        description:
          "Discover Bali's beautiful waterfalls surrounded by nature.",
      },
      {
        icon: "🌅",
        title: "Sunset Experience",
        description:
          "Enjoy unforgettable tropical sunsets during your stay.",
      },
    ],

    itinerary: [
      {
        day: "Day 1",
        title: "Bali Arrival",
        description:
          "Airport pickup and hotel transfer followed by leisure time.",
        activities: [
          "Airport Pickup",
          "Hotel Check-in",
          "Welcome Assistance",
          "Evening Leisure",
        ],
      },
      {
        day: "Day 2",
        title: "Ubud Exploration",
        description:
          "Explore Ubud's temples, rice terraces and cultural attractions.",
        activities: [
          "Ubud Palace",
          "Rice Terraces",
          "Monkey Forest",
          "Local Market",
        ],
      },
      {
        day: "Day 3",
        title: "Temple & Waterfall Tour",
        description:
          "Discover Bali's famous temples and natural attractions.",
        activities: [
          "Temple Visit",
          "Waterfall Visit",
          "Photography",
          "Local Lunch",
        ],
      },
      {
        day: "Day 4",
        title: "Beach & Sunset",
        description:
          "Relax at the beach and enjoy a beautiful Bali sunset.",
        activities: [
          "Beach Visit",
          "Leisure Time",
          "Sunset Point",
          "Dinner",
        ],
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Breakfast, checkout and airport transfer.",
        activities: [
          "Breakfast",
          "Hotel Check-out",
          "Airport Transfer",
          "Departure",
        ],
      },
    ],

    inclusions: [
      "4 nights hotel accommodation",
      "Daily breakfast",
      "Return economy flights",
      "Airport transfers",
      "Ubud sightseeing",
      "Temple tour",
      "Waterfall visit",
      "Local assistance",
    ],

    exclusions: [
      "Visa charges",
      "Personal expenses",
      "Travel insurance",
      "Tips",
      "Extra activities",
      "Meals not mentioned",
    ],

    hotel: {
      name: "Bali Paradise Resort",
      rating: 4.6,
      room: "Premium Room",
      nights: 4,
      meal: "Breakfast Included",
      image:
        "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000&q=85",
      location: "Bali, Indonesia",
    },

    flights: {
      departure: {
        airline: "IndiGo",
        flight: "6E 101",
        from: "Delhi",
        fromCode: "DEL",
        fromTime: "08:00 AM",
        to: "Bali",
        toCode: "DPS",
        toTime: "05:30 PM",
        duration: "8h 30m",
      },

      return: {
        airline: "IndiGo",
        flight: "6E 102",
        from: "Bali",
        fromCode: "DPS",
        fromTime: "09:00 AM",
        to: "Delhi",
        toCode: "DEL",
        toTime: "05:00 PM",
        duration: "8h",
      },
    },

    importantInfo: [
      "Passport should be valid for at least 6 months.",
      "Flight timings are subject to availability.",
      "Weather can affect outdoor activities.",
      "Some activities require advance confirmation.",
      "The itinerary may change based on local conditions.",
    ],

    cancellation: [
      "Free cancellation up to 15 days before departure.",
      "50% cancellation fee between 7 and 14 days.",
      "100% cancellation fee within 7 days.",
      "Flight cancellation follows airline policy.",
    ],
  },

  "thailand-adventure": {
    id: "thailand-adventure",
    name: "Thailand Adventure",
    destination: "Thailand",
    country: "Thailand",

    rating: 4.6,
    reviews: 198,

    duration: "5 Days / 4 Nights",

    price: 29999,
    oldPrice: 36999,
    savings: 7000,

    travelers: 2,

    tag: "Great Value",

    shortDescription:
      "Enjoy Thailand's beaches, island tours, nightlife and cultural attractions in one memorable holiday.",

    description:
      "Discover Thailand with a carefully planned holiday package covering beautiful beaches, cultural landmarks and exciting island experiences. Perfect for couples, friends and first-time travellers.",

    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=85",
    ],

    overview: [
      {
        icon: <CalendarDays size={18} />,
        label: "Duration",
        value: "5 Days / 4 Nights",
      },
      {
        icon: <Users size={18} />,
        label: "Travellers",
        value: "2 People",
      },
      {
        icon: <Hotel size={18} />,
        label: "Stay",
        value: "4 Star Hotel",
      },
      {
        icon: <Plane size={18} />,
        label: "Flights",
        value: "Included",
      },
    ],

    highlights: [
      {
        icon: "🏝️",
        title: "Island Tour",
        description:
          "Explore Thailand's stunning islands and crystal-clear waters.",
      },
      {
        icon: "🛕",
        title: "Temple Tour",
        description:
          "Experience Thailand's rich culture and beautiful temples.",
      },
      {
        icon: "🌊",
        title: "Beach Activities",
        description:
          "Enjoy relaxing beach time and exciting water activities.",
      },
      {
        icon: "🌃",
        title: "Night Market",
        description:
          "Experience Thailand's vibrant local markets and food.",
      },
    ],

    itinerary: [
      {
        day: "Day 1",
        title: "Thailand Arrival",
        description:
          "Airport pickup followed by hotel check-in.",
        activities: [
          "Airport Pickup",
          "Hotel Check-in",
          "Welcome Assistance",
          "Evening Leisure",
        ],
      },
      {
        day: "Day 2",
        title: "City & Temple Tour",
        description:
          "Discover famous temples and cultural attractions.",
        activities: [
          "Temple Visit",
          "City Tour",
          "Local Market",
          "Thai Lunch",
        ],
      },
      {
        day: "Day 3",
        title: "Island Adventure",
        description:
          "Spend the day exploring beautiful islands.",
        activities: [
          "Boat Ride",
          "Island Visit",
          "Snorkeling",
          "Beach Time",
        ],
      },
      {
        day: "Day 4",
        title: "Leisure & Shopping",
        description:
          "Enjoy a relaxed day with shopping and local experiences.",
        activities: [
          "Breakfast",
          "Shopping",
          "Night Market",
          "Dinner",
        ],
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Breakfast, checkout and airport transfer.",
        activities: [
          "Breakfast",
          "Hotel Check-out",
          "Airport Transfer",
          "Departure",
        ],
      },
    ],

    inclusions: [
      "4 nights hotel accommodation",
      "Daily breakfast",
      "Return economy flights",
      "Airport transfers",
      "City sightseeing",
      "Island tour",
      "Selected activities",
      "Travel assistance",
    ],

    exclusions: [
      "Visa charges",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Optional activities",
      "Meals not mentioned",
    ],

    hotel: {
      name: "Thailand Beach Resort",
      rating: 4.4,
      room: "Deluxe Room",
      nights: 4,
      meal: "Breakfast Included",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
      location: "Phuket, Thailand",
    },

    flights: {
      departure: {
        airline: "IndiGo",
        flight: "6E 105",
        from: "Delhi",
        fromCode: "DEL",
        fromTime: "07:00 AM",
        to: "Phuket",
        toCode: "HKT",
        toTime: "03:30 PM",
        duration: "8h 30m",
      },

      return: {
        airline: "IndiGo",
        flight: "6E 106",
        from: "Phuket",
        fromCode: "HKT",
        fromTime: "10:00 AM",
        to: "Delhi",
        toCode: "DEL",
        toTime: "06:30 PM",
        duration: "8h 30m",
      },
    },

    importantInfo: [
      "Passport should be valid for at least 6 months.",
      "International travel documents must be carried.",
      "Flight timings can change.",
      "Island activities depend on weather.",
      "The itinerary can be adjusted if required.",
    ],

    cancellation: [
      "Free cancellation up to 15 days before departure.",
      "50% cancellation fee between 7 and 14 days.",
      "100% cancellation fee within 7 days.",
      "Airline cancellation rules apply separately.",
    ],
  },
};

/* =========================================================
   SIMILAR PACKAGES
========================================================= */

const similarPackages = [
  {
    id: "dubai-explorer",
    name: "Dubai Explorer",
    destination: "Dubai",
    duration: "5 Days / 4 Nights",
    price: 34999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "bali-escape",
    name: "Bali Escape",
    destination: "Bali",
    duration: "5 Days / 4 Nights",
    price: 39999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "thailand-adventure",
    name: "Thailand Adventure",
    destination: "Thailand",
    duration: "5 Days / 4 Nights",
    price: 29999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=700&q=85",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const PackageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [activeImage, setActiveImage] = useState(0);

  const [openDay, setOpenDay] = useState(0);

  const [travellers, setTravellers] = useState(2);

  const [travelDate, setTravelDate] = useState("");

  const packageItem = useMemo(() => {
    if (id && packageData[id]) {
      return packageData[id];
    }

    const destination =
      new URLSearchParams(location.search).get(
        "destination"
      );

    if (destination) {
      const slug = destination
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const found = Object.values(packageData).find(
        (item) =>
          item.destination.toLowerCase() ===
            destination.toLowerCase() ||
          item.id.includes(slug)
      );

      if (found) return found;
    }

    return packageData["dubai-explorer"];
  }, [id, location.search]);

  /* =======================================================
     BOOK NOW
  ======================================================= */

const handleBookNow = () => {
  const safePackageData = {
    id: packageItem.id,
    title: packageItem.title,
    destination: packageItem.destination,
    duration: packageItem.duration,
    image: packageItem.image,
    price: Number(packageItem.price) || 0,
    oldPrice: Number(packageItem.oldPrice) || 0,
    rating: Number(packageItem.rating) || 0,
    reviews: Number(packageItem.reviews) || 0,
  };

  navigate(`/package-booking/${packageItem.id}`, {
    state: {
      packageData: safePackageData,
      travellers: {
        adults: Number(travellers.adults) || 1,
        children: Number(travellers.children) || 0,
        infants: Number(travellers.infants) || 0,
      },
      travelDate: travelDate || "",
    },
  });
};

  /* =======================================================
     IMAGE CONTROLS
  ======================================================= */

  const nextImage = () => {
    setActiveImage(
      (prev) =>
        (prev + 1) % packageItem.images.length
    );
  };

  const previousImage = () => {
    setActiveImage(
      (prev) =>
        (prev - 1 + packageItem.images.length) %
        packageItem.images.length
    );
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">

      {/* ===================================================
          TOP BAR / BREADCRUMB
      =================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 text-xs text-slate-500">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 font-semibold text-slate-600 transition hover:text-blue-600"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <ChevronRight
              size={13}
              className="text-slate-300"
            />

            <button
              type="button"
              onClick={() => navigate("/packages")}
              className="hidden transition hover:text-blue-600 sm:block"
            >
              Packages
            </button>

            <ChevronRight
              size={13}
              className="hidden text-slate-300 sm:block"
            />

            <span className="truncate font-semibold text-slate-800">
              {packageItem.name}
            </span>

          </div>

        </div>

      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-slate-900">

          <img
            src={packageItem.images[activeImage]}
            alt={packageItem.name}
            className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[430px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

          {/* Image Controls */}

          <button
            type="button"
            onClick={previousImage}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
          >
            <ChevronRight size={18} />
          </button>

          {/* Hero Content */}

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">

            <div className="max-w-3xl">

              <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                {packageItem.tag}
              </span>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {packageItem.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/90">

                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {packageItem.destination},{" "}
                  {packageItem.country}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {packageItem.duration}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  {packageItem.rating} (
                  {packageItem.reviews} Reviews)
                </span>

              </div>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-white/80 sm:text-sm">
                {packageItem.shortDescription}
              </p>

            </div>

          </div>

        </div>

        {/* Thumbnails */}

        <div className="mt-3 grid grid-cols-4 gap-2">

          {packageItem.images.map((image, index) => (
            <button
              type="button"
              key={image}
              onClick={() => setActiveImage(index)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                activeImage === index
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${packageItem.name} ${index + 1}`}
                className="h-16 w-full object-cover sm:h-20"
              />
            </button>
          ))}

        </div>

      </section>

      {/* ===================================================
          OVERVIEW
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {packageItem.overview.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {item.icon}
              </div>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {item.label}
              </p>

              <p className="mt-1 text-xs font-black text-slate-900 sm:text-sm">
                {item.value}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="mx-auto max-w-7xl px-4 pb-4 pt-5 sm:px-6 lg:px-8 lg:pb-12">

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="min-w-0 space-y-5">

            {/* About */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<Info size={18} />}
                title="About This Package"
              />

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {packageItem.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "Handpicked Hotels",
                  "Airport Transfers",
                  "Guided Sightseeing",
                  "Flexible Booking",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-600"
                  >
                    <Check
                      size={13}
                      className="text-emerald-600"
                    />
                    {item}
                  </span>
                ))}

              </div>

            </section>

            {/* Highlights */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<Star size={18} />}
                title="Package Highlights"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {packageItem.highlights.map(
                  (highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                          {highlight.icon}
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-black text-slate-900">
                            {highlight.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {highlight.description}
                          </p>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* Itinerary */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<CalendarDays size={18} />}
                title="Day-by-Day Itinerary"
              />

              <div className="mt-5 space-y-3">

                {packageItem.itinerary.map(
                  (day, index) => {
                    const isOpen =
                      openDay === index;

                    return (
                      <div
                        key={day.day}
                        className={`overflow-hidden rounded-2xl border transition ${
                          isOpen
                            ? "border-blue-200 bg-blue-50/40"
                            : "border-slate-200 bg-white"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            setOpenDay(
                              isOpen ? -1 : index
                            )
                          }
                          className="flex w-full items-center gap-3 p-4 text-left"
                        >

                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                              isOpen
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                              {day.day}
                            </p>

                            <h3 className="mt-0.5 text-sm font-black text-slate-900">
                              {day.title}
                            </h3>

                          </div>

                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-slate-400 transition ${
                              isOpen
                                ? "rotate-180 text-blue-600"
                                : ""
                            }`}
                          />

                        </button>

                        {isOpen && (
                          <div className="border-t border-blue-100 px-4 pb-4 pt-3">

                            <p className="text-xs leading-6 text-slate-600">
                              {day.description}
                            </p>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">

                              {day.activities.map(
                                (activity) => (
                                  <div
                                    key={activity}
                                    className="flex items-center gap-2 text-xs font-medium text-slate-600"
                                  >
                                    <Check
                                      size={14}
                                      className="shrink-0 text-emerald-600"
                                    />
                                    {activity}
                                  </div>
                                )
                              )}

                            </div>

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* Inclusions */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<Check size={18} />}
                title="Inclusions & Exclusions"
              />

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    What's Included
                  </h3>

                  <div className="mt-3 space-y-2.5">

                    {packageItem.inclusions.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                        >
                          <Check
                            size={15}
                            className="mt-0.5 shrink-0 text-emerald-600"
                          />
                          <span>{item}</span>
                        </div>
                      )
                    )}

                  </div>

                </div>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    What's Not Included
                  </h3>

                  <div className="mt-3 space-y-2.5">

                    {packageItem.exclusions.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                        >
                          <X
                            size={15}
                            className="mt-0.5 shrink-0 text-red-500"
                          />
                          <span>{item}</span>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </section>

            {/* Hotel */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<Hotel size={18} />}
                title="Stay Details"
              />

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">

                <div className="flex flex-col sm:flex-row">

                  <div className="h-48 w-full shrink-0 sm:h-auto sm:w-52">

                    <img
                      src={packageItem.hotel.image}
                      alt={packageItem.hotel.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="min-w-0 flex-1 p-4">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div>

                        <h3 className="text-base font-black text-slate-900">
                          {packageItem.hotel.name}
                        </h3>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin size={13} />
                          {packageItem.hotel.location}
                        </p>

                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                        <Star
                          size={12}
                          fill="currentColor"
                        />
                        {packageItem.hotel.rating}
                      </span>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

                      <SmallInfo
                        icon={<BedDouble size={14} />}
                        label="Room"
                        value={packageItem.hotel.room}
                      />

                      <SmallInfo
                        icon={<MoonIcon />}
                        label="Stay"
                        value={`${packageItem.hotel.nights} Nights`}
                      />

                      <SmallInfo
                        icon={<Coffee size={14} />}
                        label="Meal"
                        value={packageItem.hotel.meal}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* Flights */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<Plane size={18} />}
                title="Flight Details"
              />

              <div className="mt-5 space-y-3">

                <FlightRow
                  label="Departure"
                  flight={
                    packageItem.flights.departure
                  }
                />

                <FlightRow
                  label="Return"
                  flight={
                    packageItem.flights.return
                  }
                />

              </div>

            </section>

            {/* Important Information */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<FileText size={18} />}
                title="Important Information"
              />

              <div className="mt-4 space-y-3">

                {packageItem.importantInfo.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                    >
                      <Info
                        size={15}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />
                      {item}
                    </div>
                  )
                )}

              </div>

            </section>

            {/* Cancellation */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={<ShieldCheck size={18} />}
                title="Cancellation Policy"
              />

              <div className="mt-4 space-y-3">

                {packageItem.cancellation.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      {item}
                    </div>
                  )
                )}

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT BOOKING CARD
          ================================================= */}

          <aside className="hidden lg:block lg:sticky lg:top-5">

            <BookingCard
              packageItem={packageItem}
              travellers={travellers}
              setTravellers={setTravellers}
              travelDate={travelDate}
              setTravelDate={setTravelDate}
              onBook={handleBookNow}
            />

          </aside>

        </div>

        {/* ===================================================
            SIMILAR PACKAGES
        =================================================== */}

        <section className="mt-7">

          <div className="mb-4">

            <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
              More trips
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Similar Packages
            </h2>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {similarPackages
              .filter(
                (item) =>
                  item.id !== packageItem.id
              )
              .map((item) => (
                <SimilarPackageCard
                  key={item.id}
                  item={item}
                  onClick={() =>
                    navigate(
                      `/packages/${item.id}`
                    )
                  }
                />
              ))}

          </div>

        </section>

      </main>

      {/* ===================================================
          MOBILE BOOKING BAR
      =================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-200 bg-white p-3 shadow-[0_-6px_25px_rgba(15,23,42,0.12)] lg:hidden">

        <div className="mx-auto flex max-w-7xl items-center gap-3">

          <div className="min-w-0 flex-1">

            <p className="text-[10px] font-semibold text-slate-500">
              Starting from
            </p>

            <div className="flex items-center gap-2">

              <p className="text-lg font-black text-slate-900">
                ₹
                {packageItem.price.toLocaleString(
                  "en-IN"
                )}
              </p>

              <span className="text-[10px] text-slate-400 line-through">
                ₹
                {packageItem.oldPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

          </div>

          <button
            type="button"
            onClick={handleBookNow}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-black text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
          >
            Book Now
            <ArrowRight size={15} />
          </button>

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   BOOKING CARD
========================================================= */

const BookingCard = ({
  packageItem,
  travellers,
  setTravellers,
  travelDate,
  setTravelDate,
  onBook,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="p-5">

        <p className="text-xs font-semibold text-slate-500">
          Starting from
        </p>

        <div className="mt-1 flex items-end gap-2">

          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            ₹
            {packageItem.price.toLocaleString(
              "en-IN"
            )}
          </h2>

          <span className="pb-1 text-xs text-slate-400 line-through">
            ₹
            {packageItem.oldPrice.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <p className="mt-1 text-[11px] font-bold text-emerald-600">
          Save ₹
          {packageItem.savings.toLocaleString(
            "en-IN"
          )}
        </p>

        <div className="my-5 h-px bg-slate-100" />

        {/* Travellers */}

        <label className="block text-xs font-bold text-slate-700">
          Travellers
        </label>

        <div className="mt-2 flex h-11 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3">

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Users
              size={15}
              className="text-blue-600"
            />
            {travellers} Travellers
          </div>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={travellers <= 1}
              onClick={() =>
                setTravellers(
                  Math.max(1, travellers - 1)
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <button
              type="button"
              onClick={() =>
                setTravellers(
                  Math.min(10, travellers + 1)
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-600"
            >
              +
            </button>

          </div>

        </div>

        {/* Date */}

        <label className="mt-4 block text-xs font-bold text-slate-700">
          Travel Date
        </label>

        <div className="relative mt-2">

          <CalendarDays
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="date"
            value={travelDate}
            onChange={(e) =>
              setTravelDate(e.target.value)
            }
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Book */}

        <button
          type="button"
          onClick={onBook}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
        >
          Book Now
          <ArrowRight size={17} />
        </button>

        <div className="mt-4 space-y-2">

          <TrustItem text="Secure booking" />

          <TrustItem text="24/7 customer support" />

          <TrustItem text="Flexible cancellation*" />

        </div>

      </div>

      {/* Price Info */}

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">

        <div className="flex items-center justify-between text-xs">

          <span className="text-slate-500">
            Package price
          </span>

          <span className="font-bold text-slate-800">
            ₹
            {packageItem.price.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <div className="mt-2 flex items-center justify-between text-xs">

          <span className="text-slate-500">
            Travellers
          </span>

          <span className="font-bold text-slate-800">
            {travellers}
          </span>

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  icon,
  title,
}) => {
  return (
    <div className="flex items-center gap-2.5">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h2 className="text-lg font-black text-slate-900">
        {title}
      </h2>

    </div>
  );
};

/* =========================================================
   SMALL INFO
========================================================= */

const SmallInfo = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1 text-[11px] font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
};

/* =========================================================
   FLIGHT ROW
========================================================= */

const FlightRow = ({
  label,
  flight,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        <div className="w-20 shrink-0">

          <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {label}
          </p>

          <p className="mt-1 text-xs font-black text-slate-900">
            {flight.airline}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {flight.flight}
          </p>

        </div>

        <div className="flex flex-1 items-center gap-3">

          <div className="min-w-0">

            <p className="text-lg font-black text-slate-900">
              {flight.fromCode}
            </p>

            <p className="text-[10px] font-bold text-slate-700">
              {flight.from}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {flight.fromTime}
            </p>

          </div>

          <div className="flex min-w-[70px] flex-1 items-center gap-2">

            <div className="h-px flex-1 bg-slate-200" />

            <Plane
              size={14}
              className="shrink-0 text-blue-600"
            />

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          <div className="min-w-0 text-right">

            <p className="text-lg font-black text-slate-900">
              {flight.toCode}
            </p>

            <p className="text-[10px] font-bold text-slate-700">
              {flight.to}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {flight.toTime}
            </p>

          </div>

        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-slate-500 sm:w-16 sm:flex-col sm:items-end sm:gap-0.5">
          <Clock3 size={12} />
          {flight.duration}
        </div>

      </div>

    </div>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({ text }) => {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">

      <Check
        size={13}
        className="text-emerald-600"
      />

      {text}

    </div>
  );
};

/* =========================================================
   SIMILAR PACKAGE CARD
========================================================= */

const SimilarPackageCard = ({
  item,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >

      <div className="relative h-44 overflow-hidden">

        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-black text-slate-700 shadow-sm">
          <Star
            size={11}
            fill="currentColor"
            className="text-yellow-500"
          />
          {item.rating}
        </div>

      </div>

      <div className="p-4">

        <h3 className="text-sm font-black text-slate-900">
          {item.name}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={13} />
          {item.destination}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">

          <div>

            <p className="text-[10px] text-slate-400">
              {item.duration}
            </p>

            <p className="mt-0.5 text-base font-black text-blue-600">
              ₹
              {item.price.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowRight size={15} />
          </span>

        </div>

      </div>

    </button>
  );
};

/* =========================================================
   MOON ICON
========================================================= */

const MoonIcon = () => {
  return (
    <span className="text-xs">
      🌙
    </span>
  );
};

export default PackageDetail;



