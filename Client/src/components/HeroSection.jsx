import React, { useState } from "react";
import {
    Plane,
    Hotel,
    TrainFront,
    BusFront,
    CarFront,
    BriefcaseBusiness,
    CalendarDays,
    Users,
    Search,
    ShieldCheck,
    Headphones,
    BadgeIndianRupee,
    MapPin,
    ChevronDown,
    ArrowRightLeft,
} from "lucide-react";

const HeroSection = () => {
    const [activeTab, setActiveTab] = useState("flights");

    // =====================================================
    // TRAVELLERS STATE
    // =====================================================

    const [travellers, setTravellers] = useState({
        adults: 1,
        children: 0,
    });

    const [isTravellerOpen, setIsTravellerOpen] = useState(false);

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        from: "",
        to: "",
        destination: "",
        departure: "",
        returnDate: "",
        checkIn: "",
        checkOut: "",
        travellers: "1 Adult",
        guests: "2 Guests",
    });

    // =====================================================
    // TRAVELLER DISPLAY TEXT
    // =====================================================

    const travellerText = `${travellers.adults} Adult${travellers.adults > 1 ? "s" : ""
        }${travellers.children > 0
            ? `, ${travellers.children} Child${travellers.children > 1 ? "ren" : ""
            }`
            : ""
        }`;

    // =====================================================
    // UPDATE TRAVELLER DATA
    // =====================================================

    const updateTravellerData = (newTravellers) => {
        setTravellers(newTravellers);

        const adultText = `${newTravellers.adults} Adult${newTravellers.adults > 1 ? "s" : ""
            }`;

        const childText =
            newTravellers.children > 0
                ? `, ${newTravellers.children} Child${newTravellers.children > 1 ? "ren" : ""
                }`
                : "";

        setFormData((prev) => ({
            ...prev,
            travellers: `${adultText}${childText}`,
        }));
    };

    // =====================================================
    // ADULT +
    // =====================================================

    const increaseAdult = () => {
        const newTravellers = {
            ...travellers,
            adults: travellers.adults + 1,
        };

        updateTravellerData(newTravellers);
    };

    // =====================================================
    // ADULT -
    // Minimum 1 Adult
    // =====================================================

    const decreaseAdult = () => {
        const newTravellers = {
            ...travellers,
            adults: Math.max(1, travellers.adults - 1),
        };

        updateTravellerData(newTravellers);
    };

    // =====================================================
    // CHILD +
    // =====================================================

    const increaseChild = () => {
        const newTravellers = {
            ...travellers,
            children: travellers.children + 1,
        };

        updateTravellerData(newTravellers);
    };

    // =====================================================
    // CHILD -
    // =====================================================

    const decreaseChild = () => {
        const newTravellers = {
            ...travellers,
            children: Math.max(0, travellers.children - 1),
        };

        updateTravellerData(newTravellers);
    };

    // =====================================================
    // TABS
    // =====================================================

    const tabs = [
        {
            id: "flights",
            label: "Flights",
            icon: Plane,
        },
        {
            id: "hotels",
            label: "Hotels",
            icon: Hotel,
        },
        {
            id: "trains",
            label: "Trains",
            icon: TrainFront,
        },
        {
            id: "buses",
            label: "Buses",
            icon: BusFront,
        },
    ];

    // =====================================================
    // QUICK LINKS
    // =====================================================

    const quickLinks = [
        {
            title: "Flights",
            subtitle: "Book flights",
            icon: Plane,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            path: "/flights",
        },
        {
            title: "Hotels",
            subtitle: "Find your stay",
            icon: Hotel,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            path: "/hotels",
        },
        {
            title: "Trains",
            subtitle: "Book train tickets",
            icon: TrainFront,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            path: "/trains",
        },
        {
            title: "Buses",
            subtitle: "Travel by bus",
            icon: BusFront,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            path: "/buses",
        },
        {
            title: "Cabs",
            subtitle: "Book a cab",
            icon: CarFront,
            iconBg: "bg-pink-50",
            iconColor: "text-pink-600",
            path: "/cabs",
        },
        {
            title: "Packages",
            subtitle: "Plan your holiday",
            icon: BriefcaseBusiness,
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
            path: "/packages",
        },
    ];

    // =====================================================
    // HANDLE FORM CHANGE
    // =====================================================

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // =====================================================
    // SWAP LOCATIONS
    // =====================================================

    const handleSwapLocations = () => {
        setFormData((prev) => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = (e) => {
        e.preventDefault();

        console.log("Search Type:", activeTab);
        console.log("Search Data:", formData);
        console.log("Travellers:", travellers);
    };

    // =====================================================
    // INPUT CLASS
    // =====================================================

    const inputClass =
        "h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10";

    return (
        <section className="relative overflow-hidden bg-slate-950">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="absolute inset-0">

                <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=85"
                    alt="Beautiful travel destination"
                    className="h-full w-full object-cover"
                />

                {/* Main Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-slate-900/20" />

                {/* Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/80 to-transparent" />

            </div>

            {/* =====================================================
                HERO CONTENT
            ===================================================== */}

            <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-6 lg:px-8 lg:pb-20 lg:pt-6">

                {/* =================================================
                    HERO TEXT
                ================================================= */}

                <div className="max-w-xl">

                    {/* Badge */}

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">

                        <Plane
                            size={15}
                            className="-rotate-12 text-blue-300"
                        />

                        <span>
                            Your journey starts here
                        </span>

                    </div>

                    {/* Heading */}

                    <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[38px] lg:text-[42px]">

                        Explore the World.
                        <br />

                        <span className="text-blue-400">
                            Your Way.
                        </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-3 max-w-lg text-[13px] leading-5 text-white/75 sm:text-sm">
                        Discover flights, hotels, trains, buses and holiday
                        packages — all in one place.
                    </p>

                    {/* Trust Points */}

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">

                        <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">

                            <BadgeIndianRupee
                                size={15}
                                className="text-blue-300"
                            />

                            Best Prices

                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">

                            <ShieldCheck
                                size={15}
                                className="text-blue-300"
                            />

                            Secure Booking

                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">

                            <Headphones
                                size={15}
                                className="text-blue-300"
                            />

                            24/7 Support

                        </div>

                    </div>

                </div>

                {/* =================================================
                    SEARCH CARD
                ================================================= */}

                <div className="relative z-30 mt-6">

                    {/* IMPORTANT:
                        overflow-visible is required for traveller dropdown
                    */}

                    <div className="relative z-30 overflow-visible rounded-2xl bg-white shadow-[0_18px_60px_rgba(0,0,0,0.28)]">

                        {/* ============================================
                            TABS
                        ============================================ */}

                        <div className="border-b border-slate-100 px-2 sm:px-4">

                            <div className="flex">

                                {tabs.map((tab) => {

                                    const Icon = tab.icon;

                                    const isActive =
                                        activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveTab(tab.id)
                                            }
                                            className={`relative flex items-center gap-1.5 px-2.5 py-3 text-[11px] font-semibold transition sm:gap-2 sm:px-4 sm:text-xs ${isActive
                                                    ? "text-blue-600"
                                                    : "text-slate-500 hover:text-blue-600"
                                                }`}
                                        >

                                            <Icon
                                                size={17}
                                                strokeWidth={
                                                    isActive ? 2.5 : 2
                                                }
                                            />

                                            {tab.label}

                                            <span
                                                className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-t-full bg-blue-600 transition-all ${isActive
                                                        ? "w-8 opacity-100"
                                                        : "w-0 opacity-0"
                                                    }`}
                                            />

                                        </button>
                                    );
                                })}

                            </div>

                        </div>

                        {/* ============================================
                            FORM
                        ============================================ */}

                        <form
                            onSubmit={handleSearch}
                            className="relative z-40 p-2.5 sm:p-4"
                        >

                            {/* =================================================
                                FLIGHTS
                            ================================================= */}

                            {activeTab === "flights" && (

                                <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">

                                    {/* ================= FROM ================= */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            From
                                        </label>

                                        <div className="relative">

                                            <Plane
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.from}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "from",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Delhi"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* ================= TO ================= */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            To
                                        </label>

                                        <div className="relative">

                                            <MapPin
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.to}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "to",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Mumbai"
                                                className={`${inputClass} pr-10`}
                                            />

                                            <button
                                                type="button"
                                                onClick={handleSwapLocations}
                                                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition hover:bg-blue-50"
                                                title="Swap locations"
                                            >
                                                <ArrowRightLeft size={14} />
                                            </button>

                                        </div>

                                    </div>

                                    {/* ================= DEPARTURE ================= */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Departure
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.departure
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "departure",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* ================= RETURN ================= */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Return
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.returnDate
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "returnDate",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* =================================================
                                        TRAVELLERS
                                    ================================================= */}

                                    <div className="relative z-[60]">

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Travellers
                                        </label>

                                        {/* Traveller Button */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsTravellerOpen(
                                                    (prev) => !prev
                                                )
                                            }
                                            className={`${inputClass} flex items-center justify-between text-left`}
                                        >

                                            <span className="flex min-w-0 items-center gap-2 truncate">

                                                <Users
                                                    size={16}
                                                    className="shrink-0 text-slate-400"
                                                />

                                                <span className="truncate">
                                                    {travellerText}
                                                </span>

                                            </span>

                                            <ChevronDown
                                                size={14}
                                                className={`shrink-0 text-slate-400 transition-transform ${isTravellerOpen
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                            />

                                        </button>

                                        {/* =================================================
                                            TRAVELLER DROPDOWN
                                        ================================================= */}

                                        {isTravellerOpen && (

                                            <div className="absolute left-0 top-[calc(100%+8px)] z-[9999] w-full min-w-[250px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_15px_50px_rgba(15,23,42,0.18)]">

                                                {/* ================= ADULTS ================= */}

                                                <div className="flex items-center justify-between gap-4">

                                                    <div>

                                                        <p className="text-xs font-bold text-slate-800">
                                                            Adults
                                                        </p>

                                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                                            Age 12+
                                                        </p>

                                                    </div>

                                                    <div className="flex items-center gap-3">

                                                        {/* Minus */}

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                decreaseAdult
                                                            }
                                                            disabled={
                                                                travellers.adults <=
                                                                1
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            −
                                                        </button>

                                                        {/* Count */}

                                                        <span className="w-5 text-center text-xs font-bold text-slate-800">
                                                            {
                                                                travellers.adults
                                                            }
                                                        </span>

                                                        {/* Plus */}

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                increaseAdult
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>

                                                {/* Divider */}

                                                <div className="my-4 border-t border-slate-100" />

                                                {/* ================= CHILDREN ================= */}

                                                <div className="flex items-center justify-between gap-4">

                                                    <div>

                                                        <p className="text-xs font-bold text-slate-800">
                                                            Children
                                                        </p>

                                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                                            Age 2–11
                                                        </p>

                                                    </div>

                                                    <div className="flex items-center gap-3">

                                                        {/* Minus */}

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                decreaseChild
                                                            }
                                                            disabled={
                                                                travellers.children <=
                                                                0
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            −
                                                        </button>

                                                        {/* Count */}

                                                        <span className="w-5 text-center text-xs font-bold text-slate-800">
                                                            {
                                                                travellers.children
                                                            }
                                                        </span>

                                                        {/* Plus */}

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                increaseChild
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>

                                                {/* ================= TOTAL ================= */}

                                                <div className="mt-4 rounded-xl bg-blue-50 px-3 py-2.5">

                                                    <div className="flex items-center justify-between">

                                                        <span className="text-[10px] font-medium text-slate-500">
                                                            Total travellers
                                                        </span>

                                                        <span className="text-xs font-bold text-blue-600">
                                                            {travellers.adults +
                                                                travellers.children}
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* ================= DONE ================= */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setIsTravellerOpen(
                                                            false
                                                        )
                                                    }
                                                    className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-[11px] font-bold text-white transition hover:bg-blue-700"
                                                >
                                                    Done
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                    {/* ================= SEARCH ================= */}

                                    <div className="flex items-end">

                                        <button
                                            type="submit"
                                            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 lg:w-auto"
                                        >

                                            <Search size={17} />

                                            Search

                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* =================================================
                                HOTELS
                            ================================================= */}

                            {activeTab === "hotels" && (

                                <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">

                                    {/* Destination */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Destination
                                        </label>

                                        <div className="relative">

                                            <MapPin
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={
                                                    formData.destination
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "destination",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Where do you want to stay?"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Check-in */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Check-in
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.checkIn
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "checkIn",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Check-out */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Check-out
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.checkOut
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "checkOut",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Guests */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Guests
                                        </label>

                                        <div className="relative">

                                            <Users
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <select
                                                value={
                                                    formData.guests
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "guests",
                                                        e.target.value
                                                    )
                                                }
                                                className={`${inputClass} appearance-none pr-8`}
                                            >

                                                <option>
                                                    1 Guest
                                                </option>

                                                <option>
                                                    2 Guests
                                                </option>

                                                <option>
                                                    3 Guests
                                                </option>

                                                <option>
                                                    4 Guests
                                                </option>

                                                <option>
                                                    2 Guests, 1 Child
                                                </option>

                                            </select>

                                            <ChevronDown
                                                size={14}
                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                        </div>

                                    </div>

                                    {/* Search */}

                                    <div className="flex items-end">

                                        <button
                                            type="submit"
                                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 lg:w-auto"
                                        >

                                            <Search size={17} />

                                            Search

                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* =================================================
                                TRAINS
                            ================================================= */}

                            {activeTab === "trains" && (

                                <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">

                                    {/* From */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            From
                                        </label>

                                        <div className="relative">

                                            <TrainFront
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.from}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "from",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Delhi"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* To */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            To
                                        </label>

                                        <div className="relative">

                                            <MapPin
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.to}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "to",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Varanasi"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Travel Date */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Travel Date
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.departure
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "departure",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Class */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Class
                                        </label>

                                        <div className="relative">

                                            <TrainFront
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <select
                                                className={`${inputClass} appearance-none pr-8`}
                                            >

                                                <option>
                                                    All Classes
                                                </option>

                                                <option>
                                                    Sleeper
                                                </option>

                                                <option>
                                                    AC 3 Tier
                                                </option>

                                                <option>
                                                    AC 2 Tier
                                                </option>

                                                <option>
                                                    AC First Class
                                                </option>

                                            </select>

                                            <ChevronDown
                                                size={14}
                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                        </div>

                                    </div>

                                    {/* Search */}

                                    <div className="flex items-end">

                                        <button
                                            type="submit"
                                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 lg:w-auto"
                                        >

                                            <Search size={17} />

                                            Search

                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* =================================================
                                BUSES
                            ================================================= */}

                            {activeTab === "buses" && (

                                <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1fr_1fr_1fr_auto]">

                                    {/* From */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            From
                                        </label>

                                        <div className="relative">

                                            <BusFront
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.from}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "from",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Delhi"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* To */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            To
                                        </label>

                                        <div className="relative">

                                            <MapPin
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                value={formData.to}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "to",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Jaipur"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Travel Date */}

                                    <div>

                                        <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                                            Travel Date
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="date"
                                                value={
                                                    formData.departure
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "departure",
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* Search */}

                                    <div className="flex items-end">

                                        <button
                                            type="submit"
                                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 lg:w-auto"
                                        >

                                            <Search size={17} />

                                            Search

                                        </button>

                                    </div>

                                </div>
                            )}

                        </form>

                    </div>

                </div>

            </div>

            {/* =====================================================
                QUICK BOOKING
            ===================================================== */}

            <div className="relative z-20 -mt-7 pb-6">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                    <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2">

                        {quickLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <a
                                    key={item.title}
                                    href={item.path}
                                    className="group flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-[0_5px_20px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
                                    >
                                        <Icon size={16} />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-[11px] font-bold text-slate-800">
                                            {item.title}
                                        </h3>

                                        <p className="mt-0.5 truncate text-[9px] text-slate-500">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}

                    </div>



                </div>

            </div>

        </section>
    );
};

export default HeroSection;