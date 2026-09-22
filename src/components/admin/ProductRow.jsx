// components/admin/ProductRow.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

const FALLBACK = "/images/slide-1.webp";

const ProductRow = ({ product, onDelete }) => {
    const img = product.images?.[0] || FALLBACK;
    const outOfStock = product.stock === 0;
    const lowStock = product.stock > 0 && product.stock <= 5;

    return (
        <div className="grid grid-cols-[40px_minmax(0,1fr)_56px_36px_64px] md:grid-cols-[64px_1fr_120px_100px_80px_100px] items-center gap-2 md:gap-4 p-2.5 md:p-4 bg-surface border border-border rounded-xl hover:border-secondary/40 transition">
            {/* Image */}
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-md md:rounded-lg overflow-hidden border border-border shrink-0">
                <Image
                    src={img}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                />
            </div>

            {/* Name + slug */}
            <div className="min-w-0">
                <p className="font-body text-xs md:text-sm font-semibold text-foreground line-clamp-1">
                    {product.name}
                </p>
                <p className="font-body text-[10px] md:text-xs text-text-muted line-clamp-1">
                    {product.slug}
                </p>
            </div>

            {/* Category — desktop only */}
            <p className="hidden md:block font-body text-xs text-foreground capitalize">
                {product.category}
            </p>

            {/* Price */}
            <p className="font-price text-[11px] md:text-sm font-bold text-primary text-right md:text-left">
                ৳{product.price}
            </p>

            {/* Stock */}
            <p
                className={`font-price text-[11px] md:text-sm font-bold text-center ${
                    outOfStock
                        ? "text-error"
                        : lowStock
                        ? "text-warning"
                        : "text-success"
                }`}
            >
                {product.stock}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2 justify-end">
                <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md md:rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition"
                    aria-label="Edit"
                >
                    <IoCreateOutline className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
                <button
                    onClick={() => onDelete(product)}
                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md md:rounded-lg border border-border text-foreground hover:border-error hover:text-error transition"
                    aria-label="Delete"
                >
                    <IoTrashOutline className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
            </div>
        </div>
    );
};

export default ProductRow;