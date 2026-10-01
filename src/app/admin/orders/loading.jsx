// src/app/admin/orders/loading.jsx
export default function AdminOrdersLoading() {
    return (
        <div className="space-y-5">
            <div className="h-11 w-full max-w-md bg-surface rounded-lg animate-pulse" />
            <div className="flex gap-2 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-24 bg-surface border border-border rounded-full animate-pulse shrink-0"
                    />
                ))}
            </div>
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-20 bg-surface border border-border rounded-xl animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}