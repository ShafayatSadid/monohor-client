// components/products/ProductInfo.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
    IoHeartOutline,
    IoHeart,
    IoRemove,
    IoAdd,
    IoStar,
    IoStarHalf,
    IoStarOutline,
} from "react-icons/io5";

const categoryNames = {
    attar: "আতর",
    bakhur: "বাখুর",
    "hater-kaj": "কুশিটাকার কাজ",
    showpiece: "শোপিস",
};

const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push(<IoStar key={i} className="w-4 h-4" />);
        else if (rating >= i - 0.5)
            stars.push(<IoStarHalf key={i} className="w-4 h-4" />);
        else stars.push(<IoStarOutline key={i} className="w-4 h-4" />);
    }
    return stars;
};

const ProductInfo = ({ product }) => {
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);

    const hasDiscount =
        product.oldPrice && Number(product.oldPrice) > Number(product.price);

    const discountPercent = hasDiscount
        ? Math.round(
              ((Number(product.oldPrice) - Number(product.price)) /
                  Number(product.oldPrice)) *
                  100
          )
        : 0;

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const categoryName =
        categoryNames[product.category] || product.category || "";

    const inc = () => setQty((q) => Math.min(q + 1, product.stock || 1));
    const dec = () => setQty((q) => Math.max(1, q - 1));

    const handleAddToCart = () => {
        // TODO: Zustand cart store-এ যোগ করবেন
        console.log("Add to cart:", product.slug, "Qty:", qty);
    };

    return (
        <div className="flex flex-col">
            {/* Category tag */}
            {product.category && (
                <Link
                    href={`/products?category=${product.category}`}
                    className="inline-block font-accent text-[11px] md:text-xs tracking-[0.2em] uppercase text-secondary mb-3 w-fit hover:underline"
                >
                    {categoryName}
                </Link>
            )}

            {/* Name */}
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-3">
                {product.name}
            </h1>

            {/* Rating (static placeholder) */}
            <div className="flex items-center gap-2 mb-4 md:mb-5">
                <div className="flex items-center text-secondary">
                    {renderStars(product.rating || 0)}
                </div>
                <span className="font-body text-xs text-text-muted">
                    {(product.rating || 0).toFixed(1)} রেটিং
                </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 md:mb-6">
                <span className="font-accent text-2xl md:text-3xl font-extrabold text-primary">
                    ৳{product.price}
                </span>
                {hasDiscount && (
                    <>
                        <span className="font-accent text-base md:text-lg text-text-muted line-through">
                            ৳{product.oldPrice}
                        </span>
                        <span className="font-accent text-xs md:text-sm font-bold text-error bg-error/10 px-2 py-0.5 rounded-full">
                            -{discountPercent}%
                        </span>
                    </>
                )}
            </div>

            {/* Stock status */}
            <div className="mb-5 md:mb-6">
                {isOutOfStock ? (
                    <span className="font-body text-sm text-error font-semibold">
                        ● স্টক নেই
                    </span>
                ) : isLowStock ? (
                    <span className="font-body text-sm text-warning font-semibold">
                        ● মাত্র {product.stock}টি বাকি
                    </span>
                ) : (
                    <span className="font-body text-sm text-success font-semibold">
                        ● স্টকে আছে
                    </span>
                )}
            </div>

            {/* Description */}
            {product.description && (
                <div className="mb-5 md:mb-6 pb-5 md:pb-6 border-b border-border">
                    <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                {/* Quantity selector */}
                <div className="flex items-center justify-between sm:justify-start border border-border rounded-full overflow-hidden bg-surface">
                    <button
                        onClick={dec}
                        disabled={qty <= 1 || isOutOfStock}
                        aria-label="Decrease quantity"
                        className="w-11 h-11 flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30 transition"
                    >
                        <IoRemove className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-accent font-bold text-foreground">
                        {qty}
                    </span>
                    <button
                        onClick={inc}
                        disabled={qty >= product.stock || isOutOfStock}
                        aria-label="Increase quantity"
                        className="w-11 h-11 flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30 transition"
                    >
                        <IoAdd className="w-4 h-4" />
                    </button>
                </div>

                {/* Add to Cart */}
                <Button
                    onClick={handleAddToCart}
                    isDisabled={isOutOfStock}
                    className="flex-1 bg-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted text-white font-heading font-bold text-sm md:text-base py-3 h-11 rounded-full shadow-sm transition"
                >
                    {isOutOfStock ? "স্টক নেই" : "কার্টে যোগ করুন"}
                </Button>

                {/* Wishlist */}
                <button
                    onClick={() => setWishlisted((w) => !w)}
                    aria-label="Toggle wishlist"
                    className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-full border transition ${
                        wishlisted
                            ? "border-error text-error bg-error/10"
                            : "border-border text-foreground hover:border-error hover:text-error"
                    }`}
                >
                    {wishlisted ? (
                        <IoHeart className="w-5 h-5" />
                    ) : (
                        <IoHeartOutline className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Meta info */}
            <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                <p className="font-body text-xs text-text-muted">
                    <span className="text-foreground/70">ক্যাটাগরি:</span>{" "}
                    {categoryName}
                </p>
                <p className="font-body text-xs text-text-muted">
                    <span className="text-foreground/70">কোড:</span>{" "}
                    {product.slug?.toUpperCase()}
                </p>
            </div>
        </div>
    );
};

export default ProductInfo;