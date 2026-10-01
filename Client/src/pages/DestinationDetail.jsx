import React, { useEffect, useMemo } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getSingleDestinationById,
} from "../redux/slicer/destinationSlice";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Hotel,
  MapPin,
  Package,
  Plane,
  ShieldCheck,
  Star,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85";

/* =========================================================
   FORMAT HIGHLIGHTS
========================================================= */

const normalizeHighlights = (highlights) => {
  if (!Array.isArray(highlights)) {
    return [];
  }

  return highlights
    .flatMap((item) => {
      if (item === null || item === undefined) {
        return [];
      }

      let value = String(item).trim();

      if (!value) {
        return [];
      }

      /*
        Backend mein kuch old records is type ke hain:

        [
          "[\"Manali Tehsli\"",
          "\"Prini\"",
          "\"Jagatsukh\"",
          "\"Palchan\"",
          "\"Karjan\"]"
        ]

        Aur future mein proper JSON string bhi aa sakti hai:

        "[\"Manali Tehsli\",\"Prini\",\"Jagatsukh\"]"

        Isliye pehle JSON parse try kar rahe hain.
      */

      if (
        value.startsWith("[") &&
        value.endsWith("]")
      ) {
        try {
          const parsed = JSON.parse(value);

          if (Array.isArray(parsed)) {
            return parsed
              .map((item) =>
                String(item || "")
                  .replace(/^"+|"+$/g, "")
                  .trim(),
              )
              .filter(Boolean);
          }
        } catch (error) {
          // Old malformed data ko neeche normalise karenge
        }
      }

      /*
        Old malformed values clean karna
      */

      value = value
        .replace(/^\[/, "")
        .replace(/\]$/, "")
        .replace(/\\"/g, '"')
        .replace(/^"+|"+$/g, "")
        .trim();

      /*
        Agar comma separated value hai
      */

      if (value.includes('","')) {
        return value
          .split('","')
          .map((item) =>
            item
              .replace(/^"+|"+$/g, "")
              .trim(),
          )
          .filter(Boolean);
      }

      return value ? [value] : [];
    })
    .filter(Boolean);
};

/* =========================================================
   COMPONENT
========================================================= */

const DestinationDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*
    Listing page MongoDB _id bhej raha hai:

    /destination/6abcfe5a5463957c24c79ff8
  */

  const { slug } = useParams();

  const destinationId = slug;

  /* =======================================================
     GET DATA FROM REDUX
  ======================================================= */

  const {
    destination,
    loading,
    error,
  } = useSelector(
    (state) => state.destination,
  );

  /* =======================================================
     GET DESTINATION BY ID
  ======================================================= */

  useEffect(() => {
    if (!destinationId) {
      return;
    }

    dispatch(
      getSingleDestinationById(destinationId),
    );
  }, [dispatch, destinationId]);

  /* =======================================================
     NORMALIZED DATA
  ======================================================= */

  const destinationData = useMemo(() => {
    if (!destination) {
      return null;
    }

    /*
      Gallery images
    */

    const galleryImages = Array.isArray(
      destination.images,
    )
      ? destination.images.filter(Boolean)
      : [];

    /*
      Main image
    */

    const mainImage =
      destination.image || "";

    /*
      Main image ko gallery mein first rakhenge.
    */

    const allImages = [
      mainImage,
      ...galleryImages,
    ].filter(Boolean);

    /*
      Duplicate images remove
    */

    const uniqueImages = [
      ...new Set(allImages),
    ];

    return {
      ...destination,

      /*
        Images
      */

      images:
        uniqueImages.length > 0
          ? uniqueImages
          : [FALLBACK_IMAGE],

      /*
        Highlights
      */

      highlights: normalizeHighlights(
        destination.highlights,
      ),

      /*
        Numeric values
      */

      rating: Number(
        destination.rating || 0,
      ),

      packagesCount: Number(
        destination.packagesCount || 0,
      ),

      hotelsCount: Number(
        destination.hotelsCount || 0,
      ),

      flightsCount: Number(
        destination.flightsCount || 0,
      ),

      /*
        Best time
      */

      bestTime:
        destination.bestTimeToVisit ||
        "Not specified",
    };
  }, [destination]);

  /* =======================================================
     EXPLORE HANDLER
  ======================================================= */

  const handleExplore = (type) => {
    if (!destinationData) {
      return;
    }

    const destinationName =
      encodeURIComponent(
        destinationData.name,
      );

    if (type === "flights") {
      navigate(
        `/flights?destination=${destinationName}`,
      );

      return;
    }

    if (type === "hotels") {
      navigate(
        `/hotels?destination=${destinationName}`,
      );

      return;
    }

    navigate(
      `/packages?destination=${destinationName}`,
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={34}
            className="animate-spin text-blue-600"
          />

          <p className="text-sm font-semibold text-slate-500">
            Loading destination...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR / NOT FOUND
  ======================================================= */

  if (error || !destinationData) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle size={30} />
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            Destination Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error ||
              "We couldn't find this destination."}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/destinations")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore Destinations
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}

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
              onClick={() =>
                navigate("/destinations")
              }
              className="hover:text-blue-600"
            >
              Destinations
            </button>

            <ChevronRight size={13} />

            <span className="font-semibold text-slate-700">
              {destinationData.name}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        {/* ===================================================
            DESTINATION HERO
        ==================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* HERO IMAGE */}

          <div className="relative h-[250px] overflow-hidden sm:h-[350px] lg:h-[430px]">
            <img
              src={destinationData.images[0]}
              alt={destinationData.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                <MapPin
                  size={13}
                  className="text-blue-600"
                />

                {destinationData.country}
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {destinationData.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-white sm:text-sm">
                {/* RATING */}

                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-300"
                  />

                  {destinationData.rating.toFixed(
                    1,
                  )}

                  <span className="text-white/70">
                    / 5
                  </span>
                </span>

                {/* BEST TIME */}

                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                  <CalendarDays size={14} />

                  Best time:{" "}
                  {destinationData.bestTime}
                </span>

                {/* DESTINATION TYPE */}

                {destinationData.destinationType && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                    {
                      destinationData.destinationType
                    }
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              IMAGE GALLERY
          ================================================= */}

          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Main image */}

              <div className="group relative overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2">
                <img
                  src={destinationData.images[0]}
                  alt={`${destinationData.name} main`}
                  className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                />
              </div>

              {/* Image 2 */}

              {destinationData.images[1] && (
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={destinationData.images[1]}
                    alt={`${destinationData.name} view 2`}
                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                  />
                </div>
              )}

              {/* Image 3 */}

              {destinationData.images[2] && (
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={destinationData.images[2]}
                    alt={`${destinationData.name} view 3`}
                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[260px] lg:h-[300px]"
                  />

                  {destinationData.images.length >
                    3 && (
                    <div className="absolute bottom-3 right-3 rounded-xl bg-black/65 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm">
                      +
                      {destinationData.images.length -
                        3}{" "}
                      More Photo
                      {destinationData.images.length -
                        3 >
                      1
                        ? "s"
                        : ""}
                    </div>
                  )}
                </div>
              )}

              {/* Image 4 */}

              {destinationData.images[3] && (
                <div className="group relative overflow-hidden rounded-2xl sm:col-span-2 lg:hidden">
                  <img
                    src={destinationData.images[3]}
                    alt={`${destinationData.name} view 4`}
                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTENT + SIDEBAR
        ==================================================== */}

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* LEFT CONTENT */}

          <div className="space-y-5">
            {/* ABOUT */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Discover{" "}
                  {destinationData.name}
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  About{" "}
                  {destinationData.name}
                </h2>
              </div>

              <p className="text-sm leading-7 text-slate-600">
                {destinationData.description ||
                  `Explore ${destinationData.name} and discover amazing travel experiences with Tripora.`}
              </p>

              {/* INFO BOXES */}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <InfoBox
                  icon={<CalendarDays size={18} />}
                  title="Best Time"
                  value={
                    destinationData.bestTime
                  }
                />

                <InfoBox
                  icon={<Package size={18} />}
                  title="Packages"
                  value={`${destinationData.packagesCount} available`}
                />

                <InfoBox
                  icon={<Star size={18} />}
                  title="Rating"
                  value={`${destinationData.rating.toFixed(
                    1,
                  )} / 5`}
                />
              </div>

              {/* EXTRA COUNTS */}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoBox
                  icon={<Hotel size={18} />}
                  title="Hotels"
                  value={`${destinationData.hotelsCount} available`}
                />

                <InfoBox
                  icon={<Plane size={18} />}
                  title="Flights"
                  value={`${destinationData.flightsCount} available`}
                />
              </div>
            </div>

            {/* HIGHLIGHTS */}

            {destinationData.highlights.length >
              0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-xl font-black text-slate-900">
                  Highlights of{" "}
                  {destinationData.name}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {destinationData.highlights.map(
                    (highlight, index) => (
                      <Highlight
                        key={`${highlight}-${index}`}
                        title={highlight}
                        text={`Explore ${highlight} while visiting ${destinationData.name}.`}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* DESTINATION DETAILS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-black text-slate-900">
                Destination details
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DetailRow
                  label="Country"
                  value={
                    destinationData.country
                  }
                />

                <DetailRow
                  label="Region"
                  value={
                    destinationData.region
                  }
                />

                <DetailRow
                  label="Destination Type"
                  value={
                    destinationData.destinationType
                  }
                />

                <DetailRow
                  label="Status"
                  value={
                    destinationData.status
                  }
                />
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            {/* PLAN CARD */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Plan your trip
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Explore{" "}
                {destinationData.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose what you want to book for
                your trip.
              </p>

              <div className="mt-5 space-y-3">
                {/* FLIGHTS */}

                <ExploreCard
                  icon={<Plane size={21} />}
                  title="Flights"
                  text={`Find flights to ${destinationData.name}`}
                  onClick={() =>
                    handleExplore("flights")
                  }
                />

                {/* HOTELS */}

                <ExploreCard
                  icon={<Hotel size={21} />}
                  title="Hotels"
                  text={`Stay in ${destinationData.name}`}
                  onClick={() =>
                    handleExplore("hotels")
                  }
                />

                {/* PACKAGES */}

                <ExploreCard
                  icon={<Package size={21} />}
                  title="Holiday Packages"
                  text={`Explore ${destinationData.name} packages`}
                  onClick={() =>
                    handleExplore("packages")
                  }
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
                    Secure & reliable travel
                    booking
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
        ==================================================== */}

        <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-100">
                Ready for your next trip?
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Start planning your{" "}
                {destinationData.name} trip today.
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Compare flights, discover hotels
                and explore holiday packages with
                Tripora.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleExplore("packages")
              }
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

const InfoBox = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
};

/* =========================================================
   HIGHLIGHT
========================================================= */

const Highlight = ({
  title,
  text,
}) => {
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
   DETAIL ROW
========================================================= */

const DetailRow = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
};

/* =========================================================
   EXPLORE CARD
========================================================= */

const ExploreCard = ({
  icon,
  title,
  text,
  onClick,
}) => {
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
      <CheckCircle2
        size={15}
        className="shrink-0 text-blue-600"
      />

      {text}
    </div>
  );
};

export default DestinationDetail;