// app/return-policy/page.jsx
import Link from "next/link";
import {
    IoChevronForward,
    IoRefreshOutline,
    IoAlertCircleOutline,
    IoCloseCircleOutline,
    IoCheckmarkCircle,
    IoCubeOutline,
    IoCashOutline,
    IoTimeOutline,
    IoCallOutline,
    IoChevronDown,
} from "react-icons/io5";

export const metadata = {
    title: "রিটার্ন ও রিফান্ড নীতি",
    description:
        "মনোহরের রিটার্ন ও রিফান্ড নীতি — কীভাবে পণ্য ফেরত দিবেন, কত দিনের মধ্যে, কী কী শর্ত প্রযোজ্য।",
};

const STEPS = [
    {
        icon: IoCallOutline,
        title: "১. আমাদের জানান",
        desc: "পণ্য পাওয়ার ২৪ ঘন্টার মধ্যে আমাদের হটলাইনে অথবা WhatsApp-এ জানান।",
    },
    {
        icon: IoRefreshOutline,
        title: "২. কারণ জানান",
        desc: "পণ্যে কী সমস্যা — ভুল পণ্য, ক্ষতিগ্রস্ত, নাকি অন্য কিছু — সেটা ছবি সহ জানান।",
    },
    {
        icon: IoCubeOutline,
        title: "৩. ডেলিভারি ম্যানকে ফেরত দিন",
        desc: "যদি ডেলিভারি ম্যান তখনো উপস্থিত থাকে, তাহলে সাথে সাথে ফেরত দিতে পারবেন।",
    },
    {
        icon: IoCashOutline,
        title: "৪. টাকা বা রিপ্লেসমেন্ট",
        desc: "সমস্যা যাচাই করে টাকা ফেরত অথবা নতুন পণ্য পাঠিয়ে দেওয়া হবে।",
    },
];

const CAN_RETURN = [
    "ভুল পণ্য পাঠানো হয়েছে (আপনি যা অর্ডার করেছেন তা নয়)",
    "পণ্য ভাঙা, ক্ষতিগ্রস্ত বা নষ্ট অবস্থায় এসেছে",
    "পণ্য সঠিকভাবে কাজ করছে না (যেমন: আতরের বোতল leak)",
    "ডেলিভারির সময়ে পণ্য খোলার পরে দেখা গেল কিছু অনুপস্থিত",
];

const CANNOT_RETURN = [
    "ব্যবহার করা হয়েছে এমন পণ্য",
    "ডেলিভারির ২৪ ঘন্টা পরে অভিযোগ জানানো হলে",
    "পণ্যের প্যাকেজিং খোলা এবং সিল ভাঙা (যেখানে প্রযোজ্য)",
    "পছন্দ হয়নি — এ কারণ দেখিয়ে শুধু মন বদলে ফেরত",
    "ব্যক্তিগত ব্যবহারের জন্য ব্যবহার করা হয়েছে এমন আতর বা সুগন্ধি",
];

const FAQS = [
    {
        q: "রিটার্ন করতে কত সময় লাগে?",
        a: "আমাদের কল দেওয়ার পরে ২-৩ কার্যদিবসের মধ্যে আমরা সিদ্ধান্ত জানাই এবং ৫-৭ কার্যদিবসের মধ্যে টাকা ফেরত অথবা রিপ্লেসমেন্ট পৌঁছে দেওয়া হয়।",
    },
    {
        q: "রিটার্নের জন্য কোনো চার্জ লাগে?",
        a: "না। আমাদের ভুলে বা পণ্যের সমস্যায় রিটার্ন হলে সম্পূর্ণ খরচ আমাদের। পণ্য হাতে পাওয়ার সময়ই ডেলিভারি ম্যানের সামনে যাচাই করে নিলে কোনো ঝামেলা হয় না।",
    },
    {
        q: "COD অর্ডার হলে টাকা কীভাবে ফেরত পাব?",
        a: "আপনার bKash বা Nagad নম্বরে টাকা পাঠিয়ে দেওয়া হবে। অথবা চাইলে নতুন পণ্য পাঠিয়ে দেওয়া হবে — আপনার সিদ্ধান্ত।",
    },
    {
        q: "পণ্য পছন্দ না হলে কী করব?",
        a: "ডেলিভারি ম্যানের সামনে পণ্য যাচাই করুন। পছন্দ না হলে সাথে সাথে ফেরত দিন — কোনো টাকা পরিশোধ করবেন না। এটি সম্পূর্ণ বিনামূল্যে।",
    },
    {
        q: "কুরিয়ার যখন পৌঁছাবে সময়ে আমি উপস্থিত ছিলাম না — এখন কী করব?",
        a: "Steadfast Courier আপনার সাথে ফোনে যোগাযোগ করবেন এবং পুনরায় ডেলিভারির সময় নির্ধারণ করবেন। সাধারণত ২ বার চেষ্টা করা হয়।",
    },
];

