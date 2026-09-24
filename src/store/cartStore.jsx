// store/cartStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const FALLBACK_IMAGE = "/images/slide-1.webp";

// Unique key for cart items — variant-aware
const itemKey = (slug, variantId) =>
    variantId ? `${slug}__${variantId}` : slug;

const buildCartItem = (product, qty, variant) => {
    const useVariant = !!variant;

    return {
        key: itemKey(product.slug, variant?.id),
        slug: product.slug,
        name: product.name,
        variantId: useVariant ? variant.id : null,
        variantSize: useVariant ? variant.size : null,
        variantLabel: useVariant ? variant.label : null,
        price: Number(useVariant ? variant.price : product.price),
        oldPrice: (() => {
            const op = useVariant ? variant.oldPrice : product.oldPrice;
            return op ? Number(op) : null;
        })(),
        image: product.images?.[0] || FALLBACK_IMAGE,
        stock: Number(product.stock) || 0,
        qty,
    };
};

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            savedItems: [],

            // ────────────── Cart actions ──────────────
            addItem: (product, qty = 1, variant = null) => {
                const stock = Number(product.stock) || 0;

                if (stock === 0) {
                    return { ok: false, message: "স্টক নেই" };
                }

                // Variant validation
                const productHasVariants =
                    Array.isArray(product.variants) &&
                    product.variants.length > 0;

                if (productHasVariants && !variant) {
                    return {
                        ok: false,
                        message: "সাইজ নির্বাচন করুন",
                    };
                }

                const newItem = buildCartItem(product, qty, variant);
                const items = get().items;
                const existing = items.find((i) => i.key === newItem.key);

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
                            i.key === newItem.key
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
                    set({ items: [...items, newItem] });
                }

                return { ok: true };
            },

            removeItem: (key) => {
                set({ items: get().items.filter((i) => i.key !== key) });
            },

            updateQty: (key, qty) => {
                if (qty <= 0) {
                    get().removeItem(key);
                    return;
                }
                set({
                    items: get().items.map((i) => {
                        if (i.key !== key) return i;
                        const max = i.stock > 0 ? i.stock : 1;
                        return { ...i, qty: Math.min(qty, max) };
                    }),
                });
            },

            clearCart: () => set({ items: [] }),

            // ────────────── Save for later ──────────────
            saveForLater: (key) => {
                const item = get().items.find((i) => i.key === key);
                if (!item) return;
                set({
                    items: get().items.filter((i) => i.key !== key),
                    savedItems: [...get().savedItems, item],
                });
            },

            moveToCart: (key) => {
                const item = get().savedItems.find((i) => i.key === key);
                if (!item) return;
                const stock = item.stock || 0;
                if (stock === 0) return;
                set({
                    savedItems: get().savedItems.filter(
                        (i) => i.key !== key
                    ),
                    items: [...get().items, item],
                });
            },

            removeSaved: (key) => {
                set({
                    savedItems: get().savedItems.filter(
                        (i) => i.key !== key
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

            getItemQty: (key) => {
                const item = get().items.find((i) => i.key === key);
                return item ? item.qty : 0;
            },

            isInCart: (key) =>
                get().items.some((i) => i.key === key),
        }),
        {
            name: "monohor-cart",
            version: 2,
            migrate: (persistedState, version) => {
                // পুরোনো version-এর cart item key structure ভিন্ন ছিল
                // তাই migrate না করে খালি cart ফেরত দিই
                if (version < 2) {
                    return { items: [], savedItems: [] };
                }
                return persistedState;
            }, // ← version bump, পুরোনো cart clear হবে
        }
    )
);