// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    IoReceiptOutline,
    IoCubeOutline,
    IoTimeOutline,
    IoCashOutline,
    IoAlertCircleOutline,
} from "react-icons/io5";

import { adminFetch } from "@/lib/adminApi";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const { ok, data } = await adminFetch("/admin/stats");
            if (!ok) {
                toast.error(data.message || "স্ট্যাটস লোড করা যায়নি");
            } else {
                setStats(data);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-32 bg-surface border border-border rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    icon={IoReceiptOutline}
                    label="মোট অর্ডার"
                    value={stats.totalOrders}
                    subtitle={`${stats.pendingOrders}টি পেন্ডিং`}
                    color="primary"
                />
                <StatsCard
                    icon={IoCubeOutline}
                    label="মোট পণ্য"
                    value={stats.totalProducts}
                    subtitle={`${stats.totalCategories}টি ক্যাটাগরি`}
                    color="info"
                />
                <StatsCard
                    icon={IoTimeOutline}
                    label="পেন্ডিং অর্ডার"
                    value={stats.pendingOrders}
                    subtitle="কনফার্ম করা প্রয়োজন"
                    color="warning"
                />
                <StatsCard
                    icon={IoCashOutline}
                    label="মোট আয়"
                    value={`৳${stats.totalRevenue}`}
                    subtitle={`${stats.deliveredOrders}টি ডেলিভারড`}
                    color="success"
                />
            </div>

            {/* Recent Orders + Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Orders */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-heading text-base font-bold text-foreground">
                            সাম্প্রতিক অর্ডার
                        </h2>
                        <Link
                            href="/admin/orders"
                            className="font-body text-xs text-primary hover:underline"
                        >
                            সব দেখুন →
                        </Link>
                    </div>

                    {stats.recentOrders.length === 0 ? (
                        <p className="font-body text-sm text-text-muted py-4 text-center">
                            এখনো কোনো অর্ডার নেই
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {stats.recentOrders.map((order) => (
                                <Link
                                    key={order._id}
                                    href={`/admin/orders/${order._id}`}
                                    className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-background transition"
                                >
                                    <div className="min-w-0">
                                        <p className="font-price text-sm font-bold text-foreground">
                                            {order.orderNumber}
                                        </p>
                                        <p className="font-body text-xs text-text-muted truncate">
                                            {order.customer.name}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-price text-sm font-bold text-primary">
                                            ৳{order.total}
                                        </p>
                                        <p className="font-body text-[10px] text-text-muted">
                                            {order.orderStatus}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Low Stock */}
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <IoAlertCircleOutline className="w-4 h-4 text-warning" />
                        <h2 className="font-heading text-base font-bold text-foreground">
                            কম স্টক
                        </h2>
                    </div>

                    {stats.lowStockProducts.length === 0 ? (
                        <p className="font-body text-sm text-text-muted py-4 text-center">
                            সব পণ্য পর্যাপ্ত স্টকে আছে
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {stats.lowStockProducts.map((p) => (
                                <Link
                                    key={p._id}
                                    href={`/admin/products/${p._id}/edit`}
                                    className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-background transition"
                                >
                                    <p className="font-body text-sm text-foreground truncate">
                                        {p.name}
                                    </p>
                                    <span
                                        className={`font-price text-xs font-bold shrink-0 ${
                                            p.stock === 0
                                                ? "text-error"
                                                : "text-warning"
                                        }`}
                                    >
                                        {p.stock}টি বাকি
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}