// src/app/not-found.jsx
import Link from "next/link";

export const metadata = {
    title: "পেজটি খুঁজে পাওয়া যায়নি — মনোহর",
};

export default function NotFound() {
    return (
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
            {/* Bengali Motif Icon */}
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                <svg
                    viewBox="0 0 100 100"
                    className="w-12 h-12 md:w-14 md:h-14 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <circle cx="50" cy="50" r="30" />
                    <circle cx="50" cy="50" r="18" />
                    <path d="M 50 20 L 50 32" strokeLinecap="round" />
                    <path d="M 50 68 L 50 80" strokeLinecap="round" />
                    <path d="M 20 50 L 32 50" strokeLinecap="round" />
                    <path d="M 68 50 L 80 50" strokeLinecap="round" />
                </svg>
            </div>

            {/* 404 Number */}
            <p className="font-price text-6xl md:text-8xl font-extrabold text-secondary mb-2">
                404
            </p>

            {/* Heading */}
            <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-3">
                পেজটি খুঁজে পাওয়া যায়নি
            </h1>

            {/* Description */}
            <p className="font-body text-sm md:text-base text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা
                হয়েছে। নিচের অপশন থেকে চালিয়ে যান।
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                    href="/"
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm md:text-base px-7 py-3 rounded-full shadow-md transition"
                >
                    হোমে ফিরুন
                </Link>
                <Link
                    href="/products"
                    className="w-full sm:w-auto border border-border hover:border-secondary text-foreground font-heading font-semibold text-sm md:text-base px-7 py-3 rounded-full transition"
                >
                    কেনাকাটা করুন
                </Link>
            </div>
        </div>
    );
}