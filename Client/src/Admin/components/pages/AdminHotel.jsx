import React, { useEffect, useMemo, useState } from "react";
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
  Waves,
  Wifi,
  X,
  Upload,
  Image as ImageIcon,
  Edit,
  Trash2,
  Plus,
  Eye,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { createHotel, getAllHotel, updateHotel, deleteHotel } from "../../../redux/slicer/hotelSlice";

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm = {
  hotelName: "",
  propertyType: "Hotel",
  starRating: "4",
  email: "",
  phone: "",
  city: "",
  state: "",
  country: "India",
  address: "",
  pincode: "",
  description: "",
  checkIn: "02:00 PM",
  checkOut: "12:00 PM",
  rooms: "",
  price: "",
  amenities: [],
  status: "Active",

  // Existing image URLs
  image: "",
  images: [],

  // NEW:
  // Actual File objects selected from computer
  imageFiles: [],
};

/* =========================================================
   AMENITIES
========================================================= */

const amenitiesList = [
  "Free WiFi",
  "Swimming Pool",
  "Parking",
  "Restaurant",
  "Gym",
  "Spa",
  "Airport Pickup",
  "Room Service",
  "Air Conditioning",
];

/* =========================================================
   ICON MAP
========================================================= */

const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case "Free WiFi":
      return Wifi;

    case "Swimming Pool":
      return Waves;

    case "Parking":
      return ParkingCircle;

    case "Restaurant":
      return Coffee;

    default:
      return Check;
  }
};

/* =========================================================
   NORMALIZE HOTEL
========================================================= */

const normalizeHotel = (h) => {
  const existingImages = Array.isArray(h?.images)
    ? h.images.filter(Boolean)
    : h?.image
      ? [h.image]
      : [];

  return {
    id: h?._id || h?.id,

    hotelName: h?.hotelName || "",
    propertyType: h?.propertyType || "Hotel",

    starRating: Number(h?.starRating) || 0,
    rating: Number(h?.rating) || 0,
    reviews: Number(h?.reviews) || 0,

    email: h?.email || "",
    phone: h?.phone || "",

    city: h?.city || "",
    state: h?.state || "",
    country: h?.country || "India",

    address: h?.address || "",
    pincode: h?.pincode || "",

    description: h?.description || "",

    checkIn: h?.checkIn || "02:00 PM",
    checkOut: h?.checkOut || "12:00 PM",

    rooms: Number(h?.rooms) || 0,
    price: Number(h?.price) || 0,

    amenities: Array.isArray(h?.amenities) ? h.amenities : [],

    status: h?.status || "Active",

    image: h?.image || existingImages[0] || "",
    images: existingImages,

    imageDeleteUrl: h?.imageDeleteUrl || "",
    imageDeleteUrls: Array.isArray(h?.imageDeleteUrls)
      ? h.imageDeleteUrls
      : [],

    createdAt: h?.createdAt,
    updatedAt: h?.updatedAt,
  };
};

/* =========================================================
   COMPONENT
========================================================= */

