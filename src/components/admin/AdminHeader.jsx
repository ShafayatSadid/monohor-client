// components/admin/AdminHeader.jsx
"use client";

import { usePathname } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";

const titles = {
    "/admin": "ড্যাশবোর্ড",
    "/admin/products": "পণ্য ব্যবস্থাপনা",
    "/admin/products/new": "নতুন পণ্য",
    "/admin/categories": "ক্যাটাগরি ব্যবস্থাপনা",
    "/admin/orders": "অর্ডার ব্যবস্থাপনা",
    "/admin/users": "ইউজার ব্যবস্থাপনা",
};

const AdminHeader = ({ onMenuClick }) => {
    const pathname = usePathname();

    let title = titles[pathname];
    if (!title) {
        if (
            pathname.startsWith("/admin/products/") &&
            pathname.endsWith("/edit")
        ) {
            title = "পণ্য সম্পাদনা";
        } else if (pathname.startsWith("/admin/orders/")) {
            title = "অর্ডার বিবরণ";
        } else {
            title = "অ্যাডমিন";
        }
    }

    return (
        <header className="bg-background border-b border-border px-4 md:px-6 py-3 flex items-center gap-3">
            <button
                onClick={onMenuClick}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-foreground hover:bg-surface transition"
                aria-label="Open menu"
            >
                <HiMenuAlt1 className="w-5 h-5" />
            </button>

            <h1 className="font-heading text-lg md:text-xl font-extrabold text-foreground">
                {title}
            </h1>
        </header>
    );
};

export default AdminHeader;