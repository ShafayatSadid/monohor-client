// app/delivery/page.jsx
import Link from "next/link";
import {
    IoChevronForward,
    IoCashOutline,
    IoCubeOutline,
    IoCarOutline,
    IoCheckmarkCircle,
    IoTimeOutline,
    IoShieldCheckmarkOutline,
    IoCallOutline,
    IoLocationOutline,
    IoChevronDown,
} from "react-icons/io5";

export const metadata = {
    title: "ডেলিভারি তথ্য",
    description:
        "মনোহরের ডেলিভারি চার্জ, সময়, ডেলিভারি এলাকা ও পেমেন্ট পদ্ধতি সম্পর্কে জানুন।",
};

const STEPS = [
    {
        icon: IoCubeOutline,
        title: "অর্ডার করুন",
        desc: "ওয়েবসাইট থেকে পছন্দের পণ্য কার্টে যোগ করে অর্ডার কনফার্ম করুন।",
    },
    {
        icon: IoCallOutline,
        title: "আমরা কল দেব",
        desc: "অর্ডার পাওয়ার পরে আমাদের প্রতিনিধি কল দিয়ে সব তথ্য যাচাই করবেন।",
    },
    {
        icon: IoCarOutline,
        title: "কুরিয়ারে পাঠানো",
        desc: "কনফার্ম হওয়ার পরে Steadfast Courier-এর মাধ্যমে পণ্য পাঠানো হবে।",
    },
    {
        icon: IoCheckmarkCircle,
        title: "হাতে পেয়ে টাকা",
        desc: "পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে টাকা পরিশোধ করুন (COD)।",
    },
];

const ZONES = [
    {
        area: "ঢাকা সিটি",
        time: "১-২ কার্যদিবস",
        icon: IoLocationOutline,
    },
    {
        area: "ঢাকার উপশহর (গাজীপুর, নারায়ণগঞ্জ, সাভার)",
        time: "২-৩ কার্যদিবস",
        icon: IoLocationOutline,
    },
    {
        area: "চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা (মেট্রো)",
        time: "৩-৪ কার্যদিবস",
        icon: IoLocationOutline,
    },
    {
        area: "অন্যান্য জেলা",
        time: "৩-৫ কার্যদিবস",
        icon: IoLocationOutline,
    },
];

const FAQS = [
    {
        q: "ডেলিভারি চার্জ কত?",
        a: "সারা বাংলাদেশে একই ডেলিভারি চার্জ — ৳১৩৫। যেকোনো জায়গায়, যেকোনো পরিমাণ অর্ডারে।",
    },
    {
        q: "কত দিনে পণ্য হাতে পাব?",
        a: "ঢাকায় ১-২ কার্যদিবস, মেট্রো সিটিতে ৩-৪ কার্যদিবস এবং অন্যান্য জেলায় ৩-৫ কার্যদিবস।",
    },
    {
        q: "ডেলিভারি ম্যান আমাকে ফোন দেবে?",
        a: "হ্যাঁ। পণ্য আপনার এলাকায় পৌঁছালে Steadfast-এর ডেলিভারি ম্যান আপনার সাথে যোগাযোগ করবেন।",
    },
    {
        q: "পণ্য পছন্দ না হলে ফেরত দিতে পারব?",
        a: "পণ্য হাতে পাওয়ার সময় যাচাই করে দেখুন। সমস্যা থাকলে ডেলিভারি ম্যানের সামনেই ফেরত দিন — কোনো চার্জ লাগবে না।",
    },
    {
        q: "পেমেন্ট কীভাবে করব?",
        a: "Cash on Delivery (COD) — পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে টাকা দিবেন। আগে টাকা দেওয়ার দরকার নেই।",
    },
];

