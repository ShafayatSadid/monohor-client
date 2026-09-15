// components/shared/SectionHeading.jsx
"use client";

import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SectionHeading = ({
    tag,
    title,
    subtitle,
    viewAllHref,
    viewAllLabel,
    onPrev,
    onNext,
    canScrollPrev = true,
    canScrollNext = true,
}) => {
    const hasArrows =
        typeof onPrev === "function" && typeof onNext === "function";

    return (
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
            <div className="min-w-0">
                {tag && (
                    <span className="inline-block font-accent text-[10px] md:text-xs tracking-[0.2em] uppercase text-secondary mb-2">
                        {tag}
                    </span>
                )}
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="font-body text-sm text-text-muted mt-2">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="shrink-0 flex items-center gap-3 pb-1">
                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="font-body text-xs md:text-sm text-text-muted hover:text-primary transition flex items-center gap-1 whitespace-nowrap"
                    >
                        {viewAllLabel || "সব দেখুন"}
                        <span className="text-secondary">→</span>
                    </Link>
                )}

                {hasArrows && (
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={onPrev}
                            disabled={!canScrollPrev}
                            aria-label="Previous"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground hover:border-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <IoChevronBack className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            disabled={!canScrollNext}
                            aria-label="Next"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground hover:border-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <IoChevronForward className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionHeading;