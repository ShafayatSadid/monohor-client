// components/home/CategorySection.jsx
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

// Fallback ছবি — যদি backend-এ image না থাকে
const fallbackImages = {
    attar: "/images/categories/slide-1.webp",
    bakhur: "/images/categories/slide-1.webp",
    "hater-kaj": "/images/categories/slide-1.webp",
    showpiece: "/images/categories/slide-1.webp",
};

// বাংলা description — backend-এর ইংরেজি description-এর বদলে
const categoryDescriptions = {
    attar: "খাঁটি সুগন্ধি",
    bakhur: "ধূপ ও উদ",
    "hater-kaj": "হাতে বোনা ঐতিহ্য",
    showpiece: "ঘর সাজানোর সামগ্রী",
};

const CategorySection = ({ categories = [] }) => {
    if (categories.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
            <SectionHeading
                tag="বিভাগ"
                title="আপনার পছন্দের ক্যাটাগরি"
                subtitle="চারটি ক্যাটাগরি থেকে বেছে নিন আপনার পছন্দের পণ্য"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {categories.map((cat) => {
                    const imgSrc =
                        cat.image && cat.image.trim() !== ""
                            ? cat.image
                            : fallbackImages[cat.slug] ||
                              "/images/categories/placeholder.webp";

                    const desc =
                        categoryDescriptions[cat.slug] || cat.description;

                    return (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-secondary/60 transition-colors duration-300"
                        >
                            {/* ছবি */}
                            <Image
                                src={imgSrc}
                                alt={cat.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-all duration-300 group-hover:from-black/90" />

                            {/* সোনালি রিং hover-এ */}
                            <div className="absolute inset-0 rounded-xl ring-0 ring-secondary/0 group-hover:ring-2 group-hover:ring-secondary/60 transition-all duration-300 pointer-events-none" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                                <h3 className="font-heading text-base md:text-xl font-extrabold text-white leading-tight transition-colors duration-300 group-hover:text-[#E5C177]">
                                    {cat.name}
                                </h3>
                                {desc && (
                                    <p className="font-body text-[11px] md:text-xs text-white/75 mt-1 line-clamp-1">
                                        {desc}
                                    </p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;