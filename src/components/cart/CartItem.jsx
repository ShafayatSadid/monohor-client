// components/cart/CartItem.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoClose, IoRemove, IoAdd, IoBookmarkOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";

const CartItem = ({ item }) => {
    const updateQty = useCartStore((s) => s.updateQty);
    const removeItem = useCartStore((s) => s.removeItem);
    const saveForLater = useCartStore((s) => s.saveForLater);

    const isOutOfStock = item.stock === 0;
    const atMaxStock = item.qty >= item.stock;

    const inc = () => {
        if (atMaxStock) {
            toast.error(`মাত্র ${item.stock}টি স্টকে আছে`, {
                duration: 2500,
            });
            return;
        }
        updateQty(item.slug, item.qty + 1);
    };

    const dec = () => {
        if (item.qty <= 1) return;
        updateQty(item.slug, item.qty - 1);
    };

    const handleRemove = () => {
        removeItem(item.slug);
        toast.success("কার্ট থেকে সরানো হয়েছে", { duration: 2000 });
    };

    const handleSaveForLater = () => {
        saveForLater(item.slug);
        toast.success("পরে কিনবেন তালিকায় যোগ হয়েছে", {
            duration: 2000,
        });
    };

    return (
        <div className="flex gap-3 md:gap-4 py-4 md:py-5 border-b border-border last:border-b-0">
            {/* Image */}
            <Link
                href={`/products/${item.slug}`}
                className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border border-border bg-surface"
            >
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                />
            </Link>

            {/* Info + Actions */}
            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <Link
                        href={`/products/${item.slug}`}
                        className="font-heading text-sm md:text-base font-bold text-foreground leading-snug line-clamp-2 hover:text-primary transition"
                    >
                        {item.name}
                    </Link>

                    <button
                        onClick={handleRemove}
                        aria-label="Remove item"
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:bg-error/10 hover:text-error transition"
                    >
                        <IoClose className="w-4 h-4" />
                    </button>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                    {item.oldPrice && item.oldPrice > item.price ? (
                        <>
                            <span className="font-accent text-sm md:text-base font-bold text-primary">
                                ৳{item.price}
                            </span>
                            <span className="font-accent text-xs text-text-muted line-through">
                                ৳{item.oldPrice}
                            </span>
                        </>
                    ) : (
                        <span className="font-accent text-sm md:text-base font-bold text-primary">
                            ৳{item.price}
                        </span>
                    )}
                </div>

                {isOutOfStock && (
                    <p className="font-body text-xs text-error font-semibold mb-2">
                        ● এই মুহূর্তে স্টকে নেই
                    </p>
                )}

                {/* Bottom row: Qty + Save for later */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-full overflow-hidden bg-surface">
                        <button
                            onClick={dec}
                            disabled={item.qty <= 1}
                            aria-label="Decrease"
                            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30 transition"
                        >
                            <IoRemove className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-accent text-sm font-bold text-foreground">
                            {item.qty}
                        </span>
                        <button
                            onClick={inc}
                            disabled={atMaxStock}
                            aria-label="Increase"
                            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30 transition"
                        >
                            <IoAdd className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Item total */}
                    <span className="font-accent text-sm md:text-base font-bold text-foreground hidden sm:inline">
                        ৳{item.price * item.qty}
                    </span>

                    {/* Save for later */}
                    <button
                        onClick={handleSaveForLater}
                        className="flex items-center gap-1 font-body text-xs text-text-muted hover:text-secondary transition"
                    >
                        <IoBookmarkOutline className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">পরে কিনবেন</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;