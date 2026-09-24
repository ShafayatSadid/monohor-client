// app/privacy-policy/page.jsx
import Link from "next/link";
import {
    IoChevronForward,
    IoShieldCheckmarkOutline,
    IoPersonOutline,
    IoCallOutline,
    IoLocationOutline,
    IoMailOutline,
    IoLockClosedOutline,
    IoShareSocialOutline,
    IoDocumentTextOutline,
    IoTimeOutline,
    IoChevronDown,
} from "react-icons/io5";

export const metadata = {
    title: "প্রাইভেসি পলিসি",
    description:
        "মনোহর কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার ও সংরক্ষণ করে — বিস্তারিত প্রাইভেসি পলিসি।",
};

const LAST_UPDATED = "২৪ সেপ্টেম্বর, ২০২৬";

const COLLECT = [
    {
        icon: IoPersonOutline,
        title: "ব্যক্তিগত তথ্য",
        desc: "নাম, মোবাইল নাম্বার, ইমেইল (ঐচ্ছিক) এবং ডেলিভারির ঠিকানা — অর্ডার করার জন্য।",
    },
    {
        icon: IoDocumentTextOutline,
        title: "অর্ডার তথ্য",
        desc: "আপনি কী কিনেছেন, কত টাকায়, কখন কিনেছেন — অর্ডার প্রসেস করার জন্য।",
    },
    {
        icon: IoTimeOutline,
        title: "অ্যাকাউন্ট তথ্য",
        desc: "লগইন করলে — নাম, ইমেইল এবং প্রোফাইল ছবি (Google দিয়ে লগইন করলে)।",
    },
    {
        icon: IoLocationOutline,
        title: "ডেলিভারি তথ্য",
        desc: "বিভাগ, জেলা, এলাকা এবং সম্পূর্ণ ঠিকানা — কুরিয়ারে পাঠানোর জন্য।",
    },
];

const USE = [
    "আপনার অর্ডার প্রসেস করা এবং ডেলিভারি করা",
    "অর্ডার নিয়ে আপনার সাথে যোগাযোগ করা (কল, WhatsApp)",
    "অর্ডার ট্র্যাকিং এবং কাস্টমার সাপোর্ট দেওয়া",
    "আপনার অ্যাকাউন্ট এবং অর্ডার হিস্ট্রি সংরক্ষণ করা",
    "সেবার মান উন্নত করা এবং সমস্যা সমাধান করা",
];

const SHARE = [
    {
        title: "Steadfast Courier",
        desc: "শুধু ডেলিভারির জন্য প্রয়োজনীয় তথ্য — নাম, ফোন, ঠিকানা — কুরিয়ার পার্টনারের সাথে শেয়ার করা হয়।",
    },
    {
        title: "কোনো তৃতীয় পক্ষের কাছে বিক্রি নয়",
        desc: "আপনার তথ্য আমরা কোনো advertiser বা তৃতীয় পক্ষের কাছে বিক্রি করি না।",
    },
    {
        title: "আইনি বাধ্যবাধকতা",
        desc: "শুধু আইন প্রয়োগকারী সংস্থার বৈধ অনুরোধে তথ্য প্রদান করা হতে পারে।",
    },
];

const RIGHTS = [
    "আপনার সংরক্ষিত তথ্য দেখতে চাওয়ার অধিকার",
    "ভুল তথ্য সংশোধনের অনুরোধ করার অধিকার",
    "অ্যাকাউন্ট এবং তথ্য মুছে ফেলার অনুরোধ করার অধিকার",
    "যেকোনো সময় marketing যোগাযোগ বন্ধ করার অধিকার",
];

const FAQS = [
    {
        q: "আমার তথ্য কি নিরাপদ?",
        a: "হ্যাঁ। আপনার তথ্য এনক্রিপ্টেড ডাটাবেজে সংরক্ষিত এবং শুধু অর্ডার প্রসেস করার জন্য প্রয়োজনীয় ব্যক্তিরাই দেখতে পারেন।",
    },
    {
        q: "আমি কি আমার তথ্য মুছে ফেলতে পারব?",
        a: "হ্যাঁ। আমাদের সাথে যোগাযোগ করলে আপনার অ্যাকাউন্ট এবং সংরক্ষিত তথ্য মুছে ফেলা হবে — শুধু বৈধ রেকর্ড (যেমন কমপ্লিট হওয়া অর্ডার) ছাড়া।",
    },
    {
        q: "কুকি (Cookie) ব্যবহার করা হয় কি?",
        a: "শুধু লগইন সেশন এবং কার্ট সংরক্ষণের জন্য প্রয়োজনীয় কুকি ব্যবহার করা হয়। কোনো tracking বা advertising কুকি নেই।",
    },
    {
        q: "তৃতীয় পক্ষ কারা আমার তথ্য দেখতে পারে?",
        a: "শুধু Steadfast Courier — যিনি আপনার অর্ডার ডেলিভারি করেন। এছাড়া কেউ আপনার ব্যক্তিগত তথ্য দেখতে পারে না।",
    },
    {
        q: "কত দিন তথ্য সংরক্ষিত থাকে?",
        a: "অ্যাকাউন্ট সক্রিয় থাকলে, অথবা আপনার অনুরোধ অনুযায়ী মুছে ফেলার আগ পর্যন্ত। অর্ডার রেকর্ড হিসাবরক্ষণের জন্য সংরক্ষিত থাকে।",
    },
];

