// components/shared/SectionHeading.jsx
import Link from "next/link";

const SectionHeading = ({ tag, title, subtitle, viewAllHref, viewAllLabel }) => {
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

            {viewAllHref && (
                <Link
                    href={viewAllHref}
                    className="shrink-0 font-body text-sm text-text-muted hover:text-primary transition flex items-center gap-1 pb-1"
                >
                    {viewAllLabel || "সব দেখুন"}
                    <span className="text-secondary">→</span>
                </Link>
            )}
        </div>
    );
};

export default SectionHeading;