import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import { getCategories } from "@/lib/api";
import Image from "next/image";

export default async function Home() {

  const categories = await getCategories();
  return (
    <div className="flex flex-col flex-1 items-center justify-center mb-20">
      <main>
        <Hero />
        <CategorySection categories={categories} />
      </main>
    </div>
  );
}
