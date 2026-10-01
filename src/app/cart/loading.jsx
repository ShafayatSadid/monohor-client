// src/app/cart/loading.jsx
export default function CartLoading() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            <div className="h-4 w-32 bg-surface rounded animate-pulse mb-6 md:mb-8" />
            <div className="h-8 md:h-10 w-48 bg-surface rounded animate-pulse mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10">
                <div className="bg-surface/50 border border-border rounded-xl p-4 md:p-6 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex gap-4 py-4 border-b border-border last:border-0"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-background rounded-lg animate-pulse" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-3/4 bg-background rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-background rounded animate-pulse" />
                                <div className="h-8 w-32 bg-background rounded-full animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 md:p-6 h-96 animate-pulse" />
            </div>
        </div>
    );
}