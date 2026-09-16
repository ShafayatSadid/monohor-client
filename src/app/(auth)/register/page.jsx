// app/(auth)/register/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Description,
    Button,
} from "@heroui/react";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image || undefined,
            });

            if (data) {
                toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
                router.push("/");
                return;
            }

            toast.error(error?.message || "নিবন্ধন ব্যর্থ হয়েছে");
        } catch (err) {
            toast.error(err.message || "কিছু একটা সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google দিয়ে শুরু করা যায়নি");
            setGoogleLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-6">
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="font-body text-sm text-text-muted mt-1.5">
                    মনোহরে স্বাগতম
                </p>
                <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-secondary" />
            </div>

            {/* Google button */}
            <Button
                type="button"
                onPress={handleGoogleSignup}
                isDisabled={googleLoading || loading}
                className="w-full bg-surface border border-border hover:border-secondary text-foreground font-body font-semibold py-2.5 rounded-xl transition mb-5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                <FcGoogle className="w-5 h-5" />
                {googleLoading
                    ? "অপেক্ষা করুন..."
                    : "Google দিয়ে সাইনআপ করুন"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs text-text-muted">
                    অথবা
                </span>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* Email form */}
            <Form className="space-y-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(v) => {
                        if (!v || !v.trim()) return "নাম আবশ্যক";
                        if (v.trim().length < 2)
                            return "নাম কমপক্ষে ২ অক্ষর হতে হবে";
                        return null;
                    }}
                >
                    <Label className="font-body text-sm text-foreground">
                        পূর্ণ নাম
                    </Label>
                    <Input
                        name="name"
                        placeholder="আপনার নাম"
                        className="font-body bg-background text-foreground"
                    />
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(v) => {
                        if (!v) return "ইমেইল আবশ্যক";
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v))
                            return "সঠিক ইমেইল ঠিকানা দিন";
                        return null;
                    }}
                >
                    <Label className="font-body text-sm text-foreground">
                        ইমেইল
                    </Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="font-body bg-background text-foreground"
                    />
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <TextField
                    isRequired
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    validate={(v) => {
                        if (!v) return "পাসওয়ার্ড আবশ্যক";
                        if (v.length < 6)
                            return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে";
                        if (!/[A-Z]/.test(v))
                            return "কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
                        if (!/[a-z]/.test(v))
                            return "কমপক্ষে ১টি ছোট হাতের অক্ষর থাকতে হবে";
                        return null;
                    }}
                >
                    <Label className="font-body text-sm text-foreground">
                        পাসওয়ার্ড
                    </Label>
                    <div className="relative">
                        <Input
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            placeholder="পাসওয়ার্ড দিন"
                            onChange={(e) =>
                                setPasswordValue(e.target.value)
                            }
                            className="font-body pr-12 bg-background text-foreground w-full"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setIsShowPassword(!isShowPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition"
                            aria-label="Toggle password visibility"
                        >
                            {isShowPassword ? (
                                <IoEyeOffOutline size={20} />
                            ) : (
                                <IoEyeOutline size={20} />
                            )}
                        </button>
                    </div>
                    <Description className="text-xs text-text-muted mt-1">
                        ন্যূনতম ৬ অক্ষর, ১টি বড় ও ১টি ছোট হাতের অক্ষর
                    </Description>
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <TextField
                    isRequired
                    name="confirmPassword"
                    type={isShowConfirm ? "text" : "password"}
                    validate={(v) => {
                        if (!v) return "পাসওয়ার্ড নিশ্চিত করুন";
                        if (v !== passwordValue)
                            return "পাসওয়ার্ড মিলছে না";
                        return null;
                    }}
                >
                    <Label className="font-body text-sm text-foreground">
                        পাসওয়ার্ড নিশ্চিত করুন
                    </Label>
                    <div className="relative">
                        <Input
                            name="confirmPassword"
                            type={isShowConfirm ? "text" : "password"}
                            placeholder="আবার পাসওয়ার্ড দিন"
                            className="font-body pr-12 bg-background text-foreground w-full"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setIsShowConfirm(!isShowConfirm)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition"
                            aria-label="Toggle password visibility"
                        >
                            {isShowConfirm ? (
                                <IoEyeOffOutline size={20} />
                            ) : (
                                <IoEyeOutline size={20} />
                            )}
                        </button>
                    </div>
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <Button
                    type="submit"
                    isDisabled={loading || googleLoading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                    {loading ? "নিবন্ধন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                </Button>
            </Form>

            <p className="text-center font-body text-sm text-text-muted mt-6">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                    href="/login"
                    className="text-primary hover:underline font-semibold transition"
                >
                    লগইন করুন
                </Link>
            </p>
        </>
    );
}