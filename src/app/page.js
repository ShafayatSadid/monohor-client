import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import ProductSlider from "@/components/products/ProductSlider";
import { getCategories, getProducts } from "@/lib/api";
import Image from "next/image";

export default async function Home() {

  const [categories, featured, newArrivals, bestSellers] = await Promise.all([
    getCategories(),
    getProducts({ featured: "true" }),
    getProducts({ newArrival: "true" }),
    getProducts({ bestSeller: "true" }),
  ]);

  return (
    <div className="mb-20">
      <main>
        <Hero />
        <div className="">
          <CategorySection categories={categories} />

          <ProductSlider
            tag="নির্বাচিত"
            title="আমাদের ফিচার্ড পণ্য"
            subtitle="আমাদের সংগ্রহ থেকে বাছাই করা সেরা পণ্য"
            viewAllHref="/products?featured=true"
            products={featured}
          />

          <ProductSlider
                tag="নতুন এসেছে"
                title="সদ্য যোগ হওয়া পণ্য"
                subtitle="সর্বশেষ যুক্ত হওয়া পণ্যগুলো দেখুন"
                viewAllHref="/products?newArrival=true"
                products={newArrivals}
            />

            <ProductSlider
                tag="জনপ্রিয়"
                title="বেস্ট সেলার"
                subtitle="ক্রেতাদের সবচেয়ে পছন্দের পণ্য"
                viewAllHref="/products?bestSeller=true"
                products={bestSellers}
            />

        </div>
      </main>
    </div>
  );
}
