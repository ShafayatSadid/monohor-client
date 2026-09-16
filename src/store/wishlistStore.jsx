// store/wishlistStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const FALLBACK_IMAGE = "/images/slide-1.webp";

const buildWishlistItem = (product) => ({
    slug: product.slug,
    name: product.name,
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
    image: product.images?.[0] || FALLBACK_IMAGE,
    stock: Number(product.stock) || 0,
});

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                if (get().items.some((i) => i.slug === product.slug)) return;
                set({
                    items: [...get().items, buildWishlistItem(product)],
                });
            },

            removeItem: (slug) => {
                set({
                    items: get().items.filter((i) => i.slug !== slug),
                });
            },

            toggle: (product) => {
                const exists = get().items.some(
                    (i) => i.slug === product.slug
                );
                if (exists) {
                    get().removeItem(product.slug);
                    return false;
                }
                get().addItem(product);
                return true;
            },

            isWishlisted: (slug) =>
                get().items.some((i) => i.slug === slug),

            getTotalItems: () => get().items.length,

            clear: () => set({ items: [] }),
        }),
        {
            name: "monohor-wishlist",
            version: 1,
        }
    )
);