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