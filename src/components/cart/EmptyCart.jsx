// components/cart/EmptyCart.jsx
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 md:py-28 px-5">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-surface border border-border flex items-center justify-center mb-6">
                <IoCartOutline className="w-10 h-10 md:w-12 md:h-12 text-text-muted" />
            </div>

            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                আপনার কার্ট খালি
            </h2>

            <p className="font-body text-sm md:text-base text-text-muted max-w-md mb-8 leading-relaxed">
                এখনো কোনো পণ্য যোগ করেননি। আমাদের সংগ্রহ থেকে পছন্দের পণ্য বেছে নিন।
            </p>

            <Link
                href="/products"
                className="inline-block bg-primary hover:bg-primary-hover text-white font-heading font-bold px-8 py-3 rounded-full shadow-md transition hover:scale-[1.02]"
            >
                কেনাকাটা শুরু করুন
            </Link>
        </div>
    );
};

export default EmptyCart;