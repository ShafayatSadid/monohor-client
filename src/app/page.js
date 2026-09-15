import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import { getCategories } from "@/lib/api";
import Image from "next/image";

export default async function Home() {

  const categories = await getCategories();
  return (
    <div className="mb-20">
      <main>
        <Hero />
        <div className="mx-5">
          <CategorySection categories={categories} />
        </div>
      </main>
    </div>
  );
}
