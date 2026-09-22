// app/admin/layout.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [mobileOpen, setMobileOpen] = useState(false);

    // Derive the check state directly from the session
    const isChecking = isPending;
    const isAuthorized = !isPending && user && user.role === "admin";

    // Effect only handles the *side effect* of redirecting, not setting state
    useEffect(() => {
        if (isPending) return;

        if (!user) {
            toast.error("লগইন করুন");
            router.replace("/login");
            return;
        }

        if (user.role !== "admin") {
            toast.error("আপনার অ্যাডমিন অ্যাক্সেস নেই");
            router.replace("/");
        }
    }, [isPending, user, router]);

    // If still checking, show loader
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="font-body text-text-muted">
                    যাচাই করা হচ্ছে...
                </div>
            </div>
        );
    }

    // If not authorized, render nothing (the effect will redirect)
    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="flex min-h-[calc(100vh-200px)]">
            <AdminSidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <div className="flex-1 min-w-0 flex flex-col">
                <AdminHeader onMenuClick={() => setMobileOpen(true)} />
                <div className="flex-1 p-4 md:p-6 bg-background">
                    {children}
                </div>
            </div>
        </div>
    );
}