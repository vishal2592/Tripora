import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  CheckCircle2,
  Ban,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  RotateCcw,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  BedDouble,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Upload,
  Wifi,
  Waves,
  Car,
  Utensils,
  Dumbbell,
  Sparkles,
  Plane,
  ConciergeBell,
  Snowflake,
  Phone,
  Mail,
  Clock3,
  MapPinned,
} from "lucide-react";

/* =========================================================
   DUMMY HOTEL DATA
========================================================= */

const initialHotels = [
  {
    id: 1,
    name: "Taj Mahal Palace",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Apollo Bandar, Colaba, Mumbai",
    pincode: "400001",
    propertyType: "Hotel",
    starRating: 5,
    rating: 4.8,
    reviews: 2458,
    rooms: 124,
    price: 8999,
    email: "reservations@tajmumbai.com",
    phone: "+91 22 6665 3366",
    checkIn: "02:00 PM",
    checkOut: "12:00 PM",
    description:
      "A luxury heritage hotel overlooking the Gateway of India with world-class hospitality and dining.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Spa",
      "Airport Pickup",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "The Oberoi",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    address: "Dr Zakir Hussain Marg, New Delhi",
    pincode: "110003",
    propertyType: "Hotel",
    starRating: 5,
    rating: 4.7,
    reviews: 1892,
    rooms: 98,
    price: 12499,
    email: "delhi@oberoihotels.com",
    phone: "+91 11 2436 3030",
    checkIn: "02:00 PM",
    checkOut: "12:00 PM",
    description:
      "A premium luxury hotel in the heart of New Delhi offering elegant rooms and exceptional dining.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Spa",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 3,
    name: "Atlantis The Palm",
    city: "Dubai",
    state: "Dubai",
    country: "UAE",
    address: "Crescent Road, Palm Jumeirah, Dubai",
    pincode: "00000",
    propertyType: "Resort",
    starRating: 5,
    rating: 4.9,
    reviews: 3214,
    rooms: 312,
    price: 28999,
    email: "reservations@atlantisthepalm.com",
    phone: "+971 4 426 0000",
    checkIn: "03:00 PM",
    checkOut: "12:00 PM",
    description:
      "Iconic luxury resort located on Palm Jumeirah with stunning Arabian Gulf views and family attractions.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Spa",
      "Airport Pickup",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 4,
    name: "Grand Hyatt Goa",
    city: "Goa",
    state: "Goa",
    country: "India",
    address: "P.O. Goa University, Bambolim, Goa",
    pincode: "403206",
    propertyType: "Resort",
    starRating: 5,
    rating: 4.6,
    reviews: 1456,
    rooms: 76,
    price: 7499,
    email: "goa@hyatt.com",
    phone: "+91 832 301 1234",
    checkIn: "03:00 PM",
    checkOut: "12:00 PM",
    description:
      "A beautiful waterfront resort surrounded by tropical gardens and a peaceful lagoon.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Spa",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 5,
    name: "The Leela Palace",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    address: "Kukas, Jaipur, Rajasthan",
    pincode: "303101",
    propertyType: "Hotel",
    starRating: 5,
    rating: 4.8,
    reviews: 1124,
    rooms: 198,
    price: 10999,
    email: "jaipur@theleela.com",
    phone: "+91 1426 350000",
    checkIn: "02:00 PM",
    checkOut: "12:00 PM",
    description:
      "A palace-inspired luxury retreat offering royal architecture and modern comfort.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Spa",
      "Room Service",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 6,
    name: "Bali Paradise Resort",
    city: "Bali",
    state: "Bali",
    country: "Indonesia",
    address: "Jl. Sunset Road, Bali",
    pincode: "80361",
    propertyType: "Resort",
    starRating: 4,
    rating: 4.5,
    reviews: 876,
    rooms: 145,
    price: 8999,
    email: "hello@baliparadise.com",
    phone: "+62 361 222 888",
    checkIn: "02:00 PM",
    checkOut: "12:00 PM",
    description:
      "Tropical resort experience with modern rooms, pools and relaxing surroundings.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Spa",
      "Room Service",
    ],
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 7,
    name: "Snow Valley Resort",
    city: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    address: "Hadimba Road, Manali",
    pincode: "175131",
    propertyType: "Resort",
    starRating: 4,
    rating: 4.4,
    reviews: 643,
    rooms: 62,
    price: 4999,
    email: "info@snowvalley.com",
    phone: "+91 1902 252222",
    checkIn: "01:00 PM",
    checkOut: "11:00 AM",
    description:
      "Mountain resort with scenic Himalayan views and comfortable rooms for families.",
    amenities: [
      "Free WiFi",
      "Parking",
      "Restaurant",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Inactive",
  },
  {
    id: 8,
    name: "Sea View Villa",
    city: "Goa",
    state: "Goa",
    country: "India",
    address: "Calangute Beach Road, Goa",
    pincode: "403516",
    propertyType: "Villa",
    starRating: 4,
    rating: 4.3,
    reviews: 421,
    rooms: 18,
    price: 6499,
    email: "stay@seaviewvilla.com",
    phone: "+91 98765 43210",
    checkIn: "02:00 PM",
    checkOut: "11:00 AM",
    description:
      "Private villa near the beach with spacious rooms and a peaceful atmosphere.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 9,
    name: "City Comfort Hotel",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Andheri East, Mumbai",
    pincode: "400069",
    propertyType: "Hotel",
    starRating: 3,
    rating: 4.1,
    reviews: 285,
    rooms: 54,
    price: 3499,
    email: "info@citycomfort.com",
    phone: "+91 22 4455 8899",
    checkIn: "01:00 PM",
    checkOut: "11:00 AM",
    description:
      "Comfortable city hotel ideal for business and short leisure stays.",
    amenities: [
      "Free WiFi",
      "Parking",
      "Restaurant",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
  },
  {
    id: 10,
    name: "Desert Pearl Hotel",
    city: "Dubai",
    state: "Dubai",
    country: "UAE",
    address: "Sheikh Zayed Road, Dubai",
    pincode: "00000",
    propertyType: "Hotel",
    starRating: 4,
    rating: 4.2,
    reviews: 732,
    rooms: 156,
    price: 11999,
    email: "booking@desertpearl.com",
    phone: "+971 4 555 1234",
    checkIn: "02:00 PM",
    checkOut: "12:00 PM",
    description:
      "Modern Dubai hotel with easy access to major attractions and business districts.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Gym",
      "Room Service",
      "Air Conditioning",
    ],
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Inactive",
  },
];

