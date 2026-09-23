// app/admin/orders/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
    IoArrowBack,
    IoCallOutline,
    IoLogoWhatsapp,
    IoLocationOutline,
    IoPersonOutline,
    IoMailOutline,
    IoCubeOutline,
    IoDocumentTextOutline,
    IoSaveOutline,
} from "react-icons/io5";

import { adminFetch } from "@/lib/adminApi";
import {
    OrderStatusBadge,
    PaymentStatusBadge,
} from "@/components/admin/OrderStatusBadge";

const STATUS_OPTIONS = [
    { value: "pending", label: "পেন্ডিং" },
    { value: "confirmed", label: "কনফার্মড" },
    { value: "processing", label: "প্রসেসিং" },
    { value: "shipped", label: "শিপড" },
    { value: "delivered", label: "ডেলিভারড" },
    { value: "cancelled", label: "বাতিল" },
];

const PAYMENT_OPTIONS = [
    { value: "cod-pending", label: "COD বাকি" },
    { value: "unpaid", label: "অপরিশোধিত" },
    { value: "paid", label: "পরিশোধিত" },
    { value: "failed", label: "ব্যর্থ" },
];

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const Section = ({ title, icon: Icon, children }) => (
    <section className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            {Icon && <Icon className="w-4 h-4 text-primary" />}
            <h2 className="font-heading text-base font-bold text-foreground">
                {title}
            </h2>
        </div>
        {children}
    </section>
);

