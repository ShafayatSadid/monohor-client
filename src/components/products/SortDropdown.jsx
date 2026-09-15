// components/products/SortDropdown.jsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const options = [
    { value: "newest", label: "নতুন আগে" },
    { value: "price_asc", label: "দাম: কম থেকে বেশি" },
    { value: "price_desc", label: "দাম: বেশি থেকে কম" },
    { value: "popular", label: "জনপ্রিয়তা" },
];

const SortDropdown = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const current = searchParams.get("sort") || "newest";

    const handleChange = (e) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (value === "newest") params.delete("sort");
        else params.set("sort", value);
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="hidden md:inline font-body text-xs text-text-muted">
                সাজান:
            </span>
            <select
                value={current}
                onChange={handleChange}
                className="bg-surface border border-border rounded-full px-4 py-2 font-body text-xs md:text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;