export default function ReturnPolicyPage() {
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
                        রিটার্ন ও রিফান্ড নীতি
                    </span>
                </nav>
            </div>

            {/* ─────────── Hero ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
                <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4 border-b border-current pb-1">
                    রিটার্ন ও রিফান্ড
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                    নিশ্চিন্তে কেনাকাটা করুন
                </h1>
                <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
                    আপনার সন্তুষ্টিই আমাদের প্রথম প্রায়োরিটি। পণ্যে সমস্যা
                    থাকলে আমরা সম্পূর্ণ দায়িত্ব নিই।
                </p>
            </section>

            {/* ─────────── Key Policy Highlight ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 mb-10 md:mb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary text-white rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/15 flex items-center justify-center mb-3">
                            <IoTimeOutline className="w-5 h-5" />
                        </div>
                        <p className="font-price text-2xl md:text-3xl font-extrabold mb-1">
                            ২৪ ঘন্টা
                        </p>
                        <p className="font-body text-xs md:text-sm text-white/85">
                            অভিযোগ জানানোর সময়
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <IoRefreshOutline className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-price text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                            ৳০
                        </p>
                        <p className="font-body text-xs md:text-sm text-text-muted">
                            রিটার্নে কোনো চার্জ নেই
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                            <IoCashOutline className="w-5 h-5 text-secondary" />
                        </div>
                        <p className="font-price text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                            ৭ দিন
                        </p>
                        <p className="font-body text-xs md:text-sm text-text-muted">
                            টাকা ফেরত পেতে সর্বোচ্চ সময়
                        </p>
                    </div>
                </div>
            </section>

            {/* ─────────── Return Process ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-3">
                            কীভাবে রিটার্ন করবেন
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
                            সহজ ৪ ধাপে রিটার্ন
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
                                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
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

            {/* ─────────── Can / Cannot Return ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Can Return */}
                    <div className="bg-success/5 border border-success/30 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-success/20">
                            <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                                <IoCheckmarkCircle className="w-5 h-5 text-success" />
                            </div>
                            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                                রিটার্ন করা যাবে
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            {CAN_RETURN.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                >
                                    <IoCheckmarkCircle className="w-4 h-4 text-success shrink-0 mt-1" />
                                    <span className="font-body text-sm text-foreground leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cannot Return */}
                    <div className="bg-error/5 border border-error/30 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-error/20">
                            <div className="w-10 h-10 rounded-full bg-error/15 flex items-center justify-center">
                                <IoCloseCircleOutline className="w-5 h-5 text-error" />
                            </div>
                            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                                রিটার্ন করা যাবে না
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            {CANNOT_RETURN.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                >
                                    <IoCloseCircleOutline className="w-4 h-4 text-error shrink-0 mt-1" />
                                    <span className="font-body text-sm text-foreground leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─────────── Refund Info ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-4xl mx-auto px-5 md:px-10 py-12 md:py-16">
                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-9">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary/20 flex items-center justify-center">
                                <IoCashOutline className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-1">
                                    রিফান্ড কীভাবে পাবেন
                                </h3>
                                <p className="font-body text-sm text-text-muted">
                                    আপনার সুবিধা অনুযায়ী দুইটা option
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-background border border-border rounded-xl p-5">
                                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-secondary mb-2">
                                    অপশন ১
                                </p>
                                <p className="font-heading text-base font-bold text-foreground mb-2">
                                    টাকা ফেরত
                                </p>
                                <p className="font-body text-xs text-text-muted leading-relaxed">
                                    bKash বা Nagad-এ সম্পূর্ণ টাকা পাঠিয়ে দেওয়া
                                    হবে। ৫-৭ কার্যদিবসের মধ্যে।
                                </p>
                            </div>

                            <div className="bg-background border border-border rounded-xl p-5">
                                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-secondary mb-2">
                                    অপশন ২
                                </p>
                                <p className="font-heading text-base font-bold text-foreground mb-2">
                                    নতুন পণ্য
                                </p>
                                <p className="font-body text-xs text-text-muted leading-relaxed">
                                    চাইলে একই পণ্য আবার পাঠিয়ে দেওয়া হবে —
                                    সম্পূর্ণ বিনামূল্যে।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── Note / Warning ─────────── */}
            <section className="max-w-4xl mx-auto px-5 md:px-10 py-12 md:py-14">
                <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 md:p-7 flex items-start gap-4">
                    <IoAlertCircleOutline className="w-6 h-6 text-warning shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2">
                            গুরুত্বপূর্ণ কথা
                        </h3>
                        <p className="font-body text-sm text-text-muted leading-relaxed mb-3">
                            পণ্য হাতে পাওয়ার সময়{" "}
                            <strong className="text-foreground">
                                ডেলিভারি ম্যানের সামনেই খুলে যাচাই করুন
                            </strong>
                            । সমস্যা থাকলে সাথে সাথে ফেরত দিন — কোনো টাকা
                            পরিশোধ করবেন না। এতে কোনো ঝামেলা হবে না এবং
                            সম্পূর্ণ বিনামূল্যে।
                        </p>
                        <p className="font-body text-xs text-text-muted">
                            ডেলিভারি ম্যান চলে যাওয়ার পরে অভিযোগ করলে, প্রমাণ
                            হিসেবে ছবি/ভিডিও পাঠাতে হবে।
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
                            রিটার্ন সম্পর্কিত প্রশ্ন
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
                        সমস্যা হচ্ছে?
                    </h2>
                    <p className="font-body text-sm md:text-base text-text-muted mb-7 max-w-xl mx-auto">
                        সাথে সাথে আমাদের জানান — আমরা দ্রুততম সময়ে সমাধান
                        করব।
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/contact"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-heading font-bold px-7 py-3 rounded-full shadow-md transition"
                        >
                            যোগাযোগ করুন
                        </Link>
                        <Link
                            href="/track-order"
                            className="inline-block border border-border hover:border-secondary text-foreground font-heading font-semibold px-7 py-3 rounded-full transition"
                        >
                            অর্ডার ট্র্যাক করুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}