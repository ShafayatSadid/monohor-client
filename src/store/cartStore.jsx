// store/cartStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const FALLBACK_IMAGE = "/images/slide-1.webp";

const buildCartItem = (product, qty) => ({
    slug: product.slug,
    name: product.name,
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
    image: product.images?.[0] || FALLBACK_IMAGE,
    stock: Number(product.stock) || 0,
    qty,
});

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            savedItems: [],

            // ────────────── Cart actions ──────────────
            addItem: (product, qty = 1) => {
                const stock = Number(product.stock) || 0;

                if (stock === 0) {
                    return { ok: false, message: "স্টক নেই" };
                }

                const items = get().items;
                const existing = items.find((i) => i.slug === product.slug);

                if (existing) {
                    const newQty = existing.qty + qty;
                    if (newQty > stock) {
                        return {
                            ok: false,
                            message: `মাত্র ${stock}টি স্টকে আছে`,
                        };
                    }
                    set({
                        items: items.map((i) =>
                            i.slug === product.slug
                                ? { ...i, qty: newQty }
                                : i
                        ),
                    });
                } else {
                    if (qty > stock) {
                        return {
                            ok: false,
                            message: `মাত্র ${stock}টি স্টকে আছে`,
                        };
                    }
                    set({
                        items: [...items, buildCartItem(product, qty)],
                    });
                }

                return { ok: true };
            },

            removeItem: (slug) => {
                set({ items: get().items.filter((i) => i.slug !== slug) });
            },

            updateQty: (slug, qty) => {
                if (qty <= 0) {
                    get().removeItem(slug);
                    return;
                }
                set({
                    items: get().items.map((i) => {
                        if (i.slug !== slug) return i;
                        const max = i.stock > 0 ? i.stock : 1;
                        return { ...i, qty: Math.min(qty, max) };
                    }),
                });
            },

            clearCart: () => set({ items: [] }),

            // ────────────── Save for later ──────────────
            saveForLater: (slug) => {
                const item = get().items.find((i) => i.slug === slug);
                if (!item) return;
                set({
                    items: get().items.filter((i) => i.slug !== slug),
                    savedItems: [...get().savedItems, item],
                });
            },

            moveToCart: (slug) => {
                const item = get().savedItems.find((i) => i.slug === slug);
                if (!item) return;
                // stock check
                const stock = item.stock || 0;
                if (stock === 0) return;
                set({
                    savedItems: get().savedItems.filter(
                        (i) => i.slug !== slug
                    ),
                    items: [...get().items, item],
                });
            },

            removeSaved: (slug) => {
                set({
                    savedItems: get().savedItems.filter(
                        (i) => i.slug !== slug
                    ),
                });
            },

            // ────────────── Selectors ──────────────
            getTotalItems: () =>
                get().items.reduce((sum, i) => sum + i.qty, 0),

            getTotalPrice: () =>
                get().items.reduce(
                    (sum, i) => sum + i.price * i.qty,
                    0
                ),

            getItemQty: (slug) => {
                const item = get().items.find((i) => i.slug === slug);
                return item ? item.qty : 0;
            },

            isInCart: (slug) =>
                get().items.some((i) => i.slug === slug),
        }),
        {
            name: "monohor-cart",
            version: 1,
        }
    )
);