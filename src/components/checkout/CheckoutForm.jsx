// components/checkout/CheckoutForm.jsx
"use client";

import { useState } from "react";
import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    RadioGroup,
    Radio,
} from "@heroui/react";
import { divisions } from "@/lib/bd-locations";

const DELIVERY_ZONES = [
    { value: "inside-dhaka", label: "ঢাকার ভিতরে", charge: 70 },
    { value: "dhaka-suburban", label: "ঢাকার উপশহর", charge: 100 },
    { value: "outside-dhaka", label: "ঢাকার বাইরে", charge: 130 },
];

const Section = ({ title, children }) => (
    <section className="bg-surface/50 border border-border rounded-xl p-5 md:p-6">
        <h2 className="font-heading text-lg md:text-xl font-extrabold text-foreground mb-5">
            {title}
        </h2>
        {children}
    </section>
);

const CheckoutForm = ({
    onSubmit,
    submitting,
    deliveryZone,
    setDeliveryZone,
    errors,
}) => {
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const availableDistricts = division
        ? divisions.find((d) => d.value === division)?.districts || []
        : [];

    const handleDivisionChange = (value) => {
        setDivision(value || "");
        setDistrict("");
    };

    const handleDistrictChange = (value) => {
        setDistrict(value || "");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, { division, district, paymentMethod });
    };

    return (
        <Form
            id="checkout-form"
            onSubmit={handleFormSubmit}
            className="space-y-6"
        >
            {/* ─────────── গ্রাহকের তথ্য ─────────── */}
            <Section title="গ্রাহকের তথ্য">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <TextField
                        isRequired
                        name="name"
                        validate={(v) => {
                            if (!v) return "নাম আবশ্যক";
                            if (v.trim().length < 3)
                                return "নাম কমপক্ষে ৩ অক্ষর হতে হবে";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            নাম
                        </Label>
                        <Input
                            name="name"
                            placeholder="আপনার পুরো নাম"
                            className="font-body bg-background text-foreground"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="phone"
                        validate={(v) => {
                            if (!v) return "মোবাইল নাম্বার আবশ্যক";
                            if (!/^01[3-9]\d{8}$/.test(v))
                                return "সঠিক ফোন নাম্বার দিন (যেমন: 01712345678)";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            মোবাইল নাম্বার
                        </Label>
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="01712345678"
                            className="font-body bg-background text-foreground"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        name="email"
                        validate={(v) => {
                            if (!v) return null;
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
                                return "সঠিক ইমেইল দিন";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            ইমেইল (ঐচ্ছিক)
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            className="font-body bg-background text-foreground"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>

                    <TextField
                        name="whatsapp"
                        validate={(v) => {
                            if (!v) return null;
                            if (!/^01[3-9]\d{8}$/.test(v))
                                return "সঠিক হোয়াটসঅ্যাপ নাম্বার দিন";
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm text-foreground">
                            হোয়াটসঅ্যাপ (ঐচ্ছিক)
                        </Label>
                        <Input
                            name="whatsapp"
                            type="tel"
                            placeholder="01712345678"
                            className="font-body bg-background text-foreground"
                        />
                        <FieldError className="text-xs text-error mt-1" />
                    </TextField>
                </div>
            </Section>

            {/* ─────────── ডেলিভারি ঠিকানা ─────────── */}
            <Section title="ডেলিভারি ঠিকানা">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {/* Division */}
                    <Select
                        name="division"
                        value={division || null}
                        onChange={handleDivisionChange}
                        placeholder="বিভাগ নির্বাচন করুন"
                        className="font-body"
                    >
                        <Label className="font-body text-sm text-foreground">
                            বিভাগ
                        </Label>
                        <Select.Trigger className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-foreground hover:border-primary transition">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-surface border border-border rounded-lg shadow-lg">
                            <ListBox>
                                {divisions.map((d) => (
                                    <ListBox.Item
                                        key={d.value}
                                        id={d.value}
                                        textValue={d.label}
                                        className="px-3 py-2 rounded-md cursor-pointer font-body text-sm hover:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-semibold outline-none"
                                    >
                                        {d.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        {errors.division && (
                            <p className="text-xs text-error mt-1">
                                {errors.division}
                            </p>
                        )}
                    </Select>

                    {/* District */}
                    <Select
                        name="district"
                        value={district || null}
                        onChange={handleDistrictChange}
                        placeholder={
                            division
                                ? "জেলা নির্বাচন করুন"
                                : "আগে বিভাগ নির্বাচন করুন"
                        }
                        isDisabled={!division}
                        className="font-body"
                    >
                        <Label className="font-body text-sm text-foreground">
                            জেলা
                        </Label>
                        <Select.Trigger className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-foreground hover:border-primary transition data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-surface border border-border rounded-lg shadow-lg">
                            <ListBox>
                                {availableDistricts.map((d) => (
                                    <ListBox.Item
                                        key={d.value}
                                        id={d.value}
                                        textValue={d.label}
                                        className="px-3 py-2 rounded-md cursor-pointer font-body text-sm hover:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-semibold outline-none"
                                    >
                                        {d.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        {errors.district && (
                            <p className="text-xs text-error mt-1">
                                {errors.district}
                            </p>
                        )}
                    </Select>

                    {/* Area */}
                    <div className="md:col-span-2">
                        <TextField
                            isRequired
                            name="area"
                            validate={(v) => {
                                if (!v) return "এলাকা / থানা আবশ্যক";
                                if (v.trim().length < 2)
                                    return "এলাকা / থানা লিখুন";
                                return null;
                            }}
                        >
                            <Label className="font-body text-sm text-foreground">
                                এলাকা / থানা / উপজেলা
                            </Label>
                            <Input
                                name="area"
                                placeholder="যেমন: মিরপুর, ধানমন্ডি, উত্তরা"
                                className="font-body bg-background text-foreground"
                            />
                            <FieldError className="text-xs text-error mt-1" />
                        </TextField>
                    </div>

                    {/* Full Address */}
                    <div className="md:col-span-2">
                        <TextField
                            isRequired
                            name="fullAddress"
                            validate={(v) => {
                                if (!v) return "সম্পূর্ণ ঠিকানা আবশ্যক";
                                if (v.trim().length < 10)
                                    return "সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১০ অক্ষর)";
                                return null;
                            }}
                        >
                            <Label className="font-body text-sm text-foreground">
                                সম্পূর্ণ ঠিকানা
                            </Label>
                            <TextArea
                                name="fullAddress"
                                placeholder="বাসা/হোল্ডিং নাম্বার, রোড, এলাকা, ল্যান্ডমার্ক"
                                rows={3}
                                className="font-body bg-background text-foreground"
                            />
                            <FieldError className="text-xs text-error mt-1" />
                        </TextField>
                    </div>
                </div>
            </Section>

            {/* ─────────── ডেলিভারি জোন ─────────── */}
            <Section title="ডেলিভারি জোন">
                <RadioGroup
                    value={deliveryZone}
                    onValueChange={setDeliveryZone}
                    className="gap-3"
                >
                    {DELIVERY_ZONES.map((zone) => (
                        <Radio
                            key={zone.value}
                            value={zone.value}
                            className={`w-full max-w-full m-0 p-4 rounded-lg border transition cursor-pointer ${
                                deliveryZone === zone.value
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-secondary/60 bg-surface"
                            }`}
                        >
                            <div className="flex items-center justify-between w-full gap-4">
                                <span className="font-body text-sm font-semibold text-foreground">
                                    {zone.label}
                                </span>
                                <span className="font-price text-sm font-bold text-primary">
                                    ৳{zone.charge}
                                </span>
                            </div>
                        </Radio>
                    ))}
                </RadioGroup>
                {errors.deliveryZone && (
                    <p className="text-xs text-error mt-2">
                        {errors.deliveryZone}
                    </p>
                )}
            </Section>

            {/* ─────────── পেমেন্ট ─────────── */}
            <Section title="পেমেন্ট পদ্ধতি">
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                >
                    <Radio
                        value="COD"
                        className="w-full max-w-full p-4 rounded-lg border border-border bg-surface cursor-pointer"
                    >
                        <div>
                            <p className="font-body text-sm font-semibold text-foreground">
                                ক্যাশ অন ডেলিভারি
                            </p>
                            <p className="font-body text-xs text-text-muted">
                                পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                            </p>
                        </div>
                    </Radio>
                </RadioGroup>
            </Section>

            {/* ─────────── নোট ─────────── */}
            <Section title="বিশেষ নির্দেশনা (ঐচ্ছিক)">
                <TextField
                    name="note"
                    validate={(v) => {
                        if (v && v.length > 500)
                            return "নোট ৫০০ অক্ষরের মধ্যে রাখুন";
                        return null;
                    }}
                >
                    <TextArea
                        name="note"
                        placeholder="যেমন: বিকেলে ডেলিভারি দিতে বলবেন"
                        rows={3}
                        className="font-body bg-background text-foreground"
                    />
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>
            </Section>
        </Form>
    );
};

export default CheckoutForm;