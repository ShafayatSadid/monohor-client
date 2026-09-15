// components/products/Pagination.jsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goTo = (page) => {
        const params = new URLSearchParams(searchParams);
        if (page === 1) params.delete("page");
        else params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxShow = 5;

        if (totalPages <= maxShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-10 md:mt-12">
            {/* Prev */}
            <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-border text-foreground hover:border-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
                <IoChevronBack className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, i) =>
                p === "..." ? (
                    <span
                        key={`dots-${i}`}
                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-text-muted font-body text-sm"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => goTo(p)}
                        className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full font-body text-sm font-semibold transition ${
                            p === currentPage
                                ? "bg-primary text-white"
                                : "text-foreground hover:bg-surface border border-border"
                        }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-border text-foreground hover:border-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
                <IoChevronForward className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;