// components/cart/SavedForLater.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoClose, IoBagAddOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";

const SavedForLater = () => {
    const savedItems = useCartStore((s) => s.savedItems);
    const moveToCart = useCartStore((s) => s.moveToCart);
    const removeSaved = useCartStore((s) => s.removeSaved);

    if (savedItems.length === 0) return null;

    const handleMoveToCart = (item) => {
        if (item.stock === 0) {
            toast.error("এই পণ্যটি এখন স্টকে নেই", { duration: 2500 });
            return;
        }
        moveToCart(item.slug);
        toast.success("কার্টে ফিরিয়ে আনা হয়েছে", { duration: 2000 });
    };

    const handleRemove = (slug) => {
        removeSaved(slug);
        toast.success("তালিকা থেকে সরানো হয়েছে", { duration: 2000 });
    };

    return (
        <section className="mt-10 md:mt-14">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
                <h2 className="font-heading text-lg md:text-2xl font-extrabold text-foreground">
                    পরে কিনবেন
                </h2>
                <span className="font-body text-xs md:text-sm text-text-muted">
                    ({savedItems.length}টি পণ্য)
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {savedItems.map((item) => (
                    <div
                        key={item.slug}
                        className="flex gap-3 p-3 bg-surface border border-border rounded-xl"
                    >
                        {/* Image */}
                        <Link
                            href={`/products/${item.slug}`}
                            className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden border border-border"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col">
                            <Link
                                href={`/products/${item.slug}`}
                                className="font-heading text-sm font-bold text-foreground leading-snug line-clamp-2 hover:text-primary transition mb-1"
                            >
                                {item.name}
                            </Link>

                            <span className="font-price text-sm font-bold text-primary mb-2">
                                ৳{item.price}
                            </span>

                            <div className="flex items-center gap-3 mt-auto">
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    disabled={item.stock === 0}
                                    className="flex items-center gap-1.5 font-body text-xs font-semibold text-primary hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    <IoBagAddOutline className="w-3.5 h-3.5" />
                                    কার্টে ফিরান
                                </button>

                                <button
                                    onClick={() => handleRemove(item.slug)}
                                    aria-label="Remove"
                                    className="ml-auto w-6 h-6 flex items-center justify-center rounded-full text-text-muted hover:bg-error/10 hover:text-error transition"
                                >
                                    <IoClose className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SavedForLater;