export default function DeliveryPage() {
    return (
        <div>
            {/* ─────────── Breadcrumb ─────────── */}
            <div className="max-w-7xl mx-auto px-5 md:px-10 pt-6 md:pt-8">
                <nav className="flex items-center gap-1.5 font-body text-xs text-text-muted">
                    <Link
                        href="/"
                        className="hover:text-primary transition"
                    >
                        হোম
                    </Link>
                    <IoChevronForward className="w-3 h-3" />
                    <span className="text-foreground/70">
                        ডেলিভারি তথ্য
                    </span>
                </nav>
            </div>

            {/* ─────────── Hero ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
                <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4 border-b border-current pb-1">
                    ডেলিভারি তথ্য
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                    দ্রুত, নিরাপদ ও বিশ্বস্ত ডেলিভারি
                </h1>
                <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
                    Steadfast Courier-এর মাধ্যমে সারা বাংলাদেশে পৌঁছে যাবে
                    আপনার পছন্দের পণ্য — হাতে পেয়ে টাকা পরিশোধের সুবিধা সহ।
                </p>
            </section>

            {/* ─────────── Delivery Charge Highlight ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 mb-10 md:mb-14">
                <div className="bg-gradient-to-br from-primary via-primary to-primary-hover rounded-2xl p-7 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[24px] border-white" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border-[28px] border-white" />
                    </div>

                    <div className="relative">
                        <p className="font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            ডেলিভারি চার্জ
                        </p>
                        <p className="font-price text-4xl md:text-6xl font-extrabold text-white mb-3">
                            ৳১৩৫
                        </p>
                        <p className="font-body text-sm md:text-base text-white/85 max-w-lg mx-auto">
                            সারা বাংলাদেশে একই চার্জ — যেকোনো পরিমাণ অর্ডারে
                        </p>
                    </div>
                </div>
            </section>

            {/* ─────────── Delivery Steps ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            কীভাবে কাজ করে
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            ডেলিভারি প্রক্রিয়া
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {STEPS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div
                                    key={i}
                                    className="relative bg-surface border border-border rounded-xl p-5 md:p-6 hover:border-secondary/60 transition"
                                >
                                    {/* Step number */}
                                    <div className="absolute -top-3 left-5 bg-primary text-white font-price text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                        {i + 1}
                                    </div>

                                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mt-2">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>

                                    <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                                        {s.title}
                                    </h3>
                                    <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                                        {s.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─────────── Delivery Time by Zone ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                    <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                        ডেলিভারি এলাকা
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                        কোথায় কত দিনে পৌঁছাবে
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto bg-surface border border-border rounded-2xl overflow-hidden">
                    {ZONES.map((z, i) => {
                        const Icon = z.icon;
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-4 px-5 md:px-6 py-4 md:py-5 border-b border-border last:border-b-0"
                            >
                                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-body text-sm md:text-base font-semibold text-foreground">
                                        {z.area}
                                    </p>
                                </div>
                                <span className="shrink-0 font-price text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                                    {z.time}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center font-body text-xs text-text-muted mt-4 max-w-xl mx-auto">
                    * ছুটির দিন এবং প্রাকৃতিক দুর্যোগে ডেলিভারি একটু বিলম্ব
                    হতে পারে।
                </p>
            </section>

            {/* ─────────── Payment Info ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="max-w-3xl mx-auto bg-surface border border-border rounded-2xl p-7 md:p-9">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-success/10 flex items-center justify-center">
                                <IoCashOutline className="w-6 h-6 text-success" />
                            </div>
                            <div>
                                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-1">
                                    ক্যাশ অন ডেলিভারি (COD)
                                </h3>
                                <p className="font-body text-sm text-text-muted">
                                    পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <p className="font-body text-sm text-foreground">
                                    আগে কোনো টাকা দিতে হবে না
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <p className="font-body text-sm text-foreground">
                                    পণ্য দেখে যাচাই করার পরে টাকা দিন
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                <p className="font-body text-sm text-foreground">
                                    কোনো অতিরিক্ত পেমেন্ট চার্জ নেই
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── Trust Section ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <IoShieldCheckmarkOutline className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground mb-2">
                            নিরাপদ প্যাকেজিং
                        </h3>
                        <p className="font-body text-xs text-text-muted leading-relaxed">
                            প্রতিটা পণ্য যত্ন সহকারে প্যাক করে পাঠানো হয় যাতে
                            হাতে পৌঁছায় অক্ষত অবস্থায়।
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <IoTimeOutline className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground mb-2">
                            দ্রুত ডেলিভারি
                        </h3>
                        <p className="font-body text-xs text-text-muted leading-relaxed">
                            Steadfast Courier-এর সাথে partnership — সারা দেশে
                            দ্রুততম ডেলিভারি।
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <IoCallOutline className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground mb-2">
                            সরাসরি সাপোর্ট
                        </h3>
                        <p className="font-body text-xs text-text-muted leading-relaxed">
                            যেকোনো সমস্যায় সরাসরি কল বা WhatsApp-এ যোগাযোগ
                            করুন — সাথে সাথে সমাধান।
                        </p>
                    </div>
                </div>
            </section>

            {/* ─────────── FAQ ─────────── */}
            <section className="bg-surface/50 border-t border-border">
                <div className="max-w-4xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-8 md:mb-10">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            সাধারণ প্রশ্ন
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                            ডেলিভারি সম্পর্কিত প্রশ্ন
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-surface border border-border rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 font-heading text-sm md:text-base font-bold text-foreground hover:text-primary transition">
                                    {faq.q}
                                    <IoChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-5 pb-4 pt-1 border-t border-border">
                                    <p className="font-body text-sm text-text-muted leading-relaxed pt-3">
                                        {faq.a}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── CTA ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="text-center">
                    <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                        আরও প্রশ্ন আছে?
                    </h2>
                    <p className="font-body text-sm md:text-base text-text-muted mb-7 max-w-xl mx-auto">
                        আমাদের সাথে সরাসরি যোগাযোগ করুন — যেকোনো প্রশ্নের উত্তর
                        দিতে আমরা প্রস্তুত।
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/contact"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-heading font-bold px-7 py-3 rounded-full shadow-md transition"
                        >
                            যোগাযোগ করুন
                        </Link>
                        <Link
                            href="/products"
                            className="inline-block border border-border hover:border-secondary text-foreground font-heading font-semibold px-7 py-3 rounded-full transition"
                        >
                            কেনাকাটা শুরু করুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}