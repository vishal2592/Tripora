import { useEffect, useMemo, useState } from "react";
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
  Star,
  CalendarDays,
  X,
  Package,
  Upload,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../../../redux/slicer/packageSlice";

import api from "../../../redux/api";

// =====================================================
// EMPTY FORM
// =====================================================

const emptyForm = {
  name: "",
  destination: "",
  country: "",
  type: "Domestic",
  days: 5,
  nights: 4,
  price: "",
  oldPrice: "",
  image: null,
  galleryImages: [],
  description: "",
  highlights: "",
  inclusions: "",
  exclusions: "",
};

// =====================================================
// NORMALIZE PACKAGE
// =====================================================

const normalizePackage = (pkg) => {
  const destinationValue =
    typeof pkg.destination === "object"
      ? pkg.destination?.name || ""
      : pkg.destination || "";

  const destinationId =
    typeof pkg.destination === "object"
      ? pkg.destination?._id || ""
      : pkg.destination || "";

  const normalizedImages = Array.isArray(pkg.images)
    ? pkg.images
        .map((item) => {
          if (typeof item === "string") {
            return {
              _id: "",
              url: item,
              deleteUrl: "",
            };
          }

          return {
            _id: item?._id || "",
            url: item?.url || "",
            deleteUrl: item?.deleteUrl || "",
          };
        })
        .filter((item) => item.url)
    : [];

  return {
    ...pkg,

    id: pkg._id || pkg.id,

    name: pkg.name || "",

    destination: destinationValue,

    destinationId,

    country:
      pkg.country ||
      (typeof pkg.destination === "object"
        ? pkg.destination?.country || ""
        : ""),

    type: pkg.type || "",

    duration:
      pkg.duration ||
      `${pkg.days || 0} Days / ${pkg.nights || 0} Nights`,

    days: Number(pkg.days || 0),

    nights: Number(pkg.nights || 0),

    rating: Number(pkg.rating || 0),

    reviews: Number(pkg.reviews || 0),

    price: Number(pkg.price || 0),

    oldPrice: Number(pkg.oldPrice || 0),

    bookings: Number(pkg.bookings || 0),

    status: pkg.status || "Active",

    image: pkg.image || "",

    imageDeleteUrl: pkg.imageDeleteUrl || "",

    images: normalizedImages,

    description: pkg.description || "",

    highlights: Array.isArray(pkg.highlights)
      ? pkg.highlights
      : [],

    inclusions: Array.isArray(pkg.inclusions)
      ? pkg.inclusions
      : [],

    exclusions: Array.isArray(pkg.exclusions)
      ? pkg.exclusions
      : [],

    importantInfo: Array.isArray(pkg.importantInfo)
      ? pkg.importantInfo
      : [],

    cancellation: Array.isArray(pkg.cancellation)
      ? pkg.cancellation
      : [],

    itinerary: Array.isArray(pkg.itinerary)
      ? pkg.itinerary
      : [],

    flights: pkg.flights || {},

    hotel: pkg.hotel || null,
  };
};

// =====================================================
// COMPONENT
// =====================================================

