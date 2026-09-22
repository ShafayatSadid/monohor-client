// components/admin/OrderRow.jsx
"use client";

import Link from "next/link";
import { IoChevronForward, IoCallOutline } from "react-icons/io5";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const OrderRow = ({ order }) => {
    return (
        <Link
            href={`/admin/orders/${order._id}`}
            className="block bg-surface border border-border rounded-xl hover:border-secondary/60 transition p-3 md:p-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_120px_140px_30px] items-center gap-2 md:gap-4">
                {/* Order Number + Date */}
                <div>
                    <p className="font-price text-sm md:text-base font-bold text-primary">
                        {order.orderNumber}
                    </p>
                    <p className="font-body text-[11px] text-text-muted">
                        {formatDate(order.createdAt)}
                    </p>
                </div>

                {/* Customer */}
                <div className="min-w-0">
                    <p className="font-body text-sm font-semibold text-foreground line-clamp-1">
                        {order.customer?.name || "—"}
                    </p>
                    <p className="font-body text-xs text-text-muted flex items-center gap-1">
                        <IoCallOutline className="w-3 h-3 shrink-0" />
                        {order.customer?.phone || "—"}
                    </p>
                </div>

                {/* Total */}
                <p className="font-price text-sm md:text-base font-bold text-foreground md:text-right">
                    ৳{order.total}
                </p>

                {/* Status badges */}
                <div className="flex items-center gap-1.5 flex-wrap md:justify-end">
                    <OrderStatusBadge status={order.orderStatus} />
                    {order.paymentMethod === "COD" && (
                        <PaymentStatusBadge status={order.paymentStatus} />
                    )}
                </div>

                {/* Chevron */}
                <div className="hidden md:flex items-center justify-end text-text-muted">
                    <IoChevronForward className="w-4 h-4" />
                </div>
            </div>
        </Link>
    );
};

export default OrderRow;