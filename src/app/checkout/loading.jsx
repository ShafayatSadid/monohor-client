// src/app/checkout/loading.jsx
export default function CheckoutLoading() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            <div className="h-4 w-64 bg-surface rounded animate-pulse mb-6" />
            <div className="h-8 md:h-10 w-48 bg-surface rounded animate-pulse mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10">
                <div className="space-y-4">
                    <div className="h-64 bg-surface border border-border rounded-xl animate-pulse" />
                    <div className="h-96 bg-surface border border-border rounded-xl animate-pulse" />
                    <div className="h-40 bg-surface border border-border rounded-xl animate-pulse" />
                </div>
                <div className="h-[600px] bg-surface border border-border rounded-xl animate-pulse" />
            </div>
        </div>
    );
}