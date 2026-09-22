// components/shared/MobileBottomNav.jsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
    IoHomeOutline,
    IoGridOutline,
    IoCartOutline,
    IoClose,
    IoHeartOutline,
    IoReceiptOutline,
} from "react-icons/io5";
import { Avatar, Badge, Button } from "@heroui/react";
import {
    ArrowRightFromSquare,
    Person,
    Persons,
    Gear,
} from "@gravity-ui/icons";
import { useRouter, usePathname } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore";

const MobileBottomNav = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    // TODO: পরে Zustand থেকে আনবেন
    const cartCount = useCartStore((s) =>
        s.items.reduce((sum, i) => sum + i.qty, 0)
    );

    const tabs = [
        { key: "home", label: "হোম", href: "/", icon: IoHomeOutline },
        { key: "categories", label: "ক্যাটাগরি", href: "/products", icon: IoGridOutline },
        { key: "cart", label: "কার্ট", href: "/cart", icon: IoCartOutline, badge: cartCount },
        { key: "account", label: "অ্যাকাউন্ট", icon: Person, isSheet: true },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const handleSignOut = async () => {
        setSheetOpen(false);
        await authClient.signOut();
        router.push("/");
    };

    const handleAccountClick = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        setSheetOpen(true);
    };

    return (
        <>
            {/* ==================== BOTTOM NAV ==================== */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
                <ul className="grid grid-cols-4">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = tab.href ? isActive(tab.href) : sheetOpen;

                        if (tab.isSheet) {
                            return (
                                <li key={tab.key}>
                                    <button
                                        onClick={handleAccountClick}
                                        className={`w-full flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${active ? "text-primary" : "text-text-muted"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-body text-[10px] font-semibold">
                                            {tab.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        }

                        return (
                            <li key={tab.key}>
                                <Link
                                    href={tab.href}
                                    className={`flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${active ? "text-primary" : "text-text-muted"
                                        }`}
                                >
                                    <span className="relative">
                                        <Icon className="w-5 h-5" />
                                        {tab.badge > 0 && (
                                            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                                                {tab.badge}
                                            </span>
                                        )}
                                    </span>
                                    <span className="font-body text-[10px] font-semibold">
                                        {tab.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ==================== ACCOUNT BOTTOM SHEET ==================== */}
            <div
                onClick={() => setSheetOpen(false)}
                className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${sheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Sheet */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl border-t border-border shadow-2xl transition-transform duration-300 ease-out ${sheetOpen ? "translate-y-0" : "translate-y-full"
                        }`}
                >
                    {/* Drag Handle */}
                    <div className="flex justify-center pt-3 pb-1">
                        <span className="w-12 h-1 rounded-full bg-border" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Avatar size="sm">
                                <Avatar.Image alt={user?.name} src={user?.image} />
                                <Avatar.Fallback delayMs={600}>
                                    {user?.name?.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-heading text-sm font-semibold text-foreground leading-tight">
                                    {user?.name}
                                </p>
                                <p className="font-body text-xs text-text-muted leading-tight truncate max-w-[200px]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSheetOpen(false)}
                            className="p-1 rounded-full hover:bg-background transition"
                        >
                            <IoClose className="w-5 h-5 text-text-muted" />
                        </button>
                    </div>

                    {/* Links */}
                    <ul className="py-2">
                        <li>
                            <Link
                                href="/orders"
                                onClick={() => setSheetOpen(false)}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-background transition"
                            >
                                <IoReceiptOutline className="w-5 h-5 text-text-muted" />
                                <span className="font-body text-sm text-foreground">
                                    আমার অর্ডার
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/wishlist"
                                onClick={() => setSheetOpen(false)}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-background transition"
                            >
                                <IoHeartOutline className="w-5 h-5 text-text-muted" />
                                <span className="font-body text-sm text-foreground">
                                    উইশলিস্ট
                                </span>
                            </Link>
                        </li>

                        {user?.role === "admin" && (
                            <li>
                                <Link
                                    href="/admin"
                                    onClick={() => setSheetOpen(false)}
                                    className="flex items-center gap-3 px-5 py-3 hover:bg-background transition"
                                >
                                    <Gear className="w-5 h-5 text-text-muted" />
                                    <span className="font-body text-sm text-foreground">
                                        অ্যাডমিন প্যানেল
                                    </span>
                                </Link>
                            </li>
                        )}

                        <li className="border-t border-border mt-2 pt-2">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-background transition"
                            >
                                <ArrowRightFromSquare className="w-5 h-5 text-error" />
                                <span className="font-body text-sm text-error">
                                    লগআউট
                                </span>
                            </button>
                        </li>
                    </ul>

                    {/* Bottom safe area */}
                    <div className="h-4" />
                </div>
            </div>
        </>
    );
};

export default MobileBottomNav;