// components/products/ProductCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const PLACEHOLDER_IMAGE = "/images/slide-1.webp";

const ProductCard = ({ product }) => {
    const imgSrc = product.images?.[0] || PLACEHOLDER_IMAGE;

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

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Zustand cart store-এ যোগ করবেন
        console.log("Add to cart:", product.slug);
    };

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group flex flex-col h-full bg-surface rounded-xl overflow-hidden border border-border hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-background">
                <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Discount Badge */}
                {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-error text-white font-accent text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        -{discountPercent}%
                    </span>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <span className="font-heading text-white text-sm md:text-base font-bold border border-white/60 rounded-full px-3 py-1">
                            স্টক নেই
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex flex-col flex-1">
                {/* Name */}
                <h3 className="font-heading text-sm md:text-base font-bold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.5rem] md:min-h-[2.75rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    {hasDiscount ? (
                        <>
                            <span className="font-accent text-base md:text-lg font-bold text-primary">
                                ৳{product.price}
                            </span>
                            <span className="font-accent text-xs md:text-sm text-text-muted line-through">
                                ৳{product.oldPrice}
                            </span>
                        </>
                    ) : (
                        <span className="font-accent text-base md:text-lg font-bold text-primary">
                            ৳{product.price}
                        </span>
                    )}
                </div>

                {/* Add to Cart */}
                <Button
                    onClick={handleAddToCart}
                    isDisabled={isOutOfStock}
                    className="w-full mt-auto bg-primary hover:bg-primary-hover disabled:bg-border disabled:text-text-muted text-white font-heading font-semibold text-xs md:text-sm py-2 rounded-full transition"
                >
                    কার্টে যোগ করুন
                </Button>
            </div>
        </Link>
    );
};

export default ProductCard;