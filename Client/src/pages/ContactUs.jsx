import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Ticket,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingId: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "How can I cancel my booking?",
      answer:
        "You can cancel your booking from the My Bookings section. Open the booking you want to cancel and follow the cancellation instructions. Applicable cancellation charges depend on the booking terms.",
    },
    {
      question: "How long does a refund take?",
      answer:
        "Refund processing time depends on the service provider and your payment method. Once Tripora processes the refund, it may take additional time for the amount to appear in your account.",
    },
    {
      question: "Where can I find my booking details?",
      answer:
        "You can find your confirmed bookings from the My Bookings section of your Tripora account. Open any booking to view its complete travel and payment details.",
    },
    {
      question: "What should I do if my payment failed?",
      answer:
        "First check whether the payment amount was deducted. If it was deducted but the booking was not confirmed, contact our support team with your transaction details so we can assist you.",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      bookingId: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-6 lg:px-8 lg:py-4">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-blue-100">
            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-white">
              Contact Us
            </span>
          </div>

          {/* Hero Content */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
              <Headphones size={26} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">
              Tripora Support
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              We're here to help
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Have a question about your booking? Our support team
              is ready to help you with bookings, payments,
              cancellations and more.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO CARDS
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section className="-mt-16 relative z-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Support */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Headphones size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Customer Support
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Get help with your bookings and travel plans.
                  </p>

                  <p className="mt-2 text-sm font-medium text-blue-600">
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email Us
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Send us your question and we'll get back to you.
                  </p>

                  <a
                    href="mailto:support@tripora.com"
                    className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    support@tripora.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock3 size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Support Hours
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Our support team is available whenever you
                    need us.
                  </p>

                  <p className="mt-2 text-sm font-medium text-blue-600">
                    24/7 Assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT FORM + HELP CARD
        ====================================================== */}
        <section className="mt-4">
          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
            {/* Contact Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-7">
              <div className="mb-7">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MessageSquare size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in the form below and our support team will
                  get back to you as soon as possible.
                </p>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Message sent successfully!
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Thank you for contacting Tripora. Our support
                      team will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Booking ID + Subject */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="bookingId"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Booking ID{" "}
                      <span className="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <input
                      id="bookingId"
                      name="bookingId"
                      type="text"
                      value={formData.bookingId}
                      onChange={handleChange}
                      placeholder="Enter booking ID"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="">
                        Select a subject
                      </option>

                      <option value="booking">
                        Booking Assistance
                      </option>

                      <option value="cancellation">
                        Cancellation
                      </option>

                      <option value="refund">
                        Refund
                      </option>

                      <option value="payment">
                        Payment Issue
                      </option>

                      <option value="modification">
                        Booking Modification
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    We usually respond within 15–30 minutes.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Help Card */}
            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <Headphones size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    How can we help?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Our support team can help you with almost
                    everything related to your Tripora journey.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "Booking assistance",
                      "Cancellation & refund",
                      "Payment issues",
                      "Flight & hotel changes",
                      "Holiday package assistance",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-white"
                      >
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-blue-200"
                        />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-white/15 pt-5">
                    <p className="text-xs text-blue-100">
                      Average response time
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      15–30 minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Ticket size={21} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Need help with a booking?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Check your booking details, manage your
                  reservation or find your ticket.
                </p>

                <Link
                  to="/my-bookings"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Manage My Booking
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Location Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Tripora Office
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Tripora Travel Services
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ SECTION
        ====================================================== */}
        <section className="mt-4">
          <div className="mb-3 text-center">
            <p className="text-sm font-semibold text-blue-600">
              QUICK ANSWERS
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Before contacting us
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              You may find the answer to your question in our most
              frequently asked questions.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <MessageSquare size={15} />
                      </div>

                      <span className="text-sm font-semibold text-slate-800 sm:text-base">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 text-blue-600"
                          : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pl-16 sm:px-6 sm:pb-6 sm:pl-[68px]">
                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-center">
            <Link
              to="/helpcenter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Visit Help Center
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-6 sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                  <CheckCircle2 size={14} />
                  Tripora Support
                </div>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Need urgent assistance?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  We're here to make your travel experience
                  simple, secure and stress-free.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/helpcenter"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Help Center
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/refundpolicy"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Refund Policy
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;