// app/products/page.js
import { getProductsPaginated } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import SortDropdown from "@/components/products/SortDropdown";
import Pagination from "@/components/products/Pagination";
import Link from "next/link";

const LIMIT = 8;

const categoryNames = {
    attar: "আতর",
    bakhur: "বাখুর",
    "hater-kaj": "কুশিটাকার কাজ",
    showpiece: "শোপিস",
};

export default async function ProductsPage({ searchParams }) {
    const params = await searchParams;

    const page = parseInt(params.page) || 1;

    const query = {
        page,
        limit: LIMIT,
        ...(params.category && { category: params.category }),
        ...(params.search && { search: params.search }),
        ...(params.sort && { sort: params.sort }),
        ...(params.minPrice && { minPrice: params.minPrice }),
        ...(params.maxPrice && { maxPrice: params.maxPrice }),
        ...(params.featured === "true" && { featured: "true" }),
        ...(params.newArrival === "true" && { newArrival: "true" }),
        ...(params.bestSeller === "true" && { bestSeller: "true" }),
    };

    const data = await getProductsPaginated(query);
    const products = data.products || [];
    const total = data.total || 0;
    const totalPages = data.totalPages || 1;

    // Heading text
    let heading = "সব পণ্য";
    if (params.category) heading = categoryNames[params.category] || "পণ্য";
    else if (params.search) heading = `"${params.search}" এর ফলাফল`;
    else if (params.featured === "true") heading = "ফিচার্ড পণ্য";
    else if (params.newArrival === "true") heading = "নতুন পণ্য";
    else if (params.bestSeller === "true") heading = "বেস্ট সেলার";

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-2">
                    {heading}
                </h1>
                <p className="font-body text-sm text-text-muted">
                    {total}টি পণ্য পাওয়া গেছে
                </p>
            </div>

            {/* Layout: sidebar + products */}
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-8">
                {/* Filters (desktop sidebar + mobile button & drawer) */}
                <ProductFilters categories={categoryNames} />

                {/* Products area */}
                <div className="min-w-0">
                    {/* Sort row */}
                    <div className="flex items-center justify-between mb-5 md:mb-6">
                        <div className="md:hidden" />
                        <div className="ml-auto">
                            <SortDropdown />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {products.map((p) => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-20 border border-border rounded-xl bg-surface/50">
            <p className="font-heading text-xl font-bold text-foreground mb-2">
                কোনো পণ্য পাওয়া যায়নি
            </p>
            <p className="font-body text-sm text-text-muted mb-6">
                ফিল্টার পরিবর্তন করে আবার দেখুন
            </p>
            <Link
                href="/products"
                className="inline-block bg-primary hover:bg-primary-hover text-white font-heading font-semibold px-6 py-2.5 rounded-full transition"
            >
                সব পণ্য দেখুন
            </Link>
        </div>
    );
}