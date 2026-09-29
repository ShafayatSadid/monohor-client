// lib/reviewApi.js
"use client";

import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Public — approved reviews + summary
export async function getProductReviews(slug) {
    try {
        const res = await fetch(
            `${API_URL}/reviews/product/${encodeURIComponent(slug)}`,
            { cache: "no-store" }
        );
        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                message: data.message || "রিভিউ লোড করা যায়নি",
                reviews: [],
                summary: { average: 0, total: 0, distribution: {} },
            };
        }

        return { ok: true, ...data };
    } catch (err) {
        console.error("getProductReviews error:", err);
        return {
            ok: false,
            message: "নেটওয়ার্ক সমস্যা",
            reviews: [],
            summary: { average: 0, total: 0, distribution: {} },
        };
    }
}

// Auth required — current user's review for this product
export async function getMyReview(slug) {
    try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        if (!token) {
            return { ok: false, hasReviewed: false, review: null };
        }

        const res = await fetch(
            `${API_URL}/reviews/my/${encodeURIComponent(slug)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        const data = await res.json();
        if (!res.ok) {
            return { ok: false, hasReviewed: false, review: null };
        }

        return { ok: true, ...data };
    } catch (err) {
        console.error("getMyReview error:", err);
        return { ok: false, hasReviewed: false, review: null };
    }
}

// Auth required — submit / update review
export async function submitReview({ productSlug, rating, comment }) {
    try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        if (!token) {
            return { ok: false, message: "রিভিউ দিতে লগইন করুন" };
        }

        const res = await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productSlug, rating, comment }),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                message: data.message || "রিভিউ জমা দেওয়া যায়নি",
            };
        }

        return { ok: true, ...data };
    } catch (err) {
        console.error("submitReview error:", err);
        return { ok: false, message: "নেটওয়ার্ক সমস্যা" };
    }
}