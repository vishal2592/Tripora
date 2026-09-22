
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Hotel,
  MapPin,
  Plane,
  Package,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

/* =========================================================
   DESTINATION DATA
========================================================= */

const destinationData = {
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    airportCode: "DXB",
    rating: "4.8",
    reviews: "12,450",
    bestTime: "November - March",
    description:
      "Dubai is a world-famous destination known for luxury shopping, futuristic architecture, beautiful beaches, desert adventures and unforgettable experiences.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  bali: {
    name: "Bali",
    country: "Indonesia",
    airportCode: "DPS",
    rating: "4.7",
    reviews: "9,820",
    bestTime: "April - October",
    description:
      "Bali offers tropical beaches, peaceful temples, lush rice terraces and exciting adventure experiences, making it perfect for couples, families and explorers.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  maldives: {
    name: "Maldives",
    country: "Maldives",
    airportCode: "MLE",
    rating: "4.9",
    reviews: "8,760",
    bestTime: "November - April",
    description:
      "The Maldives is famous for crystal-clear waters, private island resorts, white sandy beaches and romantic overwater villas.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  paris: {
    name: "Paris",
    country: "France",
    airportCode: "CDG",
    rating: "4.8",
    reviews: "15,340",
    bestTime: "April - June",
    description:
      "Paris combines iconic landmarks, art, fashion, food and romantic experiences, making it one of the most loved cities in the world.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  singapore: {
    name: "Singapore",
    country: "Singapore",
    airportCode: "SIN",
    rating: "4.7",
    reviews: "7,450",
    bestTime: "February - April",
    description:
      "Singapore is a modern city destination featuring futuristic attractions, world-class shopping, gardens, entertainment and amazing food.",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  thailand: {
    name: "Thailand",
    country: "Thailand",
    airportCode: "BKK",
    rating: "4.7",
    reviews: "10,280",
    bestTime: "November - February",
    description:
      "Thailand offers tropical beaches, vibrant cities, ancient temples, exciting nightlife and incredible local cuisine.",
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  vietnam: {
    name: "Vietnam",
    country: "Vietnam",
    airportCode: "HAN",
    rating: "4.6",
    reviews: "6,840",
    bestTime: "March - May",
    description:
      "Vietnam is known for dramatic landscapes, historic cities, beautiful coastlines and delicious local cuisine.",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  switzerland: {
    name: "Switzerland",
    country: "Switzerland",
    airportCode: "ZRH",
    rating: "4.9",
    reviews: "11,230",
    bestTime: "June - September",
    description:
      "Switzerland offers snow-covered mountains, beautiful lakes, scenic train journeys and charming European towns.",
    images: [
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  kashmir: {
    name: "Kashmir",
    country: "India",
    airportCode: "SXR",
    rating: "4.8",
    reviews: "9,420",
    bestTime: "March - October",
    description:
      "Kashmir is known for beautiful valleys, snow-covered mountains, peaceful lakes and unforgettable scenic experiences.",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  goa: {
    name: "Goa",
    country: "India",
    airportCode: "GOI",
    rating: "4.6",
    reviews: "13,520",
    bestTime: "November - February",
    description:
      "Goa is a favourite Indian holiday destination known for beaches, nightlife, Portuguese architecture, seafood and relaxing stays.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  kerala: {
    name: "Kerala",
    country: "India",
    airportCode: "COK",
    rating: "4.8",
    reviews: "8,910",
    bestTime: "October - March",
    description:
      "Kerala is famous for peaceful backwaters, lush greenery, beaches, Ayurveda and beautiful hill stations.",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1596178060810-72f53ce9a65a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  manali: {
    name: "Manali",
    country: "India",
    airportCode: "KUU",
    rating: "4.7",
    reviews: "7,850",
    bestTime: "October - June",
    description:
      "Manali is a beautiful mountain destination perfect for adventure, snow experiences, nature lovers and peaceful getaways.",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  jaipur: {
    name: "Jaipur",
    country: "India",
    airportCode: "JAI",
    rating: "4.6",
    reviews: "6,420",
    bestTime: "October - March",
    description:
      "Jaipur is the Pink City of India, famous for royal palaces, forts, colourful markets and rich Rajasthani culture.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=1000&q=85",
    ],
  },

  andaman: {
    name: "Andaman",
    country: "India",
    airportCode: "IXZ",
    rating: "4.8",
    reviews: "5,940",
    bestTime: "October - May",
    description:
      "Andaman is a tropical paradise with crystal-clear waters, coral reefs, beautiful beaches and exciting water activities.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
    ],
  },
};

/* =========================================================
   COMPONENT
========================================================= */

const DestinationDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const destination = destinationData[slug];

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MapPin size={30} />
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            Destination Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find this destination.
          </p>

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore Destinations
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const handleExplore = (type) => {
    const destinationName = encodeURIComponent(destination.name);

    if (type === "flights") {
      navigate(`/flights?destination=${destinationName}`);
      return;
    }

    if (type === "hotels") {
      navigate(`/hotels?destination=${destinationName}`);
      return;
    }

    navigate(`/packages?destination=${destinationName}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hover:text-blue-600"
            >
              Home
            </button>

            <ChevronRight size={13} />

            <button
              type="button"
              onClick={() => navigate("/destinations")}
              className="hover:text-blue-600"
            >
              Destinations
            </button>

            <ChevronRight size={13} />

            <span className="font-semibold text-slate-700">
              {destination.name}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">

        {/* ===================================================
            DESTINATION HERO
        =================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* HERO IMAGE */}

          <div className="relative h-[250px] overflow-hidden sm:h-[350px] lg:h-[430px]">
            <img
              src={destination.images[0]}
              alt={destination.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">

              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                <MapPin size={13} className="text-blue-600" />
                {destination.country}
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {destination.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-white sm:text-sm">

                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-300"
                  />
                  {destination.rating}
                  <span className="text-white/70">
                    ({destination.reviews} reviews)
                  </span>
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                  <CalendarDays size={14} />
                  Best time: {destination.bestTime}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              MOBILE-FRIENDLY IMAGE GALLERY
          ================================================= */}

          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* Main image */}
              <div className="group relative overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2">
                <img
                  src={destination.images[0]}
                  alt={`${destination.name} main`}
                  className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                />
              </div>

              {/* Image 2 */}
              <div className="group relative overflow-hidden rounded-2xl">
                <img
                  src={destination.images[1]}
                  alt={`${destination.name} view 2`}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                />
              </div>

              {/* Image 3 */}
              <div className="group relative overflow-hidden rounded-2xl">
                <img
                  src={destination.images[2]}
                  alt={`${destination.name} view 3`}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                />

                <div className="absolute bottom-3 right-3 rounded-xl bg-black/65 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm">
                  +1 More Photo
                </div>
              </div>

              {/* Image 4
                  Mobile par ye properly full width mein show hoga */}
              <div className="group relative overflow-hidden rounded-2xl sm:col-span-2 lg:hidden">
                <img
                  src={destination.images[3]}
                  alt={`${destination.name} view 4`}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </section>

        {/* ===================================================
            CONTENT + SIDEBAR
        =================================================== */}

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">

          {/* LEFT CONTENT */}

          <div className="space-y-5">

            {/* ABOUT */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-4">

              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Discover {destination.name}
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  About {destination.name}
                </h2>
              </div>

              <p className="text-sm leading-7 text-slate-600">
                {destination.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <InfoBox
                  icon={<CalendarDays size={18} />}
                  title="Best Time"
                  value={destination.bestTime}
                />

                <InfoBox
                  icon={<Plane size={18} />}
                  title="Airport"
                  value={destination.airportCode}
                />

                <InfoBox
                  icon={<Star size={18} />}
                  title="Rating"
                  value={`${destination.rating} / 5`}
                />

              </div>
            </div>

            {/* HIGHLIGHTS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-4">

              <h2 className="text-xl font-black text-slate-900">
                Why visit {destination.name}?
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <Highlight
                  title="Beautiful Experiences"
                  text="Explore famous attractions and unforgettable places."
                />

                <Highlight
                  title="Easy Booking"
                  text="Book flights, hotels and holiday packages in one place."
                />

                <Highlight
                  title="Handpicked Options"
                  text="Choose from carefully selected travel options."
                />

                <Highlight
                  title="Secure Travel"
                  text="Enjoy a reliable and secure Tripora booking experience."
                />

              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-4 lg:sticky lg:top-5 lg:self-start">

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Plan your trip
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Explore {destination.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose what you want to book for your trip.
              </p>

              <div className="mt-5 space-y-3">

                <ExploreCard
                  icon={<Plane size={21} />}
                  title="Flights"
                  text={`Find flights to ${destination.name}`}
                  onClick={() => handleExplore("flights")}
                />

                <ExploreCard
                  icon={<Hotel size={21} />}
                  title="Hotels"
                  text={`Stay in ${destination.name}`}
                  onClick={() => handleExplore("hotels")}
                />

                <ExploreCard
                  icon={<Package size={21} />}
                  title="Holiday Packages"
                  text={`Explore ${destination.name} packages`}
                  onClick={() => handleExplore("packages")}
                />

              </div>
            </div>

            {/* TRUST CARD */}

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Book with confidence
                  </h3>

                  <p className="text-xs text-slate-500">
                    Secure & reliable travel booking
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">

                <TrustItem text="Secure payment" />
                <TrustItem text="24/7 customer support" />
                <TrustItem text="Best travel options" />

              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 shadow-lg sm:p-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-wider text-blue-100">
                Ready for your next trip?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Start planning your {destination.name} trip today.
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Compare flights, discover hotels and explore holiday
                packages with Tripora.
              </p>

            </div>

            <button
              type="button"
              onClick={() => handleExplore("packages")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Explore Packages
              <ArrowRight size={17} />
            </button>

          </div>
        </section>

      </main>
    </div>
  );
};

/* =========================================================
   INFO BOX
========================================================= */

const InfoBox = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
};

/* =========================================================
   HIGHLIGHT
========================================================= */

const Highlight = ({ title, text }) => {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 p-4">

      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <CheckCircle2 size={17} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>

    </div>
  );
};

/* =========================================================
   EXPLORE CARD
========================================================= */

const ExploreCard = ({ icon, title, text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="text-sm font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {text}
        </p>

      </div>

      <ArrowRight
        size={16}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
      />

    </button>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({ text }) => {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
      <CheckCircle2 size={15} className="shrink-0 text-blue-600" />
      {text}
    </div>
  );
};

export default DestinationDetail;

