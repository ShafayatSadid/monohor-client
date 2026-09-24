// app/checkout/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoChevronForward } from "react-icons/io5";

import { createOrder } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const DELIVERY_CHARGE = 135;

export default function CheckoutPage() {
    const router = useRouter();
    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Empty cart → cart page
    useEffect(() => {
        if (items.length === 0) {
            router.replace("/cart");
        }
    }, [items.length, router]);

    const handleSubmit = async (e, extras) => {
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        data.division = extras.division;
        data.district = extras.district;
        data.paymentMethod = extras.paymentMethod;

        const errs = {};
        if (!data.division) errs.division = "বিভাগ নির্বাচন করুন";
        if (!data.district) errs.district = "জেলা নির্বাচন করুন";

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            toast.error("ফর্মে কিছু ভুল আছে");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setErrors({});
        setSubmitting(true);

        try {
            const payload = {
                items: items.map((i) => ({
                    slug: i.slug,
                    variantId: i.variantId || null,
                    qty: i.qty,
                })),
                customer: {
                    name: data.name.trim(),
                    phone: data.phone.trim(),
                    email: data.email?.trim() || null,
                    whatsapp: data.whatsapp?.trim() || null,
                    address: {
                        division: data.division,
                        district: data.district,
                        area: data.area.trim(),
                        fullAddress: data.fullAddress.trim(),
                    },
                },
                paymentMethod: data.paymentMethod || "COD",
                note: data.note?.trim() || "",
            };

            const result = await createOrder(payload);

            if (!result.ok) {
                toast.error(result.message || "অর্ডার জমা হয়নি");
                setSubmitting(false);
                return;
            }

            clearCart();
            toast.success("অর্ডার সফলভাবে জমা হয়েছে!");
            router.push(`/order-success?order=${result.orderNumber}`);
        } catch (err) {
            console.error(err);
            toast.error("কিছু ভুল হয়েছে");
            setSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
                <div className="h-96 bg-surface/50 rounded-xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            <nav className="flex items-center gap-1.5 font-body text-xs text-text-muted mb-6 md:mb-8">
                <Link href="/" className="hover:text-primary transition">
                    হোম
                </Link>
                <IoChevronForward className="w-3 h-3" />
                <Link href="/cart" className="hover:text-primary transition">
                    কার্ট
                </Link>
                <IoChevronForward className="w-3 h-3" />
                <span className="text-foreground/70">চেকআউট</span>
            </nav>

            <div className="mb-6 md:mb-8">
                <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-foreground mb-1">
                    চেকআউট
                </h1>
                <p className="font-body text-sm text-text-muted">
                    ডেলিভারি তথ্য দিয়ে অর্ডার কনফার্ম করুন
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-start">
                <CheckoutForm
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    errors={errors}
                />
                <OrderSummary
                    formId="checkout-form"
                    deliveryCharge={DELIVERY_CHARGE}
                    submitting={submitting}
                />
            </div>
        </div>
    );
}