export default function AdminOrderDetailPage() {
    const router = useRouter();
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [note, setNote] = useState("");

    const [savingStatus, setSavingStatus] = useState(false);
    const [savingPayment, setSavingPayment] = useState(false);
    const [savingNote, setSavingNote] = useState(false);

    // ─── Load order ───
    useEffect(() => {
        if (!id) return;

        const load = async () => {
            const { ok, data } = await adminFetch(`/orders/${id}`);
            if (!ok) {
                toast.error(data.message || "অর্ডার পাওয়া যায়নি");
                router.push("/admin/orders");
                return;
            }
            setOrder(data);
            setStatus(data.orderStatus || "pending");
            setPaymentStatus(data.paymentStatus || "cod-pending");
            setNote(data.adminNote || "");
            setLoading(false);
        };
        load();
    }, [id, router]);

    // ─── Update status ───
    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        setSavingStatus(true);
        const { ok, data } = await adminFetch(`/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ orderStatus: newStatus }),
        });
        setSavingStatus(false);

        if (!ok) {
            toast.error(data.message || "স্ট্যাটাস আপডেট হয়নি");
            setStatus(order.orderStatus);
            return;
        }
        setOrder(data.order);
        toast.success("স্ট্যাটাস আপডেট হয়েছে");
    };

    // ─── Update payment status ───
    const handlePaymentChange = async (newPayment) => {
        setPaymentStatus(newPayment);
        setSavingPayment(true);
        const { ok, data } = await adminFetch(`/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ paymentStatus: newPayment }),
        });
        setSavingPayment(false);

        if (!ok) {
            toast.error(data.message || "পেমেন্ট স্ট্যাটাস আপডেট হয়নি");
            setPaymentStatus(order.paymentStatus);
            return;
        }
        setOrder(data.order);
        toast.success("পেমেন্ট স্ট্যাটাস আপডেট হয়েছে");
    };

    // ─── Save note ───
    const handleSaveNote = async () => {
        setSavingNote(true);
        const { ok, data } = await adminFetch(`/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ adminNote: note }),
        });
        setSavingNote(false);

        if (!ok) {
            toast.error(data.message || "নোট সংরক্ষণ হয়নি");
            return;
        }
        setOrder(data.order);
        toast.success("নোট সংরক্ষণ হয়েছে");
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-32 bg-surface border border-border rounded-xl animate-pulse" />
                <div className="h-64 bg-surface border border-border rounded-xl animate-pulse" />
            </div>
        );
    }

    if (!order) return null;

    const customer = order.customer || {};
    const address = customer.address || {};

    const whatsappDigits = (customer.phone || "").replace(/\D/g, "");
    const whatsappLink = whatsappDigits
        ? `https://wa.me/${whatsappDigits}`
        : null;

    return (
        <div className="space-y-5">
            {/* Back + header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted hover:text-primary transition"
                >
                    <IoArrowBack className="w-3.5 h-3.5" />
                    অর্ডার তালিকায় ফিরুন
                </Link>

                <p className="font-body text-xs text-text-muted">
                    {formatDate(order.createdAt)}
                </p>
            </div>

            {/* Order number + status summary */}
            <div className="bg-surface border border-border rounded-xl p-5 flex flex-wrap items-center gap-4 justify-between">
                <div>
                    <p className="font-body text-xs text-text-muted mb-1">
                        অর্ডার নাম্বার
                    </p>
                    <p className="font-price text-2xl font-extrabold text-primary">
                        {order.orderNumber}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <OrderStatusBadge status={order.orderStatus} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                    <span className="inline-block font-body text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border bg-background text-foreground">
                        {order.paymentMethod}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Items */}
                    <Section title="পণ্যসমূহ" icon={IoCubeOutline}>
                        <div className="space-y-3">
                            {order.items?.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                                >
                                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-border bg-background">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-text-muted text-[10px]">
                                                নেই
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-body text-sm font-semibold text-foreground line-clamp-1">
                                            {item.name}
                                        </p>
                                        <p className="font-body text-xs text-text-muted">
                                            ৳{item.price} × {item.qty}
                                        </p>
                                    </div>
                                    <p className="font-price text-sm font-bold text-foreground shrink-0">
                                        ৳{item.lineTotal}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="mt-4 pt-4 border-t border-border space-y-2">
                            <div className="flex justify-between font-body text-sm">
                                <span className="text-text-muted">সাবটোটাল</span>
                                <span className="font-price font-semibold text-foreground">
                                    ৳{order.subtotal}
                                </span>
                            </div>
                            <div className="flex justify-between font-body text-sm">
                                <span className="text-text-muted">
                                    ডেলিভারি চার্জ
                                </span>
                                <span className="font-price font-semibold text-foreground">
                                    ৳{order.deliveryCharge}
                                </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-border">
                                <span className="font-heading text-base font-bold text-foreground">
                                    মোট
                                </span>
                                <span className="font-price text-lg font-extrabold text-primary">
                                    ৳{order.total}
                                </span>
                            </div>
                        </div>
                    </Section>

                    {/* Customer + Address */}
                    <Section title="গ্রাহকের তথ্য" icon={IoPersonOutline}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="font-body text-xs text-text-muted mb-0.5">
                                        নাম
                                    </p>
                                    <p className="font-body text-sm font-semibold text-foreground">
                                        {customer.name || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-body text-xs text-text-muted mb-0.5">
                                        ফোন
                                    </p>
                                    <p className="font-body text-sm text-foreground flex items-center gap-1.5">
                                        <IoCallOutline className="w-3.5 h-3.5 text-primary" />
                                        {customer.phone || "—"}
                                    </p>
                                </div>

                                {customer.email && (
                                    <div>
                                        <p className="font-body text-xs text-text-muted mb-0.5">
                                            ইমেইল
                                        </p>
                                        <p className="font-body text-sm text-foreground flex items-center gap-1.5">
                                            <IoMailOutline className="w-3.5 h-3.5 text-primary" />
                                            {customer.email}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="font-body text-xs text-text-muted mb-1 flex items-center gap-1">
                                    <IoLocationOutline className="w-3.5 h-3.5" />
                                    ঠিকানা
                                </p>
                                <div className="font-body text-sm text-foreground leading-relaxed bg-background border border-border rounded-lg p-3">
                                    {address.fullAddress}
                                    <br />
                                    {address.area && (
                                        <>
                                            {address.area}
                                            <br />
                                        </>
                                    )}
                                    {address.district}, {address.division}
                                </div>
                                <p className="font-body text-[11px] text-text-muted mt-2">
                                    জোন: {address.deliveryZone}
                                </p>
                            </div>
                        </div>

                        {/* Contact buttons */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                            <a
                                href={`tel:${customer.phone}`}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full transition"
                            >
                                <IoCallOutline className="w-4 h-4" />
                                কল দিন
                            </a>
                            {whatsappLink && (
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-body font-semibold text-sm px-4 py-2.5 rounded-full transition"
                                >
                                    <IoLogoWhatsapp className="w-4 h-4" />
                                    হোয়াটসঅ্যাপ
                                </a>
                            )}
                        </div>
                    </Section>

                    {/* Admin Note */}
                    <Section title="নোট" icon={IoDocumentTextOutline}>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            placeholder="যেমন: কাস্টমার বলেছেন বিকেলে ডেলিভারি দিতে..."
                            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary transition resize-none"
                        />
                        <button
                            onClick={handleSaveNote}
                            disabled={savingNote}
                            className="mt-3 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-body font-semibold text-sm px-5 py-2 rounded-full transition"
                        >
                            <IoSaveOutline className="w-4 h-4" />
                            {savingNote ? "সংরক্ষণ হচ্ছে..." : "নোট সংরক্ষণ"}
                        </button>
                    </Section>
                </div>

                {/* Right column */}
                <div className="space-y-5">
                    {/* Status update */}
                    <Section title="অর্ডার স্ট্যাটাস">
                        <div className="space-y-4">
                            <div>
                                <label className="block font-body text-xs text-text-muted mb-1.5">
                                    স্ট্যাটাস
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        handleStatusChange(e.target.value)
                                    }
                                    disabled={savingStatus}
                                    className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-body text-xs text-text-muted mb-1.5">
                                    পেমেন্ট স্ট্যাটাস
                                </label>
                                <select
                                    value={paymentStatus}
                                    onChange={(e) =>
                                        handlePaymentChange(e.target.value)
                                    }
                                    disabled={savingPayment}
                                    className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50"
                                >
                                    {PAYMENT_OPTIONS.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Section>

                    {/* Steadfast — placeholder */}
                    <Section title="কুরিয়ার">
                        {order.steadfast?.trackingCode ? (
                            <div className="space-y-3">
                                <div>
                                    <p className="font-body text-xs text-text-muted mb-0.5">
                                        Tracking Code
                                    </p>
                                    <p className="font-price text-sm font-bold text-primary">
                                        {order.steadfast.trackingCode}
                                    </p>
                                </div>
                                <p className="font-body text-xs text-text-muted">
                                    পাঠানো হয়েছে:{" "}
                                    {formatDate(order.steadfast.sentAt)}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-2">
                                <p className="font-body text-sm text-text-muted mb-4">
                                    এখনো কুরিয়ারে পাঠানো হয়নি
                                </p>
                                <button
                                    disabled
                                    className="w-full bg-secondary/40 text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full cursor-not-allowed"
                                >
                                    স্টেডফাস্টে পাঠান (শীঘ্রই আসছে)
                                </button>
                                <p className="font-body text-[11px] text-text-muted mt-3">
                                    গেটওয়ে সেটআপের পরে চালু হবে
                                </p>
                            </div>
                        )}
                    </Section>
                </div>
            </div>
        </div>
    );
}