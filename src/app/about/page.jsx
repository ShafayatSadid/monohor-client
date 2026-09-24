// app/about/page.jsx
import Link from "next/link";
import Image from "next/image";
import {
    IoChevronForward,
    IoLeafOutline,
    IoShieldCheckmarkOutline,
    IoSparklesOutline,
    IoHeartOutline,
    IoStorefrontOutline,
} from "react-icons/io5";

export const metadata = {
    title: "আমাদের সম্পর্কে",
    description:
        "মনোহর — বাংলার ঐতিহ্যবাহী আতর, বাখুর, কুশিটাকার শিল্প ও শোপিসের বিশ্বস্ত ঠিকানা।",
};

const features = [
    {
        icon: IoShieldCheckmarkOutline,
        title: "১০০% আসল পণ্য",
        desc: "সরাসরি কারিগর থেকে সংগ্রহ করা খাঁটি আতর, বাখুর ও হস্তশিল্প। কোনো নকল বা ভেজাল নেই।",
    },
    {
        icon: IoLeafOutline,
        title: "হাতে তৈরি",
        desc: "বাংলার দক্ষ কারিগরের হাতে তৈরি প্রতিটা পণ্য — যত্ন নিয়ে বাছাই করা।",
    },
    {
        icon: IoSparklesOutline,
        title: "প্রিমিয়াম মান",
        desc: "পণ্য পাঠানোর আগে প্রতিটা অর্ডার যাচাই করা হয় যাতে আপনি পান সেরাটা।",
    },
    {
        icon: IoHeartOutline,
        title: "বিশ্বস্ত সেবা",
        desc: "অর্ডার করার পরে আমরা কল দিয়ে কনফার্ম করি এবং সারা দেশে দ্রুত ডেলিভারি দিই।",
    },
];

const categories = [
    { slug: "attar", name: "আতর", desc: "খাঁটি সুগন্ধি" },
    { slug: "bakhur", name: "বাখুর", desc: "ধূপ ও উদ" },
    { slug: "hater-kaj", name: "কুশিটাকার শিল্প", desc: "হাতে বোনা ঐতিহ্য" },
    { slug: "showpiece", name: "শোপিস", desc: "ঘরের সাজ" },
];

export default function AboutPage() {
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
                        আমাদের সম্পর্কে
                    </span>
                </nav>
            </div>

            {/* ─────────── Hero ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16 text-center">
                <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4 border-b border-current pb-1">
                    আমাদের গল্প
                </span>
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4">
                    বাংলার ঐতিহ্য,
                    <br />
                    আপনার হাতের মুঠোয়
                </h1>
                <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
                    মনোহর একটি ছোট্ট স্বপ্ন — বাংলার ছড়িয়ে থাকা হস্তশিল্প,
                    খাঁটি আতর আর ঐতিহ্যবাহী কুশিটাকার কাজ যেন সারা দেশের
                    মানুষের ঘরে পৌঁছে যায়।
                </p>
            </section>

            {/* ─────────── Story ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Text */}
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                            আমরা কারা
                        </h2>
                        <div className="space-y-4 font-body text-sm md:text-base text-text-muted leading-relaxed">
                            <p>
                                বাংলাদেশের গ্রামে গ্রামে অসংখ্য কারিগর আছেন
                                যাঁরা প্রজন্মের পর প্রজন্ম ধরে হাতে তৈরি করছেন
                                অপূর্ব সব পণ্য — কিন্তু সঠিক ক্রেতার কাছে
                                পৌঁছাতে পারছেন না।
                            </p>
                            <p>
                                অন্যদিকে শহরের মানুষ খুঁজছেন আসল পণ্য — কিন্তু
                                বিশ্বাসের অভাবে ভেজালে পড়ে যাচ্ছেন। এই দুইয়ের
                                মাঝে সেতু তৈরি করতেই{" "}
                                <span className="font-semibold text-primary">
                                    মনোহর
                                </span>{" "}
                                -এর যাত্রা।
                            </p>
                            <p>
                                আমাদের লক্ষ্য একটাই — বাংলার ঐতিহ্যবাহী পণ্য
                                সঠিক ক্রেতার কাছে পৌঁছে দেওয়া, আর কারিগরদের
                                ন্যায্য মূল্য নিশ্চিত করা।
                            </p>
                        </div>
                    </div>

                    {/* Image placeholder */}
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                        <Image
                            src="/images/slide-2.webp"
                            alt="Monohor craft"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ─────────── Mission + Vision ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-primary text-white rounded-2xl p-7 md:p-9">
                        <span className="inline-block font-accent text-[10px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4">
                            আমাদের লক্ষ্য
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-extrabold mb-3">
                            বাংলার কারিগরি ঐতিহ্য রক্ষা করা
                        </h3>
                        <p className="font-body text-sm md:text-base text-white/85 leading-relaxed">
                            প্রতিটা অর্ডারের পেছনে থাকে একজন কারিগরের
                            পরিশ্রম। আমরা তাঁদের ন্যায্য মূল্য নিশ্চিত করে
                            বাংলার এই শিল্পকে জীবিত রাখতে চাই।
                        </p>
                    </div>

                    <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-7 md:p-9">
                        <span className="inline-block font-accent text-[10px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4">
                            আমাদের ভিশন
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-extrabold text-foreground mb-3">
                            বিশ্বস্ত ব্র্যান্ড হয়ে ওঠা
                        </h3>
                        <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
                            সারা বাংলাদেশে — বিশেষ করে প্রবাসীদের কাছে —
                            বাংলার ঐতিহ্যবাহী পণ্যের সবচেয়ে বিশ্বস্ত অনলাইন
                            ঠিকানা হয়ে উঠতে চাই।
                        </p>
                    </div>
                </div>
            </section>

            {/* ─────────── Why Monohor ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            কেন মনোহর
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            আমাদের প্রতিশ্রুতি
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {features.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    className="bg-surface border border-border rounded-xl p-5 md:p-6 hover:border-secondary/60 transition"
                                >
                                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                                        {f.title}
                                    </h3>
                                    <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                                        {f.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─────────── Categories ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                    <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                        আমাদের সংগ্রহ
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                        যা পাবেন মনোহরে
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                    {categories.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/products?category=${c.slug}`}
                            className="group bg-surface border border-border rounded-xl p-5 md:p-6 text-center hover:border-secondary/60 hover:bg-secondary/5 transition"
                        >
                            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition">
                                <IoStorefrontOutline className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-heading text-sm md:text-base font-bold text-foreground group-hover:text-primary transition mb-1">
                                {c.name}
                            </h3>
                            <p className="font-body text-[11px] md:text-xs text-text-muted">
                                {c.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─────────── CTA ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 pb-16 md:pb-20">
                <div className="bg-gradient-to-br from-primary via-primary to-primary-hover rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-[30px] border-white" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border-[24px] border-white" />
                    </div>

                    <div className="relative">
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3">
                            আজই শুরু করুন
                        </h2>
                        <p className="font-body text-sm md:text-base text-white/80 max-w-xl mx-auto mb-7">
                            বাংলার ঐতিহ্যবাহী পণ্যের সেরা সংগ্রহ থেকে আপনার
                            পছন্দেরটা বেছে নিন।
                        </p>
                        <Link
                            href="/products"
                            className="inline-block bg-secondary hover:bg-secondary/90 text-white font-heading font-bold px-8 py-3 rounded-full shadow-lg transition hover:scale-[1.03]"
                        >
                            কেনাকাটা শুরু করুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}