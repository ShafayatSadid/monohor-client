// components/admin/StatsCard.jsx
const StatsCard = ({ icon: Icon, label, value, subtitle, color = "primary" }) => {
    const colorMap = {
        primary: "text-primary bg-primary/10",
        success: "text-success bg-success/10",
        warning: "text-warning bg-warning/10",
        error: "text-error bg-error/10",
        info: "text-info bg-info/10",
    };

    return (
        <div className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
                <span className="font-body text-xs md:text-sm text-text-muted">
                    {label}
                </span>
                <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        colorMap[color] || colorMap.primary
                    }`}
                >
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <p className="font-price text-2xl md:text-3xl font-extrabold text-foreground">
                {value}
            </p>
            {subtitle && (
                <p className="font-body text-xs text-text-muted mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default StatsCard;