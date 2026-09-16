// components/products/ProductFilters.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { IoFilter, IoClose } from "react-icons/io5";

const ProductFilters = ({ categories = {} }) => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || "";
    const currentMin = searchParams.get("minPrice") || "";
    const currentMax = searchParams.get("maxPrice") || "";

    const pushParams = (updates) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([k, v]) => {
            if (v === undefined || v === null || v === "") {
                params.delete(k);
            } else {
                params.set(k, String(v));
            }
        });
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleCategory = (slug) => {
        pushParams({ category: slug });
    };

    const handlePriceApply = () => {
        pushParams({
            minPrice: minPrice.trim(),
            maxPrice: maxPrice.trim(),
        });
        setSheetOpen(false);
    };

    const handleReset = () => {
        setMinPrice("");
        setMaxPrice("");
        const params = new URLSearchParams();
        if (searchParams.get("search"))
            params.set("search", searchParams.get("search"));
        router.push(
            `${pathname}${params.toString() ? "?" + params.toString() : ""}`
        );
        setSheetOpen(false);
    };

    const categoryOptions = [
        { slug: "", name: "সব" },
        ...Object.entries(categories).map(([slug, name]) => ({ slug, name })),
    ];

    // Plain function — component নয়, তাই render-এ call করা ঠিক
    const renderFilterForm = () => (
        <div className="space-y-6">
            {/* Category */}
            <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                    ক্যাটাগরি
                </h3>
                <ul className="space-y-2">
                    {categoryOptions.map((c) => (
                        <li key={c.slug || "all"}>
                            <button
                                onClick={() => handleCategory(c.slug)}
                                className={`w-full text-left font-body text-sm py-1.5 px-3 rounded-lg transition ${
                                    currentCategory === c.slug
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-foreground hover:bg-surface"
                                }`}
                            >
                                {c.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price */}
            <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                    দাম
                </h3>
                <div className="flex items-center gap-2 mb-3">
                    <input
                        type="number"
                        placeholder="সর্বনিম্ন"
                        value={minPrice || currentMin}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full min-w-0 px-3 py-2 rounded-lg bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary"
                    />
                    <span className="text-text-muted text-xs">—</span>
                    <input
                        type="number"
                        placeholder="সর্বোচ্চ"
                        value={maxPrice || currentMax}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full min-w-0 px-3 py-2 rounded-lg bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary"
                    />
                </div>
                <Button
                    onClick={handlePriceApply}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-semibold text-sm py-2 rounded-full transition"
                >
                    দাম প্রয়োগ করুন
                </Button>
            </div>

            {/* Reset */}
            <button
                onClick={handleReset}
                className="w-full text-center font-body text-xs text-text-muted hover:text-error transition py-2"
            >
                সব ফিল্টার রিসেট করুন
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:block bg-surface/60 border border-border rounded-xl p-5">
                {renderFilterForm()}
            </aside>

            {/* Mobile: filter button */}
            <button
                onClick={() => setSheetOpen(true)}
                className="md:hidden inline-flex items-center justify-center gap-2 border border-border rounded-full px-4 py-2 font-body text-sm text-foreground hover:border-secondary transition w-fit"
            >
                <IoFilter className="w-4 h-4" />
                ফিল্টার
                {(currentCategory || currentMin || currentMax) && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                )}
            </button>

            {/* Mobile: bottom sheet */}
            <div
                className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
                    sheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    onClick={() => setSheetOpen(false)}
                    className="absolute inset-0 bg-black/50"
                />
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl border-t border-border shadow-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${
                        sheetOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    <div className="flex justify-center pt-3 pb-1">
                        <span className="w-12 h-1 rounded-full bg-border" />
                    </div>

                    <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                        <h2 className="font-heading text-lg font-bold text-foreground">
                            ফিল্টার
                        </h2>
                        <button
                            onClick={() => setSheetOpen(false)}
                            className="p-1 rounded-full hover:bg-background transition"
                        >
                            <IoClose className="w-5 h-5 text-text-muted" />
                        </button>
                    </div>

                    <div className="p-5">
                        {renderFilterForm()}
                    </div>

                    <div className="h-4" />
                </div>
            </div>
        </>
    );
};

export default ProductFilters;