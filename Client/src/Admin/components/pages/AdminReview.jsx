import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Check,
  X,
  Star,
  MessageSquare,
  MessageCircle,
  ThumbsUp,
  UserRound,
  CalendarDays,
  MapPin,
  Plane,
  Hotel,
  Package,
  Send,
  Flag,
  CheckCircle2,
  Clock3,
  XCircle,
  BarChart3,
  Users,
  Award,
} from "lucide-react";

/* =========================================================
   DUMMY REVIEWS
========================================================= */

const initialReviews = [
  {
    id: 1,
    customer: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    avatar: "",
    rating: 5,
    title: "Amazing travel experience!",
    review:
      "Everything was perfectly organized from booking to the actual trip. The flight and hotel arrangements were smooth and the support team was very helpful.",
    destination: "Dubai, UAE",
    service: "Flight Booking",
    date: "18 Sep 2026",
    status: "Published",
    helpful: 24,
    reply:
      "Thank you Rahul for your wonderful feedback. We are happy that you enjoyed your trip!",
  },
  {
    id: 2,
    customer: "Priya Singh",
    email: "priya.singh@gmail.com",
    avatar: "",
    rating: 5,
    title: "Beautiful Bali trip",
    review:
      "The Bali package was exactly as described. Hotels were clean, transfers were on time and the overall experience was excellent.",
    destination: "Bali, Indonesia",
    service: "Holiday Package",
    date: "17 Sep 2026",
    status: "Published",
    helpful: 31,
    reply: "",
  },
  {
    id: 3,
    customer: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    avatar: "",
    rating: 4,
    title: "Good hotel and service",
    review:
      "The hotel was comfortable and the booking process was very easy. The only issue was a small delay during check-in.",
    destination: "Goa, India",
    service: "Hotel Booking",
    date: "16 Sep 2026",
    status: "Pending",
    helpful: 8,
    reply: "",
  },
  {
    id: 4,
    customer: "Sneha Verma",
    email: "sneha.verma@gmail.com",
    avatar: "",
    rating: 5,
    title: "Excellent support",
    review:
      "The Tripora support team helped us throughout our trip. They responded quickly whenever we had any questions.",
    destination: "Paris, France",
    service: "Flight Booking",
    date: "15 Sep 2026",
    status: "Published",
    helpful: 19,
    reply:
      "Thank you Sneha! We are glad our support team could make your journey easier.",
  },
  {
    id: 5,
    customer: "Vikas Gupta",
    email: "vikas.gupta@gmail.com",
    avatar: "",
    rating: 3,
    title: "Average experience",
    review:
      "The package was good overall, but there were some changes in the itinerary. Communication could have been better.",
    destination: "Maldives",
    service: "Holiday Package",
    date: "14 Sep 2026",
    status: "Pending",
    helpful: 5,
    reply: "",
  },
  {
    id: 6,
    customer: "Anjali Patel",
    email: "anjali.patel@gmail.com",
    avatar: "",
    rating: 5,
    title: "Highly recommended",
    review:
      "Very easy booking experience. The price was reasonable and all the details were clearly provided before the trip.",
    destination: "Singapore",
    service: "Flight Booking",
    date: "13 Sep 2026",
    status: "Published",
    helpful: 28,
    reply: "",
  },
  {
    id: 7,
    customer: "Rohit Mehta",
    email: "rohit.mehta@gmail.com",
    avatar: "",
    rating: 2,
    title: "Needs improvement",
    review:
      "The booking process was okay, but I faced some problems with the hotel service. The support response was also delayed.",
    destination: "Manali, India",
    service: "Hotel Booking",
    date: "12 Sep 2026",
    status: "Rejected",
    helpful: 3,
    reply: "",
  },
  {
    id: 8,
    customer: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    avatar: "",
    rating: 5,
    title: "Wonderful Switzerland trip",
    review:
      "Our Switzerland holiday was fantastic. The hotels, transfers and overall itinerary were very well managed.",
    destination: "Switzerland",
    service: "Holiday Package",
    date: "11 Sep 2026",
    status: "Published",
    helpful: 42,
    reply:
      "Thank you Neha! We are delighted that you had a wonderful Switzerland experience.",
  },
  {
    id: 9,
    customer: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    avatar: "",
    rating: 4,
    title: "Smooth booking",
    review:
      "The flight booking process was quick and simple. I received all the booking information immediately.",
    destination: "Thailand",
    service: "Flight Booking",
    date: "10 Sep 2026",
    status: "Published",
    helpful: 14,
    reply: "",
  },
  {
    id: 10,
    customer: "Pooja Sharma",
    email: "pooja.sharma@gmail.com",
    avatar: "",
    rating: 5,
    title: "Great family vacation",
    review:
      "The Kashmir package was perfect for our family. Everything was organized well and we had a memorable trip.",
    destination: "Kashmir, India",
    service: "Holiday Package",
    date: "09 Sep 2026",
    status: "Pending",
    helpful: 17,
    reply: "",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getAvatarStyle = (name) => {
  const styles = [
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
  ];

  const index =
    name?.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    styles.length;

  return styles[index];
};

/* =========================================================
   STAR RATING
========================================================= */

function StarRating({ rating, size = 15, showNumber = false }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < rating ? "currentColor" : "none"}
          className={
            index < rating
              ? "text-amber-400"
              : "text-slate-300"
          }
        />
      ))}

      {showNumber && (
        <span className="ml-1 text-xs font-semibold text-slate-600">
          {rating}.0
        </span>
      )}
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function ReviewStatusBadge({ status }) {
  const config = {
    Published: {
      className: "bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    },
    Pending: {
      className: "bg-amber-50 text-amber-700",
      icon: Clock3,
    },
    Rejected: {
      className: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  };

  const current = config[status] || config.Pending;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${current.className}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

/* =========================================================
   SERVICE BADGE
========================================================= */

function ServiceBadge({ service }) {
  const Icon =
    service === "Flight Booking"
      ? Plane
      : service === "Hotel Booking"
      ? Hotel
      : Package;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
      <Icon size={14} className="text-slate-400" />
      {service}
    </span>
  );
}

/* =========================================================
   USER AVATAR
========================================================= */

function UserAvatar({ review, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${
        large ? "h-14 w-14 text-base" : "h-10 w-10 text-xs"
      } ${getAvatarStyle(review.customer)}`}
    >
      {getInitials(review.customer)}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  title,
  subtitle,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-5">
      <div
        className={`max-h-[95vh] w-full ${maxWidth} overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="min-w-0 pr-4">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="max-h-[calc(95vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VIEW REVIEW MODAL
========================================================= */

function ViewReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <Modal
      title="Review Details"
      subtitle="Complete customer review information"
      onClose={onClose}
    >
      <div className="p-4 sm:p-6">
        {/* CUSTOMER */}
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-5 text-center sm:flex-row sm:text-left">
          <UserAvatar review={review} large />

          <div className="mt-4 min-w-0 sm:ml-4 sm:mt-0">
            <h3 className="text-lg font-bold text-slate-900">
              {review.customer}
            </h3>

            <p className="mt-1 break-all text-sm text-slate-500">
              {review.email}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <ReviewStatusBadge status={review.status} />
              <ServiceBadge service={review.service} />
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="mt-5 rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-400">
            Customer Rating
          </p>

          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={review.rating} size={20} />

            <span className="text-sm font-bold text-slate-800">
              {review.rating}.0 / 5
            </span>
          </div>
        </div>

        {/* REVIEW */}
        <div className="mt-4 rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-400">
            Review Title
          </p>

          <h3 className="mt-1 text-base font-bold text-slate-900">
            {review.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {review.review}
          </p>
        </div>

        {/* INFORMATION */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailItem
            icon={MapPin}
            label="Destination"
            value={review.destination}
          />

          <DetailItem
            icon={CalendarDays}
            label="Review Date"
            value={review.date}
          />

          <DetailItem
            icon={MessageCircle}
            label="Helpful Votes"
            value={`${review.helpful} people found this helpful`}
          />

          <DetailItem
            icon={ServiceIcon}
            label="Service"
            value={review.service}
          />
        </div>

        {/* ADMIN REPLY */}
        {review.reply && (
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2">
              <MessageSquare
                size={17}
                className="text-blue-600"
              />

              <p className="text-sm font-bold text-blue-900">
                Admin Reply
              </p>
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              {review.reply}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   SERVICE ICON
========================================================= */

function ServiceIcon({ size = 16, className = "" }) {
  return (
    <Plane size={size} className={className} />
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   REPLY MODAL
========================================================= */

function ReplyModal({
  review,
  replyText,
  setReplyText,
  onClose,
  onSubmit,
}) {
  if (!review) return null;

  return (
    <Modal
      title="Reply to Review"
      subtitle={`Send a reply to ${review.customer}`}
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="p-4 sm:p-6">
        {/* REVIEW PREVIEW */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <UserAvatar review={review} />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {review.customer}
              </p>

              <StarRating
                rating={review.rating}
                size={13}
              />
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            "{review.review}"
          </p>
        </div>

        {/* TEXTAREA */}
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Your Reply
          </label>

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={5}
            placeholder="Write your response to the customer..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!replyText.trim()}
            onClick={onSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Send size={16} />
            Send Reply
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({ review, onClose, onDelete }) {
  if (!review) return null;

  return (
    <Modal
      title="Delete Review"
      subtitle="This action cannot be undone."
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 size={25} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            Delete this review?
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Are you sure you want to permanently delete the
            review submitted by{" "}
            <span className="font-semibold text-slate-700">
              {review.customer}
            </span>
            ?
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
          >
            Delete Review
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function ReviewActions({
  review,
  onView,
  onApprove,
  onReject,
  onReply,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
      >
        <MoreVertical size={17} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onView(review);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Review
            </button>

            {review.status !== "Published" && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onApprove(review);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-emerald-600 hover:bg-emerald-50"
              >
                <Check size={16} />
                Approve
              </button>
            )}

            {review.status !== "Rejected" && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onReject(review);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-amber-600 hover:bg-amber-50"
              >
                <Flag size={16} />
                Reject
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onReply(review);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              <MessageSquare size={16} />
              Reply
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete(review);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete Review
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AdminReview() {
  const [reviews, setReviews] = useState(initialReviews);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");

  const [showFilters, setShowFilters] = useState(false);

  const [viewReview, setViewReview] = useState(null);
  const [replyReview, setReplyReview] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);

  const [replyText, setReplyText] = useState("");

  /* =======================================================
     STATS
  ======================================================= */

  const totalReviews = reviews.length;

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.customer.toLowerCase().includes(query) ||
        review.email.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query) ||
        review.review.toLowerCase().includes(query) ||
        review.destination.toLowerCase().includes(query);

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      const matchesStatus =
        statusFilter === "All" ||
        review.status === statusFilter;

      const matchesService =
        serviceFilter === "All" ||
        review.service === serviceFilter;

      return (
        matchesSearch &&
        matchesRating &&
        matchesStatus &&
        matchesService
      );
    });
  }, [
    reviews,
    search,
    ratingFilter,
    statusFilter,
    serviceFilter,
  ]);

  const hasFilters =
    search ||
    ratingFilter !== "All" ||
    statusFilter !== "All" ||
    serviceFilter !== "All";

  /* =======================================================
     ACTIONS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setRatingFilter("All");
    setStatusFilter("All");
    setServiceFilter("All");
  };

  const updateReviewStatus = (review, status) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === review.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const handleApprove = (review) => {
    updateReviewStatus(review, "Published");
  };

  const handleReject = (review) => {
    updateReviewStatus(review, "Rejected");
  };

  const openReply = (review) => {
    setReplyReview(review);
    setReplyText(review.reply || "");
  };

  const handleReply = () => {
    if (!replyReview || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((item) =>
        item.id === replyReview.id
          ? {
              ...item,
              reply: replyText.trim(),
              status: "Published",
            }
          : item
      )
    );

    setReplyReview(null);
    setReplyText("");
  };

  const handleDelete = () => {
    if (!deleteReview) return;

    setReviews((prev) =>
      prev.filter((item) => item.id !== deleteReview.id)
    );

    setDeleteReview(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Reviews
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage customer reviews and feedback across Tripora.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm sm:flex">
            <Award size={17} className="text-amber-500" />
            Average Rating: {averageRating}
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <StatCard
            icon={MessageSquare}
            title="Total Reviews"
            value={totalReviews}
            description="All customer reviews"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={CheckCircle2}
            title="Published"
            value={publishedReviews}
            description="Visible to customers"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={Clock3}
            title="Pending Reviews"
            value={pendingReviews}
            description="Awaiting moderation"
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            icon={Star}
            title="Average Rating"
            value={averageRating}
            description="Overall customer rating"
            iconClass="bg-violet-50 text-violet-600"
          />
        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6">
          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div className="border-b border-slate-200 p-3 sm:p-4 lg:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, review, destination..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MOBILE FILTER */}
              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 lg:hidden"
              >
                <Filter size={17} />
                Filters
              </button>

              {/* DESKTOP FILTERS */}
              <div className="hidden items-center gap-2 lg:flex">
                <FilterSelect
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  options={[
                    ["All", "All Ratings"],
                    ["5", "5 Stars"],
                    ["4", "4 Stars"],
                    ["3", "3 Stars"],
                    ["2", "2 Stars"],
                    ["1", "1 Star"],
                  ]}
                />

                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    ["All", "All Status"],
                    ["Published", "Published"],
                    ["Pending", "Pending"],
                    ["Rejected", "Rejected"],
                  ]}
                />

                <FilterSelect
                  value={serviceFilter}
                  onChange={setServiceFilter}
                  options={[
                    ["All", "All Services"],
                    ["Flight Booking", "Flights"],
                    ["Hotel Booking", "Hotels"],
                    ["Holiday Package", "Packages"],
                  ]}
                />
              </div>
            </div>

            {/* MOBILE FILTERS */}
            {showFilters && (
              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-3 lg:hidden">
                <FilterSelect
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  options={[
                    ["All", "All Ratings"],
                    ["5", "5 Stars"],
                    ["4", "4 Stars"],
                    ["3", "3 Stars"],
                    ["2", "2 Stars"],
                    ["1", "1 Star"],
                  ]}
                  mobile
                />

                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    ["All", "All Status"],
                    ["Published", "Published"],
                    ["Pending", "Pending"],
                    ["Rejected", "Rejected"],
                  ]}
                  mobile
                />

                <FilterSelect
                  value={serviceFilter}
                  onChange={setServiceFilter}
                  options={[
                    ["All", "All Services"],
                    ["Flight Booking", "Flights"],
                    ["Hotel Booking", "Hotels"],
                    ["Holiday Package", "Packages"],
                  ]}
                  mobile
                />
              </div>
            )}

            {/* RESULT COUNT */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500 sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredReviews.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {reviews.length}
                </span>{" "}
                reviews
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Review
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Rating
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >
                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar review={review} />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {review.customer}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {review.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* REVIEW */}
                      <td className="max-w-[300px] px-5 py-4">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {review.title}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                          {review.review}
                        </p>
                      </td>

                      {/* SERVICE */}
                      <td className="px-5 py-4">
                        <ServiceBadge service={review.service} />

                        <p className="mt-1 text-xs text-slate-400">
                          {review.destination}
                        </p>
                      </td>

                      {/* RATING */}
                      <td className="px-5 py-4">
                        <StarRating
                          rating={review.rating}
                          size={14}
                        />

                        <p className="mt-1 text-xs text-slate-400">
                          {review.helpful} helpful
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <ReviewStatusBadge
                          status={review.status}
                        />
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {review.date}
                        </p>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <ReviewActions
                            review={review}
                            onView={setViewReview}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onReply={openReply}
                            onDelete={setDeleteReview}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              MOBILE + TABLET
          ================================================= */}

          <div className="p-3 sm:p-4 lg:hidden">
            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar review={review} />

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {review.customer}
                          </h3>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {review.email}
                          </p>
                        </div>
                      </div>

                      <ReviewActions
                        review={review}
                        onView={setViewReview}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onReply={openReply}
                        onDelete={setDeleteReview}
                      />
                    </div>

                    {/* RATING + STATUS */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <StarRating
                        rating={review.rating}
                        size={15}
                      />

                      <ReviewStatusBadge
                        status={review.status}
                      />
                    </div>

                    {/* REVIEW CONTENT */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <h4 className="text-sm font-bold text-slate-800">
                        {review.title}
                      </h4>

                      <p className="mt-2 line-clamp-4 text-xs leading-5 text-slate-600">
                        {review.review}
                      </p>
                    </div>

                    {/* INFO */}
                    <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Service
                        </span>

                        <ServiceBadge service={review.service} />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Destination
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {review.destination}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Date
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {review.date}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Helpful
                        </span>

                        <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                          <ThumbsUp size={13} />
                          {review.helpful}
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setViewReview(review)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => openReply(review)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        <MessageSquare size={14} />
                        Reply
                      </button>

                      {review.status !== "Published" && (
                        <button
                          type="button"
                          onClick={() => handleApprove(review)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                          title="Approve"
                        >
                          <Check size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                hasFilters={hasFilters}
                onClear={clearFilters}
              />
            )}
          </div>

          {/* =================================================
              DESKTOP EMPTY
          ================================================= */}

          {filteredReviews.length === 0 && (
            <div className="hidden lg:block">
              <EmptyState
                hasFilters={hasFilters}
                onClear={clearFilters}
              />
            </div>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          {filteredReviews.length > 0 && (
            <div className="border-t border-slate-200 px-4 py-3 sm:px-5">
              <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Total{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredReviews.length}
                  </span>{" "}
                  reviews displayed
                </p>

                <p className="flex items-center gap-1">
                  <Star
                    size={13}
                    fill="currentColor"
                    className="text-amber-400"
                  />

                  Average rating:{" "}
                  <span className="font-semibold text-slate-700">
                    {averageRating}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewReview && (
        <ViewReviewModal
          review={viewReview}
          onClose={() => setViewReview(null)}
        />
      )}

      {/* =====================================================
          REPLY MODAL
      ===================================================== */}

      {replyReview && (
        <ReplyModal
          review={replyReview}
          replyText={replyText}
          setReplyText={setReplyText}
          onClose={() => {
            setReplyReview(null);
            setReplyText("");
          }}
          onSubmit={handleReply}
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteReview && (
        <DeleteModal
          review={deleteReview}
          onClose={() => setDeleteReview(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
  mobile = false,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          mobile
            ? "form-input appearance-none pr-9"
            : "h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
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

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ hasFilters, onClear }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <MessageSquare size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No reviews found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        No reviews match your current search or filter selection.
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}