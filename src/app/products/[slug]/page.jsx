// app/products/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";

import { getProduct, getProducts } from "@/lib/api";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductSlider from "@/components/products/ProductSlider";

const categoryNames = {
    attar: "আতর",
    bakhur: "বাখুর",
    "hater-kaj": "কুশিটাকার কাজ",
    showpiece: "শোপিস",
};

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product || product.message) {
        notFound();
    }

    // Related products — same category, exclude current
    let related = [];
    if (product.category) {
        const all = await getProducts({ category: product.category });
        related = (Array.isArray(all) ? all : [])
            .filter((p) => p.slug !== product.slug)
            .slice(0, 8);
    }

    const categoryName =
        categoryNames[product.category] || product.category || "পণ্য";

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center flex-wrap gap-1.5 font-body text-xs text-text-muted mb-6 md:mb-8">
                <Link href="/" className="hover:text-primary transition">
                    হোম
                </Link>
                <IoChevronForward className="w-3 h-3" />
                <Link
                    href="/products"
                    className="hover:text-primary transition"
                >
                    সব পণ্য
                </Link>
                {product.category && (
                    <>
                        <IoChevronForward className="w-3 h-3" />
                        <Link
                            href={`/products?category=${product.category}`}
                            className="hover:text-primary transition"
                        >
                            {categoryName}
                        </Link>
                    </>
                )}
                <IoChevronForward className="w-3 h-3" />
                <span className="text-foreground/70 line-clamp-1">
                    {product.name}
                </span>
            </nav>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
                <ProductImageGallery
                    images={product.images || []}
                    alt={product.name}
                />
                <ProductInfo product={product} />
            </div>

            {/* Related products */}
            {related.length > 0 && (
                <div className="-mx-5 md:-mx-10">
                    <ProductSlider
                        tag="আরও দেখুন"
                        title="সম্পর্কিত পণ্য"
                        subtitle={`${categoryName} ক্যাটাগরির আরও পণ্য`}
                        viewAllHref={`/products?category=${product.category}`}
                        products={related}
                        autoPlay={false}
                    />
                </div>
            )}
        </div>
    );
}