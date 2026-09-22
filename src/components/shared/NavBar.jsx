// components/shared/NavBar.jsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
    IoSearchOutline,
    IoCartOutline,
    IoHeartOutline,
} from "react-icons/io5";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare, Persons } from "@gravity-ui/icons";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import { authClient } from "@/lib/auth-client";

const NavBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = authClient.useSession();
    const user = session?.user;
console.log('user:', user);
    const cartCount = useCartStore((s) =>
        s.items.reduce((sum, i) => sum + i.qty, 0)
    );
    const wishlistCount = useWishlistStore((s) => s.items.length);

    const categories = [
        { slug: "", name: "হোম" },
        { slug: "attar", name: "আতর" },
        { slug: "bakhur", name: "বাখুর" },
        { slug: "showpiece", name: "শোপিস" },
        { slug: "hater-kaj", name: "কুশিটাকার শিল্প" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchValue.trim();
        if (q) {
            router.push(`/products?search=${encodeURIComponent(q)}`);
            setSearchValue("");
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const isCategoryActive = (slug) => {
        if (!slug) return pathname === "/";
        return (
            pathname === `/categories/${slug}` ||
            pathname.includes(`category=${slug}`)
        );
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-colors duration-300">

            {/* ==================== DESKTOP: LAYER 1 — MAIN BAR ==================== */}
            <div className="hidden md:flex px-6 lg:px-10 py-4 items-center gap-8">

                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none shrink-0 group">
                    <span className="font-heading text-2xl font-extrabold text-primary tracking-tight group-hover:text-primary-hover transition">
                        মনোহর
                    </span>
                    <span className="font-accent text-[10px] tracking-[0.35em] text-secondary mt-0.5">
                        MONOHOR
                    </span>
                </Link>

                {/* Search Bar — Center */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
                    <div className="relative w-full">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="আতর, শোপিস, হাতের কাজ খুঁজুন..."
                            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                    </div>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-5 shrink-0">

                    {/* Wishlist */}
                    <Link href="/wishlist" className="relative">
                        <IoHeartOutline className="w-6 h-6 text-foreground hover:text-primary transition" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative">
                        <IoCartOutline className="w-6 h-6 text-foreground hover:text-primary transition" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <Dropdown>
                            <Dropdown.Trigger className="rounded-full cursor-pointer">
                                <Avatar size="sm">
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback delayMs={600}>
                                        {user?.name?.slice(0, 2).toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>
                            </Dropdown.Trigger>

                            <Dropdown.Popover className="bg-surface border border-border shadow-2xl rounded-2xl p-0 min-w-[230px]">
                                <div className="px-4 pt-4 pb-3 border-b border-border">
                                    <div className="flex items-center gap-3">
                                        <Avatar size="sm">
                                            <Avatar.Image alt={user?.name} src={user?.image} />
                                            <Avatar.Fallback delayMs={600}>
                                                {user?.name?.slice(0, 2).toUpperCase()}
                                            </Avatar.Fallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <p className="font-heading text-sm font-semibold text-foreground leading-5">
                                                {user?.name}
                                            </p>
                                            <p className="font-body text-xs text-text-muted leading-4 truncate max-w-[150px]">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Dropdown.Menu>
                                    <Dropdown.Item id="orders" textValue="Orders" href="/orders">
                                        <div className="flex items-center gap-3">
                                            <Persons className="size-4 text-text-muted" />
                                            <Label className="text-text-muted">আমার অর্ডার</Label>
                                        </div>
                                    </Dropdown.Item>

                                    <Dropdown.Item id="wishlist" textValue="Wishlist" href="/wishlist">
                                        <div className="flex items-center gap-3">
                                            <Persons className="size-4 text-text-muted" />
                                            <Label className="text-text-muted">উইশলিস্ট</Label>
                                        </div>
                                    </Dropdown.Item>

                                    {user?.role === "admin" && (
                                        <Dropdown.Item id="admin" textValue="Admin" href="/admin">
                                            <div className="flex items-center gap-3">
                                                <Persons className="size-4 text-text-muted" />
                                                <Label className="text-text-muted">অ্যাডমিন প্যানেল</Label>
                                            </div>
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Item
                                        id="logout"
                                        textValue="Logout"
                                        variant="danger"
                                        className="mt-1 border-t border-border pt-2"
                                    >
                                        <div
                                            onClick={handleSignOut}
                                            className="flex w-full items-center justify-between gap-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <ArrowRightFromSquare className="size-4 text-error" />
                                                <Label className="text-error">লগআউট</Label>
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    ) : (
                        <Link href="/login">
                            <Button className="bg-primary hover:bg-primary-hover text-white font-heading font-semibold px-5 py-2 rounded-full shadow-sm transition">
                                লগইন
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* ==================== DESKTOP: LAYER 2 — CATEGORY BAR ==================== */}
            <div className="hidden md:block border-t border-border bg-surface/50">
                <div className="px-6 lg:px-10 flex items-center justify-between h-12">

                    <ul className="flex items-center gap-1">
                        {categories.map((cat) => {
                            const active = isCategoryActive(cat.slug);
                            const href = cat.slug
                                ? `/products?category=${cat.slug}`
                                : "/";

                            return (
                                <li key={cat.slug || "home"}>
                                    <Link
                                        href={href}
                                        className={`group relative inline-block px-4 py-3 font-heading text-sm font-semibold transition-colors duration-200 ${active
                                                ? "text-primary"
                                                : "text-foreground hover:text-primary"
                                            }`}
                                    >
                                        {cat.name}
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 bg-secondary rounded-full transition-all duration-300 ${active ? "w-8" : "w-0 group-hover:w-8"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            <Link
                                href="/products?offer=true"
                                className="group relative inline-block px-4 py-3 font-heading text-sm font-bold text-error transition-colors duration-200 hover:text-primary"
                            >
                                অফার
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 w-0 bg-error rounded-full transition-all duration-300 group-hover:w-8" />
                            </Link>
                        </li>
                    </ul>

                    <Link
                        href="/products"
                        className="font-body text-xs text-text-muted hover:text-primary transition flex items-center gap-1"
                    >
                        সব ক্যাটাগরি
                        <span className="text-secondary">→</span>
                    </Link>
                </div>
            </div>

            {/* ==================== MOBILE: TOP BAR ==================== */}
            <div className="flex md:hidden px-4 py-3 items-center gap-3">

                {/* Logo — compact */}
                <Link href="/" className="shrink-0 flex flex-col mr-5">
                    <span className="font-heading text-lg font-extrabold text-primary tracking-tight">
                        মনোহর
                    </span>
                    <span className="font-accent text-[10px] tracking-[0.35em] text-secondary mt-0.5">
                        MONOHOR
                    </span>
                </Link>

                {/* Search Bar — takes remaining space */}
                <form onSubmit={handleSearch} className="flex-1 min-w-0">
                    <div className="relative w-full">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            size={1}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="খুঁজুন..."
                            className="w-full min-w-0 pl-9 pr-3 py-2 rounded-full bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                    </div>
                </form>

                {/* Cart */}
                <Link href="/cart" className="relative shrink-0 ml-5">
                    <IoCartOutline className="w-6 h-6 text-foreground hover:text-primary transition" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;