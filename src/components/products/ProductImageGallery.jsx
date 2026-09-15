// components/products/ProductImageGallery.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const FALLBACK_IMAGES = [
    "/images/slide-1.webp",
    "/images/slide-2.webp",
    "/images/slide-3.webp",
];

const ProductImageGallery = ({ images = [], alt = "Product" }) => {
    const gallery = images && images.length > 0 ? images : FALLBACK_IMAGES;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback(
        (index) => emblaApi?.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="w-full">
            {/* Main Image */}
            <div
                className="overflow-hidden rounded-xl border border-border bg-surface"
                ref={emblaRef}
            >
                <div className="flex">
                    {gallery.map((img, i) => (
                        <div
                            key={i}
                            className="relative flex-[0_0_100%] min-w-0 aspect-square"
                        >
                            <Image
                                src={img}
                                alt={`${alt} - ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={i === 0}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2 md:gap-3 mt-3 md:mt-4">
                    {gallery.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Image ${i + 1}`}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                                selectedIndex === i
                                    ? "border-secondary"
                                    : "border-border hover:border-secondary/60"
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`${alt} thumbnail ${i + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImageGallery;