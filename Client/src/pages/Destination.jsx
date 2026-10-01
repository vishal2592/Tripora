import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowRight,
  MapPin,
  Star,
  Sparkles,
  Mountain,
  Waves,
  Heart,
  Compass,
  Users,
  Crown,
  Loader2,
  Globe2,
  AlertCircle,
} from "lucide-react";

import { getAllDestination } from "../redux/slicer/destinationSlice";

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80";

/* =========================================================
   HELPERS
========================================================= */

/*
  Destination detail ke liye slug use nahi karna hai.
  Backend /destinations/:id expect karta hai MongoDB _id.
*/

const getDestinationImage = (destination) => {
  if (destination?.image) {
    return destination.image;
  }

  if (
    Array.isArray(destination?.images) &&
    destination.images.length > 0
  ) {
    return destination.images[0];
  }

  return FALLBACK_IMAGE;
};

const formatNumber = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN");
};

const getDestinationTag = (destination) => {
  if (destination?.destinationType) {
    return destination.destinationType;
  }

  if (Array.isArray(destination?.highlights)) {
    return destination.highlights[0] || "Explore";
  }

  return "Explore";
};

const getExperienceIcon = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("beach")) {
    return Waves;
  }

  if (value.includes("mountain")) {
    return Mountain;
  }

  if (value.includes("honeymoon")) {
    return Heart;
  }

  if (value.includes("adventure")) {
    return Compass;
  }

  if (value.includes("family")) {
    return Users;
  }

  if (value.includes("luxury")) {
    return Crown;
  }

  return Globe2;
};

const getExperienceDescription = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("beach")) {
    return "Relax on beautiful beaches";
  }

  if (value.includes("mountain")) {
    return "Escape into the mountains";
  }

  if (value.includes("honeymoon")) {
    return "Create romantic memories";
  }

  if (value.includes("adventure")) {
    return "Discover thrilling experiences";
  }

  if (value.includes("family")) {
    return "Memories for everyone";
  }

  if (value.includes("luxury")) {
    return "Travel in ultimate comfort";
  }

  if (value.includes("international")) {
    return "Explore the world";
  }

  return "Discover amazing destinations";
};

const isIndiaDestination = (destination) => {
  const country = String(destination?.country || "")
    .trim()
    .toLowerCase();

  return (
    country === "india" ||
    country.includes("india")
  );
};

const isBeachDestination = (destination) => {
  const values = [
    destination?.name,
    destination?.destinationType,
    ...(Array.isArray(destination?.highlights)
      ? destination.highlights
      : []),
    destination?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    values.includes("beach") ||
    values.includes("coastal") ||
    values.includes("island")
  );
};

/* =========================================================
   MAIN DESTINATION PAGE
========================================================= */

