import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Eye,
  RefreshCcw,
  X,
  Copy,
  Check,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  CircleDollarSign,
  TrendingUp,
  Clock3,
  XCircle,
  RotateCcw,
  CalendarDays,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Hash,
  ReceiptText,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

/* =========================================================
   DUMMY PAYMENT DATA
========================================================= */

const initialPayments = [
  {
    id: 1,
    transactionId: "TRP-TXN-982341",
    bookingId: "TRP15684742",
    customer: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    destination: "Dubai, UAE",
    service: "Flight Booking",
    amount: 28500,
    paymentMethod: "UPI",
    status: "Success",
    date: "18 Sep 2026",
    time: "11:42 AM",
    refundStatus: "Not Requested",
  },
  {
    id: 2,
    transactionId: "TRP-TXN-982342",
    bookingId: "TRP15684743",
    customer: "Priya Singh",
    email: "priya.singh@gmail.com",
    phone: "+91 91234 56789",
    destination: "Bali, Indonesia",
    service: "Holiday Package",
    amount: 64800,
    paymentMethod: "Credit Card",
    status: "Success",
    date: "18 Sep 2026",
    time: "10:28 AM",
    refundStatus: "Not Requested",
  },
  {
    id: 3,
    transactionId: "TRP-TXN-982343",
    bookingId: "TRP15684744",
    customer: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    phone: "+91 99887 66554",
    destination: "Goa, India",
    service: "Hotel Booking",
    amount: 12400,
    paymentMethod: "Net Banking",
    status: "Pending",
    date: "18 Sep 2026",
    time: "09:15 AM",
    refundStatus: "Not Requested",
  },
  {
    id: 4,
    transactionId: "TRP-TXN-982344",
    bookingId: "TRP15684745",
    customer: "Sneha Verma",
    email: "sneha.verma@gmail.com",
    phone: "+91 98712 34567",
    destination: "Paris, France",
    service: "Flight Booking",
    amount: 84500,
    paymentMethod: "Credit Card",
    status: "Failed",
    date: "17 Sep 2026",
    time: "07:45 PM",
    refundStatus: "Not Requested",
  },
  {
    id: 5,
    transactionId: "TRP-TXN-982345",
    bookingId: "TRP15684746",
    customer: "Vikas Gupta",
    email: "vikas.gupta@gmail.com",
    phone: "+91 90909 87654",
    destination: "Maldives",
    service: "Holiday Package",
    amount: 92500,
    paymentMethod: "UPI",
    status: "Refunded",
    date: "17 Sep 2026",
    time: "05:32 PM",
    refundStatus: "Completed",
  },
  {
    id: 6,
    transactionId: "TRP-TXN-982346",
    bookingId: "TRP15684747",
    customer: "Anjali Patel",
    email: "anjali.patel@gmail.com",
    phone: "+91 98123 45678",
    destination: "Singapore",
    service: "Flight Booking",
    amount: 35700,
    paymentMethod: "Debit Card",
    status: "Success",
    date: "17 Sep 2026",
    time: "02:20 PM",
    refundStatus: "Not Requested",
  },
  {
    id: 7,
    transactionId: "TRP-TXN-982347",
    bookingId: "TRP15684748",
    customer: "Rohit Mehta",
    email: "rohit.mehta@gmail.com",
    phone: "+91 97654 32109",
    destination: "Manali, India",
    service: "Hotel Booking",
    amount: 8900,
    paymentMethod: "UPI",
    status: "Success",
    date: "16 Sep 2026",
    time: "08:18 PM",
    refundStatus: "Not Requested",
  },
  {
    id: 8,
    transactionId: "TRP-TXN-982348",
    bookingId: "TRP15684749",
    customer: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "+91 93456 78901",
    destination: "Switzerland",
    service: "Holiday Package",
    amount: 118000,
    paymentMethod: "Credit Card",
    status: "Success",
    date: "16 Sep 2026",
    time: "04:12 PM",
    refundStatus: "Not Requested",
  },
  {
    id: 9,
    transactionId: "TRP-TXN-982349",
    bookingId: "TRP15684750",
    customer: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    phone: "+91 92123 45678",
    destination: "Thailand",
    service: "Flight Booking",
    amount: 42500,
    paymentMethod: "Wallet",
    status: "Pending",
    date: "15 Sep 2026",
    time: "12:40 PM",
    refundStatus: "Not Requested",
  },
  {
    id: 10,
    transactionId: "TRP-TXN-982350",
    bookingId: "TRP15684751",
    customer: "Pooja Sharma",
    email: "pooja.sharma@gmail.com",
    phone: "+91 98765 11223",
    destination: "Kashmir, India",
    service: "Holiday Package",
    amount: 38500,
    paymentMethod: "UPI",
    status: "Success",
    date: "15 Sep 2026",
    time: "10:05 AM",
    refundStatus: "Not Requested",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
};

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
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 flex items-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {title !== "Total Transactions" &&
              title !== "Pending Payments" &&
              title !== "Failed Payments" && (
                <IndianRupee size={20} className="mr-0.5 sm:h-6 sm:w-6" />
              )}

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
   STATUS BADGE
========================================================= */

function PaymentStatusBadge({ status }) {
  const config = {
    Success: {
      className: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      icon: CheckCircle2,
    },
    Pending: {
      className: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
      icon: Clock3,
    },
    Failed: {
      className: "bg-red-50 text-red-700",
      dot: "bg-red-500",
      icon: XCircle,
    },
    Refunded: {
      className: "bg-violet-50 text-violet-700",
      dot: "bg-violet-500",
      icon: RotateCcw,
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
   PAYMENT METHOD
========================================================= */

function PaymentMethodBadge({ method }) {
  const getIcon = () => {
    if (method === "UPI") return Smartphone;
    if (method === "Credit Card") return CreditCard;
    if (method === "Debit Card") return CreditCard;
    if (method === "Net Banking") return Banknote;
    if (method === "Wallet") return Wallet;

    return CircleDollarSign;
  };

  const Icon = getIcon();

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
      <Icon size={15} className="text-slate-400" />
      {method}
    </span>
  );
}

/* =========================================================
   USER AVATAR
========================================================= */

function UserAvatar({ payment, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${
        large ? "h-14 w-14 text-base" : "h-10 w-10 text-xs"
      } ${getAvatarStyle(payment.customer)}`}
    >
      {getInitials(payment.customer)}
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({ title, subtitle, onClose, children, maxWidth = "max-w-2xl" }) {
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
   PAYMENT DETAILS MODAL
========================================================= */

function PaymentDetailsModal({ payment, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!payment) return null;

  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(payment.transactionId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.log("Copy failed");
    }
  };

  return (
    <Modal
      title="Payment Details"
      subtitle="Complete transaction information"
      onClose={onClose}
    >
      <div className="p-4 sm:p-6">
        {/* TOP USER */}
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-5 text-center sm:flex-row sm:text-left">
          <UserAvatar payment={payment} large />

          <div className="mt-4 min-w-0 sm:ml-4 sm:mt-0">
            <h3 className="text-lg font-bold text-slate-900">
              {payment.customer}
            </h3>

            <p className="mt-1 break-all text-sm text-slate-500">
              {payment.email}
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <PaymentStatusBadge status={payment.status} />
              <PaymentMethodBadge method={payment.paymentMethod} />
            </div>
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mt-4 rounded-2xl bg-blue-600 p-5 text-white">
          <p className="text-sm text-blue-100">Payment Amount</p>

          <p className="mt-1 flex items-center text-3xl font-bold">
            <IndianRupee size={25} />
            {formatCurrency(payment.amount)}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100">
            <span>{payment.service}</span>
            <span>•</span>
            <span>{payment.destination}</span>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailItem
            icon={Hash}
            label="Transaction ID"
            value={
              <div className="flex items-center gap-2">
                <span className="break-all">{payment.transactionId}</span>

                <button
                  type="button"
                  onClick={copyTransactionId}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200"
                  title="Copy transaction ID"
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            }
          />

          <DetailItem
            icon={ReceiptText}
            label="Booking ID"
            value={payment.bookingId}
          />

          <DetailItem
            icon={CalendarDays}
            label="Payment Date"
            value={payment.date}
          />

          <DetailItem
            icon={Clock3}
            label="Payment Time"
            value={payment.time}
          />

          <DetailItem
            icon={MapPin}
            label="Destination"
            value={payment.destination}
          />

          <DetailItem
            icon={CreditCard}
            label="Payment Method"
            value={payment.paymentMethod}
          />
        </div>

        {/* CUSTOMER */}
        <div className="mt-5 rounded-xl border border-slate-200 p-4">
          <p className="mb-3 text-sm font-bold text-slate-900">
            Customer Information
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex min-w-0 items-center gap-2">
              <Mail size={16} className="shrink-0 text-slate-400" />

              <span className="truncate text-sm text-slate-600">
                {payment.email}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-slate-400" />

              <span className="text-sm text-slate-600">
                {payment.phone}
              </span>
            </div>
          </div>
        </div>

        {/* REFUND */}
        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Refund Status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current refund information
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {payment.refundStatus}
            </span>
          </div>
        </div>

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
   DETAIL ITEM
========================================================= */

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />
        <span className="text-xs font-medium">{label}</span>
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   REFUND MODAL
========================================================= */

function RefundModal({ payment, onClose, onConfirm }) {
  if (!payment) return null;

  return (
    <Modal
      title="Refund Payment"
      subtitle="Review the payment before processing refund"
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="p-4 sm:p-6">
        <div className="rounded-2xl bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <RefreshCcw size={19} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-red-900">
                Confirm Refund
              </h3>

              <p className="mt-1 text-xs leading-5 text-red-700">
                You are about to refund this payment. This action should
                only be performed after verifying the booking cancellation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Customer</span>

            <span className="text-right text-sm font-semibold text-slate-800">
              {payment.customer}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">
              Transaction
            </span>

            <span className="text-right text-xs font-semibold text-slate-800">
              {payment.transactionId}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">
              Refund Amount
            </span>

            <span className="flex items-center text-lg font-bold text-slate-900">
              <IndianRupee size={17} />
              {formatCurrency(payment.amount)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
          >
            <RefreshCcw size={16} />
            Process Refund
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function PaymentActions({
  payment,
  onView,
  onRefund,
}) {
  const [open, setOpen] = useState(false);

  const canRefund =
    payment.status === "Success" &&
    payment.refundStatus !== "Completed";

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
                onView(payment);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Payment
            </button>

            {canRefund && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onRefund(payment);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <RefreshCcw size={16} />
                Refund Payment
              </button>
            )}
          </div>
        </>
      )}
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
        <CircleDollarSign size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No payments found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        No payment transactions match your current search or filter
        selection.
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

/* =========================================================
   MAIN PAYMENTS PAGE
========================================================= */

export default function AdminPayment() {
  const [payments, setPayments] = useState(initialPayments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");

  const [showFilters, setShowFilters] = useState(false);

  const [viewPayment, setViewPayment] = useState(null);
  const [refundPayment, setRefundPayment] = useState(null);

  const totalRevenue = payments
    .filter((payment) => payment.status === "Success")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalTransactions = payments.length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.customer.toLowerCase().includes(query) ||
        payment.email.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query) ||
        payment.bookingId.toLowerCase().includes(query) ||
        payment.destination.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ||
        payment.paymentMethod === methodFilter;

      const matchesService =
        serviceFilter === "All" ||
        payment.service === serviceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesService
      );
    });
  }, [
    payments,
    search,
    statusFilter,
    methodFilter,
    serviceFilter,
  ]);

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    methodFilter !== "All" ||
    serviceFilter !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
    setServiceFilter("All");
  };

  const handleRefund = () => {
    if (!refundPayment) return;

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === refundPayment.id
          ? {
              ...payment,
              status: "Refunded",
              refundStatus: "Completed",
            }
          : payment
      )
    );

    setRefundPayment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-3 flex flex-col gap-4 sm:mb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all Tripora payment transactions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm sm:flex">
              <TrendingUp size={17} className="text-emerald-500" />
              Payment Overview
            </div>
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4 lg:gap-4">
          <StatCard
            icon={CircleDollarSign}
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            description="Successful payments"
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={ReceiptText}
            title="Total Transactions"
            value={totalTransactions}
            description="All payment records"
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            icon={Clock3}
            title="Pending Payments"
            value={pendingPayments}
            description="Awaiting confirmation"
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            icon={XCircle}
            title="Failed Payments"
            value={failedPayments}
            description="Unsuccessful transactions"
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-4">
          {/* =================================================
              SEARCH / FILTER
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
                  placeholder="Search customer, transaction, booking..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MOBILE FILTER BUTTON */}
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
                {/* STATUS */}
                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    ["All", "All Status"],
                    ["Success", "Success"],
                    ["Pending", "Pending"],
                    ["Failed", "Failed"],
                    ["Refunded", "Refunded"],
                  ]}
                />

                {/* METHOD */}
                <FilterSelect
                  value={methodFilter}
                  onChange={setMethodFilter}
                  options={[
                    ["All", "All Methods"],
                    ["UPI", "UPI"],
                    ["Credit Card", "Credit Card"],
                    ["Debit Card", "Debit Card"],
                    ["Net Banking", "Net Banking"],
                    ["Wallet", "Wallet"],
                  ]}
                />

                {/* SERVICE */}
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
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    ["All", "All Status"],
                    ["Success", "Success"],
                    ["Pending", "Pending"],
                    ["Failed", "Failed"],
                    ["Refunded", "Refunded"],
                  ]}
                  mobile
                />

                <FilterSelect
                  value={methodFilter}
                  onChange={setMethodFilter}
                  options={[
                    ["All", "All Methods"],
                    ["UPI", "UPI"],
                    ["Credit Card", "Credit Card"],
                    ["Debit Card", "Debit Card"],
                    ["Net Banking", "Net Banking"],
                    ["Wallet", "Wallet"],
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

            {/* RESULTS */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500 sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredPayments.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {payments.length}
                </span>{" "}
                payments
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
              <table className="w-full min-w-[1150px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Transaction
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Method
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
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >
                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar payment={payment} />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {payment.customer}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {payment.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* TRANSACTION */}
                      <td className="px-5 py-4">
                        <p className="text-xs font-bold text-slate-700">
                          {payment.transactionId}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {payment.bookingId}
                        </p>
                      </td>

                      {/* SERVICE */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {payment.service}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {payment.destination}
                        </p>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-4">
                        <p className="flex items-center text-sm font-bold text-slate-900">
                          <IndianRupee size={14} />
                          {formatCurrency(payment.amount)}
                        </p>
                      </td>

                      {/* METHOD */}
                      <td className="px-5 py-4">
                        <PaymentMethodBadge
                          method={payment.paymentMethod}
                        />
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <PaymentStatusBadge
                          status={payment.status}
                        />
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {payment.date}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {payment.time}
                        </p>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <PaymentActions
                            payment={payment}
                            onView={setViewPayment}
                            onRefund={setRefundPayment}
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
              MOBILE + TABLET CARDS
          ================================================= */}

          <div className="p-3 sm:p-4 lg:hidden">
            {filteredPayments.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar payment={payment} />

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {payment.customer}
                          </h3>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {payment.email}
                          </p>
                        </div>
                      </div>

                      <PaymentActions
                        payment={payment}
                        onView={setViewPayment}
                        onRefund={setRefundPayment}
                      />
                    </div>

                    {/* STATUS */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <PaymentStatusBadge
                        status={payment.status}
                      />

                      <PaymentMethodBadge
                        method={payment.paymentMethod}
                      />
                    </div>

                    {/* AMOUNT */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-400">
                            Payment Amount
                          </p>

                          <p className="mt-1 flex items-center text-lg font-bold text-slate-900">
                            <IndianRupee size={16} />
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">
                            Service
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            {payment.service}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Transaction
                        </span>

                        <span className="max-w-[60%] truncate text-right text-xs font-semibold text-slate-700">
                          {payment.transactionId}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Booking ID
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {payment.bookingId}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Destination
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {payment.destination}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">
                          Date
                        </span>

                        <span className="text-right text-xs font-medium text-slate-700">
                          {payment.date}
                        </span>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setViewPayment(payment)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      {payment.status === "Success" &&
                        payment.refundStatus !== "Completed" && (
                          <button
                            type="button"
                            onClick={() =>
                              setRefundPayment(payment)
                            }
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            <RefreshCcw size={14} />
                            Refund
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

          {filteredPayments.length === 0 && (
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

          {filteredPayments.length > 0 && (
            <div className="border-t border-slate-200 px-4 py-3 sm:px-5">
              <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Total{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredPayments.length}
                  </span>{" "}
                  payments displayed
                </p>

                <p>
                  Successful Revenue:{" "}
                  <span className="font-semibold text-emerald-600">
                    ₹{formatCurrency(totalRevenue)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          PAYMENT DETAILS MODAL
      ===================================================== */}

      {viewPayment && (
        <PaymentDetailsModal
          payment={viewPayment}
          onClose={() => setViewPayment(null)}
        />
      )}

      {/* =====================================================
          REFUND MODAL
      ===================================================== */}

      {refundPayment && (
        <RefundModal
          payment={refundPayment}
          onClose={() => setRefundPayment(null)}
          onConfirm={handleRefund}
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