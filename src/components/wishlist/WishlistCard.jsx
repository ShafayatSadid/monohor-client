// components/wishlist/WishlistCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoClose, IoCartOutline } from "react-icons/io5";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const FALLBACK = "/images/slide-1.webp";

const WishlistCard = ({ item }) => {
    const addToCart = useCartStore((s) => s.addItem);
    const removeWishlist = useWishlistStore((s) => s.removeItem);

    const outOfStock = item.stock === 0;

    const handleAddToCart = () => {
        if (outOfStock) {
            toast.error("এই পণ্যটি এখন স্টকে নেই");
            return;
        }

        const result = addToCart(
            {
                slug: item.slug,
                name: item.name,
                price: item.price,
                oldPrice: item.oldPrice,
                images: [item.image],
                stock: item.stock,
            },
            1
        );

        if (!result.ok) {
            toast.error(result.message || "যোগ করা যায়নি");
            return;
        }

        toast.success(`"${item.name}" কার্টে যোগ হয়েছে`);
    };

    const handleRemove = () => {
        removeWishlist(item.slug);
        toast.success("উইশলিস্ট থেকে সরানো হয়েছে");
    };

    const hasDiscount =
        item.oldPrice && Number(item.oldPrice) > Number(item.price);

    return (
        <div className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-secondary/60 transition flex flex-col">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-background">
                <Link href={`/products/${item.slug}`}>
                    <Image
                        src={item.image || FALLBACK}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Remove button */}
                <button
                    onClick={handleRemove}
                    aria-label="Remove from wishlist"
                    className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-blur text-foreground backdrop-blur-md transition"
                >
                    <IoClose className="w-4 h-4 text-error" />
                </button>

                {/* Discount badge */}
                {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-error text-white font-accent text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -
                        {Math.round(
                            ((Number(item.oldPrice) - Number(item.price)) /
                                Number(item.oldPrice)) *
                                100
                        )}
                        %
                    </span>
                )}

                {/* Out of stock */}
                {outOfStock && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <span className="font-heading text-white text-xs md:text-sm font-bold border border-white/60 rounded-full px-3 py-1">
                            স্টক নেই
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex flex-col flex-1">
                <Link
                    href={`/products/${item.slug}`}
                    className="font-heading text-sm md:text-base font-bold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.5rem] md:min-h-[2.75rem] hover:text-primary transition"
                >
                    {item.name}
                </Link>

                <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-price text-base md:text-lg font-bold text-primary">
                        ৳{item.price}
                    </span>
                    {hasDiscount && (
                        <span className="font-price text-xs md:text-sm text-text-muted line-through">
                            ৳{item.oldPrice}
                        </span>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={outOfStock}
                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed text-white font-heading font-semibold text-xs md:text-sm py-2.5 rounded-full transition"
                >
                    <IoCartOutline className="w-4 h-4" />
                    {outOfStock ? "স্টক নেই" : "কার্টে যোগ করুন"}
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;