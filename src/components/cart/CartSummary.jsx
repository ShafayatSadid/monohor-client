// components/cart/CartSummary.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const CartSummary = () => {
    const router = useRouter();
    const items = useCartStore((s) => s.items);

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const handleCheckout = () => {
        router.push("/checkout");
    };

    return (
        <aside className="bg-surface border border-border rounded-xl p-5 md:p-6 md:sticky md:top-[130px]">
            <h2 className="font-heading text-lg md:text-xl font-extrabold text-foreground mb-5 pb-4 border-b border-border">
                অর্ডার সারাংশ
            </h2>

            {/* Subtotal row */}
            <div className="flex items-center justify-between mb-3">
                <span className="font-body text-sm text-text-muted">
                    সাবটোটাল ({totalItems}টি পণ্য)
                </span>
                <span className="font-accent text-sm font-bold text-foreground">
                    ৳{subtotal}
                </span>
            </div>

            {/* Delivery note */}
            <div className="flex items-center justify-between mb-5">
                <span className="font-body text-sm text-text-muted">
                    ডেলিভারি চার্জ
                </span>
                <span className="font-body text-xs text-text-muted italic">
                    চেকআউটে যুক্ত হবে
                </span>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-4 mb-5">
                <div className="flex items-center justify-between">
                    <span className="font-heading text-base md:text-lg font-bold text-foreground">
                        মোট
                    </span>
                    <span className="font-accent text-xl md:text-2xl font-extrabold text-primary">
                        ৳{subtotal}
                    </span>
                </div>
            </div>

            {/* Checkout button */}
            <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm md:text-base py-3 rounded-full shadow-md transition hover:scale-[1.01] mb-3"
            >
                চেকআউট করুন
            </button>

            {/* Continue shopping */}
            <Link
                href="/products"
                className="block text-center font-body text-xs md:text-sm text-text-muted hover:text-primary transition py-2"
            >
                ← কেনাকাটা চালিয়ে যান
            </Link>

            {/* Trust note */}
            <div className="mt-5 pt-5 border-t border-border flex items-start gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <p className="font-body text-xs text-text-muted leading-relaxed">
                    নিরাপদ পেমেন্ট — bKash, Nagad অথবা ক্যাশ অন ডেলিভারি
                </p>
            </div>
        </aside>
    );
};

export default CartSummary;