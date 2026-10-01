import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
  toggleOfferFeatured,
  clearOfferError,
  clearOfferSuccess,
} from "../../../redux/slicer/offferSlice";

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
  image: null,
  imagePreview: "",
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
  const dispatch = useDispatch();

  /* ------------------------------------------------------------------------ */
  /* Redux                                                                    */
  /* ------------------------------------------------------------------------ */

  const {
    offers,
    loading,
    error,
    success,
    message,
  } = useSelector((state) => state.offer);

  /* ------------------------------------------------------------------------ */
  /* Local State                                                              */
  /* ------------------------------------------------------------------------ */

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
  /* GET ALL OFFERS                                                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    dispatch(getAllOffers());
  }, [dispatch]);

  /* ------------------------------------------------------------------------ */
  /* Success / Error                                                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearOfferError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && message) {
      alert(message);
      dispatch(clearOfferSuccess());

      /*
       * After create/update/delete/toggle,
       * fetch latest backend data.
       */
      dispatch(getAllOffers());
    }
  }, [success, message, dispatch]);

  /* ------------------------------------------------------------------------ */
  /* Filter Offers                                                            */
  /* ------------------------------------------------------------------------ */

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const searchValue = search.toLowerCase().trim();

      const title = String(offer.title || "").toLowerCase();
      const couponCode = String(
        offer.couponCode || ""
      ).toLowerCase();
      const description = String(
        offer.description || ""
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        couponCode.includes(searchValue) ||
        description.includes(searchValue);

      const matchesCategory =
        category === "All" ||
        offer.category === category;

      const matchesStatus =
        status === "All" ||
        offer.status === status;

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
      (sum, offer) =>
        sum + Number(offer.usage || 0),
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
      title: offer.title || "",
      category: offer.category || "Flight",
      discount:
        offer.discount !== undefined
          ? String(offer.discount)
          : "",
      discountType:
        offer.discountType || "UP TO",
      description: offer.description || "",
      couponCode: offer.couponCode || "",
      image: null,
      imagePreview: offer.image || "",
      validFrom: formatDateForInput(
        offer.validFrom
      ),
      validUntil: formatDateForInput(
        offer.validUntil
      ),
      status: offer.status || "Active",
      featured: Boolean(offer.featured),
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

    setForm({
      ...emptyForm,
    });
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
  /* Image Change                                                             */
  /* ------------------------------------------------------------------------ */

  const handleImageChange = (file) => {
    if (!file) {
      setForm((previous) => ({
        ...previous,
        image: null,
      }));

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setForm((previous) => ({
      ...previous,
      image: file,
      imagePreview: previewUrl,
    }));
  };

  /* ------------------------------------------------------------------------ */
  /* Save Offer                                                               */
  /* ------------------------------------------------------------------------ */

  const handleSaveOffer = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter offer title.");
      return;
    }

    if (!form.discount) {
      alert("Please enter discount.");
      return;
    }

    if (
      Number(form.discount) < 0 ||
      Number(form.discount) > 100
    ) {
      alert("Discount must be between 0 and 100.");
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

    const formData = new FormData();

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "category",
      form.category
    );

    formData.append(
      "discount",
      Number(form.discount)
    );

    formData.append(
      "discountType",
      form.discountType
    );

    formData.append(
      "description",
      form.description.trim()
    );

    formData.append(
      "couponCode",
      form.couponCode.trim().toUpperCase()
    );

    formData.append(
      "validFrom",
      form.validFrom
    );

    formData.append(
      "validUntil",
      form.validUntil
    );

    formData.append(
      "status",
      form.status
    );

    formData.append(
      "featured",
      String(form.featured)
    );

    formData.append(
      "usage",
      Number(form.usage || 0)
    );

    formData.append(
      "limit",
      Number(form.limit || 500)
    );

    /*
     * Only send image when a new file is selected.
     *
     * Backend expects req.file.
     */
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (modalMode === "add") {
        await dispatch(
          createOffer(formData)
        ).unwrap();
      } else {
        await dispatch(
          updateOffer({
            id: editingOffer._id,
            offerData: formData,
          })
        ).unwrap();
      }

      closeModal();
    } catch (error) {
      /*
       * Redux error alert is handled by useEffect.
       */
      console.error(
        "Save Offer Error:",
        error
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Toggle Status                                                            */
  /* ------------------------------------------------------------------------ */

  const handleToggleStatus = async (id) => {
    try {
      await dispatch(
        toggleOfferStatus(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Toggle Status Error:",
        error
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Toggle Featured                                                          */
  /* ------------------------------------------------------------------------ */

  const handleToggleFeatured = async (id) => {
    try {
      await dispatch(
        toggleOfferFeatured(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Toggle Featured Error:",
        error
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Delete                                                                   */
  /* ------------------------------------------------------------------------ */

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await dispatch(
        deleteOffer(deleteId)
      ).unwrap();

      setDeleteId(null);
    } catch (error) {
      console.error(
        "Delete Offer Error:",
        error
      );
    }
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

          {loading && (
            <div className="text-xs font-semibold text-blue-600">
              Loading...
            </div>
          )}
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
                    key={offer._id}
                    offer={offer}
                    onEdit={handleEditOffer}
                    onDelete={setDeleteId}
                    onToggleStatus={
                      handleToggleStatus
                    }
                    onToggleFeatured={
                      handleToggleFeatured
                    }
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
              key={offer._id}
              offer={offer}
              onEdit={handleEditOffer}
              onDelete={setDeleteId}
              onToggleStatus={
                handleToggleStatus
              }
              onToggleFeatured={
                handleToggleFeatured
              }
              onCopy={handleCopyCoupon}
              copiedCode={copiedCode}
            />
          ))}
        </div>

        {/* ================================================================== */}
        {/* EMPTY STATE                                                         */}
        {/* ================================================================== */}

        {!loading &&
          filteredOffers.length === 0 && (
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
          onImageChange={handleImageChange}
          onClose={closeModal}
          onSubmit={handleSaveOffer}
          loading={loading}
        />
      )}

      {/* ==================================================================== */}
      {/* DELETE MODAL                                                         */}
      {/* ==================================================================== */}

      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          loading={loading}
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
    Number(offer.limit) > 0
      ? Math.min(
          (Number(offer.usage || 0) /
            Number(offer.limit)) *
            100,
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
              {offer.usage || 0}
            </span>

            <span className="text-[10px] text-slate-400">
              /{offer.limit || 0}
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
            onToggleStatus(offer._id)
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
              onToggleFeatured(offer._id)
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
              onDelete(offer._id)
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
    Number(offer.limit) > 0
      ? Math.min(
          (Number(offer.usage || 0) /
            Number(offer.limit)) *
            100,
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
              onToggleFeatured(offer._id)
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
              onToggleStatus(offer._id)
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
              {offer.usage || 0} /{" "}
              {offer.limit || 0}
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
              onToggleStatus(offer._id)
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
              onDelete(offer._id)
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
  onImageChange,
  onClose,
  onSubmit,
  loading,
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
              <FormLabel label="Offer Image" />

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  onImageChange(
                    event.target.files?.[0]
                  )
                }
                className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-blue-600"
              />

              <p className="mt-1 text-[11px] text-slate-400">
                {mode === "edit"
                  ? "Choose a new image only if you want to replace the existing image."
                  : "Upload an image for this offer."}
              </p>

              {form.imagePreview && (
                <div className="mt-3 h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-40">
                  <img
                    src={form.imagePreview}
                    alt="Offer preview"
                    className="h-full w-full object-cover"
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
              disabled={loading}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : mode === "add"
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
  loading,
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
            disabled={loading}
            className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-11 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Deleting..."
              : "Delete Offer"}
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

/* ========================================================================== */
/* DATE FORMAT FOR INPUT                                                      */
/* ========================================================================== */

function formatDateForInput(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default Offers;