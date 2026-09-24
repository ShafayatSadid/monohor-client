// app/contact/page.jsx
import Link from "next/link";
import {
    IoChevronForward,
    IoCallOutline,
    IoMailOutline,
    IoLocationOutline,
    IoLogoWhatsapp,
    IoLogoFacebook,
    IoLogoInstagram,
    IoTimeOutline,
    IoChevronDown,
} from "react-icons/io5";

export const metadata = {
    title: "যোগাযোগ",
    description:
        "মনোহরের সাথে যোগাযোগ করুন — ফোন, ইমেইল, WhatsApp অথবা সোশ্যাল মিডিয়ায়।",
};

const PHONE = "+8801700000000";
const PHONE_DISPLAY = "+৮৮০ ১৭০০০০০০০০";
const WHATSAPP = "8801700000000";
const EMAIL = "hello@monohor.com.bd";

const contactCards = [
    {
        icon: IoCallOutline,
        label: "ফোন",
        value: PHONE_DISPLAY,
        href: `tel:${PHONE}`,
        cta: "কল করুন",
    },
    {
        icon: IoMailOutline,
        label: "ইমেইল",
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        cta: "মেইল করুন",
    },
    {
        icon: IoLocationOutline,
        label: "ঠিকানা",
        value: "ঢাকা, বাংলাদেশ",
        href: null,
        cta: null,
    },
];

const faqs = [
    {
        q: "ডেলিভারি চার্জ কত?",
        a: "সারা বাংলাদেশে ডেলিভারি চার্জ ৳১৩৫। যেকোনো পরিমাণ অর্ডারে একই চার্জ প্রযোজ্য।",
    },
    {
        q: "কত দিনে ডেলিভারি পাব?",
        a: "ঢাকায় সাধারণত ১-২ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।",
    },
    {
        q: "পেমেন্ট কীভাবে করব?",
        a: "আমরা Cash on Delivery (COD) সাপোর্ট করি — পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।",
    },
    {
        q: "অর্ডার কীভাবে ট্র্যাক করব?",
        a: "অর্ডার কনফার্ম হওয়ার পরে Steadfast থেকে ট্র্যাকিং নাম্বার SMS-এ পাবেন। এছাড়া আমাদের ওয়েবসাইটে 'অর্ডার ট্র্যাক' পেজ থেকেও দেখতে পারবেন।",
    },
];

export default function ContactPage() {
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
                    <span className="text-foreground/70">যোগাযোগ</span>
                </nav>
            </div>

            {/* ─────────── Hero ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
                <span className="inline-block font-accent text-[11px] md:text-xs tracking-[0.25em] uppercase text-secondary mb-4 border-b border-current pb-1">
                    যোগাযোগ
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                    আমাদের সাথে কথা বলুন
                </h1>
                <p className="font-body text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
                    অর্ডার, ডেলিভারি বা যেকোনো প্রশ্নে আমরা আছি আপনার
                    পাশে। যেকোনো সময় যোগাযোগ করুন।
                </p>
            </section>

            {/* ─────────── Contact Cards ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 mb-10 md:mb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {contactCards.map((c) => {
                        const Icon = c.icon;
                        const Wrapper = c.href ? "a" : "div";
                        const wrapperProps = c.href
                            ? { href: c.href }
                            : {};

                        return (
                            <Wrapper
                                key={c.label}
                                {...wrapperProps}
                                className={`group bg-surface border border-border rounded-2xl p-6 md:p-7 text-center transition ${
                                    c.href
                                        ? "hover:border-secondary/60 cursor-pointer"
                                        : ""
                                }`}
                            >
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="font-accent text-[10px] md:text-xs tracking-[0.2em] uppercase text-secondary mb-2">
                                    {c.label}
                                </p>
                                <p className="font-heading text-base md:text-lg font-bold text-foreground mb-3">
                                    {c.value}
                                </p>
                                {c.cta && (
                                    <span className="font-body text-xs text-primary group-hover:underline">
                                        {c.cta} →
                                    </span>
                                )}
                            </Wrapper>
                        );
                    })}
                </div>
            </section>

            {/* ─────────── Quick Actions ─────────── */}
            <section className="bg-surface/50 border-y border-border">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">
                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="font-heading text-xl md:text-2xl font-extrabold text-foreground mb-2">
                            দ্রুত যোগাযোগ
                        </h2>
                        <p className="font-body text-sm text-text-muted">
                            এক ক্লিকেই যোগাযোগ করুন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-4xl mx-auto">
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-body font-semibold text-sm md:text-base px-6 py-4 rounded-xl transition shadow-md"
                        >
                            <IoLogoWhatsapp className="w-5 h-5" />
                            হোয়াটসঅ্যাপ
                        </a>

                        <a
                            href={`tel:${PHONE}`}
                            className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white font-body font-semibold text-sm md:text-base px-6 py-4 rounded-xl transition shadow-md"
                        >
                            <IoCallOutline className="w-5 h-5" />
                            কল করুন
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#0F5FD9] text-white font-body font-semibold text-sm md:text-base px-6 py-4 rounded-xl transition shadow-md"
                        >
                            <IoLogoFacebook className="w-5 h-5" />
                            ফেসবুক
                        </a>
                    </div>
                </div>
            </section>

            {/* ─────────── Business Hours + Social ─────────── */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {/* Hours */}
                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                            <IoTimeOutline className="w-5 h-5 text-primary" />
                            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                                কাজের সময়
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-center justify-between font-body text-sm">
                                <span className="text-text-muted">
                                    শনিবার - বৃহস্পতিবার
                                </span>
                                <span className="font-semibold text-foreground font-price">
                                    সকাল ১০টা - রাত ৮টা
                                </span>
                            </li>
                            <li className="flex items-center justify-between font-body text-sm">
                                <span className="text-text-muted">
                                    শুক্রবার
                                </span>
                                <span className="font-semibold text-foreground">
                                    বিকেল ৩টা - রাত ৮টা
                                </span>
                            </li>
                        </ul>

                        <p className="font-body text-xs text-text-muted mt-5 pt-4 border-t border-border leading-relaxed">
                            কাজের সময়ের বাইরে WhatsApp-এ মেসেজ দিন — পরের
                            দিন সকালে উত্তর দেওয়া হবে।
                        </p>
                    </div>

                    {/* Social */}
                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                            <IoLogoInstagram className="w-5 h-5 text-primary" />
                            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                                সোশ্যাল মিডিয়া
                            </h3>
                        </div>

                        <p className="font-body text-sm text-text-muted mb-5 leading-relaxed">
                            নতুন পণ্য, অফার আর বাংলার ঐতিহ্যবাহী শিল্পের
                            গল্প জানতে আমাদের অনুসরণ করুন।
                        </p>

                        <div className="flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-background border border-border hover:border-[#1877F2] hover:text-[#1877F2] text-foreground transition"
                            >
                                <IoLogoFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-background border border-border hover:border-[#E4405F] hover:text-[#E4405F] text-foreground transition"
                            >
                                <IoLogoInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-background border border-border hover:border-success hover:text-success text-foreground transition"
                            >
                                <IoLogoWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
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
                            আপনার প্রশ্নের উত্তর
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-surface border border-border rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 font-heading text-sm md:text-base font-bold text-foreground hover:text-primary transition">
                                    {faq.q}
                                    <IoChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-5 pb-4 pt-1 border-t border-border">
                                    <p className="font-price text-sm text-text-muted leading-relaxed pt-3">
                                        {faq.a}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}