export default function PrivacyPolicyPage() {
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
                        প্রাইভেসি পলিসি
                    </span>
                </nav>
            </div>

            {/* ─────────── Hero ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <IoShieldCheckmarkOutline className="w-7 h-7 text-primary" />
                </div>
                <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4">
                    আপনার গোপনীয়তা আমাদের প্রতিশ্রুতি
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                    প্রাইভেসি পলিসি
                </h1>
                <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed mb-3">
                    মনোহর আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে
                    প্রতিশ্রুতিবদ্ধ। এই নীতিতে ব্যাখ্যা করা হয়েছে — আমরা কী
                    তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং কীভাবে সুরক্ষিত
                    রাখি।
                </p>
                <p className="font-body text-xs text-text-muted">
                    সর্বশেষ আপডেট: {LAST_UPDATED}
                </p>
            </section>

            {/* ─────────── What We Collect ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            তথ্য সংগ্রহ
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            আমরা কী তথ্য সংগ্রহ করি
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {COLLECT.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-surface border border-border rounded-xl p-5 md:p-6 hover:border-secondary/60 transition"
                                >
                                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                                        {c.title}
                                    </h3>
                                    <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                                        {c.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─────────── How We Use ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8 md:mb-10">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            ব্যবহার
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            তথ্য কীভাবে ব্যবহার করি
                        </h2>
                    </div>

                    <ul className="space-y-3">
                        {USE.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 bg-surface border border-border rounded-xl p-4 md:p-5"
                            >
                                <div className="w-6 h-6 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                    <span className="font-price text-[10px] font-bold text-primary">
                                        {i + 1}
                                    </span>
                                </div>
                                <span className="font-body text-sm md:text-base text-foreground leading-relaxed">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─────────── Sharing ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            তৃতীয় পক্ষ
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            আমরা কখন তথ্য শেয়ার করি
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                        {SHARE.map((s, i) => (
                            <div
                                key={i}
                                className="bg-surface border border-border rounded-xl p-5 md:p-6"
                            >
                                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                    <IoShareSocialOutline className="w-4 h-4 text-secondary" />
                                </div>
                                <h3 className="font-heading text-base font-bold text-foreground mb-2">
                                    {s.title}
                                </h3>
                                <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── Security ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="max-w-3xl mx-auto bg-primary text-white rounded-2xl p-7 md:p-9 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-[24px] border-white" />
                        <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full border-[20px] border-white" />
                    </div>

                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                            <IoLockClosedOutline className="w-6 h-6" />
                        </div>
                        <h2 className="font-heading text-xl md:text-2xl font-extrabold mb-3">
                            নিরাপত্তা
                        </h2>
                        <p className="font-body text-sm md:text-base text-white/85 leading-relaxed mb-4">
                            আপনার তথ্য সুরক্ষিত রাখতে আমরা আধুনিক প্রযুক্তি
                            ব্যবহার করি — এনক্রিপ্টেড ডাটাবেজ, সুরক্ষিত
                            authentication এবং সীমিত access।
                        </p>
                        <ul className="space-y-2">
                            {[
                                "Encrypted MongoDB Atlas ডাটাবেজ",
                                "Better Auth দিয়ে সুরক্ষিত লগইন সেশন",
                                "শুধু প্রয়োজনীয় ব্যক্তির access (admin)",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                >
                                    <IoShieldCheckmarkOutline className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
                                    <span className="font-body text-xs md:text-sm text-white/90">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─────────── Your Rights ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8 md:mb-10">
                            <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                                আপনার অধিকার
                            </span>
                            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                                আপনার তথ্য, আপনার নিয়ন্ত্রণ
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {RIGHTS.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 bg-surface border border-border rounded-xl p-4 md:p-5"
                                >
                                    <IoShieldCheckmarkOutline className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="font-body text-sm md:text-base text-foreground leading-relaxed">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── Contact for Privacy ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="max-w-3xl mx-auto bg-surface border border-border rounded-2xl p-6 md:p-9">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <IoMailOutline className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
                            প্রাইভেসি নিয়ে প্রশ্ন?
                        </h2>
                        <p className="font-body text-sm text-text-muted max-w-md mx-auto">
                            আপনার তথ্য সংক্রান্ত যেকোনো প্রশ্ন বা অনুরোধের
                            জন্য সরাসরি যোগাযোগ করুন।
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                            href="mailto:privacy@monohor.com.bd"
                            className="flex items-center justify-center gap-2 border border-border hover:border-primary text-foreground font-body font-semibold text-sm px-5 py-3 rounded-full transition"
                        >
                            <IoMailOutline className="w-4 h-4 text-primary" />
                            privacy@monohor.com.bd
                        </a>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold text-sm px-5 py-3 rounded-full transition"
                        >
                            <IoCallOutline className="w-4 h-4" />
                            যোগাযোগ করুন
                        </Link>
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
                            প্রাইভেসি সম্পর্কিত প্রশ্ন
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

            {/* ─────────── Bottom Note ─────────── */}
            <section className="max-w-3xl mx-auto px-5 md:px-10 py-12 md:py-14">
                <div className="text-center">
                    <p className="font-body text-xs text-text-muted leading-relaxed">
                        এই প্রাইভেসি পলিসি সময়ে সময়ে আপডেট হতে পারে। কোনো
                        বড় পরিবর্তন হলে আমরা ওয়েবসাইটে নোটিশ দেব। নিয়মিত
                        এই পেজটি দেখার জন্য অনুরোধ করছি।
                    </p>
                    <p className="font-body text-xs text-text-muted mt-3">
                        সর্বশেষ আপডেট: {LAST_UPDATED}
                    </p>
                </div>
            </section>
        </div>
    );
}