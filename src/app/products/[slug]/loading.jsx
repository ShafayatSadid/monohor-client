// src/app/products/[slug]/loading.jsx
export default function ProductDetailLoading() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            {/* Breadcrumb */}
            <div className="h-4 w-64 bg-surface rounded animate-pulse mb-6 md:mb-8" />

            {/* Two-column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
                {/* Gallery */}
                <div className="space-y-3">
                    <div className="aspect-square bg-surface border border-border rounded-xl animate-pulse" />
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-surface border border-border rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                    <div className="h-4 w-20 bg-surface rounded animate-pulse" />
                    <div className="h-8 md:h-10 w-3/4 bg-surface rounded animate-pulse" />
                    <div className="h-5 w-40 bg-surface rounded animate-pulse" />
                    <div className="h-10 w-32 bg-surface rounded animate-pulse" />
                    <div className="h-4 w-32 bg-surface rounded animate-pulse" />
                    <div className="space-y-2 pt-4 border-t border-border">
                        <div className="h-3 bg-surface rounded animate-pulse" />
                        <div className="h-3 bg-surface rounded animate-pulse" />
                        <div className="h-3 w-2/3 bg-surface rounded animate-pulse" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <div className="h-11 w-32 bg-surface rounded-full animate-pulse" />
                        <div className="h-11 flex-1 bg-surface rounded-full animate-pulse" />
                        <div className="h-11 w-11 bg-surface rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}