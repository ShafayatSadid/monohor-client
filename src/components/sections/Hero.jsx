// components/home/Hero.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@heroui/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const heroSlides = [
    {
        id: 1,
        tag: "খাঁটি সুগন্ধি",
        title: "সুবাসেই বলে দেবে আসলটা",
        subtitle: "রাজশাহীর গোলাপ, আসামের উদ — খাঁটি আতরের বিশ্বস্ত ঠিকানা।",
        cta: { label: "আতর দেখুন", href: "/products?category=attar" },
        image: "/images/slide-1.webp",
        imageAlt: "Traditional attar bottle",
    },
    {
        id: 2,
        tag: "প্রিমিয়াম বাখুর",
        title: "ঘরে ছড়াক আরবের সুবাস",
        subtitle: "খাঁটি উদ চিপস আর বাখুর — ধোঁয়ায় ভরে উঠুক আপনার ঘর।",
        cta: { label: "বাখুর দেখুন", href: "/products?category=bakhur" },
        image: "/images/slide-2.webp",
        imageAlt: "Premium bakhoor and oud chips",
    },
    {
        id: 3,
        tag: "হাতে বোনা",
        title: "প্রতিটা সেলাইয়ে আলাদা যত্ন",
        subtitle: "কারিগরের হাতে বোনা নকশি — একটাই, আর নেই।",
        cta: { label: "নকশি দেখুন", href: "/products?category=hater-kaj" },
        image: "/images/slide-3.webp",
        imageAlt: "Handmade crochet and nakshi work",
    },
    {
        id: 4,
        tag: "ঘরের সাজ",
        title: "সাধারণ ঘরও সাজে অসাধারণ",
        subtitle: "কাঠ, পিতল, ধাতুর হাতে গড়া শোপিসে বদলে যাক ঘরের চেহারা।",
        cta: { label: "শোপিস দেখুন", href: "/products?category=showpiece" },
        image: "/images/slide-4.webp",
        imageAlt: "Aesthetic handcrafted showpiece",
    },
];

const Hero = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start" },
        [
            Autoplay({
                delay: 6000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
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
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="relative w-full">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {heroSlides.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative flex-[0_0_100%] min-w-0"
                        >
                            <div className="relative h-[440px] sm:h-[480px] md:h-[600px] lg:h-[680px] overflow-hidden w-full">

                                {/* Background Image */}
                                <Image
                                    src={slide.image}
                                    alt={slide.imageAlt}
                                    fill
                                    priority={slide.id === 1}
                                    sizes="100vw"
                                    className="object-cover"
                                />

                                {/* Dark Overlay — stronger on mobile */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 md:bg-gradient-to-r md:from-black/85 md:via-black/55 md:to-transparent" />

                                {/* Subtle Bengali motif circles — desktop only */}
                                <div className="hidden md:block absolute inset-0 opacity-[0.05] pointer-events-none">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full max-w-7xl mx-auto px-5 md:px-10 pt-10 pb-16 md:py-24 flex flex-col justify-end md:justify-center">
                                    <div className="max-w-xl">
                                        {/* Tag */}
                                        <span className="inline-block font-accent text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#E5C177] mb-3 md:mb-5 border-b border-current pb-1">
                                            {slide.tag}
                                        </span>

                                        {/* Title */}
                                        <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.25] md:leading-[1.15] tracking-tight mb-3 md:mb-6 drop-shadow-lg">
                                            {slide.title}
                                        </h1>

                                        {/* Subtitle */}
                                        <p className="font-body text-[13px] sm:text-sm md:text-base text-white/85 leading-relaxed max-w-lg mb-5 md:mb-9 line-clamp-2 md:line-clamp-none">
                                            {slide.subtitle}
                                        </p>

                                        {/* CTA */}
                                        <Link href={slide.cta.href}>
                                            <Button
                                                size="lg"
                                                className="bg-[#C9A24B] hover:bg-[#B08F3E] text-[#2B1B12] font-heading font-bold text-sm md:text-base px-5 md:px-7 py-2.5 md:py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-[1.03]"
                                            >
                                                {slide.cta.label}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows — Desktop only */}
            <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition"
            >
                <IoChevronBack className="w-5 h-5" />
            </button>
            <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition"
            >
                <IoChevronForward className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            index === selectedIndex
                                ? "w-8 h-2 bg-[#C9A24B]"
                                : "w-2 h-2 bg-white/40 hover:bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;