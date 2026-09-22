
import { useMemo, useState } from "react";

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
} from "lucide-react";

import toast from "react-hot-toast";

const packagesData = [
    {
        id: 1,
        name: "Dubai Explorer",
        destination: "Dubai",
        country: "UAE",
        type: "International",
        duration: "5 Days / 4 Nights",
        days: 5,
        nights: 4,
        rating: 4.8,
        reviews: 124,
        price: 45999,
        oldPrice: 52999,
        bookings: 248,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        description:
            "Explore the modern wonders of Dubai with luxury stays, desert adventures and unforgettable city experiences.",
        highlights: [
            "Burj Khalifa",
            "Desert Safari",
            "Dubai Marina",
            "Dubai Mall",
            "Dhow Cruise",
        ],
        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Desert Safari",
            "City Tour",
        ],
        exclusions: [
            "International Flights",
            "Personal Expenses",
            "Travel Insurance",
        ],
    },
    {
        id: 2,
        name: "Bali Paradise",
        destination: "Bali",
        country: "Indonesia",
        type: "Honeymoon",
        duration: "7 Days / 6 Nights",
        days: 7,
        nights: 6,
        rating: 4.9,
        reviews: 186,
        price: 38999,
        oldPrice: 45999,
        bookings: 312,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
        description:
            "Enjoy a romantic Bali holiday with beautiful beaches, temples, waterfalls and private experiences.",
        highlights: [
            "Ubud",
            "Kuta Beach",
            "Tanah Lot",
            "Waterfalls",
            "Private Dinner",
        ],
        inclusions: [
            "6 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Sightseeing",
            "Private Cab",
        ],
        exclusions: [
            "International Flights",
            "Visa Fees",
            "Personal Expenses",
        ],
    },
    {
        id: 3,
        name: "Thailand Adventure",
        destination: "Thailand",
        country: "Thailand",
        type: "Adventure",
        duration: "7 Days / 6 Nights",
        days: 7,
        nights: 6,
        rating: 4.7,
        reviews: 98,
        price: 42999,
        oldPrice: 49999,
        bookings: 176,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
        description:
            "Discover Thailand with exciting island tours, adventure activities, nightlife and cultural experiences.",
        highlights: [
            "Bangkok",
            "Phuket",
            "Phi Phi Island",
            "Island Tour",
            "Night Market",
        ],
        inclusions: [
            "6 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Island Tour",
            "Local Transfers",
        ],
        exclusions: [
            "Flights",
            "Visa",
            "Personal Expenses",
        ],
    },
    {
        id: 4,
        name: "Manali Escape",
        destination: "Manali",
        country: "India",
        type: "Domestic",
        duration: "5 Days / 4 Nights",
        days: 5,
        nights: 4,
        rating: 4.6,
        reviews: 142,
        price: 17999,
        oldPrice: 21999,
        bookings: 284,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
        description:
            "Experience the beauty of the Himalayas with scenic valleys, snow-covered mountains and local sightseeing.",
        highlights: [
            "Solang Valley",
            "Rohtang Pass",
            "Mall Road",
            "Hadimba Temple",
            "River Rafting",
        ],
        inclusions: [
            "4 Nights Hotel Stay",
            "Breakfast & Dinner",
            "Private Transfers",
            "Sightseeing",
        ],
        exclusions: [
            "Travel Tickets",
            "Adventure Activities",
            "Personal Expenses",
        ],
    },
    {
        id: 5,
        name: "Goa Beach Holiday",
        destination: "Goa",
        country: "India",
        type: "Family",
        duration: "4 Days / 3 Nights",
        days: 4,
        nights: 3,
        rating: 4.5,
        reviews: 215,
        price: 14999,
        oldPrice: 18999,
        bookings: 365,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        description:
            "Relax on the beautiful beaches of Goa with comfortable stays, sightseeing and exciting local experiences.",
        highlights: [
            "Baga Beach",
            "Calangute",
            "Fort Aguada",
            "Beach Sunset",
            "North Goa",
        ],
        inclusions: [
            "3 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Sightseeing",
        ],
        exclusions: [
            "Travel Tickets",
            "Water Sports",
            "Personal Expenses",
        ],
    },
    {
        id: 6,
        name: "Singapore City Escape",
        destination: "Singapore",
        country: "Singapore",
        type: "International",
        duration: "5 Days / 4 Nights",
        days: 5,
        nights: 4,
        rating: 4.8,
        reviews: 109,
        price: 54999,
        oldPrice: 62999,
        bookings: 192,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
        description:
            "Discover Singapore's iconic attractions, futuristic architecture, shopping streets and family-friendly experiences.",
        highlights: [
            "Marina Bay",
            "Gardens by the Bay",
            "Sentosa",
            "Universal Studios",
            "Night Safari",
        ],
        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "City Tour",
            "Sentosa Tour",
        ],
        exclusions: [
            "Flights",
            "Visa Fees",
            "Personal Expenses",
        ],
    },
    {
        id: 7,
        name: "Paris Romantic Getaway",
        destination: "Paris",
        country: "France",
        type: "Honeymoon",
        duration: "7 Days / 6 Nights",
        days: 7,
        nights: 6,
        rating: 4.9,
        reviews: 87,
        price: 89999,
        oldPrice: 99999,
        bookings: 126,
        status: "Inactive",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
        description:
            "Enjoy a romantic European escape with iconic Paris attractions, beautiful streets and unforgettable dining.",
        highlights: [
            "Eiffel Tower",
            "Louvre Museum",
            "Seine Cruise",
            "Montmartre",
            "Versailles",
        ],
        inclusions: [
            "6 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "City Tour",
            "Seine Cruise",
        ],
        exclusions: [
            "International Flights",
            "Visa",
            "Travel Insurance",
        ],
    },
    {
        id: 8,
        name: "Kerala Backwaters",
        destination: "Kerala",
        country: "India",
        type: "Family",
        duration: "5 Days / 4 Nights",
        days: 5,
        nights: 4,
        rating: 4.7,
        reviews: 132,
        price: 22999,
        oldPrice: 27999,
        bookings: 218,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        description:
            "Explore Kerala's peaceful backwaters, lush greenery, hill stations and traditional culture.",
        highlights: [
            "Alleppey",
            "Munnar",
            "Houseboat",
            "Thekkady",
            "Tea Gardens",
        ],
        inclusions: [
            "4 Nights Stay",
            "Breakfast",
            "Houseboat Experience",
            "Private Transfers",
            "Sightseeing",
        ],
        exclusions: [
            "Travel Tickets",
            "Personal Expenses",
            "Optional Activities",
        ],
    },
    {
        id: 9,
        name: "Maldives Luxury Retreat",
        destination: "Maldives",
        country: "Maldives",
        type: "Luxury",
        duration: "5 Days / 4 Nights",
        days: 5,
        nights: 4,
        rating: 4.9,
        reviews: 76,
        price: 74999,
        oldPrice: 84999,
        bookings: 98,
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
        description:
            "Stay in a luxury island resort surrounded by crystal-clear water, white beaches and tropical beauty.",
        highlights: [
            "Water Villa",
            "Private Beach",
            "Snorkeling",
            "Sunset Cruise",
            "Spa",
        ],
        inclusions: [
            "4 Nights Resort Stay",
            "Breakfast & Dinner",
            "Airport Transfers",
            "Island Activities",
        ],
        exclusions: [
            "International Flights",
            "Travel Insurance",
            "Personal Expenses",
        ],
    },
    {
        id: 10,
        name: "Rajasthan Heritage Tour",
        destination: "Rajasthan",
        country: "India",
        type: "Domestic",
        duration: "8 Days / 7 Nights",
        days: 8,
        nights: 7,
        rating: 4.6,
        reviews: 91,
        price: 29999,
        oldPrice: 34999,
        bookings: 154,
        status: "Inactive",
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
        description:
            "Discover Rajasthan's royal heritage, magnificent forts, colorful markets and traditional culture.",
        highlights: [
            "Jaipur",
            "Udaipur",
            "Jodhpur",
            "Jaisalmer",
            "Forts & Palaces",
        ],
        inclusions: [
            "7 Nights Hotel Stay",
            "Breakfast",
            "Private Transfers",
            "Sightseeing",
            "Local Guide",
        ],
        exclusions: [
            "Travel Tickets",
            "Personal Expenses",
            "Monument Fees",
        ],
    },
];

const emptyForm = {
    name: "",
    destination: "",
    country: "",
    type: "Domestic",
    days: 5,
    nights: 4,
    price: "",
    oldPrice: "",
    image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "",
    highlights: "",
    inclusions: "",
    exclusions: "",
};

const AdminPackages = () => {
    const [packages, setPackages] = useState(packagesData);

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

    /* ---------------- FILTER ---------------- */

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

    /* ---------------- STATS ---------------- */

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

    /* ---------------- FILTER ACTIONS ---------------- */

    const handleResetFilters = () => {
        setSearch("");
        setDestination("All Destination");
        setPackageType("All Types");
        setDuration("All Durations");
        setStatus("All Status");
    };

    /* ---------------- VIEW ---------------- */

    const handleViewPackage = (pkg) => {
        setOpenMenuId(null);
        setSelectedPackage(pkg);
    };

    /* ---------------- STATUS ---------------- */

    const handleToggleStatus = (id) => {
        const packageItem = packages.find(
            (pkg) => pkg.id === id
        );

        if (!packageItem) return;

        const newStatus =
            packageItem.status === "Active"
                ? "Inactive"
                : "Active";

        setPackages((prev) =>
            prev.map((pkg) =>
                pkg.id === id
                    ? {
                          ...pkg,
                          status: newStatus,
                      }
                    : pkg
            )
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

        toast.success(
            `${packageItem.name} ${
                newStatus === "Active"
                    ? "activated"
                    : "deactivated"
            }`
        );
    };

    /* ---------------- DELETE ---------------- */

    const handleDeletePackage = (id) => {
        const packageItem = packages.find(
            (pkg) => pkg.id === id
        );

        if (!packageItem) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete "${packageItem.name}"?`
        );

        if (!confirmed) return;

        setPackages((prev) =>
            prev.filter((pkg) => pkg.id !== id)
        );

        if (selectedPackage?.id === id) {
            setSelectedPackage(null);
        }

        setOpenMenuId(null);

        toast.success(
            "Package deleted successfully"
        );
    };

    /* ---------------- DUPLICATE ---------------- */

    const handleDuplicatePackage = (id) => {
        const packageItem = packages.find(
            (pkg) => pkg.id === id
        );

        if (!packageItem) return;

        const duplicate = {
            ...packageItem,
            id: Date.now(),
            name: `${packageItem.name} Copy`,
            status: "Inactive",
            bookings: 0,
            reviews: 0,
        };

        setPackages((prev) => [
            duplicate,
            ...prev,
        ]);

        setOpenMenuId(null);

        toast.success(
            "Package duplicated successfully"
        );
    };

    /* ---------------- ADD ---------------- */

    const openAddModal = () => {
        setEditingPackage(null);
        setFormData({
            ...emptyForm,
        });
        setIsAddModalOpen(true);
    };

    /* ---------------- EDIT ---------------- */

    const openEditModal = (pkg) => {
        setSelectedPackage(null);
        setOpenMenuId(null);

        setEditingPackage(pkg);

        setFormData({
            name: pkg.name,
            destination: pkg.destination,
            country: pkg.country,
            type: pkg.type,
            days: pkg.days,
            nights: pkg.nights,
            price: pkg.price,
            oldPrice: pkg.oldPrice,
            image: pkg.image,
            description: pkg.description,
            highlights: pkg.highlights.join(
                ", "
            ),
            inclusions: pkg.inclusions.join(
                ", "
            ),
            exclusions: pkg.exclusions.join(
                ", "
            ),
        });
    };

    /* ---------------- CLOSE FORM ---------------- */

    const closeFormModal = () => {
        setIsAddModalOpen(false);
        setEditingPackage(null);
        setFormData({
            ...emptyForm,
        });
    };

    /* ---------------- FORM CHANGE ---------------- */

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ---------------- SAVE ---------------- */

    const handleSavePackage = (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.destination.trim() ||
            !formData.country.trim() ||
            !formData.price
        ) {
            toast.error(
                "Please fill all required fields"
            );
            return;
        }

        const days = Number(formData.days);
        const nights = Number(formData.nights);
        const price = Number(formData.price);

        const oldPrice = Number(
            formData.oldPrice || formData.price
        );

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

        if (editingPackage) {
            const updatedPackage = {
                ...editingPackage,
                name: formData.name.trim(),
                destination:
                    formData.destination.trim(),
                country:
                    formData.country.trim(),
                type: formData.type,
                duration: `${days} Days / ${nights} Nights`,
                days,
                nights,
                price,
                oldPrice,
                image:
                    formData.image.trim() ||
                    emptyForm.image,
                description:
                    formData.description.trim() ||
                    "A wonderful travel experience awaits you.",
                highlights,
                inclusions,
                exclusions,
            };

            setPackages((prev) =>
                prev.map((pkg) =>
                    pkg.id === editingPackage.id
                        ? updatedPackage
                        : pkg
                )
            );

            toast.success(
                "Package updated successfully"
            );
        } else {
            const newPackage = {
                id: Date.now(),
                name: formData.name.trim(),
                destination:
                    formData.destination.trim(),
                country:
                    formData.country.trim(),
                type: formData.type,
                duration: `${days} Days / ${nights} Nights`,
                days,
                nights,
                rating: 5,
                reviews: 0,
                price,
                oldPrice,
                bookings: 0,
                status: "Active",
                image:
                    formData.image.trim() ||
                    emptyForm.image,
                description:
                    formData.description.trim() ||
                    "A wonderful travel experience awaits you.",
                highlights,
                inclusions,
                exclusions,
            };

            setPackages((prev) => [
                newPackage,
                ...prev,
            ]);

            toast.success(
                "Package added successfully"
            );
        }

        closeFormModal();
    };

    return (
        <div
            className="min-h-screen bg-slate-50 p-2 sm:p-2 lg:p-4"
            onClick={() => setOpenMenuId(null)}
        >
            {/* ================= HEADER ================= */}

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

            {/* ================= STATS ================= */}

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

            {/* ================= FILTERS ================= */}

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
                            setDestination(
                                e.target.value
                            )
                        }
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option>
                            All Destination
                        </option>
                        <option>Dubai</option>
                        <option>Bali</option>
                        <option>Thailand</option>
                        <option>Manali</option>
                        <option>Goa</option>
                        <option>Singapore</option>
                        <option>Paris</option>
                        <option>Kerala</option>
                        <option>Maldives</option>
                        <option>Rajasthan</option>
                    </select>

                    <select
                        value={packageType}
                        onChange={(e) =>
                            setPackageType(
                                e.target.value
                            )
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
                            setDuration(
                                e.target.value
                            )
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
                            setStatus(
                                e.target.value
                            )
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
                        onClick={
                            handleResetFilters
                        }
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                        <RotateCcw size={16} />
                        Reset Filters
                    </button>

                    {filteredPackages.length !==
                        totalPackages && (
                        <button
                            onClick={
                                handleResetFilters
                            }
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

            {/* ================= CARDS ================= */}

            {filteredPackages.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {filteredPackages.map(
                        (pkg) => (
                            <div
                                key={pkg.id}
                                className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* IMAGE */}

                                <div className="relative h-48 w-full">

                                    <img
                                        src={
                                            pkg.image
                                        }
                                        alt={
                                            pkg.name
                                        }
                                        className="h-full w-full rounded-t-2xl object-cover"
                                    />

                                    <span
                                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                            pkg.status ===
                                            "Active"
                                                ? "bg-emerald-500"
                                                : "bg-slate-600"
                                        }`}
                                    >
                                        {
                                            pkg.status
                                        }
                                    </span>

                                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                                        {
                                            pkg.type
                                        }
                                    </span>

                                    {/* MORE */}

                                    <div
                                        className="absolute right-3 top-3"
                                        onClick={(
                                            e
                                        ) =>
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
                                                size={
                                                    18
                                                }
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
                                                    <Eye
                                                        size={
                                                            16
                                                        }
                                                    />
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
                                                    <Edit
                                                        size={
                                                            16
                                                        }
                                                    />
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
                                                    <Copy
                                                        size={
                                                            16
                                                        }
                                                    />
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
                                                    <Power
                                                        size={
                                                            16
                                                        }
                                                    />

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
                                                    <Trash2
                                                        size={
                                                            16
                                                        }
                                                    />
                                                    Delete
                                                </button>

                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CONTENT */}

                                <div className="p-5">

                                    <h2 className="text-lg font-bold text-slate-900">
                                        {
                                            pkg.name
                                        }
                                    </h2>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin
                                            size={
                                                16
                                            }
                                        />

                                        <span>
                                            {
                                                pkg.destination
                                            }
                                            ,{" "}
                                            {
                                                pkg.country
                                            }
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                        <CalendarDays
                                            size={
                                                16
                                            }
                                        />

                                        <span>
                                            {
                                                pkg.duration
                                            }
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">

                                        <Star
                                            size={
                                                16
                                            }
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                        <span className="text-sm font-semibold text-slate-900">
                                            {
                                                pkg.rating
                                            }
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            (
                                            {
                                                pkg.reviews
                                            }{" "}
                                            reviews)
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

                                            <span className="text-sm text-slate-400 line-through">
                                                ₹
                                                {pkg.oldPrice.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Per person
                                        </p>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-sm text-slate-500">
                                            {
                                                pkg.bookings
                                            }{" "}
                                            bookings
                                        </span>

                                        <span className="text-sm font-medium text-slate-500">
                                            Popular Package
                                        </span>

                                    </div>

                                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                                        {
                                            pkg.description
                                        }
                                    </p>

                                    <div className="mt-4">
                                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                            {
                                                pkg.type
                                            }
                                        </span>
                                    </div>

                                    {/* HIGHLIGHTS */}

                                    <div className="mt-4">

                                        <p className="text-sm font-semibold text-slate-900">
                                            Highlights
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-2">

                                            {pkg.highlights
                                                .slice(
                                                    0,
                                                    3
                                                )
                                                .map(
                                                    (
                                                        highlight,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={
                                                                index
                                                            }
                                                            className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                                                        >
                                                            {
                                                                highlight
                                                            }
                                                        </span>
                                                    )
                                                )}

                                        </div>

                                        {pkg
                                            .highlights
                                            .length >
                                            3 && (
                                            <p className="mt-2 text-xs font-medium text-blue-600">
                                                +
                                                {pkg
                                                    .highlights
                                                    .length -
                                                    3}{" "}
                                                more
                                            </p>
                                        )}

                                    </div>

                                    {/* VIEW DETAILS */}

                                    <button
                                        onClick={() =>
                                            handleViewPackage(
                                                pkg
                                            )
                                        }
                                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        <Eye
                                            size={
                                                17
                                            }
                                        />
                                        View Package Details
                                    </button>

                                    {/* ACTIONS */}

                                    <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

                                        <button
                                            onClick={() =>
                                                handleViewPackage(
                                                    pkg
                                                )
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <Eye
                                                size={
                                                    16
                                                }
                                            />
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                openEditModal(
                                                    pkg
                                                )
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <Edit
                                                size={
                                                    16
                                                }
                                            />
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
                                            <Power
                                                size={
                                                    16
                                                }
                                            />
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
                                            <Copy
                                                size={
                                                    16
                                                }
                                            />
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
                                            <Trash2
                                                size={
                                                    16
                                                }
                                            />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )
                    )}

                </div>
            ) : (
                /* EMPTY STATE */

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
                        Try changing your search or
                        filter options.
                    </p>

                    <button
                        onClick={
                            handleResetFilters
                        }
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <RotateCcw
                            size={16}
                        />
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
                        <div className="relative">

                            <img
                                src={
                                    selectedPackage.image
                                }
                                alt={
                                    selectedPackage.name
                                }
                                className="h-56 w-full object-cover"
                            />

                            <button
                                onClick={() =>
                                    setSelectedPackage(
                                        null
                                    )
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
                                        {
                                            selectedPackage.name
                                        }
                                    </h2>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin
                                            size={
                                                16
                                            }
                                        />

                                        {
                                            selectedPackage.destination
                                        }
                                        ,{" "}
                                        {
                                            selectedPackage.country
                                        }
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
                                        {
                                            selectedPackage.status
                                        }
                                    </span>

                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                        {
                                            selectedPackage.type
                                        }
                                    </span>

                                </div>

                            </div>

                            {/* INFO */}

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Duration
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {
                                            selectedPackage.duration
                                        }
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Rating
                                    </p>

                                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-900">

                                        <Star
                                            size={
                                                14
                                            }
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                        {
                                            selectedPackage.rating
                                        }

                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Bookings
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {
                                            selectedPackage.bookings
                                        }
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Reviews
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {
                                            selectedPackage.reviews
                                        }
                                    </p>
                                </div>

                            </div>

                            {/* DESCRIPTION */}

                            <div className="mt-6">

                                <h3 className="text-base font-bold text-slate-900">
                                    Description
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {
                                        selectedPackage.description
                                    }
                                </p>

                            </div>

                            {/* HIGHLIGHTS */}

                            <div className="mt-6">

                                <h3 className="text-base font-bold text-slate-900">
                                    Highlights
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    {selectedPackage.highlights.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <span
                                                key={
                                                    index
                                                }
                                                className="rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
                                            >
                                                {
                                                    item
                                                }
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* INCLUSIONS */}

                            <div className="mt-6">

                                <h3 className="text-base font-bold text-slate-900">
                                    Inclusions
                                </h3>

                                <ul className="mt-3 space-y-2">

                                    {selectedPackage.inclusions.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <li
                                                key={
                                                    index
                                                }
                                                className="text-sm text-slate-600"
                                            >
                                                <span className="mr-2 font-semibold text-emerald-500">
                                                    ✓
                                                </span>

                                                {
                                                    item
                                                }
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>

                            {/* EXCLUSIONS */}

                            <div className="mt-6">

                                <h3 className="text-base font-bold text-slate-900">
                                    Exclusions
                                </h3>

                                <ul className="mt-3 space-y-2">

                                    {selectedPackage.exclusions.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <li
                                                key={
                                                    index
                                                }
                                                className="text-sm text-slate-600"
                                            >
                                                <span className="mr-2 font-semibold text-red-500">
                                                    •
                                                </span>

                                                {
                                                    item
                                                }
                                            </li>
                                        )
                                    )}

                                </ul>

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

                                        <p className="text-sm text-slate-400 line-through">
                                            ₹
                                            {selectedPackage.oldPrice.toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>

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
                                        <Edit
                                            size={
                                                16
                                            }
                                        />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            setSelectedPackage(
                                                null
                                            )
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
                    onClick={
                        closeFormModal
                    }
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
                                onClick={
                                    closeFormModal
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={
                                handleSavePackage
                            }
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
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Enter package name"
                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                {/* DESTINATION */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Destination *
                                    </label>

                                    <input
                                        name="destination"
                                        value={
                                            formData.destination
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Dubai"
                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

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
                                        onChange={
                                            handleFormChange
                                        }
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
                                        value={
                                            formData.type
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                        value={
                                            formData.days
                                        }
                                        onChange={
                                            handleFormChange
                                        }
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
                                        value={
                                            formData.nights
                                        }
                                        onChange={
                                            handleFormChange
                                        }
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
                                        value={
                                            formData.price
                                        }
                                        onChange={
                                            handleFormChange
                                        }
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
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="52999"
                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                {/* IMAGE */}

                                <div className="sm:col-span-2">

                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Image URL
                                    </label>

                                    <input
                                        name="image"
                                        value={
                                            formData.image
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="https://..."
                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

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
                                        onChange={
                                            handleFormChange
                                        }
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
                                        onChange={
                                            handleFormChange
                                        }
                                        rows="3"
                                        placeholder="Burj Khalifa, Desert Safari, Dubai Mall"
                                        className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <p className="mt-1 text-xs text-slate-400">
                                        Separate items with
                                        commas.
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
                                        onChange={
                                            handleFormChange
                                        }
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
                                        onChange={
                                            handleFormChange
                                        }
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
                                    onClick={
                                        closeFormModal
                                    }
                                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    {editingPackage ? (
                                        <>
                                            <Edit
                                                size={
                                                    16
                                                }
                                            />
                                            Update Package
                                        </>
                                    ) : (
                                        <>
                                            <Plus
                                                size={
                                                    16
                                                }
                                            />
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


