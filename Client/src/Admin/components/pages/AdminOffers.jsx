import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Copy,
  Check,
  X,
  Plane,
  Hotel,
  Package,
  Car,
  Train,
  Bus,
  CalendarDays,
  Tag,
  Filter,
  TicketPercent,
  TrendingUp,
  Layers3,
  CircleCheck,
  ChevronDown,
  Percent,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Dummy Offers Data                                                          */
/* -------------------------------------------------------------------------- */

const initialOffers = [
  {
    id: 1,
    title: "Fly to Dubai",
    category: "Flight",
    discount: 25,
    discountType: "UP TO",
    description:
      "Save up to 25% on selected international flights to Dubai.",
    couponCode: "DUBAI25",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-09-01",
    validUntil: "2026-10-15",
    status: "Active",
    featured: true,
    usage: 342,
    limit: 500,
  },
  {
    id: 2,
    title: "Luxury Hotel Stay",
    category: "Hotel",
    discount: 40,
    discountType: "UP TO",
    description:
      "Enjoy up to 40% off on premium hotels and resorts across India.",
    couponCode: "STAY40",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-09-05",
    validUntil: "2026-10-30",
    status: "Active",
    featured: true,
    usage: 278,
    limit: 400,
  },
  {
    id: 3,
    title: "Holiday Package Special",
    category: "Package",
    discount: 35,
    discountType: "UP TO",
    description:
      "Book selected holiday packages and get exciting seasonal discounts.",
    couponCode: "HOLIDAY35",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-09-10",
    validUntil: "2026-11-10",
    status: "Active",
    featured: false,
    usage: 195,
    limit: 300,
  },
  {
    id: 4,
    title: "Weekend Getaway",
    category: "Package",
    discount: 20,
    discountType: "FLAT",
    description:
      "Plan your perfect weekend getaway with special Tripora savings.",
    couponCode: "WEEKEND20",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-09-12",
    validUntil: "2026-10-20",
    status: "Active",
    featured: false,
    usage: 121,
    limit: 250,
  },
  {
    id: 5,
    title: "Train Travel Offer",
    category: "Train",
    discount: 15,
    discountType: "UP TO",
    description:
      "Get special savings when booking selected train journeys.",
    couponCode: "TRAIN15",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-08-20",
    validUntil: "2026-09-25",
    status: "Active",
    featured: false,
    usage: 87,
    limit: 200,
  },
  {
    id: 6,
    title: "Bus Booking Deal",
    category: "Bus",
    discount: 10,
    discountType: "FLAT",
    description:
      "Save more on your next bus journey with this exclusive deal.",
    couponCode: "BUS10",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-09-01",
    validUntil: "2026-09-30",
    status: "Active",
    featured: false,
    usage: 64,
    limit: 150,
  },
  {
    id: 7,
    title: "Cab Ride Discount",
    category: "Cab",
    discount: 18,
    discountType: "UP TO",
    description:
      "Get instant savings on selected airport and city cab rides.",
    couponCode: "CAB18",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80",
    validFrom: "2026-08-15",
    validUntil: "2026-09-20",
    status: "Inactive",
    featured: false,
    usage: 110,
    limit: 180,
  },
];

/* -------------------------------------------------------------------------- */
/* Empty Form                                                                 */
/* -------------------------------------------------------------------------- */

const emptyForm = {
  title: "",
  category: "Flight",
  discount: "",
  discountType: "UP TO",
  description: "",
  couponCode: "",
  image: "",
  validFrom: "",
  validUntil: "",
  status: "Active",
  featured: false,
  usage: 0,
  limit: 500,
};

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

const categories = [
  "All",
  "Flight",
  "Hotel",
  "Package",
  "Train",
  "Bus",
  "Cab",
];

