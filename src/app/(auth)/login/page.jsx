// app/(auth)/login/page.jsx
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
    Button,
} from "@heroui/react";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setLoading(true);

        try {
            const { data: result, error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result) {
                toast.success("লগইন সফল হয়েছে!");
                router.push("/");
                return;
            }

            toast.error(error?.message || "লগইন ব্যর্থ হয়েছে");
        } catch (err) {
            toast.error(err.message || "কিছু একটা সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            // এখানে পৌঁছাবে না — Google-এ redirect হবে
        } catch (err) {
            toast.error("Google লগইন শুরু করা যায়নি");
            setGoogleLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-6">
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                    স্বাগতম
                </h1>
                <p className="font-body text-sm text-text-muted mt-1.5">
                    আপনার অ্যাকাউন্টে লগইন করুন
                </p>
                <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-secondary" />
            </div>

            {/* Google button */}
            <Button
                type="button"
                onPress={handleGoogleLogin}
                isDisabled={googleLoading || loading}
                className="w-full bg-surface border border-border hover:border-secondary text-foreground font-body font-semibold py-2.5 rounded-xl transition mb-5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                <FcGoogle className="w-5 h-5" />
                {googleLoading
                    ? "অপেক্ষা করুন..."
                    : "Google দিয়ে লগইন করুন"}
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
                            placeholder="আপনার পাসওয়ার্ড"
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
                    <FieldError className="text-xs text-error mt-1" />
                </TextField>

                <Button
                    type="submit"
                    isDisabled={loading || googleLoading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                    {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                </Button>
            </Form>

            <p className="text-center font-body text-sm text-text-muted mt-6">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/register"
                    className="text-primary hover:underline font-semibold transition"
                >
                    নিবন্ধন করুন
                </Link>
            </p>
        </>
    );
}