/* =========================================================
   CONSTANTS
========================================================= */

const emptyForm = {
  name: "",
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
  image: "",
  images: [],
};

const amenitiesList = [
  { label: "Free WiFi", icon: Wifi },
  { label: "Swimming Pool", icon: Waves },
  { label: "Parking", icon: Car },
  { label: "Restaurant", icon: Utensils },
  { label: "Gym", icon: Dumbbell },
  { label: "Spa", icon: Sparkles },
  { label: "Airport Pickup", icon: Plane },
  { label: "Room Service", icon: ConciergeBell },
  { label: "Air Conditioning", icon: Snowflake },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function AdminHotel() {
  const [hotels, setHotels] = useState(initialHotels);

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [propertyFilter, setPropertyFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const [openMenu, setOpenMenu] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [form, setForm] = useState(emptyForm);

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        hotel.name.toLowerCase().includes(searchText) ||
        hotel.city.toLowerCase().includes(searchText) ||
        hotel.state.toLowerCase().includes(searchText) ||
        hotel.country.toLowerCase().includes(searchText) ||
        hotel.address.toLowerCase().includes(searchText);

      const matchesCity =
        cityFilter === "All Cities" || hotel.city === cityFilter;

      const matchesRating =
        ratingFilter === "All Ratings" ||
        hotel.starRating === Number(ratingFilter);

      const matchesProperty =
        propertyFilter === "All Types" ||
        hotel.propertyType === propertyFilter;

      const matchesStatus =
        statusFilter === "All Status" || hotel.status === statusFilter;

      return (
        matchesSearch &&
        matchesCity &&
        matchesRating &&
        matchesProperty &&
        matchesStatus
      );
    });
  }, [
    hotels,
    search,
    cityFilter,
    ratingFilter,
    propertyFilter,
    statusFilter,
  ]);

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

  const totalHotels = hotels.length;
  const activeHotels = hotels.filter(
    (hotel) => hotel.status === "Active"
  ).length;
  const inactiveHotels = hotels.filter(
    (hotel) => hotel.status === "Inactive"
  ).length;

  const citiesCount = new Set(hotels.map((hotel) => hotel.city)).size;

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setSearch("");
    setCityFilter("All Cities");
    setRatingFilter("All Ratings");
    setPropertyFilter("All Types");
    setStatusFilter("All Status");
    setPage(1);

    toast.success("Filters reset successfully");
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     AMENITIES
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
     IMAGE UPLOAD
  ======================================================= */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      image: prev.image || previewUrls[0],
      images: [...prev.images, ...previewUrls],
    }));

    toast.success(
      `${files.length} image${files.length > 1 ? "s" : ""} selected`
    );

    e.target.value = "";
  };

  const removeImage = (index) => {
    setForm((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);

      return {
        ...prev,
        images: updatedImages,
        image: updatedImages[0] || "",
      };
    });

    toast.success("Image removed");
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Hotel name is required");
      return false;
    }

    if (!form.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!form.address.trim()) {
      toast.error("Hotel address is required");
      return false;
    }

    if (!form.rooms || Number(form.rooms) <= 0) {
      toast.error("Please enter valid total rooms");
      return false;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Please enter valid price per night");
      return false;
    }

    return true;
  };

  /* =======================================================
     ADD HOTEL
  ======================================================= */

  const handleAddHotel = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newHotel = {
      ...form,
      id: Date.now(),
      starRating: Number(form.starRating),
      rating: 0,
      reviews: 0,
      rooms: Number(form.rooms),
      price: Number(form.price),
      image:
        form.image ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      images:
        form.images.length > 0
          ? form.images
          : [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
            ],
    };

    setHotels((prev) => [newHotel, ...prev]);

    setShowAddModal(false);
    setForm(emptyForm);
    setPage(1);

    toast.success("Hotel added successfully!");
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditModal = (hotel) => {
    setSelectedHotel(hotel);

    setForm({
      name: hotel.name || "",
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
      amenities: hotel.amenities || [],
      status: hotel.status || "Active",
      image: hotel.image || "",
      images: hotel.images || [],
    });

    setShowEditModal(true);
    setOpenMenu(null);
  };

  /* =======================================================
     UPDATE HOTEL
  ======================================================= */

  const handleUpdateHotel = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === selectedHotel.id
          ? {
              ...hotel,
              ...form,
              starRating: Number(form.starRating),
              rooms: Number(form.rooms),
              price: Number(form.price),
              rating: hotel.rating,
              reviews: hotel.reviews,
            }
          : hotel
      )
    );

    setShowEditModal(false);
    setSelectedHotel(null);
    setForm(emptyForm);

    toast.success("Hotel updated successfully!");
  };

  /* =======================================================
     DETAILS
  ======================================================= */

  const openDetails = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetailsModal(true);
    setOpenMenu(null);
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const openDeleteModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteModal(true);
    setOpenMenu(null);
  };

  const handleDeleteHotel = () => {
    if (!selectedHotel) return;

    setHotels((prev) =>
      prev.filter((hotel) => hotel.id !== selectedHotel.id)
    );

    setShowDeleteModal(false);
    setSelectedHotel(null);

    toast.success("Hotel deleted successfully!");
  };

  /* =======================================================
     TOGGLE STATUS
  ======================================================= */

  const toggleHotelStatus = (hotel) => {
    const newStatus = hotel.status === "Active" ? "Inactive" : "Active";

    setHotels((prev) =>
      prev.map((item) =>
        item.id === hotel.id
          ? { ...item, status: newStatus }
          : item
      )
    );

    setOpenMenu(null);

    toast.success(
      `${hotel.name} is now ${newStatus.toLowerCase()}`
    );
  };

  /* =======================================================
     VIEW ROOMS / BOOKINGS
  ======================================================= */

  const handleViewRooms = (hotel) => {
    setOpenMenu(null);

    toast.success(
      `Opening rooms for ${hotel.name}`
    );
  };

  const handleViewBookings = (hotel) => {
    setOpenMenu(null);

    toast.success(
      `Opening bookings for ${hotel.name}`
    );
  };

  /* =======================================================
     OPEN ADD
  ======================================================= */

  const openAddModal = () => {
    setForm(emptyForm);
    setSelectedHotel(null);
    setShowAddModal(true);
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      onClick={() => setOpenMenu(null)}
    >
      <div className="mx-auto max-w-7xl px-2 py-3 sm:px-2 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hotels
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all hotels listed on Tripora
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add New Hotel
          </button>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-4">
          <StatCard
            title="Total Hotels"
            value={totalHotels.toLocaleString()}
            change="+12.5%"
            icon={Building2}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Active Hotels"
            value={activeHotels.toLocaleString()}
            change="+8.4%"
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Inactive Hotels"
            value={inactiveHotels.toLocaleString()}
            change="-2.1%"
            icon={Ban}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            negative
          />

          <StatCard
            title="Cities"
            value={citiesCount.toLocaleString()}
            change="+6 new"
            icon={MapPin}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>

        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search hotel name, city, location..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <FilterSelect
                label="City"
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  "All Cities",
                  "Mumbai",
                  "New Delhi",
                  "Goa",
                  "Dubai",
                  "Bali",
                  "Jaipur",
                  "Manali",
                ]}
              />

              <FilterSelect
                label="Rating"
                value={ratingFilter}
                onChange={(e) => {
                  setRatingFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  "All Ratings",
                  5,
                  4,
                  3,
                  2,
                ]}
                formatOption={(option) =>
                  option === "All Ratings"
                    ? option
                    : `${option} Star`
                }
              />

              <FilterSelect
                label="Property Type"
                value={propertyFilter}
                onChange={(e) => {
                  setPropertyFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  "All Types",
                  "Hotel",
                  "Resort",
                  "Villa",
                  "Apartment",
                  "Hostel",
                ]}
              />

              <FilterSelect
                label="Status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  "All Status",
                  "Active",
                  "Inactive",
                ]}
              />
            </div>
          )}
        </div>

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredHotels.length}
            </span>{" "}
            hotels
          </p>
        </div>

        {/* =================================================
            DESKTOP TABLE
        ================================================= */}

        <div className="hidden overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Hotel
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Rating
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Rooms
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price / Night
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedHotels.map((hotel) => (
                  <HotelTableRow
                    key={hotel.id}
                    hotel={hotel}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    onView={() => openDetails(hotel)}
                    onEdit={() => openEditModal(hotel)}
                    onRooms={() => handleViewRooms(hotel)}
                    onBookings={() => handleViewBookings(hotel)}
                    onToggle={() => toggleHotelStatus(hotel)}
                    onDelete={() => openDeleteModal(hotel)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {paginatedHotels.length === 0 && (
            <EmptyState onReset={resetFilters} />
          )}
        </div>

        {/* =================================================
            MOBILE CARDS
        ================================================= */}

        <div className="space-y-4 lg:hidden">
          {paginatedHotels.map((hotel) => (
            <HotelMobileCard
              key={hotel.id}
              hotel={hotel}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onView={() => openDetails(hotel)}
              onEdit={() => openEditModal(hotel)}
              onRooms={() => handleViewRooms(hotel)}
              onBookings={() => handleViewBookings(hotel)}
              onToggle={() => toggleHotelStatus(hotel)}
              onDelete={() => openDeleteModal(hotel)}
            />
          ))}

          {paginatedHotels.length === 0 && (
            <EmptyState onReset={resetFilters} />
          )}
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredHotels.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredHotels.length}
            itemsPerPage={itemsPerPage}
            onPrevious={() =>
              setPage((prev) => Math.max(1, prev - 1))
            }
            onNext={() =>
              setPage((prev) =>
                Math.min(totalPages, prev + 1)
              )
            }
            onPageChange={setPage}
          />
        )}
      </div>

      {/* =====================================================
          ADD HOTEL MODAL
      ===================================================== */}

      {showAddModal && (
        <HotelFormModal
          title="Add New Hotel"
          subtitle="Add a new hotel to Tripora"
          form={form}
          setForm={setForm}
          onChange={handleInputChange}
          onSubmit={handleAddHotel}
          onClose={() => {
            setShowAddModal(false);
            setForm(emptyForm);
          }}
          onAmenityToggle={toggleAmenity}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          submitText="Add Hotel"
        />
      )}

      {/* =====================================================
          EDIT HOTEL MODAL
      ===================================================== */}

      {showEditModal && (
        <HotelFormModal
          title="Edit Hotel"
          subtitle="Update hotel information"
          form={form}
          setForm={setForm}
          onChange={handleInputChange}
          onSubmit={handleUpdateHotel}
          onClose={() => {
            setShowEditModal(false);
            setSelectedHotel(null);
            setForm(emptyForm);
          }}
          onAmenityToggle={toggleAmenity}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          submitText="Save Changes"
        />
      )}

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {showDetailsModal && selectedHotel && (
        <HotelDetailsModal
          hotel={selectedHotel}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedHotel(null);
          }}
          onEdit={() => {
            setShowDetailsModal(false);
            openEditModal(selectedHotel);
          }}
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal && selectedHotel && (
        <DeleteModal
          hotel={selectedHotel}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedHotel(null);
          }}
          onDelete={handleDeleteHotel}
        />
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  negative,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>

          <p
            className={`mt-2 text-xs font-semibold ${
              negative ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {change}
            <span className="ml-1 font-normal text-slate-400">
              vs last month
            </span>
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={21} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
  formatOption,
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
      </span>

      <select
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   HOTEL TABLE ROW
========================================================= */

function HotelTableRow({
  hotel,
  openMenu,
  setOpenMenu,
  onView,
  onEdit,
  onRooms,
  onBookings,
  onToggle,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/70">
      {/* Hotel */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-12 w-16 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {hotel.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {hotel.city} • {hotel.propertyType}
            </p>

            <div className="mt-1 flex items-center gap-1">
              {Array.from({
                length: hotel.starRating,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={11}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          </div>
        </div>
      </td>

      {/* Location */}
      <td className="px-5 py-4">
        <div className="flex items-start gap-2">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="text-sm font-medium text-slate-700">
              {hotel.city}
            </p>

            <p className="text-xs text-slate-400">
              {hotel.state}, {hotel.country}
            </p>
          </div>
        </div>
      </td>

      {/* Rating */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <Star
            size={15}
            className="fill-amber-400 text-amber-400"
          />

          <span className="text-sm font-semibold text-slate-700">
            {hotel.rating || "New"}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-slate-400">
          {hotel.reviews.toLocaleString()} reviews
        </p>
      </td>

      {/* Rooms */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <BedDouble size={16} className="text-slate-400" />

          <span className="text-sm font-medium text-slate-700">
            {hotel.rooms}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-slate-400">
          Rooms
        </p>
      </td>

      {/* Price */}
      <td className="px-5 py-4">
        <p className="text-sm font-bold text-slate-900">
          ₹{hotel.price.toLocaleString()}
        </p>

        <p className="text-xs text-slate-400">
          per night
        </p>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={hotel.status} />
      </td>

      {/* Action */}
      <td className="px-5 py-4 text-right">
        <ActionMenu
          hotel={hotel}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onView={onView}
          onEdit={onEdit}
          onRooms={onRooms}
          onBookings={onBookings}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

/* =========================================================
   MOBILE HOTEL CARD
========================================================= */

function HotelMobileCard({
  hotel,
  openMenu,
  setOpenMenu,
  onView,
  onEdit,
  onRooms,
  onBookings,
  onToggle,
  onDelete,
}) {
  return (
    <div className="relative overflow-visible rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-20 w-24 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="line-clamp-1 text-sm font-bold text-slate-900">
                {hotel.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {hotel.city} • {hotel.propertyType}
              </p>
            </div>

            <ActionMenu
              hotel={hotel}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onView={onView}
              onEdit={onEdit}
              onRooms={onRooms}
              onBookings={onBookings}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </div>

          <div className="mt-2 flex items-center gap-1">
            <Star
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-xs font-semibold text-slate-700">
              {hotel.rating}
            </span>

            <span className="text-xs text-slate-400">
              ({hotel.reviews})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
        <div>
          <p className="text-[11px] font-medium text-slate-400">
            Location
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <MapPin
              size={14}
              className="text-slate-400"
            />

            <span className="truncate text-xs font-medium text-slate-700">
              {hotel.city}
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium text-slate-400">
            Rooms
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <BedDouble
              size={14}
              className="text-slate-400"
            />

            <span className="text-xs font-medium text-slate-700">
              {hotel.rooms} Rooms
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium text-slate-400">
            Price / Night
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            ₹{hotel.price.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium text-slate-400">
            Status
          </p>

          <div className="mt-1">
            <StatusBadge status={hotel.status} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onView}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Eye size={16} />
        View Details
      </button>
    </div>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function ActionMenu({
  hotel,
  openMenu,
  setOpenMenu,
  onView,
  onEdit,
  onRooms,
  onBookings,
  onToggle,
  onDelete,
}) {
  const isOpen = openMenu === hotel.id;

  return (
    <div
      className="relative inline-block"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() =>
          setOpenMenu(isOpen ? null : hotel.id)
        }
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[100] mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-left shadow-xl">
          <MenuItem
            icon={Eye}
            label="View Details"
            onClick={onView}
          />

          <MenuItem
            icon={Pencil}
            label="Edit Hotel"
            onClick={onEdit}
          />

          <MenuItem
            icon={BedDouble}
            label="View Rooms"
            onClick={onRooms}
          />

          <MenuItem
            icon={Building2}
            label="View Bookings"
            onClick={onBookings}
          />

          <div className="my-1 border-t border-slate-100" />

          <MenuItem
            icon={
              hotel.status === "Active"
                ? PowerOff
                : Power
            }
            label={
              hotel.status === "Active"
                ? "Deactivate"
                : "Activate"
            }
            onClick={onToggle}
          />

          <MenuItem
            icon={Trash2}
            label="Delete Hotel"
            danger
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MENU ITEM
========================================================= */

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Building2 size={25} className="text-slate-400" />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No hotels found
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Reset Filters
      </button>
    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPrevious,
  onNext,
  onPageChange,
}) {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {start} - {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700">
          {totalItems}
        </span>
      </p>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={onPrevious}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 rounded-lg px-2 text-xs font-semibold transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <span className="text-xs font-medium text-slate-500 sm:hidden">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={onNext}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   HOTEL FORM MODAL
========================================================= */

function HotelFormModal({
  title,
  subtitle,
  form,
  setForm,
  onChange,
  onSubmit,
  onClose,
  onAmenityToggle,
  onImageUpload,
  onRemoveImage,
  submitText,
}) {
  return (
    <Modal onClose={onClose} size="large">
      <div className="flex max-h-[90vh] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="overflow-y-auto px-5 py-5 sm:px-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Enter the main hotel details."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Hotel Name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Enter hotel name"
                required
              />

              <SelectField
                label="Property Type"
                name="propertyType"
                value={form.propertyType}
                onChange={onChange}
                options={[
                  "Hotel",
                  "Resort",
                  "Villa",
                  "Apartment",
                  "Hostel",
                ]}
              />

              <SelectField
                label="Star Rating"
                name="starRating"
                value={form.starRating}
                onChange={onChange}
                options={["2", "3", "4", "5"]}
                formatOption={(item) => `${item} Star`}
              />

              <InputField
                label="Hotel Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="hotel@example.com"
              />

              <InputField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </FormSection>

          {/* Location */}
          <FormSection
            title="Location & Address"
            description="Add the complete hotel location."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="City"
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="Enter city"
                required
              />

              <InputField
                label="State"
                name="state"
                value={form.state}
                onChange={onChange}
                placeholder="Enter state"
              />

              <InputField
                label="Country"
                name="country"
                value={form.country}
                onChange={onChange}
                placeholder="Enter country"
              />

              <InputField
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={onChange}
                placeholder="Enter pincode"
              />

              <div className="md:col-span-2">
                <InputField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  placeholder="Enter complete hotel address"
                  required
                />
              </div>
            </div>
          </FormSection>

          {/* Hotel Details */}
          <FormSection
            title="Hotel Details"
            description="Configure rooms, price and timings."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Total Rooms"
                name="rooms"
                type="number"
                value={form.rooms}
                onChange={onChange}
                placeholder="e.g. 100"
                required
              />

              <InputField
                label="Price Per Night"
                name="price"
                type="number"
                value={form.price}
                onChange={onChange}
                placeholder="e.g. 8999"
                required
              />

              <InputField
                label="Check-in Time"
                name="checkIn"
                value={form.checkIn}
                onChange={onChange}
                placeholder="02:00 PM"
              />

              <InputField
                label="Check-out Time"
                name="checkOut"
                value={form.checkOut}
                onChange={onChange}
                placeholder="12:00 PM"
              />

              <div className="md:col-span-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Description
                  </span>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={4}
                    placeholder="Write a short description about this hotel..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>
            </div>
          </FormSection>

          {/* Amenities */}
          <FormSection
            title="Amenities"
            description="Select amenities available at this property."
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {amenitiesList.map((amenity) => {
                const Icon = amenity.icon;

                const checked = form.amenities.includes(
                  amenity.label
                );

                return (
                  <button
                    type="button"
                    key={amenity.label}
                    onClick={() =>
                      onAmenityToggle(amenity.label)
                    }
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      checked
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        checked
                          ? "bg-blue-100"
                          : "bg-slate-100"
                      }`}
                    >
                      <Icon size={16} />
                    </div>

                    <span className="text-xs font-semibold">
                      {amenity.label}
                    </span>

                    <span
                      className={`ml-auto flex h-4 w-4 items-center justify-center rounded border ${
                        checked
                          ? "border-blue-600 bg-blue-600"
                          : "border-slate-300"
                      }`}
                    >
                      {checked && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </FormSection>

          {/* Images */}
          <FormSection
            title="Hotel Images"
            description="Upload hotel images for the property."
          >
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center">
              <input
                id="hotel-images"
                type="file"
                accept="image/*"
                multiple
                onChange={onImageUpload}
                className="hidden"
              />

              <label
                htmlFor="hotel-images"
                className="mx-auto flex max-w-xs cursor-pointer flex-col items-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ImagePlus size={21} />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Upload hotel images
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or WEBP
                </p>

                <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm">
                  <Upload size={14} />
                  Choose Images
                </span>
              </label>
            </div>

            {form.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {form.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-slate-200"
                  >
                    <img
                      src={image}
                      alt={`Hotel ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => onRemoveImage(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-red-600 opacity-0 shadow-sm transition group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>

                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                        Main Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </FormSection>

          {/* Status */}
          <FormSection
            title="Status"
            description="Choose whether this hotel is available for customers."
          >
            <div className="grid grid-cols-2 gap-3">
              {["Active", "Inactive"].map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      status,
                    }))
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    form.status === status
                      ? status === "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </FormSection>

          {/* Buttons */}
          <div className="sticky bottom-0 -mx-5 mt-5 flex gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:-mx-6 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  formatOption,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function HotelDetailsModal({
  hotel,
  onClose,
  onEdit,
}) {
  return (
    <Modal onClose={onClose} size="large">
      <div className="max-h-[90vh] overflow-y-auto">
        {/* Hero */}
        <div className="relative">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-56 w-full object-cover sm:h-64"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-xl bg-black/50 p-4 backdrop-blur-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {hotel.name}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                    <MapPin size={13} />
                    {hotel.city}, {hotel.country}
                  </div>
                </div>

                <StatusBadge status={hotel.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-2">
              <Star
                size={16}
                className="fill-amber-400 text-amber-400"
              />

              <span className="text-sm font-bold text-amber-700">
                {hotel.rating || "New"}
              </span>
            </div>

            <span className="text-sm text-slate-500">
              {hotel.reviews.toLocaleString()} reviews
            </span>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
              {hotel.propertyType}
            </span>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
              {hotel.starRating} Star
            </span>
          </div>

          {/* Main Info */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <DetailBox
              icon={BedDouble}
              label="Total Rooms"
              value={hotel.rooms}
            />

            <DetailBox
              icon={Building2}
              label="Property Type"
              value={hotel.propertyType}
            />

            <DetailBox
              icon={Clock3}
              label="Check-in"
              value={hotel.checkIn}
            />

            <DetailBox
              icon={Clock3}
              label="Check-out"
              value={hotel.checkOut}
            />
          </div>

          {/* Price */}
          <div className="mt-4 rounded-2xl bg-blue-50 p-4">
            <p className="text-xs font-medium text-blue-600">
              Starting price
            </p>

            <div className="mt-1 flex items-end gap-1">
              <span className="text-2xl font-bold text-slate-900">
                ₹{hotel.price.toLocaleString()}
              </span>

              <span className="pb-1 text-xs text-slate-500">
                / night
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">
              Location
            </h3>

            <div className="mt-3 rounded-xl border border-slate-200 p-4">
              <div className="flex gap-3">
                <MapPinned
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {hotel.address}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {hotel.city}, {hotel.state},{" "}
                    {hotel.country} - {hotel.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">
                    Email
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    {hotel.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Phone size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">
                    Phone
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    {hotel.phone || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">
              Description
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {hotel.description || "No description available."}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">
              Amenities
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {hotel.amenities.length > 0 ? (
                hotel.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600"
                  >
                    {amenity}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No amenities added.
                </p>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">
              Image Gallery
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hotel.images?.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  className="h-32 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={onEdit}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit Hotel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <Icon size={17} className="text-slate-400" />

      <p className="mt-2 text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 truncate text-sm font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  hotel,
  onClose,
  onDelete,
}) {
  return (
    <Modal onClose={onClose} size="small">
      <div className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 size={22} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Delete Hotel?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">
            {hotel.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete Hotel
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   GENERIC MODAL
========================================================= */

function Modal({
  children,
  onClose,
  size = "medium",
}) {
  const sizeClass =
    size === "large"
      ? "max-w-4xl"
      : size === "small"
      ? "max-w-md"
      : "max-w-2xl";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-5">
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminHotel;