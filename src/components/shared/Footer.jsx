// components/shared/Footer.jsx
import Link from "next/link";
import Image from "next/image";
import {
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoWhatsapp,
    IoCallOutline,
    IoMailOutline,
    IoLocationOutline,
    IoLogoGithub,
} from "react-icons/io5";

const Footer = () => {
    const year = new Date().getFullYear();

    const shopLinks = [
        { label: "সব পণ্য", href: "/products" },
        { label: "আতর", href: "/products?category=attar" },
        { label: "বাখুর", href: "/products?category=bakhur" },
        { label: "কুশিটাকার শিল্প", href: "/products?category=hater-kaj" },
        { label: "শোপিস", href: "/products?category=showpiece" },
    ];

    const helpLinks = [
        { label: "আমাদের সম্পর্কে", href: "/about" },
        { label: "যোগাযোগ", href: "/contact" },
        { label: "ডেলিভারি তথ্য", href: "/delivery" },
        { label: "রিটার্ন পলিসি", href: "/return-policy" },
        { label: "প্রাইভেসি পলিসি", href: "/privacy-policy" },
    ];

    const accountLinks = [
        { label: "লগইন", href: "/login" },
        { label: "রেজিস্টার", href: "/register" },
        { label: "আমার অর্ডার", href: "/orders" },
        { label: "উইশলিস্ট", href: "/wishlist" },
    ];

    return (
        <footer className="bg-foreground text-background">
            {/* Top: Main footer content */}
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="inline-flex flex-col leading-none mb-4">
                            <span className="font-heading text-2xl font-extrabold text-secondary tracking-tight">
                                মনোহর
                            </span>
                            <span className="font-accent text-[10px] tracking-[0.35em] text-background/60 mt-1">
                                MONOHOR
                            </span>
                        </Link>

                        <p className="font-body text-sm text-background/70 leading-relaxed max-w-md mb-5">
                            বাংলার ঐতিহ্যবাহী আতর, বাখুর, কুশিটাকার শিল্প ও শোপিসের বিশ্বস্ত ঠিকানা।
                            হাতে তৈরি পণ্য, সারা দেশে ডেলিভারি।
                        </p>

                        {/* Contact info */}
                        <ul className="space-y-2 font-body text-sm text-background/75">
                            <li className="flex items-start gap-2">
                                <IoLocationOutline className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                                <span>ঢাকা, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <IoCallOutline className="w-4 h-4 shrink-0 text-secondary" />
                                <a
                                    href="tel:+8801700000000"
                                    className="hover:text-secondary transition"
                                >
                                    +৮৮০ ১৭০০০০০০০০
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <IoMailOutline className="w-4 h-4 shrink-0 text-secondary" />
                                <a
                                    href="mailto:hello@monohor.com"
                                    className="hover:text-secondary transition"
                                >
                                    hello.monohor@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Shop links */}
                    <div>
                        <h3 className="font-heading text-sm font-bold text-secondary mb-4 uppercase tracking-wider">
                            শপ
                        </h3>
                        <ul className="space-y-2.5">
                            {shopLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm text-background/70 hover:text-secondary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help links */}
                    <div>
                        <h3 className="font-heading text-sm font-bold text-secondary mb-4 uppercase tracking-wider">
                            সহায়তা
                        </h3>
                        <ul className="space-y-2.5">
                            {helpLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm text-background/70 hover:text-secondary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account links */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-heading text-sm font-bold text-secondary mb-4 uppercase tracking-wider">
                            অ্যাকাউন্ট
                        </h3>
                        <ul className="space-y-2.5">
                            {accountLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm text-background/70 hover:text-secondary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social icons + payment methods */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10 md:mt-12 pt-8 border-t border-background/15">
                    {/* Social */}
                    <div className="flex items-center gap-3">
                        <span className="font-body text-xs text-background/60 mr-2">
                            ফলো করুন:
                        </span>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-secondary hover:text-foreground text-background/80 transition"
                        >
                            <IoLogoFacebook className="w-4 h-4" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-secondary hover:text-foreground text-background/80 transition"
                        >
                            <IoLogoInstagram className="w-4 h-4" />
                        </a>
                        <a
                            href="https://wa.me/8801700000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-background/10 hover:bg-secondary hover:text-foreground text-background/80 transition"
                        >
                            <IoLogoWhatsapp className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Payment methods */}
                    <div className="flex items-center gap-3">
                        <span className="font-body text-xs text-background/60 mr-2">
                            পেমেন্ট:
                        </span>
                        <span className="font-accent text-xs font-bold px-3 py-1.5 rounded-md bg-background/10 text-background/80">
                            bKash
                        </span>
                        <span className="font-accent text-xs font-bold px-3 py-1.5 rounded-md bg-background/10 text-background/80">
                            Nagad
                        </span>
                        <span className="font-accent text-xs font-bold px-3 py-1.5 rounded-md bg-background/10 text-background/80">
                            COD
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom bar: Copyright + Credit */}
            <div className="border-t border-background/15">
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="font-body text-xs text-background/60 text-center md:text-left">
                        © {year} মনোহর — All rights reserved.
                    </p>

                    <p className="font-body text-xs text-background/60 flex items-center gap-1.5 flex-wrap justify-center">
                        <span>Designed & Developed by</span>
                        <a
                            href="https://github.com/ShafayatSadid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary hover:text-background transition font-semibold"
                        >
                            <IoLogoGithub className="w-3.5 h-3.5" />
                            Shafayat Hossain
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;