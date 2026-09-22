// app/admin/products/[slug]/edit/page.jsx
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({ params }) {
    const { slug } = await params;
    return <EditProductForm slug={slug} />;
}