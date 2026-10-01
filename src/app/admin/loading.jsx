// src/app/admin/loading.jsx
export default function AdminLoading() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-32 bg-surface border border-border rounded-xl animate-pulse"
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-80 bg-surface border border-border rounded-xl animate-pulse" />
                <div className="h-80 bg-surface border border-border rounded-xl animate-pulse" />
            </div>
        </div>
    );
}