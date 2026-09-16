// app/cart/page.js
"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import SavedForLater from "@/components/cart/SavedForLater";

export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

    const isEmpty = items.length === 0;

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 font-body text-xs text-text-muted mb-6 md:mb-8">
                <Link href="/" className="hover:text-primary transition">
                    হোম
                </Link>
                <IoChevronForward className="w-3 h-3" />
                <span className="text-foreground/70">কার্ট</span>
            </nav>

            {/* Header */}
            {!isEmpty && (
                <div className="mb-6 md:mb-8">
                    <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-1">
                        আপনার কার্ট
                    </h1>
                    <p className="font-body text-sm text-text-muted">
                        {totalItems}টি পণ্য কার্টে আছে
                    </p>
                </div>
            )}

            {/* Content */}
            {isEmpty ? (
                <EmptyCart />
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10">
                        {/* Items */}
                        <div className="bg-surface/50 border border-border rounded-xl px-4 md:px-6 py-2">
                            {items.map((item) => (
                                <CartItem key={item.slug} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <CartSummary />
                    </div>

                    {/* Saved for later */}
                    <SavedForLater />
                </>
            )}
        </div>
    );
}