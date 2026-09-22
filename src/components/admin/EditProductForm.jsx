// components/admin/EditProductForm.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button,
} from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";

import { getProductBySlug, updateProduct } from "@/lib/adminApi";
import ProductImageUploader from "./ProductImageUploader";

const CATEGORIES = [
    { value: "attar", label: "আতর" },
    { value: "bakhur", label: "বাখুর" },
    { value: "hater-kaj", label: "কুশিটাকার শিল্প" },
    { value: "showpiece", label: "শোপিস" },
];

const Section = ({ title, children }) => (
    <section className="bg-surface border border-border rounded-xl p-5 md:p-6">
        <h2 className="font-heading text-base md:text-lg font-bold text-foreground mb-4">
            {title}
        </h2>
        {children}
    </section>
);

const EditProductForm = ({ slug }) => {
    const router = useRouter();
    

    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // ─── Fetch product on mount ───
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { ok, data } = await getProductBySlug(slug);

                if (!ok) {
                    throw new Error(data.message || "পণ্য পাওয়া যায়নি");
                }

                setProduct(data);
                setImages(data.images || []);
                setCategory(data.category || "");
            } catch (err) {
                console.error("Fetch error:", err);
                toast.error(err.message || "পণ্য লোড করা যায়নি");
                router.push("/admin/products");
            }
        };

        if (slug) fetchProduct();
    }, [slug, router]);

    // ─── Submit ───
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            toast.error("ক্যাটাগরি নির্বাচন করুন");
            return;
        }

        if (images.length === 0) {
            toast.error("কমপক্ষে ১টি ছবি রাখুন");
            return;
        }

        setSubmitting(true);

        try {
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());

            const payload = {
                name: String(data.name || "").trim(),
                slug: String(data.slug || "").trim(),
                category,
                description: String(data.description || "").trim(),
                price: Number(data.price),
                stock: Number(data.stock),
                images,
                featured: data.featured === "on",
                newArrival: data.newArrival === "on",
                bestSeller: data.bestSeller === "on",
            };

            if (data.oldPrice && data.oldPrice !== "") {
                payload.oldPrice = Number(data.oldPrice);
            }

            const { ok, data: res } = await updateProduct(
                product._id,
                payload
            );

            if (!ok) {
                throw new Error(res.message || "আপডেট করা যায়নি");
            }

            toast.success("পণ্য আপডেট হয়েছে");
            router.push("/admin/products");
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.message || "কিছু একটা সমস্যা হয়েছে");
            setSubmitting(false);
        }
    };

    // ─── Loading ───
    if (!product) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="font-body text-text-muted">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <Form onSubmit={onSubmit} className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted hover:text-primary transition"
                >
                    <IoArrowBack className="w-3.5 h-3.5" />
                    পণ্য তালিকায় ফিরুন
                </Link>

                <p className="font-body text-[11px] text-text-muted">
                    {product.name} — সম্পাদনা
                </p>
            </div>

            <Section title="মূল তথ্য">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <TextField
                        isRequired
                        name="name"
                        defaultValue={product.name}
                        validate={(v) => {
                            if (!v || !v.trim()) return "নাম আবশ্যক";
                            if (v.trim().length < 2)
                                return "নাম কমপক্ষে ২ অক্ষর";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            পণ্যের নাম
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="যেমন: Rose Attar"
                            className="font-body px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <div>
                        <Label className="block font-body text-sm text-foreground mb-2">
                            Slug (URL){" "}
                            <span className="text-error">*</span>
                        </Label>
                        <input
                            name="slug"
                            type="text"
                            defaultValue={product.slug}
                            required
                            pattern="[a-z0-9-]+"
                            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <p className="font-body text-xs text-text-muted mt-1">
                            সাবধান — বদলালে পুরোনো URL ভাঙবে
                        </p>
                    </div>

                    <Select
                        isRequired
                        name="category"
                        placeholder="ক্যাটাগরি নির্বাচন করুন"
                        defaultSelectedKey={product.category || undefined}
                        onSelectionChange={(key) =>
                            setCategory(key ? String(key) : "")
                        }
                        
                    >
                        <Label>
                            ক্যাটাগরি
                        </Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {CATEGORIES.map((c) => (
                                    <ListBox.Item
                                        key={c.value}
                                        id={c.value}
                                        textValue={c.label}
                                        
                                    >
                                        {c.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <div className="md:col-span-2">
                        <TextField
                            name="description"
                            defaultValue={product.description || ""}
                        >
                            <Label className="font-body text-sm text-foreground">
                                বর্ণনা (ঐচ্ছিক)
                            </Label>
                            <TextArea
                                name="description"
                                placeholder="পণ্যের সংক্ষিপ্ত বর্ণনা..."
                                rows={3}
                                className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                            />
                            <FieldError className="text-xs text-error mt-1" />
                        </TextField>
                    </div>
                </div>
            </Section>

            <Section title="দাম ও স্টক">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    <TextField
                        isRequired
                        name="price"
                        defaultValue={String(product.price ?? "")}
                        validate={(v) => {
                            if (v === "" || v === undefined)
                                return "দাম আবশ্যক";
                            const n = Number(v);
                            if (isNaN(n) || n < 0) return "সঠিক দাম দিন";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            দাম (৳)
                        </Label>
                        <Input
                            name="price"
                            type="number"
                            placeholder="850"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        name="oldPrice"
                        defaultValue={
                            product.oldPrice ? String(product.oldPrice) : ""
                        }
                    >
                        <Label className="font-body text-sm text-foreground">
                            পুরোনো দাম (ঐচ্ছিক)
                        </Label>
                        <Input
                            name="oldPrice"
                            type="number"
                            placeholder="1200"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="stock"
                        defaultValue={String(product.stock ?? "")}
                        validate={(v) => {
                            if (v === "" || v === undefined)
                                return "স্টক আবশ্যক";
                            const n = Number(v);
                            if (isNaN(n) || n < 0) return "সঠিক স্টক দিন";
                            if (!Number.isInteger(n))
                                return "পূর্ণসংখ্যা হতে হবে";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            স্টক
                        </Label>
                        <Input
                            name="stock"
                            type="number"
                            placeholder="20"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>
                </div>
            </Section>

            <Section title="ছবি">
                <ProductImageUploader images={images} onChange={setImages} />
            </Section>

            <Section title="প্রদর্শন সেটিংস">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/60 bg-surface cursor-pointer transition">
                        <input
                            type="checkbox"
                            name="featured"
                            defaultChecked={!!product.featured}
                            className="w-4 h-4 mt-0.5 accent-[var(--primary)]"
                        />
                        <div>
                            <p className="font-body text-sm font-semibold text-foreground">
                                Featured
                            </p>
                            <p className="font-body text-xs text-text-muted">
                                হোমপেজের Featured slider-এ
                            </p>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/60 bg-surface cursor-pointer transition">
                        <input
                            type="checkbox"
                            name="newArrival"
                            defaultChecked={!!product.newArrival}
                            className="w-4 h-4 mt-0.5 accent-[var(--primary)]"
                        />
                        <div>
                            <p className="font-body text-sm font-semibold text-foreground">
                                New Arrival
                            </p>
                            <p className="font-body text-xs text-text-muted">
                                "সদ্য যোগ হওয়া" slider-এ
                            </p>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/60 bg-surface cursor-pointer transition">
                        <input
                            type="checkbox"
                            name="bestSeller"
                            defaultChecked={!!product.bestSeller}
                            className="w-4 h-4 mt-0.5 accent-[var(--primary)]"
                        />
                        <div>
                            <p className="font-body text-sm font-semibold text-foreground">
                                Best Seller
                            </p>
                            <p className="font-body text-xs text-text-muted">
                                "বেস্ট সেলার" slider-এ
                            </p>
                        </div>
                    </label>
                </div>
            </Section>

            <div className="flex items-center gap-3 justify-end">
                <Link
                    href="/admin/products"
                    className="px-5 py-2.5 rounded-full border border-border font-body text-sm font-semibold text-foreground hover:border-secondary transition"
                >
                    বাতিল
                </Link>
                <Button
                    type="submit"
                    isDisabled={submitting}
                    className="bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm px-7 py-2.5 rounded-full transition disabled:opacity-50"
                >
                    {submitting ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                </Button>
            </div>
        </Form>
    );
};

export default EditProductForm;