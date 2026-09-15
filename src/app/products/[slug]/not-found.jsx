// app/products/[slug]/not-found.js
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground mb-3">
                পণ্যটি পাওয়া যায়নি
            </h1>
            <p className="font-body text-sm md:text-base text-text-muted mb-8">
                আপনি যে পণ্যটি খুঁজছেন সেটি সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল।
            </p>
            <Link
                href="/products"
                className="inline-block bg-primary hover:bg-primary-hover text-white font-heading font-bold px-7 py-3 rounded-full transition"
            >
                সব পণ্য দেখুন
            </Link>
        </div>
    );
}