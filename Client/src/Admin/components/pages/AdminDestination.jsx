import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Search,
  Plus,
  RotateCcw,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Power,
  MapPin,
  Package,
  Hotel,
  Plane,
  Star,
  Globe2,
  X,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  CalendarDays,
} from "lucide-react";

import {
  createDestination,
  getAllDestination,
  updateDestination,
  deleteDestination
} from "../../../redux/slicer/destinationSlice";

import toast from "react-hot-toast";

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm = {
  name: "",
  country: "",
  region: "",
  type: "Domestic",
  status: "Active",
  popular: false,
  packages: 0,
  hotels: 0,
  flights: 0,
  bestTime: "",
  rating: 5,
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  description: "",
  highlights: "",
};

/* =========================================================
   COMPONENT
========================================================= */

const AdminDestinations = () => {
  const dispatch = useDispatch();

  /* =======================================================
     REDUX STATE
  ======================================================== */

  const {
    destinations: apiDestinations,
    loading,
    error,
  } = useSelector((state) => state.destination);

  /* =======================================================
     LOCAL DESTINATION STATE
  ======================================================== */

  const [destinations, setDestinations] = useState([]);

  /* =======================================================
     FILTER STATES
  ======================================================== */

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [region, setRegion] = useState("All Regions");
  const [destinationType, setDestinationType] =
    useState("All Types");
  const [status, setStatus] = useState("All Status");

  /* =======================================================
     MODAL STATES
  ======================================================== */

  const [selectedDestination, setSelectedDestination] =
    useState(null);

  const [editingDestination, setEditingDestination] =
    useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);

  /* =======================================================
     FORM STATE
  ======================================================== */

  const [formData, setFormData] = useState({
    ...emptyForm,
  });

  /* =========================================================
     GET ALL DESTINATIONS
  ========================================================= */

  useEffect(() => {
    dispatch(getAllDestination());
  }, [dispatch]);

  

  /* =========================================================
     API DATA → UI DATA
  ========================================================= */

  useEffect(() => {
    const formattedDestinations = apiDestinations.map(
      (destination) => ({
        id: destination._id,
        name: destination.name,
        country: destination.country,
        region: destination.region,
        type: destination.destinationType,
        status: destination.status,
        popular: destination.isPopular,
        packages: destination.packagesCount,
        hotels: destination.hotelsCount,
        flights: destination.flightsCount,
        rating: destination.rating,
        reviews: 0,
        bestTime:
          destination.bestTimeToVisit || "",
        image: destination.image || "",
        description:
          destination.description || "",
        highlights:
          destination.highlights || [],
      })
    );

    setDestinations(formattedDestinations);
  }, [apiDestinations]);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const countries = [
    "All Countries",
    ...new Set(
      destinations.map((item) => item.country)
    ),
  ];

  const regions = [
    "All Regions",
    ...new Set(
      destinations.map((item) => item.region)
    ),
  ];

  const types = [
    "All Types",
    ...new Set(
      destinations.map((item) => item.type)
    ),
  ];

  /* =========================================================
     FILTER DESTINATIONS
  ========================================================= */

  const filteredDestinations = useMemo(() => {
    return destinations.filter((item) => {
      const searchMatch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.country
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.region
          .toLowerCase()
          .includes(search.toLowerCase());

      const countryMatch =
        country === "All Countries" ||
        item.country === country;

      const regionMatch =
        region === "All Regions" ||
        item.region === region;

      const typeMatch =
        destinationType === "All Types" ||
        item.type === destinationType;

      const statusMatch =
        status === "All Status" ||
        item.status === status;

      return (
        searchMatch &&
        countryMatch &&
        regionMatch &&
        typeMatch &&
        statusMatch
      );
    });
  }, [
    destinations,
    search,
    country,
    region,
    destinationType,
    status,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalDestinations = destinations.length;

  const activeDestinations = destinations.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveDestinations = destinations.filter(
    (item) => item.status === "Inactive"
  ).length;

  const popularDestinations = destinations.filter(
    (item) => item.popular
  ).length;

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const handleResetFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setRegion("All Regions");
    setDestinationType("All Types");
    setStatus("All Status");
  };

  /* =========================================================
     VIEW DESTINATION
  ========================================================= */

  const handleViewDestination = (destination) => {
    setOpenMenuId(null);
    setSelectedDestination(destination);
  };

  /* =========================================================
     TOGGLE STATUS
  ========================================================= */

  const handleToggleStatus = (id) => {
    const destination = destinations.find(
      (item) => item.id === id
    );

    if (!destination) return;

    const newStatus =
      destination.status === "Active"
        ? "Inactive"
        : "Active";

    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: newStatus,
          }
          : item
      )
    );

    setOpenMenuId(null);

    if (selectedDestination?.id === id) {
      setSelectedDestination((prev) =>
        prev
          ? {
            ...prev,
            status: newStatus,
          }
          : null
      );
    }

    toast.success(
      `${destination.name} ${newStatus === "Active"
        ? "activated"
        : "deactivated"
      }`
    );
  };

  /* =========================================================
     TOGGLE POPULAR
  ========================================================= */

  const handleTogglePopular = (id) => {
    const destination = destinations.find(
      (item) => item.id === id
    );

    if (!destination) return;

    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            popular: !item.popular,
          }
          : item
      )
    );

    setOpenMenuId(null);

    toast.success(
      destination.popular
        ? `${destination.name} removed from popular destinations`
        : `${destination.name} marked as popular`
    );
  };

  /* =========================================================
     DELETE DESTINATION
  ========================================================= */

