// components/admin/ReviewFilterTabs.jsx
"use client";

const TABS = [
    { value: "all", label: "সব" },
    { value: "pending", label: "পেন্ডিং" },
    { value: "approved", label: "অ্যাপ্রুভড" },
    { value: "rejected", label: "রিজেক্টেড" },
];

const ReviewFilterTabs = ({ active, onChange, counts = {} }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TABS.map((tab) => {
                const isActive = active === tab.value;
                const count = counts[tab.value] ?? 0;

                return (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border font-body text-xs font-semibold transition ${
                            isActive
                                ? "bg-primary text-white border-primary"
                                : "bg-surface text-foreground border-border hover:border-secondary/60"
                        }`}
                    >
                        {tab.label}
                        <span
                            className={`inline-block min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-background text-text-muted"
                            }`}
                        >
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default ReviewFilterTabs;