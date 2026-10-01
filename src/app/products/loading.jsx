// src/app/products/loading.jsx
export default function ProductsLoading() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">
            {/* Header skeleton */}
            <div className="mb-6 md:mb-8">
                <div className="h-8 md:h-10 w-48 bg-surface rounded-lg animate-pulse mb-2" />
                <div className="h-4 w-32 bg-surface rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-8">
                {/* Sidebar skeleton */}
                <div className="hidden md:block space-y-4">
                    <div className="h-64 bg-surface border border-border rounded-xl animate-pulse" />
                    <div className="h-40 bg-surface border border-border rounded-xl animate-pulse" />
                </div>

                {/* Products grid skeleton */}
                <div className="min-w-0">
                    <div className="flex justify-end mb-5">
                        <div className="h-10 w-40 bg-surface rounded-lg animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-surface border border-border rounded-xl overflow-hidden"
                            >
                                <div className="aspect-square bg-background animate-pulse" />
                                <div className="p-3 md:p-4 space-y-2">
                                    <div className="h-4 bg-background rounded animate-pulse" />
                                    <div className="h-4 w-3/4 bg-background rounded animate-pulse" />
                                    <div className="h-5 w-20 bg-background rounded animate-pulse mt-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}