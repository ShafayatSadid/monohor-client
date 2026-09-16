// app/order-success/page.js
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("order") || "N/A";

    return (
        <div className="max-w-2xl mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <IoCheckmarkCircle className="w-14 h-14 md:w-16 md:h-16 text-success" />
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                ধন্যবাদ!
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted mb-6 max-w-md mx-auto">
                আপনার অর্ডার সফলভাবে জমা হয়েছে।
            </p>

            <div className="inline-block bg-surface border border-border rounded-xl px-6 py-4 mb-8">
                <p className="font-body text-xs text-text-muted mb-1">
                    অর্ডার নাম্বার
                </p>
                <p className="font-price text-2xl md:text-3xl font-extrabold text-primary">
                    {orderNumber}
                </p>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5 mb-8 text-left">
                <p className="font-body text-sm text-foreground leading-relaxed">
                    <strong>গুরুত্বপূর্ণ:</strong> আমাদের প্রতিনিধি শীঘ্রই
                    আপনাকে কল দিয়ে অর্ডার কনফার্ম করবেন। অনুগ্রহ করে ফোন
                    হাতের কাছে রাখুন। কনফার্ম হওয়ার পরেই পণ্য পাঠানো হবে।
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                    href="/products"
                    className="bg-primary hover:bg-primary-hover text-white font-heading font-bold px-8 py-3 rounded-full shadow-md transition"
                >
                    আরও কেনাকাটা করুন
                </Link>
                <Link
                    href="/"
                    className="border border-border hover:border-secondary text-foreground font-heading font-semibold px-8 py-3 rounded-full transition"
                >
                    হোমে ফিরে যান
                </Link>
            </div>

            <p className="font-body text-xs text-text-muted mt-8">
                ভবিষ্যতের জন্য অর্ডার নাম্বারটি সংরক্ষণ করুন:{" "}
                <span className="font-price font-bold text-foreground">
                    {orderNumber}
                </span>
            </p>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="py-20 text-center font-body text-text-muted">
                    লোড হচ্ছে...
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}