const AdminPackages = () => {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX
  // ===================================================

  const {
    packages: reduxPackages = [],
    loading,
    singleLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.package);

  // ===================================================
  // LOCAL STATE
  // ===================================================

  const [packages, setPackages] = useState([]);

  const [destinations, setDestinations] = useState([]);
  const [destinationLoading, setDestinationLoading] =
    useState(false);

  const [search, setSearch] = useState("");

  const [destination, setDestination] =
    useState("All Destination");

  const [packageType, setPackageType] =
    useState("All Types");

  const [duration, setDuration] =
    useState("All Durations");

  const [status, setStatus] =
    useState("All Status");

  const [selectedPackage, setSelectedPackage] =
    useState(null);

  const [editingPackage, setEditingPackage] =
    useState(null);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [openMenuId, setOpenMenuId] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  // ===================================================
  // EXISTING GALLERY IMAGES
  // ===================================================

  const [existingImages, setExistingImages] =
    useState([]);

  // ===================================================
  // EXISTING IMAGE IDS TO REMOVE
  // ===================================================

  const [removeImageIds, setRemoveImageIds] =
    useState([]);

  // ===================================================
  // FETCH PACKAGES
  // ===================================================

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  // ===================================================
  // UPDATE LOCAL PACKAGES
  // ===================================================

  useEffect(() => {
    const normalized = reduxPackages.map(
      normalizePackage
    );

    setPackages(normalized);
  }, [reduxPackages]);

  // ===================================================
  // FETCH DESTINATIONS
  // ===================================================

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setDestinationLoading(true);

        const response = await api.get("/destinations");

        const data = response.data;

        const destinationList =
          data?.destinations ||
          data?.data ||
          [];

        setDestinations(
          Array.isArray(destinationList)
            ? destinationList
            : []
        );
      } catch (error) {
        console.error(
          "Get Destinations Error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load destinations"
        );
      } finally {
        setDestinationLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ===================================================
  // REDUX ERROR
  // ===================================================

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        pkg.name
          .toLowerCase()
          .includes(searchValue) ||
        pkg.destination
          .toLowerCase()
          .includes(searchValue) ||
        pkg.country
          .toLowerCase()
          .includes(searchValue);

      const matchesDestination =
        destination === "All Destination" ||
        pkg.destination === destination;

      const matchesType =
        packageType === "All Types" ||
        pkg.type === packageType;

      const matchesDuration =
        duration === "All Durations" ||
        pkg.days === Number(duration);

      const matchesStatus =
        status === "All Status" ||
        pkg.status === status;

      return (
        matchesSearch &&
        matchesDestination &&
        matchesType &&
        matchesDuration &&
        matchesStatus
      );
    });
  }, [
    packages,
    search,
    destination,
    packageType,
    duration,
    status,
  ]);

  // ===================================================
  // STATS
  // ===================================================

  const totalPackages = packages.length;

  const activePackages = packages.filter(
    (pkg) => pkg.status === "Active"
  ).length;

  const inactivePackages = packages.filter(
    (pkg) => pkg.status === "Inactive"
  ).length;

  const totalDestinations = new Set(
    packages.map((pkg) => pkg.destination)
  ).size;

  // ===================================================
  // RESET FILTERS
  // ===================================================

  const handleResetFilters = () => {
    setSearch("");
    setDestination("All Destination");
    setPackageType("All Types");
    setDuration("All Durations");
    setStatus("All Status");
  };

  // ===================================================
  // VIEW PACKAGE
  // ===================================================

  const handleViewPackage = async (pkg) => {
    setOpenMenuId(null);

    try {
      const result = await dispatch(
        getPackageById(pkg.id)
      ).unwrap();

      const packageData = normalizePackage(
        result.package
      );

      setSelectedPackage(packageData);
    } catch (error) {
      toast.error(
        error || "Failed to load package details"
      );
    }
  };

  // ===================================================
  // TOGGLE STATUS
  // ===================================================

  const handleToggleStatus = async (id) => {
    const packageItem = packages.find(
      (pkg) => pkg.id === id
    );

    if (!packageItem) return;

    const newStatus =
      packageItem.status === "Active"
        ? "Inactive"
        : "Active";

    try {
      const data = new FormData();

      data.append("status", newStatus);

      await dispatch(
        updatePackage({
          id,
          packageData: data,
        })
      ).unwrap();

      toast.success(
        `${packageItem.name} ${
          newStatus === "Active"
            ? "activated"
            : "deactivated"
        }`
      );

      setOpenMenuId(null);

      if (selectedPackage?.id === id) {
        setSelectedPackage((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus,
              }
            : null
        );
      }

      dispatch(getAllPackages());
    } catch (error) {
      toast.error(
        error || "Failed to update package status"
      );
    }
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDeletePackage = async (id) => {
    const packageItem = packages.find(
      (pkg) => pkg.id === id
    );

    if (!packageItem) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${packageItem.name}"?`
    );

    if (!confirmed) return;

    try {
      await dispatch(
        deletePackage(id)
      ).unwrap();

      if (selectedPackage?.id === id) {
        setSelectedPackage(null);
      }

      setOpenMenuId(null);

      toast.success(
        "Package deleted successfully"
      );

      dispatch(getAllPackages());
    } catch (error) {
      toast.error(
        error || "Failed to delete package"
      );
    }
  };

  // ===================================================
  // DUPLICATE
  // ===================================================

  const handleDuplicatePackage = async (id) => {
    const packageItem = packages.find(
      (pkg) => pkg.id === id
    );

    if (!packageItem) return;

    try {
      const data = new FormData();

      data.append(
        "name",
        `${packageItem.name} Copy`
      );

      data.append(
        "destination",
        packageItem.destinationId
      );

      data.append(
        "country",
        packageItem.country
      );

      data.append(
        "type",
        packageItem.type
      );

      data.append(
        "days",
        packageItem.days
      );

      data.append(
        "nights",
        packageItem.nights
      );

      data.append(
        "price",
        packageItem.price
      );

      data.append(
        "oldPrice",
        packageItem.oldPrice
      );

      data.append(
        "description",
        packageItem.description
      );

      data.append(
        "highlights",
        packageItem.highlights.join(", ")
      );

      data.append(
        "inclusions",
        packageItem.inclusions.join(", ")
      );

      data.append(
        "exclusions",
        packageItem.exclusions.join(", ")
      );

      data.append(
        "status",
        "Inactive"
      );

      // Do not copy ImgBB URLs.
      // New package will have no images.

      await dispatch(
        createPackage(data)
      ).unwrap();

      setOpenMenuId(null);

      toast.success(
        "Package duplicated successfully"
      );

      dispatch(getAllPackages());
    } catch (error) {
      toast.error(
        error || "Failed to duplicate package"
      );
    }
  };

  // ===================================================
  // ADD MODAL
  // ===================================================

  const openAddModal = () => {
    setEditingPackage(null);

    setExistingImages([]);
    setRemoveImageIds([]);

    setFormData({
      ...emptyForm,
      galleryImages: [],
    });

    setIsAddModalOpen(true);
  };

  // ===================================================
  // EDIT MODAL
  // ===================================================

  const openEditModal = (pkg) => {
    setSelectedPackage(null);
    setOpenMenuId(null);

    setEditingPackage(pkg);

    const normalized = normalizePackage(pkg);

    setExistingImages(
      normalized.images || []
    );

    setRemoveImageIds([]);

    setFormData({
      name: pkg.name || "",

      destination:
        pkg.destinationId || "",

      country: pkg.country || "",

      type: pkg.type || "Domestic",

      days: pkg.days || 5,

      nights: pkg.nights ?? 4,

      price: pkg.price || "",

      oldPrice: pkg.oldPrice || "",

      image: null,

      galleryImages: [],

      description:
        pkg.description || "",

      highlights:
        pkg.highlights.join(", "),

      inclusions:
        pkg.inclusions.join(", "),

      exclusions:
        pkg.exclusions.join(", "),
    });
  };

  // ===================================================
  // CLOSE FORM
  // ===================================================

  const closeFormModal = () => {
    setIsAddModalOpen(false);
    setEditingPackage(null);

    setExistingImages([]);
    setRemoveImageIds([]);

    setFormData({
      ...emptyForm,
      galleryImages: [],
    });
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleFormChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    // MAIN IMAGE
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files?.[0] || null,
      }));

      return;
    }

    // MULTIPLE GALLERY IMAGES
    if (name === "galleryImages") {
      const selectedFiles = Array.from(
        files || []
      );

      if (!selectedFiles.length) return;

      setFormData((prev) => ({
        ...prev,
        galleryImages: [
          ...(prev.galleryImages || []),
          ...selectedFiles,
        ],
      }));

      // Reset input so same file can be selected again
      e.target.value = "";

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // REMOVE NEW GALLERY IMAGE
  // ===================================================

  const handleRemoveNewGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };

  // ===================================================
  // REMOVE EXISTING GALLERY IMAGE
  // ===================================================

  const handleRemoveExistingImage = (image) => {
    if (image?._id) {
      setRemoveImageIds((prev) => [
        ...prev,
        image._id,
      ]);
    }

    setExistingImages((prev) =>
      prev.filter(
        (item) => item._id !== image._id
      )
    );
  };

  // ===================================================
  // SAVE PACKAGE
  // ===================================================

  const handleSavePackage = async (e) => {
    e.preventDefault();

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!formData.name.trim()) {
      toast.error(
        "Package name is required"
      );
      return;
    }

    if (!formData.destination) {
      toast.error(
        "Please select a destination"
      );
      return;
    }

    if (!formData.country.trim()) {
      toast.error(
        "Country is required"
      );
      return;
    }

    if (!formData.price) {
      toast.error(
        "Price is required"
      );
      return;
    }

    const days = Number(formData.days);
    const nights = Number(formData.nights);
    const price = Number(formData.price);

    const oldPrice =
      formData.oldPrice !== ""
        ? Number(formData.oldPrice)
        : price;

    if (days < 1) {
      toast.error(
        "Days must be at least 1"
      );
      return;
    }

    if (nights < 0) {
      toast.error(
        "Nights cannot be negative"
      );
      return;
    }

    if (price <= 0) {
      toast.error(
        "Price must be greater than 0"
      );
      return;
    }

    if (oldPrice < 0) {
      toast.error(
        "Old price cannot be negative"
      );
      return;
    }

    // -----------------------------------------------
    // ARRAYS
    // -----------------------------------------------

    const highlights =
      formData.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const inclusions =
      formData.inclusions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const exclusions =
      formData.exclusions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    try {
      const data = new FormData();

      // ---------------------------------------------
      // BASIC FIELDS
      // ---------------------------------------------

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "destination",
        formData.destination
      );

      data.append(
        "country",
        formData.country.trim()
      );

      data.append(
        "type",
        formData.type
      );

      data.append(
        "days",
        days
      );

      data.append(
        "nights",
        nights
      );

      data.append(
        "price",
        price
      );

      data.append(
        "oldPrice",
        oldPrice
      );

      data.append(
        "description",
        formData.description.trim()
      );

      // ---------------------------------------------
      // ARRAYS
      // ---------------------------------------------

      data.append(
        "highlights",
        highlights.join(", ")
      );

      data.append(
        "inclusions",
        inclusions.join(", ")
      );

      data.append(
        "exclusions",
        exclusions.join(", ")
      );

      // ---------------------------------------------
      // MAIN IMAGE
      // ---------------------------------------------

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      // ---------------------------------------------
      // MULTIPLE GALLERY IMAGES
      // ---------------------------------------------

      if (
        formData.galleryImages &&
        formData.galleryImages.length > 0
      ) {
        formData.galleryImages.forEach(
          (file) => {
            data.append(
              "images",
              file
            );
          }
        );
      }

      // ---------------------------------------------
      // REMOVE EXISTING GALLERY IMAGES
      // ---------------------------------------------

      if (
        editingPackage &&
        removeImageIds.length > 0
      ) {
        data.append(
          "removeImages",
          JSON.stringify(removeImageIds)
        );
      }

      // ---------------------------------------------
      // UPDATE
      // ---------------------------------------------

      if (editingPackage) {
        await dispatch(
          updatePackage({
            id: editingPackage.id,
            packageData: data,
          })
        ).unwrap();

        toast.success(
          "Package updated successfully"
        );
      }

      // ---------------------------------------------
      // CREATE
      // ---------------------------------------------

      else {
        await dispatch(
          createPackage(data)
        ).unwrap();

        toast.success(
          "Package added successfully"
        );
      }

      closeFormModal();

      dispatch(getAllPackages());
    } catch (error) {
      toast.error(
        error ||
          `Failed to ${
            editingPackage
              ? "update"
              : "create"
          } package`
      );
    }
  };

  // ===================================================
  // DESTINATION OPTIONS
  // ===================================================

  const destinationOptions =
    destinations.filter(
      (item) => item?._id
    );

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div
      className="min-h-screen bg-slate-50 p-2 sm:p-2 lg:p-4"
      onClick={() => setOpenMenuId(null)}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Packages
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your travel packages
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openAddModal();
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Packages
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalPackages}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Packages
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {activePackages}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Inactive Packages
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-600">
            {inactivePackages}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Destinations
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {totalDestinations}
          </p>
        </div>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search package, destination or country..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>
              All Destination
            </option>

            {destinationOptions.map(
              (item) => (
                <option
                  key={item._id}
                  value={item.name}
                >
                  {item.name}
                </option>
              )
            )}
          </select>

          <select
            value={packageType}
            onChange={(e) =>
              setPackageType(e.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>
              All Types
            </option>

            <option>
              International
            </option>

            <option>
              Domestic
            </option>

            <option>
              Honeymoon
            </option>

            <option>
              Family
            </option>

            <option>
              Adventure
            </option>

            <option>
              Luxury
            </option>
          </select>

          <select
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>
              All Durations
            </option>

            <option value="4">
              4 days
            </option>

            <option value="5">
              5 days
            </option>

            <option value="7">
              7 days
            </option>

            <option value="8">
              8 days
            </option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>
              All Status
            </option>

            <option>
              Active
            </option>

            <option>
              Inactive
            </option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetFilters}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>

          {filteredPackages.length !==
            totalPackages && (
            <button
              onClick={handleResetFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredPackages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {totalPackages}
            </span>{" "}
            packages
          </p>
        </div>
      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (
        <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={32}
              className="animate-spin text-blue-600"
            />

            <p className="text-sm text-slate-500">
              Loading packages...
            </p>
          </div>
        </div>
      ) : filteredPackages.length > 0 ? (
        /* =================================================
           CARDS
        ================================================= */

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}

              <div className="relative h-48 w-full">
                {pkg.image ? (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-full w-full rounded-t-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-t-2xl bg-slate-100">
                    <Package
                      size={42}
                      className="text-slate-300"
                    />
                  </div>
                )}

                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    pkg.status ===
                    "Active"
                      ? "bg-emerald-500"
                      : "bg-slate-600"
                  }`}
                >
                  {pkg.status}
                </span>

                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                  {pkg.type}
                </span>

                {/* GALLERY COUNT */}

                {pkg.images?.length > 0 && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    <ImageIcon size={13} />
                    {pkg.images.length + 1}
                  </span>
                )}

                {/* MORE */}

                <div
                  className="absolute right-3 top-3"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId ===
                          pkg.id
                          ? null
                          : pkg.id
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:bg-white"
                    title="More options"
                  >
                    <MoreVertical
                      size={18}
                    />
                  </button>

                  {openMenuId ===
                    pkg.id && (
                    <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                      <button
                        onClick={() =>
                          handleViewPackage(
                            pkg
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                      <button
                        onClick={() =>
                          openEditModal(
                            pkg
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDuplicatePackage(
                            pkg.id
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <Copy size={16} />
                        Duplicate
                      </button>

                      <button
                        onClick={() =>
                          handleToggleStatus(
                            pkg.id
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <Power size={16} />

                        {pkg.status ===
                        "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        onClick={() =>
                          handleDeletePackage(
                            pkg.id
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  {pkg.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />

                  <span>
                    {pkg.destination},{" "}
                    {pkg.country}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />

                  <span>
                    {pkg.duration}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-semibold text-slate-900">
                    {pkg.rating}
                  </span>

                  <span className="text-sm text-slate-500">
                    ({pkg.reviews} reviews)
                  </span>
                </div>

                {/* PRICE */}

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ₹
                      {pkg.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {pkg.oldPrice >
                      pkg.price && (
                      <span className="text-sm text-slate-400 line-through">
                        ₹
                        {pkg.oldPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Per person
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {pkg.bookings} bookings
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    Popular Package
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                  {pkg.description}
                </p>

                <div className="mt-4">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {pkg.type}
                  </span>
                </div>

                {/* HIGHLIGHTS */}

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Highlights
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {pkg.highlights
                      .slice(0, 3)
                      .map(
                        (
                          highlight,
                          index
                        ) => (
                          <span
                            key={index}
                            className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                          >
                            {highlight}
                          </span>
                        )
                      )}
                  </div>

                  {pkg.highlights
                    .length > 3 && (
                    <p className="mt-2 text-xs font-medium text-blue-600">
                      +
                      {pkg.highlights
                        .length -
                        3}{" "}
                      more
                    </p>
                  )}
                </div>

                {/* VIEW */}

                <button
                  onClick={() =>
                    handleViewPackage(pkg)
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Eye size={17} />
                  View Package Details
                </button>

                {/* ACTIONS */}

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() =>
                      handleViewPackage(pkg)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() =>
                      openEditModal(pkg)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleToggleStatus(
                        pkg.id
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    title={
                      pkg.status ===
                      "Active"
                        ? "Deactivate"
                        : "Activate"
                    }
                  >
                    <Power size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDuplicatePackage(
                        pkg.id
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    title="Duplicate"
                  >
                    <Copy size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDeletePackage(
                        pkg.id
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* =================================================
           EMPTY
        ================================================= */

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Package
              size={24}
              className="text-slate-400"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No packages found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filter options.
          </p>

          <button
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </div>
      )}

      {/* =====================================================
          VIEW PACKAGE MODAL
      ===================================================== */}

      {selectedPackage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() =>
            setSelectedPackage(null)
          }
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* MAIN IMAGE */}

            <div className="relative">
              {selectedPackage.image ? (
                <img
                  src={selectedPackage.image}
                  alt={selectedPackage.name}
                  className="h-56 w-full object-cover"
                />
              ) : (
                <div className="flex h-56 w-full items-center justify-center bg-slate-100">
                  <Package
                    size={48}
                    className="text-slate-300"
                  />
                </div>
              )}

              <button
                onClick={() =>
                  setSelectedPackage(null)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedPackage.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />

                    {selectedPackage.destination},{" "}
                    {selectedPackage.country}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedPackage.status ===
                      "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {selectedPackage.status}
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {selectedPackage.type}
                  </span>
                </div>
              </div>

              {/* GALLERY */}

              {selectedPackage.images?.length >
                0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">
                      Package Gallery
                    </h3>

                    <span className="text-xs text-slate-500">
                      {selectedPackage.images.length}{" "}
                      images
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedPackage.images.map(
                      (image, index) => (
                        <img
                          key={
                            image._id ||
                            index
                          }
                          src={image.url}
                          alt={`${selectedPackage.name} ${
                            index + 1
                          }`}
                          className="h-28 w-full rounded-lg object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* INFO */}

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedPackage.duration}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Rating
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-900">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {selectedPackage.rating}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Bookings
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedPackage.bookings}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Reviews
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedPackage.reviews}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900">
                  Description
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedPackage.description ||
                    "No description available."}
                </p>
              </div>

              {/* HIGHLIGHTS */}

              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900">
                  Highlights
                </h3>

                {selectedPackage.highlights.length >
                0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedPackage.highlights.map(
                      (item, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">
                    No highlights available.
                  </p>
                )}
              </div>

              {/* INCLUSIONS */}

              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900">
                  Inclusions
                </h3>

                {selectedPackage.inclusions.length >
                0 ? (
                  <ul className="mt-3 space-y-2">
                    {selectedPackage.inclusions.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-600"
                        >
                          <span className="mr-2 font-semibold text-emerald-500">
                            ✓
                          </span>

                          {item}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">
                    No inclusions available.
                  </p>
                )}
              </div>

              {/* EXCLUSIONS */}

              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900">
                  Exclusions
                </h3>

                {selectedPackage.exclusions.length >
                0 ? (
                  <ul className="mt-3 space-y-2">
                    {selectedPackage.exclusions.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-600"
                        >
                          <span className="mr-2 font-semibold text-red-500">
                            •
                          </span>

                          {item}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">
                    No exclusions available.
                  </p>
                )}
              </div>

              {/* FOOTER */}

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Package Price
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-2xl font-bold text-slate-900">
                      ₹
                      {selectedPackage.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {selectedPackage.oldPrice >
                      selectedPackage.price && (
                      <p className="text-sm text-slate-400 line-through">
                        ₹
                        {selectedPackage.oldPrice.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      openEditModal(
                        selectedPackage
                      )
                    }
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setSelectedPackage(null)
                    }
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {(isAddModalOpen ||
        editingPackage) && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={closeFormModal}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingPackage
                    ? "Edit Package"
                    : "Add New Package"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingPackage
                    ? "Update package information"
                    : "Create a new travel package"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeFormModal}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSavePackage}
              className="p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* NAME */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Package Name *
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter package name"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* DESTINATION */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Destination *
                  </label>

                  <select
                    name="destination"
                    value={
                      formData.destination
                    }
                    onChange={handleFormChange}
                    disabled={
                      destinationLoading
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                  >
                    <option value="">
                      {destinationLoading
                        ? "Loading destinations..."
                        : "Select Destination"}
                    </option>

                    {destinationOptions.map(
                      (item) => (
                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                          {item.country
                            ? ` - ${item.country}`
                            : ""}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* COUNTRY */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Country *
                  </label>

                  <input
                    name="country"
                    value={
                      formData.country
                    }
                    onChange={handleFormChange}
                    placeholder="UAE"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* TYPE */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Package Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>
                      International
                    </option>

                    <option>
                      Domestic
                    </option>

                    <option>
                      Honeymoon
                    </option>

                    <option>
                      Family
                    </option>

                    <option>
                      Adventure
                    </option>

                    <option>
                      Luxury
                    </option>
                  </select>
                </div>

                {/* DAYS */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Days
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="days"
                    value={formData.days}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* NIGHTS */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nights
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="nights"
                    value={formData.nights}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PRICE */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Price *
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="45999"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* OLD PRICE */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Old Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="oldPrice"
                    value={
                      formData.oldPrice
                    }
                    onChange={handleFormChange}
                    placeholder="52999"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* =================================================
                    MAIN IMAGE
                ================================================= */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Main / Cover Image
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                      <Upload size={16} />

                      {formData.image
                        ? formData.image.name
                        : "Choose Main Image"}

                      <input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                        onChange={handleFormChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Maximum image size: 5MB
                  </p>

                  {editingPackage &&
                    !formData.image && (
                      <p className="mt-1 text-xs text-slate-500">
                        Leave empty to keep the existing main image.
                      </p>
                    )}
                </div>

                {/* =================================================
                    MULTIPLE GALLERY IMAGES
                ================================================= */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Package Gallery Images
                  </label>

                  <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50/30">
                    <ImageIcon
                      size={28}
                      className="text-slate-400"
                    />

                    <span className="mt-2 text-sm font-medium text-slate-700">
                      Choose Multiple Images
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      You can select multiple images at once
                    </span>

                    <input
                      type="file"
                      name="galleryImages"
                      multiple
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                      onChange={handleFormChange}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-1.5 text-xs text-slate-400">
                    Maximum 10 gallery images, 5MB per image.
                  </p>

                  {/* EXISTING IMAGES */}

                  {editingPackage &&
                    existingImages.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-700">
                          Existing Gallery
                        </p>

                        <span className="text-xs text-slate-400">
                          {existingImages.length} images
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {existingImages.map(
                          (
                            image,
                            index
                          ) => (
                            <div
                              key={
                                image._id ||
                                index
                              }
                              className="group relative overflow-hidden rounded-lg border border-slate-200"
                            >
                              <img
                                src={
                                  image.url
                                }
                                alt={`Existing gallery ${
                                  index + 1
                                }`}
                                className="h-28 w-full object-cover"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveExistingImage(
                                    image
                                  )
                                }
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-90 shadow-md transition hover:bg-red-600"
                                title="Remove image"
                              >
                                <X
                                  size={
                                    14
                                  }
                                />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* NEW IMAGES */}

                  {formData.galleryImages
                    ?.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-700">
                          New Images
                        </p>

                        <span className="text-xs text-slate-400">
                          {
                            formData
                              .galleryImages
                              .length
                          }{" "}
                          selected
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {formData.galleryImages.map(
                          (
                            file,
                            index
                          ) => {
                            const previewUrl =
                              URL.createObjectURL(
                                file
                              );

                            return (
                              <div
                                key={`${file.name}-${index}`}
                                className="relative overflow-hidden rounded-lg border border-slate-200"
                              >
                                <img
                                  src={
                                    previewUrl
                                  }
                                  alt={
                                    file.name
                                  }
                                  className="h-28 w-full object-cover"
                                  onLoad={() =>
                                    URL.revokeObjectURL(
                                      previewUrl
                                    )
                                  }
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveNewGalleryImage(
                                      index
                                    )
                                  }
                                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                                  title="Remove image"
                                >
                                  <X
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 truncate bg-black/60 px-2 py-1 text-[10px] text-white">
                                  {file.name}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={handleFormChange}
                    rows="4"
                    placeholder="Write package description..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* HIGHLIGHTS */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Highlights
                  </label>

                  <textarea
                    name="highlights"
                    value={
                      formData.highlights
                    }
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Burj Khalifa, Desert Safari, Dubai Mall"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Separate items with commas.
                  </p>
                </div>

                {/* INCLUSIONS */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Inclusions
                  </label>

                  <textarea
                    name="inclusions"
                    value={
                      formData.inclusions
                    }
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Hotel Stay, Breakfast, Airport Transfer"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* EXCLUSIONS */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Exclusions
                  </label>

                  <textarea
                    name="exclusions"
                    value={
                      formData.exclusions
                    }
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Flights, Personal Expenses, Travel Insurance"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    createLoading ||
                    updateLoading
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {createLoading ||
                  updateLoading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : editingPackage ? (
                    <>
                      <Edit size={16} />

                      Update Package
                    </>
                  ) : (
                    <>
                      <Plus size={16} />

                      Add Package
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;