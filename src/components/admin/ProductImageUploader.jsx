// components/admin/ProductImageUploader.jsx
"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { IoAdd, IoClose } from "react-icons/io5";

const ProductImageUploader = ({ images, onChange }) => {
    const handleSuccess = (result) => {
        if (result.event !== "success") return;

        const url = result?.info?.secure_url;
        if (!url) return;

        if (images.length >= 5) {
            toast.error("সর্বোচ্চ ৫টি ছবি যোগ করা যাবে");
            return;
        }

        if (images.includes(url)) return;

        onChange([...images, url]);
        toast.success("ছবি আপলোড হয়েছে");
    };

    const handleRemove = (index) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {images.map((url, i) => (
                    <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                    >
                        <Image
                            src={url}
                            alt={`ছবি ${i + 1}`}
                            fill
                            sizes="150px"
                            className="object-cover"
                        />

                        {i === 0 && (
                            <span className="absolute top-1 left-1 bg-primary text-white font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                                প্রধান
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(i);
                            }}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition z-10"
                        >
                            <IoClose className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                {images.length < 5 && (
                    <CldUploadWidget
                        cloudName={
                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                        }
                        uploadPreset={
                            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        onSuccess={handleSuccess}
                        options={{
                            sources: ["local", "url", "camera"],
                            multiple: true,
                            maxFiles: 5,
                            maxFileSize: 5000000,
                            clientAllowedFormats: [
                                "jpg",
                                "jpeg",
                                "png",
                                "webp",
                            ],
                            folder: "monohor/products",
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary text-text-muted hover:text-primary transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                            >
                                <IoAdd className="w-6 h-6" />
                                <span className="font-body text-[10px]">
                                    ছবি যোগ
                                </span>
                            </button>
                        )}
                    </CldUploadWidget>
                )}
            </div>

            <p className="font-body text-xs text-text-muted mt-2">
                সর্বোচ্চ ৫টি ছবি (৫MB max)। প্রথম ছবিটি প্রধান হিসেবে
                দেখানো হবে।
                {images.length > 0 && ` — ${images.length}/৫ যোগ হয়েছে`}
            </p>
        </div>
    );
};

export default ProductImageUploader;