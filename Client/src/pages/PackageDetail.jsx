import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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
  X,
  XCircle,
} from "lucide-react";

import {
  getPackageById,
  getAllPackages,
} from "../redux/slicer/packageSlice";

/* =========================================================
   MAIN COMPONENT
========================================================= */

const PackageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  /* =======================================================
     REDUX
  ======================================================= */

  const {
    package: backendPackage,
    packages,
    singleLoading,
    error,
  } = useSelector((state) => state.package);

  /* =======================================================
     LOCAL STATE
  ======================================================= */

  const [activeImage, setActiveImage] = useState(0);

  const [openDay, setOpenDay] = useState(0);

  const [travellers, setTravellers] = useState(2);

  const [travelDate, setTravelDate] = useState("");

  /* =======================================================
     GET PACKAGE BY ID
  ======================================================= */

  useEffect(() => {
    if (!id) return;

    dispatch(getPackageById(id));
  }, [dispatch, id]);

  /* =======================================================
     GET ALL PACKAGES
     
     Used for Similar Packages section.
  ======================================================= */

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  /* =======================================================
     RESET IMAGE WHEN PACKAGE CHANGES
  ======================================================= */

  useEffect(() => {
    setActiveImage(0);
    setOpenDay(0);
  }, [id]);

  /* =======================================================
     NORMALIZE BACKEND PACKAGE
  ======================================================= */

  const packageItem = useMemo(() => {
    if (!backendPackage) {
      return null;
    }

    /* -------------------------------------------------------
       IMAGES
    ------------------------------------------------------- */

    const imageList = [];

    /*
      Main image
    */
    if (backendPackage.image) {
      imageList.push(backendPackage.image);
    }

    /*
      Gallery images

      Backend structure:

      images: [
        {
          url: "...",
          deleteUrl: "..."
        }
      ]
    */

    if (Array.isArray(backendPackage.images)) {
      backendPackage.images.forEach((item) => {
        const imageUrl =
          typeof item === "string"
            ? item
            : item?.url;

        if (
          imageUrl &&
          !imageList.includes(imageUrl)
        ) {
          imageList.push(imageUrl);
        }
      });
    }

    /*
      Fallback image
    */

    const finalImages =
      imageList.length > 0
        ? imageList
        : [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
          ];

    /* -------------------------------------------------------
       DESTINATION
    ------------------------------------------------------- */

    const destinationName =
      typeof backendPackage.destination ===
      "object"
        ? backendPackage.destination?.name
        : backendPackage.destination;

    const destinationCountry =
      backendPackage.country ||
      (typeof backendPackage.destination ===
      "object"
        ? backendPackage.destination?.country
        : "");

    /* -------------------------------------------------------
       DURATION
    ------------------------------------------------------- */

    const duration =
      backendPackage.duration ||
      `${
        Number(backendPackage.days) || 0
      } Days / ${
        Number(backendPackage.nights) || 0
      } Nights`;

    /* -------------------------------------------------------
       PRICE
    ------------------------------------------------------- */

    const price =
      Number(backendPackage.price) || 0;

    const oldPrice =
      Number(backendPackage.oldPrice) || 0;

    const savings =
      oldPrice > price
        ? oldPrice - price
        : 0;

    /* -------------------------------------------------------
       HIGHLIGHTS
    ------------------------------------------------------- */

    let highlights = [];

    if (
      Array.isArray(
        backendPackage.highlights
      )
    ) {
      highlights =
        backendPackage.highlights.map(
          (item, index) => {
            /*
              If backend stores string
            */

            if (typeof item === "string") {
              return {
                icon: "✦",
                title: item,
                description: "",
              };
            }

            /*
              If backend stores object
            */

            return {
              icon:
                item?.icon ||
                "✦",

              title:
                item?.title ||
                item?.name ||
                `Highlight ${
                  index + 1
                }`,

              description:
                item?.description ||
                "",
            };
          }
        );
    }

    /* -------------------------------------------------------
       INCLUSIONS
    ------------------------------------------------------- */

    const inclusions =
      Array.isArray(
        backendPackage.inclusions
      )
        ? backendPackage.inclusions
        : [];

    /* -------------------------------------------------------
       EXCLUSIONS
    ------------------------------------------------------- */

    const exclusions =
      Array.isArray(
        backendPackage.exclusions
      )
        ? backendPackage.exclusions
        : [];

    /* -------------------------------------------------------
       ITINERARY
    ------------------------------------------------------- */

    const itinerary =
      Array.isArray(
        backendPackage.itinerary
      )
        ? backendPackage.itinerary.map(
            (day, index) => ({
              day:
                day?.day ||
                `Day ${index + 1}`,

              title:
                day?.title ||
                `Day ${index + 1}`,

              description:
                day?.description ||
                "",

              activities:
                Array.isArray(
                  day?.activities
                )
                  ? day.activities
                  : [],
            })
          )
        : [];

    /* -------------------------------------------------------
       IMPORTANT INFO
    ------------------------------------------------------- */

    const importantInfo =
      Array.isArray(
        backendPackage.importantInfo
      )
        ? backendPackage.importantInfo
        : [];

    /* -------------------------------------------------------
       CANCELLATION
    ------------------------------------------------------- */

    const cancellation =
      Array.isArray(
        backendPackage.cancellation
      )
        ? backendPackage.cancellation
        : [];

    /* -------------------------------------------------------
       HOTEL
    ------------------------------------------------------- */

    let hotelData = null;

    if (
      backendPackage.hotel &&
      typeof backendPackage.hotel ===
        "object"
    ) {
      const hotel = backendPackage.hotel;

      const hotelImage =
        hotel.image ||
        (
          Array.isArray(hotel.images) &&
          hotel.images.length > 0
        )
          ? typeof hotel.images[0] ===
            "string"
            ? hotel.images[0]
            : hotel.images[0]?.url
          : finalImages[0];

      hotelData = {
        name:
          hotel.hotelName ||
          hotel.name ||
          "Hotel Included",

        rating:
          Number(
            hotel.rating ||
              hotel.starRating
          ) || 0,

        room:
          hotel.room ||
          hotel.roomType ||
          "Standard Room",

        nights:
          Number(
            backendPackage.nights
          ) || 0,

        meal:
          hotel.meal ||
          "Breakfast Included",

        image:
          hotelImage ||
          finalImages[0],

        location:
          hotel.location ||
          [
            hotel.city,
            hotel.state,
            hotel.country,
          ]
            .filter(Boolean)
            .join(", ") ||
          destinationName ||
          "",
      };
    } else {
      hotelData = {
        name: "Hotel Included",
        rating: 0,
        room: "Standard Room",
        nights:
          Number(
            backendPackage.nights
          ) || 0,
        meal: "As per package",
        image: finalImages[0],
        location:
          destinationName || "",
      };
    }

    /* -------------------------------------------------------
       FLIGHTS
    ------------------------------------------------------- */

    const flights =
      backendPackage.flights &&
      typeof backendPackage.flights ===
        "object"
        ? backendPackage.flights
        : {
            departure: null,
            return: null,
          };

    /* -------------------------------------------------------
       RETURN FINAL OBJECT
    ------------------------------------------------------- */

    return {
      ...backendPackage,

      /*
        MongoDB ID
      */
      id: backendPackage._id,

      name:
        backendPackage.name ||
        "Holiday Package",

      destination:
        destinationName ||
        "Destination",

      country:
        destinationCountry || "",

      rating:
        Number(backendPackage.rating) || 0,

      reviews:
        Number(backendPackage.reviews) || 0,

      duration,

      price,

      oldPrice,

      savings,

      travelers: 2,

      tag:
        backendPackage.tag ||
        (
          backendPackage.status ===
          "Active"
            ? "Popular"
            : "Package"
        ),

      shortDescription:
        backendPackage.shortDescription ||
        backendPackage.description ||
        "",

      description:
        backendPackage.description ||
        "",

      images: finalImages,

      overview: [
        {
          icon: (
            <CalendarDays size={18} />
          ),
          label: "Duration",
          value: duration,
        },

        {
          icon: <Users size={18} />,
          label: "Travellers",
          value: "2 People",
        },

        {
          icon: <Hotel size={18} />,
          label: "Stay",
          value:
            hotelData?.name ||
            "Hotel Included",
        },

        {
          icon: <Plane size={18} />,
          label: "Flights",
          value:
            flights?.departure ||
            flights?.return
              ? "Included"
              : "Not Included",
        },
      ],

      highlights,

      itinerary,

      inclusions,

      exclusions,

      hotel: hotelData,

      flights,

      importantInfo,

      cancellation,
    };
  }, [backendPackage]);

  /* =======================================================
     SIMILAR PACKAGES
  ======================================================= */

  const similarPackages = useMemo(() => {
    if (!Array.isArray(packages)) {
      return [];
    }

    return packages
      .filter(
        (item) =>
          item?._id &&
          item._id !== id
      )
      .slice(0, 6)
      .map((item) => {
        let destination = "";

        if (
          item.destination &&
          typeof item.destination ===
            "object"
        ) {
          destination =
            item.destination.name ||
            "";
        } else {
          destination =
            item.destination || "";
        }

        let image =
          item.image || "";

        if (
          !image &&
          Array.isArray(item.images) &&
          item.images.length > 0
        ) {
          image =
            typeof item.images[0] ===
            "string"
              ? item.images[0]
              : item.images[0]?.url ||
                "";
        }

        return {
          id: item._id,

          name:
            item.name ||
            "Holiday Package",

          destination,

          duration:
            item.duration ||
            `${
              Number(item.days) || 0
            } Days / ${
              Number(item.nights) || 0
            } Nights`,

          price:
            Number(item.price) || 0,

          rating:
            Number(item.rating) || 0,

          image:
            image ||
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
        };
      });
  }, [packages, id]);

  /* =======================================================
     BOOK NOW
  ======================================================= */

  const handleBookNow = () => {
    if (!packageItem) {
      return;
    }

    const safePackageData = {
      id: packageItem.id,

      title:
        packageItem.name,

      name:
        packageItem.name,

      destination:
        packageItem.destination,

      country:
        packageItem.country,

      duration:
        packageItem.duration,

      image:
        packageItem.images?.[0] ||
        "",

      price:
        Number(packageItem.price) ||
        0,

      oldPrice:
        Number(packageItem.oldPrice) ||
        0,

      rating:
        Number(packageItem.rating) ||
        0,

      reviews:
        Number(packageItem.reviews) ||
        0,
    };

    navigate(
      `/package-booking/${packageItem.id}`,
      {
        state: {
          packageData:
            safePackageData,

          travellers: {
            adults:
              Number(travellers) || 1,

            children: 0,

            infants: 0,
          },

          travelDate:
            travelDate || "",
        },
      }
    );
  };

  /* =======================================================
     IMAGE CONTROLS
  ======================================================= */

  const nextImage = () => {
    if (
      !packageItem?.images?.length
    ) {
      return;
    }

    setActiveImage(
      (prev) =>
        (prev + 1) %
        packageItem.images.length
    );
  };

  const previousImage = () => {
    if (
      !packageItem?.images?.length
    ) {
      return;
    }

    setActiveImage(
      (prev) =>
        (prev -
          1 +
          packageItem.images.length) %
        packageItem.images.length
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (singleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading package...
          </p>

        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR / NOT FOUND
  ======================================================= */

  if (error || !packageItem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <XCircle size={24} />
          </div>

          <h2 className="mt-4 text-xl font-black text-slate-900">
            Package Not Found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error ||
              "The package you are looking for does not exist."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/packages")
            }
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
          >
            Browse Packages
          </button>

        </div>

      </div>
    );
  }

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
              onClick={() =>
                navigate(-1)
              }
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
              onClick={() =>
                navigate("/packages")
              }
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
            src={
              packageItem.images[
                activeImage
              ]
            }
            alt={packageItem.name}
            className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[430px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />

          {/* Image Controls */}

          {packageItem.images.length >
            1 && (
            <>
              <button
                type="button"
                onClick={
                  previousImage
                }
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              <button
                type="button"
                onClick={
                  nextImage
                }
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
              >
                <ChevronRight
                  size={18}
                />
              </button>
            </>
          )}

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

                  {packageItem.destination}

                  {packageItem.country && (
                    <>
                      ,{" "}
                      {
                        packageItem.country
                      }
                    </>
                  )}
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

                  {packageItem.rating}

                  {packageItem.reviews >
                    0 && (
                    <>
                      {" "}
                      (
                      {
                        packageItem.reviews
                      }{" "}
                      Reviews)
                    </>
                  )}

                </span>

              </div>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-white/80 sm:text-sm">
                {
                  packageItem.shortDescription
                }
              </p>

            </div>

          </div>

        </div>

        {/* Thumbnails */}

        {packageItem.images.length >
          0 && (
          <div className="mt-3 grid grid-cols-4 gap-2">

            {packageItem.images.map(
              (image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() =>
                    setActiveImage(
                      index
                    )
                  }
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImage ===
                    index
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${packageItem.name} ${
                      index + 1
                    }`}
                    className="h-16 w-full object-cover sm:h-20"
                  />
                </button>
              )
            )}

          </div>
        )}

      </section>

      {/* ===================================================
          OVERVIEW
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {packageItem.overview.map(
            (item) => (
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
            )
          )}

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
                icon={
                  <Info size={18} />
                }
                title="About This Package"
              />

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {
                  packageItem.description
                }
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

            {packageItem.highlights
              .length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <SectionTitle
                  icon={
                    <Star size={18} />
                  }
                  title="Package Highlights"
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {packageItem.highlights.map(
                    (
                      highlight,
                      index
                    ) => (
                      <div
                        key={`${highlight.title}-${index}`}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >

                        <div className="flex items-start gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                            {
                              highlight.icon
                            }
                          </div>

                          <div className="min-w-0">

                            <h3 className="text-sm font-black text-slate-900">
                              {
                                highlight.title
                              }
                            </h3>

                            {highlight.description && (
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {
                                  highlight.description
                                }
                              </p>
                            )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* Itinerary */}

            {packageItem.itinerary
              .length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <SectionTitle
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  title="Day-by-Day Itinerary"
                />

                <div className="mt-5 space-y-3">

                  {packageItem.itinerary.map(
                    (day, index) => {
                      const isOpen =
                        openDay ===
                        index;

                      return (
                        <div
                          key={`${day.day}-${index}`}
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
                                isOpen
                                  ? -1
                                  : index
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

                              {day.description && (
                                <p className="text-xs leading-6 text-slate-600">
                                  {
                                    day.description
                                  }
                                </p>
                              )}

                              {day.activities
                                ?.length >
                                0 && (
                                <div className="mt-4 grid gap-2 sm:grid-cols-2">

                                  {day.activities.map(
                                    (
                                      activity,
                                      activityIndex
                                    ) => (
                                      <div
                                        key={`${activity}-${activityIndex}`}
                                        className="flex items-center gap-2 text-xs font-medium text-slate-600"
                                      >
                                        <Check
                                          size={
                                            14
                                          }
                                          className="shrink-0 text-emerald-600"
                                        />
                                        {
                                          activity
                                        }
                                      </div>
                                    )
                                  )}

                                </div>
                              )}

                            </div>
                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              </section>
            )}

            {/* Inclusions */}

            {(packageItem.inclusions
              .length > 0 ||
              packageItem.exclusions
                .length > 0) && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <SectionTitle
                  icon={
                    <Check size={18} />
                  }
                  title="Inclusions & Exclusions"
                />

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  {/* Included */}

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      What's Included
                    </h3>

                    <div className="mt-3 space-y-2.5">

                      {packageItem.inclusions
                        .length > 0 ? (
                        packageItem.inclusions.map(
                          (
                            item,
                            index
                          ) => (
                            <div
                              key={`${item}-${index}`}
                              className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                            >
                              <Check
                                size={
                                  15
                                }
                                className="mt-0.5 shrink-0 text-emerald-600"
                              />
                              <span>
                                {item}
                              </span>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-xs text-slate-400">
                          No inclusion details available.
                        </p>
                      )}

                    </div>

                  </div>

                  {/* Excluded */}

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      What's Not Included
                    </h3>

                    <div className="mt-3 space-y-2.5">

                      {packageItem.exclusions
                        .length > 0 ? (
                        packageItem.exclusions.map(
                          (
                            item,
                            index
                          ) => (
                            <div
                              key={`${item}-${index}`}
                              className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                            >
                              <X
                                size={
                                  15
                                }
                                className="mt-0.5 shrink-0 text-red-500"
                              />
                              <span>
                                {item}
                              </span>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-xs text-slate-400">
                          No exclusion details available.
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </section>
            )}

            {/* Hotel */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={
                  <Hotel size={18} />
                }
                title="Stay Details"
              />

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">

                <div className="flex flex-col sm:flex-row">

                  <div className="h-48 w-full shrink-0 sm:h-auto sm:w-52">

                    <img
                      src={
                        packageItem.hotel
                          ?.image
                      }
                      alt={
                        packageItem.hotel
                          ?.name
                      }
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="min-w-0 flex-1 p-4">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div>

                        <h3 className="text-base font-black text-slate-900">
                          {
                            packageItem.hotel
                              ?.name
                          }
                        </h3>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin
                            size={13}
                          />

                          {
                            packageItem.hotel
                              ?.location
                          }
                        </p>

                      </div>

                      {packageItem.hotel
                        ?.rating >
                        0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">

                          <Star
                            size={12}
                            fill="currentColor"
                          />

                          {
                            packageItem.hotel
                              .rating
                          }

                        </span>
                      )}

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

                      <SmallInfo
                        icon={
                          <BedDouble
                            size={14}
                          />
                        }
                        label="Room"
                        value={
                          packageItem.hotel
                            ?.room ||
                          "Standard Room"
                        }
                      />

                      <SmallInfo
                        icon={
                          <MoonIcon />
                        }
                        label="Stay"
                        value={`${packageItem.hotel?.nights || 0} Nights`}
                      />

                      <SmallInfo
                        icon={
                          <Coffee
                            size={14}
                          />
                        }
                        label="Meal"
                        value={
                          packageItem.hotel
                            ?.meal ||
                          "As per package"
                        }
                      />

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* Flights */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <SectionTitle
                icon={
                  <Plane size={18} />
                }
                title="Flight Details"
              />

              {packageItem.flights
                ?.departure ||
              packageItem.flights
                ?.return ? (
                <div className="mt-5 space-y-3">

                  {packageItem.flights
                    ?.departure && (
                    <FlightRow
                      label="Departure"
                      flight={
                        packageItem
                          .flights
                          .departure
                      }
                    />
                  )}

                  {packageItem.flights
                    ?.return && (
                    <FlightRow
                      label="Return"
                      flight={
                        packageItem
                          .flights
                          .return
                      }
                    />
                  )}

                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-sm font-semibold text-slate-600">
                    Flight details are not available for this package.
                  </p>

                </div>
              )}

            </section>

            {/* Important Information */}

            {packageItem
              .importantInfo
              .length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <SectionTitle
                  icon={
                    <FileText
                      size={18}
                    />
                  }
                  title="Important Information"
                />

                <div className="mt-4 space-y-3">

                  {packageItem.importantInfo.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item}-${index}`}
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
            )}

            {/* Cancellation */}

            {packageItem
              .cancellation
              .length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <SectionTitle
                  icon={
                    <ShieldCheck
                      size={18}
                    />
                  }
                  title="Cancellation Policy"
                />

                <div className="mt-4 space-y-3">

                  {packageItem.cancellation.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item}-${index}`}
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
            )}

          </div>

          {/* =================================================
              RIGHT BOOKING CARD
          ================================================= */}

          <aside className="hidden lg:sticky lg:top-5 lg:block">

            <BookingCard
              packageItem={
                packageItem
              }
              travellers={
                travellers
              }
              setTravellers={
                setTravellers
              }
              travelDate={
                travelDate
              }
              setTravelDate={
                setTravelDate
              }
              onBook={
                handleBookNow
              }
            />

          </aside>

        </div>

        {/* ===================================================
            SIMILAR PACKAGES
        =================================================== */}

        {similarPackages.length >
          0 && (
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
        )}

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

              {packageItem.oldPrice >
                packageItem.price && (
                <span className="text-[10px] text-slate-400 line-through">
                  ₹
                  {packageItem.oldPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

            </div>

          </div>

          <button
            type="button"
            onClick={
              handleBookNow
            }
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-black text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
          >
            Book Now
            <ArrowRight
              size={15}
            />
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

          {packageItem.oldPrice >
            packageItem.price && (
            <span className="pb-1 text-xs text-slate-400 line-through">
              ₹
              {packageItem.oldPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

        </div>

        {packageItem.savings >
          0 && (
          <p className="mt-1 text-[11px] font-bold text-emerald-600">
            Save ₹
            {packageItem.savings.toLocaleString(
              "en-IN"
            )}
          </p>
        )}

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
              disabled={
                travellers <= 1
              }
              onClick={() =>
                setTravellers(
                  Math.max(
                    1,
                    travellers - 1
                  )
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
                  Math.min(
                    10,
                    travellers + 1
                  )
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
              setTravelDate(
                e.target.value
              )
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
          <ArrowRight
            size={17}
          />
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
  if (!flight) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-4">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        <div className="w-20 shrink-0">

          <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {label}
          </p>

          <p className="mt-1 text-xs font-black text-slate-900">
            {flight.airline ||
              "Airline"}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {flight.flight ||
              "Flight"}
          </p>

        </div>

        <div className="flex flex-1 items-center gap-3">

          <div className="min-w-0">

            <p className="text-lg font-black text-slate-900">
              {flight.fromCode ||
                "---"}
            </p>

            <p className="text-[10px] font-bold text-slate-700">
              {flight.from ||
                ""}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {flight.fromTime ||
                ""}
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
              {flight.toCode ||
                "---"}
            </p>

            <p className="text-[10px] font-bold text-slate-700">
              {flight.to || ""}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {flight.toTime ||
                ""}
            </p>

          </div>

        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-slate-500 sm:w-16 sm:flex-col sm:items-end sm:gap-0.5">

          <Clock3 size={12} />

          {flight.duration ||
            "N/A"}

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  text,
}) => {
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

        {item.rating > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-black text-slate-700 shadow-sm">

            <Star
              size={11}
              fill="currentColor"
              className="text-yellow-500"
            />

            {item.rating}

          </div>
        )}

      </div>

      <div className="p-4">

        <h3 className="text-sm font-black text-slate-900">
          {item.name}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">

          <MapPin size={13} />

          {item.destination ||
            "Destination"}

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

            <ArrowRight
              size={15}
            />

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