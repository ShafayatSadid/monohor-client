// app/wishlist/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

import { useWishlistStore } from "@/store/wishlistStore";
import WishlistCard from "@/components/wishlist/WishlistCard";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";

export default function WishlistPage() {
    const items = useWishlistStore((s) => s.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Hydration-safe: client-এ mount হওয়ার পরে items count ঠিক
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const count = mounted ? items.length : 0;

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 font-body text-xs text-text-muted mb-6 md:mb-8">
                <Link href="/" className="hover:text-primary transition">
                    হোম
                </Link>
                <IoChevronForward className="w-3 h-3" />
                <span className="text-foreground/70">উইশলিস্ট</span>
            </nav>

            {count === 0 ? (
                <EmptyWishlist />
            ) : (
                <>
                    <div className="mb-6 md:mb-8">
                        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-1">
                            আপনার উইশলিস্ট
                        </h1>
                        <p className="font-body text-sm text-text-muted">
                            {count}টি পণ্য সংরক্ষিত আছে
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {items.map((item) => (
                            <WishlistCard key={item.slug} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}