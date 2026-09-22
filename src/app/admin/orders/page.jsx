// app/admin/orders/page.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { IoSearchOutline, IoReceiptOutline } from "react-icons/io5";

import { adminFetch } from "@/lib/adminApi";
import OrderRow from "@/components/admin/OrderRow";
import { ORDER_STATUSES } from "@/components/admin/OrderStatusBadge";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const { ok, data } = await adminFetch("/orders");
            if (!ok) {
                toast.error(data.message || "অর্ডার লোড করা যায়নি");
                setOrders([]);
            } else {
                // backend returns either array or {orders: []}
                setOrders(Array.isArray(data) ? data : data.orders || []);
            }
            setLoading(false);
        };
        load();
    }, []);

    const filtered = useMemo(() => {
        return orders.filter((o) => {
            const matchStatus = !status || o.orderStatus === status;

            const q = search.trim().toLowerCase();
            const matchSearch =
                !q ||
                o.orderNumber?.toLowerCase().includes(q) ||
                o.customer?.name?.toLowerCase().includes(q) ||
                o.customer?.phone?.toLowerCase().includes(q);

            return matchStatus && matchSearch;
        });
    }, [orders, status, search]);

    // count by status (for filter badges)
    const statusCounts = useMemo(() => {
        const counts = { "": orders.length };
        orders.forEach((o) => {
            counts[o.orderStatus] = (counts[o.orderStatus] || 0) + 1;
        });
        return counts;
    }, [orders]);

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="অর্ডার নাম্বার, নাম বা ফোন..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary transition"
                    />
                </div>

                {/* Refresh */}
                <button
                    onClick={() => window.location.reload()}
                    className="text-xs font-body text-text-muted hover:text-primary transition self-end md:self-auto"
                >
                    ↻ রিফ্রেশ
                </button>
            </div>

            {/* Status filter chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {ORDER_STATUSES.map((s) => {
                    const active = status === s.value;
                    const count = statusCounts[s.value] ?? 0;
                    return (
                        <button
                            key={s.value || "all"}
                            onClick={() => setStatus(s.value)}
                            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border font-body text-xs font-semibold transition ${
                                active
                                    ? "bg-primary text-white border-primary"
                                    : "bg-surface text-foreground border-border hover:border-secondary/60"
                            }`}
                        >
                            {s.label}
                            <span
                                className={`min-w-4.5 h-4.5 flex items-center justify-center px-1 rounded-full text-[10px] font-bold ${
                                    active
                                        ? "bg-white/20 text-white"
                                        : "bg-background text-text-muted"
                                }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Count */}
            {!loading && (
                <p className="font-body text-xs text-text-muted">
                    {filtered.length}টি অর্ডার দেখানো হচ্ছে
                </p>
            )}

            {/* Content */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="h-20 bg-surface border border-border rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 border border-border rounded-xl bg-surface/50">
                    <IoReceiptOutline className="w-10 h-10 text-text-muted mx-auto mb-3" />
                    <p className="font-heading text-lg font-bold text-foreground mb-1">
                        কোনো অর্ডার পাওয়া যায়নি
                    </p>
                    <p className="font-body text-sm text-text-muted">
                        {search || status
                            ? "ফিল্টার পরিবর্তন করে দেখুন"
                            : "এখনো কোনো অর্ডার আসেনি"}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((order) => (
                        <OrderRow key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}