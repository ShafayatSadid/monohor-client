// app/admin/products/page.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoAdd, IoSearchOutline, IoCubeOutline } from "react-icons/io5";

import { adminFetch, deleteProduct } from "@/lib/adminApi";
import ProductRow from "@/components/admin/ProductRow";
import DeleteModal from "@/components/admin/DeleteModal";

const CATEGORIES = [
    { value: "", label: "সব ক্যাটাগরি" },
    { value: "attar", label: "আতর" },
    { value: "bakhur", label: "বাখুর" },
    { value: "hater-kaj", label: "কুশিটাকার শিল্প" },
    { value: "showpiece", label: "শোপিস" },
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        const { ok, data } = await adminFetch("/products");
        if (!ok) {
            toast.error(data.message || "পণ্য লোড করা যায়নি");
            setProducts([]);
        } else {
            setProducts(Array.isArray(data) ? data : []);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.slug.toLowerCase().includes(search.toLowerCase());
            const matchCategory = !category || p.category === category;
            return matchSearch && matchCategory;
        });
    }, [products, search, category]);

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);

        const { ok, data } = await deleteProduct(deleteTarget._id);

        if (!ok) {
            toast.error(data.message || "মুছে ফেলা যায়নি");
        } else {
            toast.success(`"${deleteTarget.name}" মুছে ফেলা হয়েছে`);
            setProducts((prev) =>
                prev.filter((p) => p._id !== deleteTarget._id)
            );
            setDeleteTarget(null);
        }
        setDeleting(false);
    };

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="নাম দিয়ে খুঁজুন..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary transition"
                        />
                    </div>

                    {/* Category filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary cursor-pointer"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add button */}
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full transition shrink-0"
                >
                    <IoAdd className="w-4 h-4" />
                    নতুন পণ্য
                </Link>
            </div>

            {/* Count */}
            {!loading && (
                <p className="font-body text-xs text-text-muted">
                    মোট {filtered.length}টি পণ্য
                    {search || category ? " (ফিল্টার করা)" : ""}
                </p>
            )}

            {/* Content */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="h-24 bg-surface border border-border rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 border border-border rounded-xl bg-surface/50">
                    <IoCubeOutline className="w-10 h-10 text-text-muted mx-auto mb-3" />
                    <p className="font-heading text-lg font-bold text-foreground mb-1">
                        কোনো পণ্য পাওয়া যায়নি
                    </p>
                    <p className="font-body text-sm text-text-muted mb-5">
                        {search || category
                            ? "ফিল্টার পরিবর্তন করে দেখুন"
                            : "নতুন পণ্য যোগ করে শুরু করুন"}
                    </p>
                    {!search && !category && (
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full transition"
                        >
                            <IoAdd className="w-4 h-4" />
                            নতুন পণ্য যোগ করুন
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((p) => (
                        <ProductRow
                            key={p._id}
                            product={p}
                            onDelete={setDeleteTarget}
                        />
                    ))}
                </div>
            )}

            {/* Delete Modal */}
            <DeleteModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                itemName={deleteTarget?.name || ""}
                loading={deleting}
            />
        </div>
    );
}