// lib/adminApi.js
"use client";

import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function adminFetch(path, options = {}) {
    try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        if (!token) {
            return {
                ok: false,
                data: { message: "No token — login required" },
            };
        }

        const res = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
            cache: "no-store",
        });

        const data = await res.json();
        return { ok: res.ok, data };
    } catch (err) {
        console.error("adminFetch error:", err);
        return { ok: false, data: { message: "Network error" } };
    }
}


// lib/adminApi.js — নতুন function যোগ
export async function deleteProduct(id) {
    return adminFetch(`/products/${id}`, { method: "DELETE" });
}

// lib/adminApi.js — নতুন function যোগ করুন
export async function createProduct(payload) {
    return adminFetch("/products", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updateProduct(id, payload) {
    return adminFetch(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function getProductBySlug(slug) {
    return adminFetch(`/products/${slug}`);
}

// lib/adminApi.js — নতুন function
export async function sendToSteadfast(id) {
    return adminFetch(`/orders/${id}/send-steadfast`, {
        method: "POST",
    });
}