const handleDeleteDestination = async (id) => {
  const destination = destinations.find(
    (item) => item.id === id
  );

  if (!destination) return;

  const confirmed = window.confirm(
    `Are you sure you want to delete "${destination.name}"?`
  );

  if (!confirmed) return;

  try {
    const result = await dispatch(
      deleteDestination(id)
    ).unwrap();

    console.log("Delete response:", result);

    toast.success(
      result.message ||
        "Destination deleted successfully"
    );

    setOpenMenuId(null);

     dispatch(getAllDestination());
     
  } catch (error) {
    console.log("Delete error:", error);

    toast.error(
      error || "Delete destination failed"
    );
  }
};

  /* =========================================================
     DUPLICATE DESTINATION
  ========================================================= */

  const handleDuplicateDestination = (id) => {
    const destination = destinations.find(
      (item) => item.id === id
    );

    if (!destination) return;

    const duplicate = {
      ...destination,
      id: Date.now(),
      name: `${destination.name} Copy`,
      popular: false,
      status: "Inactive",
      packages: 0,
      hotels: 0,
      flights: 0,
      reviews: 0,
    };

    setDestinations((prev) => [
      duplicate,
      ...prev,
    ]);

    setOpenMenuId(null);

    toast.success(
      "Destination duplicated successfully"
    );
  };

  /* =========================================================
     ADD DESTINATION
  ========================================================= */

  const openAddModal = () => {
    setEditingDestination(null);

    setFormData({
      ...emptyForm,
    });

    setIsFormOpen(true);
  };

  /* =========================================================
     EDIT DESTINATION
  ========================================================= */

  const openEditModal = (destination) => {
    setSelectedDestination(null);
    setOpenMenuId(null);

    setEditingDestination(destination);

    setFormData({
      name: destination.name,
      country: destination.country,
      region: destination.region,
      type: destination.type,
      status: destination.status,
      popular: destination.popular,
      packages: destination.packages,
      hotels: destination.hotels,
      flights: destination.flights,
      bestTime: destination.bestTime,
      rating: destination.rating,
      image: destination.image,
      description: destination.description,
      highlights:
        destination.highlights.join(", "),
    });

    setIsFormOpen(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingDestination(null);

    setFormData({
      ...emptyForm,
    });
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleFormChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================================
     SAVE DESTINATION
  ========================================================= */

  const handleSaveDestination = async (e) => {
    e.preventDefault();

    /* =====================================================
       VALIDATION
    ==================================================== */

    if (!formData.name.trim()) {
      toast.error(
        "Destination name is required"
      );
      return;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required");
      return;
    }

    if (!formData.region.trim()) {
      toast.error("Region is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    /* =====================================================
       HIGHLIGHTS
    ==================================================== */

    const highlightsArray = formData.highlights
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    /* =====================================================
       EDIT
       
       NOTE:
       Abhi edit local state par hai.
       Backend UPDATE next step mein connect karenge.
    ==================================================== */

    if (editingDestination) {
      const payload = {
        name: formData.name.trim(),
        country: formData.country.trim(),
        region: formData.region.trim(),

        destinationType: formData.type,

        status: formData.status,

        isPopular: formData.popular,

        packagesCount:
          Number(formData.packages) || 0,

        hotelsCount:
          Number(formData.hotels) || 0,

        flightsCount:
          Number(formData.flights) || 0,

        rating:
          Number(formData.rating) || 0,

        bestTimeToVisit:
          formData.bestTime.trim(),

        image:
          formData.image.trim(),

        description:
          formData.description.trim(),

        highlights: highlightsArray,
      };

      try {
        const result = await dispatch(
          updateDestination({
            id: editingDestination.id,
            formData: payload,
          })
        ).unwrap();

        toast.success(
          result.message ||
          "Destination updated successfully"
        );

        closeFormModal();

        dispatch(getAllDestination());
      } catch (error) {
        toast.error(
          error || "Update destination failed"
        );
      }

      return;
    }

    /* =====================================================
       CREATE PAYLOAD
    ==================================================== */

    const payload = {
      name: formData.name.trim(),
      country: formData.country.trim(),
      region: formData.region.trim(),

      destinationType: formData.type,

      status: formData.status,

      isPopular: formData.popular,

      packagesCount:
        Number(formData.packages) || 0,

      hotelsCount:
        Number(formData.hotels) || 0,

      flightsCount:
        Number(formData.flights) || 0,

      rating:
        Number(formData.rating) || 0,

      bestTimeToVisit:
        formData.bestTime.trim(),

      image:
        formData.image.trim(),

      description:
        formData.description.trim(),

      highlights: highlightsArray,
    };

    /* =====================================================
       CREATE API CALL
    ==================================================== */

    try {
      const result = await dispatch(
        createDestination(payload)
      ).unwrap();

      toast.success(
        result.message ||
        "Destination added successfully"
      );

      closeFormModal();

      /* ================================================
         GET FRESH DATA FROM DATABASE
      ================================================= */

      dispatch(getAllDestination());
    } catch (error) {
      toast.error(
        error || "Create destination failed"
      );
    }
  };

  /* =========================================================
     SMALL HELPERS
  ========================================================= */

  const getTypeBadge = (type) => {
    const classes = {
      International:
        "bg-blue-50 text-blue-700 border-blue-100",

      Domestic:
        "bg-emerald-50 text-emerald-700 border-emerald-100",

      Honeymoon:
        "bg-pink-50 text-pink-700 border-pink-100",

      Adventure:
        "bg-orange-50 text-orange-700 border-orange-100",

      Luxury:
        "bg-purple-50 text-purple-700 border-purple-100",
    };

    return (
      classes[type] ||
      "bg-slate-50 text-slate-700 border-slate-200"
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div
      className="min-h-screen bg-slate-50"
      onClick={() => setOpenMenuId(null)}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Globe2
                    size={21}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Destinations
                  </h1>

                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Manage your travel destinations
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openAddModal();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Destination
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* ===================================================
            STATS
        ==================================================== */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Destinations
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {totalDestinations}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Globe2
                  size={19}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Active
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {activeDestinations}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={19}
                  className="text-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Inactive */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Inactive
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {inactiveDestinations}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <XCircle
                  size={19}
                  className="text-red-600"
                />
              </div>
            </div>
          </div>

          {/* Popular */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Popular
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {popularDestinations}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <Star
                  size={19}
                  className="fill-amber-500 text-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            FILTER SECTION
        ==================================================== */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search destination..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Country */}

            <select
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {countries.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Region */}

            <select
              value={region}
              onChange={(e) =>
                setRegion(e.target.value)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {regions.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Type */}

            <select
              value={destinationType}
              onChange={(e) =>
                setDestinationType(e.target.value)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {types.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Reset */}

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Second filter row */}

          <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                "All Status",
                "Active",
                "Inactive",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${status === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredDestinations.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {destinations.length}
              </span>{" "}
              destinations
            </p>
          </div>
        </div>

        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading ? (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading destinations...
            </p>
          </div>
        ) : error ? (
          /* =================================================
             ERROR STATE
          ================================================== */

          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
              <XCircle
                size={25}
                className="text-red-500"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-red-800">
              Failed to load destinations
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch(getAllDestination())
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        ) : filteredDestinations.length > 0 ? (
          /* =================================================
             DESTINATION GRID
          ================================================== */

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredDestinations.map(
              (destination) => (
                <div
                  key={destination.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Image */}

                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                    {/* Status */}

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${destination.status ===
                            "Active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-red-200 bg-red-50 text-red-700"
                          }`}
                      >
                        {destination.status}
                      </span>

                      {destination.popular && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                          <Star
                            size={11}
                            className="fill-amber-500"
                          />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* More Menu */}

                    <div
                      className="absolute right-3 top-3"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId ===
                              destination.id
                              ? null
                              : destination.id
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-white"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId ===
                        destination.id && (
                          <div className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewDestination(
                                  destination
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Eye size={16} />
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  destination
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Edit size={16} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDuplicateDestination(
                                  destination.id
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Copy size={16} />
                              Duplicate
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleTogglePopular(
                                  destination.id
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Star size={16} />

                              {destination.popular
                                ? "Remove Popular"
                                : "Mark Popular"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(
                                  destination.id
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Power size={16} />

                              {destination.status ===
                                "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteDestination(
                                  destination.id
                                )
                              }
                              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Bottom location */}

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
                      <div>
                        <h2 className="text-xl font-bold">
                          {destination.name}
                        </h2>

                        <div className="mt-1 flex items-center gap-1 text-xs text-white/90">
                          <MapPin size={13} />
                          {destination.country}
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getTypeBadge(
                          destination.type
                        )}`}
                      >
                        {destination.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}

                  <div className="p-4">
                    {/* Rating */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star
                          size={15}
                          className="fill-amber-400 text-amber-400"
                        />

                        <span className="text-sm font-bold text-slate-800">
                          {destination.rating}
                        </span>

                        <span className="text-xs text-slate-400">
                          ({destination.reviews})
                        </span>
                      </div>

                      <span className="text-xs text-slate-500">
                        {destination.region}
                      </span>
                    </div>

                    {/* Description */}

                    <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
                      {destination.description}
                    </p>

                    {/* Stats */}

                    <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-600">
                          <Package size={14} />

                          <span className="text-sm font-bold text-slate-800">
                            {destination.packages}
                          </span>
                        </div>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Packages
                        </p>
                      </div>

                      <div className="p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-purple-600">
                          <Hotel size={14} />

                          <span className="text-sm font-bold text-slate-800">
                            {destination.hotels}
                          </span>
                        </div>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Hotels
                        </p>
                      </div>

                      <div className="p-2.5 text-center">
                        <div className="flex items-center justify-center gap-1 text-sky-600">
                          <Plane size={14} />

                          <span className="text-sm font-bold text-slate-800">
                            {destination.flights}
                          </span>
                        </div>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Flights
                        </p>
                      </div>
                    </div>

                    {/* Best Time */}

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays
                        size={15}
                        className="text-blue-500"
                      />

                      <span>
                        Best time:

                        <span className="ml-1 font-semibold text-slate-700">
                          {destination.bestTime}
                        </span>
                      </span>
                    </div>

                    {/* Highlights */}

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold text-slate-700">
                        Highlights
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {destination.highlights
                          .slice(0, 3)
                          .map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600"
                            >
                              {highlight}
                            </span>
                          ))}

                        {destination.highlights
                          .length > 3 && (
                            <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                              +
                              {destination.highlights
                                .length - 3}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewDestination(
                            destination
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            destination
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Edit size={15} />
                        Edit
                      </button>
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleStatus(
                            destination.id
                          )
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Power size={13} />
                        Status
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDuplicateDestination(
                            destination.id
                          )
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Copy size={13} />
                        Copy
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteDestination(
                            destination.id
                          )
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-100 px-2 py-2 text-[11px] font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Globe2
                size={25}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No destinations found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Try changing your search or filters to
              find available destinations.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <RotateCcw size={16} />
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* =====================================================
          VIEW DESTINATION MODAL
      ====================================================== */}

      {selectedDestination && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedDestination(null)
          }
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Modal Header Image */}

            <div className="relative h-56 sm:h-64">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

              <button
                type="button"
                onClick={() =>
                  setSelectedDestination(null)
                }
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm hover:bg-white"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${selectedDestination.status ===
                        "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                      }`}
                  >
                    {selectedDestination.status}
                  </span>

                  {selectedDestination.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                      <Star
                        size={11}
                        className="fill-amber-500"
                      />
                      Popular
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {selectedDestination.name}
                </h2>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin size={15} />

                  {selectedDestination.country} ·{" "}
                  {selectedDestination.region}
                </div>
              </div>
            </div>

            {/* Modal Body */}

            <div className="max-h-[55vh] overflow-y-auto p-5 sm:p-6">
              {/* Stats */}

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">
                    Rating
                  </p>

                  <div className="mt-1 flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="font-bold text-slate-800">
                      {selectedDestination.rating}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">
                    Packages
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {selectedDestination.packages}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">
                    Hotels
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {selectedDestination.hotels}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">
                    Flights
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {selectedDestination.flights}
                  </p>
                </div>
              </div>

              {/* Description */}

              <div className="mt-5">
                <h3 className="text-sm font-bold text-slate-800">
                  About Destination
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedDestination.description}
                </p>
              </div>

              {/* Highlights */}

              <div className="mt-5">
                <h3 className="text-sm font-bold text-slate-800">
                  Highlights
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedDestination.highlights.map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Best Time */}

              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <CalendarDays
                      size={17}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Best Time to Visit
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {selectedDestination.bestTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    openEditModal(
                      selectedDestination
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Edit size={16} />
                  Edit Destination
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDestination(null)
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {isFormOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeFormModal}
        >
          <div
            className="max-h-[94vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingDestination
                    ? "Edit Destination"
                    : "Add New Destination"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {editingDestination
                    ? "Update destination information"
                    : "Add a new travel destination"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeFormModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSaveDestination}
              className="max-h-[78vh] overflow-y-auto"
            >
              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                {/* Name */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Destination Name
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Dubai"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Country */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Country
                  </label>

                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    placeholder="e.g. India"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Region */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Region
                  </label>

                  <input
                    name="region"
                    value={formData.region}
                    onChange={handleFormChange}
                    placeholder="e.g. North India"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Type */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Destination Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>Domestic</option>
                    <option>International</option>
                    <option>Honeymoon</option>
                    <option>Adventure</option>
                    <option>Luxury</option>
                  </select>
                </div>

                {/* Status */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                {/* Packages */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Packages Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="packages"
                    value={formData.packages}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Hotels */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Hotels Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="hotels"
                    value={formData.hotels}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Flights */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Flights Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="flights"
                    value={formData.flights}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Rating */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Rating
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Best Time */}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Best Time to Visit
                  </label>

                  <input
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleFormChange}
                    placeholder="e.g. October - April"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Image URL */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <ImageIcon size={14} />
                    Image URL
                  </label>

                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    placeholder="https://..."
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  {formData.image && (
                    <div className="mt-3 h-32 overflow-hidden rounded-xl border border-slate-200">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={4}
                    placeholder="Write destination description..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Highlights */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Highlights
                  </label>

                  <input
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleFormChange}
                    placeholder="Burj Khalifa, Dubai Mall, Desert Safari"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Separate highlights using commas.
                  </p>
                </div>

                {/* Popular */}

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <input
                      type="checkbox"
                      name="popular"
                      checked={formData.popular}
                      onChange={handleFormChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Mark as Popular Destination
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Show this destination in
                        popular destination sections.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer */}

              <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingDestination
                    ? "Update Destination"
                    : "Add Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;