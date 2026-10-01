// src/app/error.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IoAlertCircleOutline, IoRefreshOutline } from "react-icons/io5";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("App Error:", error);
    }, [error]);

    return (
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
            {/* Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-6">
                <IoAlertCircleOutline className="w-12 h-12 md:w-14 md:h-14 text-warning" />
            </div>

            {/* Heading */}
            <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-3">
                কিছু একটা সমস্যা হয়েছে
            </h1>

            {/* Description */}
            <p className="font-body text-sm md:text-base text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                আমরা এই সমস্যাটি সমাধান করার চেষ্টা করছি। নিচের button
                থেকে আবার চেষ্টা করুন অথবা হোমে ফিরে যান।
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                    onClick={reset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm md:text-base px-7 py-3 rounded-full shadow-md transition"
                >
                    <IoRefreshOutline className="w-4 h-4" />
                    আবার চেষ্টা করুন
                </button>
                <Link
                    href="/"
                    className="w-full sm:w-auto border border-border hover:border-secondary text-foreground font-heading font-semibold text-sm md:text-base px-7 py-3 rounded-full transition"
                >
                    হোমে ফিরুন
                </Link>
            </div>

            <Link
                href="/contact"
                className="inline-block mt-6 font-body text-sm text-primary hover:underline"
            >
                সমস্যাটি বারবার হলে যোগাযোগ করুন →
            </Link>
        </div>
    );
}