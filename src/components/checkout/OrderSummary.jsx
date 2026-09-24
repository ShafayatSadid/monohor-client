// components/checkout/OrderSummary.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    IoChevronDown,
    IoChevronUp,
    IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";

const OrderSummary = ({ formId, deliveryCharge, submitting }) => {
    const items = useCartStore((s) => s.items);
    const [expanded, setExpanded] = useState(false);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const total = subtotal + deliveryCharge;

    return (
        <aside className="bg-surface border border-border rounded-xl p-5 md:p-6 md:sticky md:top-[130px]">
            <h2 className="font-heading text-lg md:text-xl font-extrabold text-foreground mb-4 pb-4 border-b border-border">
                অর্ডার সারাংশ
            </h2>

            {/* Mobile toggle */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="md:hidden w-full flex items-center justify-between py-2 mb-3 border-b border-border"
            >
                <span className="font-body text-sm text-text-muted">
                    {totalItems}টি পণ্য
                </span>
                <span className="flex items-center gap-2 font-price font-bold text-primary text-sm">
                    ৳{total}
                    {expanded ? (
                        <IoChevronUp className="w-4 h-4" />
                    ) : (
                        <IoChevronDown className="w-4 h-4" />
                    )}
                </span>
            </button>

            {/* Items */}
            <div
                className={`space-y-3 pb-4 mb-4 border-b border-border max-h-[280px] overflow-y-auto ${expanded ? "block" : "hidden md:block"
                    }`}
            >
                {items.map((item) => (
                    <div key={item.slug} className="flex gap-3">
                        <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden border border-border">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-body text-xs text-foreground line-clamp-1 mb-0.5">
                                {item.name}
                            </p>
                            {item.variantLabel && (
                                <p className="font-body text-[10px] text-text-muted mb-0.5">
                                    {item.variantLabel}
                                </p>
                            )}
                            <p className="font-body text-[11px] text-text-muted">
                                ৳{item.price} × {item.qty}
                            </p>
                        </div>
                        <span className="font-price text-xs font-bold text-foreground shrink-0">
                            ৳{item.price * item.qty}
                        </span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div
                className={`space-y-2.5 mb-4 ${expanded ? "block" : "hidden md:block"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-text-muted">
                        সাবটোটাল
                    </span>
                    <span className="font-price text-sm font-bold text-foreground">
                        ৳{subtotal}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-text-muted">
                        ডেলিভারি চার্জ
                    </span>
                    <span className="font-price text-sm font-bold text-foreground">
                        ৳{deliveryCharge}
                    </span>
                </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-border mb-5">
                <span className="font-heading text-base font-bold text-foreground">
                    মোট
                </span>
                <span className="font-price text-xl md:text-2xl font-extrabold text-primary">
                    ৳{total}
                </span>
            </div>

            {/* Submit */}
            <button
                type="submit"
                form={formId}
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed text-white font-heading font-bold text-sm md:text-base py-3 rounded-full shadow-md transition hover:scale-[1.01]"
            >
                {submitting ? "প্রসেসিং..." : "অর্ডার কনফার্ম করুন"}
            </button>

            <Link
                href="/cart"
                className="block text-center font-body text-xs text-text-muted hover:text-primary transition mt-3 py-2"
            >
                ← কার্টে ফিরে যান
            </Link>

            {/* Trust */}
            <div className="mt-4 pt-4 border-t border-border flex items-start gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <p className="font-body text-xs text-text-muted leading-relaxed">
                    নিরাপদ অর্ডার — আমরা কল দিয়ে কনফার্ম করব
                </p>
            </div>
        </aside>
    );
};

export default OrderSummary;