// components/products/ProductSlider.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SectionHeading from "@/components/shared/SectionHeading";
import ProductCard from "./ProductCard";

const ProductSlider = ({
    tag,
    title,
    subtitle,
    viewAllHref,
    products = [],
    autoPlay = true,
    autoPlayDelay = 8000,
}) => {
    // useState lazy initializer — plugin শুধু একবার তৈরি হবে,
    // render-এর সময় ref access হবে না
    const [autoplayPlugin] = useState(() =>
        autoPlay
            ? Autoplay({
                  delay: autoPlayDelay,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                  playOnInit: true,
              })
            : null
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: autoPlay,
            skipSnaps: false,
            containScroll: autoPlay ? undefined : "trimSnaps",
        },
        autoplayPlugin ? [autoplayPlugin] : []
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
        autoplayPlugin?.stop?.();
    }, [emblaApi, autoplayPlugin]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
        autoplayPlugin?.stop?.();
    }, [emblaApi, autoplayPlugin]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
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

    if (!products || products.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">
            <SectionHeading
                tag={tag}
                title={title}
                subtitle={subtitle}
                viewAllHref={viewAllHref}
                onPrev={scrollPrev}
                onNext={scrollNext}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
            />

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-3 md:-ml-4">
                    {products.map((product) => (
                        <div
                            key={product._id || product.slug}
                            className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-3 md:pl-4"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSlider;