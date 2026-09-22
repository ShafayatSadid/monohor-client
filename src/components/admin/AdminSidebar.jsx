// components/admin/AdminSidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IoGridOutline,
    IoCubeOutline,
    IoPricetagsOutline,
    IoReceiptOutline,
    IoPeopleOutline,
    IoStorefrontOutline,
} from "react-icons/io5";

const links = [
    { href: "/admin", label: "ড্যাশবোর্ড", icon: IoGridOutline, exact: true },
    { href: "/admin/products", label: "পণ্য", icon: IoCubeOutline },
    { href: "/admin/categories", label: "ক্যাটাগরি", icon: IoPricetagsOutline },
    { href: "/admin/orders", label: "অর্ডার", icon: IoReceiptOutline },
    { href: "/admin/users", label: "ইউজার", icon: IoPeopleOutline, disabled: true },
];

const AdminSidebar = ({ mobileOpen, onClose }) => {
    const pathname = usePathname();

    const isActive = (link) => {
        if (link.exact) return pathname === link.href;
        return pathname.startsWith(link.href);
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="px-5 py-5 border-b border-border">
                <Link href="/admin" className="inline-flex flex-col leading-none">
                    <span className="font-heading text-xl font-extrabold text-primary tracking-tight">
                        মনোহর
                    </span>
                    <span className="font-accent text-[9px] tracking-[0.35em] text-secondary mt-0.5">
                        ADMIN PANEL
                    </span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link);

                    if (link.disabled) {
                        return (
                            <div
                                key={link.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted/60 cursor-not-allowed"
                                title="শীঘ্রই আসছে"
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-body text-sm">
                                    {link.label}
                                </span>
                                <span className="ml-auto font-body text-[10px] bg-border px-2 py-0.5 rounded-full">
                                    শীঘ্রই
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                                active
                                    ? "bg-primary text-white"
                                    : "text-foreground hover:bg-primary/10 hover:text-primary"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-body text-sm font-medium">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Back to store */}
            <div className="px-3 py-3 border-t border-border">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface hover:text-primary transition"
                >
                    <IoStorefrontOutline className="w-4 h-4" />
                    <span className="font-body text-sm">Store-এ ফিরুন</span>
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar — sticky below navbar */}
            <aside className="hidden md:flex flex-col w-60 shrink-0 bg-surface border-r border-border">
                {sidebarContent}
            </aside>

            {/* Mobile drawer */}
            <div
                className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
                    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50"
                />
                <aside
                    className={`absolute top-0 left-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 ease-out ${
                        mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {sidebarContent}
                </aside>
            </div>
        </>
    );
};

export default AdminSidebar;