function Destination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* =======================================================
     REDUX
  ======================================================= */

  const {
    destinations = [],
    loading,
    error,
  } = useSelector((state) => state.destination);

  /* =======================================================
     GET DESTINATIONS
  ======================================================= */

  useEffect(() => {
    dispatch(getAllDestination());
  }, [dispatch]);

  /* =======================================================
     ACTIVE DESTINATIONS
  ======================================================= */

  const activeDestinations = useMemo(() => {
    return (destinations || []).filter(
      (destination) =>
        destination?.status === "Active" ||
        !destination?.status,
    );
  }, [destinations]);

  /* =======================================================
     POPULAR DESTINATIONS
  ======================================================= */

  const popularDestinations = useMemo(() => {
    const popular = activeDestinations.filter(
      (destination) =>
        destination?.isPopular === true,
    );

    if (popular.length > 0) {
      return popular.slice(0, 8);
    }

    return [...activeDestinations]
      .sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0),
      )
      .slice(0, 8);
  }, [activeDestinations]);

  /* =======================================================
     TRENDING DESTINATIONS
  ======================================================= */

  const trendingDestinations = useMemo(() => {
    return [...activeDestinations]
      .sort((a, b) => {
        const ratingDifference =
          Number(b.rating || 0) -
          Number(a.rating || 0);

        if (ratingDifference !== 0) {
          return ratingDifference;
        }

        return (
          Number(b.packagesCount || 0) -
          Number(a.packagesCount || 0)
        );
      })
      .slice(0, 4);
  }, [activeDestinations]);

  /* =======================================================
     INTERNATIONAL DESTINATIONS
  ======================================================= */

  const internationalDestinations = useMemo(() => {
    return activeDestinations
      .filter(
        (destination) =>
          !isIndiaDestination(destination),
      )
      .slice(0, 8);
  }, [activeDestinations]);

  /* =======================================================
     INDIA DESTINATIONS
  ======================================================= */

  const indiaDestinations = useMemo(() => {
    return activeDestinations
      .filter((destination) =>
        isIndiaDestination(destination),
      )
      .slice(0, 6);
  }, [activeDestinations]);

  /* =======================================================
     REGIONS
  ======================================================= */

  const regions = useMemo(() => {
    const regionMap = new Map();

    activeDestinations.forEach((destination) => {
      const region = String(
        destination?.region || "",
      ).trim();

      if (!region) {
        return;
      }

      if (!regionMap.has(region)) {
        regionMap.set(region, {
          name: region,
          image: getDestinationImage(destination),
          count: 0,
        });
      }

      const regionData = regionMap.get(region);

      regionData.count += 1;

      if (
        !regionData.image ||
        regionData.image === FALLBACK_IMAGE
      ) {
        regionData.image =
          getDestinationImage(destination);
      }
    });

    return Array.from(regionMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [activeDestinations]);

  /* =======================================================
     TRAVEL EXPERIENCES
  ======================================================= */

  const experiences = useMemo(() => {
    const experienceMap = new Map();

    activeDestinations.forEach((destination) => {
      const type = String(
        destination?.destinationType || "",
      ).trim();

      if (!type) {
        return;
      }

      if (!experienceMap.has(type)) {
        experienceMap.set(type, {
          name: type,
          description:
            getExperienceDescription(type),
          icon: getExperienceIcon(type),
          image: getDestinationImage(destination),
          count: 0,
        });
      }

      const experience =
        experienceMap.get(type);

      experience.count += 1;
    });

    return Array.from(experienceMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [activeDestinations]);

  /* =======================================================
     BEACH DESTINATIONS
  ======================================================= */

  const beachDestinations = useMemo(() => {
    return activeDestinations
      .filter(isBeachDestination)
      .slice(0, 4);
  }, [activeDestinations]);

  /* =======================================================
     SPOTLIGHT
  ======================================================= */

  const spotlightDestination = useMemo(() => {
    if (popularDestinations.length > 0) {
      return popularDestinations[0];
    }

    if (activeDestinations.length > 0) {
      return activeDestinations[0];
    }

    return null;
  }, [
    popularDestinations,
    activeDestinations,
  ]);

  /* =======================================================
     HANDLE DESTINATION EXPLORE
  ======================================================= */

  const handleExplore = (destination) => {
    if (!destination?._id) {
      console.warn(
        "Destination ID missing:",
        destination,
      );

      return;
    }

    /*
      IMPORTANT:
      Backend endpoint:
      GET /api/destinations/:id

      Therefore MongoDB _id is used here.
    */

    navigate(`/destination/${destination._id}`);
  };

  /* =======================================================
     HANDLE REGION
  ======================================================= */

  const handleRegionExplore = (region) => {
    if (!region?.name) {
      return;
    }

    /*
      Region does not have a MongoDB destination ID.
      Therefore do not send region name to
      /destination/:id.

      Use a query parameter instead.
    */

    navigate(
      `/destinations?region=${encodeURIComponent(
        region.name,
      )}`,
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    activeDestinations.length === 0
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-blue-600"
          />

          <p className="text-sm font-semibold text-slate-500">
            Loading destinations...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error &&
    activeDestinations.length === 0
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle size={24} />
          </div>

          <h2 className="mt-4 text-lg font-black text-slate-900">
            Unable to load destinations
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(getAllDestination())
            }
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
              <Sparkles size={14} />
              Explore the World
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Discover Your Next Destination
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore amazing destinations, discover
              unique experiences and plan your perfect
              trip with Tripora.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================================================
            POPULAR DESTINATIONS
        ==================================================== */}

        {popularDestinations.length > 0 && (
          <section>
            <SectionHeading
              eyebrow="Popular destinations"
              title="Places travelers love"
              description="Discover some of the most popular destinations from Tripora."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popularDestinations.map(
                (destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                    onExplore={handleExplore}
                  />
                ),
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            TRENDING DESTINATIONS
        ==================================================== */}

        {trendingDestinations.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="Trending now"
              title="Where everyone is going"
              description="Explore destinations with high ratings and strong travel interest."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trendingDestinations.map(
                (destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                    onExplore={handleExplore}
                    trending
                  />
                ),
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            INTERNATIONAL DESTINATIONS
        ==================================================== */}

        {internationalDestinations.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="International travel"
              title="Explore the world"
              description="Discover international destinations available on Tripora."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {internationalDestinations.map(
                (destination) => (
                  <InternationalCard
                    key={destination._id}
                    destination={destination}
                    onExplore={handleExplore}
                  />
                ),
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            EXPLORE INDIA
        ==================================================== */}

        {indiaDestinations.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="Explore India"
              title="Beautiful places in India"
              description="Discover destinations across India available on Tripora."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {indiaDestinations.map(
                (destination) => (
                  <IndiaDestinationCard
                    key={destination._id}
                    destination={destination}
                    onExplore={handleExplore}
                  />
                ),
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            REGIONS
        ==================================================== */}

        {regions.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="Travel by region"
              title="Explore by region"
              description="Choose a region and start planning your next adventure."
            />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {regions.map((region) => (
                <button
                  key={region.name}
                  type="button"
                  onClick={() =>
                    handleRegionExplore(region)
                  }
                  className="group relative h-48 overflow-hidden rounded-2xl text-left"
                >
                  <img
                    src={region.image}
                    alt={region.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-black text-white">
                      {region.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/75">
                      {region.count}{" "}
                      {region.count === 1
                        ? "Destination"
                        : "Destinations"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================
            TRAVEL EXPERIENCES
        ==================================================== */}

        {experiences.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="Travel your way"
              title="Explore by travel experience"
              description="Find a destination type that matches your mood."
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {experiences.map((experience) => {
                const Icon = experience.icon;

                const firstDestination =
                  activeDestinations.find(
                    (item) =>
                      item.destinationType ===
                      experience.name,
                  );

                return (
                  <button
                    key={experience.name}
                    type="button"
                    onClick={() =>
                      handleExplore(
                        firstDestination,
                      )
                    }
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={experience.image}
                        alt={experience.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/25" />

                      <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-blue-600">
                        <Icon size={16} />
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-black text-slate-900">
                        {experience.name}
                      </h3>

                      <p className="mt-1 text-[10px] leading-4 text-slate-500">
                        {experience.description}
                      </p>

                      <p className="mt-2 text-[10px] font-bold text-blue-600">
                        {experience.count}{" "}
                        {experience.count === 1
                          ? "destination"
                          : "destinations"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================
            BEACH DESTINATIONS
        ==================================================== */}

        {beachDestinations.length > 0 && (
          <section className="mt-4">
            <SectionHeading
              eyebrow="Beach escapes"
              title="Best beach destinations"
              description="Sun, sand and unforgettable coastal experiences."
            />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {beachDestinations.map(
                (destination) => (
                  <button
                    key={destination._id}
                    type="button"
                    onClick={() =>
                      handleExplore(destination)
                    }
                    className="group relative h-64 overflow-hidden rounded-2xl text-left"
                  >
                    <img
                      src={getDestinationImage(
                        destination,
                      )}
                      alt={destination.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black text-white">
                          {destination.name}
                        </h3>

                        <p className="mt-1 text-xs text-white/75">
                          {destination.country}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </button>
                ),
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            DESTINATION SPOTLIGHT
        ==================================================== */}

        {spotlightDestination && (
          <section className="mt-4 overflow-hidden rounded-3xl bg-slate-900">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[320px]">
                <img
                  src={getDestinationImage(
                    spotlightDestination,
                  )}
                  alt={spotlightDestination.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-600">
                  Destination Spotlight
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Featured destination
                </p>

                <h2 className="mt-2 text-3xl font-black text-white">
                  Discover {spotlightDestination.name}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {spotlightDestination.description ||
                    `Explore ${spotlightDestination.name}, ${spotlightDestination.country}, and discover unforgettable travel experiences with Tripora.`}
                </p>

                {Array.isArray(
                  spotlightDestination.highlights,
                ) &&
                  spotlightDestination.highlights
                    .length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {spotlightDestination.highlights
                        .slice(0, 4)
                        .map(
                          (
                            highlight,
                            index,
                          ) => (
                            <span
                              key={`${highlight}-${index}`}
                              className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white"
                            >
                              {highlight}
                            </span>
                          ),
                        )}
                    </div>
                  )}

                <button
                  type="button"
                  onClick={() =>
                    handleExplore(
                      spotlightDestination,
                    )
                  }
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  Explore{" "}
                  {spotlightDestination.name}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            NO DESTINATIONS
        ==================================================== */}

        {!loading &&
          activeDestinations.length === 0 && (
            <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <Globe2
                size={40}
                className="mx-auto text-slate-400"
              />

              <h2 className="mt-4 text-xl font-black text-slate-900">
                No destinations available
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Destinations will appear here once
                they are added from the admin panel.
              </p>
            </section>
          )}

        {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

        <section className="mt-4 rounded-3xl bg-blue-600 px-6 py-4 text-center sm:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Sparkles size={23} />
            </div>

            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
              Ready to explore the world?
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Find flights, hotels and holiday packages
              for your next adventure with Tripora.
            </p>

            <Link
              to="/packages"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Packages
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DESTINATION CARD
========================================================= */

function DestinationCard({
  destination,
  onExplore,
  trending = false,
}) {
  const image = getDestinationImage(destination);

  return (
    <button
      type="button"
      onClick={() => onExplore(destination)}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {trending && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-blue-600">
            Trending
          </span>
        )}

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800">
          <Star
            size={12}
            className="text-amber-500"
            fill="currentColor"
          />

          {Number(destination.rating || 0).toFixed(1)}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white">
            {destination.name}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
            <MapPin size={12} />
            {destination.country}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-bold text-slate-900">
            {getDestinationTag(destination)}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {formatNumber(
              destination.packagesCount,
            )}{" "}
            packages available
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   INTERNATIONAL CARD
========================================================= */

function InternationalCard({
  destination,
  onExplore,
}) {
  return (
    <button
      type="button"
      onClick={() => onExplore(destination)}
      className="group relative h-72 overflow-hidden rounded-2xl text-left"
    >
      <img
        src={getDestinationImage(destination)}
        alt={destination.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-white">
              {destination.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
              <MapPin size={12} />
              {destination.country}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-slate-900 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   INDIA DESTINATION CARD
========================================================= */

function IndiaDestinationCard({
  destination,
  onExplore,
}) {
  return (
    <button
      type="button"
      onClick={() => onExplore(destination)}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={getDestinationImage(destination)}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-white">
                {destination.name}
              </h3>

              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-white/80">
                <MapPin size={12} />
                {destination.region}
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800">
              <Star
                size={12}
                className="text-amber-500"
                fill="currentColor"
              />

              {Number(
                destination.rating || 0,
              ).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-bold text-slate-900">
            Explore {destination.name}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {formatNumber(
              destination.packagesCount,
            )}{" "}
            packages available
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

export default Destination;