const categoryConfig = {
  Flight: {
    icon: Plane,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  Hotel: {
    icon: Hotel,
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  Package: {
    icon: Package,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  Train: {
    icon: Train,
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  Bus: {
    icon: Bus,
    bg: "bg-cyan-50",
    text: "text-cyan-600",
  },
  Cab: {
    icon: Car,
    bg: "bg-yellow-50",
    text: "text-yellow-600",
  },
};

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

function Offers() {
  const [offers, setOffers] = useState(initialOffers);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [showMobileFilters, setShowMobileFilters] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingOffer, setEditingOffer] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);

  const [copiedCode, setCopiedCode] = useState("");

  /* ------------------------------------------------------------------------ */
  /* Filter Offers                                                            */
  /* ------------------------------------------------------------------------ */

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        offer.title.toLowerCase().includes(searchValue) ||
        offer.couponCode.toLowerCase().includes(searchValue) ||
        offer.description.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || offer.category === category;

      const matchesStatus =
        status === "All" || offer.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [offers, search, category, status]);

  /* ------------------------------------------------------------------------ */
  /* Statistics                                                               */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(() => {
    const active = offers.filter(
      (offer) => offer.status === "Active"
    ).length;

    const featured = offers.filter(
      (offer) => offer.featured
    ).length;

    const totalUsage = offers.reduce(
      (sum, offer) => sum + Number(offer.usage || 0),
      0
    );

    return {
      total: offers.length,
      active,
      featured,
      totalUsage,
    };
  }, [offers]);

  /* ------------------------------------------------------------------------ */
  /* Add Offer                                                                */
  /* ------------------------------------------------------------------------ */

  const handleAddOffer = () => {
    setModalMode("add");
    setEditingOffer(null);

    setForm({
      ...emptyForm,
      validFrom: "",
      validUntil: "",
    });

    setShowModal(true);
  };

  /* ------------------------------------------------------------------------ */
  /* Edit Offer                                                               */
  /* ------------------------------------------------------------------------ */

  const handleEditOffer = (offer) => {
    setModalMode("edit");
    setEditingOffer(offer);

    setForm({
      ...offer,
      discount: String(offer.discount),
      usage: Number(offer.usage || 0),
      limit: Number(offer.limit || 500),
    });

    setShowModal(true);
  };

  /* ------------------------------------------------------------------------ */
  /* Close Modal                                                              */
  /* ------------------------------------------------------------------------ */

  const closeModal = () => {
    setShowModal(false);
    setEditingOffer(null);
    setForm(emptyForm);
  };

  /* ------------------------------------------------------------------------ */
  /* Form Change                                                              */
  /* ------------------------------------------------------------------------ */

  const handleFormChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ------------------------------------------------------------------------ */
  /* Save Offer                                                               */
  /* ------------------------------------------------------------------------ */

  const handleSaveOffer = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter offer title.");
      return;
    }

    if (!form.discount) {
      alert("Please enter discount.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter description.");
      return;
    }

    if (!form.couponCode.trim()) {
      alert("Please enter coupon code.");
      return;
    }

    if (!form.validFrom) {
      alert("Please select valid from date.");
      return;
    }

    if (!form.validUntil) {
      alert("Please select valid until date.");
      return;
    }

    if (
      new Date(form.validUntil) <
      new Date(form.validFrom)
    ) {
      alert(
        "Valid until date cannot be before valid from date."
      );
      return;
    }

    if (modalMode === "add") {
      const newOffer = {
        ...form,
        id: Date.now(),
        discount: Number(form.discount),
        usage: 0,
        limit: Number(form.limit || 500),
      };

      setOffers((previous) => [
        newOffer,
        ...previous,
      ]);
    } else {
      setOffers((previous) =>
        previous.map((offer) =>
          offer.id === editingOffer.id
            ? {
                ...form,
                id: editingOffer.id,
                discount: Number(form.discount),
                usage: Number(form.usage || 0),
                limit: Number(form.limit || 500),
              }
            : offer
        )
      );
    }

    closeModal();
  };

  /* ------------------------------------------------------------------------ */
  /* Toggle Status                                                            */
  /* ------------------------------------------------------------------------ */

  const toggleStatus = (id) => {
    setOffers((previous) =>
      previous.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              status:
                offer.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : offer
      )
    );
  };

  /* ------------------------------------------------------------------------ */
  /* Toggle Featured                                                          */
  /* ------------------------------------------------------------------------ */

  const toggleFeatured = (id) => {
    setOffers((previous) =>
      previous.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              featured: !offer.featured,
            }
          : offer
      )
    );
  };

  /* ------------------------------------------------------------------------ */
  /* Delete                                                                   */
  /* ------------------------------------------------------------------------ */

  const confirmDelete = () => {
    setOffers((previous) =>
      previous.filter((offer) => offer.id !== deleteId)
    );

    setDeleteId(null);
  };

  /* ------------------------------------------------------------------------ */
  /* Copy Coupon                                                              */
  /* ------------------------------------------------------------------------ */

  const handleCopyCoupon = async (code) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 1800);
    } catch {
      alert("Unable to copy coupon code.");
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Clear Filters                                                            */
  /* ------------------------------------------------------------------------ */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  /* ======================================================================== */
  /* RETURN                                                                   */
  /* ======================================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-5 sm:py-2 lg:px-6">
        {/* ================================================================== */}
        {/* PAGE HEADER                                                         */}
        {/* ================================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <TicketPercent size={17} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                Tripora Admin
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Offers
            </h1>

            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
              Manage promotional offers, discounts and coupon
              campaigns from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddOffer}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
          >
            <Plus size={18} />
            Add New Offer
          </button>
        </div>

        {/* ================================================================== */}
        {/* STATS                                                               */}
        {/* ================================================================== */}

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 xl:grid-cols-4">
          <StatCard
            icon={<Layers3 size={19} />}
            title="Total Offers"
            value={stats.total}
            subtitle="All offers"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={<CircleCheck size={19} />}
            title="Active Offers"
            value={stats.active}
            subtitle="Currently live"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={<Star size={19} />}
            title="Featured"
            value={stats.featured}
            subtitle="Featured offers"
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            icon={<TrendingUp size={19} />}
            title="Total Usage"
            value={stats.totalUsage.toLocaleString()}
            subtitle="Offer redemptions"
            iconClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* ================================================================== */}
        {/* SEARCH + FILTERS                                                    */}
        {/* ================================================================== */}

        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}

            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search offers or coupon code..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Mobile Filter Button */}

            <button
              type="button"
              onClick={() =>
                setShowMobileFilters(
                  (previous) => !previous
                )
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 lg:hidden"
            >
              <Filter size={17} />
              Filters

              <ChevronDown
                size={16}
                className={`transition ${
                  showMobileFilters
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* Desktop Filters */}

            <div
              className={`${
                showMobileFilters
                  ? "flex"
                  : "hidden"
              } flex-col gap-3 lg:flex lg:flex-row`}
            >
              <FilterSelect
                value={category}
                onChange={setCategory}
                options={categories}
                label="Category"
              />

              <FilterSelect
                value={status}
                onChange={setStatus}
                options={[
                  "All",
                  "Active",
                  "Inactive",
                ]}
                label="Status"
              />

              <button
                type="button"
                onClick={clearFilters}
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Category Pills */}

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* RESULT HEADER                                                       */}
        {/* ================================================================== */}

        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              All Offers
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Showing {filteredOffers.length} of{" "}
              {offers.length} offers
            </p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* DESKTOP TABLE                                                       */}
        {/* ================================================================== */}

        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1080px] table-auto">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <TableHeading>
                    Offer
                  </TableHeading>

                  <TableHeading>
                    Category
                  </TableHeading>

                  <TableHeading>
                    Discount
                  </TableHeading>

                  <TableHeading>
                    Coupon
                  </TableHeading>

                  <TableHeading>
                    Validity
                  </TableHeading>

                  <TableHeading>
                    Usage
                  </TableHeading>

                  <TableHeading>
                    Status
                  </TableHeading>

                  <th className="w-[125px] whitespace-nowrap px-4 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOffers.map((offer) => (
                  <DesktopOfferRow
                    key={offer.id}
                    offer={offer}
                    onEdit={handleEditOffer}
                    onDelete={setDeleteId}
                    onToggleStatus={toggleStatus}
                    onToggleFeatured={toggleFeatured}
                    onCopy={handleCopyCoupon}
                    copiedCode={copiedCode}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================================== */}
        {/* MOBILE + TABLET CARDS                                               */}
        {/* ================================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {filteredOffers.map((offer) => (
            <MobileOfferCard
              key={offer.id}
              offer={offer}
              onEdit={handleEditOffer}
              onDelete={setDeleteId}
              onToggleStatus={toggleStatus}
              onToggleFeatured={toggleFeatured}
              onCopy={handleCopyCoupon}
              copiedCode={copiedCode}
            />
          ))}
        </div>

        {/* ================================================================== */}
        {/* EMPTY STATE                                                         */}
        {/* ================================================================== */}

        {filteredOffers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Tag size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No offers found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
              Try changing your search or filters, or create
              a new promotional offer.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* ADD / EDIT MODAL                                                     */}
      {/* ==================================================================== */}

      {showModal && (
        <OfferModal
          mode={modalMode}
          form={form}
          onChange={handleFormChange}
          onClose={closeModal}
          onSubmit={handleSaveOffer}
        />
      )}

      {/* ==================================================================== */}
      {/* DELETE MODAL                                                         */}
      {/* ==================================================================== */}

      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* ========================================================================== */
/* STAT CARD                                                                  */
/* ========================================================================== */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0 text-right">
          <p className="truncate text-[10px] font-semibold text-slate-500 sm:text-xs">
            {title}
          </p>

          <p className="mt-0.5 text-xl font-extrabold text-slate-900 sm:text-2xl">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-slate-400 sm:text-xs">
        {subtitle}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* FILTER SELECT                                                              */
/* ========================================================================== */

function FilterSelect({
  value,
  onChange,
  options,
  label,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:min-w-[145px]"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All"
              ? `All ${label}`
              : option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

/* ========================================================================== */
/* TABLE HEADING                                                              */
/* ========================================================================== */

function TableHeading({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

/* ========================================================================== */
/* DESKTOP OFFER ROW                                                          */
/* ========================================================================== */

function DesktopOfferRow({
  offer,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onCopy,
  copiedCode,
}) {
  const usagePercent =
    offer.limit > 0
      ? Math.min(
          (offer.usage / offer.limit) * 100,
          100
        )
      : 0;

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
      {/* Offer */}

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {offer.image ? (
              <img
                src={offer.image}
                alt={offer.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <Tag size={20} />
              </div>
            )}

            {offer.featured && (
              <div className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-md bg-white text-amber-500 shadow-sm">
                <Star
                  size={11}
                  fill="currentColor"
                />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="max-w-[210px] truncate text-sm font-bold text-slate-900">
              {offer.title}
            </p>

            <p className="mt-1 max-w-[230px] truncate text-xs text-slate-500">
              {offer.description}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}

      <td className="px-4 py-4">
        <CategoryBadge category={offer.category} />
      </td>

      {/* Discount */}

      <td className="px-4 py-4">
        <p className="text-base font-extrabold text-emerald-600">
          {offer.discount}%
        </p>

        <p className="mt-0.5 text-[9px] font-bold uppercase text-slate-400">
          {offer.discountType}
        </p>
      </td>

      {/* Coupon */}

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() =>
            onCopy(offer.couponCode)
          }
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-dashed border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 transition hover:border-blue-400"
        >
          {offer.couponCode}

          {copiedCode === offer.couponCode ? (
            <Check size={13} />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </td>

      {/* Validity */}

      <td className="px-4 py-4">
        <div className="flex items-start gap-2 text-xs text-slate-600">
          <CalendarDays
            size={14}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="whitespace-nowrap">
              {formatDate(offer.validFrom)}
            </p>

            <p className="mt-0.5 whitespace-nowrap text-slate-400">
              to {formatDate(offer.validUntil)}
            </p>
          </div>
        </div>
      </td>

      {/* Usage */}

      <td className="px-4 py-4">
        <div className="w-20">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              {offer.usage}
            </span>

            <span className="text-[10px] text-slate-400">
              /{offer.limit}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${usagePercent}%`,
              }}
            />
          </div>
        </div>
      </td>

      {/* Status */}

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() =>
            onToggleStatus(offer.id)
          }
        >
          <StatusBadge status={offer.status} />
        </button>
      </td>

      {/* Actions */}

      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {/* Featured */}

          <button
            type="button"
            onClick={() =>
              onToggleFeatured(offer.id)
            }
            title="Toggle featured"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
              offer.featured
                ? "bg-amber-50 text-amber-500"
                : "text-slate-400 hover:bg-slate-100 hover:text-amber-500"
            }`}
          >
            <Star
              size={15}
              fill={
                offer.featured
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          {/* Edit */}

          <button
            type="button"
            onClick={() => onEdit(offer)}
            title="Edit offer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit3 size={15} />
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(offer.id)
            }
            title="Delete offer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ========================================================================== */
/* MOBILE OFFER CARD                                                          */
/* ========================================================================== */

function MobileOfferCard({
  offer,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onCopy,
  copiedCode,
}) {
  const usagePercent =
    offer.limit > 0
      ? Math.min(
          (offer.usage / offer.limit) * 100,
          100
        )
      : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Image */}

      <div className="relative h-44 w-full bg-slate-100 sm:h-48">
        {offer.image ? (
          <img
            src={offer.image}
            alt={offer.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <Tag size={30} />
          </div>
        )}

        {/* Top Controls */}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <CategoryBadge category={offer.category} />

          <button
            type="button"
            onClick={() =>
              onToggleFeatured(offer.id)
            }
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ${
              offer.featured
                ? "text-amber-500"
                : "text-slate-400"
            }`}
          >
            <Star
              size={16}
              fill={
                offer.featured
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>

        {/* Discount */}

        <div className="absolute bottom-3 left-3 rounded-xl bg-white px-3 py-2 shadow-lg">
          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
            {offer.discountType}
          </p>

          <p className="text-xl font-extrabold text-emerald-600">
            {offer.discount}%
          </p>
        </div>

        {/* Status */}

        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            onClick={() =>
              onToggleStatus(offer.id)
            }
          >
            <StatusBadge status={offer.status} />
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="p-4">
        {/* Title */}

        <div>
          <h3 className="text-base font-bold text-slate-900">
            {offer.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
            {offer.description}
          </p>
        </div>

        {/* Coupon */}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-blue-200 bg-blue-50 p-3">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-wide text-blue-400">
              Coupon Code
            </p>

            <p className="mt-0.5 truncate text-sm font-extrabold tracking-wide text-blue-700">
              {offer.couponCode}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onCopy(offer.couponCode)
            }
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm"
          >
            {copiedCode === offer.couponCode ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>

        {/* Dates */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase text-slate-400">
              Valid From
            </p>

            <p className="mt-1 text-xs font-bold text-slate-700">
              {formatDate(offer.validFrom)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase text-slate-400">
              Valid Until
            </p>

            <p className="mt-1 text-xs font-bold text-slate-700">
              {formatDate(offer.validUntil)}
            </p>
          </div>
        </div>

        {/* Usage */}

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Offer Usage
            </span>

            <span className="text-xs font-bold text-slate-800">
              {offer.usage} / {offer.limit}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${usagePercent}%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() =>
              onToggleStatus(offer.id)
            }
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            {offer.status === "Active" ? (
              <>
                <EyeOff size={14} />
                Disable
              </>
            ) : (
              <>
                <Eye size={14} />
                Activate
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onEdit(offer)}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            <Edit3 size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(offer.id)
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* CATEGORY BADGE                                                             */
/* ========================================================================== */

function CategoryBadge({ category }) {
  const config =
    categoryConfig[category] ||
    categoryConfig.Flight;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${config.bg} ${config.text}`}
    >
      <Icon size={13} />
      {category}
    </span>
  );
}

/* ========================================================================== */
/* STATUS BADGE                                                               */
/* ========================================================================== */

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        active
          ? "bg-emerald-50 text-emerald-600"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active
            ? "bg-emerald-500"
            : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

/* ========================================================================== */
/* OFFER MODAL                                                                */
/* ========================================================================== */

function OfferModal({
  mode,
  form,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 sm:p-5">
      <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              {mode === "add"
                ? "Add New Offer"
                : "Edit Offer"}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {mode === "add"
                ? "Create a new Tripora promotional offer."
                : "Update this promotional offer."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={onSubmit}
          className="overflow-y-auto px-4 py-5 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Title */}

            <div className="sm:col-span-2">
              <FormLabel
                label="Offer Title"
                required
              />

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  onChange(
                    "title",
                    event.target.value
                  )
                }
                placeholder="e.g. Fly to Dubai"
                className="form-input"
              />
            </div>

            {/* Category */}

            <div>
              <FormLabel
                label="Category"
                required
              />

              <select
                value={form.category}
                onChange={(event) =>
                  onChange(
                    "category",
                    event.target.value
                  )
                }
                className="form-input"
              >
                {categories
                  .filter(
                    (item) => item !== "All"
                  )
                  .map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            {/* Discount */}

            <div>
              <FormLabel
                label="Discount"
                required
              />

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Percent
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.discount}
                    onChange={(event) =>
                      onChange(
                        "discount",
                        event.target.value
                      )
                    }
                    placeholder="25"
                    className="form-input pr-9"
                  />
                </div>

                <select
                  value={form.discountType}
                  onChange={(event) =>
                    onChange(
                      "discountType",
                      event.target.value
                    )
                  }
                  className="form-input w-[105px] px-2 text-xs sm:w-[120px]"
                >
                  <option value="UP TO">
                    UP TO
                  </option>

                  <option value="FLAT">
                    FLAT
                  </option>
                </select>
              </div>
            </div>

            {/* Coupon */}

            <div>
              <FormLabel
                label="Coupon Code"
                required
              />

              <div className="relative">
                <Tag
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={form.couponCode}
                  onChange={(event) =>
                    onChange(
                      "couponCode",
                      event.target.value.toUpperCase()
                    )
                  }
                  placeholder="DUBAI25"
                  className="form-input pl-9"
                />
              </div>
            </div>

            {/* Usage Limit */}

            <div>
              <FormLabel label="Usage Limit" />

              <input
                type="number"
                min="1"
                value={form.limit}
                onChange={(event) =>
                  onChange(
                    "limit",
                    event.target.value
                  )
                }
                className="form-input"
              />
            </div>

            {/* Valid From */}

            <div>
              <FormLabel
                label="Valid From"
                required
              />

              <input
                type="date"
                value={form.validFrom}
                onChange={(event) =>
                  onChange(
                    "validFrom",
                    event.target.value
                  )
                }
                className="form-input"
              />
            </div>

            {/* Valid Until */}

            <div>
              <FormLabel
                label="Valid Until"
                required
              />

              <input
                type="date"
                value={form.validUntil}
                onChange={(event) =>
                  onChange(
                    "validUntil",
                    event.target.value
                  )
                }
                className="form-input"
              />
            </div>

            {/* Image */}

            <div className="sm:col-span-2">
              <FormLabel label="Offer Image URL" />

              <input
                type="url"
                value={form.image}
                onChange={(event) =>
                  onChange(
                    "image",
                    event.target.value
                  )
                }
                placeholder="https://example.com/offer-image.jpg"
                className="form-input"
              />

              {form.image && (
                <div className="mt-3 h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-40">
                  <img
                    src={form.image}
                    alt="Offer preview"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}

            <div className="sm:col-span-2">
              <FormLabel
                label="Description"
                required
              />

              <textarea
                rows="4"
                value={form.description}
                onChange={(event) =>
                  onChange(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Describe the offer..."
                className="form-input min-h-[110px] resize-none py-3"
              />
            </div>

            {/* Status */}

            <div>
              <FormLabel label="Status" />

              <select
                value={form.status}
                onChange={(event) =>
                  onChange(
                    "status",
                    event.target.value
                  )
                }
                className="form-input"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            {/* Featured */}

            <div>
              <FormLabel label="Featured Offer" />

              <button
                type="button"
                onClick={() =>
                  onChange(
                    "featured",
                    !form.featured
                  )
                }
                className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm font-semibold transition ${
                  form.featured
                    ? "border-amber-200 bg-amber-50 text-amber-600"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Star
                    size={16}
                    fill={
                      form.featured
                        ? "currentColor"
                        : "none"
                    }
                  />

                  Featured
                </span>

                <span
                  className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
                    form.featured
                      ? "bg-amber-500"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      form.featured
                        ? "translate-x-4"
                        : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {mode === "add"
                ? "Create Offer"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* FORM LABEL                                                                 */
/* ========================================================================== */

function FormLabel({ label, required }) {
  return (
    <label className="mb-2 block text-xs font-bold text-slate-700">
      {label}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
}

/* ========================================================================== */
/* DELETE MODAL                                                               */
/* ========================================================================== */

function DeleteModal({
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
          <Trash2 size={21} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Delete this offer?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This action will permanently remove the offer
          from the admin panel.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700"
          >
            Delete Offer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* DATE FORMAT                                                                */
/* ========================================================================== */

function formatDate(date) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default Offers;