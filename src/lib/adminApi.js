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