const AdminHotel = () => {
  const dispatch = useDispatch();

  const { hotels = [], loading, error } = useSelector(
    (state) => state.hotel
  );

  /* =======================================================
     STATES
  ======================================================= */

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [rating, setRating] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [status, setStatus] = useState("All");

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [submitting, setSubmitting] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  /* =======================================================
     FETCH HOTELS
  ======================================================= */

  useEffect(() => {
    dispatch(getAllHotel());
  }, [dispatch]);

  /* =======================================================
     ERROR TOAST
  ======================================================= */

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong"
      );
    }
  }, [error]);

  /* =======================================================
     NORMALIZED HOTELS
  ======================================================= */

  const normalizedHotels = useMemo(() => {
    return hotels.map(normalizeHotel);
  }, [hotels]);

  /* =======================================================
     CITY LIST
  ======================================================= */

  const cityList = useMemo(() => {
    const cities = normalizedHotels
      .map((hotel) => hotel.city)
      .filter(Boolean);

    return ["All", ...new Set(cities)];
  }, [normalizedHotels]);

  /* =======================================================
     FILTER HOTELS
  ======================================================= */

  const filteredHotels = useMemo(() => {
    return normalizedHotels.filter((hotel) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        hotel.hotelName.toLowerCase().includes(searchText) ||
        hotel.city.toLowerCase().includes(searchText) ||
        hotel.state.toLowerCase().includes(searchText) ||
        hotel.country.toLowerCase().includes(searchText);

      const matchesCity =
        city === "All" || hotel.city.toLowerCase() === city.toLowerCase();

      const matchesRating =
        rating === "All" || Number(hotel.starRating) === Number(rating);

      const matchesPropertyType =
        propertyType === "All" ||
        hotel.propertyType.toLowerCase() === propertyType.toLowerCase();

      const matchesStatus =
        status === "All" ||
        hotel.status.toLowerCase() === status.toLowerCase();

      return (
        matchesSearch &&
        matchesCity &&
        matchesRating &&
        matchesPropertyType &&
        matchesStatus
      );
    });
  }, [
    normalizedHotels,
    search,
    city,
    rating,
    propertyType,
    status,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHotels.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const total = normalizedHotels.length;

    const active = normalizedHotels.filter(
      (hotel) => hotel.status === "Active"
    ).length;

    const inactive = normalizedHotels.filter(
      (hotel) => hotel.status !== "Active"
    ).length;

    const cities = new Set(
      normalizedHotels.map((hotel) => hotel.city).filter(Boolean)
    ).size;

    return {
      total,
      active,
      inactive,
      cities,
    };
  }, [normalizedHotels]);

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setForm({
      ...emptyForm,
      amenities: [],
      image: "",
      images: [],
      imageFiles: [],
    });
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (!form.hotelName.trim()) {
      toast.error("Hotel name is required");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (!form.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!form.state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (!form.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (!form.pincode.trim()) {
      toast.error("Pincode is required");
      return false;
    }

    if (!form.rooms || Number(form.rooms) <= 0) {
      toast.error("Enter valid number of rooms");
      return false;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Enter valid price");
      return false;
    }

    return true;
  };

  /* =======================================================
     GENERATE PREVIEW URL
  ======================================================= */

  const createPreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  /* =======================================================
     IMAGE UPLOAD
     
     IMPORTANT:
     - images = preview URLs / existing URLs
     - imageFiles = REAL FILE OBJECTS
     
     We DO NOT save blob URL as backend image.
  ======================================================= */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return false;
      }

      // 5 MB max per image
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} must be less than 5MB`);
        return false;
      }

      return true;
    });

    if (!validFiles.length) {
      e.target.value = "";
      return;
    }

    const previewUrls = validFiles.map((file) =>
      createPreviewUrl(file)
    );

    setForm((prev) => {
      const newImages = [...prev.images, ...previewUrls];

      return {
        ...prev,

        // Preview only
        images: newImages,

        // REAL files
        imageFiles: [...prev.imageFiles, ...validFiles],

        // First preview for main image
        image: prev.image || previewUrls[0],
      };
    });

    toast.success(
      `${validFiles.length} image${
        validFiles.length > 1 ? "s" : ""
      } selected`
    );

    // Reset file input
    e.target.value = "";
  };

  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const removeImage = (index) => {
    setForm((prev) => {
      const imageToRemove = prev.images[index];

      // If this is a local blob URL, revoke it
      if (
        typeof imageToRemove === "string" &&
        imageToRemove.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imageToRemove);
      }

      const updatedImages = prev.images.filter(
        (_, i) => i !== index
      );

      /*
        Because existing server images do not have File objects,
        imageFiles correspond only to newly selected files.

        For newly selected files, their indexes are calculated
        relative to the blob images.
      */

      const blobIndexes = prev.images
        .map((img, i) => (img.startsWith("blob:") ? i : -1))
        .filter((i) => i !== -1);

      const removedBlobPosition = blobIndexes.indexOf(index);

      let updatedFiles = [...prev.imageFiles];

      if (removedBlobPosition !== -1) {
        updatedFiles.splice(removedBlobPosition, 1);
      }

      return {
        ...prev,
        images: updatedImages,
        imageFiles: updatedFiles,
        image: updatedImages[0] || "",
      };
    });

    toast.success("Image removed");
  };

  /* =======================================================
     TOGGLE AMENITY
  ======================================================= */

  const toggleAmenity = (amenity) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);

      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  /* =======================================================
     FORM INPUT
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     ADD HOTEL
  ======================================================= */

  const handleAddHotel = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      /*
        IMPORTANT:
        We send imageFiles separately.

        hotelSlice must convert this into FormData.
      */

      const payload = {
        ...form,

        starRating: Number(form.starRating),
        rooms: Number(form.rooms),
        price: Number(form.price),

        /*
          DO NOT send blob URL as database image.
          imageFiles contains actual File objects.
        */
        imageFiles: form.imageFiles,

        /*
          For a new hotel, image URLs should normally
          be empty until backend uploads them.
        */
        image: "",
        images: [],
      };

      await dispatch(createHotel(payload)).unwrap();

      toast.success("Hotel added successfully!");

      setShowAddModal(false);
      resetForm();

      setPage(1);

      dispatch(getAllHotel());
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to create hotel"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);

    setForm({
      hotelName: hotel.hotelName || "",
      propertyType: hotel.propertyType || "Hotel",
      starRating: String(hotel.starRating || 4),

      email: hotel.email || "",
      phone: hotel.phone || "",

      city: hotel.city || "",
      state: hotel.state || "",
      country: hotel.country || "India",

      address: hotel.address || "",
      pincode: hotel.pincode || "",

      description: hotel.description || "",

      checkIn: hotel.checkIn || "02:00 PM",
      checkOut: hotel.checkOut || "12:00 PM",

      rooms: String(hotel.rooms || ""),
      price: String(hotel.price || ""),

      amenities: Array.isArray(hotel.amenities)
        ? [...hotel.amenities]
        : [],

      status: hotel.status || "Active",

      /*
        Existing server URLs
      */
      image: hotel.image || "",
      images: [...(hotel.images || [])],

      /*
        New files selected during this edit
      */
      imageFiles: [],
    });

    setShowEditModal(true);
  };

  /* =======================================================
     UPDATE HOTEL
  ======================================================= */

  const handleUpdateHotel = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!selectedHotel?.id) {
      toast.error("Hotel ID not found");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,

        starRating: Number(form.starRating),
        rooms: Number(form.rooms),
        price: Number(form.price),

        /*
          New actual files
        */
        imageFiles: form.imageFiles,

        /*
          Existing image URLs.
          Backend can use these to keep old images.
        */
        existingImages: form.images.filter(
          (image) => !image.startsWith("blob:")
        ),

        /*
          Don't send blob URL as permanent image.
        */
        image: form.images.find(
          (image) => !image.startsWith("blob:")
        ) || "",
      };

      await dispatch(
        updateHotel({
          id: selectedHotel.id,
          hotelData: payload,
        })
      ).unwrap();

      toast.success("Hotel updated successfully!");

      setShowEditModal(false);
      setSelectedHotel(null);
      resetForm();

      dispatch(getAllHotel());
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to update hotel"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     DELETE HOTEL
  ======================================================= */

  const handleDeleteHotel = async (id) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteHotel(id)).unwrap();

      toast.success("Hotel deleted successfully");

      dispatch(getAllHotel());
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to delete hotel"
      );
    }
  };

  /* =======================================================
     STATUS TOGGLE
  ======================================================= */

  const handleToggleStatus = async (hotel) => {
    const newStatus =
      hotel.status === "Active" ? "Inactive" : "Active";

    try {
      await dispatch(
        updateHotel({
          id: hotel.id,
          hotelData: {
            status: newStatus,
          },
        })
      ).unwrap();

      toast.success(
        `Hotel ${
          newStatus === "Active"
            ? "activated"
            : "deactivated"
        } successfully`
      );

      dispatch(getAllHotel());
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to update status"
      );
    }
  };

  /* =======================================================
     VIEW HOTEL
  ======================================================= */

  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setShowViewModal(true);
  };

  /* =======================================================
     ADD MODAL CLOSE
  ======================================================= */

  const closeAddModal = () => {
    if (submitting) return;

    form.images.forEach((image) => {
      if (
        typeof image === "string" &&
        image.startsWith("blob:")
      ) {
        URL.revokeObjectURL(image);
      }
    });

    setShowAddModal(false);
    resetForm();
  };

  /* =======================================================
     EDIT MODAL CLOSE
  ======================================================= */

  const closeEditModal = () => {
    if (submitting) return;

    form.images.forEach((image) => {
      if (
        typeof image === "string" &&
        image.startsWith("blob:")
      ) {
        URL.revokeObjectURL(image);
      }
    });

    setShowEditModal(false);
    setSelectedHotel(null);
    resetForm();
  };

  /* =======================================================
     PAGE CHANGE
  ======================================================= */

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setCity("All");
    setRating("All");
    setPropertyType("All");
    setStatus("All");
    setPage(1);
  };

  /* =======================================================
     HOTEL FORM
  ======================================================= */

  const renderHotelForm = (isEdit = false) => {
    return (
      <form
        onSubmit={
          isEdit
            ? handleUpdateHotel
            : handleAddHotel
        }
        className="space-y-6"
      >
        {/* =================================================
            BASIC DETAILS
        ================================================= */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Basic Hotel Information
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Enter the basic details of your hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Hotel Name */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Name *
            </label>

            <input
              type="text"
              name="hotelName"
              value={form.hotelName}
              onChange={handleChange}
              placeholder="Enter hotel name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Property Type */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>

            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Guest House">
                Guest House
              </option>
              <option value="Hostel">Hostel</option>
            </select>
          </div>

          {/* Star Rating */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Star Rating
            </label>

            <select
              name="starRating"
              value={form.starRating}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* =================================================
            CONTACT
        ================================================= */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="hotel@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* =================================================
            LOCATION
        ================================================= */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Location
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>

            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>

            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            placeholder="Enter complete hotel address"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        {/* =================================================
            HOTEL DETAILS
        ================================================= */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Hotel Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms *
            </label>

            <input
              type="number"
              name="rooms"
              value={form.rooms}
              onChange={handleChange}
              min="1"
              placeholder="Number of rooms"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price / Night *
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
              placeholder="₹ Price"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check In
            </label>

            <input
              type="text"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              placeholder="02:00 PM"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Out
            </label>

            <input
              type="text"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              placeholder="12:00 PM"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your hotel..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        {/* =================================================
            AMENITIES
        ================================================= */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amenities
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => {
              const Icon = getAmenityIcon(amenity);

              const selected =
                form.amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                  }`}
                >
                  <Icon size={18} />

                  <span className="text-sm font-medium flex-1">
                    {amenity}
                  </span>

                  {selected && (
                    <Check size={18} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
            IMAGE UPLOAD
        ================================================= */}

        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Hotel Images
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Upload JPG, PNG or WEBP images. Maximum 5MB
                per image.
              </p>
            </div>

            <label
              htmlFor="hotel-images"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer hover:bg-blue-700 transition"
            >
              <Upload size={17} />
              Upload Images
            </label>
          </div>

          <input
            id="hotel-images"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          {form.images.length === 0 ? (
            <label
              htmlFor="hotel-images"
              className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <ImageIcon
                  size={26}
                  className="text-blue-600"
                />
              </div>

              <p className="font-semibold text-gray-800">
                Click to upload images
              </p>

              <p className="text-sm text-gray-500 mt-1">
                You can select multiple images
              </p>
            </label>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {form.images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 aspect-square"
                >
                  <img
                    src={image}
                    alt={`Hotel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

                  {index === 0 && (
                    <span className="absolute top-2 left-2 rounded-lg bg-blue-600 text-white px-2 py-1 text-xs font-semibold">
                      Main
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={
              isEdit
                ? closeEditModal
                : closeAddModal
            }
            disabled={submitting}
            className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEdit
                  ? "Updating..."
                  : "Creating..."}
              </>
            ) : (
              <>
                <Check size={18} />

                {isEdit
                  ? "Update Hotel"
                  : "Create Hotel"}
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hotels
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your hotel properties and listings.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={19} />
            Add Hotel
          </button>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Hotels
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <BedDouble
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Active
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.active}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <Check
                  size={22}
                  className="text-green-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Inactive
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.inactive}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <X
                  size={22}
                  className="text-red-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Cities
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.cities}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <MapPin
                  size={22}
                  className="text-purple-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search hotel, city or location..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters((prev) => !prev)
              }
              className="lg:hidden inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-700"
            >
              <SlidersHorizontal size={18} />
              Filters

              {showFilters ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

            <div
              className={`${
                showFilters
                  ? "flex"
                  : "hidden lg:flex"
              } flex-col sm:flex-row gap-3`}
            >
              {/* City */}

              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                {cityList.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Cities"
                      : item}
                  </option>
                ))}
              </select>

              {/* Rating */}

              <select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Ratings
                </option>
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
                <option value="1">1 Star</option>
              </select>

              {/* Property */}

              <select
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Properties
                </option>
                <option value="Hotel">
                  Hotel
                </option>
                <option value="Resort">
                  Resort
                </option>
                <option value="Villa">
                  Villa
                </option>
                <option value="Apartment">
                  Apartment
                </option>
                <option value="Guest House">
                  Guest House
                </option>
                <option value="Hostel">
                  Hostel
                </option>
              </select>

              {/* Status */}

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Status
                </option>
                <option value="Active">
                  Active
                </option>
                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                <Filter size={17} />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

              <p className="text-gray-500 mt-4">
                Loading hotels...
              </p>
            </div>
          ) : paginatedHotels.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center px-5 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <BedDouble
                  size={28}
                  className="text-gray-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                No hotels found
              </h3>

              <p className="text-gray-500 mt-1">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop */}

              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/70">
                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Hotel
                      </th>

                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Location
                      </th>

                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Rating
                      </th>

                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Rooms
                      </th>

                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Price
                      </th>

                      <th className="text-left px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Status
                      </th>

                      <th className="text-right px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedHotels.map((hotel) => (
                      <tr
                        key={hotel.id}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
                      >
                        {/* Hotel */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              {hotel.image ? (
                                <img
                                  src={hotel.image}
                                  alt={hotel.hotelName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon
                                    size={22}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate max-w-[220px]">
                                {hotel.hotelName}
                              </p>

                              <p className="text-sm text-gray-500">
                                {hotel.propertyType}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin
                              size={16}
                              className="text-gray-400"
                            />

                            <span>
                              {hotel.city},{" "}
                              {hotel.state}
                            </span>
                          </div>
                        </td>

                        {/* Rating */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            <Star
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="font-semibold">
                              {hotel.starRating}
                            </span>

                            <span className="text-gray-400 text-sm">
                              ({hotel.reviews})
                            </span>
                          </div>
                        </td>

                        {/* Rooms */}

                        <td className="px-5 py-4 text-gray-700">
                          {hotel.rooms}
                        </td>

                        {/* Price */}

                        <td className="px-5 py-4">
                          <span className="font-semibold text-gray-900">
                            ₹
                            {hotel.price.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          <span className="text-gray-400 text-xs">
                            {" "}
                            / night
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(
                                hotel
                              )
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                              hotel.status === "Active"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {hotel.status}
                          </button>
                        </td>

                        {/* Actions */}

                        <td className="px-5 py-4">
                          <div className="flex justify-end items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleView(hotel)
                              }
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                              title="View"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(hotel)
                              }
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50"
                              title="Edit"
                            >
                              <Edit size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteHotel(
                                  hotel.id
                                )
                              }
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE CARDS
              ================================================= */}

              <div className="lg:hidden divide-y divide-gray-100">
                {paginatedHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="p-4"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {hotel.image ? (
                          <img
                            src={hotel.image}
                            alt={hotel.hotelName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon
                              size={22}
                              className="text-gray-400"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {hotel.hotelName}
                            </h3>

                            <p className="text-sm text-gray-500 mt-0.5">
                              {hotel.propertyType}
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              hotel.status ===
                              "Active"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {hotel.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <MapPin
                              size={14}
                            />
                            {hotel.city}
                          </span>

                          <span className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            {hotel.starRating}
                          </span>

                          <span className="flex items-center gap-1 text-gray-600">
                            <BedDouble
                              size={14}
                            />
                            {hotel.rooms}
                          </span>
                        </div>

                        <p className="font-semibold text-gray-900 mt-2">
                          ₹
                          {hotel.price.toLocaleString(
                            "en-IN"
                          )}
                          <span className="text-xs text-gray-400 font-normal">
                            {" "}
                            / night
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleView(hotel)
                        }
                        className="px-3 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(hotel)
                        }
                        className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteHotel(hotel.id)
                        }
                        className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  {filteredHotels.length === 0
                    ? 0
                    : (currentPage - 1) *
                        itemsPerPage +
                      1}{" "}
                  -{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredHotels.length
                  )}{" "}
                  of {filteredHotels.length}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      changePage(currentPage - 1)
                    }
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() =>
                        changePage(pageNumber)
                      }
                      className={`w-9 h-9 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      changePage(currentPage + 1)
                    }
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* =======================================================
          ADD HOTEL MODAL
      ======================================================= */}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Hotel
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add hotel details and images.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                disabled={submitting}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(92vh-90px)]">
              {renderHotelForm(false)}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          EDIT HOTEL MODAL
      ======================================================= */}

      {showEditModal && selectedHotel && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Hotel
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update hotel information and images.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={submitting}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(92vh-90px)]">
              {renderHotelForm(true)}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          VIEW HOTEL MODAL
      ======================================================= */}

      {showViewModal && selectedHotel && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Hotel Details
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedHotel.hotelName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedHotel(null);
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(92vh-90px)]">
              {/* Images */}

              {selectedHotel.images?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {selectedHotel.images.map(
                    (image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="aspect-video rounded-xl overflow-hidden bg-gray-100"
                      >
                        <img
                          src={image}
                          alt={`${selectedHotel.hotelName} ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="h-48 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <ImageIcon
                      size={30}
                      className="mx-auto text-gray-400"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      No hotel image
                    </p>
                  </div>
                </div>
              )}

              {/* Header */}

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedHotel.hotelName}
                  </h3>

                  <p className="flex items-center gap-2 text-gray-500 mt-2">
                    <MapPin size={17} />
                    {selectedHotel.address},{" "}
                    {selectedHotel.city},{" "}
                    {selectedHotel.state},{" "}
                    {selectedHotel.country}
                  </p>
                </div>

                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold w-fit ${
                    selectedHotel.status ===
                    "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {selectedHotel.status}
                </span>
              </div>

              {/* Information */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Property
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedHotel.propertyType}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Rating
                  </p>

                  <p className="font-semibold mt-1 flex items-center gap-1">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {selectedHotel.starRating}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Rooms
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedHotel.rooms}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Price
                  </p>

                  <p className="font-semibold mt-1">
                    ₹
                    {selectedHotel.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>

              {/* Description */}

              {selectedHotel.description && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900">
                    Description
                  </h4>

                  <p className="text-gray-600 leading-7 mt-2">
                    {selectedHotel.description}
                  </p>
                </div>
              )}

              {/* Contact */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Email
                    </p>

                    <p className="font-medium text-gray-800">
                      {selectedHotel.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Phone
                      size={18}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Phone
                    </p>

                    <p className="font-medium text-gray-800">
                      {selectedHotel.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing */}

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={17} />
                  Check-in:{" "}
                  <strong>
                    {selectedHotel.checkIn}
                  </strong>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={17} />
                  Check-out:{" "}
                  <strong>
                    {selectedHotel.checkOut}
                  </strong>
                </div>
              </div>

              {/* Amenities */}

              {selectedHotel.amenities?.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Amenities
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedHotel.amenities.map(
                      (amenity) => {
                        const Icon =
                          getAmenityIcon(
                            amenity
                          );

                        return (
                          <span
                            key={amenity}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm"
                          >
                            <Icon size={15} />
                            {amenity}
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHotel;