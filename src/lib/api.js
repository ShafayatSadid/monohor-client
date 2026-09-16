// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    } catch (err) {
        console.error("getCategories error:", err);
        return [];
    }
}

export async function getProducts(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const url = query
            ? `${API_URL}/products?${query}`
            : `${API_URL}/products`;
        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    } catch (err) {
        console.error("getProducts error:", err);
        return [];
    }
}

export async function getProduct(slug) {
    try {
        const res = await fetch(`${API_URL}/products/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
    } catch (err) {
        console.error("getProduct error:", err);
        return null;
    }
}

// lib/api.js — নতুন function যোগ করুন
export async function getProductsPaginated({
    page = 1,
    limit = 12,
    ...rest
} = {}) {
    try {
        const params = new URLSearchParams();
        Object.entries(rest).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") {
                params.set(k, String(v));
            }
        });
        params.set("page", String(page));
        params.set("limit", String(limit));

        const res = await fetch(`${API_URL}/products?${params.toString()}`, {
            next: { revalidate: 30 },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    } catch (err) {
        console.error("getProductsPaginated error:", err);
        return { products: [], total: 0, page: 1, totalPages: 1 };
    }
}

// lib/api.js — নতুন function
export async function createOrder(payload) {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                message: data.message || "অর্ডার জমা হয়নি",
            };
        }

        return { ok: true, ...data };
    } catch (err) {
        console.error("createOrder error:", err);
        return { ok: false, message: "নেটওয়ার্ক সমস্যা হয়েছে" };
    }
}

