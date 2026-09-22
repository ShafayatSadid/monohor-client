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
    const [checked, setChecked] = useState(false);

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
            return;
        }

        setChecked(true);
    }, [isPending, user, router]);

    if (isPending || !checked) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="font-body text-text-muted">
                    যাচাই করা হচ্ছে...
                </div>
            </div>
        );
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