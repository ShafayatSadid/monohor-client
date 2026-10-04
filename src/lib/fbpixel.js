// lib/fbpixel.js
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// ─────────────────────────────────────────────────────────────
// Track any Meta Pixel event
// Usage: track("AddToCart", { value: 350, currency: "BDT" })
// ─────────────────────────────────────────────────────────────
export const track = (eventName, params = {}) => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
        return;
    }
    window.fbq("track", eventName, params);
};

// ─────────────────────────────────────────────────────────────
// Track custom event (for anything not in standard list)
// ─────────────────────────────────────────────────────────────
export const trackCustom = (eventName, params = {}) => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
        return;
    }
    window.fbq("trackCustom", eventName, params);
};

// ─────────────────────────────────────────────────────────────
// E-commerce specific helpers
// ─────────────────────────────────────────────────────────────
export const trackViewContent = ({ id, name, value, category }) => {
    track("ViewContent", {
        content_ids: [id],
        content_name: name,
        content_category: category,
        content_type: "product",
        value: Number(value) || 0,
        currency: "BDT",
    });
};

export const trackAddToCart = ({ id, name, value, quantity = 1, category }) => {
    track("AddToCart", {
        content_ids: [id],
        content_name: name,
        content_category: category,
        content_type: "product",
        value: Number(value) || 0,
        currency: "BDT",
        quantity: Number(quantity) || 1,
    });
};

export const trackInitiateCheckout = ({ value, numItems }) => {
    track("InitiateCheckout", {
        value: Number(value) || 0,
        currency: "BDT",
        num_items: Number(numItems) || 0,
    });
};

export const trackPurchase = ({ value, orderId, contentIds = [] }) => {
    track("Purchase", {
        value: Number(value) || 0,
        currency: "BDT",
        content_ids: contentIds,
        content_type: "product",
        order_id: orderId || undefined,
    });
};