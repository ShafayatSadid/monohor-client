// components/admin/AddProductForm.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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

import { createProduct } from "@/lib/adminApi";
import ProductImageUploader from "./ProductImageUploader";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "monohor_add_product_form";

const CATEGORIES = [
    { value: "attar", label: "আতর" },
    { value: "bakhur", label: "বাখুর" },
    { value: "hater-kaj", label: "কুশিটাকার শিল্প" },
    { value: "showpiece", label: "শোপিস" },
];

const INITIAL_FORM = {
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    featured: false,
    newArrival: true,
    bestSeller: false,
    images: [],
};

const slugify = (text) =>
    String(text)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

const Section = ({ title, children }) => (
    <section className="bg-surface border border-border rounded-xl p-5 md:p-6">
        <h2 className="font-heading text-base md:text-lg font-bold text-foreground mb-4">
            {title}
        </h2>
        {children}
    </section>
);

const AddProductForm = () => {
    const router = useRouter();
    const slugRef = useRef(null);

    const [formData, setFormData, clearForm] = useLocalStorage(
        STORAGE_KEY,
        INITIAL_FORM
    );
    const [submitting, setSubmitting] = useState(false);

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        const prevAutoSlug = slugify(formData.name);
        const shouldAutoUpdate =
            !formData.slug || formData.slug === prevAutoSlug;

        const newSlug = shouldAutoUpdate ? slugify(name) : formData.slug;

        // Uncontrolled input-এ সরাসরি ref দিয়ে value বসাই
        if (shouldAutoUpdate && slugRef.current) {
            slugRef.current.value = newSlug;
        }

        setFormData((prev) => ({
            ...prev,
            name,
            ...(shouldAutoUpdate ? { slug: newSlug } : {}),
        }));
    };

    const handleSlugChange = (e) => {
        updateField("slug", slugify(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category) {
            toast.error("ক্যাটাগরি নির্বাচন করুন");
            return;
        }

        if (formData.images.length === 0) {
            toast.error("কমপক্ষে ১টি ছবি যোগ করুন");
            return;
        }

        const payload = {
            name: String(formData.name || "").trim(),
            slug: String(formData.slug || "").trim(),
            category: formData.category,
            description: String(formData.description || "").trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            images: formData.images,
            featured: !!formData.featured,
            newArrival: !!formData.newArrival,
            bestSeller: !!formData.bestSeller,
        };

        if (formData.oldPrice && formData.oldPrice !== "") {
            payload.oldPrice = Number(formData.oldPrice);
        }

        setSubmitting(true);

        const { ok, data: res } = await createProduct(payload);

        if (!ok) {
            toast.error(res.message || "পণ্য যোগ করা যায়নি");
            setSubmitting(false);
            return;
        }

        toast.success(`"${payload.name}" যোগ হয়েছে`);
        clearForm();
        router.push("/admin/products");
    };

    return (
        <Form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted hover:text-primary transition"
                >
                    <IoArrowBack className="w-3.5 h-3.5" />
                    পণ্য তালিকায় ফিরুন
                </Link>

                <p className="font-body text-[11px] text-text-muted">
                    ইনপুট স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে
                </p>
            </div>

            <Section title="মূল তথ্য">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <TextField
                        isRequired
                        name="name"
                        defaultValue={formData.name}
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
                            onChange={handleNameChange}
                            placeholder="যেমন: Rose Attar"
                            className="font-body px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground focus:outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <div>
                        <Label className="block font-body text-sm text-foreground mb-2">
                            Slug (URL){" "}
                            <span className="text-error">*</span>
                        </Label>
                        <input
                            ref={slugRef}
                            name="slug"
                            type="text"
                            defaultValue={formData.slug}
                            onChange={handleSlugChange}
                            placeholder="rose-attar"
                            required
                            pattern="[a-z0-9-]+"
                            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <p className="font-body text-xs text-text-muted mt-1">
                            নাম থেকে স্বয়ংক্রিয় তৈরি — চাইলে বদলান
                        </p>
                    </div>

                    <Select
                        isRequired
                        name="category"
                        placeholder="ক্যাটাগরি নির্বাচন করুন"
                        defaultSelectedKey={formData.category || undefined}
                        onSelectionChange={(key) =>
                            updateField("category", key ? String(key) : "")
                        }
                        className="w-full"
                    >
                        <Label className="font-body text-sm text-foreground">
                            ক্যাটাগরি
                        </Label>
                        <Select.Trigger className="w-full">
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
                            defaultValue={formData.description}
                        >
                            <Label className="font-body text-sm text-foreground">
                                বর্ণনা (ঐচ্ছিক)
                            </Label>
                            <TextArea
                                name="description"
                                onChange={(e) =>
                                    updateField("description", e.target.value)
                                }
                                placeholder="পণ্যের সংক্ষিপ্ত বর্ণনা..."
                                rows={3}
                                className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
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
                        defaultValue={formData.price}
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
                            onChange={(e) =>
                                updateField("price", e.target.value)
                            }
                            placeholder="850"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        name="oldPrice"
                        defaultValue={formData.oldPrice}
                    >
                        <Label className="font-body text-sm text-foreground">
                            পুরোনো দাম (ঐচ্ছিক)
                        </Label>
                        <Input
                            name="oldPrice"
                            type="number"
                            onChange={(e) =>
                                updateField("oldPrice", e.target.value)
                            }
                            placeholder="1200"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="stock"
                        defaultValue={formData.stock}
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
                            onChange={(e) =>
                                updateField("stock", e.target.value)
                            }
                            placeholder="20"
                            className="font-body rounded-lg bg-surface border border-border text-foreground focus:outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>
                </div>
            </Section>

            <Section title="ছবি">
                <ProductImageUploader
                    images={formData.images}
                    onChange={(imgs) => updateField("images", imgs)}
                />
            </Section>

            <Section title="প্রদর্শন সেটিংস">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/60 bg-surface cursor-pointer transition">
                        <input
                            type="checkbox"
                            name="featured"
                            defaultChecked={formData.featured}
                            onChange={(e) =>
                                updateField("featured", e.target.checked)
                            }
                            className="w-4 h-4 mt-0.5 accent-primary"
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
                            defaultChecked={formData.newArrival}
                            onChange={(e) =>
                                updateField("newArrival", e.target.checked)
                            }
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
                            defaultChecked={formData.bestSeller}
                            onChange={(e) =>
                                updateField("bestSeller", e.target.checked)
                            }
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
                    {submitting ? "সংরক্ষণ হচ্ছে..." : "পণ্য যোগ করুন"}
                </Button>
            </div>
        </Form>
    );
};

export default AddProductForm;